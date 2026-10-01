import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useLocation,
  useRouter,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { FloatingChatWidget } from "../components/site/FloatingChatWidget";
import { SiteFooter } from "../components/site/SiteFooter";
import { SiteHeader } from "../components/site/SiteHeader";
import { Toaster } from "../components/ui/sonner";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-outline">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Unique Wellness Institute — Chess Academy & Career Guidance Mumbai, India" },
      {
        name: "description",
        content:
          "Premier chess academy and career guidance institute based in Mumbai, India. International coach-led online chess training for kids and teenagers worldwide. Book a free demo class.",
      },
      {
        name: "keywords",
        content:
          "chess coaching India, online chess classes Mumbai, chess academy India, best chess coach Mumbai, international chess coaching, kids chess classes India, career counseling Mumbai, career guidance India, Unique Wellness Institute",
      },
      { name: "geo.region", content: "IN-MH" },
      { name: "geo.placename", content: "Mumbai" },
      { name: "geo.position", content: "19.0760;72.8777" },
      { name: "ICBM", content: "19.0760, 72.8777" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Unique Wellness Institute" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: "Unique Wellness Institute — Chess Academy & Career Guidance Mumbai, India" },
      {
        property: "og:description",
        content:
          "Premier chess academy and career guidance institute based in Mumbai, India. International coach-led online chess training for kids and teenagers worldwide.",
      },
      { property: "og:image", content: "https://uniquewellnessinstitute.com/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Unique Wellness Institute — Chess Academy & Career Guidance Mumbai, India" },
      {
        name: "twitter:description",
        content:
          "Premier chess academy and career guidance institute based in Mumbai, India. Online chess lessons and career counseling.",
      },
      { name: "twitter:image", content: "https://uniquewellnessinstitute.com/logo.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/logo.png", type: "image/png" },
      { rel: "canonical", href: "https://uniquewellnessinstitute.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["EducationalOrganization", "SportsClub", "LocalBusiness"],
          name: "Unique Wellness Institute",
          alternateName: ["UWI Chess Academy", "Unique Wellness Institute Mumbai"],
          url: "https://uniquewellnessinstitute.com",
          logo: "https://uniquewellnessinstitute.com/logo.png",
          image: "https://uniquewellnessinstitute.com/logo.png",
          description:
            "International chess coaching and career guidance institute based in Mumbai, India, offering live online lessons for children and adults globally.",
          telephone: "+91-9594373644",
          email: "info@uniquewellnessinstitute.com",
          priceRange: "₹₹",
          currenciesAccepted: "INR, USD, GBP, EUR, AED",
          paymentAccepted: "Credit Card, Debit Card, UPI, Net Banking, Bank Transfer",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 19.0760,
            longitude: 72.8777,
          },
          areaServed: [
            { "@type": "Country", name: "India" },
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "United Arab Emirates" },
            { "@type": "Country", name: "Canada" },
            { "@type": "Country", name: "Singapore" },
            { "@type": "Country", name: "Australia" },
          ],
          founder: {
            "@type": "Person",
            name: "Mrunal Kore",
            jobTitle: "Founder",
          },
          knowsAbout: [
            "Chess Coaching",
            "Chess Tactics and Strategy",
            "Tournament Chess Preparation",
            "Career Counseling",
            "Student Psychometric Guidance",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-9594373644",
            contactType: "admissions",
            email: "info@uniquewellnessinstitute.com",
            areaServed: "Worldwide",
            availableLanguage: ["English", "Hindi", "Marathi"],
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Chess Coaching Programs & Career Guidance",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: "Beginner Chess Course",
                  description: "Introduction to chess rules, piece movements, basic tactics and board awareness for kids.",
                  provider: { "@type": "EducationalOrganization", name: "Unique Wellness Institute" },
                },
                price: "5500",
                priceCurrency: "INR",
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: "Intermediate Chess Course",
                  description: "Middlegame planning, endgame technique, pins, forks, and competitive tournament play.",
                  provider: { "@type": "EducationalOrganization", name: "Unique Wellness Institute" },
                },
                price: "7000",
                priceCurrency: "INR",
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Course",
                  name: "Advanced Chess Course",
                  description: "High-level opening repertoires, deep calculation, and mentorship with international coaches.",
                  provider: { "@type": "EducationalOrganization", name: "Unique Wellness Institute" },
                },
                price: "8000",
                priceCurrency: "INR",
              },
            ],
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        {!isDashboard && <SiteHeader />}
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        {!isDashboard && <SiteFooter />}
      </div>
      <FloatingChatWidget />
      <Toaster />
    </QueryClientProvider>
  );
}
