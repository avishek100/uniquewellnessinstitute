const rawApiUrl = (import.meta.env["VITE_API_URL"] as string | undefined)?.trim().replace(/\/$/, "");

export const API_BASE_URL = rawApiUrl || (import.meta.env.PROD ? "" : "http://localhost:4000");
const ADMIN_SESSION_STORAGE_KEY = "uwi_admin_session";

export function getAdminSessionToken(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
}

export function setAdminSessionToken(token: string | null) {
    if (typeof window === "undefined") return;
    if (!token) {
        window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
        return;
    }
    window.localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, token);
}

export const apiClient = {
    request(endpoint: string, options: RequestInit = {}): Promise<Response> {
        const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
        const headers = new Headers(options.headers ?? {});
        const adminToken = getAdminSessionToken();

        if (adminToken && !headers.has("Authorization")) {
            headers.set("Authorization", `Bearer ${adminToken}`);
        }

        return fetch(url, { ...options, headers });
    },
};