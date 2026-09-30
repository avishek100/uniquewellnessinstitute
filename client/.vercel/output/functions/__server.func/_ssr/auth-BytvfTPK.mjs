import { o as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as authSessionQueryKey } from "./auth-session-WzRfqa2o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BytvfTPK.js
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
function AuthPage() {
	const [mode, setMode] = (0, import_react.useState)("login");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	async function requestAuth(path, body) {
		const response = await fetch(`${apiUrl}/api/auth/${path}`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});
		const result = await response.json().catch(() => ({}));
		if (!response.ok) throw new Error(result.message ?? "Account request failed.");
		return result;
	}
	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const payload = Object.fromEntries(formData.entries());
		setIsSubmitting(true);
		try {
			const result = await requestAuth(mode === "signup" ? "signup" : "login", payload);
			const signedInAsAdmin = result.isAdmin === true;
			if (!signedInAsAdmin && result.user) queryClient.setQueryData(authSessionQueryKey, result.user);
			toast.success(signedInAsAdmin ? "Admin signed in" : mode === "signup" ? "Account created" : "Welcome back", { description: result.user?.fullName });
			await navigate({ to: signedInAsAdmin ? "/admin" : "/dashboard" });
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Account request failed.");
		} finally {
			setIsSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "container-page grid min-h-[70vh] place-items-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-soft w-full max-w-md p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl",
					children: mode === "login" ? "Welcome back" : "Create your account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: mode === "login" ? "Sign in to your Unique Wellness Institute account." : "Create an account to get started with your chess lessons."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-4",
					onSubmit: handleSubmit,
					children: [
						mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Full name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								name: "fullName",
								autoComplete: "name",
								required: true,
								minLength: 2,
								maxLength: 100
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Phone number", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								name: "phone",
								type: "tel",
								placeholder: "+91 ...",
								autoComplete: "tel",
								required: true,
								minLength: 7,
								maxLength: 32
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								name: "email",
								type: "email",
								autoComplete: "email",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1.5 text-sm font-medium",
							children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								name: "password",
								type: "password",
								autoComplete: mode === "signup" ? "new-password" : "current-password",
								required: true,
								minLength: mode === "signup" ? 8 : 1,
								maxLength: 128
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: isSubmitting,
							className: "btn-primary mt-2 w-full disabled:opacity-60",
							children: isSubmitting ? "Please wait..." : mode === "login" ? "Log in" : "Create account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-center text-sm text-muted-foreground",
					children: [
						mode === "login" ? "New here?" : "Already have an account?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "font-semibold text-primary",
							onClick: () => setMode(mode === "login" ? "signup" : "login"),
							children: mode === "login" ? "Create an account" : "Log in"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
