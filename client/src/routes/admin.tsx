import { ApplicationChat } from "@/components/site/ApplicationChat";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarDays, Mail, MessageCircle, Phone, RefreshCw, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const apiUrl = import.meta.env["VITE_API_URL"] ?? "http://localhost:4000";

type Application = {
  _id: string;
  studentType: "adult" | "child";
  childName?: string;
  childAge?: number;
  relation?: string;
  parentName?: string;
  name?: string;
  phone: string;
  email: string;
  message?: string;
  createdAt: string;
};

type Conversation = {
  _id: string;
  type?: "application" | "support";
  visitorName: string;
  visitorEmail: string;
  lastMessageAt: string;
  lastMessage?: {
    sender: "visitor" | "admin";
    senderName: string;
    body: string;
    createdAt: string;
  };
};

class AdminRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function getAdminData<T>(path: string): Promise<T> {
  const response = await fetch(`${apiUrl}/api/admin/${path}`, { credentials: "include" });
  const result = (await response.json().catch(() => ({}))) as T & { message?: string };
  if (!response.ok) {
    throw new AdminRequestError(result.message ?? "Could not load admin data.", response.status);
  }
  return result;
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Unique Wellness Institute" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [activeSection, setActiveSection] = useState<"applications" | "messages">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [conversationSearch, setConversationSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    let socket: ReturnType<typeof io> | undefined;

    async function loadAdminData() {
      setIsLoading(true);
      setError("");
      try {
        const [applicationResult, conversationResult] = await Promise.all([
          getAdminData<{ applications: Application[] }>("applications"),
          getAdminData<{ conversations: Conversation[] }>("conversations"),
        ]);
        if (!active) return;

        setApplications(applicationResult.applications);
        setConversations(conversationResult.conversations);
        setSelectedConversationId(
          (current) => current || conversationResult.conversations[0]?._id || "",
        );

        socket = io(apiUrl, { withCredentials: true });
        socket.on("chat:conversation-updated", (updated: Conversation) => {
          if (!active) return;
          setConversations((current) => {
            const remaining = current.filter((item) => item._id !== updated._id);
            return [updated, ...remaining];
          });
        });
      } catch (loadError) {
        if (active) {
          if (
            loadError instanceof AdminRequestError &&
            (loadError.status === 401 || loadError.status === 403)
          ) {
            void navigate({ to: "/auth" });
            return;
          }
          setError(loadError instanceof Error ? loadError.message : "Could not load admin data.");
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void loadAdminData();
    return () => {
      active = false;
      socket?.disconnect();
    };
  }, [navigate, reloadKey]);

  const selectedConversation = conversations.find(
    (conversation) => conversation._id === selectedConversationId,
  );
  const filteredConversations = conversations.filter((conversation) => {
    const query = conversationSearch.trim().toLowerCase();
    return (
      !query ||
      conversation.visitorName.toLowerCase().includes(query) ||
      conversation.visitorEmail.toLowerCase().includes(query) ||
      conversation.lastMessage?.body.toLowerCase().includes(query)
    );
  });

  return (
    <section className="container-page py-10 sm:py-14">
      <header className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-7">
        <div>
          <span className="eyebrow">Administration</span>
          <h1 className="mt-3 text-3xl sm:text-4xl">Admin workspace</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Review submitted applications and reply to families in real time.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setReloadKey((key) => key + 1)}
          disabled={isLoading}
          className="btn-outline inline-flex items-center gap-2"
        >
          <RefreshCw className={`size-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </header>

      {error ? (
        <div className="mt-8 border border-accent bg-accent/20 px-5 py-4" role="alert">
          <p className="font-semibold">Admin access unavailable</p>
          <p className="mt-1 text-sm text-muted-foreground">{error}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Check the server&apos;s <code>ADMIN_EMAIL</code> and <code>ADMIN_PASSWORD</code>{" "}
            settings.
          </p>
        </div>
      ) : (
        <>
          <div
            className="mt-6 flex gap-1 border-b border-border"
            role="tablist"
            aria-label="Admin sections"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeSection === "applications"}
              onClick={() => setActiveSection("applications")}
              className={`border-b-2 px-4 py-3 text-sm font-medium ${activeSection === "applications"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
            >
              Applications <span className="ml-1.5 text-xs">{applications.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeSection === "messages"}
              onClick={() => setActiveSection("messages")}
              className={`border-b-2 px-4 py-3 text-sm font-medium ${activeSection === "messages"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
            >
              Messages <span className="ml-1.5 text-xs">{conversations.length}</span>
            </button>
          </div>

          {activeSection === "applications" ? (
            <section className="pt-8" aria-labelledby="applications-heading" role="tabpanel">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <span className="eyebrow">Applications</span>
                  <h2 id="applications-heading" className="mt-2 text-2xl">
                    Submitted applications
                  </h2>
                </div>
                <span className="text-sm text-muted-foreground" aria-live="polite">
                  {applications.length} total
                </span>
              </div>

              {isLoading ? (
                <p className="border-y border-border py-8 text-sm text-muted-foreground">
                  Loading applications...
                </p>
              ) : applications.length ? (
                <div className="divide-y divide-border border-y border-border">
                  {applications.map((application) => (
                    <ApplicationDetails key={application._id} application={application} />
                  ))}
                </div>
              ) : (
                <p className="border-y border-border py-8 text-sm text-muted-foreground">
                  No applications have been submitted yet.
                </p>
              )}
            </section>
          ) : (
            <section className="pt-8" aria-labelledby="messages-heading" role="tabpanel">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="eyebrow">Live support</span>
                  <h2 id="messages-heading" className="mt-2 text-2xl">
                    Applicant messages
                  </h2>
                </div>
                <label className="relative block w-full sm:max-w-xs">
                  <span className="sr-only">Search conversations</span>
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="field pl-9"
                    type="search"
                    value={conversationSearch}
                    onChange={(event) => setConversationSearch(event.target.value)}
                    placeholder="Search name, email, message"
                  />
                </label>
              </div>

              {isLoading ? (
                <p className="border-y border-border py-8 text-sm text-muted-foreground">
                  Loading conversations...
                </p>
              ) : conversations.length ? (
                <div className="grid min-h-[32rem] gap-6 xl:grid-cols-[minmax(15rem,0.65fr)_minmax(0,1.35fr)]">
                  <div className="max-h-[42rem] divide-y divide-border overflow-y-auto border-y border-border">
                    {filteredConversations.map((conversation) => (
                      <button
                        key={conversation._id}
                        type="button"
                        onClick={() => setSelectedConversationId(conversation._id)}
                        aria-pressed={conversation._id === selectedConversationId}
                        className={`block w-full px-3 py-4 text-left transition-colors hover:bg-muted ${conversation._id === selectedConversationId ? "bg-muted" : ""
                          }`}
                      >
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          <MessageCircle className="size-4 shrink-0 text-primary" />
                          <span className="truncate">{conversation.visitorName}</span>
                        </span>
                        <span className="mt-1 block truncate pl-6 text-xs text-muted-foreground">
                          {conversation.lastMessage?.body ?? conversation.visitorEmail}
                        </span>
                        <span className="mt-2 flex items-center justify-between gap-2 pl-6 text-[11px] text-muted-foreground">
                          <span>
                            {conversation.type === "support" ? "Website chat" : "Application"}
                          </span>
                          <time>
                            {new Intl.DateTimeFormat(undefined, {
                              hour: "numeric",
                              minute: "2-digit",
                            }).format(new Date(conversation.lastMessageAt))}
                          </time>
                        </span>
                      </button>
                    ))}
                    {!filteredConversations.length && (
                      <p className="px-4 py-8 text-sm text-muted-foreground">
                        No conversations match that search.
                      </p>
                    )}
                  </div>

                  {selectedConversation ? (
                    <ApplicationChat
                      key={selectedConversation._id}
                      conversationId={selectedConversation._id}
                      visitorName={selectedConversation.visitorName}
                      mode="admin"
                    />
                  ) : (
                    <p className="grid min-h-64 place-items-center border-y border-border text-sm text-muted-foreground">
                      Choose a conversation to view messages.
                    </p>
                  )}
                </div>
              ) : (
                <p className="border-y border-border py-8 text-sm text-muted-foreground">
                  No conversations yet. Website chats and application conversations will appear
                  here.
                </p>
              )}
            </section>
          )}
        </>
      )}
    </section>
  );
}

function ApplicationDetails({ application }: { application: Application }) {
  const studentName =
    application.studentType === "child" ? application.childName : application.name;

  return (
    <article className="py-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{studentName || "Name not provided"}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {application.studentType === "child" ? "Child" : "Adult"} application
            {application.childAge ? ` · age ${application.childAge}` : ""}
          </p>
        </div>
        <time className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          {new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
            new Date(application.createdAt),
          )}
        </time>
      </div>

      <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
        {application.studentType === "child" ? (
          <>
            <Detail label="Parent / guardian" value={application.parentName} />
            <Detail label="Relationship" value={application.relation} />
          </>
        ) : (
          <Detail label="Applicant" value={application.name} />
        )}
        <div>
          <dt className="text-xs text-muted-foreground">Phone</dt>
          <dd className="mt-0.5 inline-flex items-center gap-1.5">
            <Phone className="size-3.5 text-primary" />
            <a href={`tel:${application.phone}`} className="hover:text-primary">
              {application.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Email</dt>
          <dd className="mt-0.5 inline-flex min-w-0 items-center gap-1.5">
            <Mail className="size-3.5 shrink-0 text-primary" />
            <a href={`mailto:${application.email}`} className="truncate hover:text-primary">
              {application.email}
            </a>
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs text-muted-foreground">Message</dt>
          <dd className="mt-0.5 whitespace-pre-wrap break-words">
            {application.message || "No message provided"}
          </dd>
        </div>
      </dl>
    </article>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5">{value || "Not provided"}</dd>
    </div>
  );
}
