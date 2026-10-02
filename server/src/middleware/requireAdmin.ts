import type { RequestHandler } from "express";
import { getAdminSession, getBearerTokenFromHeader, sessionCookieName } from "../utils/session.js";

export const requireAdmin: RequestHandler = async (request, response, next) => {
    if (!process.env.ADMIN_EMAIL?.trim() || !process.env.ADMIN_PASSWORD) {
        response.status(503).json({ message: "Admin access is not configured." });
        return;
    }

    const bearerToken = getBearerTokenFromHeader(request.headers.authorization);
    const admin =
        getAdminSession(request.cookies?.[sessionCookieName]) ||
        getAdminSession(bearerToken);

    if (!admin) {
        response.status(401).json({ message: "Please sign in with an admin account." });
        return;
    }

    response.locals.admin = { email: admin.email };
    next();
};