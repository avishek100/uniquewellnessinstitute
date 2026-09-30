import { parseCookie } from "cookie";
import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
import { isAllowedClientOrigin } from "../config/clientOrigins.js";
import { ChatConversation } from "../models/ChatConversation.js";
import { ChatMessage } from "../models/ChatMessage.js";
import { SupportConversation } from "../models/SupportConversation.js";
import { User } from "../models/User.js";
import { hashChatAccessToken } from "../utils/chatAccess.js";
import { getAdminSession, getSessionUserId, sessionCookieName } from "../utils/session.js";

type ChatActor =
    | { type: "admin"; name: string }
    | { type: "visitor"; name: string; conversationId: string };

export function attachChatSocket(httpServer: HttpServer): void {
    const io = new Server(httpServer, {
        cors: {
            credentials: true,
            origin: (origin, callback) => callback(null, isAllowedClientOrigin(origin)),
        },
    });

    io.use((socket, next) => {
        void authenticateSocket(socket, next);
    });

    io.on("connection", (socket) => {
        const actor = socket.data.actor as ChatActor;
        if (actor.type === "admin") void socket.join("admins");

        socket.on("chat:join", (input, acknowledge) => {
            void (async () => {
                const conversationId = input?.conversationId;
                if (typeof conversationId !== "string" || !/^[a-f\d]{24}$/i.test(conversationId)) {
                    acknowledge?.({ ok: false, message: "Invalid conversation." });
                    return;
                }
                if (actor.type === "visitor" && actor.conversationId !== conversationId) {
                    acknowledge?.({ ok: false, message: "Chat access is invalid." });
                    return;
                }
                const applicationConversation = await ChatConversation.exists({ _id: conversationId });
                const supportConversation = applicationConversation
                    ? null
                    : await SupportConversation.exists({ _id: conversationId });
                if (!applicationConversation && !supportConversation) {
                    acknowledge?.({ ok: false, message: "Conversation not found." });
                    return;
                }

                await socket.join(`conversation:${conversationId}`);
                acknowledge?.({ ok: true });
            })().catch((error: unknown) => {
                console.error("Could not join chat:", error);
                acknowledge?.({ ok: false, message: "Could not join chat." });
            });
        });

        socket.on("chat:send", (input, acknowledge) => {
            void (async () => {
                const conversationId = input?.conversationId;
                const body = typeof input?.body === "string" ? input.body.trim() : "";
                const room = `conversation:${conversationId}`;
                if (
                    typeof conversationId !== "string" ||
                    !/^[a-f\d]{24}$/i.test(conversationId) ||
                    !socket.rooms.has(room) ||
                    (actor.type === "visitor" && actor.conversationId !== conversationId)
                ) {
                    acknowledge?.({ ok: false, message: "Chat access is invalid." });
                    return;
                }
                if (!body || body.length > 2000) {
                    acknowledge?.({ ok: false, message: "Messages must be between 1 and 2000 characters." });
                    return;
                }

                const applicationConversation = await ChatConversation.findById(conversationId);
                const supportConversation = applicationConversation
                    ? null
                    : await SupportConversation.findById(conversationId);
                const conversation = applicationConversation ?? supportConversation;
                if (!conversation) {
                    acknowledge?.({ ok: false, message: "Conversation not found." });
                    return;
                }

                const message = await ChatMessage.create({
                    conversationId,
                    sender: actor.type,
                    senderName: actor.name,
                    body,
                });
                conversation.lastMessageAt = message.createdAt;
                await conversation.save();

                const result = {
                    _id: message.id,
                    conversationId,
                    sender: message.sender,
                    senderName: message.senderName,
                    body: message.body,
                    createdAt: message.createdAt,
                };
                io.to(room).emit("chat:message", result);
                io.to("admins").emit("chat:conversation-updated", {
                    _id: conversation.id,
                    conversationId,
                    visitorName: conversation.visitorName,
                    visitorEmail: conversation.visitorEmail,
                    type: supportConversation ? "support" : "application",
                    lastMessage: result,
                    lastMessageAt: message.createdAt,
                });
                acknowledge?.({ ok: true });
            })().catch((error: unknown) => {
                console.error("Could not send chat message:", error);
                acknowledge?.({ ok: false, message: "Could not send message." });
            });
        });
    });
}

async function authenticateSocket(
    socket: Parameters<Parameters<Server["use"]>[0]>[0],
    next: (error?: Error) => void,
): Promise<void> {
    try {
        const cookies = parseCookie(socket.handshake.headers.cookie ?? "");
        const admin = getAdminSession(cookies[sessionCookieName]);
        if (admin) {
            socket.data.actor = { type: "admin", name: "Administration" } satisfies ChatActor;
            next();
            return;
        }

        const userId = getSessionUserId(cookies[sessionCookieName]);
        const user = userId ? await User.findById(userId).select("fullName") : null;
        if (!user) {
            next(new Error("Please sign in before chatting."));
            return;
        }

        const { conversationId, chatToken } = socket.handshake.auth as {
            conversationId?: unknown;
            chatToken?: unknown;
        };
        if (
            typeof conversationId !== "string" ||
            !/^[a-f\d]{24}$/i.test(conversationId) ||
            typeof chatToken !== "string"
        ) {
            next(new Error("Unauthorized chat connection."));
            return;
        }

        const conversationQuery = {
            _id: conversationId,
            accessTokenHash: hashChatAccessToken(chatToken),
        };
        const conversation = await ChatConversation.findOne(conversationQuery) ??
            await SupportConversation.findOne(conversationQuery).select("+accessTokenHash");
        if (!conversation) {
            next(new Error("Unauthorized chat connection."));
            return;
        }
        if (
            conversation instanceof SupportConversation &&
            conversation.visitorUserId &&
            String(conversation.visitorUserId) !== userId
        ) {
            next(new Error("This chat belongs to another account."));
            return;
        }

        socket.data.actor = {
            type: "visitor",
            name: user.fullName,
            conversationId,
        } satisfies ChatActor;
        next();
    } catch (error) {
        next(error instanceof Error ? error : new Error("Could not authorize chat connection."));
    }
}