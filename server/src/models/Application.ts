import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        studentType: { type: String, enum: ["adult", "child"], required: true },
        childName: { type: String, trim: true },
        childAge: { type: Number, min: 3, max: 16 },
        relation: { type: String, trim: true },
        parentName: { type: String, trim: true },
        name: { type: String, trim: true },
        phone: { type: String, trim: true, required: true },
        email: { type: String, trim: true, lowercase: true, required: true },
        message: { type: String, trim: true, maxlength: 2000 },
    },
    { timestamps: true, versionKey: false },
);

export const Application = mongoose.model("Application", applicationSchema);