import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, n as QueryClientProvider, r as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useLocation, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as Menu, p as MessageCircle, t as X } from "../_libs/lucide-react.mjs";
import { t as lookup } from "../_libs/socket.io-client+[...].mjs";
import { t as ApplicationChat } from "./ApplicationChat-Dks3hoHF.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as useAuthSession, t as authSessionQueryKey } from "./auth-session-WzRfqa2o.mjs";
import { i as visitorChatSessionEvent, n as markVisitorChatRead, r as saveVisitorChatSession, t as getVisitorChatSession } from "./visitor-chat-Bl67UBdC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Dpfc-Qqm.js
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
function FloatingChatWidget() {
	const location = useLocation();
	const queryClient = useQueryClient();
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [session, setSession] = (0, import_react.useState)(null);
	const [unreadCount, setUnreadCount] = (0, import_react.useState)(0);
	const { data: authUser, isPending: isCheckingAuthentication } = useAuthSession(location.pathname !== "/admin" && location.pathname !== "/auth" && location.pathname !== "/dashboard");
	const isAuthenticated = Boolean(authUser);
	const [isStarting, setIsStarting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const syncSession = () => setSession(getVisitorChatSession());
		syncSession();
		window.addEventListener(visitorChatSessionEvent(), syncSession);
		return () => window.removeEventListener(visitorChatSessionEvent(), syncSession);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!session) {
			setUnreadCount(0);
			return;
		}
		let active = true;
		const readAt = session.lastReadAt ? Date.parse(session.lastReadAt) : 0;
		const headers = { "x-chat-token": session.chatToken };
		const endpoint = `${apiUrl}/api/chat/${session.conversationId}/messages`;
		fetch(endpoint, {
			credentials: "include",
			headers
		}).then(async (response) => await response.json().catch(() => ({}))).then((result) => {
			if (active && !isOpen) setUnreadCount((result.messages ?? []).filter((message) => message.sender === "admin" && Date.parse(message.createdAt) > readAt).length);
		});
		const socket = lookup(apiUrl, {
			withCredentials: true,
			auth: {
				conversationId: session.conversationId,
				chatToken: session.chatToken
			}
		});
		socket.on("chat:message", (message) => {
			if (active && !isOpen && message.sender === "admin") setUnreadCount((count) => count + 1);
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
	if (location.pathname === "/admin" || location.pathname === "/auth" || location.pathname === "/dashboard") return null;
	if (isCheckingAuthentication || isAuthenticated !== true) return null;
	async function handleStartChat() {
		setIsStarting(true);
		setError("");
		try {
			const response = await fetch(`${apiUrl}/api/chat/conversations`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({})
			});
			const result = await response.json().catch(() => ({}));
			if (!response.ok || !result.conversationId || !result.chatToken) {
				if (response.status === 401) queryClient.setQueryData(authSessionQueryKey, null);
				throw new Error(result.message ?? "Could not start chat.");
			}
			const nextSession = {
				conversationId: result.conversationId,
				chatToken: result.chatToken,
				visitorName: result.visitorName ?? "Visitor"
			};
			saveVisitorChatSession(nextSession);
			setSession(nextSession);
		} catch (startError) {
			setError(startError instanceof Error ? startError.message : "Could not start chat.");
		} finally {
			setIsStarting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6",
		children: [isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-[min(34rem,calc(100dvh-6rem))] w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-border bg-background shadow-xl",
			children: session ? isCheckingAuthentication ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "grid h-full place-items-center text-sm text-muted-foreground",
				children: "Checking sign-in..."
			}) : !isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInRequired, { onClose: () => setIsOpen(false) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationChat, {
				conversationId: session.conversationId,
				chatToken: session.chatToken,
				visitorName: session.visitorName,
				mode: "visitor",
				floating: true,
				onClose: () => setIsOpen(false)
			}) : isCheckingAuthentication ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "grid h-full place-items-center text-sm text-muted-foreground",
				children: "Checking sign-in..."
			}) : !isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInRequired, { onClose: () => setIsOpen(false) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex h-full min-h-0 flex-col p-5",
				"aria-label": "Start a support chat",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-start justify-between gap-3 border-b border-border pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Chat with our team"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Start a private conversation with our team."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setIsOpen(false),
							className: "grid size-9 shrink-0 place-items-center text-muted-foreground hover:bg-muted hover:text-foreground",
							"aria-label": "Close chat",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-4",
						children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-destructive",
							role: "alert",
							children: error
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void handleStartChat(),
							className: "btn-primary",
							disabled: isStarting,
							children: isStarting ? "Connecting..." : "Start conversation"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-auto border-t border-border pt-4 text-xs text-muted-foreground",
						children: [
							"Prefer email?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "font-medium text-primary",
								children: "Contact us"
							})
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: handleChatToggle,
			className: "relative grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105",
			"aria-label": isOpen ? "Close support chat" : "Open support chat",
			"aria-expanded": isOpen,
			title: isOpen ? "Close support chat" : "Chat with our team",
			children: [isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-6" }), !isOpen && unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -right-1 -top-1 grid min-w-6 place-items-center rounded-full bg-destructive px-1.5 py-1 text-xs font-bold text-destructive-foreground",
				"aria-label": `${unreadCount} unread chat message${unreadCount === 1 ? "" : "s"}`,
				children: unreadCount > 99 ? "99+" : unreadCount
			})]
		})]
	});
}
function SignInRequired({ onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full min-h-0 flex-col p-5",
		"aria-label": "Sign in to chat",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-start justify-between gap-3 border-b border-border pb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Sign in to chat"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onClose,
				className: "grid size-9 shrink-0 place-items-center text-muted-foreground hover:bg-muted hover:text-foreground",
				"aria-label": "Close chat",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/auth",
			className: "btn-primary mt-5 text-center",
			children: "Sign in or create account"
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 px-6 py-12 sm:px-9 lg:grid-cols-[2fr_1fr_1fr] lg:gap-12 lg:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					"aria-label": "Unique Wellness Institute home",
					className: "inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "Unique Wellness Institute",
						className: "h-12 w-32 object-contain object-left"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-xl text-sm leading-7 text-muted-foreground",
					children: "Premium institute for chess coaching and career counseling, built on decades of international experience."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base",
					children: "Services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/prices",
							className: "hover:text-primary",
							children: "Chess Coaching"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "hover:text-primary",
							children: "Career Counseling"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "hover:text-primary",
							children: "About Us"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/founders",
							className: "hover:text-primary",
							children: "Founder"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base",
					children: "Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "tel:+919594373644",
							className: "hover:text-primary",
							children: "+91 95943 73644"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:info@uniquewellnessinstitute.com",
							className: "hover:text-primary",
							children: "info@uniquewellnessinstitute.com"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Mumbai, India" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "hover:text-primary",
							children: "Sign in"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "hover:text-primary",
							children: "Book Demo"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 py-7 text-center text-xs text-muted-foreground sm:px-9",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Unique Wellness Institute. All rights reserved."
				]
			})
		})]
	});
}
var nav = [
	{
		to: "/prices",
		label: "Chess Coaching"
	},
	{
		to: "/about",
		hash: "career",
		label: "Career Guidance"
	},
	{
		to: "/founders",
		label: "Founder"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const location = useLocation();
	const [open, setOpen] = (0, import_react.useState)(false);
	const { data: user } = useAuthSession(location.pathname !== "/admin" && location.pathname !== "/auth");
	const userName = user?.fullName ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page flex h-20 items-center justify-between gap-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					"aria-label": "Unique Wellness Institute home",
					className: "flex shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "Unique Wellness Institute",
						className: "h-12 w-32 object-contain"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-5 xl:flex",
					children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						..."hash" in item ? { hash: item.hash } : {},
						className: "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
						activeProps: { className: "text-primary" },
						children: item.label
					}, `${item.to}:${item.label}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: userName ? "/dashboard" : "/auth",
							className: "btn-outline hidden sm:inline-flex",
							children: userName ? userName.trim().split(/\s+/)[0] : "Sign in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "btn-gold hidden sm:inline-flex",
							children: "Book Demo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Toggle menu",
							onClick: () => setOpen((v) => !v),
							className: "btn-outline size-11 p-0 xl:hidden",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border bg-card md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page flex flex-col gap-1 py-4",
				children: [
					nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						..."hash" in item ? { hash: item.hash } : {},
						onClick: () => setOpen(false),
						className: "rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-secondary",
						children: item.label
					}, `${item.to}:${item.label}`)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: userName ? "/dashboard" : "/auth",
						onClick: () => setOpen(false),
						className: "btn-outline mt-2",
						children: userName ? userName.trim().split(/\s+/)[0] : "Sign in / Create account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						onClick: () => setOpen(false),
						className: "btn-gold mt-2",
						children: "Book Demo"
					})
				]
			})
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-BEqYabZ4.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "btn-primary",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "btn-primary",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "btn-outline",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Unique Wellness Institute — Chess & Career Guidance" },
			{
				name: "description",
				content: "International chess coaching and career guidance from Unique Wellness Institute. Explore programs and book a consultation."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/logo.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	const isDashboard = useLocation().pathname === "/dashboard";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen flex-col",
				children: [
					!isDashboard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					!isDashboard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingChatWidget, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
		]
	});
}
var $$splitComponentImporter$8 = () => import("./routes-UGiYorIa.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Unique Wellness Institute — Chess & Career Guidance" },
		{
			name: "description",
			content: "International chess coaching and career guidance from Unique Wellness Institute. Explore programs and book a consultation."
		},
		{
			property: "og:title",
			content: "Unique Wellness Institute — Chess & Career Guidance"
		},
		{
			property: "og:description",
			content: "Chess coaching and career guidance, delivered with care and backed by decades of international experience."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./about-Q-DHuwxN.mjs");
var Route$7 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About Us — Unique Wellness Institute" }, {
		name: "description",
		content: "Meet Unique Wellness Institute and explore chess coaching, career guidance, and student support."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin-D3gxLCDu.mjs");
var Route$6 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin Dashboard — Unique Wellness Institute" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./auth-BytvfTPK.mjs");
var Route$5 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Log in or Sign up — Unique Wellness Institute" },
		{
			name: "description",
			content: "Log in or create your Unique Wellness Institute account to manage chess lessons."
		},
		{
			property: "og:title",
			content: "Log in or Sign up — Unique Wellness Institute"
		},
		{
			property: "og:description",
			content: "Access your chess academy account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./contact-Cd0KYBua.mjs");
var Route$4 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact & Free Trial — Unique Wellness Institute" },
		{
			name: "description",
			content: "Book a free trial chess lesson or ask a question. Unique Wellness Institute, Mumbai, India — info@uniquewellnessinstitute.com."
		},
		{
			property: "og:title",
			content: "Contact & Free Trial — Unique Wellness Institute"
		},
		{
			property: "og:description",
			content: "Book a free trial chess lesson or ask a question. Based in Mumbai, teaching students worldwide online."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./dashboard-ChkGdfT_.mjs");
var Route$3 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Student Dashboard — Unique Wellness Institute" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./founders-DMvEc1bN.mjs");
var Route$2 = createFileRoute("/founders")({
	head: () => ({ meta: [{ title: "Founder — Unique Wellness Institute" }, {
		name: "description",
		content: "Meet Mrunal Kore, Founder of Unique Wellness Institute, and learn about her experience across hospitality, sales, and training."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./method-DGfeW9aG.mjs");
var Route$1 = createFileRoute("/method")({
	head: () => ({ meta: [
		{ title: "Our Method — Unique Wellness Institute" },
		{
			name: "description",
			content: "How we teach: 16 live interactive sessions per course, small groups, personalised feedback, progress tracking and tournament preparation."
		},
		{
			property: "og:title",
			content: "Our Method — Unique Wellness Institute"
		},
		{
			property: "og:description",
			content: "16 live interactive sessions per course, small groups, personalised feedback and focused tournament preparation."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./prices-N5SKRxiB.mjs");
var Route = createFileRoute("/prices")({
	head: () => ({ meta: [
		{ title: "Courses & Prices — Unique Wellness Institute" },
		{
			name: "description",
			content: "Chess courses for every level, with clear course fees and focused coaching."
		},
		{
			property: "og:title",
			content: "Courses & Prices — Unique Wellness Institute"
		},
		{
			property: "og:description",
			content: "Explore beginner, intermediate, and advanced chess coaching courses."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	AboutRoute: Route$7.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$9
	}),
	AdminRoute: Route$6.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$9
	}),
	AuthRoute: Route$5.update({
		id: "/auth",
		path: "/auth",
		getParentRoute: () => Route$9
	}),
	ContactRoute: Route$4.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$9
	}),
	DashboardRoute: Route$3.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$9
	}),
	FoundersRoute: Route$2.update({
		id: "/founders",
		path: "/founders",
		getParentRoute: () => Route$9
	}),
	MethodRoute: Route$1.update({
		id: "/method",
		path: "/method",
		getParentRoute: () => Route$9
	}),
	PricesRoute: Route.update({
		id: "/prices",
		path: "/prices",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
