import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Send, t as X } from "../_libs/lucide-react.mjs";
import { t as lookup } from "../_libs/socket.io-client+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ApplicationChat-Dks3hoHF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var apiUrl = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_API_URL": "http://localhost:4000"
}["VITE_API_URL"] ?? "http://localhost:4000";
function ApplicationChat({ conversationId, mode, chatToken, visitorName, floating = false, onClose }) {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("Connecting...");
	const [error, setError] = (0, import_react.useState)("");
	const socketRef = (0, import_react.useRef)(null);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const headers = {};
		if (mode === "visitor" && chatToken) headers["x-chat-token"] = chatToken;
		async function loadMessages() {
			try {
				const endpoint = mode === "admin" ? `${apiUrl}/api/admin/conversations/${conversationId}/messages` : `${apiUrl}/api/chat/${conversationId}/messages`;
				const response = await fetch(endpoint, {
					credentials: "include",
					headers
				});
				const result = await response.json().catch(() => ({}));
				if (!response.ok) throw new Error(result.message ?? "Could not load chat messages.");
				if (active) setMessages((current) => {
					const merged = new Map((result.messages ?? []).map((message) => [message._id, message]));
					for (const message of current) if (!merged.has(message._id)) merged.set(message._id, message);
					return [...merged.values()].sort((left, right) => Date.parse(left.createdAt) - Date.parse(right.createdAt));
				});
			} catch (loadError) {
				if (active) {
					setError(loadError instanceof Error ? loadError.message : "Could not load chat messages.");
					setStatus("Unavailable");
				}
			}
		}
		const socket = lookup(apiUrl, {
			withCredentials: true,
			auth: {
				conversationId,
				...chatToken ? { chatToken } : {}
			}
		});
		socketRef.current = socket;
		socket.on("connect", () => {
			socket.emit("chat:join", { conversationId }, (result) => {
				if (!active) return;
				setStatus(result?.ok ? "Connected" : "Unable to join chat");
				if (result?.ok) loadMessages();
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
		socket.on("chat:message", (message) => {
			if (active) setMessages((current) => current.some((existing) => existing._id === message._id) ? current : [...current, message]);
		});
		return () => {
			active = false;
			socket.disconnect();
			socketRef.current = null;
		};
	}, [
		chatToken,
		conversationId,
		mode
	]);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ block: "nearest" });
	}, [messages]);
	function handleSubmit(event) {
		event.preventDefault();
		const body = draft.trim();
		const socket = socketRef.current;
		if (!body || !socket?.connected) return;
		socket.emit("chat:send", {
			conversationId,
			body
		}, (result) => {
			if (!result?.ok) {
				setError(result?.message ?? "Could not send message.");
				return;
			}
			setError("");
			setDraft("");
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: floating ? "flex h-full min-h-0 flex-col p-4" : "card-soft flex min-h-[25rem] flex-col p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-4 border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: mode === "admin" ? visitorName || "Applicant chat" : "Chat with our team"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					"aria-live": "polite",
					children: status
				})] }), onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "grid size-9 shrink-0 place-items-center text-muted-foreground hover:bg-muted hover:text-foreground",
					"aria-label": "Close chat",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto py-4",
				"aria-live": "polite",
				children: [
					messages.length === 0 && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "my-auto text-center text-sm text-muted-foreground",
						children: "Send a message to start the conversation."
					}),
					messages.map((message) => {
						const isOwnMessage = mode === message.sender;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: `max-w-[88%] px-3 py-2 ${isOwnMessage ? "self-end bg-primary text-primary-foreground" : "self-start bg-muted"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold",
									children: message.sender === "admin" ? "Administration" : message.senderName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 whitespace-pre-wrap break-words text-sm",
									children: message.body
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									className: "mt-1 block text-right text-[10px] opacity-70",
									children: new Intl.DateTimeFormat(void 0, {
										hour: "numeric",
										minute: "2-digit"
									}).format(new Date(message.createdAt))
								})
							]
						}, message._id);
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-destructive",
						role: "alert",
						children: [
							error,
							" ",
							error.includes("Sign in") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								className: "font-semibold underline",
								children: "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex items-end gap-2 border-t border-border pt-4",
				onSubmit: handleSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: `chat-message-${conversationId}`,
						children: "Message"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: `chat-message-${conversationId}`,
						className: "field min-h-11 flex-1 resize-y",
						value: draft,
						onChange: (event) => setDraft(event.target.value),
						maxLength: 2e3,
						placeholder: "Write a message...",
						rows: 1,
						onKeyDown: (event) => {
							if (event.key === "Enter" && !event.shiftKey) {
								event.preventDefault();
								event.currentTarget.form?.requestSubmit();
							}
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary grid size-11 shrink-0 place-items-center p-0",
						type: "submit",
						"aria-label": "Send message",
						title: "Send message",
						disabled: !draft.trim() || status !== "Connected",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
					})
				]
			})
		]
	});
}
//#endregion
export { ApplicationChat as t };
