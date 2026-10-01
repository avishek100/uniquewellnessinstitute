import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChatConversation",
            required: true,
            index: true,
        },
        sender: { type: String, enum: ["visitor", "admin"], required: true },
        senderName: { type: String, required: true, trim: true },
        body: { type: String, required: true, trim: true, maxlength: 2000 },
    },
    { timestamps: true, versionKey: false },
);

chatMessageSchema.index({ conversationId: 1, createdAt: 1 });

export const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);