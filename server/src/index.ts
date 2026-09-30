import "dotenv/config";
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
    throw new Error("JWT_SECRET must be set in the server environment.");
}

await connectToDatabase();
const server = createServer(createApp());
attachChatSocket(server);
server.listen(port, () => {
    console.info(`API listening on http://localhost:${port}`);
});