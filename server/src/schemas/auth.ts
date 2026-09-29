import { z } from "zod";

const emailSchema = z.string().trim().email().transform((email) => email.toLowerCase());
const passwordSchema = z.string().min(8).max(128);

export const signupInputSchema = z.object({
    fullName: z.string().trim().min(2).max(100),
    phone: z.string().trim().min(7).max(32),
    email: emailSchema,
    password: passwordSchema,
});

export const loginInputSchema = z.object({
    email: emailSchema,
    password: z.string().min(1).max(128),
});

export const googleInputSchema = z.object({
    credential: z.string().min(1),
});