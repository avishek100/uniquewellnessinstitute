import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { adminRouter } from "./routes/admin.js";
import { applicationsRouter } from "./routes/applications.js";
import { chatRouter } from "./routes/chat.js";
import { authRouter } from "./routes/auth.js";

export function isAllowedOrigin(origin?: string): boolean {
    const configuredOrigins = process.env.CLIENT_ORIGIN
        ?.split(",")
        .map((value) => value.trim());

    return (
        !origin ||
        (configuredOrigins
            ? configuredOrigins.includes(origin)
            : /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))
    );
}

export function createApp() {
    const app = express();

    app.use(
        cors({
            credentials: true,
            origin: (origin, callback) => callback(null, isAllowedOrigin(origin)),
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
    app.use("/api/admin", adminRouter);
    app.use("/api/chat", chatRouter);
    app.use("/api/applications", applicationsRouter);
    app.use((_request, response) => {
        response.status(404).json({ message: "Route not found." });
    });

    return app;
}