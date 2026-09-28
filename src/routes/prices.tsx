import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/prices")({
  head: () => ({
    meta: [
      { title: "Courses & Prices — Unique Wellness Institute" },
      {
        name: "description",
        content:
          "Course options at Unique Wellness Institute: beginner, intermediate and tournament tracks, each 16 live online sessions. Request current fees.",
      },
      { property: "og:title", content: "Courses & Prices — Unique Wellness Institute" },
      {
        property: "og:description",
        content:
          "Beginner, intermediate and tournament chess tracks of 16 live online sessions each. Request the current fee list.",
      },
    ],
  }),
  component: PricesPage,
});

const plans = [
  {
    name: "First Moves",
    level: "Beginner · ages 5–8",
    features: [
      "16 live group sessions",
      "Rules, basic checkmates, board awareness",
      "Weekly puzzle homework",
      "Progress report at the end of the course",
    ],
  },
  {
    name: "Tactics Track",
    level: "Intermediate · ages 8–14",
    featured: true,
    features: [
      "16 live group sessions",
      "Tactics, calculation and opening principles",
      "Practice games with coach review",
      "Personalised feedback after each stage",
    ],
  },
  {
    name: "Tournament Ready",
    level: "Advanced · ages 10–16",
    features: [
      "16 live sessions, small group or one-to-one",
      "Endgames, clock management, opening prep",
      "Targeted preparation for FIDE-rated events",
      "Game analysis between sessions",
    ],
  },
];

function PricesPage() {
  return (
    <>
      <section className="border-b border-border bg-sand/50">
        <div className="container-page py-16 lg:py-20">
          <span className="eyebrow">Courses &amp; prices</span>
          <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl">Choose the right starting point</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Every track runs as 16 structured live sessions. Fees depend on group size and schedule —
            request the current price list and we will send it with a free trial invitation.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card-soft flex flex-col p-7 ${
                plan.featured ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.featured && (
                <span className="mb-3 self-start rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  Most popular
                </span>
              )}
              <h2 className="text-2xl">{plan.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{plan.level}</p>
              <p className="mt-5 font-display text-xl text-primary">16 live sessions</p>
              <ul className="mt-5 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className={plan.featured ? "btn-primary mt-7" : "btn-outline mt-7"}>
                Request fees
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          A demo class is available before you enrol, so you can experience the teaching approach
          first.
        </p>
      </section>
    </>
  );
}
