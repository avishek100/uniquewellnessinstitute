import { createFileRoute, Link } from "@tanstack/react-router";
import {
    ArrowRight,
    BookOpen,
    Check,
    Medal,
    Sparkles,
    Star,
    Trophy,
    Users,
} from "lucide-react";

const batches = [
    { name: "Beginner", detail: "Basics, rules, and confidence", icon: BookOpen },
    { name: "Advanced Beginner", detail: "Patterns, tactics, and strategy", icon: Sparkles },
    { name: "Intermediate", detail: "Planning, calculation, and control", icon: Trophy },
    { name: "Advanced 1", detail: "Tournament prep and deeper technique", icon: Medal },
    { name: "Advanced 2", detail: "Competition mindset and mastery", icon: Star },
];

const reasons = [
    "International coach with proven experience",
    "Structured lessons with personalized feedback",
    "Practical training for real tournament readiness",
    "Safe, engaging online learning for children",
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
            <section className="container-page py-12 lg:py-16">
                <div className="eyebrow mb-8 flex items-center gap-2">
                    <span className="inline-block size-2.5 rounded-full bg-accent" />
                    Chess curriculum
                </div>

                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <div>
                        <h1 className="max-w-xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
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

                    <div className="card-soft p-5">
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                { label: "Tournament prep", icon: Trophy },
                                { label: "Mental focus", icon: Star },
                                { label: "Live classes", icon: Users },
                                { label: "Small groups", icon: BookOpen },
                            ].map(({ label, icon: Icon }) => (
                                <div
                                    key={label}
                                    className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-3 text-left"
                                >
                                    <span className="text-xs font-semibold text-muted-foreground">
                                        {label}
                                    </span>
                                    <span className="grid size-8 place-items-center rounded-full bg-secondary text-primary">
                                        <Icon className="size-4" />
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 rounded-xl bg-primary px-5 py-4 text-primary-foreground">
                            <div className="flex items-center justify-between text-xs font-semibold uppercase text-primary-foreground/80">
                                <span>16 sessions</span>
                                <span>Live coaching</span>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-sm text-primary-foreground/80">
                                <span>Structured learning</span>
                                <span>Parent updates</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container-page py-8 lg:py-14">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <h2 className="text-3xl sm:text-4xl">
                        Five batches, one path.
                    </h2>
                </div>

                <p className="mb-8 text-base text-muted-foreground">
                    More you progress, the wider your chess vision becomes.
                </p>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                    {batches.map(({ name, detail, icon: Icon }) => (
                        <div
                            key={name}
                            className="card-soft p-5 text-center"
                        >
                            <div className="mx-auto grid size-12 place-items-center rounded-full bg-secondary text-primary">
                                <Icon className="size-5" />
                            </div>
                            <h3 className="mt-4 text-xl">{name}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                            <div className="mt-5 text-xs font-semibold text-primary">
                                16 sessions
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container-page pb-16 pt-8 lg:pb-20">
                <div className="card-soft bg-secondary/30 p-7 lg:p-10">
                    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl">
                                Why families choose us.
                            </h2>

                            <ul className="mt-6 space-y-4 text-base text-foreground">
                                {reasons.map((reason) => (
                                    <li key={reason} className="flex items-start gap-3">
                                        <span className="mt-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                            <Check className="size-3" />
                                        </span>
                                        <span>{reason}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/contact" className="btn-gold mt-7 inline-flex items-center gap-2">
                                Book a demo
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>

                        <div className="card-soft bg-card p-6">
                            <div className="font-display text-4xl font-semibold text-primary">
                                100+
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">students helped through our chess batches</p>

                            <div className="mt-6 grid grid-cols-4 gap-3">
                                {[
                                    { label: "Focus", icon: Sparkles },
                                    { label: "Progress", icon: Trophy },
                                    { label: "Confidence", icon: Star },
                                    { label: "Results", icon: Medal },
                                ].map(({ label, icon: Icon }) => (
                                    <div
                                        key={label}
                                        className="flex flex-col items-center justify-center rounded-xl border border-border bg-background px-2 py-3 text-center"
                                    >
                                        <Icon className="size-6 text-primary" />
                                        <span className="mt-2 text-xs font-semibold text-muted-foreground">
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
