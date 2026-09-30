import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as CalendarDays, c as Search, g as Mail, l as RefreshCw, p as MessageCircle, u as Phone } from "../_libs/lucide-react.mjs";
import { t as lookup } from "../_libs/socket.io-client+[...].mjs";
import { t as ApplicationChat } from "./ApplicationChat-Dks3hoHF.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-D3gxLCDu.js
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
var AdminRequestError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.status = status;
	}
};
async function getAdminData(path) {
	const response = await fetch(`${apiUrl}/api/admin/${path}`, { credentials: "include" });
	const result = await response.json().catch(() => ({}));
	if (!response.ok) throw new AdminRequestError(result.message ?? "Could not load admin data.", response.status);
	return result;
}
function AdminPage() {
	const [activeSection, setActiveSection] = (0, import_react.useState)("applications");
	const [applications, setApplications] = (0, import_react.useState)([]);
	const [conversations, setConversations] = (0, import_react.useState)([]);
	const [unreadConversationIds, setUnreadConversationIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [scheduledClasses, setScheduledClasses] = (0, import_react.useState)([]);
	const [isSavingClass, setIsSavingClass] = (0, import_react.useState)(false);
	const [selectedConversationId, setSelectedConversationId] = (0, import_react.useState)("");
	const [conversationSearch, setConversationSearch] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [reloadKey, setReloadKey] = (0, import_react.useState)(0);
	const selectedConversationIdRef = (0, import_react.useRef)("");
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		let active = true;
		let socket;
		async function loadAdminData() {
			setIsLoading(true);
			setError("");
			try {
				const [applicationResult, conversationResult, classResult] = await Promise.all([
					getAdminData("applications"),
					getAdminData("conversations"),
					getAdminData("classes")
				]);
				if (!active) return;
				setApplications(applicationResult.applications);
				setConversations(conversationResult.conversations);
				setScheduledClasses(classResult.classes);
				const initialConversationId = selectedConversationIdRef.current || conversationResult.conversations[0]?._id || "";
				selectedConversationIdRef.current = initialConversationId;
				setSelectedConversationId(initialConversationId);
				setUnreadConversationIds(new Set(conversationResult.conversations.filter((conversation) => conversation.lastMessage?.sender === "visitor").map((conversation) => conversation._id).filter((conversationId) => conversationId !== initialConversationId)));
				socket = lookup(apiUrl, { withCredentials: true });
				socket.on("chat:conversation-updated", (updated) => {
					if (!active) return;
					setConversations((current) => {
						return [updated, ...current.filter((item) => item._id !== updated._id)];
					});
					if (updated.lastMessage?.sender === "visitor" && updated._id !== selectedConversationIdRef.current) setUnreadConversationIds((current) => new Set(current).add(updated._id));
				});
			} catch (loadError) {
				if (active) {
					if (loadError instanceof AdminRequestError && (loadError.status === 401 || loadError.status === 403)) {
						navigate({ to: "/auth" });
						return;
					}
					setError(loadError instanceof Error ? loadError.message : "Could not load admin data.");
				}
			} finally {
				if (active) setIsLoading(false);
			}
		}
		loadAdminData();
		return () => {
			active = false;
			socket?.disconnect();
		};
	}, [navigate, reloadKey]);
	function selectConversation(conversationId) {
		selectedConversationIdRef.current = conversationId;
		setSelectedConversationId(conversationId);
		setUnreadConversationIds((current) => {
			const next = new Set(current);
			next.delete(conversationId);
			return next;
		});
	}
	const selectedConversation = conversations.find((conversation) => conversation._id === selectedConversationId);
	const filteredConversations = conversations.filter((conversation) => {
		const query = conversationSearch.trim().toLowerCase();
		return !query || conversation.visitorName.toLowerCase().includes(query) || conversation.visitorEmail.toLowerCase().includes(query) || conversation.lastMessage?.body.toLowerCase().includes(query);
	});
	async function handleScheduleClass(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		setIsSavingClass(true);
		try {
			const response = await fetch(`${apiUrl}/api/admin/classes`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(Object.fromEntries(formData.entries()))
			});
			const result = await response.json().catch(() => ({}));
			if (!response.ok || !result.scheduledClass) throw new Error(result.message ?? "Could not schedule the class.");
			setScheduledClasses((current) => [...current, result.scheduledClass].sort((first, second) => Date.parse(first.startsAt) - Date.parse(second.startsAt)));
			form.reset();
			toast.success("Upcoming class added.");
		} catch (scheduleError) {
			toast.error(scheduleError instanceof Error ? scheduleError.message : "Could not schedule the class.");
		} finally {
			setIsSavingClass(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-page py-10 sm:py-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-end justify-between gap-5 border-b border-border pb-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Administration"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-3xl sm:text-4xl",
					children: "Admin workspace"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Review submitted applications and reply to families in real time."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setReloadKey((key) => key + 1),
				disabled: isLoading,
				className: "btn-outline inline-flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-4 ${isLoading ? "animate-spin" : ""}` }), "Refresh"]
			})]
		}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 border border-accent bg-accent/20 px-5 py-4",
			role: "alert",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: "Admin access unavailable"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"Check the server's ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "ADMIN_EMAIL" }),
						" and ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "ADMIN_PASSWORD" }),
						" ",
						"settings."
					]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex gap-1 border-b border-border",
			role: "tablist",
			"aria-label": "Admin sections",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": activeSection === "applications",
					onClick: () => setActiveSection("applications"),
					className: `border-b-2 px-4 py-3 text-sm font-medium ${activeSection === "applications" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
					children: ["Applications ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1.5 text-xs",
						children: applications.length
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": activeSection === "messages",
					onClick: () => setActiveSection("messages"),
					className: `border-b-2 px-4 py-3 text-sm font-medium ${activeSection === "messages" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
					children: [
						"Messages ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1.5 text-xs",
							children: conversations.length
						}),
						unreadConversationIds.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 inline-grid min-w-5 place-items-center rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground",
							"aria-label": `${unreadConversationIds.size} unread conversation${unreadConversationIds.size === 1 ? "" : "s"}`,
							children: unreadConversationIds.size > 99 ? "99+" : unreadConversationIds.size
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": activeSection === "classes",
					onClick: () => setActiveSection("classes"),
					className: `border-b-2 px-4 py-3 text-sm font-medium ${activeSection === "classes" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
					children: ["Live Classes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1.5 text-xs",
						children: scheduledClasses.length
					})]
				})
			]
		}), activeSection === "applications" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "pt-8",
			"aria-labelledby": "applications-heading",
			role: "tabpanel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Applications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "applications-heading",
					className: "mt-2 text-2xl",
					children: "Submitted applications"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-muted-foreground",
					"aria-live": "polite",
					children: [applications.length, " total"]
				})]
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-y border-border py-8 text-sm text-muted-foreground",
				children: "Loading applications..."
			}) : applications.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-border border-y border-border",
				children: applications.map((application) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationDetails, { application }, application._id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-y border-border py-8 text-sm text-muted-foreground",
				children: "No applications have been submitted yet."
			})]
		}) : activeSection === "messages" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "pt-8",
			"aria-labelledby": "messages-heading",
			role: "tabpanel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Live support"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "messages-heading",
					className: "mt-2 text-2xl",
					children: "Applicant messages"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative block w-full sm:max-w-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Search conversations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field pl-9",
							type: "search",
							value: conversationSearch,
							onChange: (event) => setConversationSearch(event.target.value),
							placeholder: "Search name, email, message"
						})
					]
				})]
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-y border-border py-8 text-sm text-muted-foreground",
				children: "Loading conversations..."
			}) : conversations.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-[32rem] gap-6 xl:grid-cols-[minmax(15rem,0.65fr)_minmax(0,1.35fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[42rem] divide-y divide-border overflow-y-auto border-y border-border",
					children: [filteredConversations.map((conversation) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => selectConversation(conversation._id),
						"aria-pressed": conversation._id === selectedConversationId,
						className: `block w-full px-3 py-4 text-left transition-colors hover:bg-muted ${conversation._id === selectedConversationId ? "bg-muted" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 text-sm font-semibold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4 shrink-0 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: conversation.visitorName
									}),
									unreadConversationIds.has(conversation._id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2 shrink-0 rounded-full bg-destructive",
										"aria-label": "Unread messages"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block truncate pl-6 text-xs text-muted-foreground",
								children: conversation.lastMessage?.body ?? conversation.visitorEmail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-2 flex items-center justify-between gap-2 pl-6 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: conversation.type === "support" ? "Website chat" : "Application" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: new Intl.DateTimeFormat(void 0, {
									hour: "numeric",
									minute: "2-digit"
								}).format(new Date(conversation.lastMessageAt)) })]
							})
						]
					}, conversation._id)), !filteredConversations.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 py-8 text-sm text-muted-foreground",
						children: "No conversations match that search."
					})]
				}), selectedConversation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationChat, {
					conversationId: selectedConversation._id,
					visitorName: selectedConversation.visitorName,
					mode: "admin"
				}, selectedConversation._id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "grid min-h-64 place-items-center border-y border-border text-sm text-muted-foreground",
					children: "Choose a conversation to view messages."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "border-y border-border py-8 text-sm text-muted-foreground",
				children: "No conversations yet. Website chats and application conversations will appear here."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "pt-8",
			"aria-labelledby": "classes-heading",
			role: "tabpanel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "Class schedule"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "classes-heading",
						className: "mt-2 text-2xl",
						children: "Upcoming classes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Scheduled classes are visible to all registered students."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-10 xl:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-4 border-y border-border py-5",
					onSubmit: (event) => void handleScheduleClass(event),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold",
							children: "Add a class"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Class title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								name: "title",
								required: true,
								minLength: 2,
								maxLength: 120
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Date and time", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								name: "startsAt",
								type: "datetime-local",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Instructor", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								name: "instructor",
								maxLength: 100
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Meeting link", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								name: "meetingUrl",
								type: "url",
								placeholder: "https://...",
								maxLength: 500
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Details", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "field min-h-24 resize-y",
								name: "description",
								maxLength: 1e3
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "btn-primary justify-self-start",
							disabled: isSavingClass || isLoading,
							children: isSavingClass ? "Adding class..." : "Add upcoming class"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold",
					children: "Scheduled classes"
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 border-y border-border py-6 text-sm text-muted-foreground",
					children: "Loading class schedule..."
				}) : scheduledClasses.filter((item) => Date.parse(item.startsAt) > Date.now()).length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 divide-y divide-border border-y border-border",
					children: scheduledClasses.filter((item) => Date.parse(item.startsAt) > Date.now()).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "py-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
									className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5" }), new Intl.DateTimeFormat(void 0, {
										dateStyle: "medium",
										timeStyle: "short"
									}).format(new Date(item.startsAt))]
								})]
							}),
							item.instructor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: ["Instructor: ", item.instructor]
							}),
							item.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 whitespace-pre-wrap text-sm",
								children: item.description
							}),
							item.meetingUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "mt-3 inline-block text-sm font-medium text-primary underline underline-offset-4",
								href: item.meetingUrl,
								target: "_blank",
								rel: "noreferrer",
								children: "Open meeting link"
							})
						]
					}, item._id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 border-y border-border py-6 text-sm text-muted-foreground",
					children: "No upcoming classes have been scheduled."
				})] })]
			})]
		})] })]
	});
}
function ApplicationDetails({ application }) {
	const studentName = application.studentType === "child" ? application.childName : application.name;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold",
				children: studentName || "Name not provided"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					application.studentType === "child" ? "Child" : "Adult",
					" application",
					application.childAge ? ` · age ${application.childAge}` : ""
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
				className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5" }), new Intl.DateTimeFormat(void 0, { dateStyle: "medium" }).format(new Date(application.createdAt))]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2",
			children: [
				application.studentType === "child" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
					label: "Parent / guardian",
					value: application.parentName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
					label: "Relationship",
					value: application.relation
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
					label: "Applicant",
					value: application.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs text-muted-foreground",
					children: "Phone"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
					className: "mt-0.5 inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `tel:${application.phone}`,
						className: "hover:text-primary",
						children: application.phone
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs text-muted-foreground",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
					className: "mt-0.5 inline-flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `mailto:${application.email}`,
						className: "truncate hover:text-primary",
						children: application.email
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted-foreground",
						children: "Message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-0.5 whitespace-pre-wrap break-words",
						children: application.message || "No message provided"
					})]
				})
			]
		})]
	});
}
function Detail({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-0.5",
		children: value || "Not provided"
	})] });
}
//#endregion
export { AdminPage as component };
