import { ApplicationChat } from "@/components/site/ApplicationChat";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { API_BASE_URL, apiClient } from "@/lib/api";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  ClipboardList,
  Mail,
  MessageCircle,
  MessagesSquare,
  Phone,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";

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
  type: "application" | "support";
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

type ScheduledClass = {
  _id: string;
  title: string;
  startsAt: string;
  instructor: string;
  description: string;
  meetingUrl: string;
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
  const response = await apiClient.request(`/api/admin/${path}`, { credentials: "include" });
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
  const [activeSection, setActiveSection] = useState<"applications" | "messages" | "classes">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [unreadConversationIds, setUnreadConversationIds] = useState<Set<string>>(new Set());
  const [scheduledClasses, setScheduledClasses] = useState<ScheduledClass[]>([]);
  const [isSavingClass, setIsSavingClass] = useState(false);
  const [isDeletingConversation, setIsDeletingConversation] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [conversationSearch, setConversationSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const selectedConversationIdRef = useRef("");
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    let socket: ReturnType<typeof io> | undefined;

    async function loadAdminData() {
      setIsLoading(true);
      setError("");
      try {
        const [applicationResult, conversationResult, classResult] = await Promise.all([
          getAdminData<{ applications: Application[] }>("applications"),
          getAdminData<{ conversations: Conversation[] }>("conversations"),
          getAdminData<{ classes: ScheduledClass[] }>("classes"),
        ]);
        if (!active) return;

        setApplications(applicationResult.applications);
        setConversations(conversationResult.conversations);
        setScheduledClasses(classResult.classes);
        const initialConversationId = selectedConversationIdRef.current || conversationResult.conversations[0]?._id || "";
        selectedConversationIdRef.current = initialConversationId;
        setSelectedConversationId(initialConversationId);
        setUnreadConversationIds(
          new Set(
            conversationResult.conversations
              .filter((conversation) => conversation.lastMessage?.sender === "visitor")
              .map((conversation) => conversation._id)
              .filter((conversationId) => conversationId !== initialConversationId),
          ),
        );

        socket = io(API_BASE_URL, { withCredentials: true });
        socket.on("chat:conversation-updated", (updated: Conversation) => {
          if (!active) return;
          setConversations((current) => {
            const remaining = current.filter((item) => item._id !== updated._id);
            return [updated, ...remaining];
          });
          if (updated.lastMessage?.sender === "visitor" && updated._id !== selectedConversationIdRef.current) {
            setUnreadConversationIds((current) => new Set(current).add(updated._id));
          }
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

  function selectConversation(conversationId: string) {
    selectedConversationIdRef.current = conversationId;
    setSelectedConversationId(conversationId);
    setUnreadConversationIds((current) => {
      const next = new Set(current);
      next.delete(conversationId);
      return next;
    });
  }

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

  async function handleDeleteConversation() {
    const conversation = selectedConversation;
    if (!conversation) return;

    setIsDeletingConversation(true);
    try {
      const response = await apiClient.request(
        `/api/admin/conversations/${conversation._id}?type=${conversation.type}`,
        { method: "DELETE", credentials: "include" },
      );
      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(result.message ?? "Could not delete conversation.");
      }

      const remainingConversations = conversations.filter((item) => item._id !== conversation._id);
      const nextConversationId = remainingConversations[0]?._id ?? "";
      setConversations(remainingConversations);
      selectedConversationIdRef.current = nextConversationId;
      setSelectedConversationId(nextConversationId);
      setUnreadConversationIds((current) => {
        const next = new Set(current);
        next.delete(conversation._id);
        next.delete(nextConversationId);
        return next;
      });
      setIsDeleteDialogOpen(false);
      toast.success("Chat and messages deleted.");
    } catch (deleteError) {
      toast.error(
        deleteError instanceof Error ? deleteError.message : "Could not delete conversation.",
      );
    } finally {
      setIsDeletingConversation(false);
    }
  }

  async function handleScheduleClass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSavingClass(true);
    try {
      const response = await apiClient.request("/api/admin/classes", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        scheduledClass?: ScheduledClass;
      };
      if (!response.ok || !result.scheduledClass) {
        throw new Error(result.message ?? "Could not schedule the class.");
      }
      setScheduledClasses((current) =>
        [...current, result.scheduledClass!].sort(
          (first, second) => Date.parse(first.startsAt) - Date.parse(second.startsAt),
        ),
      );
      form.reset();
      toast.success("Upcoming class added.");
    } catch (scheduleError) {
      toast.error(scheduleError instanceof Error ? scheduleError.message : "Could not schedule the class.");
    } finally {
      setIsSavingClass(false);
    }
  }

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
          <div className="mt-6 grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8">
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <p className="eyebrow mb-3 hidden px-3 lg:block">Workspace</p>
              <nav
                className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:border-r lg:border-border lg:pb-0 lg:pr-4"
                role="tablist"
                aria-label="Admin sections"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeSection === "applications"}
                  aria-controls="applications-panel"
                  onClick={() => setActiveSection("applications")}
                  className={`flex min-w-44 items-center justify-between gap-3 rounded-md border px-3 py-3 text-left text-sm font-medium transition-colors lg:w-full ${activeSection === "applications"
                    ? "border-primary bg-secondary/50 text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <span className="inline-flex items-center gap-3">
                    <ClipboardList className="size-4" />
                    Applications
                  </span>
                  <span className="inline-flex min-w-7 justify-center rounded-full bg-muted px-2 py-1 text-xs">
                    {applications.length}
                  </span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeSection === "messages"}
                  aria-controls="messages-panel"
                  onClick={() => setActiveSection("messages")}
                  className={`flex min-w-44 items-center justify-between gap-3 rounded-md border px-3 py-3 text-left text-sm font-medium transition-colors lg:w-full ${activeSection === "messages"
                    ? "border-primary bg-secondary/50 text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <span className="inline-flex items-center gap-3">
                    <MessagesSquare className="size-4" />
                    Messages
                  </span>
                  <span className="inline-flex min-w-7 justify-center rounded-full bg-muted px-2 py-1 text-xs">
                    {conversations.length}
                  </span>
                  {unreadConversationIds.size > 0 && (
                    <span
                      className="inline-grid min-w-5 place-items-center rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground"
                      aria-label={`${unreadConversationIds.size} unread conversation${unreadConversationIds.size === 1 ? "" : "s"}`}
                    >
                      {unreadConversationIds.size > 99 ? "99+" : unreadConversationIds.size}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeSection === "classes"}
                  aria-controls="classes-panel"
                  onClick={() => setActiveSection("classes")}
                  className={`flex min-w-44 items-center justify-between gap-3 rounded-md border px-3 py-3 text-left text-sm font-medium transition-colors lg:w-full ${activeSection === "classes"
                    ? "border-primary bg-secondary/50 text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                >
                  <span className="inline-flex items-center gap-3">
                    <CalendarDays className="size-4" />
                    Live Classes
                  </span>
                  <span className="inline-flex min-w-7 justify-center rounded-full bg-muted px-2 py-1 text-xs">
                    {scheduledClasses.length}
                  </span>
                </button>
              </nav>
            </aside>

            <div className="min-w-0">
              {activeSection === "applications" ? (
                <section
                  id="applications-panel"
                  className="pt-2"
                  aria-labelledby="applications-heading"
                  role="tabpanel"
                >
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
              ) : activeSection === "messages" ? (
                <section
                  id="messages-panel"
                  className="pt-2"
                  aria-labelledby="messages-heading"
                  role="tabpanel"
                >
                  <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="eyebrow">Live support</span>
                      <h2 id="messages-heading" className="mt-2 text-2xl">
                        Applicant messages
                      </h2>
                    </div>
                    <div className="flex w-full items-center gap-2 sm:w-auto">
                      <label className="relative block min-w-0 flex-1 sm:w-64 sm:flex-none">
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
                      {selectedConversation && (
                        <button
                          type="button"
                          onClick={() => setIsDeleteDialogOpen(true)}
                          disabled={isDeletingConversation}
                          aria-label={`Delete chat with ${selectedConversation.visitorName}`}
                          title="Delete chat"
                          className="btn-outline grid size-11 shrink-0 place-items-center p-0 text-destructive hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {isLoading ? (
                    <p className="border-y border-border py-8 text-sm text-muted-foreground">
                      Loading conversations...
                    </p>
                  ) : conversations.length ? (
                    <div className="grid gap-6 xl:grid-cols-[minmax(15rem,0.65fr)_minmax(0,1.35fr)]">
                      <div className="max-h-[24rem] divide-y divide-border overflow-y-auto border-y border-border">
                        {filteredConversations.map((conversation) => (
                          <button
                            key={conversation._id}
                            type="button"
                            onClick={() => selectConversation(conversation._id)}
                            aria-pressed={conversation._id === selectedConversationId}
                            className={`block w-full px-3 py-4 text-left transition-colors hover:bg-muted ${conversation._id === selectedConversationId ? "bg-muted" : ""
                              }`}
                          >
                            <span className="flex items-center gap-2 text-sm font-semibold">
                              <MessageCircle className="size-4 shrink-0 text-primary" />
                              <span className="truncate">{conversation.visitorName}</span>
                              {unreadConversationIds.has(conversation._id) && (
                                <span
                                  className="size-2 shrink-0 rounded-full bg-destructive"
                                  aria-label="Unread messages"
                                />
                              )}
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

                  <AlertDialog
                    open={isDeleteDialogOpen}
                    onOpenChange={(open) => {
                      if (!isDeletingConversation) setIsDeleteDialogOpen(open);
                    }}
                  >
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this chat?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This permanently deletes {selectedConversation?.visitorName}&apos;s chat and
                          all its messages. The application and user account will remain.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeletingConversation}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(event) => {
                            event.preventDefault();
                            void handleDeleteConversation();
                          }}
                          disabled={isDeletingConversation}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {isDeletingConversation ? "Deleting..." : "Delete chat"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </section>
              ) : (
                <section
                  id="classes-panel"
                  className="pt-2"
                  aria-labelledby="classes-heading"
                  role="tabpanel"
                >
                  <div className="mb-6">
                    <span className="eyebrow">Class schedule</span>
                    <h2 id="classes-heading" className="mt-2 text-2xl">
                      Upcoming classes
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Scheduled classes are visible to all registered students.
                    </p>
                  </div>

                  <div className="grid items-start gap-10 xl:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)]">
                    <form
                      className="grid gap-4 border-y border-border py-5"
                      onSubmit={(event) => void handleScheduleClass(event)}
                    >
                      <h3 className="text-lg font-semibold">Add a class</h3>
                      <label className="grid gap-1.5 text-sm font-medium">
                        Class title
                        <input
                          className="field"
                          name="title"
                          required
                          minLength={2}
                          maxLength={120}
                        />
                      </label>
                      <label className="grid gap-1.5 text-sm font-medium">
                        Date and time
                        <input className="field" name="startsAt" type="datetime-local" required />
                      </label>
                      <label className="grid gap-1.5 text-sm font-medium">
                        Instructor
                        <input className="field" name="instructor" maxLength={100} />
                      </label>
                      <label className="grid gap-1.5 text-sm font-medium">
                        Meeting link
                        <input
                          className="field"
                          name="meetingUrl"
                          type="url"
                          placeholder="https://..."
                          maxLength={500}
                        />
                      </label>
                      <label className="grid gap-1.5 text-sm font-medium">
                        Details
                        <textarea
                          className="field min-h-24 resize-y"
                          name="description"
                          maxLength={1000}
                        />
                      </label>
                      <button
                        type="submit"
                        className="btn-primary justify-self-start"
                        disabled={isSavingClass || isLoading}
                      >
                        {isSavingClass ? "Adding class..." : "Add upcoming class"}
                      </button>
                    </form>

                    <div>
                      <h3 className="text-lg font-semibold">Scheduled classes</h3>
                      {isLoading ? (
                        <p className="mt-4 border-y border-border py-6 text-sm text-muted-foreground">
                          Loading class schedule...
                        </p>
                      ) : scheduledClasses.filter((item) => Date.parse(item.startsAt) > Date.now())
                        .length ? (
                        <div className="mt-4 divide-y divide-border border-y border-border">
                          {scheduledClasses
                            .filter((item) => Date.parse(item.startsAt) > Date.now())
                            .map((item) => (
                              <article key={item._id} className="py-5">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                  <h4 className="font-semibold">{item.title}</h4>
                                  <time className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <CalendarDays className="size-3.5" />
                                    {new Intl.DateTimeFormat(undefined, {
                                      dateStyle: "medium",
                                      timeStyle: "short",
                                    }).format(new Date(item.startsAt))}
                                  </time>
                                </div>
                                {item.instructor && (
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    Instructor: {item.instructor}
                                  </p>
                                )}
                                {item.description && (
                                  <p className="mt-2 whitespace-pre-wrap text-sm">
                                    {item.description}
                                  </p>
                                )}
                                {item.meetingUrl && (
                                  <a
                                    className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-4"
                                    href={item.meetingUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Open meeting link
                                  </a>
                                )}
                              </article>
                            ))}
                        </div>
                      ) : (
                        <p className="mt-4 border-y border-border py-6 text-sm text-muted-foreground">
                          No upcoming classes have been scheduled.
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
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
