import { authSessionQueryKey, type AuthSessionUser } from "@/lib/auth-session";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

const apiUrl = import.meta.env["VITE_API_URL"] ?? "http://localhost:4000";

type AuthResponse = {
  message?: string;
  isAdmin?: boolean;
  user?: AuthSessionUser;
};

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Log in or Sign up — Unique Wellness Institute" },
      {
        name: "description",
        content: "Log in or create your Unique Wellness Institute account to manage chess lessons.",
      },
      { property: "og:title", content: "Log in or Sign up — Unique Wellness Institute" },
      { property: "og:description", content: "Access your chess academy account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function requestAuth(path: string, body: Record<string, string>) {
    const response = await fetch(`${apiUrl}/api/auth/${path}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = (await response.json().catch(() => ({}))) as AuthResponse;
    if (!response.ok) throw new Error(result.message ?? "Account request failed.");
    return result;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
    setIsSubmitting(true);
    try {
      const result = await requestAuth(mode === "signup" ? "signup" : "login", payload);
      const signedInAsAdmin = result.isAdmin === true;
      if (!signedInAsAdmin && result.user) {
        queryClient.setQueryData(authSessionQueryKey, result.user);
      }
      toast.success(
        signedInAsAdmin
          ? "Admin signed in"
          : mode === "signup"
            ? "Account created"
            : "Welcome back",
        {
          description: result.user?.fullName,
        },
      );
      await navigate({ to: signedInAsAdmin ? "/admin" : "/dashboard" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Account request failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-16">
      <div className="card-soft w-full max-w-md p-8">
        <h1 className="text-3xl">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "login"
            ? "Sign in to your Unique Wellness Institute account."
            : "Create an account to get started with your chess lessons."}
        </p>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <label className="grid gap-1.5 text-sm font-medium">
                Full name
                <input
                  className="field"
                  name="fullName"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Phone number
                <input
                  className="field"
                  name="phone"
                  type="tel"
                  placeholder="+91 ..."
                  autoComplete="tel"
                  required
                  minLength={7}
                  maxLength={32}
                />
              </label>
            </>
          )}
          <label className="grid gap-1.5 text-sm font-medium">
            Email
            <input className="field" name="email" type="email" autoComplete="email" required />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Password
            <input
              className="field"
              name="password"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              required
              minLength={mode === "signup" ? 8 : 1}
              maxLength={128}
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary mt-2 w-full disabled:opacity-60"
          >
            {isSubmitting ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="font-semibold text-primary"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      </div>
    </section>
  );
}
