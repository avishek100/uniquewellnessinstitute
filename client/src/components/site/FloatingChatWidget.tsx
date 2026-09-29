import {
    getVisitorChatSession,
    saveVisitorChatSession,
    visitorChatSessionEvent,
    type VisitorChatSession,
} from "@/lib/visitor-chat";
import { Link, useLocation } from "@tanstack/react-router";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ApplicationChat } from "./ApplicationChat";

const apiUrl = import.meta.env["VITE_API_URL"] ?? "http://localhost:4000";

export function FloatingChatWidget() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [session, setSession] = useState<VisitorChatSession | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isCheckingAuthentication, setIsCheckingAuthentication] = useState(false);
    const [isStarting, setIsStarting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const syncSession = () => setSession(getVisitorChatSession());
        syncSession();
        window.addEventListener(visitorChatSessionEvent(), syncSession);
        return () => window.removeEventListener(visitorChatSessionEvent(), syncSession);
    }, []);

    useEffect(() => {
        let active = true;
        setIsCheckingAuthentication(true);
        void fetch(`${apiUrl}/api/auth/me`, { credentials: "include" })
            .then((response) => {
                if (active) setIsAuthenticated(response.ok);
            })
            .catch(() => {
                if (active) setIsAuthenticated(false);
            })
            .finally(() => {
                if (active) setIsCheckingAuthentication(false);
            });

        return () => {
            active = false;
        };
    }, [location.pathname]);

    if (location.pathname === "/admin" || location.pathname === "/auth") return null;
    if (isCheckingAuthentication || isAuthenticated !== true) return null;

    async function handleStartChat() {
        setIsStarting(true);
        setError("");

        try {
            const response = await fetch(`${apiUrl}/api/chat/conversations`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });
            const result = (await response.json().catch(() => ({}))) as {
                message?: string;
                conversationId?: string;
                chatToken?: string;
                visitorName?: string;
                message?: string;
            };
            if (!response.ok || !result.conversationId || !result.chatToken) {
                if (response.status === 401) setIsAuthenticated(false);
                throw new Error(result.message ?? "Could not start chat.");
            }

            const nextSession = {
                conversationId: result.conversationId,
                chatToken: result.chatToken,
                visitorName: result.visitorName ?? String(formData.get("visitorName")),
            };
            saveVisitorChatSession(nextSession);
            setSession(nextSession);
        } catch (startError) {
            setError(startError instanceof Error ? startError.message : "Could not start chat.");
        } finally {
            setIsStarting(false);
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
            {isOpen && (
                <div className="h-[min(34rem,calc(100dvh-6rem))] w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-border bg-background shadow-xl">
                    {session ? (
                        isCheckingAuthentication ? (
                            <p className="grid h-full place-items-center text-sm text-muted-foreground">
                                Checking sign-in...
                            </p>
                        ) : !isAuthenticated ? (
                            <SignInRequired onClose={() => setIsOpen(false)} />
                        ) : (
                            <ApplicationChat
                                conversationId={session.conversationId}
                                chatToken={session.chatToken}
                                visitorName={session.visitorName}
                                mode="visitor"
                                floating
                                onClose={() => setIsOpen(false)}
                            />
                        )
                    ) : isCheckingAuthentication ? (
                        <p className="grid h-full place-items-center text-sm text-muted-foreground">
                            Checking sign-in...
                        </p>
                    ) : !isAuthenticated ? (
                        <SignInRequired onClose={() => setIsOpen(false)} />
                    ) : (
                        <section className="flex h-full min-h-0 flex-col p-5" aria-label="Start a support chat">
                            <header className="flex items-start justify-between gap-3 border-b border-border pb-4">
                                <div>
                                    <h2 className="text-lg font-semibold">Chat with our team</h2>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Start a private conversation with our team.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="grid size-9 shrink-0 place-items-center text-muted-foreground hover:bg-muted hover:text-foreground"
                                    aria-label="Close chat"
                                >
                                    <X className="size-4" />
                                </button>
                            </header>

                            <div className="mt-5 grid gap-4">
                                {error && (
                                    <p className="text-sm text-destructive" role="alert">
                                        {error}
                                    </p>
                                )}
                                <button
                                    type="button"
                                    onClick={() => void handleStartChat()}
                                    className="btn-primary"
                                    disabled={isStarting}
                                >
                                    {isStarting ? "Connecting..." : "Start conversation"}
                                </button>
                            </div>

                            <p className="mt-auto border-t border-border pt-4 text-xs text-muted-foreground">
                                Prefer email?{" "}
                                <Link to="/contact" className="font-medium text-primary">
                                    Contact us
                                </Link>
                            </p>
                        </section>
                    )}
                </div>
            )}
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
                aria-label={isOpen ? "Close support chat" : "Open support chat"}
                aria-expanded={isOpen}
                title={isOpen ? "Close support chat" : "Chat with our team"}
            >
                {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
            </button>
        </div>
    );
}

function SignInRequired({ onClose }: { onClose: () => void }) {
    return (
        <section className="flex h-full min-h-0 flex-col p-5" aria-label="Sign in to chat">
            <header className="flex items-start justify-between gap-3 border-b border-border pb-4">
                <div>
                    <h2 className="text-lg font-semibold">Sign in to chat</h2>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="grid size-9 shrink-0 place-items-center text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label="Close chat"
                >
                    <X className="size-4" />
                </button>
            </header>
            <Link to="/auth" className="btn-primary mt-5 text-center">
                Sign in or create account
            </Link>
        </section>
    );
}
