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
    component: ChessCoachingPage,
});

function ChessCoachingPage() {
    return (
        <main className="bg-[#f3f3ed] text-[#1d1d1a]">
            <section className="container-page py-12 lg:py-16">
                <div className="mb-8 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#5f5f50]">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#9bbf72]" />
                    Chess curriculum
                </div>

                <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
                    <div>
                        <h1 className="max-w-xl text-4xl font-black uppercase leading-[0.96] tracking-[-0.04em] text-[#1d1d1a] sm:text-5xl lg:text-[4rem]">
                            International chess coaching for kids 5–16.
                        </h1>

                        <p className="mt-5 max-w-lg text-base leading-relaxed text-[#4a4a42]">
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
                                className="btn-base inline-flex items-center gap-2 border border-[#1d1d1a]/20 bg-transparent text-[#1d1d1a] hover:bg-[#e8eadc]"
                            >
                                See all courses
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-[#a9b38d] bg-[#f0f2e9] p-5 shadow-[0_10px_30px_rgba(73,80,46,0.06)]">
                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                { label: "Tournament prep", icon: Trophy },
                                { label: "Mental focus", icon: Star },
                                { label: "Live classes", icon: Users },
                                { label: "Small groups", icon: BookOpen },
                            ].map(({ label, icon: Icon }) => (
                                <div
                                    key={label}
                                    className="flex items-center justify-between rounded-2xl border border-[#b5c39a] bg-[#eef3e3] px-3 py-3 text-left"
                                >
                                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4a4a42]">
                                        {label}
                                    </span>
                                    <span className="grid size-8 place-items-center rounded-full bg-[#dfe9c8] text-[#2f4d1e]">
                                        <Icon className="size-4" />
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 rounded-[22px] bg-[#2d2a1b] px-5 py-4 text-[#f9f7f0]">
                            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-[#dfe7c4]">
                                <span>16 sessions</span>
                                <span>Live coaching</span>
                            </div>
                            <div className="mt-3 flex items-center justify-between text-sm text-[#f2f0e5]/80">
                                <span>Structured learning</span>
                                <span>Parent updates</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container-page py-8 lg:py-14">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <h2 className="text-3xl font-black uppercase tracking-[-0.04em] text-[#1d1d1a] sm:text-4xl">
                        Five batches, one path.
                    </h2>
                </div>

                <p className="mb-8 text-base text-[#4a4a42]">
                    More you progress, the wider your chess vision becomes.
                </p>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                    {batches.map(({ name, detail, icon: Icon }) => (
                        <div
                            key={name}
                            className="rounded-[26px] border border-[#b4bd9a] bg-[#f2f4eb] p-5 text-center shadow-[0_6px_18px_rgba(96,103,72,0.04)]"
                        >
                            <div className="mx-auto grid size-12 place-items-center rounded-full bg-[#dfe7bf] text-[#2b4c24]">
                                <Icon className="size-5" />
                            </div>
                            <h3 className="mt-4 text-xl font-bold text-[#1d1d1a]">{name}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#5b5c51]">{detail}</p>
                            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5d6947]">
                                16 sessions
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container-page pb-16 pt-8 lg:pb-20">
                <div className="rounded-[30px] border border-[#cee0b2] bg-[#dfe9c6] p-7 lg:p-10">
                    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-[-0.04em] text-[#1d1d1a] sm:text-4xl">
                                Why families choose us.
                            </h2>

                            <ul className="mt-6 space-y-4 text-base text-[#303126]">
                                {reasons.map((reason) => (
                                    <li key={reason} className="flex items-start gap-3">
                                        <span className="mt-1 grid size-5 place-items-center rounded-full bg-[#98b66b] text-[10px] text-[#f5f7ef]">
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

                        <div className="rounded-[28px] border border-[#b9c89d] bg-[#f3f5ee] p-6 shadow-[0_10px_30px_rgba(80,87,61,0.08)]">
                            <div className="text-[32px] font-black leading-none tracking-[-0.04em] text-[#1d1d1a]">
                                100+
                            </div>
                            <p className="mt-2 text-sm text-[#4c4a45]">students helped through our chess batches</p>

                            <div className="mt-6 grid grid-cols-4 gap-3">
                                {[
                                    { label: "Focus", icon: Sparkles },
                                    { label: "Progress", icon: Trophy },
                                    { label: "Confidence", icon: Star },
                                    { label: "Results", icon: Medal },
                                ].map(({ label, icon: Icon }) => (
                                    <div
                                        key={label}
                                        className="flex flex-col items-center justify-center rounded-2xl border border-[#c6d3ab] bg-[#eef3e4] px-2 py-3 text-center"
                                    >
                                        <Icon className="size-6 text-[#2e5b2b]" />
                                        <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#4d5a3d]">
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
