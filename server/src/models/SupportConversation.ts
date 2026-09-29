import mongoose from "mongoose";

const supportConversationSchema = new mongoose.Schema(
    {
        visitorUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        visitorName: { type: String, required: true, trim: true, maxlength: 100 },
        visitorEmail: { type: String, required: true, lowercase: true, trim: true },
        accessTokenHash: { type: String, required: true, select: false },
        lastMessageAt: { type: Date, default: Date.now },
    },
    { timestamps: true, versionKey: false },
);

export const SupportConversation = mongoose.model("SupportConversation", supportConversationSchema);