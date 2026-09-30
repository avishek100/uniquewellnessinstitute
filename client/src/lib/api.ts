const API_BASE_URL = (import.meta.env["VITE_API_URL"] || "http://localhost:4000")
    .trim()
    .replace(/\/$/, "");

if (import.meta.env.PROD) {
    const hostname = new URL(API_BASE_URL).hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") {
        throw new Error("VITE_API_URL must point to the hosted API in production.");
    }
}

export { API_BASE_URL };

export const apiClient = {
    request(endpoint: string, options: RequestInit = {}): Promise<Response> {
        return fetch(`${API_BASE_URL}${endpoint}`, options);
    },
};