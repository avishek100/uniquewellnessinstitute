import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import careerImage from "@/assets/career.png";
import englishImage1 from "@/assets/english1.png";
import englishImage2 from "@/assets/english2.png";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Compass,
  FileCheck,
  Globe2,
  MessageSquareText,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

const serviceCards = [
  {
    title: "Career Planning",
    description:
      "Clarify your strengths, interests, and priorities, then turn them into a practical, high-impact career roadmap.",
    icon: Compass,
    badgeBg: "from-teal-500/20 to-emerald-500/10",
    iconColor: "text-teal-600 dark:text-teal-400",
    borderColor: "hover:border-teal-500/40",
  },
  {
    title: "Resume Engineering",
    description:
      "Transform your experience into an ATS-friendly, recruiter-ready resume that stands out to hiring managers.",
    icon: FileCheck,
    badgeBg: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "hover:border-blue-500/40",
  },
  {
    title: "Interview Mastery",
    description:
      "Practice clear, confident behavioral and technical interview responses with structured 1-on-1 mock sessions.",
    icon: MessageSquareText,
    badgeBg: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
    borderColor: "hover:border-purple-500/40",
  },
  {
    title: "Global Employment",
    description:
      "Practical guidance on international applications, overseas hiring norms, and cross-border career transitions.",
    icon: Globe2,
    badgeBg: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "hover:border-amber-500/40",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "Deep dive into your goals, past trajectory, and current obstacles.",
    icon: Users,
    badgeBg: "from-teal-500/20 to-emerald-500/10",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  {
    number: "02",
    title: "Targeted Strategy",
    description: "Build a customized action plan matching your desired career level.",
    icon: Compass,
    badgeBg: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    number: "03",
    title: "Hands-on Prep",
    description: "Mock interviews, resume refinement, and tactical coaching sessions.",
    icon: Sparkles,
    badgeBg: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    number: "04",
    title: "Offer & Growth",
    description: "Enter interviews with unshakeable confidence and negotiate strong offers.",
    icon: Trophy,
    badgeBg: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

const outcomePoints = [
  "Industry-tested mentorship across hospitality, corporate sales, recruitment, and tech.",
  "Guidance tailored for both emerging students and seasoned working professionals.",
  "Custom step-by-step career blueprints and proactive job search coaching.",
  "Recruiter-ready resumes, LinkedIn optimization, and mock interview practice.",
];

const guidanceImages = [
  { src: careerImage, alt: "Career skills, experience, and professional growth" },
  { src: englishImage1, alt: "Communicative English skills for career success" },
  { src: englishImage2, alt: "Learning English and building language fluency" },
];

export const Route = createFileRoute("/career-guidance")({
  head: () => ({
    meta: [
      { title: "Career Guidance & Employment Mentorship | Unique Wellness Institute" },
      {
        name: "description",
        content:
          "Get practical career planning, resume support, interview preparation, and international employment guidance from Unique Wellness Institute.",
      },
      {
        property: "og:title",
        content: "Career Guidance & Employment Mentorship | Unique Wellness Institute",
      },
      {
        property: "og:description",
        content:
          "Personalized career guidance, interview support, and practical direction for students and professionals.",
      },
      { property: "og:url", content: "https://uniquewellnessinstitute.com/career-guidance" },
    ],
    links: [{ rel: "canonical", href: "https://uniquewellnessinstitute.com/career-guidance" }],
  }),
  component: CareerGuidancePage,
});

function CareerGuidancePage() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    if (!carouselApi || isCarouselPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = window.setInterval(() => carouselApi.scrollNext(), 1500);
    return () => window.clearInterval(interval);
  }, [carouselApi, isCarouselPaused]);

  return (
    <main className="bg-background text-foreground">
      <section className="border-b border-border bg-background">
        <div className="container-page grid gap-10 pt-4 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12 lg:pt-4 lg:pb-20">
          <div>
            <span className="eyebrow">Career Guidance</span>
            <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl font-bold tracking-tight">
              Practical mentorship for students &amp; professionals
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Enhance skills, industry exposure, and real-world confidence through guided career
              planning, interview coaching, and strategic positioning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">
                Book a Free Consultation <ArrowRight className="size-4" />
              </Link>
              <Link to="/prices" className="btn-outline">
                View Course Fees
              </Link>
            </div>
          </div>
          <div className="card-soft p-4">
            <Carousel
              opts={{ loop: true }}
              setApi={setCarouselApi}
              onPointerEnter={() => setIsCarouselPaused(true)}
              onPointerLeave={() => setIsCarouselPaused(false)}
            >
              <CarouselContent>
                {guidanceImages.map(({ src, alt }) => (
                  <CarouselItem key={src}>
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={src}
                        alt={alt}
                        className="aspect-[3/2] w-full rounded-xl bg-white object-contain transition-transform duration-700 ease-out hover:scale-[1.03]"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                aria-label="Previous guidance image"
                className="left-3 top-1/2 -translate-y-1/2"
              />
              <CarouselNext
                aria-label="Next guidance image"
                className="right-3 top-1/2 -translate-y-1/2"
              />
            </Carousel>
          </div>
        </div>
      </section>

      <div className="container-page py-16 lg:py-20">
        <section>
          <div className="max-w-2xl">
            <span className="eyebrow">Core Offerings</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">What we help you achieve</h2>
            <p className="mt-3 text-muted-foreground">
              Personalized guidance mapped to individual career milestones.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map(({ title, description, icon: Icon, badgeBg, iconColor, borderColor }) => (
              <article
                key={title}
                className={`group relative flex flex-col rounded-2xl border border-border/80 bg-card/95 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${borderColor}`}
              >
                <div
                  className={`grid size-12 place-items-center rounded-2xl bg-linear-to-br ${badgeBg} border border-border/50 shadow-xs transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`size-6 ${iconColor}`} strokeWidth={2.2} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="max-w-2xl">
            <span className="eyebrow">Methodology</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">A clear, four-step journey</h2>
            <p className="mt-3 text-muted-foreground">
              Structured steps from discovery to career success.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(({ number, title, description, icon: Icon, badgeBg, iconColor }) => (
              <article
                key={title}
                className="group relative flex flex-col rounded-2xl border border-border/80 bg-card/95 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-primary">{number}</span>
                  <div
                    className={`grid size-9 place-items-center rounded-xl bg-linear-to-br ${badgeBg} border border-border/50 shadow-2xs transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`size-4.5 ${iconColor}`} strokeWidth={2.2} />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-border/80 bg-secondary/30 p-8 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="eyebrow">Proven Results</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">Outcomes, not just advice</h2>

              <ul className="mt-6 space-y-3.5 text-sm sm:text-base">
                {outcomePoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-5.5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-2xs">
                      <Check className="size-3.5" strokeWidth={2.6} />
                    </span>
                    <span className="text-foreground/90 font-medium">{point}</span>
                  </li>
                ))}
              </ul>

              <Link to="/contact" className="btn-gold mt-8 inline-flex items-center gap-2">
                Book a Free Consultation
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-7 shadow-md">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 text-primary border border-primary/20">
                  <BriefcaseBusiness className="size-6" />
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-primary">
                    20+ YEARS
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Combined Experience
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Cross-sector leadership and mentoring experience in global hospitality,
                corporate sales, recruitment, and career coaching.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}