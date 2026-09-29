import { Router } from "express";
import mongoose from "mongoose";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { Application } from "../models/Application.js";
import { ChatConversation } from "../models/ChatConversation.js";
import { ChatMessage } from "../models/ChatMessage.js";
import { SupportConversation } from "../models/SupportConversation.js";

export const adminRouter = Router();

adminRouter.use(requireAdmin);

const conversationPipeline: mongoose.PipelineStage[] = [
    { $sort: { lastMessageAt: -1 } },
    {
        $lookup: {
            from: ChatMessage.collection.name,
            let: { conversationId: "$_id" },
            pipeline: [
                { $match: { $expr: { $eq: ["$conversationId", "$$conversationId"] } } },
                { $sort: { createdAt: -1 } },
                { $limit: 1 },
                { $project: { sender: 1, senderName: 1, body: 1, createdAt: 1 } },
            ],
            as: "lastMessage",
        },
    },
    { $unwind: { path: "$lastMessage", preserveNullAndEmptyArrays: true } },
    {
        $project: {
            visitorName: 1,
            visitorEmail: 1,
            applicationId: 1,
            lastMessageAt: 1,
            lastMessage: 1,
        },
    },
];

adminRouter.get("/applications", async (_request, response) => {
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Application data is temporarily unavailable." });
        return;
    }

    const applications = await Application.find().sort({ createdAt: -1 }).lean();
    response.json({ applications });
});

adminRouter.get("/conversations", async (_request, response) => {
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Chat is temporarily unavailable." });
        return;
    }

    const [applicationConversations, supportConversations] = await Promise.all([
        ChatConversation.aggregate(conversationPipeline),
        SupportConversation.aggregate(conversationPipeline),
    ]);
    const conversations = [
        ...applicationConversations.map((conversation) => ({ ...conversation, type: "application" })),
        ...supportConversations.map((conversation) => ({ ...conversation, type: "support" })),
    ].sort((left, right) => Date.parse(right.lastMessageAt) - Date.parse(left.lastMessageAt));

    response.json({ conversations });
});

adminRouter.get("/conversations/:conversationId/messages", async (request, response) => {
    const { conversationId } = request.params;
    if (!mongoose.isValidObjectId(conversationId)) {
        response.status(400).json({ message: "Invalid conversation." });
        return;
    }

    const conversation = await ChatConversation.exists({ _id: conversationId }) ??
        await SupportConversation.exists({ _id: conversationId });
    if (!conversation) {
        response.status(404).json({ message: "Conversation not found." });
        return;
    }

    const messages = await ChatMessage.find({ conversationId }).sort({ createdAt: 1 }).lean();
    response.json({ messages });
});