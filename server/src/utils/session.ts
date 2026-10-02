import type { Response } from "express";
import jwt from "jsonwebtoken";
import { createHmac } from "node:crypto";

export const sessionCookieName = "uwi_session";

const sessionDurationDays = 30;
const sessionDurationMs = sessionDurationDays * 24 * 60 * 60 * 1000;

export function isSessionConfigured(): boolean {
    return Boolean(process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 32);
}

export function setSessionCookie(response: Response, userId: string): boolean {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) return false;

    const isProduction = process.env.NODE_ENV === "production";
    const token = jwt.sign({ sub: userId }, secret, { expiresIn: `${sessionDurationDays}d` });
    response.cookie(sessionCookieName, token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: sessionDurationMs,
    });
    return true;
}

export function createAdminSessionToken(email: string): string | undefined {
    const secret = process.env.JWT_SECRET;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!secret || secret.length < 32 || !adminPassword) return undefined;

    const credentialVersion = createHmac("sha256", secret).update(adminPassword).digest("hex");
    return jwt.sign({ sub: email, role: "admin", email, credentialVersion }, secret, {
        expiresIn: `${sessionDurationDays}d`,
    });
}

export function setAdminSessionCookie(response: Response, email: string): boolean {
    const token = createAdminSessionToken(email);
    if (!token) return false;

    const isProduction = process.env.NODE_ENV === "production";
    response.cookie(sessionCookieName, token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: sessionDurationMs,
    });
    return true;
}

export function getSessionUserId(token: string | undefined): string | undefined {
    const secret = process.env.JWT_SECRET;
    if (!token || !secret || secret.length < 32) return undefined;

    try {
        const payload = jwt.verify(token, secret);
        return typeof payload === "string" || payload.role === "admin" ? undefined : payload.sub;
    } catch {
        return undefined;
    }
}

export function getAdminSession(token: string | undefined): { email: string } | undefined {
    const secret = process.env.JWT_SECRET;
    const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!token || !secret || secret.length < 32 || !configuredEmail || !adminPassword) return undefined;

    try {
        const payload = jwt.verify(token, secret);
        const credentialVersion = createHmac("sha256", secret).update(adminPassword).digest("hex");
        if (
            typeof payload === "string" ||
            payload.role !== "admin" ||
            typeof payload.email !== "string" ||
            payload.email.toLowerCase() !== configuredEmail ||
            payload.credentialVersion !== credentialVersion
        ) {
            return undefined;
        }
        return { email: configuredEmail };
    } catch {
        return undefined;
    }
}

export function getBearerTokenFromHeader(header: string | undefined): string | undefined {
    if (!header) return undefined;
    const match = /^Bearer\s+(.+)$/i.exec(header.trim());
    return match?.[1] || undefined;
}

export function clearSessionCookie(response: Response): void {
    const isProduction = process.env.NODE_ENV === "production";
    response.clearCookie(sessionCookieName, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
    });
}