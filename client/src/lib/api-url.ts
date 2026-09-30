const apiUrl = import.meta.env.PROD
    ? "https://uniquewellnessinstitute.onrender.com"
    : import.meta.env["VITE_API_URL"]?.trim().replace(/\/$/, "");

if (!apiUrl) {
    throw new Error("VITE_API_URL must be set to the API URL for local development.");
}

export { apiUrl };
