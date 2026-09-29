import bcrypt from "bcryptjs";
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { OAuth2Client } from "google-auth-library";
import mongoose from "mongoose";
import { User } from "../models/User.js";
import { googleInputSchema, loginInputSchema, signupInputSchema } from "../schemas/auth.js";
import {
    clearSessionCookie,
    getSessionUserId,
    isSessionConfigured,
    sessionCookieName,
    setSessionCookie,
} from "../utils/session.js";

export const authRouter = Router();

const googleClient = new OAuth2Client();
const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
});

authRouter.use(authRateLimit);

authRouter.post("/signup", async (request, response) => {
    const parsed = signupInputSchema.safeParse(request.body);
    if (!parsed.success) {
        response.status(400).json({ message: "Please check your account details." });
        return;
    }
    if (!isSessionConfigured()) {
        response.status(503).json({ message: "Account services are not configured." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Account services are temporarily unavailable." });
        return;
    }

    const { fullName, phone, email, password } = parsed.data;
    try {
        if (await User.exists({ email })) {
            response.status(409).json({ message: "An account with this email already exists." });
            return;
        }

        const user = await User.create({
            fullName,
            phone,
            email,
            passwordHash: await bcrypt.hash(password, 12),
        });
        setSessionCookie(response, user.id);
        response.status(201).json({ user: toPublicUser(user) });
    } catch (error) {
        if (isDuplicateKeyError(error)) {
            response.status(409).json({ message: "An account with this email already exists." });
            return;
        }
        console.error("Could not create account:", error);
        response.status(500).json({ message: "Could not create the account." });
    }
});

authRouter.post("/login", async (request, response) => {
    const parsed = loginInputSchema.safeParse(request.body);
    if (!parsed.success) {
        response.status(400).json({ message: "Please enter a valid email and password." });
        return;
    }
    if (!isSessionConfigured()) {
        response.status(503).json({ message: "Account services are not configured." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Account services are temporarily unavailable." });
        return;
    }

    const { email, password } = parsed.data;
    try {
        const user = await User.findOne({ email }).select("+passwordHash");
        if (!user?.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
            response.status(401).json({ message: "Email or password is incorrect." });
            return;
        }

        setSessionCookie(response, user.id);
        response.json({ user: toPublicUser(user) });
    } catch (error) {
        console.error("Could not log in:", error);
        response.status(500).json({ message: "Could not log in." });
    }
});

authRouter.post("/google", async (request, response) => {
    const parsed = googleInputSchema.safeParse(request.body);
    if (!parsed.success) {
        response.status(400).json({ message: "Google sign-in did not return a credential." });
        return;
    }
    if (!process.env.GOOGLE_CLIENT_ID || !isSessionConfigured()) {
        response.status(503).json({ message: "Google sign-in is not configured." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Account services are temporarily unavailable." });
        return;
    }

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: parsed.data.credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const googleProfile = ticket.getPayload();
        if (!googleProfile?.sub || !googleProfile.email || googleProfile.email_verified !== true) {
            response.status(401).json({ message: "Google could not verify this account." });
            return;
        }

        const email = googleProfile.email.toLowerCase();
        let user = await User.findOne({ email });
        if (user) {
            if (user.googleId && user.googleId !== googleProfile.sub) {
                response.status(409).json({ message: "This email is linked to another Google account." });
                return;
            }
            user.googleId = googleProfile.sub;
            await user.save();
        } else {
            user = await User.create({
                fullName: googleProfile.name?.trim() || email.split("@")[0],
                email,
                googleId: googleProfile.sub,
            });
        }

        setSessionCookie(response, user.id);
        response.json({ user: toPublicUser(user) });
    } catch (error) {
        console.error("Could not verify Google sign-in:", error);
        response.status(401).json({ message: "Google sign-in could not be verified." });
    }
});

authRouter.get("/me", async (request, response) => {
    if (!isSessionConfigured()) {
        response.status(503).json({ message: "Account services are not configured." });
        return;
    }
    if (mongoose.connection.readyState !== 1) {
        response.status(503).json({ message: "Account services are temporarily unavailable." });
        return;
    }

    const userId = getSessionUserId(request.cookies?.[sessionCookieName]);
    if (!userId) {
        response.status(401).json({ message: "Not signed in." });
        return;
    }

    const user = await User.findById(userId);
    if (!user) {
        clearSessionCookie(response);
        response.status(401).json({ message: "Not signed in." });
        return;
    }
    response.json({ user: toPublicUser(user) });
});

authRouter.post("/logout", (_request, response) => {
    clearSessionCookie(response);
    response.status(204).end();
});

function toPublicUser(user: InstanceType<typeof User>) {
    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
    };
}

function isDuplicateKeyError(error: unknown): boolean {
    return error instanceof mongoose.mongo.MongoServerError && error.code === 11000;
}