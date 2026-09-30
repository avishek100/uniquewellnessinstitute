const knownClientOrigins = [
    "https://uniquewellnessinstitute-three.vercel.app",
    "http://localhost:8080",
];

export function isAllowedClientOrigin(origin: string | undefined): boolean {
    if (!origin) return true;

    const configuredOrigins = (process.env.CLIENT_ORIGIN ?? "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
    const isLocalDevelopmentOrigin =
        process.env.NODE_ENV !== "production" &&
        /^https?:\/\/(localhost|127(?:\.\d{1,3}){3}|\[::1\])(?::\d+)?$/.test(origin);

    return knownClientOrigins.includes(origin) || configuredOrigins.includes(origin) || isLocalDevelopmentOrigin;
}