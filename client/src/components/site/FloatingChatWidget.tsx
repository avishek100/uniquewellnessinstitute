import { API_BASE_URL, apiClient } from "@/lib/api";
import { authSessionQueryKey, useAuthSession } from "@/lib/auth-session";
import {
    getVisitorChatSession,
    markVisitorChatRead,
    saveVisitorChatSession,
    visitorChatSessionEvent,
    type VisitorChatSession,
} from "@/lib/visitor-chat";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ApplicationChat } from "./ApplicationChat";

export function FloatingChatWidget() {
    const location = useLocation();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [session, setSession] = useState<VisitorChatSession | null>(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const { data: authUser, isPending: isCheckingAuthentication } = useAuthSession(
        location.pathname !== "/admin" &&
        location.pathname !== "/auth" &&
        location.pathname !== "/dashboard",
    );
    const isAuthenticated = Boolean(authUser);
    const [isStarting, setIsStarting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const syncSession = () => setSession(getVisitorChatSession());
        syncSession();
        window.addEventListener(visitorChatSessionEvent(), syncSession);
        return () => window.removeEventListener(visitorChatSessionEvent(), syncSession);
    }, []);

    useEffect(() => {
        if (!session) {
            setUnreadCount(0);
            return;
        }

        let active = true;
        const readAt = session.lastReadAt ? Date.parse(session.lastReadAt) : 0;
        const headers = { "x-chat-token": session.chatToken };
        const endpoint = `/api/chat/${session.conversationId}/messages`;

        void apiClient.request(endpoint, { credentials: "include", headers })
            .then(async (response) => (await response.json().catch(() => ({}))) as {
                messages?: Array<{ sender: string; createdAt: string }>;
            })
            .then((result) => {
                if (active && !isOpen) {
                    setUnreadCount(
                        (result.messages ?? []).filter(
                            (message) => message.sender === "admin" && Date.parse(message.createdAt) > readAt,
                        ).length,
                    );
                }
            });

        const socket = io(API_BASE_URL, {
            withCredentials: true,
            auth: { conversationId: session.conversationId, chatToken: session.chatToken },
        });
        socket.on("chat:message", (message: { sender?: string }) => {
            if (active && !isOpen && message.sender === "admin") {
                setUnreadCount((count) => count + 1);
            }
        });

        return () => {
            active = false;
            socket.disconnect();
        };
    }, [isOpen, session]);

    function handleChatToggle() {
        setIsOpen((open) => {
            const nextOpen = !open;
            if (nextOpen) {
                markVisitorChatRead();
                setUnreadCount(0);
            }
            return nextOpen;
        });
    }

    if (
        location.pathname === "/admin" ||
        location.pathname === "/auth" ||
        location.pathname === "/dashboard"
    ) return null;

    async function handleStartChat() {
        setIsStarting(true);
        setError("");

        try {
            const response = await apiClient.request("/api/chat/conversations", {
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
            };
            if (!response.ok || !result.conversationId || !result.chatToken) {
                if (response.status === 401) {
                    queryClient.setQueryData(authSessionQueryKey, null);
                }
                throw new Error(result.message ?? "Could not start chat.");
            }

            const nextSession = {
                conversationId: result.conversationId,
                chatToken: result.chatToken,
                visitorName: result.visitorName ?? "Visitor",
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
                onClick={handleChatToggle}
                className="relative grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
                aria-label={isOpen ? "Close support chat" : "Open support chat"}
                aria-expanded={isOpen}
                title={isOpen ? "Close support chat" : "Chat with our team"}
            >
                {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
                {!isOpen && unreadCount > 0 && (
                    <span
                        className="absolute -right-1 -top-1 grid min-w-6 place-items-center rounded-full bg-destructive px-1.5 py-1 text-xs font-bold text-destructive-foreground"
                        aria-label={`${unreadCount} unread chat message${unreadCount === 1 ? "" : "s"}`}
                    >
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                )}
            </button>
        </div>
    );
}

function SignInRequired({ onClose }: { onClose: () => void }) {
    return (
        <section className="flex h-full min-h-0 flex-col p-5" aria-label="Sign in to chat">
            <header className="flex items-start justify-between gap-3 border-b border-border pb-4">
                <div>
                    <h2 className="text-lg font-semibold">Log in or register to chat</h2>
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
                Log in or register
            </Link>
        </section>
    );
}
