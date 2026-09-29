import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true, trim: true, maxlength: 100 },
        phone: { type: String, trim: true, maxlength: 32 },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, select: false },
        googleId: { type: String, unique: true, sparse: true },
    },
    { timestamps: true, versionKey: false },
);

export const User = mongoose.model("User", userSchema);