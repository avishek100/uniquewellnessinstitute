import mongoose from "mongoose";

const chatConversationSchema = new mongoose.Schema(
    {
        applicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
            required: true,
            unique: true,
        },
        visitorName: { type: String, required: true, trim: true },
        visitorEmail: { type: String, required: true, lowercase: true, trim: true },
        accessTokenHash: { type: String, required: true, select: false },
        lastMessageAt: { type: Date, default: Date.now },
    },
    { timestamps: true, versionKey: false },
);

chatConversationSchema.index({ lastMessageAt: -1 });

export const ChatConversation = mongoose.model("ChatConversation", chatConversationSchema);