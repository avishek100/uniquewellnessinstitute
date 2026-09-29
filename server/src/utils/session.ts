import type { Response } from "express";
import jwt from "jsonwebtoken";
import { createHmac } from "node:crypto";

export const sessionCookieName = "uwi_session";

const sessionDurationMs = 7 * 24 * 60 * 60 * 1000;

export function isSessionConfigured(): boolean {
    return Boolean(process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 32);
}

export function setSessionCookie(response: Response, userId: string): boolean {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) return false;

    const token = jwt.sign({ sub: userId }, secret, { expiresIn: "7d" });
    response.cookie(sessionCookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: sessionDurationMs,
    });
    return true;
}

export function setAdminSessionCookie(response: Response, email: string): boolean {
    const secret = process.env.JWT_SECRET;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!secret || secret.length < 32 || !adminPassword) return false;

    const credentialVersion = createHmac("sha256", secret).update(adminPassword).digest("hex");
    const token = jwt.sign(
        { sub: email, role: "admin", email, credentialVersion },
        secret,
        { expiresIn: "7d" },
    );
    response.cookie(sessionCookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
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

export function clearSessionCookie(response: Response): void {
    response.clearCookie(sessionCookieName, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
}