import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { chessCourses } from "@/lib/chess-courses";

export const Route = createFileRoute("/prices")({
  head: () => ({
    meta: [
      { title: "Chess Coaching Fees & Course Plans (INR) — Unique Wellness Institute Mumbai" },
      {
        name: "description",
        content:
          "Affordable and structured online chess courses in India. Beginner to tournament level chess batches with transparent fees starting from ₹5,500. Book a demo class.",
      },
      {
        name: "keywords",
        content:
          "chess coaching fees India, chess course price Mumbai, online chess classes cost India, beginner chess course, tournament chess training fees",
      },
      { property: "og:title", content: "Chess Coaching Fees & Course Plans (INR) — Unique Wellness Institute" },
      {
        property: "og:description",
        content:
          "Explore beginner, intermediate, and advanced chess coaching courses. Transparent fees starting from ₹5,500.",
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

      <section className="container-page py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {chessCourses.map((plan) => (
            <div key={plan.name} className="card-soft flex flex-col p-7">
              <span className="eyebrow">{plan.tagline}</span>
              <h2 className="text-2xl">{plan.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <p className="mt-5 font-display text-2xl text-primary">{plan.fee}</p>
              <p className="text-xs text-muted-foreground">course fee</p>
              <ul className="mt-5 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-outline mt-7">
                Ask about this course
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
