const configuredApiUrl = import.meta.env["VITE_API_URL"]?.replace(/\/$/, "");

if (
    import.meta.env.PROD &&
    (!configuredApiUrl || /^https?:\/\/(localhost|127(?:\.\d{1,3}){3})(?::\d+)?$/.test(configuredApiUrl))
) {
    throw new Error("Set VITE_API_URL to the deployed API URL before building for production.");
}

export const apiUrl = configuredApiUrl ?? "http://localhost:4000";