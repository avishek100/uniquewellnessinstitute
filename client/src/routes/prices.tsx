import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  Compass,
  Crown,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Video,
} from "lucide-react";

const pricingCourses = [
  {
    tagline: "First steps",
    name: "Beginner",
    description: "A friendly introduction for children who are new to chess.",
    fee: "₹9,000 / $90",
    icon: Compass,
    badgeBg: "from-teal-500/20 to-emerald-500/10",
    iconColor: "text-teal-600 dark:text-teal-400",
    borderColor: "hover:border-teal-500/40",
    popular: false,
    features: ["Rules and piece movement", "Basic openings", "Essential tactics"],
  },
  {
    tagline: "Most Popular",
    name: "Intermediate",
    description: "For developing players who want stronger plans and practical results.",
    fee: "₹14,000 / $150",
    icon: Trophy,
    badgeBg: "from-amber-500/25 to-yellow-500/15",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-primary/50 shadow-md ring-1 ring-primary/20 hover:border-primary",
    popular: true,
    features: ["Middlegame planning", "Endgame technique", "Strategy and competitive play"],
  },
  {
    tagline: "Peak performance",
    name: "Advanced",
    description: "High-level guidance for ambitious tournament players.",
    fee: "₹16,000 / $210",
    icon: Crown,
    badgeBg: "from-purple-500/20 to-indigo-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
    borderColor: "hover:border-purple-500/40",
    popular: false,
    features: [
      "Advanced tournament strategy",
      "Competitive mindset",
      "International-coach mentorship",
    ],
  },
] as const;

const includedFeatures = [
  {
    title: "16 Live Sessions",
    description: "60-min interactive coaching per batch",
    icon: Video,
    badgeBg: "from-indigo-500/20 to-blue-500/10",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Small Groups",
    description: "Personal attention for every student",
    icon: Users,
    badgeBg: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Flexible Scheduling",
    description: "Batches across global timezones",
    icon: CalendarDays,
    badgeBg: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    title: "Satisfaction Guaranteed",
    description: "Free demo before committing",
    icon: ShieldCheck,
    badgeBg: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
];

export const Route = createFileRoute("/prices")({
  head: () => ({
    meta: [
      { title: "Chess Coaching Fees & Courses | Best Chess Coaching Institute Mumbai" },
      {
        name: "description",
        content:
          "Compare fees for structured online chess courses in Mumbai, from beginner to advanced. Explore 16-session batches and book a free demo at Unique Wellness Institute.",
      },
      {
        name: "keywords",
        content:
          "best chess coaching institute Mumbai, chess coaching fees India, chess course price Mumbai, online chess classes cost India, beginner chess course, tournament chess fees",
      },
      { property: "og:title", content: "Chess Coaching Fees & Courses | Unique Wellness Institute" },
      {
        property: "og:description",
        content:
          "Explore beginner, intermediate, and advanced chess coaching courses. Transparent fees at ₹9,000 / $90, ₹14,000 / $150, and ₹16,000 / $210.",
      },
      { property: "og:url", content: "https://uniquewellnessinstitute.com/prices" },
      { property: "og:image", content: "https://uniquewellnessinstitute.com/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://uniquewellnessinstitute.com/prices" }],
  }),
  component: PricesPage,
});

function PricesPage() {
  return (
    <>
      <section className="border-b border-border bg-sand/50">
        <div className="container-page py-16 lg:py-20">
          <span className="eyebrow">Courses &amp; prices</span>
          <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl">Chess courses for every level</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Choose a course that matches your experience, from first steps to tournament
            preparation.
          </p>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {pricingCourses.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`group relative flex flex-col rounded-2xl border bg-card/95 p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${plan.borderColor}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 flex items-center gap-1 rounded-full bg-linear-to-r from-amber-500 to-yellow-500 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    <Sparkles className="size-3" /> Most Popular
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="eyebrow">{plan.tagline}</span>
                  <div
                    className={`grid size-12 place-items-center rounded-2xl bg-linear-to-br ${plan.badgeBg} border border-border/50 shadow-xs transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`size-6 ${plan.iconColor}`} strokeWidth={2.2} />
                  </div>
                </div>

                <h2 className="mt-3 text-2xl font-bold tracking-tight">{plan.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{plan.description}</p>

                <div className="mt-6 border-y border-border/70 py-4">
                  <p className="font-display text-3xl font-bold text-primary">{plan.fee}</p>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">full 16-session course fee</p>
                </div>

                <ul className="mt-6 flex-1 space-y-3.5 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-2xs">
                        <Check className="size-3.5" strokeWidth={2.6} />
                      </span>
                      <span className="text-foreground/90 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`mt-8 ${plan.popular ? "btn-gold" : "btn-outline"} w-full justify-center`}
                >
                  Book Demo Class <ArrowRight className="size-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Included across all plans */}
        <div className="mt-16 rounded-3xl border border-border/80 bg-secondary/30 p-8 sm:p-10">
          <div className="max-w-2xl">
            <span className="eyebrow">Standard inclusions</span>
            <h3 className="mt-2 text-2xl font-bold">Every course includes</h3>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {includedFeatures.map(({ title, description, icon: Icon, badgeBg, iconColor }) => (
              <div
                key={title}
                className="group flex items-start gap-3.5 rounded-2xl border border-border/60 bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br ${badgeBg} border border-border/50 shadow-xs transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`size-5 ${iconColor}`} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          A free demo class is available before you enroll, so you can experience the coaching first-hand.
        </p>
      </section>
    </>
  );
}
