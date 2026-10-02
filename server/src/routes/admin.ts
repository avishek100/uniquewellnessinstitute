import { Router } from "express";
import mongoose from "mongoose";
import { z } from "zod";
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

adminRouter.delete("/classes/:classId", async (request, response) => {
    const { classId } = request.params;
    if (!mongoose.isValidObjectId(classId)) {
        response.status(400).json({ message: "Invalid class ID." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Class schedules are temporarily unavailable." });
        return;
    }

    const deleted = await ScheduledClass.findByIdAndDelete(classId);
    if (!deleted) {
        response.status(404).json({ message: "Class not found." });
        return;
    }
    response.status(200).json({ message: "Class deleted successfully." });
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

const updateApplicationSchema = z.object({
    status: z.enum(["pending", "reviewed", "contacted", "enrolled", "rejected"]).optional(),
    notes: z.string().trim().max(2000).optional(),
});

adminRouter.patch("/applications/:applicationId", async (request, response) => {
    const { applicationId } = request.params;
    if (!mongoose.isValidObjectId(applicationId)) {
        response.status(400).json({ message: "Invalid application ID." });
        return;
    }
    const parsed = updateApplicationSchema.safeParse(request.body);
    if (!parsed.success) {
        response.status(400).json({ message: "Invalid application data." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Application data is temporarily unavailable." });
        return;
    }

    const updated = await Application.findByIdAndUpdate(
        applicationId,
        { $set: parsed.data },
        { new: true },
    ).lean();
    if (!updated) {
        response.status(404).json({ message: "Application not found." });
        return;
    }
    response.status(200).json({ application: updated });
});

adminRouter.delete("/applications/:applicationId", async (request, response) => {
    const { applicationId } = request.params;
    if (!mongoose.isValidObjectId(applicationId)) {
        response.status(400).json({ message: "Invalid application ID." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Application data is temporarily unavailable." });
        return;
    }

    const deleted = await Application.findByIdAndDelete(applicationId);
    if (!deleted) {
        response.status(404).json({ message: "Application not found." });
        return;
    }
    response.status(200).json({ message: "Application deleted successfully." });
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
    if (!mongoose.isValidObjectId(conversationId)) {
        response.status(400).json({ message: "Invalid conversation." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Chat is temporarily unavailable." });
        return;
    }

    const appConv = await ChatConversation.findByIdAndDelete(conversationId);
    const suppConv = appConv ? null : await SupportConversation.findByIdAndDelete(conversationId);
    if (!appConv && !suppConv) {
        response.status(404).json({ message: "Conversation not found." });
        return;
    }

    await ChatMessage.deleteMany({ conversationId });
    response.status(200).json({ message: "Conversation deleted successfully." });
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

adminRouter.delete("/messages/:messageId", async (request, response) => {
    const { messageId } = request.params;
    if (!mongoose.isValidObjectId(messageId)) {
        response.status(400).json({ message: "Invalid message ID." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Chat is temporarily unavailable." });
        return;
    }

    const deletedMessage = await ChatMessage.findByIdAndDelete(messageId);
    if (!deletedMessage) {
        response.status(404).json({ message: "Message not found." });
        return;
    }

    const lastMsg = await ChatMessage.findOne({ conversationId: deletedMessage.conversationId }).sort({ createdAt: -1 });
    if (lastMsg) {
        await ChatConversation.findByIdAndUpdate(deletedMessage.conversationId, { lastMessageAt: lastMsg.createdAt });
        await SupportConversation.findByIdAndUpdate(deletedMessage.conversationId, { lastMessageAt: lastMsg.createdAt });
    }

    response.status(200).json({ message: "Message deleted successfully.", conversationId: deletedMessage.conversationId });
});