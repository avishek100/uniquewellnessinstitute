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
import { ArrowRight, MessageCircle, Phone, Sparkles, X } from "lucide-react";
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

  // Only hide floating chat widget in dedicated full-page console layouts
  if (
    location.pathname === "/admin" ||
    location.pathname === "/auth" ||
    location.pathname === "/dashboard"
  ) {
    return null;
  }

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
        <div className="h-[min(34rem,calc(100dvh-6rem))] w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          {session && isAuthenticated ? (
            <ApplicationChat
              conversationId={session.conversationId}
              chatToken={session.chatToken}
              visitorName={session.visitorName}
              mode="visitor"
              floating
              onClose={() => setIsOpen(false)}
            />
          ) : isCheckingAuthentication ? (
            <p className="grid h-full place-items-center text-sm text-muted-foreground">
              Checking sign-in...
            </p>
          ) : !isAuthenticated ? (
            <SignInRequired onClose={() => setIsOpen(false)} />
          ) : (
            <section className="flex h-full min-h-0 flex-col p-6" aria-label="Start a support chat">
              <header className="flex items-start justify-between gap-3 border-b border-border/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
                    <MessageCircle className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground">Chat with our team</h2>
                    <p className="text-xs text-muted-foreground">Online support &amp; consultation</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Close chat"
                >
                  <X className="size-4" />
                </button>
              </header>

              <div className="my-auto flex flex-col items-center py-6 text-center">
                <div className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 shadow-xs mb-4">
                  <Sparkles className="size-7" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Start Live Conversation</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground max-w-xs">
                  Connect with our counselors for questions regarding chess courses, schedules, or career mentorship.
                </p>

                {error && (
                  <p className="mt-3 text-xs text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => void handleStartChat()}
                  className="btn-primary mt-6 w-full justify-center text-sm py-2.5 shadow-md"
                  disabled={isStarting}
                >
                  {isStarting ? "Connecting..." : "Start Conversation"}
                </button>
              </div>

              <p className="mt-auto border-t border-border/70 pt-3 text-center text-xs text-muted-foreground">
                Prefer email?{" "}
                <Link to="/contact" onClick={() => setIsOpen(false)} className="font-semibold text-primary hover:underline">
                  Contact us
                </Link>
              </p>
            </section>
          )}
        </div>
      )}

      {/* 3D Floating Action Button */}
      <button
        type="button"
        onClick={handleChatToggle}
        className="group relative grid size-14 place-items-center rounded-full bg-linear-to-br from-primary to-primary/90 text-primary-foreground shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95"
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
        aria-expanded={isOpen}
        title={isOpen ? "Close support chat" : "Chat with our team"}
      >
        {/* 3D Gloss Highlight */}
        <span className="pointer-events-none absolute inset-x-2 top-1.5 h-3 rounded-t-full bg-linear-to-b from-white/30 to-transparent" />

        {isOpen ? (
          <X className="size-6 transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <MessageCircle className="size-6 transition-transform duration-300 group-hover:scale-110" />
        )}

        {!isOpen && unreadCount > 0 && (
          <span
            className="absolute -right-1 -top-1 grid min-w-6 place-items-center rounded-full bg-destructive px-1.5 py-0.5 text-xs font-bold text-destructive-foreground shadow-md ring-2 ring-background animate-pulse"
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
    <section className="flex h-full min-h-0 flex-col p-6" aria-label="Sign in to chat">
      <header className="flex items-start justify-between gap-3 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
            <MessageCircle className="size-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Support Chat</h2>
            <p className="text-xs text-muted-foreground">Direct coach &amp; counselor line</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Close chat"
        >
          <X className="size-4" />
        </button>
      </header>

      <div className="my-auto flex flex-col items-center py-6 text-center">
        <div className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 shadow-xs mb-4">
          <MessageCircle className="size-7" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Sign in to start chat</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground max-w-xs">
          Please sign in or create an account to start a live conversation with our coaching &amp; career mentorship team.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 w-full">
          <Link
            to="/auth"
            onClick={onClose}
            className="btn-primary w-full justify-center text-sm py-2.5 shadow-md"
          >
            Sign In / Create Account <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/contact"
            onClick={onClose}
            className="btn-outline w-full justify-center text-xs py-2"
          >
            Or Book Free Demo Directly
          </Link>
        </div>
      </div>

      <p className="mt-auto border-t border-border/70 pt-3 text-center text-[11px] text-muted-foreground">
        Need immediate help? Call{" "}
        <a href="tel:+919594373644" className="font-semibold text-primary hover:underline">
          +91 95943 73644
        </a>
      </p>
    </section>
  );
}
