import { Router } from "express";
import mongoose from "mongoose";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { Application } from "../models/Application.js";
import { ChatConversation } from "../models/ChatConversation.js";
import { ChatMessage } from "../models/ChatMessage.js";
import { ScheduledClass } from "../models/ScheduledClass.js";
import { SupportConversation } from "../models/SupportConversation.js";
import { scheduledClassInputSchema } from "../schemas/scheduledClass.js";

export const adminRouter = Router();

adminRouter.use(requireAdmin);

adminRouter.get("/classes", async (_request, response) => {
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Class schedules are temporarily unavailable." });
        return;
    }

    const classes = await ScheduledClass.find().sort({ startsAt: 1 }).limit(200).lean();
    response.json({ classes });
});

adminRouter.post("/classes", async (request, response) => {
    const parsed = scheduledClassInputSchema.safeParse(request.body);
    if (!parsed.success) {
        response.status(400).json({ message: "Please check the class details." });
        return;
    }
    const startsAt = new Date(parsed.data.startsAt);
    if (startsAt.getTime() <= Date.now()) {
        response.status(400).json({ message: "Choose a future date and time for the class." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Class schedules are temporarily unavailable." });
        return;
    }

    const scheduledClass = await ScheduledClass.create({ ...parsed.data, startsAt });
    response.status(201).json({ scheduledClass });
});

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

adminRouter.delete("/conversations/:conversationId", async (request, response) => {
    const { conversationId } = request.params;
    const type = request.query.type;
    if (
        !mongoose.isValidObjectId(conversationId) ||
        (type !== "application" && type !== "support")
    ) {
        response.status(400).json({ message: "Invalid conversation." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Chat is temporarily unavailable." });
        return;
    }

    const deletedConversation =
        type === "application"
            ? await ChatConversation.findByIdAndDelete(conversationId)
            : await SupportConversation.findByIdAndDelete(conversationId);
    if (!deletedConversation) {
        response.status(404).json({ message: "Conversation not found." });
        return;
    }

    await ChatMessage.deleteMany({ conversationId });
    response.status(204).end();
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