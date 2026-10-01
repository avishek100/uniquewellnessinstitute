export type VisitorChatSession = {
  conversationId: string;
  chatToken: string;
  visitorName: string;
  lastReadAt?: string;
};

const storageKey = "uwi_visitor_chat";
const sessionEvent = "uwi:visitor-chat-session";

export function getVisitorChatSession(): VisitorChatSession | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.sessionStorage.getItem(storageKey);
    if (!value) return null;
    const session = JSON.parse(value) as Partial<VisitorChatSession>;
    if (
      typeof session.conversationId !== "string" ||
      typeof session.chatToken !== "string" ||
      typeof session.visitorName !== "string"
    ) {
      return null;
    }
    return session as VisitorChatSession;
  } catch {
    return null;
  }
}

export function saveVisitorChatSession(session: VisitorChatSession): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(storageKey, JSON.stringify(session));
    window.dispatchEvent(new Event(sessionEvent));
  } catch {
    // Graceful fallback if storage is blocked
  }
}

export function markVisitorChatRead(): void {
  try {
    const session = getVisitorChatSession();
    if (session) saveVisitorChatSession({ ...session, lastReadAt: new Date().toISOString() });
  } catch {
    // Graceful fallback
  }
}

export function visitorChatSessionEvent(): string {
  return sessionEvent;
}
