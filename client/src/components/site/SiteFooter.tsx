import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-background text-foreground">
      <div className="grid gap-10 px-6 py-12 sm:px-9 lg:grid-cols-[2fr_1fr_1fr] lg:gap-12 lg:py-16">
        <div>
          <Link to="/" aria-label="Unique Wellness Institute home" className="inline-flex">
            <img
              src="/logo.png"
              alt="Unique Wellness Institute"
              className="h-12 w-32 object-contain object-left"
            />
          </Link>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
            Premium institute for chess coaching, career counseling, and wellness — built on decades
            of international experience.
          </p>
        </div>

        <div>
          <h2 className="text-base">Services</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/prices" className="hover:text-primary">
                Chess Coaching
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Career Counseling
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Wellness Plans
              </Link>
            </li>
            <li>
              <Link to="/" hash="about" className="hover:text-primary">
                Founder
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="tel:+919594373644" className="hover:text-primary">
                +91 95943 73644
              </a>
            </li>
            <li>
              <a href="mailto:info@uniquewellnessinstitute.com" className="hover:text-primary">
                info@uniquewellnessinstitute.com
              </a>
            </li>
            <li>Mumbai, India</li>
            <li>
              <Link to="/auth" className="hover:text-primary">
                Sign in
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Book Demo
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="px-6 py-7 text-center text-xs text-muted-foreground sm:px-9">
          © {new Date().getFullYear()} Unique Wellness Institute. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
