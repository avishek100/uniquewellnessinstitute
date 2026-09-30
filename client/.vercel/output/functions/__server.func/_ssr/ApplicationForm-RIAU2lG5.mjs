import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as ApplicationChat } from "./ApplicationChat-Dks3hoHF.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as saveVisitorChatSession } from "./visitor-chat-Bl67UBdC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ApplicationForm-RIAU2lG5.js
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
var relations = [
	"Mother",
	"Father",
	"Grandfather",
	"Grandmother",
	"Uncle",
	"Auntie",
	"Brother",
	"Sister",
	"Other"
];
var ages = Array.from({ length: 14 }, (_, i) => i + 3);
function ApplicationForm() {
	const [studentType, setStudentType] = (0, import_react.useState)("child");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [conversation, setConversation] = (0, import_react.useState)(null);
	async function handleSubmit(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const payload = Object.fromEntries(formData.entries());
		setIsSubmitting(true);
		try {
			const response = await fetch(`${apiUrl}/api/applications`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...payload,
					studentType
				})
			});
			const result = await response.json().catch(() => ({}));
			if (!response.ok) throw new Error(result.message ?? "Could not submit the application.");
			toast.success("Application received", { description: "Our specialist will contact you shortly." });
			const name = String(payload.parentName ?? payload.name ?? payload.childName ?? "Applicant");
			if (result.conversationId && result.chatToken) {
				saveVisitorChatSession({
					conversationId: result.conversationId,
					chatToken: result.chatToken,
					visitorName: name
				});
				setConversation({
					id: result.conversationId,
					token: result.chatToken,
					visitorName: name
				});
			}
			form.reset();
			setStudentType("child");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not submit the application.");
		} finally {
			setIsSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "card-soft p-6 sm:p-8",
		onSubmit: handleSubmit,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-2xl",
				children: "Submit application"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Tell us a little about the student and we will arrange a demo class."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: "Student"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 inline-flex rounded-full border border-border bg-muted p-1",
						children: ["adult", "child"].map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setStudentType(type),
							className: `rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${studentType === type ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`,
							children: type
						}, type))
					})] }),
					studentType === "child" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5 text-sm font-medium",
								children: ["Child's full name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									name: "childName",
									placeholder: "Full name",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5 text-sm font-medium",
								children: ["Child's age", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "field",
									name: "childAge",
									defaultValue: "",
									required: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										disabled: true,
										children: "Select age"
									}), ages.map((age) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: age,
										children: age
									}, age))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5 text-sm font-medium",
								children: ["You are", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "field",
									name: "relation",
									defaultValue: "",
									required: true,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										disabled: true,
										children: "Select"
									}), relations.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: r,
										children: r
									}, r))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1.5 text-sm font-medium",
								children: ["Your name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									name: "parentName",
									placeholder: "Your name",
									required: true
								})]
							})
						]
					}),
					studentType === "adult" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Your name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							name: "name",
							placeholder: "Your name",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Phone number", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								name: "phone",
								type: "tel",
								placeholder: "+91 ...",
								required: true
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								name: "email",
								type: "email",
								placeholder: "you@email.com",
								required: true
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5 text-sm font-medium",
						children: ["Message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "field min-h-24",
							name: "message",
							placeholder: "Anything we should know?"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn-primary mt-2 w-full",
						disabled: isSubmitting,
						children: isSubmitting ? "Submitting..." : "Submit application to school"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "By submitting the form you consent to the processing of your personal data."
					})
				]
			})
		]
	}), conversation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "lg:col-span-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicationChat, {
			conversationId: conversation.id,
			chatToken: conversation.token,
			visitorName: conversation.visitorName,
			mode: "visitor"
		})
	})] });
}
//#endregion
export { ApplicationForm as t };
