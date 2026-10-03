import { createFileRoute, Link } from "@tanstack/react-router";
import chessImage from "@/assets/hero-chess.jpg";
import {
  ArrowRight,
  BookOpen,
  Check,
  Crown,
  Medal,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";

const batches = [
  {
    level: "01",
    name: "Beginner",
    detail: "Basics, rules, piece values, and confidence.",
    icon: BookOpen,
    badgeBg: "from-teal-500/20 to-emerald-500/10",
    iconColor: "text-teal-600 dark:text-teal-400",
    borderColor: "hover:border-teal-500/40",
  },
  {
    level: "02",
    name: "Adv. Beginner",
    detail: "Mating patterns, simple tactics, and opening principles.",
    icon: Sparkles,
    badgeBg: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "hover:border-blue-500/40",
  },
  {
    level: "03",
    name: "Intermediate",
    detail: "Positional play, calculation, and board control.",
    icon: Target,
    badgeBg: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    borderColor: "hover:border-cyan-500/40",
  },
  {
    level: "04",
    name: "Advanced 1",
    detail: "Tournament prep, deep endgames, and technique.",
    icon: Medal,
    badgeBg: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "hover:border-amber-500/40",
  },
  {
    level: "05",
    name: "Advanced 2",
    detail: "FIDE preparation, dynamic masteries, and peak mindset.",
    icon: Crown,
    badgeBg: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
    borderColor: "hover:border-purple-500/40",
  },
];

const reasons = [
  "International coach with proven competitive pedigree",
  "Structured 16-session curriculum with personal feedback",
  "Live tactical drills and real tournament readiness",
  "Safe, supportive, and engaging online batches for children",
];

export const Route = createFileRoute("/chess-coaching")({
  head: () => ({
    meta: [
      { title: "Best Chess Coaching Institute in Mumbai for Kids | Unique Wellness Institute" },
      {
        name: "description",
        content:
          "Find the best chess coaching institute in Mumbai for kids ages 5–16. Join live online classes, learn in small groups, and prepare for tournaments. Book a free demo.",
      },
      {
        name: "keywords",
        content:
          "best chess coaching institute Mumbai, top chess academy for kids, online chess coaching for children, live chess classes India, beginner chess lessons for kids, small group chess classes, chess tournament coaching, chess training for ages 5 to 16, free chess demo Mumbai",
      },
      {
        property: "og:title",
        content: "Best Chess Coaching Institute in Mumbai for Kids | Unique Wellness Institute",
      },
      {
        property: "og:description",
        content:
          "Live online chess classes for kids ages 5–16, small groups, and tournament preparation. Book a free demo class.",
      },
      { property: "og:url", content: "https://uniquewellnessinstitute.com/chess-coaching" },
      { property: "og:image", content: "https://uniquewellnessinstitute.com/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://uniquewellnessinstitute.com/chess-coaching" }],
  }),
  component: ChessCoachingPage,
});

function ChessCoachingPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="container-page pt-4 pb-12 lg:pt-4 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="eyebrow mb-8 flex items-center gap-2">
              <span className="inline-block size-2.5 rounded-full bg-accent" />
              Chess curriculum
            </div>
            <h1 className="max-w-xl text-4xl leading-tight sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Best chess coaching institute for kids ages 5–16.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              From first steps to tournament-ready play, our structured online chess program helps
              children build confidence, focus, and real competitive skills.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold inline-flex items-center gap-2">
                Book a demo
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/prices"
                className="btn-outline inline-flex items-center gap-2"
              >
                See all courses
              </Link>
            </div>
          </div>

          <div className="card-soft p-6">
            <img
              src={chessImage}
              alt="Chess pieces arranged on a board"
              className="mb-4 aspect-[3/2] w-full rounded-xl object-cover"
            />
            <div className="grid gap-3.5 sm:grid-cols-2">
              {[
                {
                  label: "Tournament Prep",
                  icon: Trophy,
                  badgeBg: "from-amber-500/20 to-yellow-500/10",
                  iconColor: "text-amber-600 dark:text-amber-400",
                },
                {
                  label: "Mental Focus",
                  icon: Star,
                  badgeBg: "from-purple-500/20 to-pink-500/10",
                  iconColor: "text-purple-600 dark:text-purple-400",
                },
                {
                  label: "Live Classes",
                  icon: Users,
                  badgeBg: "from-blue-500/20 to-indigo-500/10",
                  iconColor: "text-blue-600 dark:text-blue-400",
                },
                {
                  label: "Small Groups",
                  icon: BookOpen,
                  badgeBg: "from-emerald-500/20 to-teal-500/10",
                  iconColor: "text-emerald-600 dark:text-emerald-400",
                },
              ].map(({ label, icon: Icon, badgeBg, iconColor }) => (
                <div
                  key={label}
                  className="group flex items-center justify-between rounded-xl border border-border/80 bg-background/80 px-3.5 py-3 text-left transition-all duration-300 hover:border-primary/40 hover:shadow-xs"
                >
                  <span className="text-xs font-semibold text-foreground">
                    {label}
                  </span>
                  <span
                    className={`grid size-9 place-items-center rounded-xl bg-linear-to-br ${badgeBg} border border-border/50 shadow-2xs transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`size-4.5 ${iconColor}`} strokeWidth={2.2} />
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-primary p-5 text-primary-foreground shadow-md">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-primary-foreground/90">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4" /> 16 Sessions
                </span>
                <span>Live Coaching</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-primary-foreground/80 border-t border-primary-foreground/20 pt-3">
                <span>Structured Learning</span>
                <span>Parent Progress Reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10 lg:py-16">
        <div className="mb-4">
          <span className="eyebrow">Structured Pathway</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
            Five batches, one path to mastery.
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            As students progress through our levels, their tactical vision and strategic confidence grow exponentially.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {batches.map(({ level, name, detail, icon: Icon, badgeBg, iconColor, borderColor }) => (
            <div
              key={name}
              className={`group relative flex flex-col rounded-2xl border border-border/80 bg-card/95 p-5 text-center shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${borderColor}`}
            >
              <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                Level {level}
              </span>
              <div
                className={`mx-auto mt-3 grid size-12 place-items-center rounded-2xl bg-linear-to-br ${badgeBg} border border-border/50 shadow-xs transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className={`size-6 ${iconColor}`} strokeWidth={2.2} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary transition-colors">{name}</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
              <div className="mt-5 rounded-full bg-secondary/80 py-1 text-[11px] font-semibold text-primary">
                16 live sessions
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-16 pt-8 lg:pb-20">
        <div className="rounded-3xl border border-border/80 bg-secondary/30 p-7 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="eyebrow">Why Unique Wellness</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
                Why families choose us.
              </h2>

              <ul className="mt-6 space-y-3.5 text-base text-foreground">
                {reasons.map((reason) => (
                  <li key={reason} className="flex items-center gap-3">
                    <span className="grid size-5.5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-2xs">
                      <Check className="size-3.5" strokeWidth={2.6} />
                    </span>
                    <span className="text-sm sm:text-base font-medium text-foreground/90">{reason}</span>
                  </li>
                ))}
              </ul>

              <Link to="/contact" className="btn-gold mt-8 inline-flex items-center gap-2">
                Book a Demo Class
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
              <div className="font-display text-4xl font-bold text-primary">
                100+
              </div>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                students successfully trained across our international chess batches
              </p>

              <div className="mt-6 grid grid-cols-4 gap-3">
                {[
                  {
                    label: "Focus",
                    icon: Sparkles,
                    badgeBg: "from-purple-500/20 to-pink-500/10",
                    iconColor: "text-purple-600 dark:text-purple-400",
                  },
                  {
                    label: "Progress",
                    icon: Trophy,
                    badgeBg: "from-amber-500/20 to-yellow-500/10",
                    iconColor: "text-amber-600 dark:text-amber-400",
                  },
                  {
                    label: "Confidence",
                    icon: Star,
                    badgeBg: "from-blue-500/20 to-indigo-500/10",
                    iconColor: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    label: "Results",
                    icon: Medal,
                    badgeBg: "from-emerald-500/20 to-teal-500/10",
                    iconColor: "text-emerald-600 dark:text-emerald-400",
                  },
                ].map(({ label, icon: Icon, badgeBg, iconColor }) => (
                  <div
                    key={label}
                    className="group flex flex-col items-center justify-center rounded-xl border border-border/70 bg-background/80 px-2 py-3 text-center transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 shadow-2xs"
                  >
                    <div
                      className={`grid size-9 place-items-center rounded-lg bg-linear-to-br ${badgeBg} border border-border/50 shadow-2xs transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`size-4.5 ${iconColor}`} strokeWidth={2.2} />
                    </div>
                    <span className="mt-2 text-xs font-semibold text-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
