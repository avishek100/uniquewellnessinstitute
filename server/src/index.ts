import "dotenv/config";
import { randomBytes } from "node:crypto";
import { createServer } from "node:http";
import { createApp } from "./app.js";
import { attachChatSocket } from "./chat/socket.js";
import { connectToDatabase } from "./config/database.js";

const port = Number(process.env.PORT ?? 4000);
const configuredSecret = process.env.JWT_SECRET;

if (configuredSecret && configuredSecret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long.");
}

if (!configuredSecret) {
    if (process.env.NODE_ENV === "production") {
        throw new Error("JWT_SECRET must be set in the server environment.");
    }
    process.env.JWT_SECRET = randomBytes(32).toString("hex");
    console.warn("JWT_SECRET is not set; using a temporary session secret for local development.");
}

await connectToDatabase();
const server = createServer(createApp());
attachChatSocket(server);
server.listen(port, () => {
    console.info(`API listening on http://localhost:${port}`);
});