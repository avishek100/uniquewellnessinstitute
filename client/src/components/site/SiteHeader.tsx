import { useAuthSession } from "@/lib/auth-session";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { to: "/prices", label: "Chess Coaching" },
  { to: "/about", hash: "career", label: "Career Guidance" },
  { to: "/founders", label: "Founder" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { data: user } = useAuthSession(location.pathname !== "/admin" && location.pathname !== "/auth");
  const userName = user?.fullName ?? null;

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-4 py-3">
        <Link to="/" aria-label="Unique Wellness Institute home" className="flex shrink-0">
          <img
            src="/logo.png"
            alt="Unique Wellness Institute"
            width={128}
            height={48}
            decoding="async"
            className="h-12 w-32 object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={`${item.to}:${item.label}`}
              to={item.to}
              {...("hash" in item ? { hash: item.hash } : {})}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to={userName ? "/dashboard" : "/auth"} className="btn-outline hidden sm:inline-flex">
            {userName ? userName.trim().split(/\s+/)[0] : "Sign in"}
          </Link>
          <Link to="/contact" className="btn-gold hidden sm:inline-flex">
            Book Demo
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
            onClick={() => setOpen((v) => !v)}
            className="btn-outline size-11 p-0 xl:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav-menu" className="border-t border-border bg-card xl:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={`${item.to}:${item.label}`}
                to={item.to}
                {...("hash" in item ? { hash: item.hash } : {})}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={userName ? "/dashboard" : "/auth"}
              onClick={() => setOpen(false)}
              className="btn-outline mt-2"
            >
              {userName ? userName.trim().split(/\s+/)[0] : "Sign in / Create account"}
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-2">
              Book Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
