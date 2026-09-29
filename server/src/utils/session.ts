import type { Response } from "express";
import jwt from "jsonwebtoken";

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

export function getSessionUserId(token: string | undefined): string | undefined {
    const secret = process.env.JWT_SECRET;
    if (!token || !secret || secret.length < 32) return undefined;

    try {
        const payload = jwt.verify(token, secret);
        return typeof payload === "string" ? undefined : payload.sub;
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