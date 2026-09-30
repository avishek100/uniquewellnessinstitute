import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as BriefcaseBusiness, a as Trophy, n as Video, r as Users, v as LockKeyhole } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-Q-DHuwxN.js
var import_jsx_runtime = require_jsx_runtime();
var services = [{
	id: "chess",
	icon: Trophy,
	eyebrow: "Chess Mastery",
	title: "International Chess Coaching",
	description: "For kids aged 5–16. Beginner to advanced batches with tournament preparation under International Coach Mr. Vivek Rane.",
	action: "View courses",
	href: "/prices"
}, {
	id: "career",
	icon: BriefcaseBusiness,
	eyebrow: "Career Guidance",
	title: "Career & International Employment",
	description: "Personalised career guidance, interview training, and recruiter-ready resumes, backed by global hospitality, sales, and recruitment experience.",
	action: "Learn more",
	href: "/contact"
}];
var benefits = [
	{
		icon: Video,
		title: "HD Live Classes",
		description: "Stable, low-latency video for every session."
	},
	{
		icon: LockKeyhole,
		title: "Safe & Secure",
		description: "Role-based access and encrypted data."
	},
	{
		icon: Trophy,
		title: "Tournament Prep",
		description: "Custom plans for FIDE-rated events."
	},
	{
		icon: Users,
		title: "Active Community",
		description: "Doubt chat, study groups, and peer matches."
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-ink text-ink-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page py-16 lg:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow text-primary",
						children: "About Us"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl text-4xl sm:text-5xl",
						children: "Built on experience, driven by passion."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-2xl text-lg leading-relaxed text-ink-foreground/75",
						children: "Unique Wellness Institute brings world-class chess coaching and career mentorship together, backed by decades of cross-industry experience."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "container-page py-16 lg:py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "What we offer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-3xl sm:text-4xl",
						children: "Two specialties. One institute."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground",
						children: "Chess and career guidance, backed by experience and delivered with care."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-9 grid gap-5 lg:grid-cols-2",
				children: services.map(({ id, icon: Icon, eyebrow, title, description, action, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					id,
					className: "card-soft flex scroll-mt-28 flex-col p-6 sm:p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-xs font-semibold uppercase text-primary",
							children: eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-2xl",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 flex-1 text-sm leading-relaxed text-muted-foreground",
							children: description
						}),
						href.startsWith("http") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href,
							target: "_blank",
							rel: "noreferrer",
							className: "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary",
							children: action
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: href,
							className: "mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary",
							children: action
						})
					]
				}, id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-secondary/50 py-16 lg:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: "The experience"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-3xl sm:text-4xl",
						children: "Support at every step."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: benefits.map(({ icon: Icon, title, description }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "card-soft p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-lg",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: description
							})
						]
					}, title))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-primary py-14 text-primary-foreground sm:py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl sm:text-4xl",
					children: "Ready to take the next step?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-primary-foreground/75",
					children: "Book a free demo class or a career consultation."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "btn-gold",
						children: "Book Free Demo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						className: "btn-base border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10",
						children: "Sign in"
					})]
				})]
			})
		})
	] });
}
//#endregion
export { AboutPage as component };
