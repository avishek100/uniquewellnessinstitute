import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import onlineLesson from "@/assets/online-lesson.png";

export const Route = createFileRoute("/method")({
  head: () => ({
    meta: [
      { title: "Our Method — Unique Wellness Institute" },
      {
        name: "description",
        content:
          "How we teach: 16 live interactive sessions per course, small groups, personalised feedback, progress tracking and tournament preparation.",
      },
      { property: "og:title", content: "Our Method — Unique Wellness Institute" },
      {
        property: "og:description",
        content:
          "16 live interactive sessions per course, small groups, personalised feedback and focused tournament preparation.",
      },
    ],
  }),
  component: MethodPage,
});

const stages = [
  {
    step: "01",
    title: "Beginner foundations",
    text: "Rules, piece values, basic checkmates and board awareness. Students learn to play complete games with confidence.",
  },
  {
    step: "02",
    title: "Tactics and calculation",
    text: "Pins, forks, skewers, discovered attacks and combinations, trained through puzzles and guided calculation practice.",
  },
  {
    step: "03",
    title: "Strategy and openings",
    text: "Opening principles, pawn structures, piece coordination and planning in typical middlegame positions.",
  },
  {
    step: "04",
    title: "Tournament readiness",
    text: "Endgame technique, clock management, opening preparation and practice games aimed at competitive and FIDE-rated events.",
  },
];

function MethodPage() {
  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="container-page py-16 lg:py-20">
          <span className="eyebrow">Method</span>
          <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Structured training, session by session
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Every course is 16 live, interactive sessions in English, taught in small groups with
            personal attention and progress tracking after each stage.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <ol className="space-y-5">
          {stages.map((stage) => (
            <li key={stage.step} className="card-soft flex gap-5 p-6">
              <span className="font-display text-2xl text-accent">{stage.step}</span>
              <div>
                <h2 className="text-xl">{stage.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="space-y-6">
          <img
            src={onlineLesson}
            alt="Live online chess lesson"
            width={1200}
            height={912}
            loading="lazy"
            className="h-64 w-full rounded-2xl object-cover shadow-card"
          />
          <div className="card-soft p-6">
            <h2 className="text-xl">What every student gets</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Live interactive classes conducted online in English",
                "Small groups with personal attention from the coach",
                "Personalised feedback and progress tracking",
                "Homework tasks, puzzles and practice games",
                "Preparation for competitive and FIDE-rated tournaments",
              ].map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-primary mt-6 w-full">
              Book a demo class
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
