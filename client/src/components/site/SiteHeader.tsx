import { useAuthSession } from "@/lib/auth-session";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, Menu, Sparkles, User, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/chess-coaching", label: "Chess Coaching" },
  { to: "/career-guidance", label: "Career Guidance" },
  { to: "/prices", label: "Prices" },
  { to: "/founders", label: "Founder" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { data: user } = useAuthSession(location.pathname !== "/admin" && location.pathname !== "/auth");
  const userName = user?.fullName ?? null;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md transition-all">
      <div className="container-page flex h-20 items-center justify-between gap-4 py-3">
        <Link
          to="/"
          aria-label="Unique Wellness Institute home"
          className="group flex shrink-0 items-center gap-2 transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <img
            src="/logo.png"
            alt="Unique Wellness Institute"
            className="h-12 w-32 object-contain transition-all duration-300 group-hover:brightness-105"
          />
        </Link>

        {/* Desktop Navigation with Pill Hover & Active Indicator */}
        <nav className="hidden items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 p-1.5 shadow-2xs backdrop-blur-sm xl:flex">
          {nav.map((item) => (
            <Link
              key={`${item.to}:${item.label}`}
              to={item.to}
              {...("hash" in item ? { hash: item.hash } : {})}
              className="relative rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:scale-[1.02] active:scale-95"
              activeProps={{
                className: "bg-primary text-primary-foreground font-semibold shadow-xs hover:bg-primary hover:text-primary-foreground",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to={userName ? "/dashboard" : "/auth"}
            className="btn-outline group hidden sm:inline-flex px-4.5 py-2 text-sm"
          >
            <User className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
            <span>{userName ? userName.trim().split(/\s+/)[0] : "Sign in"}</span>
          </Link>
          <Link
            to="/contact"
            className="btn-gold group hidden sm:inline-flex px-5 py-2 text-sm shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12" />
            <span>Book Demo</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="btn-outline size-11 p-0 transition-transform active:scale-90 xl:hidden"
          >
            {open ? <X className="size-5 transition-transform duration-200 rotate-90" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {open && (
        <div className="border-t border-border/80 bg-card/95 backdrop-blur-lg xl:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="container-page flex flex-col gap-1.5 py-5">
            {nav.map((item) => (
              <Link
                key={`${item.to}:${item.label}`}
                to={item.to}
                {...("hash" in item ? { hash: item.hash } : {})}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-primary"
                activeProps={{
                  className: "bg-primary/10 text-primary font-bold",
                }}
              >
                <span>{item.label}</span>
                <ArrowRight className="size-4 opacity-50" />
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border/70 pt-4">
              <Link
                to={userName ? "/dashboard" : "/auth"}
                onClick={() => setOpen(false)}
                className="btn-outline w-full justify-center"
              >
                <User className="size-4" />
                {userName ? userName.trim().split(/\s+/)[0] : "Sign in / Create account"}
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-gold w-full justify-center"
              >
                <Sparkles className="size-4" />
                Book Demo Class
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
