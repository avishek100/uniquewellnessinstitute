import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-card/60 text-foreground backdrop-blur-sm">
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[2fr_1fr_1fr] lg:gap-12 lg:py-16">
        <div>
          <Link
            to="/"
            aria-label="Unique Wellness Institute home"
            className="inline-flex transition-transform hover:scale-105 active:scale-95"
          >
            <img
              src="/logo.png"
              alt="Unique Wellness Institute"
              className="h-12 w-32 object-contain object-left"
            />
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Premium institute for chess coaching, career counseling, and wellness — built on decades of international experience.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {[
              { to: "/chess-coaching", label: "Chess Coaching" },
              { to: "/career-guidance", label: "Career Guidance" },
              { to: "/prices", label: "Courses & Fees" },
              { to: "/founders", label: "Meet the Founder" },
              { to: "/about", label: "About Institute" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="group inline-flex items-center gap-1.5 transition-all duration-200 hover:text-primary hover:translate-x-1"
                >
                  <ArrowRight className="size-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-primary" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Contact &amp; Connect</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href="tel:+919820067940"
                className="group flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Phone className="size-4 text-primary transition-transform group-hover:scale-110" />
                <span>+91 98200 67940</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:info@uniquewellnessinstitute.com"
                className="group flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Mail className="size-4 text-primary transition-transform group-hover:scale-110" />
                <span>info@uniquewellnessinstitute.com</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-primary shrink-0" />
              <span>Mumbai, India (Online worldwide)</span>
            </li>
            <li className="pt-2">
              <Link
                to="/contact"
                className="btn-gold inline-flex px-4 py-1.5 text-xs shadow-xs"
              >
                Book Free Demo
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 bg-background/50">
        <div className="container-page py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Unique Wellness Institute. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
