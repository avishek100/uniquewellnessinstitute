import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarDays, Clock3, Users } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Unique Wellness Institute" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const courses = [
  { name: "First Moves", level: "Beginner", ages: "Ages 5-8" },
  { name: "Tactics Track", level: "Intermediate", ages: "Ages 8-14" },
  { name: "Tournament Ready", level: "Advanced", ages: "Ages 10-16" },
];

const sampleUserCount = 128;
const sampleMembers = [
  { id: "preview-member-001", full_name: "Preview Member 1", created_at: "2026-09-25" },
  { id: "preview-member-002", full_name: "Preview Member 2", created_at: "2026-09-22" },
  { id: "preview-member-003", full_name: "Preview Member 3", created_at: "2026-09-18" },
];

function AdminPage() {
  return (
    <section className="container-page py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-7">
        <div>
          <span className="eyebrow">Administration</span>
          <h1 className="mt-3 text-3xl sm:text-4xl">Admin workspace</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Membership and the live programs offered by the institute.
          </p>
        </div>
        <span className="border border-accent bg-accent/20 px-3 py-2 text-sm font-medium">
          Frontend preview
        </span>
      </div>

      <div className="space-y-10 pt-8">
        <div
          role="status"
          className="flex flex-wrap items-center gap-x-3 gap-y-1 border border-accent bg-accent/20 px-4 py-3 text-sm"
        >
          <span className="font-semibold">Sample data only</span>
          <span className="text-muted-foreground">Live account data will be connected later.</span>
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
          <article className="card-soft flex min-h-52 flex-col justify-between p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Registered users</p>
                <p className="mt-3 font-display text-5xl text-primary" aria-live="polite">
                  {sampleUserCount.toLocaleString()}
                </p>
              </div>
              <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
                <Users className="size-5" />
              </span>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Sample profile count for frontend testing.
            </p>
          </article>

          <article className="flex min-h-52 flex-col justify-between bg-ink p-6 text-ink-foreground sm:p-8">
            <div>
              <p className="text-sm text-ink-foreground/70">Program format</p>
              <p className="mt-3 font-display text-4xl">16 sessions</p>
            </div>
            <Link
              to="/method"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              Review teaching method <ArrowRight className="size-4" />
            </Link>
          </article>
        </div>

        <section aria-labelledby="members-heading">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Accounts</span>
              <h2 id="members-heading" className="mt-2 text-2xl">
                Recent members
              </h2>
            </div>
            <span className="text-sm text-muted-foreground">Sample profiles</span>
          </div>
          <div className="overflow-hidden rounded-md border border-border">
            {sampleMembers.length ? (
              <ul className="divide-y divide-border">
                {sampleMembers.map((member) => (
                  <li
                    key={member.id}
                    className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 bg-card px-4 py-4 sm:px-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                        <Users className="size-4" />
                      </span>
                      <span className="truncate text-sm font-medium">
                        {member.full_name || "Name not provided"}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="size-4" />
                      {new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                        new Date(member.created_at),
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="bg-card px-5 py-8 text-sm text-muted-foreground">
                No member profiles yet.
              </p>
            )}
          </div>
        </section>

        <section aria-labelledby="programs-heading">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Published catalog</span>
              <h2 id="programs-heading" className="mt-2 text-2xl">
                Course tracks
              </h2>
            </div>
            <Link to="/prices" className="text-sm font-semibold text-primary hover:underline">
              View public pricing <ArrowRight className="ml-1 inline size-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {courses.map((course) => (
              <article key={course.name} className="card-soft p-5">
                <BookOpen className="size-5 text-primary" />
                <h3 className="mt-4 text-lg">{course.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {course.level} <span aria-hidden="true">&middot;</span> {course.ages}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                  <Clock3 className="size-3.5" /> 16 live sessions
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="site-links-heading" className="border-t border-border pt-7">
          <h2 id="site-links-heading" className="text-xl">
            Site pages
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <Link to="/contact" className="text-primary hover:underline">
              Demo request form
            </Link>
            <Link to="/method" className="text-primary hover:underline">
              Teaching method
            </Link>
            <Link to="/prices" className="text-primary hover:underline">
              Courses and pricing
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-xs text-muted-foreground">
            Demo form submissions are not currently saved to the admin workspace.
          </p>
        </section>
      </div>
    </section>
  );
}
