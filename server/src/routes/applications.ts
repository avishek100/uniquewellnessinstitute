import { Router } from "express";
import mongoose from "mongoose";
import { ChatConversation } from "../models/ChatConversation.js";
import { Application } from "../models/Application.js";
import { applicationInputSchema } from "../schemas/application.js";
import { createChatAccessToken, hashChatAccessToken } from "../utils/chatAccess.js";

export const applicationsRouter = Router();

applicationsRouter.post("/", async (request, response) => {
    const parsed = applicationInputSchema.safeParse(request.body);
    if (!parsed.success) {
        response.status(400).json({
            message: "Please check the application details and try again.",
            errors: parsed.error.issues.map(({ path, message }) => ({ path, message })),
        });
        return;
    }

    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Applications are temporarily unavailable." });
        return;
    }

    try {
        const application = await Application.create(parsed.data);
        const chatToken = createChatAccessToken();
        const visitorName =
            parsed.data.studentType === "child"
                ? parsed.data.parentName || parsed.data.childName || "Applicant"
                : parsed.data.name || "Applicant";
        const conversation = await ChatConversation.create({
            applicationId: application._id,
            visitorName,
            visitorEmail: parsed.data.email,
            accessTokenHash: hashChatAccessToken(chatToken),
        });
        response.status(201).json({
            message: "Application received.",
            applicationId: application.id,
            conversationId: conversation.id,
            chatToken,
        });
    } catch (error) {
        response.status(500).json({ message: "Could not save the application." });
        console.error("Could not save application:", error);
    }
});