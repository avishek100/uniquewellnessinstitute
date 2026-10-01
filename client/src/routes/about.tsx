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
            { title: "Career Guidance — Unique Wellness Institute Mumbai" },
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
            { property: "og:title", content: "Career Guidance — Unique Wellness Institute Mumbai" },
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
    { title: "Career guidance", description: "Find the right path", icon: Compass },
    { title: "Interview training", description: "Build confidence and clarity", icon: BriefcaseBusiness },
    { title: "Resume building", description: "Showcase your strengths", icon: Target },
    { title: "Skill mapping", description: "Align your strengths with the market", icon: GraduationCap },
];

const processSteps = [
    {
        number: "01",
        title: "Discovery call",
        description: "Understand your goals, strengths, and next steps.",
        icon: Compass,
    },
    {
        number: "02",
        title: "Plan",
        description: "Build a roadmap matching your career direction and strengths.",
        icon: Target,
    },
    {
        number: "03",
        title: "Execute",
        description: "Use targeted coaching, interview prep, and application support.",
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
    "Career guidance for students and professionals.",
    "Personalized career roadmap and job search support.",
    "Resume, portfolio, and interview preparation for better outcomes.",
];

function AboutPage() {
    return (
        <div className="bg-[#f5f1ea] text-[#1f2937]">
            <main className="container-page py-8 lg:py-12">
                <section className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-xl">
                        <span className="inline-flex items-center rounded-full border border-[#d3d5c5] bg-[#eef4e0] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1e3a2b]">
                            Career guidance
                        </span>
                        <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-[#111827] sm:text-5xl lg:text-[4rem]">
                            Practical mentorship for students &amp; professionals.
                        </h1>
                        <p className="mt-5 max-w-lg text-base leading-relaxed text-[#4b5563] sm:text-lg">
                            Enhances skill, industry exposure, and real-world confidence through guided
                            career planning, interview support, and practical direction.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/contact" className="btn-gold">
                                Book a free session
                            </Link>
                            <Link to="/about" className="btn-outline">
                                Most in demand
                            </Link>
                        </div>
                    </div>

                    <div className="w-full max-w-[560px] rounded-[30px] border border-[#d8d9d3] bg-[#dfe7c8]/80 p-4 shadow-sm sm:p-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {serviceCards.map(({ title, description, icon: Icon }) => (
                                <article
                                    key={title}
                                    className="flex min-h-[120px] flex-col items-start justify-between rounded-[22px] border border-[#d7d8cf] bg-[#edf2df] p-4 text-left"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f3eb] text-[#3a5a2c]">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h2 className="mt-4 text-base font-semibold text-[#1f2937]">{title}</h2>
                                        <p className="mt-1 text-xs leading-relaxed text-[#4b5563]">
                                            {description}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mt-20">
                    <h2 className="text-3xl font-black uppercase tracking-[-0.05em] text-[#111827] sm:text-4xl">
                        A clear, four-step process.
                    </h2>

                    <div className="mt-8 grid gap-4 md:grid-cols-4">
                        {processSteps.map(({ number, title, description, icon: Icon }) => (
                            <article
                                key={title}
                                className="rounded-[22px] border border-[#d5d7ca] bg-[#f7f5f0] p-5 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-[#1f2937]">{number}</span>
                                    <Icon className="h-4 w-4 text-[#3a5a2c]" />
                                </div>
                                <h3 className="mt-4 text-xl font-semibold text-[#1f2937]">{title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#4b5563]">{description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mt-20 rounded-[30px] bg-[#e9ebd8] p-6 sm:p-8 lg:p-12">
                    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-[-0.05em] text-[#111827] sm:text-4xl">
                                Outcomes, not just advice.
                            </h2>

                            <ul className="mt-6 space-y-4 text-base text-[#334155]">
                                {outcomePoints.map((point) => (
                                    <li key={point} className="flex items-start gap-3">
                                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#dfe7c8] text-[#1f2937]">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-[28px] border border-[#d7d9d0] bg-[#f7f4ef] p-6 shadow-sm sm:p-8">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf2df] text-[#3a5a2c]">
                                <BriefcaseBusiness className="h-7 w-7" />
                            </div>
                            <div className="mt-6 text-4xl font-black leading-none tracking-[-0.05em] text-[#111827]">
                                20+ YEARS
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                                Of cross-sector experience in hospitality, sales, recruitment, and growth-led
                                mentoring.
                            </p>
                            <Link to="/contact" className="btn-gold mt-6 inline-flex items-center gap-2">
                                Book a free session
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
