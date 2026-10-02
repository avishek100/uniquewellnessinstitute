import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessagesSquare } from "lucide-react";

import { ApplicationForm } from "@/components/site/ApplicationForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Free Chess Demo Class | Best Chess Coaching Institute Mumbai" },
      {
        name: "description",
        content:
          "Book a free live chess demo with Unique Wellness Institute, a chess coaching institute in Mumbai for kids ages 5–16. Call +91 95943 73644.",
      },
      {
        name: "keywords",
        content:
          "best chess coaching institute Mumbai, free chess demo class, book chess trial India, contact chess academy Mumbai, chess classes phone number Mumbai",
      },
      { property: "og:title", content: "Free Chess Demo Class | Unique Wellness Institute Mumbai" },
      {
        property: "og:description",
        content:
          "Book a free trial chess lesson or ask a question. Based in Mumbai, teaching students worldwide online.",
      },
      { property: "og:url", content: "https://uniquewellnessinstitute.com/contact" },
      { property: "og:image", content: "https://uniquewellnessinstitute.com/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://uniquewellnessinstitute.com/contact" }],
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
