import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Check } from "../_libs/lucide-react.mjs";
import { t as online_lesson_default } from "./online-lesson-CpidCLOf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/method-DGfeW9aG.js
var import_jsx_runtime = require_jsx_runtime();
var stages = [
	{
		step: "01",
		title: "Beginner foundations",
		text: "Rules, piece values, basic checkmates and board awareness. Students learn to play complete games with confidence."
	},
	{
		step: "02",
		title: "Tactics and calculation",
		text: "Pins, forks, skewers, discovered attacks and combinations, trained through puzzles and guided calculation practice."
	},
	{
		step: "03",
		title: "Strategy and openings",
		text: "Opening principles, pawn structures, piece coordination and planning in typical middlegame positions."
	},
	{
		step: "04",
		title: "Tournament readiness",
		text: "Endgame technique, clock management, opening preparation and practice games aimed at competitive and FIDE-rated events."
	}
];
function MethodPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border bg-sand/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page py-16 lg:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "eyebrow",
					children: "Method"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 max-w-3xl text-4xl sm:text-5xl",
					children: "Structured training, session by session"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-lg text-muted-foreground",
					children: "Every course is 16 live, interactive sessions in English, taught in small groups with personal attention and progress tracking after each stage."
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "container-page grid gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-5",
			children: stages.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "card-soft flex gap-5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl text-accent",
					children: stage.step
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl",
					children: stage.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted-foreground",
					children: stage.text
				})] })]
			}, stage.step))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: online_lesson_default,
				alt: "Live online chess lesson",
				width: 1200,
				height: 912,
				loading: "lazy",
				className: "h-64 w-full rounded-2xl object-cover shadow-card"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-soft p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "What every student gets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3 text-sm",
						children: [
							"Live interactive classes conducted online in English",
							"Small groups with personal attention from the coach",
							"Personalised feedback and progress tracking",
							"Homework tasks, puzzles and practice games",
							"Preparation for competitive and FIDE-rated tournaments"
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: item
							})]
						}, item))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/contact",
						className: "btn-primary mt-6 w-full",
						children: "Book a demo class"
					})
				]
			})]
		})]
	})] });
}
//#endregion
export { MethodPage as component };
