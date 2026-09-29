import { createFileRoute, Link } from "@tanstack/react-router";
import { BriefcaseBusiness, LockKeyhole, Trophy, Users, Video } from "lucide-react";

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
    },
    {
        icon: LockKeyhole,
        title: "Safe & Secure",
        description: "Role-based access and encrypted data.",
    },
    {
        icon: Trophy,
        title: "Tournament Prep",
        description: "Custom plans for FIDE-rated events.",
    },
    {
        icon: Users,
        title: "Active Community",
        description: "Doubt chat, study groups, and peer matches.",
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
                <div className="mt-9 grid gap-5 lg:grid-cols-2">
                    {services.map(({ id, icon: Icon, eyebrow, title, description, action, href }) => (
                        <article key={id} id={id} className="card-soft flex scroll-mt-28 flex-col p-6 sm:p-7">
                            <Icon className="size-6 text-primary" />
                            <p className="mt-5 text-xs font-semibold uppercase text-primary">{eyebrow}</p>
                            <h3 className="mt-2 text-2xl">{title}</h3>
                            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                                {description}
                            </p>
                            {href.startsWith("http") ? (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                                >
                                    {action}
                                </a>
                            ) : (
                                <Link
                                    to={href}
                                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                                >
                                    {action}
                                </Link>
                            )}
                        </article>
                    ))}
                </div>
            </section>

            <section className="bg-secondary/50 py-16 lg:py-20">
                <div className="container-page">
                    <div className="max-w-2xl">
                        <span className="eyebrow">The experience</span>
                        <h2 className="mt-4 text-3xl sm:text-4xl">Support at every step.</h2>
                    </div>
                    <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {benefits.map(({ icon: Icon, title, description }) => (
                            <article key={title} className="card-soft p-6">
                                <Icon className="size-6 text-primary" />
                                <h3 className="mt-4 text-lg">{title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
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
