import { Router } from "express";
import mongoose from "mongoose";
import { ChatConversation } from "../models/ChatConversation.js";
import { ChatMessage } from "../models/ChatMessage.js";
import { hashChatAccessToken } from "../utils/chatAccess.js";

export const chatRouter = Router();

chatRouter.get("/:conversationId/messages", async (request, response) => {
    const { conversationId } = request.params;
    const accessToken = request.header("x-chat-token");
    if (!mongoose.isValidObjectId(conversationId) || !accessToken) {
        response.status(401).json({ message: "Chat access is invalid." });
        return;
    }

    const conversation = await ChatConversation.findOne({
        _id: conversationId,
        accessTokenHash: hashChatAccessToken(accessToken),
    }).select("_id");
    if (!conversation) {
        response.status(401).json({ message: "Chat access is invalid." });
        return;
    }

    const messages = await ChatMessage.find({ conversationId }).sort({ createdAt: 1 }).lean();
    response.json({ messages });
});