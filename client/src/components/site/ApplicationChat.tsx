import { Link } from "@tanstack/react-router";
import { Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { io, type Socket } from "socket.io-client";

const apiUrl = import.meta.env["VITE_API_URL"] ?? "http://localhost:4000";

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
};

export function ApplicationChat({
  conversationId,
  mode,
  chatToken,
  visitorName,
  floating = false,
  onClose,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("Connecting...");
  const [error, setError] = useState("");
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
            ? `${apiUrl}/api/admin/conversations/${conversationId}/messages`
            : `${apiUrl}/api/chat/${conversationId}/messages`;
        const response = await fetch(endpoint, { credentials: "include", headers });
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

    const socket = io(apiUrl, {
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
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

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
          : "card-soft flex min-h-[25rem] flex-col p-5 sm:p-6"
      }
    >
      <header className="flex items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-lg font-semibold">
            {mode === "admin" ? visitorName || "Applicant chat" : "Chat with our team"}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground" aria-live="polite">
            {status}
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close chat"
          >
            <X className="size-4" />
          </button>
        )}
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto py-4" aria-live="polite">
        {messages.length === 0 && !error && (
          <p className="my-auto text-center text-sm text-muted-foreground">
            Send a message to start the conversation.
          </p>
        )}
        {messages.map((message) => {
          const isOwnMessage = mode === message.sender;
          return (
            <article
              key={message._id}
              className={`max-w-[88%] px-3 py-2 ${isOwnMessage ? "self-end bg-primary text-primary-foreground" : "self-start bg-muted"
                }`}
            >
              <p className="text-[11px] font-semibold">
                {message.sender === "admin" ? "Administration" : message.senderName}
              </p>
              <p className="mt-1 whitespace-pre-wrap break-words text-sm">{message.body}</p>
              <time className="mt-1 block text-right text-[10px] opacity-70">
                {new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(
                  new Date(message.createdAt),
                )}
              </time>
            </article>
          );
        })}
        {error && (
          <p className="text-sm text-destructive" role="alert">
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

      <form className="flex items-end gap-2 border-t border-border pt-4" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor={`chat-message-${conversationId}`}>
          Message
        </label>
        <textarea
          id={`chat-message-${conversationId}`}
          className="field min-h-11 flex-1 resize-y"
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
          className="btn-primary grid size-11 shrink-0 place-items-center p-0"
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
