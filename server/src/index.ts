import "dotenv/config";
import { createServer } from "node:http";
import mongoose from "mongoose";
import { z } from "zod";
import { createApp } from "./app.js";
import { attachChatSocket } from "./chat/socket.js";
import { connectToDatabase } from "./config/database.js";

const envSchema = z.object({
    PORT: z.coerce.number().default(4000),
    JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters long"),
    MONGODB_URI: z.string().min(1, "MONGODB_URI is required").optional(),
    ADMIN_EMAIL: z.string().email().optional(),
    ADMIN_PASSWORD: z.string().optional(),
    CLIENT_ORIGIN: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error("❌ Invalid server environment configuration:", parsedEnv.error.format());
    process.exit(1);
}

const port = parsedEnv.data.PORT;

await connectToDatabase();
const server = createServer(createApp());
attachChatSocket(server);

server.listen(port, () => {
    console.info(`API listening on http://localhost:${port}`);
});

function gracefulShutdown(signal: string) {
    console.info(`Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
        try {
            await mongoose.connection.close();
            console.info("Closed database connection. Process terminated cleanly.");
            process.exit(0);
        } catch (error) {
            console.error("Error closing database connection during shutdown:", error);
            process.exit(1);
        }
    });
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));