import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.warn("MONGODB_URI is not set; database-backed routes are unavailable.");
        return;
    }

    try {
        await mongoose.connect(uri);
        console.info("Connected to MongoDB.");
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
    }
}