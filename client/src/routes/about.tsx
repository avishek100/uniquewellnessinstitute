import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BriefcaseBusiness,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Trophy,
  Users,
  Video,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Unique Wellness Institute" },
      {
        name: "description",
        content:
          "Meet Unique Wellness Institute and explore chess coaching, career guidance, and student support.",
      },
    ],
  }),
  component: AboutPage,
});

const services = [
  {
    id: "chess",
    icon: Trophy,
    eyebrow: "Chess Mastery",
    title: "International Chess Coaching",
    description:
      "International coaching for kids aged 5–16 — beginner to advanced, with tournament preparation under FIDE-rated coaches.",
    action: "View courses",
    href: "/prices",
    badgeBg: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "hover:border-amber-500/40",
  },
  {
    id: "career",
    icon: BriefcaseBusiness,
    eyebrow: "Career Guidance",
    title: "Career & Mentorship",
    description:
      "Decades of cross-industry experience translated into practical mentorship, resume refinement, and interview prep.",
    action: "Learn more",
    href: "/career-guidance",
    badgeBg: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "hover:border-blue-500/40",
  },
];

const benefits = [
  {
    icon: Video,
    title: "HD Live Classes",
    description: "Stable, interactive low-latency video for every session with live coach interaction.",
    badgeBg: "from-indigo-500/20 to-violet-500/10",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    borderColor: "hover:border-indigo-500/40",
  },
  {
    icon: LockKeyhole,
    title: "Safe & Secure",
    description: "Dedicated learning environment with role-based access and privacy protection.",
    badgeBg: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "hover:border-emerald-500/40",
  },
  {
    icon: Trophy,
    title: "Tournament Prep",
    description: "Custom training plans, opening repertoires, and tactical calculation for competitions.",
    badgeBg: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "hover:border-amber-500/40",
  },
  {
    icon: Users,
    title: "Active Community",
    description: "Friendly peer games, doubt-solving sessions, and regular academy tournaments.",
    badgeBg: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "hover:border-blue-500/40",
  },
];

function AboutPage() {
  return (
    <>
      <section className="bg-ink text-ink-foreground py-16 lg:py-24">
        <div className="container-page">
          <span className="eyebrow text-primary">About Us</span>
          <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Built on experience, driven by passion.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-foreground/75">
            Unique Wellness Institute pairs international-standard chess coaching with holistic career mentorship, giving young minds and professionals the tools to thrive.
          </p>
        </div>
      </section>

      <section className="container-page py-16 lg:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">What we offer</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">Three pillars. One institute.</h2>
        </div>
        <div className="mt-10 grid gap-7 lg:grid-cols-2">
          {services.map(({ id, icon: Icon, eyebrow, title, description, action, href, badgeBg, iconColor, borderColor }) => (
            <article
              key={id}
              id={id}
              className={`group relative rounded-2xl border border-border/80 bg-card/95 p-6 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${borderColor}`}
            >
              <div className="relative grid size-14 place-items-center rounded-2xl bg-linear-to-br from-primary/15 to-primary/5 border border-border/60 shadow-xs transition-transform duration-300 group-hover:scale-110">
                <Icon className={`size-7 ${iconColor}`} strokeWidth={2.2} />
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <Link
                to={href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                {action} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16 lg:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="eyebrow">What makes us different</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">Support at every step.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description, badgeBg, iconColor, borderColor }) => (
              <article
                key={title}
                className={`group relative rounded-2xl border border-border/80 bg-card/95 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:bg-card hover:shadow-lg ${borderColor}`}
              >
                <div
                  className={`relative grid size-12 place-items-center rounded-2xl bg-linear-to-br ${badgeBg} border border-border/50 shadow-xs transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`size-6 ${iconColor}`} strokeWidth={2.2} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-14 text-primary-foreground sm:py-16">
        <div className="container-page">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold">Ready to take the next step?</h2>
              <p className="mt-3 text-primary-foreground/75">
                Book a free demo class or career consultation. No credit card required.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">
                Book Free Demo <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/auth"
                className="btn-base border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-5 border-t border-primary-foreground/20 pt-8 sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-primary-foreground border border-white/10">
                <Phone className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary-foreground/70 uppercase">Call or WhatsApp</p>
                <a href="tel:+919594373644" className="mt-0.5 block font-medium text-primary-foreground hover:underline">
                  +91 95943 73644
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-primary-foreground border border-white/10">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary-foreground/70 uppercase">Email Us</p>
                <a
                  href="mailto:info@uniquewellnessinstitute.com"
                  className="mt-0.5 block font-medium text-primary-foreground hover:underline"
                >
                  info@uniquewellnessinstitute.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-primary-foreground border border-white/10">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary-foreground/70 uppercase">Headquarters</p>
                <p className="mt-0.5 font-medium text-primary-foreground">Mumbai, India (Online worldwide)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
