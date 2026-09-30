import mongoose from "mongoose";

const scheduledClassSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, maxlength: 120 },
        startsAt: { type: Date, required: true, index: true },
        instructor: { type: String, trim: true, maxlength: 100, default: "" },
        description: { type: String, trim: true, maxlength: 1000, default: "" },
        meetingUrl: { type: String, trim: true, maxlength: 500, default: "" },
    },
    { timestamps: true, versionKey: false },
);

export const ScheduledClass = mongoose.model("ScheduledClass", scheduledClassSchema);