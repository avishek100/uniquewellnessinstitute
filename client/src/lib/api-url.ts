const apiUrl = import.meta.env["VITE_API_URL"]?.trim().replace(/\/$/, "");

if (!apiUrl) {
    throw new Error("VITE_API_URL must be set to the API URL.");
}

if (import.meta.env.PROD) {
    const hostname = new URL(apiUrl).hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") {
        throw new Error("VITE_API_URL must not point to localhost in production.");
    }
}

export { apiUrl };
