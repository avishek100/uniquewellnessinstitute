import { z } from "zod";

export const scheduledClassInputSchema = z.object({
    title: z.string().trim().min(2).max(120),
    startsAt: z.string().trim().min(1).refine((value) => Number.isFinite(Date.parse(value))),
    instructor: z.string().trim().max(100).default(""),
    description: z.string().trim().max(1000).default(""),
    meetingUrl: z
        .string()
        .trim()
        .max(500)
        .refine((value) => {
            if (!value) return true;
            try {
                return ["http:", "https:"].includes(new URL(value).protocol);
            } catch {
                return false;
            }
        })
        .default(""),
});