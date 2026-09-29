import { Router } from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { ChatConversation } from "../models/ChatConversation.js";
import { ChatMessage } from "../models/ChatMessage.js";
import { SupportConversation } from "../models/SupportConversation.js";
import { User } from "../models/User.js";
import { createSupportConversationSchema } from "../schemas/chat.js";
import { createChatAccessToken, hashChatAccessToken } from "../utils/chatAccess.js";
import { getSessionUserId, sessionCookieName } from "../utils/session.js";

export const chatRouter = Router();

const createConversationRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
});

chatRouter.post("/conversations", createConversationRateLimit, async (request, response) => {
    const parsed = createSupportConversationSchema.safeParse(request.body);
    if (!parsed.success) {
        response.status(400).json({ message: "Please enter a valid name and email address." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Chat is temporarily unavailable." });
        return;
    }

    const userId = getSessionUserId(request.cookies?.[sessionCookieName]);
    if (!userId) {
        response.status(401).json({ message: "Sign in before starting a chat." });
        return;
    }

    try {
        const user = await User.findById(userId).select("fullName email");
        if (!user) {
            response.status(401).json({ message: "Sign in before starting a chat." });
            return;
        }

        const chatToken = createChatAccessToken();
        const conversation = await SupportConversation.create({
            visitorUserId: user._id,
            visitorName: user.fullName,
            visitorEmail: user.email,
            accessTokenHash: hashChatAccessToken(chatToken),
        });
        response.status(201).json({
            conversationId: conversation.id,
            chatToken,
            visitorName: conversation.visitorName,
        });
    } catch (error) {
        console.error("Could not start support chat:", error);
        response.status(500).json({ message: "Could not start chat." });
    }
});

chatRouter.get("/:conversationId/messages", async (request, response) => {
    const { conversationId } = request.params;
    const accessToken = request.header("x-chat-token");
    if (!mongoose.isValidObjectId(conversationId) || !accessToken) {
        response.status(401).json({ message: "Chat access is invalid." });
        return;
    }

    const userId = getSessionUserId(request.cookies?.[sessionCookieName]);
    if (!userId || !(await User.exists({ _id: userId }))) {
        response.status(401).json({ message: "Sign in before accessing chat." });
        return;
    }

    const conversationQuery = {
        _id: conversationId,
        accessTokenHash: hashChatAccessToken(accessToken),
    };
    const applicationConversation = await ChatConversation.findOne(conversationQuery).select("_id");
    const supportConversation = applicationConversation
        ? null
        : await SupportConversation.findOne(conversationQuery).select("_id visitorUserId");
    if (!applicationConversation && !supportConversation) {
        response.status(401).json({ message: "Chat access is invalid." });
        return;
    }
    if (supportConversation?.visitorUserId && String(supportConversation.visitorUserId) !== userId) {
        response.status(403).json({ message: "This chat belongs to another account." });
        return;
    }

    const messages = await ChatMessage.find({ conversationId }).sort({ createdAt: 1 }).lean();
    response.json({ messages });
});