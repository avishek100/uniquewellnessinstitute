import type { RequestHandler } from "express";
import { User } from "../models/User.js";
import { getSessionUserId, sessionCookieName } from "../utils/session.js";

export function isAdminEmail(email: string): boolean {
    const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
        .split(",")
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean);
    return allowedEmails.includes(email.toLowerCase());
}

export const requireAdmin: RequestHandler = async (request, response, next) => {
    const adminEmails = (process.env.ADMIN_EMAILS ?? "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
    if (!adminEmails.length) {
        response.status(503).json({ message: "Admin access is not configured." });
        return;
    }

    const userId = getSessionUserId(request.cookies?.[sessionCookieName]);
    if (!userId) {
        response.status(401).json({ message: "Please sign in with an admin account." });
        return;
    }

    try {
        const user = await User.findById(userId).select("fullName email");
        if (!user) {
            response.status(401).json({ message: "Please sign in with an admin account." });
            return;
        }
        if (!isAdminEmail(user.email)) {
            response.status(403).json({ message: "This account does not have admin access." });
            return;
        }

        response.locals.admin = { id: user.id, fullName: user.fullName, email: user.email };
        next();
    } catch (error) {
        next(error);
    }
};