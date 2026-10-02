import { createFileRoute, Link } from "@tanstack/react-router";
import {
    ArrowRight,
    BriefcaseBusiness,
    Building2,
    CheckCircle2,
    Compass,
    GraduationCap,
    Target,
} from "lucide-react";

export const Route = createFileRoute("/about")({
    head: () => ({
        meta: [
            { title: "Career Guidance & Mentorship — Unique Wellness Institute Mumbai" },
            {
                name: "description",
                content:
                    "Discover practical mentorship for students and professionals at Unique Wellness Institute, covering career guidance, resume support, and interview preparation.",
            },
            {
                name: "keywords",
                content:
                    "career guidance Mumbai, student mentorship, professional development, interview training, resume support, international career coaching",
            },
            { property: "og:title", content: "Career Guidance & Mentorship — Unique Wellness Institute Mumbai" },
            {
                property: "og:description",
                content:
                    "Practical mentorship for students and professionals, with personalized support for careers, interviews, and growth.",
            },
            { property: "og:url", content: "https://uniquewellnessinstitute.com/about" },
            { property: "og:image", content: "https://uniquewellnessinstitute.com/logo.png" },
        ],
        links: [{ rel: "canonical", href: "https://uniquewellnessinstitute.com/about" }],
    }),
    component: AboutPage,
});

const serviceCards = [
    { title: "Career guidance", description: "Find the right path suited to your strengths and aspirations.", icon: Compass },
    { title: "Interview training", description: "Build confidence, clarity, and effective communication.", icon: BriefcaseBusiness },
    { title: "Resume building", description: "Showcase your real strengths with professional modern formats.", icon: Target },
    { title: "Skill mapping", description: "Align your strengths with the competitive global job market.", icon: GraduationCap },
];

const processSteps = [
    {
        number: "01",
        title: "Discovery call",
        description: "Understand your goals, strengths, and immediate next steps.",
        icon: Compass,
    },
    {
        number: "02",
        title: "Plan",
        description: "Build a customized roadmap matching your career direction.",
        icon: Target,
    },
    {
        number: "03",
        title: "Execute",
        description: "Apply targeted coaching, mock interviews, and application support.",
        icon: Building2,
    },
    {
        number: "04",
        title: "Land",
        description: "Move forward with confidence and recruiter-ready positioning.",
        icon: CheckCircle2,
    },
];

const outcomePoints = [
    "Hospitality, sales, recruitment, and global opportunities.",
    "Career guidance tailored for both students and working professionals.",
    "Personalized career roadmaps and active job search support.",
    "Resume, portfolio, and interview preparation for measurable results.",
];

function AboutPage() {
    return (
        <div id="career" className="scroll-mt-24">
            <section className="border-b border-border bg-sand/50">
                <div className="container-page py-16 lg:py-20">
                    <span className="eyebrow">Career Guidance</span>
                    <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl">
                        Practical mentorship for students &amp; professionals
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
                        Enhance skills, industry exposure, and real-world confidence through guided
                        career planning, interview support, and practical direction.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link to="/contact" className="btn-gold">
                            Book a free session <ArrowRight className="size-4" />
                        </Link>
                        <Link to="/prices" className="btn-outline">
                            View course fees
                        </Link>
                    </div>
                </div>
            </section>

            <div className="container-page py-16 lg:py-20">
                <section>
                    <div className="max-w-2xl">
                        <span className="eyebrow">Key pillars</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl">What we help you achieve</h2>
                        <p className="mt-3 text-muted-foreground">
                            Personalized guidance mapped to individual career milestones.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {serviceCards.map(({ title, description, icon: Icon }) => (
                            <article key={title} className="card-soft flex flex-col p-6">
                                <div className="grid size-12 place-items-center rounded-2xl bg-secondary text-primary">
                                    <Icon className="size-6" />
                                </div>
                                <h3 className="mt-5 text-xl">{title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mt-20">
                    <div className="max-w-2xl">
                        <span className="eyebrow">Methodology</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl">A clear, four-step process</h2>
                        <p className="mt-3 text-muted-foreground">
                            Structured steps from discovery to career success.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {processSteps.map(({ number, title, description, icon: Icon }) => (
                            <article key={title} className="card-soft flex flex-col p-6">
                                <div className="flex items-center justify-between">
                                    <span className="font-display text-2xl font-bold text-primary">{number}</span>
                                    <Icon className="size-5 text-accent" />
                                </div>
                                <h3 className="mt-4 text-xl">{title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mt-20 card-soft p-8 sm:p-10 lg:p-12 bg-secondary/30">
                    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                        <div>
                            <span className="eyebrow">Results</span>
                            <h2 className="mt-3 text-3xl sm:text-4xl">Outcomes, not just advice</h2>

                            <ul className="mt-6 space-y-4 text-sm sm:text-base">
                                {outcomePoints.map((point) => (
                                    <li key={point} className="flex items-start gap-3">
                                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                                            <CheckCircle2 className="size-4" />
                                        </span>
                                        <span className="text-foreground/90">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="card-soft p-6 sm:p-8 bg-card">
                            <div className="grid size-14 place-items-center rounded-2xl bg-secondary text-primary">
                                <BriefcaseBusiness className="size-7" />
                            </div>
                            <div className="mt-6 font-display text-4xl font-bold text-foreground">
                                20+ YEARS
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Cross-sector leadership and mentoring experience in hospitality, sales,
                                recruitment, and corporate growth.
                            </p>
                            <Link to="/contact" className="btn-gold mt-6 inline-flex items-center gap-2">
                                Book a free session
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
