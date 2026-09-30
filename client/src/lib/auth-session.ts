import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./api";

export type AuthSessionUser = {
    fullName: string;
    email: string;
    phone?: string;
};

export const authSessionQueryKey = ["auth", "session"] as const;

async function fetchAuthSession(): Promise<AuthSessionUser | null> {
    const response = await apiClient.request("/api/auth/me", { credentials: "include" });
    if (response.status === 401) return null;
    if (!response.ok) throw new Error("Could not check sign-in status.");

    const result = (await response.json()) as { user?: AuthSessionUser };
    return result.user ?? null;
}

export function useAuthSession(enabled = true) {
    return useQuery({
        queryKey: authSessionQueryKey,
        queryFn: fetchAuthSession,
        enabled,
        staleTime: 60_000,
        retry: false,
    });
}