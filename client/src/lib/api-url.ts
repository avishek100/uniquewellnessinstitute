const configuredApiUrl = import.meta.env["VITE_API_URL"]?.replace(/\/$/, "");

if (!configuredApiUrl && !import.meta.env.DEV) {
    throw new Error("VITE_API_URL must be set to the deployed API URL in production.");
}

export const apiUrl = configuredApiUrl ?? "http://localhost:4000";