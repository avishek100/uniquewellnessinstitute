import { z } from "zod";

const relationSchema = z.enum([
    "Mother",
    "Father",
    "Grandfather",
    "Grandmother",
    "Uncle",
    "Auntie",
    "Brother",
    "Sister",
    "Other",
]);

export const applicationInputSchema = z
    .object({
        studentType: z.enum(["adult", "child"]),
        childName: z.string().trim().optional(),
        childAge: z.coerce.number().int().min(3).max(16).optional(),
        relation: relationSchema.optional(),
        parentName: z.string().trim().optional(),
        name: z.string().trim().optional(),
        phone: z.string().trim().min(7).max(32),
        email: z.string().trim().email().transform((e) => e.toLowerCase()),
        message: z.string().trim().max(2000).optional(),
    })
    .superRefine((application, context) => {
        const requiredFields =
            application.studentType === "child"
                ? ["childName", "childAge", "relation", "parentName"]
                : ["name"];

        for (const field of requiredFields) {
            if (!application[field as keyof typeof application]) {
                context.addIssue({
                    code: "custom",
                    path: [field],
                    message: "This field is required.",
                });
            }
        }
    });