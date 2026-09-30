import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { isAllowedClientOrigin } from "./config/clientOrigins.js";
import { adminRouter } from "./routes/admin.js";
import { applicationsRouter } from "./routes/applications.js";
import { authRouter } from "./routes/auth.js";
import { chatRouter } from "./routes/chat.js";
import { classesRouter } from "./routes/classes.js";

export function createApp() {
    const app = express();
    app.set("trust proxy", 1);
    app.use(
        cors({
            origin: (origin, callback) => callback(null, isAllowedClientOrigin(origin)),
            credentials: true,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization", "x-chat-token"],
        }),
    );
    app.use(cookieParser());
    app.use(express.json({ limit: "10kb" }));

    app.get("/api/health", (_request, response) => {
        const database = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
        response.status(database === "connected" ? 200 : 503).json({
            status: database === "connected" ? "ok" : "degraded",
            database,
        });
    });
    app.use("/api/auth", authRouter);
    app.use("/api/classes", classesRouter);
    app.use("/api/admin", adminRouter);
    app.use("/api/chat", chatRouter);
    app.use("/api/applications", applicationsRouter);
    app.use((_request, response) => {
        response.status(404).json({ message: "Route not found." });
    });

    return app;
}