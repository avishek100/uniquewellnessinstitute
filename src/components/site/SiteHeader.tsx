import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/method", label: "Method" },
  { to: "/prices", label: "Prices" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="" className="size-18 shrink-0 object-contain" />
          <span className="leading-tight">
            <span className="block font-display text-base text-foreground">
              Unique Wellness Institute
            </span>
            <span className="block text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase">
              Online chess academy
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/auth" className="btn-outline hidden md:inline-flex">
            Log in
          </Link>
          <Link to="/contact" className="btn-gold hidden md:inline-flex">
            Book a free trial
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="btn-outline size-11 p-0 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Admin
            </Link>
            <Link to="/auth" onClick={() => setOpen(false)} className="btn-outline mt-2">
              Log in / Sign up
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-2">
              Book a free trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
