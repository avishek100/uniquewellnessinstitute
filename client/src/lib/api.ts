const rawApiUrl = (import.meta.env["VITE_API_URL"] as string | undefined)?.trim().replace(/\/$/, "");

export const API_BASE_URL = rawApiUrl || (import.meta.env.PROD ? "" : "http://localhost:4000");

export const apiClient = {
    request(endpoint: string, options: RequestInit = {}): Promise<Response> {
        const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
        return fetch(url, options);
    },
};