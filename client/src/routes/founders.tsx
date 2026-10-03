import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Building2, Crown, Sparkles, Star } from "lucide-react";

import mrunalKore from "@/assets/murnalkore.png";

export const Route = createFileRoute("/founders")({
  head: () => ({
    meta: [
      { title: "Founder — Unique Wellness Institute" },
      {
        name: "description",
        content:
          "Meet Mrunal Kore, Founder of Unique Wellness Institute, and learn about her experience across hospitality, sales, and training.",
      },
    ],
  }),
  component: FounderPage,
});

const milestones = [
  {
    title: "Royal F&B Service",
    description: "Three times at Saudi King's palace annual summit, serving global dignitaries and heads of state.",
    icon: Crown,
    badgeBg: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "hover:border-amber-500/40",
  },
  {
    title: "JPMorgan Chase",
    description: "Top-ranked performer as a CSA, recognized for sales leadership and customer service excellence.",
    icon: Award,
    badgeBg: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "hover:border-blue-500/40",
  },
  {
    title: "Institute Founder",
    description: "Built Unique Wellness Institute into an international coaching academy and mentorship center.",
    icon: Building2,
    badgeBg: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "hover:border-emerald-500/40",
  },
];

function FounderPage() {
  return (
    <>
      <section className="container-page grid gap-8 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14 lg:py-8">
        <figure className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-3 shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={mrunalKore}
              alt="Mrunal Kore, Founder of Unique Wellness Institute"
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <figcaption className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-xl font-bold text-foreground">Mrunal Kore</p>
                <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                  Founder · Unique Wellness Institute
                </p>
              </div>
              <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary">
                <Star className="size-4.5 fill-current" />
              </span>
            </div>
          </figcaption>
        </figure>

        <div>
          <span className="eyebrow">Leadership</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">Meet the Founder</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Mrunal Kore · Founder &amp; Managing Director, Unique Wellness Institute
          </p>

          <span className="eyebrow">About the Journey</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Passion for mentorship, grounded in global experience.
          </h2>

          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              My name is Mrunal Kore. Throughout my professional career, I have gained comprehensive experience across multiple high-performance fields — including promotions, Food &amp; Beverage, Sales, Marketing, Customer Experience, and Corporate Training.
            </p>
            <p>
              To complete my hospitality education, I joined JPMorgan Chase as a Customer Service Associate. Driven by dedication, I became the top seller in sales while maintaining the highest customer service ratings.
            </p>
            <p>
              I had the privilege of being part of the F&amp;B service at the Saudi King&apos;s Palace on three occasions during high-profile annual summits hosting global heads of state and presidents.
            </p>
            <p>
              What started as a small, focused training center has grown into Unique Wellness Institute — a trusted destination for international chess coaching for children and career guidance for ambitious individuals.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {milestones.map(({ title, description, icon: Icon, badgeBg, iconColor, borderColor }) => (
              <article
                key={title}
                className={`group relative flex flex-col rounded-2xl border border-border/80 bg-card/95 p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${borderColor}`}
              >
                <div
                  className={`grid size-11 place-items-center rounded-xl bg-linear-to-br ${badgeBg} border border-border/50 shadow-xs transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`size-5 ${iconColor}`} strokeWidth={2.2} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/career-guidance" className="btn-outline">
              Career Guidance
            </Link>
            <Link to="/contact" className="btn-gold">
              Book a Demo <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
