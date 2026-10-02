import { API_BASE_URL, apiClient } from "@/lib/api";
import { Link } from "@tanstack/react-router";
import { Send, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { io, type Socket } from "socket.io-client";
import { toast } from "sonner";

type ChatMessage = {
  _id: string;
  sender: "visitor" | "admin";
  senderName: string;
  body: string;
  createdAt: string;
};

type ChatPanelProps = {
  conversationId: string;
  mode: "visitor" | "admin";
  chatToken?: string;
  visitorName?: string;
  floating?: boolean;
  onClose?: () => void;
  onMessageDeleted?: () => void;
};

export function ApplicationChat({
  conversationId,
  mode,
  chatToken,
  visitorName,
  floating = false,
  onClose,
  onMessageDeleted,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("Connecting...");
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const headers: Record<string, string> = {};
    if (mode === "visitor" && chatToken) headers["x-chat-token"] = chatToken;

    async function loadMessages() {
      try {
        const endpoint =
          mode === "admin"
            ? `/api/admin/conversations/${conversationId}/messages`
            : `/api/chat/${conversationId}/messages`;
        const response = await apiClient.request(endpoint, { credentials: "include", headers });
        const result = (await response.json().catch(() => ({}))) as {
          messages?: ChatMessage[];
          message?: string;
        };
        if (!response.ok) throw new Error(result.message ?? "Could not load chat messages.");
        if (active) {
          setMessages((current) => {
            const merged = new Map(
              (result.messages ?? []).map((message) => [message._id, message]),
            );
            for (const message of current) {
              if (!merged.has(message._id)) merged.set(message._id, message);
            }
            return [...merged.values()].sort(
              (left, right) => Date.parse(left.createdAt) - Date.parse(right.createdAt),
            );
          });
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error ? loadError.message : "Could not load chat messages.",
          );
          setStatus("Unavailable");
        }
      }
    }

    const socket = io(API_BASE_URL, {
      withCredentials: true,
      auth: { conversationId, ...(chatToken ? { chatToken } : {}) },
    });
    socketRef.current = socket;
    socket.on("connect", () => {
      socket.emit("chat:join", { conversationId }, (result) => {
        if (!active) return;
        setStatus(result?.ok ? "Connected" : "Unable to join chat");
        if (result?.ok) void loadMessages();
      });
    });
    socket.on("connect_error", (connectError) => {
      if (!active) return;
      if (connectError.message.includes("sign in")) {
        setStatus("Sign in required");
        setError("Sign in before sending messages.");
        socket.disconnect();
        return;
      }
      setStatus("Reconnecting...");
    });
    socket.on("chat:message", (message: ChatMessage) => {
      if (active) {
        setMessages((current) =>
          current.some((existing) => existing._id === message._id)
            ? current
            : [...current, message],
        );
      }
    });

    return () => {
      active = false;
      socket.disconnect();
      socketRef.current = null;
    };
  }, [chatToken, conversationId, mode]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [messages]);

  async function handleDeleteMessage(messageId: string) {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    setDeletingId(messageId);
    try {
      const response = await apiClient.request(`/api/admin/messages/${messageId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const res = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(res.message || "Failed to delete message.");
      }
      setMessages((current) => current.filter((m) => m._id !== messageId));
      toast.success("Message deleted.");
      onMessageDeleted?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete message.");
    } finally {
      setDeletingId(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    const socket = socketRef.current;
    if (!body || !socket?.connected) return;

    socket.emit("chat:send", { conversationId, body }, (result) => {
      if (!result?.ok) {
        setError(result?.message ?? "Could not send message.");
        return;
      }
      setError("");
      setDraft("");
    });
  }

  return (
    <section
      className={
        floating
          ? "flex h-full min-h-0 flex-col p-4"
          : "card-soft flex h-[480px] max-h-[520px] flex-col rounded-xl border border-border/80 p-4 sm:p-5 shadow-sm"
      }
    >
      <header className="flex items-center justify-between gap-4 border-b border-border pb-3">
        <div>
          <h2 className="text-base font-semibold sm:text-lg">
            {mode === "admin" ? visitorName || "Applicant chat" : "Chat with our team"}
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`size-2 rounded-full ${
                status === "Connected"
                  ? "bg-emerald-500"
                  : status === "Connecting..." || status === "Reconnecting..."
                    ? "bg-amber-500 animate-pulse"
                    : "bg-muted-foreground"
              }`}
            />
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {status}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close chat"
          >
            <X className="size-4" />
          </button>
        )}
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto py-3 pr-1 text-sm" aria-live="polite">
        {messages.length === 0 && !error && (
          <p className="my-auto text-center text-xs sm:text-sm text-muted-foreground">
            Send a message to start the conversation.
          </p>
        )}
        {messages.map((message) => {
          const isOwnMessage = mode === message.sender;
          return (
            <div
              key={message._id}
              className={`group flex items-end gap-1.5 ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              {mode === "admin" && isOwnMessage && (
                <button
                  type="button"
                  onClick={() => void handleDeleteMessage(message._id)}
                  disabled={deletingId === message._id}
                  title="Delete message"
                  className="mb-1 rounded p-1 text-muted-foreground/50 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all"
                >
                  <Trash2 className="size-3.5" />
                </button>
              )}
              <article
                className={`relative max-w-[85%] rounded-2xl px-3.5 py-2 text-xs sm:text-sm ${
                  isOwnMessage
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted/80 text-foreground rounded-bl-sm"
                }`}
              >
                <p className="text-[10px] font-semibold opacity-80 mb-0.5">
                  {message.sender === "admin" ? "Administration" : message.senderName}
                </p>
                <p className="whitespace-pre-wrap break-words leading-relaxed">{message.body}</p>
                <time className="mt-1 block text-right text-[9px] opacity-70">
                  {new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(
                    new Date(message.createdAt),
                  )}
                </time>
              </article>
              {mode === "admin" && !isOwnMessage && (
                <button
                  type="button"
                  onClick={() => void handleDeleteMessage(message._id)}
                  disabled={deletingId === message._id}
                  title="Delete message"
                  className="mb-1 rounded p-1 text-muted-foreground/50 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all"
                >
                  <Trash2 className="size-3.5" />
                </button>
              )}
            </div>
          );
        })}
        {error && (
          <p className="text-xs text-destructive bg-destructive/10 p-2 rounded" role="alert">
            {error}{" "}
            {error.includes("Sign in") && (
              <Link to="/auth" className="font-semibold underline">
                Sign in
              </Link>
            )}
          </p>
        )}
        <div ref={endRef} />
      </div>

      <form className="flex items-center gap-2 border-t border-border pt-3" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={`chat-message-${conversationId}`}>
          Message
        </label>
        <textarea
          id={`chat-message-${conversationId}`}
          className="field min-h-10 max-h-24 flex-1 resize-none py-2 text-xs sm:text-sm"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={2000}
          placeholder="Write a message..."
          rows={1}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <button
          className="btn-primary grid size-10 shrink-0 place-items-center rounded-lg p-0"
          type="submit"
          aria-label="Send message"
          title="Send message"
          disabled={!draft.trim() || status !== "Connected"}
        >
          <Send className="size-4" />
        </button>
      </form>
    </section>
  );
}
