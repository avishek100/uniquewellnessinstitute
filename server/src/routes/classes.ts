import { Router } from "express";
import mongoose from "mongoose";
import { ScheduledClass } from "../models/ScheduledClass.js";
import {
    getSessionUserId,
    isSessionConfigured,
    sessionCookieName,
} from "../utils/session.js";

export const classesRouter = Router();

classesRouter.get("/", async (request, response) => {
    if (!isSessionConfigured()) {
        response.status(503).json({ message: "Account services are not configured." });
        return;
    }
    if (!getSessionUserId(request.cookies?.[sessionCookieName])) {
        response.status(401).json({ message: "Not signed in." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Class schedules are temporarily unavailable." });
        return;
    }

    const classes = await ScheduledClass.find().sort({ startsAt: 1 }).limit(200).lean();
    response.json({ classes });
});