import { apiClient } from "@/lib/api";
import { authSessionQueryKey } from "@/lib/auth-session";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
    CalendarDays,
    Clock3,
    CreditCard,
    LayoutDashboard,
    LogOut,
    UserRound,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

type Student = {
    fullName: string;
    email: string;
    phone: string;
};

type ScheduledClass = {
    _id: string;
    title: string;
    startsAt: string;
    instructor: string;
    description: string;
    meetingUrl: string;
};

type Section = "overview" | "classes" | "fees" | "profile";

const sections = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "classes", label: "Live Classes", icon: CalendarDays },
    { id: "fees", label: "My Fees", icon: CreditCard },
    { id: "profile", label: "Profile", icon: UserRound },
] as const;

export const Route = createFileRoute("/dashboard")({
    head: () => ({
        meta: [
            { title: "Student Dashboard — Unique Wellness Institute" },
            { name: "robots", content: "noindex" },
        ],
    }),
    component: StudentDashboard,
});

function StudentDashboard() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [student, setStudent] = useState<Student | null>(null);
    const [activeSection, setActiveSection] = useState<Section>("overview");
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [scheduledClasses, setScheduledClasses] = useState<ScheduledClass[]>([]);
    const [isLoadingClasses, setIsLoadingClasses] = useState(false);
    const [classesError, setClassesError] = useState("");
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    useEffect(() => {
        let active = true;
        void apiClient.request("/api/auth/me", { credentials: "include" })
            .then(async (response) => {
                if (response.status === 401) {
                    await navigate({ to: "/auth", replace: true });
                    return null;
                }
                const result = (await response.json().catch(() => ({}))) as {
                    message?: string;
                    user?: Student;
                };
                if (!response.ok) throw new Error(result.message ?? "Could not load your account.");
                return result.user ?? null;
            })
            .then((result) => {
                if (active) setStudent(result);
            })
            .catch((error: unknown) => {
                if (active) setLoadError(error instanceof Error ? error.message : "Could not load your account.");
            })
            .finally(() => {
                if (active) setIsLoading(false);
            });

        return () => {
            active = false;
        };
    }, [navigate]);

    useEffect(() => {
        if (activeSection !== "classes" || !student) return;

        let active = true;
        setIsLoadingClasses(true);
        setClassesError("");
        void apiClient.request("/api/classes", { credentials: "include" })
            .then(async (response) => {
                if (response.status === 401) {
                    await navigate({ to: "/auth", replace: true });
                    return [];
                }
                const result = (await response.json().catch(() => ({}))) as {
                    message?: string;
                    classes?: ScheduledClass[];
                };
                if (!response.ok) throw new Error(result.message ?? "Could not load class schedule.");
                return result.classes ?? [];
            })
            .then((result) => {
                if (active) setScheduledClasses(result);
            })
            .catch((error: unknown) => {
                if (active) setClassesError(error instanceof Error ? error.message : "Could not load class schedule.");
            })
            .finally(() => {
                if (active) setIsLoadingClasses(false);
            });

        return () => {
            active = false;
        };
    }, [activeSection, navigate, student]);

    async function handleSignOut() {
        try {
            const response = await apiClient.request("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (!response.ok) throw new Error("Could not sign out. Please try again.");
            queryClient.setQueryData(authSessionQueryKey, null);
            await navigate({ to: "/", replace: true });
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Could not sign out.");
        }
    }

    async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setIsSavingProfile(true);
        try {
            const response = await apiClient.request("/api/auth/me", {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(formData.entries())),
            });
            const result = (await response.json().catch(() => ({}))) as {
                message?: string;
                user?: Student;
            };
            if (!response.ok || !result.user) throw new Error(result.message ?? "Could not update your profile.");
            setStudent(result.user);
            queryClient.setQueryData(authSessionQueryKey, result.user);
            toast.success("Profile updated.");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Could not update your profile.");
        } finally {
            setIsSavingProfile(false);
        }
    }

    async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        setIsChangingPassword(true);
        try {
            const response = await apiClient.request("/api/auth/password", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(formData.entries())),
            });
            const result = (await response.json().catch(() => ({}))) as { message?: string };
            if (!response.ok) throw new Error(result.message ?? "Could not update your password.");
            form.reset();
            toast.success("Password updated.");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Could not update your password.");
        } finally {
            setIsChangingPassword(false);
        }
    }

    if (isLoading) {
        return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Loading your account...</div>;
    }

    if (loadError || !student) {
        return (
            <div className="grid min-h-screen place-items-center px-5 text-center">
                <div className="max-w-md">
                    <h1 className="text-2xl">Account unavailable</h1>
                    <p className="mt-2 text-sm text-muted-foreground">{loadError || "We could not load your account."}</p>
                    <Link to="/" className="btn-primary mt-6">Return to the site</Link>
                </div>
            </div>
        );
    }

    const firstName = student.fullName.trim().split(/\s+/)[0] || "Student";
    const activeLabel = sections.find((section) => section.id === activeSection)?.label ?? "Overview";

    return (
        <div className="flex min-h-screen flex-col bg-background lg:flex-row">
            <aside className="flex min-w-0 flex-col border-b border-border bg-card lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between px-5 py-4 lg:px-7 lg:py-7">
                    <Link to="/" aria-label="Unique Wellness Institute home">
                        <img src="/logo.png" alt="Unique Wellness Institute" className="h-12 w-36 object-contain object-left" />
                    </Link>
                    <button type="button" onClick={() => void handleSignOut()} className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted lg:hidden">
                        <LogOut className="size-4" />
                        Sign out
                    </button>
                </div>

                <nav aria-label="Student dashboard" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:gap-2 lg:px-4">
                    {sections.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setActiveSection(id)}
                            aria-current={activeSection === id ? "page" : undefined}
                            className={`inline-flex shrink-0 items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-medium transition-colors lg:w-full ${activeSection === id
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                        >
                            <Icon className="size-4" />
                            {label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto hidden border-t border-border p-4 lg:block">
                    <div className="flex items-center gap-3 px-2 py-3">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-semibold text-primary">
                            {firstName.charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">{firstName}</p>
                            <p className="text-xs text-muted-foreground">Student</p>
                        </div>
                    </div>
                    <button type="button" onClick={() => void handleSignOut()} className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm font-medium hover:bg-muted">
                        <LogOut className="size-4" />
                        Sign out
                    </button>
                </div>
            </aside>

            <main className="min-w-0 flex-1">
                <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
                    <p className="text-xs font-semibold uppercase text-primary">Student account</p>
                    <h1 className="mt-2 text-3xl sm:text-4xl">{activeSection === "overview" ? `Welcome, ${firstName}` : activeLabel}</h1>

                    {activeSection === "overview" && (
                        <section className="mt-8" aria-label="Account overview">
                            <p className="max-w-2xl text-muted-foreground">Your learning and account updates will appear here.</p>
                            <div className="mt-8 grid border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-border">
                                <button type="button" onClick={() => setActiveSection("classes")} className="flex items-center justify-between gap-4 py-5 text-left sm:px-5">
                                    <span>
                                        <span className="block text-xs font-semibold uppercase text-muted-foreground">Live classes</span>
                                        <span className="mt-1 block font-medium">No batch assigned</span>
                                    </span>
                                    <CalendarDays className="size-5 text-primary" />
                                </button>
                                <button type="button" onClick={() => setActiveSection("fees")} className="flex items-center justify-between gap-4 border-t border-border py-5 text-left sm:border-t-0 sm:px-5">
                                    <span>
                                        <span className="block text-xs font-semibold uppercase text-muted-foreground">My fees</span>
                                        <span className="mt-1 block font-medium">View fee information</span>
                                    </span>
                                    <CreditCard className="size-5 text-primary" />
                                </button>
                            </div>
                            <button type="button" onClick={() => setActiveSection("profile")} className="mt-7 inline-flex items-center gap-3 rounded-md border border-border px-4 py-3 text-sm font-medium hover:bg-muted">
                                <UserRound className="size-4" />
                                Manage your profile
                            </button>
                        </section>
                    )}

                    {activeSection === "classes" && (
                        <section className="mt-8" aria-label="Live classes">
                            <p className="text-sm text-muted-foreground">Upcoming sessions scheduled by the institute.</p>
                            <h2 className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase text-muted-foreground"><CalendarDays className="size-4" /> Upcoming</h2>
                            {isLoadingClasses ? (
                                <p className="mt-4 border-y border-border py-6 text-sm text-muted-foreground">Loading class schedule...</p>
                            ) : classesError ? (
                                <p className="mt-4 border-y border-border py-6 text-sm text-destructive" role="alert">{classesError}</p>
                            ) : (
                                <ScheduledClassList
                                    classes={scheduledClasses.filter((item) => Date.parse(item.startsAt) > Date.now())}
                                    emptyMessage="No upcoming classes have been scheduled yet."
                                    showMeetingLinks
                                />
                            )}
                            <h2 className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase text-muted-foreground"><Clock3 className="size-4" /> Past sessions</h2>
                            {!isLoadingClasses && !classesError && (
                                <ScheduledClassList
                                    classes={scheduledClasses.filter((item) => Date.parse(item.startsAt) <= Date.now())}
                                    emptyMessage="No past sessions yet."
                                />
                            )}
                        </section>
                    )}

                    {activeSection === "fees" && (
                        <section className="mt-8 max-w-3xl" aria-label="My fees">
                            <p className="text-sm text-muted-foreground">Your fee information and payment history will appear here.</p>
                            <EmptyState>There are no fee records to show yet.</EmptyState>
                        </section>
                    )}

                    {activeSection === "profile" && (
                        <section className="mt-8 grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-12" aria-label="Profile settings">
                            <div>
                                <h2 className="text-xl">Personal details</h2>
                                <p className="mt-1 text-sm text-muted-foreground">Update the contact details on your account.</p>
                                <form className="mt-6 grid gap-4" onSubmit={(event) => void handleProfileSubmit(event)}>
                                    <label className="grid gap-1.5 text-sm font-medium">
                                        Full name
                                        <input className="field" name="fullName" autoComplete="name" defaultValue={student.fullName} required minLength={2} maxLength={100} />
                                    </label>
                                    <label className="grid gap-1.5 text-sm font-medium">
                                        Email
                                        <input className="field" name="email" type="email" autoComplete="email" defaultValue={student.email} required />
                                    </label>
                                    <label className="grid gap-1.5 text-sm font-medium">
                                        Phone number
                                        <input className="field" name="phone" type="tel" autoComplete="tel" defaultValue={student.phone} required minLength={7} maxLength={32} />
                                    </label>
                                    <button type="submit" className="btn-primary mt-2 justify-self-start" disabled={isSavingProfile}>
                                        {isSavingProfile ? "Saving..." : "Save changes"}
                                    </button>
                                </form>
                            </div>

                            <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                                <h2 className="text-xl">Change password</h2>
                                <p className="mt-1 text-sm text-muted-foreground">Confirm your current password before setting a new one.</p>
                                <form className="mt-6 grid gap-4" onSubmit={(event) => void handlePasswordSubmit(event)}>
                                    <label className="grid gap-1.5 text-sm font-medium">
                                        Current password
                                        <input className="field" name="currentPassword" type="password" autoComplete="current-password" required maxLength={128} />
                                    </label>
                                    <label className="grid gap-1.5 text-sm font-medium">
                                        New password
                                        <input className="field" name="newPassword" type="password" autoComplete="new-password" required minLength={8} maxLength={128} />
                                    </label>
                                    <button type="submit" className="btn-outline mt-2 justify-self-start" disabled={isChangingPassword}>
                                        {isChangingPassword ? "Updating..." : "Update password"}
                                    </button>
                                </form>
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
}

function EmptyState({ children }: { children: string }) {
    return (
        <div className="mt-4 grid min-h-24 place-items-center rounded-md border border-dashed border-border px-5 py-6 text-center text-sm text-muted-foreground">
            {children}
        </div>
    );
}

function ScheduledClassList({
    classes,
    emptyMessage,
    showMeetingLinks = false,
}: {
    classes: ScheduledClass[];
    emptyMessage: string;
    showMeetingLinks?: boolean;
}) {
    if (!classes.length) return <EmptyState>{emptyMessage}</EmptyState>;

    return (
        <div className="mt-4 divide-y divide-border border-y border-border">
            {classes.map((item) => (
                <article key={item._id} className="py-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="font-semibold">{item.title}</h3>
                        <time className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarDays className="size-3.5" />
                            {new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.startsAt))}
                        </time>
                    </div>
                    {item.instructor && <p className="mt-1 text-sm text-muted-foreground">Instructor: {item.instructor}</p>}
                    {item.description && <p className="mt-2 whitespace-pre-wrap text-sm">{item.description}</p>}
                    {showMeetingLinks && item.meetingUrl && (
                        <a className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-4" href={item.meetingUrl} target="_blank" rel="noreferrer">
                            Join class
                        </a>
                    )}
                </article>
            ))}
        </div>
    );
}