import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-16 md:grid-cols-3">
        <div>
          <h3 className="text-xl">Unique Wellness Institute</h3>
          <p className="mt-3 max-w-sm text-sm text-ink-foreground/70">
            Professional online chess coaching for children aged 5–16, from first move to
            tournament-ready.
          </p>
        </div>

        <div>
          <h4 className="text-base">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-foreground/70">
            <li>
              <Link to="/method" className="hover:text-accent">
                Method
              </Link>
            </li>
            <li>
              <Link to="/prices" className="hover:text-accent">
                Prices
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-base">Our contacts</h4>
          <ul className="mt-3 space-y-3 text-sm text-ink-foreground/70">
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-accent" /> Mumbai, India
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-accent" />
              <a href="mailto:info@uniquewellnessinstitute.com" className="hover:text-accent">
                info@uniquewellnessinstitute.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="container-page py-6 text-xs text-ink-foreground/50">
          © {new Date().getFullYear()} Unique Wellness Institute. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
