import { t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-session-WzRfqa2o.js
var authSessionQueryKey = ["auth", "session"];
async function fetchAuthSession() {
	const apiUrl = {
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
	const response = await fetch(`${apiUrl}/api/auth/me`, { credentials: "include" });
	if (response.status === 401) return null;
	if (!response.ok) throw new Error("Could not check sign-in status.");
	return (await response.json()).user ?? null;
}
function useAuthSession(enabled = true) {
	return useQuery({
		queryKey: authSessionQueryKey,
		queryFn: fetchAuthSession,
		enabled,
		staleTime: 6e4,
		retry: false
	});
}
//#endregion
export { useAuthSession as n, authSessionQueryKey as t };
