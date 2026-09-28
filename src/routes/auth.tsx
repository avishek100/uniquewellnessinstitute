import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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

  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-16">
      <div className="card-soft w-full max-w-md p-8">
        <h1 className="text-3xl">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Account access will be available when the new backend is connected.
        </p>

        <p role="status" className="mt-5 border border-accent bg-accent/20 px-4 py-3 text-sm">
          Frontend preview only. No account information is sent or stored.
        </p>

        <button type="button" disabled className="btn-outline mt-6 w-full disabled:opacity-60">
          Continue with Google
        </button>
        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>

        <form className="grid gap-4">
          {mode === "signup" && (
            <>
              <label className="grid gap-1.5 text-sm font-medium">
                Full name
                <input className="field" name="fullName" disabled />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Phone number
                <input className="field" name="phone" type="tel" placeholder="+91 ..." disabled />
              </label>
            </>
          )}
          <label className="grid gap-1.5 text-sm font-medium">
            Email
            <input className="field" name="email" type="email" disabled />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Password
            <input className="field" name="password" type="password" disabled />
          </label>
          <button type="button" disabled className="btn-primary mt-2 w-full disabled:opacity-60">
            Account services coming soon
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
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
