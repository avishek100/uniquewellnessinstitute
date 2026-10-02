import { ApplicationChat } from "@/components/site/ApplicationChat";
import { API_BASE_URL, apiClient, setAdminSessionToken } from "@/lib/api";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  FileText,
  Filter,
  Globe,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  UserCheck,
  Users,
  Video,
  X
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";

export type ApplicationStatus = "pending" | "reviewed" | "contacted" | "enrolled" | "rejected";

export type Application = {
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
  status?: ApplicationStatus;
  notes?: string;
  createdAt: string;
};

export type Conversation = {
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

export type ScheduledClass = {
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
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [conversationSearch, setConversationSearch] = useState("");

  // Application filters
  const [applicationSearch, setApplicationSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [currentNotes, setCurrentNotes] = useState("");

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

  // Status updates for applications
  async function handleUpdateApplicationStatus(applicationId: string, newStatus: ApplicationStatus) {
    try {
      const response = await apiClient.request(`/api/admin/applications/${applicationId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        application?: Application;
        message?: string;
      };
      if (!response.ok || !result.application) {
        throw new Error(result.message ?? "Could not update status.");
      }
      setApplications((current) =>
        current.map((app) => (app._id === applicationId ? { ...app, status: newStatus } : app)),
      );
      toast.success(`Application marked as ${newStatus}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update application status.");
    }
  }

  // Save notes for application
  async function handleSaveNotes(applicationId: string) {
    try {
      const response = await apiClient.request(`/api/admin/applications/${applicationId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: currentNotes }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        application?: Application;
        message?: string;
      };
      if (!response.ok || !result.application) {
        throw new Error(result.message ?? "Could not save notes.");
      }
      setApplications((current) =>
        current.map((app) => (app._id === applicationId ? { ...app, notes: currentNotes } : app)),
      );
      setEditingNotesId(null);
      toast.success("Admin notes saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save notes.");
    }
  }

  // Delete application
  async function handleDeleteApplication(applicationId: string) {
    if (!window.confirm("Are you sure you want to delete this application permanently?")) return;
    try {
      const response = await apiClient.request(`/api/admin/applications/${applicationId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const res = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(res.message ?? "Could not delete application.");
      }
      setApplications((current) => current.filter((app) => app._id !== applicationId));
      toast.success("Application deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete application.");
    }
  }

  // Delete conversation
  async function handleDeleteConversation(conversationId: string, event?: React.MouseEvent) {
    event?.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this conversation and all its messages?")) return;
    try {
      const response = await apiClient.request(`/api/admin/conversations/${conversationId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const res = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(res.message ?? "Could not delete conversation.");
      }
      setConversations((current) => current.filter((c) => c._id !== conversationId));
      if (selectedConversationId === conversationId) {
        setSelectedConversationId("");
        selectedConversationIdRef.current = "";
      }
      toast.success("Conversation deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete conversation.");
    }
  }

  // Delete class
  async function handleDeleteClass(classId: string) {
    if (!window.confirm("Are you sure you want to delete this scheduled class?")) return;
    try {
      const response = await apiClient.request(`/api/admin/classes/${classId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const res = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(res.message ?? "Could not delete class.");
      }
      setScheduledClasses((current) => current.filter((c) => c._id !== classId));
      toast.success("Scheduled class deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete scheduled class.");
    }
  }

  async function handleSignOut() {
    try {
      await apiClient.request("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore logout failures and proceed to clear the stored admin token
    } finally {
      setAdminSessionToken(null);
      toast.success("Signed out successfully.");
      await navigate({ to: "/auth", replace: true });
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

  // Application filtering
  const filteredApplications = applications.filter((app) => {
    const query = applicationSearch.trim().toLowerCase();
    const matchesSearch =
      !query ||
      (app.name && app.name.toLowerCase().includes(query)) ||
      (app.childName && app.childName.toLowerCase().includes(query)) ||
      (app.parentName && app.parentName.toLowerCase().includes(query)) ||
      app.email.toLowerCase().includes(query) ||
      app.phone.includes(query) ||
      (app.message && app.message.toLowerCase().includes(query)) ||
      (app.notes && app.notes.toLowerCase().includes(query));

    const matchesStatus = statusFilter === "all" || (app.status || "pending") === statusFilter;
    const matchesType = typeFilter === "all" || app.studentType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const pendingApplicationsCount = applications.filter((app) => !app.status || app.status === "pending").length;
  const enrolledApplicationsCount = applications.filter((app) => app.status === "enrolled").length;
  const upcomingClassesCount = scheduledClasses.filter((item) => Date.parse(item.startsAt) > Date.now()).length;

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
    <div className="min-h-screen bg-background">
      {/* Top Dedicated Admin Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-2 py-2 sm:gap-4">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link to="/" aria-label="Unique Wellness Institute home" className="shrink-0">
              <img
                src="/logo.png"
                alt="Unique Wellness Institute"
                className="h-8 w-24 object-contain object-left sm:h-10 sm:w-28"
              />
            </Link>
            <div className="hidden h-5 w-px bg-border sm:block" />
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              <Shield className="size-3.5" /> Admin Console
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
              to="/"
              className="btn-outline hidden sm:inline-flex items-center gap-1.5 text-xs py-1.5 px-3 font-medium"
              title="View public website"
            >
              <Globe className="size-3.5" />
              <span>Public Website</span>
            </Link>
            <button
              type="button"
              onClick={() => setReloadKey((key) => key + 1)}
              disabled={isLoading}
              className="btn-outline inline-flex items-center gap-1.5 text-[11px] py-1.5 px-2.5 font-medium sm:text-xs sm:px-3"
            >
              <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="btn-outline inline-flex items-center gap-1.5 text-[11px] py-1.5 px-2.5 font-medium text-destructive hover:bg-destructive/10 hover:border-destructive/30 sm:text-xs sm:px-3"
              title="Sign out of admin workspace"
            >
              <LogOut className="size-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <section className="container-page py-6 sm:py-8">

        {error ? (
          <div className="mt-4 border border-destructive/30 bg-destructive/10 rounded-xl px-5 py-4" role="alert">
            <div className="flex items-center gap-2 text-destructive font-semibold">
              <AlertCircle className="size-5" />
              <p>Admin access unavailable</p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Check the server&apos;s <code>ADMIN_EMAIL</code> and <code>ADMIN_PASSWORD</code> settings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
            {/* Left Sidebar Navigation */}
            <aside className="card-soft rounded-2xl p-2 border border-border/80 lg:sticky lg:top-24 shadow-sm">
              <nav className="flex flex-row gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" aria-label="Admin Navigation">
                {/* Applications Navigation Item */}
                <button
                  type="button"
                  onClick={() => setActiveSection("applications")}
                  className={`flex min-w-[140px] flex-1 items-center justify-between gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all lg:min-w-0 ${activeSection === "applications"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <FileText className="size-4 shrink-0" />
                    <span>Applications</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {pendingApplicationsCount > 0 && activeSection !== "applications" && (
                      <span className="size-2 rounded-full bg-amber-500" title={`${pendingApplicationsCount} pending`} />
                    )}
                    <span
                      className={`inline-grid min-w-5.5 place-items-center rounded-full px-2 py-0.5 text-xs font-bold ${activeSection === "applications"
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-foreground"
                        }`}
                    >
                      {applications.length}
                    </span>
                  </div>
                </button>

                {/* Messages Navigation Item */}
                <button
                  type="button"
                  onClick={() => setActiveSection("messages")}
                  className={`flex min-w-[140px] flex-1 items-center justify-between gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all lg:min-w-0 ${activeSection === "messages"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <MessageSquare className="size-4 shrink-0" />
                    <span>Messages</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {unreadConversationIds.size > 0 && (
                      <span
                        className="inline-grid min-w-5 place-items-center rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground animate-pulse"
                        title={`${unreadConversationIds.size} unread`}
                      >
                        {unreadConversationIds.size > 99 ? "99+" : unreadConversationIds.size}
                      </span>
                    )}
                    <span
                      className={`inline-grid min-w-5.5 place-items-center rounded-full px-2 py-0.5 text-xs font-bold ${activeSection === "messages"
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-foreground"
                        }`}
                    >
                      {conversations.length}
                    </span>
                  </div>
                </button>

                {/* Live Classes Navigation Item */}
                <button
                  type="button"
                  onClick={() => setActiveSection("classes")}
                  className={`flex min-w-[140px] flex-1 items-center justify-between gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all lg:min-w-0 ${activeSection === "classes"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Video className="size-4 shrink-0" />
                    <span>Live Classes</span>
                  </span>
                  <span
                    className={`inline-grid min-w-5.5 place-items-center rounded-full px-2 py-0.5 text-xs font-bold ${activeSection === "classes"
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-foreground"
                      }`}
                  >
                    {upcomingClassesCount}
                  </span>
                </button>
              </nav>

              {/* Quick overview widget in sidebar for desktop */}
              <div className="hidden lg:block mt-6 pt-5 border-t border-border/60 px-2">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-3">
                  Quick Summary
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Pending review</span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400">{pendingApplicationsCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Enrolled students</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{enrolledApplicationsCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Upcoming classes</span>
                    <span className="font-semibold text-foreground">{upcomingClassesCount}</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Workspace */}
            <main className="min-w-0">
              {activeSection === "applications" && (
                <section aria-labelledby="applications-heading" className="space-y-6">
                  {/* Stats row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <div className="card-soft p-4 rounded-xl border border-border/80">
                      <p className="text-xs text-muted-foreground font-medium">Total Applications</p>
                      <p className="text-2xl font-bold mt-1">{applications.length}</p>
                    </div>
                    <div className="card-soft p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                      <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Pending Review</p>
                      <p className="text-2xl font-bold mt-1 text-amber-600 dark:text-amber-400">{pendingApplicationsCount}</p>
                    </div>
                    <div className="card-soft p-4 rounded-xl border border-border/80">
                      <p className="text-xs text-muted-foreground font-medium">Contacted</p>
                      <p className="text-2xl font-bold mt-1">
                        {applications.filter((a) => a.status === "contacted" || a.status === "reviewed").length}
                      </p>
                    </div>
                    <div className="card-soft p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Enrolled</p>
                      <p className="text-2xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">{enrolledApplicationsCount}</p>
                    </div>
                  </div>

                  {/* Filters and search header */}
                  <div className="card-soft p-4 rounded-xl border border-border/80 space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="relative flex-1 min-w-[220px]">
                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          className="field pl-9 text-xs sm:text-sm py-2"
                          type="search"
                          value={applicationSearch}
                          onChange={(e) => setApplicationSearch(e.target.value)}
                          placeholder="Search student, parent, email, phone, notes..."
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          className="field text-xs py-2 px-2.5"
                          value={typeFilter}
                          onChange={(e) => setTypeFilter(e.target.value)}
                          aria-label="Filter by student type"
                        >
                          <option value="all">All Types (Adult & Child)</option>
                          <option value="child">Child Only</option>
                          <option value="adult">Adult Only</option>
                        </select>
                      </div>
                    </div>

                    {/* Status Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/60">
                      <span className="text-xs text-muted-foreground mr-1 inline-flex items-center gap-1">
                        <Filter className="size-3" /> Status:
                      </span>
                      {(["all", "pending", "reviewed", "contacted", "enrolled", "rejected"] as const).map((status) => {
                        const count =
                          status === "all"
                            ? applications.length
                            : applications.filter((a) => (a.status || "pending") === status).length;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setStatusFilter(status)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${statusFilter === status
                              ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                              : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                          >
                            {status} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Applications list */}
                  {isLoading ? (
                    <div className="card-soft p-12 text-center rounded-xl border border-border text-sm text-muted-foreground">
                      <RefreshCw className="size-6 animate-spin mx-auto mb-2 text-primary" />
                      Loading submitted applications...
                    </div>
                  ) : filteredApplications.length ? (
                    <div className="space-y-4">
                      {filteredApplications.map((application) => {
                        const studentName =
                          application.studentType === "child" ? application.childName : application.name;
                        const status = application.status || "pending";
                        const isEditingNotes = editingNotesId === application._id;

                        return (
                          <article
                            key={application._id}
                            className="card-soft rounded-2xl border border-border/80 p-5 hover:border-border transition-all shadow-xs"
                          >
                            {/* Top Row: Name, Status badge, Quick Actions */}
                            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-border/60">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2.5 flex-wrap">
                                  <h3 className="font-semibold text-base sm:text-lg">
                                    {studentName || "Name not specified"}
                                  </h3>
                                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                    {application.studentType === "child"
                                      ? `Child${application.childAge ? ` (Age ${application.childAge})` : ""}`
                                      : "Adult Student"}
                                  </span>
                                  <StatusBadge status={status} />
                                </div>
                                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                  <Clock className="size-3" />
                                  Submitted {new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(application.createdAt))}
                                </p>
                              </div>

                              {/* Status Selector & Delete */}
                              <div className="flex items-center gap-2 self-start sm:self-auto">
                                <select
                                  className="field min-w-[120px] text-xs py-1.5 px-2.5 font-medium"
                                  value={status}
                                  onChange={(e) =>
                                    void handleUpdateApplicationStatus(
                                      application._id,
                                      e.target.value as ApplicationStatus,
                                    )
                                  }
                                  aria-label="Change status"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="reviewed">Reviewed</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="enrolled">Enrolled</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                                <button
                                  type="button"
                                  onClick={() => void handleDeleteApplication(application._id)}
                                  title="Delete application"
                                  className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                            </div>

                            {/* Contact & Student Info Grid */}
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
                              {application.studentType === "child" && (
                                <>
                                  <div className="bg-muted/40 p-2.5 rounded-lg">
                                    <span className="text-[11px] text-muted-foreground block">Parent / Guardian</span>
                                    <span className="font-medium mt-0.5 block">{application.parentName || "—"}</span>
                                  </div>
                                  <div className="bg-muted/40 p-2.5 rounded-lg">
                                    <span className="text-[11px] text-muted-foreground block">Relation</span>
                                    <span className="font-medium mt-0.5 block">{application.relation || "—"}</span>
                                  </div>
                                </>
                              )}
                              <div className="bg-muted/40 p-2.5 rounded-lg">
                                <span className="text-[11px] text-muted-foreground block">Phone</span>
                                <a
                                  href={`tel:${application.phone}`}
                                  className="font-medium text-primary hover:underline mt-0.5 inline-flex items-center gap-1"
                                >
                                  <Phone className="size-3" />
                                  {application.phone}
                                </a>
                              </div>
                              <div className="bg-muted/40 p-2.5 rounded-lg min-w-0">
                                <span className="text-[11px] text-muted-foreground block">Email</span>
                                <a
                                  href={`mailto:${application.email}`}
                                  className="font-medium text-primary hover:underline truncate mt-0.5 inline-flex items-center gap-1 max-w-full"
                                >
                                  <Mail className="size-3 shrink-0" />
                                  <span className="truncate">{application.email}</span>
                                </a>
                              </div>
                            </div>

                            {/* Applicant Message */}
                            {application.message && (
                              <div className="mt-3.5 bg-muted/20 border border-border/60 p-3 rounded-xl text-xs sm:text-sm">
                                <span className="text-[11px] font-semibold text-muted-foreground block mb-1">
                                  Applicant Note / Experience:
                                </span>
                                <p className="whitespace-pre-wrap leading-relaxed text-foreground/90">
                                  {application.message}
                                </p>
                              </div>
                            )}

                            {/* Admin Notes Section */}
                            <div className="mt-3.5 pt-3 border-t border-border/50">
                              {isEditingNotes ? (
                                <div className="space-y-2">
                                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                    <Edit3 className="size-3.5 text-primary" />
                                    Admin Notes & Call Logs:
                                  </label>
                                  <textarea
                                    className="field text-xs sm:text-sm min-h-16 w-full"
                                    value={currentNotes}
                                    onChange={(e) => setCurrentNotes(e.target.value)}
                                    placeholder="Add notes about trial schedule, skill level, phone conversation..."
                                  />
                                  <div className="flex items-center gap-2 justify-end">
                                    <button
                                      type="button"
                                      onClick={() => setEditingNotesId(null)}
                                      className="btn-outline text-xs py-1 px-2.5"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => void handleSaveNotes(application._id)}
                                      className="btn-primary text-xs py-1 px-3"
                                    >
                                      Save Notes
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-start justify-between gap-3">
                                  <div className="text-xs text-muted-foreground">
                                    <span className="font-semibold text-foreground/80">Admin Note: </span>
                                    {application.notes ? (
                                      <span className="text-foreground">{application.notes}</span>
                                    ) : (
                                      <span className="italic">No notes recorded yet.</span>
                                    )}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingNotesId(application._id);
                                      setCurrentNotes(application.notes || "");
                                    }}
                                    className="text-xs text-primary hover:underline shrink-0 inline-flex items-center gap-1"
                                  >
                                    <Edit3 className="size-3" />
                                    {application.notes ? "Edit Note" : "Add Note"}
                                  </button>
                                </div>
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="card-soft p-12 text-center rounded-2xl border border-border">
                      <FileText className="size-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="font-medium">No applications found</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {applicationSearch || statusFilter !== "all" || typeFilter !== "all"
                          ? "Try adjusting your filters or search terms."
                          : "Submitted applications will appear here."}
                      </p>
                    </div>
                  )}
                </section>
              )}

              {activeSection === "messages" && (
                <section aria-labelledby="messages-heading" className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 id="messages-heading" className="text-xl sm:text-2xl font-bold">
                        Live Messages & Support
                      </h2>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Real-time chats with visitors and applicants.
                      </p>
                    </div>
                    <div className="relative w-full sm:w-64">
                      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        className="field pl-9 text-xs sm:text-sm py-2 w-full"
                        type="search"
                        value={conversationSearch}
                        onChange={(event) => setConversationSearch(event.target.value)}
                        placeholder="Search messages..."
                      />
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="card-soft p-12 text-center rounded-xl border border-border text-sm text-muted-foreground">
                      <RefreshCw className="size-6 animate-spin mx-auto mb-2 text-primary" />
                      Loading conversations...
                    </div>
                  ) : conversations.length ? (
                    <div className="grid gap-5 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] items-start">
                      {/* Left: Compact Conversations List */}
                      <div className="card-soft rounded-xl border border-border/80 overflow-hidden divide-y divide-border/60 max-h-[480px] overflow-y-auto">
                        {filteredConversations.map((conversation) => {
                          const isSelected = conversation._id === selectedConversationId;
                          const hasUnread = unreadConversationIds.has(conversation._id);
                          return (
                            <div
                              key={conversation._id}
                              onClick={() => selectConversation(conversation._id)}
                              className={`group relative flex items-start justify-between p-3.5 cursor-pointer transition-colors ${isSelected
                                ? "bg-primary/10 border-l-4 border-l-primary"
                                : "hover:bg-muted/60"
                                }`}
                            >
                              <div className="min-w-0 flex-1 pr-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-xs sm:text-sm truncate">
                                    {conversation.visitorName}
                                  </span>
                                  {hasUnread && (
                                    <span className="size-2 rounded-full bg-destructive shrink-0" />
                                  )}
                                  <span className="rounded bg-muted px-1.5 py-0.2 text-[10px] text-muted-foreground shrink-0">
                                    {conversation.type === "support" ? "Support" : "Application"}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground truncate mt-0.5">
                                  {conversation.lastMessage?.body || conversation.visitorEmail}
                                </p>
                                <time className="text-[10px] text-muted-foreground/70 block mt-1">
                                  {new Intl.DateTimeFormat(undefined, {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    month: "short",
                                    day: "numeric",
                                  }).format(new Date(conversation.lastMessageAt))}
                                </time>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => void handleDeleteConversation(conversation._id, e)}
                                title="Delete conversation"
                                className="opacity-0 group-hover:opacity-100 rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          );
                        })}
                        {!filteredConversations.length && (
                          <p className="p-6 text-center text-xs text-muted-foreground">
                            No conversations match that search.
                          </p>
                        )}
                      </div>

                      {/* Right: Small, Scrollable Chat Panel */}
                      <div>
                        {selectedConversation ? (
                          <ApplicationChat
                            key={selectedConversation._id}
                            conversationId={selectedConversation._id}
                            visitorName={selectedConversation.visitorName}
                            mode="admin"
                            onMessageDeleted={() => setReloadKey((k) => k + 1)}
                          />
                        ) : (
                          <div className="card-soft flex h-[480px] flex-col items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-muted-foreground">
                            <MessageSquare className="size-8 opacity-40 mb-2" />
                            <p className="text-sm font-medium">Select a conversation</p>
                            <p className="text-xs mt-1">Choose a conversation from the left to read and reply.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="card-soft p-12 text-center rounded-2xl border border-border">
                      <MessageSquare className="size-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="font-medium">No messages yet</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Website visitor chats and applicant messages will appear here.
                      </p>
                    </div>
                  )}
                </section>
              )}

              {activeSection === "classes" && (
                <section aria-labelledby="classes-heading" className="space-y-6">
                  <div>
                    <h2 id="classes-heading" className="text-xl sm:text-2xl font-bold">
                      Class Scheduling & Management
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Scheduled classes are immediately visible to registered students in their portal.
                    </p>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[minmax(18rem,0.75fr)_minmax(0,1.25fr)] items-start">
                    {/* Add Class Form */}
                    <form
                      className="card-soft rounded-2xl border border-border/80 p-5 space-y-3.5 shadow-xs"
                      onSubmit={(event) => void handleScheduleClass(event)}
                    >
                      <h3 className="text-sm font-semibold flex items-center gap-1.5">
                        <Plus className="size-4 text-primary" /> Schedule New Class
                      </h3>
                      <label className="grid gap-1 text-xs font-medium">
                        Class Title
                        <input
                          className="field text-xs sm:text-sm"
                          name="title"
                          required
                          minLength={2}
                          maxLength={120}
                          placeholder="e.g. Masterclass: Sicilian Defense"
                        />
                      </label>
                      <label className="grid gap-1 text-xs font-medium">
                        Date & Time
                        <input className="field text-xs sm:text-sm" name="startsAt" type="datetime-local" required />
                      </label>
                      <label className="grid gap-1 text-xs font-medium">
                        Instructor Name
                        <input
                          className="field text-xs sm:text-sm"
                          name="instructor"
                          maxLength={100}
                          placeholder="e.g. GM Alex / Coach Rahul"
                        />
                      </label>
                      <label className="grid gap-1 text-xs font-medium">
                        Meeting / Zoom Link
                        <input
                          className="field text-xs sm:text-sm"
                          name="meetingUrl"
                          type="url"
                          placeholder="https://zoom.us/j/..."
                          maxLength={500}
                        />
                      </label>
                      <label className="grid gap-1 text-xs font-medium">
                        Description & Curriculum
                        <textarea
                          className="field text-xs sm:text-sm min-h-20 resize-y"
                          name="description"
                          maxLength={1000}
                          placeholder="What will students learn in this session?"
                        />
                      </label>
                      <button
                        type="submit"
                        className="btn-primary w-full text-xs sm:text-sm py-2.5 font-medium"
                        disabled={isSavingClass || isLoading}
                      >
                        {isSavingClass ? "Saving Class..." : "Publish Upcoming Class"}
                      </button>
                    </form>

                    {/* Scheduled Classes List */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Upcoming Classes ({upcomingClassesCount})
                      </h3>
                      {isLoading ? (
                        <p className="card-soft p-6 text-sm text-muted-foreground text-center">Loading classes...</p>
                      ) : scheduledClasses.filter((item) => Date.parse(item.startsAt) > Date.now()).length ? (
                        <div className="space-y-3">
                          {scheduledClasses
                            .filter((item) => Date.parse(item.startsAt) > Date.now())
                            .map((item) => (
                              <article
                                key={item._id}
                                className="card-soft rounded-xl border border-border/80 p-4 relative group shadow-xs"
                              >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                  <div>
                                    <h4 className="font-semibold text-sm sm:text-base">{item.title}</h4>
                                    <time className="inline-flex items-center gap-1.5 text-xs text-primary font-medium mt-0.5">
                                      <CalendarDays className="size-3.5" />
                                      {new Intl.DateTimeFormat(undefined, {
                                        dateStyle: "full",
                                        timeStyle: "short",
                                      }).format(new Date(item.startsAt))}
                                    </time>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => void handleDeleteClass(item._id)}
                                    title="Delete class"
                                    className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                                  >
                                    <Trash2 className="size-4" />
                                  </button>
                                </div>

                                {item.instructor && (
                                  <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
                                    <Users className="size-3 text-muted-foreground" />
                                    Instructor: <span className="font-medium text-foreground">{item.instructor}</span>
                                  </p>
                                )}
                                {item.description && (
                                  <p className="mt-2 whitespace-pre-wrap text-xs text-muted-foreground leading-relaxed bg-muted/30 p-2.5 rounded-lg">
                                    {item.description}
                                  </p>
                                )}
                                {item.meetingUrl && (
                                  <a
                                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary underline underline-offset-4 hover:text-primary/80"
                                    href={item.meetingUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <ExternalLink className="size-3" />
                                    Join Meeting Link
                                  </a>
                                )}
                              </article>
                            ))}
                        </div>
                      ) : (
                        <div className="card-soft p-8 text-center rounded-xl border border-border">
                          <Video className="size-6 text-muted-foreground mx-auto mb-2 opacity-50" />
                          <p className="text-xs text-muted-foreground">No upcoming classes scheduled yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}
            </main>
          </div>
        )}
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  switch (status) {
    case "enrolled":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-3" /> Enrolled
        </span>
      );
    case "contacted":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400">
          <Phone className="size-3" /> Contacted
        </span>
      );
    case "reviewed":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
          <UserCheck className="size-3" /> Reviewed
        </span>
      );
    case "rejected":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
          <X className="size-3" /> Rejected
        </span>
      );
    case "pending":
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
          <Clock className="size-3" /> Pending
        </span>
      );
  }
}
