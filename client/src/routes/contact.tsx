import { createFileRoute } from "@tanstack/react-router";
import { Clock, Globe2, Mail, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";

import { ApplicationForm } from "@/components/site/ApplicationForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Free Trial — Unique Wellness Institute" },
      {
        name: "description",
        content:
          "Book a free trial chess lesson or ask a question. Unique Wellness Institute, Mumbai, India — info@uniquewellnessinstitute.com.",
      },
      { property: "og:title", content: "Contact & Free Trial — Unique Wellness Institute" },
      {
        property: "og:description",
        content:
          "Book a free trial chess lesson or ask a question. Based in Mumbai, teaching students worldwide online.",
      },
    ],
  }),
  component: ContactPage,
});

const contactMethods = [
  {
    label: "Academy Headquarters",
    value: "Mumbai, India",
    subtext: "Live classes conducted online worldwide across all timezones",
    icon: MapPin,
    badgeBg: "from-teal-500/20 to-emerald-500/10",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  {
    label: "Direct Email",
    value: "info@uniquewellnessinstitute.com",
    href: "mailto:info@uniquewellnessinstitute.com",
    subtext: "Response within 24 hours guaranteed",
    icon: Mail,
    badgeBg: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Phone & WhatsApp",
    value: "+91 95943 73644",
    href: "tel:+919594373644",
    subtext: "Mon – Sat, 9:00 AM – 8:00 PM IST",
    icon: Phone,
    badgeBg: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    label: "Medium of Instruction",
    value: "English (Live & Interactive)",
    subtext: "Clear, engaging communication tailored for children",
    icon: Globe2,
    badgeBg: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
];

function ContactPage() {
  return (
    <section className="container-page grid gap-12 pt-4 pb-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-4 lg:pb-20">
      <div>
        <span className="eyebrow">Get in Touch</span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">Book a free trial lesson</h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          Leave your details and our coaching specialist will contact you to schedule an interactive demo class at a time that works best for your family.
        </p>

        <div className="mt-8 space-y-4">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.label}
                className="group flex items-start gap-4 rounded-2xl border border-border/80 bg-card/95 p-4 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div
                  className={`grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br ${method.badgeBg} border border-border/50 shadow-2xs transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`size-5 ${method.iconColor}`} strokeWidth={2.2} />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {method.label}
                  </span>
                  {method.href ? (
                    <a
                      href={method.href}
                      className="mt-0.5 block font-medium text-foreground hover:text-primary transition-colors text-base"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 font-medium text-foreground text-base">{method.value}</p>
                  )}
                  <p className="mt-0.5 text-xs text-muted-foreground">{method.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center gap-6 rounded-2xl border border-border/60 bg-secondary/30 p-4 text-xs font-medium text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="size-4 text-primary" /> Fast 24h Response
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-primary" /> 100% Free Demo
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="size-4 text-primary" /> No Card Needed
          </div>
        </div>
      </div>

      <div>
        <ApplicationForm />
      </div>
    </section>
  );
}
