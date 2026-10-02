import bcrypt from "bcryptjs";
import { Router } from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { timingSafeEqual } from "node:crypto";
import { User } from "../models/User.js";
import {
    changePasswordInputSchema,
    loginInputSchema,
    profileInputSchema,
    signupInputSchema,
} from "../schemas/auth.js";
import {
    clearSessionCookie,
    createAdminSessionToken,
    getSessionUserId,
    isSessionConfigured,
    sessionCookieName,
    setAdminSessionCookie,
    setSessionCookie,
} from "../utils/session.js";

export const authRouter = Router();

const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
});

authRouter.post("/signup", authRateLimit, async (request, response) => {
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

authRouter.post("/login", authRateLimit, async (request, response) => {
    const parsed = loginInputSchema.safeParse(request.body);
    if (!parsed.success) {
        response.status(400).json({ message: "Please enter a valid email and password." });
        return;
    }
    if (!isSessionConfigured()) {
        response.status(503).json({ message: "Account services are not configured." });
        return;
    }

    const adminLogin = checkAdminCredentials(parsed.data.email, parsed.data.password);
    if (adminLogin.status === "not-configured") {
        response.status(503).json({ message: "Admin access is not configured." });
        return;
    }
    if (adminLogin.status === "valid") {
        setAdminSessionCookie(response, adminLogin.email);
        const adminToken = createAdminSessionToken(adminLogin.email);
        response.json({
            user: { fullName: "Administrator", email: adminLogin.email },
            isAdmin: true,
            token: adminToken ?? undefined,
        });
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
        response.json({ user: null });
        return;
    }

    const user = await User.findById(userId);
    if (!user) {
        clearSessionCookie(response);
        response.json({ user: null });
        return;
    }
    response.json({ user: toPublicUser(user) });
});

authRouter.patch("/me", async (request, response) => {
    const parsed = profileInputSchema.safeParse(request.body);
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

    const userId = getSessionUserId(request.cookies?.[sessionCookieName]);
    if (!userId) {
        response.status(401).json({ message: "Not signed in." });
        return;
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            clearSessionCookie(response);
            response.status(401).json({ message: "Not signed in." });
            return;
        }

        user.fullName = parsed.data.fullName;
        user.phone = parsed.data.phone;
        user.email = parsed.data.email;
        await user.save();
        response.json({ user: toPublicUser(user) });
    } catch (error) {
        if (isDuplicateKeyError(error)) {
            response.status(409).json({ message: "An account with this email already exists." });
            return;
        }
        console.error("Could not update account:", error);
        response.status(500).json({ message: "Could not update the account." });
    }
});

authRouter.post("/password", authRateLimit, async (request, response) => {
    const parsed = changePasswordInputSchema.safeParse(request.body);
    if (!parsed.success) {
        response.status(400).json({ message: "Please enter a valid current and new password." });
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

    const userId = getSessionUserId(request.cookies?.[sessionCookieName]);
    if (!userId) {
        response.status(401).json({ message: "Not signed in." });
        return;
    }

    try {
        const user = await User.findById(userId).select("+passwordHash");
        if (!user?.passwordHash) {
            clearSessionCookie(response);
            response.status(401).json({ message: "Not signed in." });
            return;
        }
        if (!(await bcrypt.compare(parsed.data.currentPassword, user.passwordHash))) {
            response.status(400).json({ message: "Current password is incorrect." });
            return;
        }

        user.passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
        await user.save();
        response.json({ message: "Password updated." });
    } catch (error) {
        console.error("Could not update password:", error);
        response.status(500).json({ message: "Could not update the password." });
    }
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

function checkAdminCredentials(
    email: string,
    password: string,
): { status: "not-admin" | "not-configured" } | { status: "valid"; email: string } {
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    if (!adminEmail || email !== adminEmail) return { status: "not-admin" };

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || Buffer.byteLength(adminPassword) > 128) {
        return { status: "not-configured" };
    }

    const submittedPassword = Buffer.from(password);
    const configuredPassword = Buffer.from(adminPassword);
    if (
        submittedPassword.length !== configuredPassword.length ||
        !timingSafeEqual(submittedPassword, configuredPassword)
    ) {
        return { status: "not-admin" };
    }

    return { status: "valid", email: adminEmail };
}

function isDuplicateKeyError(error: unknown): boolean {
    return error instanceof mongoose.mongo.MongoServerError && error.code === 11000;
}