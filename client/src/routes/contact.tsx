import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessagesSquare } from "lucide-react";

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

function ContactPage() {
  return (
    <section className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_1.05fr] lg:py-20">
      <div>
        <span className="eyebrow">Contact</span>
        <h1 className="mt-4 text-4xl sm:text-5xl">Book a free trial lesson</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Leave your details and our specialist will contact you to arrange a demo class at a time
          that suits your family.
        </p>

        <ul className="mt-10 space-y-5 text-sm">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 size-5 text-primary" />
            <span>
              <span className="block font-medium text-foreground">Location</span>
              <span className="text-muted-foreground">Mumbai, India — classes online worldwide</span>
            </span>
          </li>
          <li className="flex gap-3">
            <Mail className="mt-0.5 size-5 text-primary" />
            <span>
              <span className="block font-medium text-foreground">Email</span>
              <a
                href="mailto:info@uniquewellnessinstitute.com"
                className="text-muted-foreground hover:text-primary"
              >
                info@uniquewellnessinstitute.com
              </a>
            </span>
          </li>
          <li className="flex gap-3">
            <MessagesSquare className="mt-0.5 size-5 text-primary" />
            <span>
              <span className="block font-medium text-foreground">Language of instruction</span>
              <span className="text-muted-foreground">English, live and interactive</span>
            </span>
          </li>
        </ul>
      </div>

      <ApplicationForm />
    </section>
  );
}
