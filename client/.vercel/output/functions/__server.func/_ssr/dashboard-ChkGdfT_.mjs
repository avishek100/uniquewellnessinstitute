import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as CreditCard, E as CalendarDays, _ as LogOut, i as UserRound, w as Clock3, y as LayoutDashboard } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as authSessionQueryKey } from "./auth-session-WzRfqa2o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-ChkGdfT_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var apiUrl = ({
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
}["VITE_API_URL"] ?? "http://localhost:4000").replace(/\/$/, "");
var sections = [
	{
		id: "overview",
		label: "Overview",
		icon: LayoutDashboard
	},
	{
		id: "classes",
		label: "Live Classes",
		icon: CalendarDays
	},
	{
		id: "fees",
		label: "My Fees",
		icon: CreditCard
	},
	{
		id: "profile",
		label: "Profile",
		icon: UserRound
	}
];
function StudentDashboard() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [student, setStudent] = (0, import_react.useState)(null);
	const [activeSection, setActiveSection] = (0, import_react.useState)("overview");
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)("");
	const [scheduledClasses, setScheduledClasses] = (0, import_react.useState)([]);
	const [isLoadingClasses, setIsLoadingClasses] = (0, import_react.useState)(false);
	const [classesError, setClassesError] = (0, import_react.useState)("");
	const [isSavingProfile, setIsSavingProfile] = (0, import_react.useState)(false);
	const [isChangingPassword, setIsChangingPassword] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		fetch(`${apiUrl}/api/auth/me`, { credentials: "include" }).then(async (response) => {
			if (response.status === 401) {
				await navigate({
					to: "/auth",
					replace: true
				});
				return null;
			}
			const result = await response.json().catch(() => ({}));
			if (!response.ok) throw new Error(result.message ?? "Could not load your account.");
			return result.user ?? null;
		}).then((result) => {
			if (active) setStudent(result);
		}).catch((error) => {
			if (active) setLoadError(error instanceof Error ? error.message : "Could not load your account.");
		}).finally(() => {
			if (active) setIsLoading(false);
		});
		return () => {
			active = false;
		};
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		if (activeSection !== "classes" || !student) return;
		let active = true;
		setIsLoadingClasses(true);
		setClassesError("");
		fetch(`${apiUrl}/api/classes`, { credentials: "include" }).then(async (response) => {
			if (response.status === 401) {
				await navigate({
					to: "/auth",
					replace: true
				});
				return [];
			}
			const result = await response.json().catch(() => ({}));
			if (!response.ok) throw new Error(result.message ?? "Could not load class schedule.");
			return result.classes ?? [];
		}).then((result) => {
			if (active) setScheduledClasses(result);
		}).catch((error) => {
			if (active) setClassesError(error instanceof Error ? error.message : "Could not load class schedule.");
		}).finally(() => {
			if (active) setIsLoadingClasses(false);
		});
		return () => {
			active = false;
		};
	}, [
		activeSection,
		navigate,
		student
	]);
	async function handleSignOut() {
		try {
			if (!(await fetch(`${apiUrl}/api/auth/logout`, {
				method: "POST",
				credentials: "include"
			})).ok) throw new Error("Could not sign out. Please try again.");
			queryClient.setQueryData(authSessionQueryKey, null);
			await navigate({
				to: "/",
				replace: true
			});
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not sign out.");
		}
	}
	async function handleProfileSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		setIsSavingProfile(true);
		try {
			const response = await fetch(`${apiUrl}/api/auth/me`, {
				method: "PATCH",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(Object.fromEntries(formData.entries()))
			});
			const result = await response.json().catch(() => ({}));
			if (!response.ok || !result.user) throw new Error(result.message ?? "Could not update your profile.");
			setStudent(result.user);
			queryClient.setQueryData(authSessionQueryKey, result.user);
			toast.success("Profile updated.");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not update your profile.");
		} finally {
			setIsSavingProfile(false);
		}
	}
	async function handlePasswordSubmit(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		setIsChangingPassword(true);
		try {
			const response = await fetch(`${apiUrl}/api/auth/password`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(Object.fromEntries(formData.entries()))
			});
			const result = await response.json().catch(() => ({}));
			if (!response.ok) throw new Error(result.message ?? "Could not update your password.");
			form.reset();
			toast.success("Password updated.");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not update your password.");
		} finally {
			setIsChangingPassword(false);
		}
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center text-sm text-muted-foreground",
		children: "Loading your account..."
	});
	if (loadError || !student) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center px-5 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl",
					children: "Account unavailable"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: loadError || "We could not load your account."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "btn-primary mt-6",
					children: "Return to the site"
				})
			]
		})
	});
	const firstName = student.fullName.trim().split(/\s+/)[0] || "Student";
	const activeLabel = sections.find((section) => section.id === activeSection)?.label ?? "Overview";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col bg-background lg:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex min-w-0 flex-col border-b border-border bg-card lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-5 py-4 lg:px-7 lg:py-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "Unique Wellness Institute home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/logo.png",
							alt: "Unique Wellness Institute",
							className: "h-12 w-36 object-contain object-left"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void handleSignOut(),
						className: "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "Sign out"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Student dashboard",
					className: "flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:gap-2 lg:px-4",
					children: sections.map(({ id, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActiveSection(id),
						"aria-current": activeSection === id ? "page" : void 0,
						className: `inline-flex shrink-0 items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-medium transition-colors lg:w-full ${activeSection === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto hidden border-t border-border p-4 lg:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 px-2 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-semibold text-primary",
							children: firstName.charAt(0).toUpperCase()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-semibold",
								children: firstName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Student"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void handleSignOut(),
						className: "inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm font-medium hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "Sign out"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "min-w-0 flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-12 lg:py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase text-primary",
						children: "Student account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-3xl sm:text-4xl",
						children: activeSection === "overview" ? `Welcome, ${firstName}` : activeLabel
					}),
					activeSection === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8",
						"aria-label": "Account overview",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-2xl text-muted-foreground",
								children: "Your learning and account updates will appear here."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 grid border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setActiveSection("classes"),
									className: "flex items-center justify-between gap-4 py-5 text-left sm:px-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs font-semibold uppercase text-muted-foreground",
										children: "Live classes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block font-medium",
										children: "No batch assigned"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-5 text-primary" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setActiveSection("fees"),
									className: "flex items-center justify-between gap-4 border-t border-border py-5 text-left sm:border-t-0 sm:px-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs font-semibold uppercase text-muted-foreground",
										children: "My fees"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block font-medium",
										children: "View fee information"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-5 text-primary" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveSection("profile"),
								className: "mt-7 inline-flex items-center gap-3 rounded-md border border-border px-4 py-3 text-sm font-medium hover:bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4" }), "Manage your profile"]
							})
						]
					}),
					activeSection === "classes" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8",
						"aria-label": "Live classes",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Upcoming sessions scheduled by the institute."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-8 flex items-center gap-2 text-sm font-semibold uppercase text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4" }), " Upcoming"]
							}),
							isLoadingClasses ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 border-y border-border py-6 text-sm text-muted-foreground",
								children: "Loading class schedule..."
							}) : classesError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 border-y border-border py-6 text-sm text-destructive",
								role: "alert",
								children: classesError
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduledClassList, {
								classes: scheduledClasses.filter((item) => Date.parse(item.startsAt) > Date.now()),
								emptyMessage: "No upcoming classes have been scheduled yet.",
								showMeetingLinks: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-8 flex items-center gap-2 text-sm font-semibold uppercase text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4" }), " Past sessions"]
							}),
							!isLoadingClasses && !classesError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScheduledClassList, {
								classes: scheduledClasses.filter((item) => Date.parse(item.startsAt) <= Date.now()),
								emptyMessage: "No past sessions yet."
							})
						]
					}),
					activeSection === "fees" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8 max-w-3xl",
						"aria-label": "My fees",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Your fee information and payment history will appear here."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { children: "There are no fee records to show yet." })]
					}),
					activeSection === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8 grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-12",
						"aria-label": "Profile settings",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl",
								children: "Personal details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Update the contact details on your account."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-6 grid gap-4",
								onSubmit: (event) => void handleProfileSubmit(event),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1.5 text-sm font-medium",
										children: ["Full name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "field",
											name: "fullName",
											autoComplete: "name",
											defaultValue: student.fullName,
											required: true,
											minLength: 2,
											maxLength: 100
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1.5 text-sm font-medium",
										children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "field",
											name: "email",
											type: "email",
											autoComplete: "email",
											defaultValue: student.email,
											required: true
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1.5 text-sm font-medium",
										children: ["Phone number", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "field",
											name: "phone",
											type: "tel",
											autoComplete: "tel",
											defaultValue: student.phone,
											required: true,
											minLength: 7,
											maxLength: 32
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "btn-primary mt-2 justify-self-start",
										disabled: isSavingProfile,
										children: isSavingProfile ? "Saving..." : "Save changes"
									})
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl",
									children: "Change password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Confirm your current password before setting a new one."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "mt-6 grid gap-4",
									onSubmit: (event) => void handlePasswordSubmit(event),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-1.5 text-sm font-medium",
											children: ["Current password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "field",
												name: "currentPassword",
												type: "password",
												autoComplete: "current-password",
												required: true,
												maxLength: 128
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-1.5 text-sm font-medium",
											children: ["New password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "field",
												name: "newPassword",
												type: "password",
												autoComplete: "new-password",
												required: true,
												minLength: 8,
												maxLength: 128
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											className: "btn-outline mt-2 justify-self-start",
											disabled: isChangingPassword,
											children: isChangingPassword ? "Updating..." : "Update password"
										})
									]
								})
							]
						})]
					})
				]
			})
		})]
	});
}
function EmptyState({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 grid min-h-24 place-items-center rounded-md border border-dashed border-border px-5 py-6 text-center text-sm text-muted-foreground",
		children
	});
}
function ScheduledClassList({ classes, emptyMessage, showMeetingLinks = false }) {
	if (!classes.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { children: emptyMessage });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 divide-y divide-border border-y border-border",
		children: classes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
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
				showMeetingLinks && item.meetingUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "mt-3 inline-block text-sm font-medium text-primary underline underline-offset-4",
					href: item.meetingUrl,
					target: "_blank",
					rel: "noreferrer",
					children: "Join class"
				})
			]
		}, item._id))
	});
}
//#endregion
export { StudentDashboard as component };
