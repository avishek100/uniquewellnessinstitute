//#region node_modules/.nitro/vite/services/ssr/assets/visitor-chat-Bl67UBdC.js
var storageKey = "uwi_visitor_chat";
var sessionEvent = "uwi:visitor-chat-session";
function getVisitorChatSession() {
	if (typeof window === "undefined") return null;
	try {
		const value = window.sessionStorage.getItem(storageKey);
		if (!value) return null;
		const session = JSON.parse(value);
		if (typeof session.conversationId !== "string" || typeof session.chatToken !== "string" || typeof session.visitorName !== "string") return null;
		return session;
	} catch {
		return null;
	}
}
function saveVisitorChatSession(session) {
	window.sessionStorage.setItem(storageKey, JSON.stringify(session));
	window.dispatchEvent(new Event(sessionEvent));
}
function markVisitorChatRead() {
	const session = getVisitorChatSession();
	if (session) saveVisitorChatSession({
		...session,
		lastReadAt: (/* @__PURE__ */ new Date()).toISOString()
	});
}
function visitorChatSessionEvent() {
	return sessionEvent;
}
//#endregion
export { visitorChatSessionEvent as i, markVisitorChatRead as n, saveVisitorChatSession as r, getVisitorChatSession as t };
