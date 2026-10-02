const knownClientOrigins = [
    "https://uniquewellnessinstitute-three.vercel.app",
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:3000",
    "http://localhost:5173",
];

export function isAllowedClientOrigin(origin: string | undefined): boolean {
    if (!origin) return true;

    const normalizedOrigin = origin.trim().replace(/\/$/, "");

    const configuredOrigins = (process.env.CLIENT_ORIGIN ?? "")
        .split(",")
        .map((value) => value.trim().replace(/\/$/, ""))
        .filter(Boolean);

    const isLocalDevelopmentOrigin =
        process.env.NODE_ENV !== "production" &&
        /^https?:\/\/(localhost|127(?:\.\d{1,3}){3}|\[::1\])(?::\d+)?$/.test(normalizedOrigin);

    const isVercelDomain =
        /^https:\/\/[a-z0-9-]+(\.vercel\.app)$/i.test(normalizedOrigin) &&
        (process.env.ALLOW_VERCEL_PREVIEWS === "true" ||
            configuredOrigins.includes("*.vercel.app") ||
            configuredOrigins.some((configured) => configured.includes(".vercel.app")) ||
            knownClientOrigins.some((known) => known.includes(".vercel.app")));

    return (
        knownClientOrigins.includes(normalizedOrigin) ||
        configuredOrigins.includes(normalizedOrigin) ||
        isLocalDevelopmentOrigin ||
        isVercelDomain
    );
}