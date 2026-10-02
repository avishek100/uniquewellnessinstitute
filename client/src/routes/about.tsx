import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, LockKeyhole, Trophy, Users, Video } from "lucide-react";

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
            "For kids aged 5–16. Beginner to advanced batches with tournament preparation under International Coach Mr. Vivek Rane.",
        action: "View courses",
        href: "/prices",
    },
    {
        id: "career",
        icon: BriefcaseBusiness,
        eyebrow: "Career Guidance",
        title: "Career & International Employment",
        description:
            "Personalised career guidance, interview training, and recruiter-ready resumes, backed by global hospitality, sales, and recruitment experience.",
        action: "Learn more",
        href: "/contact",
    },
];

const benefits = [
    {
        icon: Video,
        title: "HD Live Classes",
        description: "Stable, low-latency video for every session.",
        badgeBg: "from-indigo-500/20 to-violet-500/10",
        iconColor: "text-indigo-600 dark:text-indigo-400",
        borderColor: "hover:border-indigo-500/40",
    },
    {
        icon: LockKeyhole,
        title: "Safe & Secure",
        description: "Role-based access and encrypted data.",
        badgeBg: "from-emerald-500/20 to-teal-500/10",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        borderColor: "hover:border-emerald-500/40",
    },
    {
        icon: Trophy,
        title: "Tournament Prep",
        description: "Custom plans for FIDE-rated events.",
        badgeBg: "from-amber-500/20 to-yellow-500/10",
        iconColor: "text-amber-600 dark:text-amber-400",
        borderColor: "hover:border-amber-500/40",
    },
    {
        icon: Users,
        title: "Active Community",
        description: "Doubt chat, study groups, and peer matches.",
        badgeBg: "from-blue-500/20 to-cyan-500/10",
        iconColor: "text-blue-600 dark:text-blue-400",
        borderColor: "hover:border-blue-500/40",
    },
];

function AboutPage() {
    return (
        <>
            <section className="bg-ink text-ink-foreground">
                <div className="container-page py-16 lg:py-20">
                    <span className="eyebrow text-primary">About Us</span>
                    <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl">
                        Built on experience, driven by passion.
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-foreground/75">
                        Unique Wellness Institute brings world-class chess coaching and career mentorship
                        together, backed by decades of cross-industry experience.
                    </p>
                </div>
            </section>

            <section className="container-page py-16 lg:py-20">
                <div className="max-w-2xl">
                    <span className="eyebrow">What we offer</span>
                    <h2 className="mt-4 text-3xl sm:text-4xl">Two specialties. One institute.</h2>
                    <p className="mt-4 text-muted-foreground">
                        Chess and career guidance, backed by experience and delivered with care.
                    </p>
                </div>
                <div className="mt-9 grid gap-6 lg:grid-cols-2">
                    {services.map(({ id, icon: Icon, eyebrow, title, description, action, href }) => (
                        <article
                            key={id}
                            id={id}
                            className="group relative rounded-2xl border border-border/80 bg-card/95 p-6 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl"
                        >
                            <div className="relative grid size-14 place-items-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-border/60 shadow-xs transition-transform duration-300 group-hover:scale-105">
                                <Icon className="size-7 text-primary" strokeWidth={2.2} />
                            </div>
                            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
                            <h3 className="mt-2 text-2xl font-bold tracking-tight">{title}</h3>
                            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                                {description}
                            </p>
                            {href.startsWith("http") ? (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                                >
                                    {action} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </a>
                            ) : (
                                <Link
                                    to={href}
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                                >
                                    {action} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            )}
                        </article>
                    ))}
                </div>
            </section>

            <section className="bg-secondary/40 py-16 lg:py-20">
                <div className="container-page">
                    <div className="max-w-2xl">
                        <span className="eyebrow">The experience</span>
                        <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">Support at every step.</h2>
                    </div>
                    <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                <div className="container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl">Ready to take the next step?</h2>
                        <p className="mt-3 text-primary-foreground/75">
                            Book a free demo class or a career consultation.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link to="/contact" className="btn-gold">
                            Book Free Demo
                        </Link>
                        <Link
                            to="/auth"
                            className="btn-base border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
