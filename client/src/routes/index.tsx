import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Gamepad2,
  GraduationCap,
  Laptop,
  MonitorSmartphone,
  Sparkles,
  Star,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import { useState } from "react";

import ajayHonda from "@/assets/ajayhonda.png";
import dharmandra from "@/assets/dharmandra.png";
import googleLogo from "@/assets/google.png";
import omkar from "@/assets/omkar.png";
import onlineLesson from "@/assets/online-lesson.png";
import { ApplicationForm } from "@/components/site/ApplicationForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unique Wellness Institute — Chess & Career Guidance" },
      {
        name: "description",
        content:
          "International chess coaching and career guidance from Unique Wellness Institute. Explore programs and book a consultation.",
      },
      {
        property: "og:title",
        content: "Unique Wellness Institute — Chess & Career Guidance",
      },
      {
        property: "og:description",
        content:
          "Chess coaching and career guidance, delivered with care and backed by decades of international experience.",
      },
    ],
  }),
  component: Home,
});

const benefits = [
  {
    icon: Gamepad2,
    title: "Game format",
    text: "Completing chess tasks. Points, ratings, leaders.",
    badgeBg: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "hover:border-emerald-500/40",
    accentGlow: "bg-emerald-500/10",
  },
  {
    icon: GraduationCap,
    title: "Experienced teachers",
    text: "Many years of teaching experience.",
    badgeBg: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "hover:border-blue-500/40",
    accentGlow: "bg-blue-500/10",
  },
  {
    icon: MonitorSmartphone,
    title: "All devices",
    text: "Solve tasks on computer, phone or tablet.",
    badgeBg: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    borderColor: "hover:border-cyan-500/40",
    accentGlow: "bg-cyan-500/10",
  },
  {
    icon: Award,
    title: "Original courses",
    text: "Structured chess courses built in-house.",
    badgeBg: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "hover:border-amber-500/40",
    accentGlow: "bg-amber-500/10",
  },
  {
    icon: Trophy,
    title: "Competition preparation",
    text: "On request we prepare you for competitions.",
    badgeBg: "from-yellow-500/20 to-amber-500/10",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    borderColor: "hover:border-yellow-500/40",
    accentGlow: "bg-yellow-500/10",
  },
  {
    icon: Laptop,
    title: "Online learning",
    text: "Lessons with a teacher from anywhere in the world.",
    badgeBg: "from-indigo-500/20 to-violet-500/10",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    borderColor: "hover:border-indigo-500/40",
    accentGlow: "bg-indigo-500/10",
  },
  {
    icon: BrainCircuit,
    title: "Mental skills",
    text: "At any age chess is beneficial for the mind.",
    badgeBg: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
    borderColor: "hover:border-purple-500/40",
    accentGlow: "bg-purple-500/10",
  },
  {
    icon: Users,
    title: "Group classes",
    text: "New friendly connections and joint games.",
    badgeBg: "from-emerald-500/20 to-green-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "hover:border-emerald-500/40",
    accentGlow: "bg-emerald-500/10",
  },
];

const faqs = [
  {
    q: "Can I book a demo class before enrolling?",
    a: "Yes. You can book a demo class to experience our teaching approach before choosing a course.",
  },
  {
    q: "How many sessions does each course include?",
    a: "Each course includes 16 structured, interactive sessions designed to help you improve consistently.",
  },
  {
    q: "What will I learn during the course?",
    a: "You will develop tactical skills, strategic thinking, calculation, concentration, decision-making and confidence while building a strong understanding of chess fundamentals.",
  },
  {
    q: "How are the classes conducted?",
    a: "All classes are live, interactive and conducted online in English. Students learn in small groups and receive personal attention from their coach.",
  },
  {
    q: "What age groups and skill levels do you teach?",
    a: "We teach children aged 5–16, from complete beginners to advanced players preparing for competitive tournaments.",
  },
];

const googleReviews = [
  {
    id: "chess-coaching-parent",
    name: "Ajay Honda",
    meta: "Google review",
    review:
      "The Chess coaching concept followed is really good. My son has grasped the chess very well, Coach is very good at teaching the techniques. He identified his weak points in the chess and provide the necessary help required. I’m highly impressed with Unique Wellness Institute. It's helping my son think on the lines of acquiring control of certain strategic squares rather than merely respond on a move to move basis! They also help the child think of counter moves which enables better learning and to know what the opponent could be thinking. They conduct frequent tournaments and encourage children. I am extremely pleased with they way the classes are conducted and that my son is very eager to attend the classes.",
    avatarImage: ajayHonda,
  },
  {
    id: "vicky-thakur",
    name: "Vicky Thakur",
    meta: "a year ago · 4 reviews",
    review:
      "Surprised with an excellent resume made in the latest format. It has all the details in 2 pages. Had forwarded a few known kids for online chess coaching & they are more focused in chess & sitting at one place during the entire session. Their parents and family members are surprised and glad about it. An incredible initiative with an excellent attitude of giving out the best in all their services. Anyone looking for either of their services can go ahead without any doubts. Thank you and good luck.",
    avatarImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "kishore-kumar",
    name: "Kishore Kumar",
    meta: "a year ago",
    review:
      "Very happy & convinced with the entire online chess coaching. It has made a tremendous change in our son. His behaviour is changing too. Coach is very focused and helpful. Really a great concept.",
    avatarImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "sagar-juikar",
    name: "Sagar Juikar",
    meta: "3 years ago · 3 reviews",
    review:
      "I have known Mr. Mrunal from a very long time as we worked together. He is a very nice, helpful & humble person. Talking about his training & guidance towards, How to build your perfect resume, Guidance to work in foreign country is very well guided. Its organized and we'll explained. Apart from this he is also providing Online Chess Coaching, Diet Plans, Easy Workout Plans. He is taking care of my Canada employment process very well. I would recommend everyone to contact him or meet him if you have any similar interest. Heartiest Congratulations 🎊 for your new venture and Best Wishes for Further Success. Keep it up 👍",
    avatarImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "omkar-andhere",
    name: "Omkar Andhere",
    meta: "a year ago · 3 reviews",
    review:
      "If you're looking for a one-stop solution for chess coaching, diet plans, career guidance, resume building, English speaking, and job recruitment, then Unique Wellness Institute is an excellent choice. Mrunal Kore, the founder of Unique Wellness Institute, is not only incredibly knowledgeable but also very friendly and approachable. He provides great guidance tailored to individual needs and helps people achieve their goals with clarity and confidence. Highly recommended for anyone seeking professional support in multiple areas!",
    avatarImage: omkar,
  },
  {
    id: "vishnupriya-duvvru",
    name: "Vishnupriya Duvvru",
    meta: "Edited 2 years ago · 11 reviews",
    review:
      '"I\'m going for chess coaching and I love the classes. The trainer is very patient and teaches the concepts well. (Samvritha student)\n\nFor all those of you who want to train your young minds in the game of chess, I would suggest "Unique wellness". They not only teach the concepts well but they also train the young minds on discipline, setting goals for themselves and also stay healthy. They have provided counseling sessions for my daughter to understand her focus areas and a lovely chess board was also gifted for her birthday. There are many well known chess academic centers which are more expensive and teach the same concepts but here the trainers are at par Excellence and navigate their teaching methods as per the child needs. Without blinking an eye, I would recommend anyone to just go for this academy as they offer holistic guidance for the child which helps to build their personality and focus on areas where they require improvement.',
    avatarImage:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "dharmendra-kumar",
    name: "Dharmendra Kumar",
    meta: "a year ago · 1 review · 1 photo",
    review:
      "Very unique and excellent chess coaching institute in Mumbai just like it's name. Mrunal Kore is very good coach for chech. Happy to learn chess from him 😃",
    avatarImage: dharmandra,
  },
];

const googleReviewsUrl =
  "https://www.google.com/maps/search/?api=1&query=Unique%20Wellness%20Institute";

function Home() {
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  const toggleReview = (reviewId: string) => {
    setExpandedReviews((current) => ({
      ...current,
      [reviewId]: !current[reviewId],
    }));
  };

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground py-16 lg:py-24">
        {/* Ambient Mesh Glows */}
        <div className="pointer-events-none absolute -left-32 -top-32 size-[450px] rounded-full bg-primary/20 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-32 right-0 size-[400px] rounded-full bg-amber-500/15 blur-[120px]" />

        <div className="container-page relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1 text-xs font-semibold text-primary backdrop-blur-md shadow-xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>Chess · Career Mentorship — All In One</span>
            </div>

            <h1 className="hero-heading-fade mt-6 max-w-2xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl font-bold tracking-tight uppercase">
              Grow with <span className="bg-linear-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-xs">international coaching</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-foreground/80">
              Unique Wellness Institute pairs world-class chess coaching with personalized career mentorship, built on decades of international master experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold group">
                <Sparkles className="size-4 transition-transform group-hover:rotate-12" />
                <span>Book Free Demo</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/"
                hash="services"
                className="btn-base border border-ink-foreground/25 bg-white/5 text-ink-foreground backdrop-blur-sm transition-all hover:bg-white/15 hover:border-white/40 hover:-translate-y-0.5"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm">
              <span className="flex gap-0.5 text-amber-400" aria-label="Rated 4.9 out of 5">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star key={starIndex} className="size-4.5 fill-current" />
                ))}
              </span>
              <span className="font-bold text-white">4.9 / 5</span>
              <span className="text-ink-foreground/70 font-medium">· 100+ Verified Google Reviews</span>
            </div>
          </div>

          <div className="relative group">
            {/* Glow frame */}
            <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-linear-to-r from-primary/30 to-amber-500/20 blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-2 backdrop-blur-sm shadow-2xl">
              <img
                src={onlineLesson}
                alt="Student learning chess in a live online lesson"
                width={1200}
                height={912}
                fetchPriority="high"
                className="aspect-[0.83] w-full rounded-2xl object-contain shadow-lift transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Floating Top-Right Glass Badge */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3.5 py-1.5 backdrop-blur-xl shadow-xl text-white text-xs font-semibold">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                <span>Top Rated Academy</span>
              </div>

              {/* Floating Bottom-Left Glass Card */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3 rounded-2xl border border-white/20 bg-black/70 p-3 backdrop-blur-xl shadow-2xl text-white">
                <div className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-amber-500 to-yellow-500 text-white shadow-md">
                  <Trophy className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">Live Interactive Batches</p>
                  <p className="text-[11px] text-white/70">Ages 5–16 · Global Timezones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/60 backdrop-blur-sm">
        <dl className="container-page grid grid-cols-2 gap-4 py-8 sm:grid-cols-4 sm:gap-6 sm:py-10">
          {[
            {
              value: "100+",
              label: "Google reviews",
              icon: Star,
              badgeBg: "from-amber-500/20 to-yellow-500/10",
              iconColor: "text-amber-600 dark:text-amber-400",
            },
            {
              value: "847",
              label: "Students benefited",
              icon: Users,
              badgeBg: "from-blue-500/20 to-indigo-500/10",
              iconColor: "text-blue-600 dark:text-blue-400",
            },
            {
              value: "180+",
              label: "Tournament winners",
              icon: Trophy,
              badgeBg: "from-emerald-500/20 to-teal-500/10",
              iconColor: "text-emerald-600 dark:text-emerald-400",
            },
            {
              value: "98%",
              label: "Satisfaction rate",
              icon: Sparkles,
              badgeBg: "from-purple-500/20 to-pink-500/10",
              iconColor: "text-purple-600 dark:text-purple-400",
            },
          ].map(({ value, label, icon: Icon, badgeBg, iconColor }) => (
            <div
              key={label}
              className="group relative flex items-center gap-3.5 rounded-2xl border border-border/70 bg-card p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md sm:p-5"
            >
              <div
                className={`relative grid size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br ${badgeBg} border border-border/50 shadow-xs transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className={`size-6 ${iconColor}`} strokeWidth={2.2} />
              </div>
              <div>
                <dt className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {value}
                </dt>
                <dd className="text-xs font-medium text-muted-foreground">{label}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <section id="services" className="container-page scroll-mt-24 py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">What we offer</span>
          <h2 className="mt-4 text-3xl sm:text-4xl">Three pillars. One institute.</h2>
          <p className="mt-4 text-muted-foreground">
            Chess and career guidance, backed by experience and delivered with care.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="group relative rounded-2xl border border-border/80 bg-card/95 p-6 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/40 hover:shadow-xl">
            <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-amber-500/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative grid size-14 place-items-center rounded-2xl bg-linear-to-br from-amber-500/20 to-yellow-500/10 border border-border/60 shadow-xs transition-transform duration-300 group-hover:scale-110">
              <Trophy className="size-7 text-amber-600 dark:text-amber-400 transition-transform duration-300 group-hover:rotate-6" strokeWidth={2.2} />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary">Chess Mastery</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight">International Chess Coaching</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              For kids aged 5–16. Beginner to advanced batches with tournament preparation under
              International Coach Mr. Vivek Rane.
            </p>
            <Link
              to="/"
              hash="courses"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              View courses <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
          <article className="group relative rounded-2xl border border-border/80 bg-card/95 p-6 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-xl">
            <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-blue-500/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative grid size-14 place-items-center rounded-2xl bg-linear-to-br from-blue-500/20 to-indigo-500/10 border border-border/60 shadow-xs transition-transform duration-300 group-hover:scale-110">
              <BriefcaseBusiness className="size-7 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:rotate-6" strokeWidth={2.2} />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary">Career Counseling</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight">Career &amp; International Employment</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              Personalised career guidance, interview training, and recruiter-ready resumes, backed
              by experience in hospitality, sales, and recruitment.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Learn more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
        </div>
      </section>

      <section className="bg-[#f8f9f5] py-16 sm:py-20">
        <div className="container-page mx-auto max-w-5xl">
          <Carousel opts={{ align: "start" }}>
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="eyebrow">Google Reviews</span>
                <h2 className="mt-3 text-3xl sm:text-4xl">Loved by players worldwide</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Trusted by families and students at every stage of their chess journey.
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="flex items-center gap-2 text-xs text-foreground">
                  <Star className="size-4 fill-[#d27c4b] text-[#d27c4b]" />
                  <span className="font-semibold">4.9 / 5</span>
                  <span className="text-muted-foreground">· 100+ Google reviews</span>
                </div>
                <div className="flex gap-2">
                  <CarouselPrevious
                    aria-label="Previous reviews"
                    className="static size-9 translate-y-0 rounded-full border-[#dadce0] bg-white text-[#1f1f1f] hover:bg-[#f1f3f4]"
                  />
                  <CarouselNext
                    aria-label="Next reviews"
                    className="static size-9 translate-y-0 rounded-full border-[#dadce0] bg-white text-[#1f1f1f] hover:bg-[#f1f3f4]"
                  />
                </div>
              </div>
            </div>

            <CarouselContent className="items-stretch">
              {googleReviews.map(({ id, name, meta, review, avatarImage }) => {
                const isExpanded = Boolean(expandedReviews[id]);

                return (
                  <CarouselItem key={id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                    <article className="mx-auto flex h-fit w-full max-w-[300px] flex-col rounded-[28px] border border-[#e2e2e2] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-5">
                      <div className="flex items-center gap-3">
                        {id === "vicky-thakur" ? (
                          <div
                            role="img"
                            aria-label={`${name}'s profile`}
                            className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-[#e8eaed] text-lg font-semibold text-[#5f6368]"
                          >
                            V
                          </div>
                        ) : (
                          <img
                            src={avatarImage}
                            alt={`${name}'s profile`}
                            className="size-[52px] shrink-0 rounded-full object-cover"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-lg font-medium text-[#1f1f1f]">{name}</div>
                          <div className="mt-1 text-sm text-[#616161]">{meta}</div>
                        </div>
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#cf7b43] text-xl font-bold text-white">
                          G
                        </div>
                      </div>

                      <div
                        className="mt-6 flex items-center gap-1 text-[#f0b832]"
                        aria-label="5 out of 5 stars"
                      >
                        {Array.from({ length: 5 }, (_, starIndex) => (
                          <Star key={starIndex} className="size-6 fill-current" />
                        ))}
                        <span className="ml-2 inline-flex size-6 items-center justify-center rounded-full bg-[#e8f0fe] text-[#4285f4]">
                          <Check className="size-3.5" />
                        </span>
                      </div>

                      <blockquote
                        className={`mt-7 whitespace-pre-line text-[15px] leading-6 text-[#1f1f1f] ${isExpanded ? "" : "line-clamp-3"}`}
                      >
                        {review}
                      </blockquote>

                      <button
                        type="button"
                        onClick={() => toggleReview(id)}
                        aria-expanded={isExpanded}
                        className="mt-3 w-fit text-sm font-medium text-[#5f6368] underline-offset-2 hover:underline"
                      >
                        {isExpanded ? "Read less" : "Read more"}
                      </button>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
          <div className="mt-7 flex justify-center">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md border border-[#dadce0] bg-white px-5 py-2.5 text-sm font-medium text-[#1a73e8] hover:bg-[#f8faff]"
            >
              <img src={googleLogo} alt="" className="mr-2 size-4 object-contain" />
              Open Google Reviews
            </a>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20 relative overflow-hidden">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
              Everything a young player needs to keep improving
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
              Tailored coaching methods, interactive exercises, and personal mentorship designed to build grandmaster-level intuition.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(
              ({
                icon: Icon,
                title,
                text,
                badgeBg,
                iconColor,
                borderColor,
                accentGlow,
              }) => (
                <div
                  key={title}
                  className={`group relative rounded-2xl border border-border/80 bg-card/95 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:bg-card hover:shadow-lg ${borderColor}`}
                >
                  {/* Subtle top-corner glow */}
                  <div
                    className={`pointer-events-none absolute -right-6 -top-6 size-24 rounded-full blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accentGlow}`}
                  />

                  {/* 3D-styled Vibrant Icon Container */}
                  <div
                    className={`relative grid size-12 place-items-center rounded-2xl bg-linear-to-br ${badgeBg} border border-border/50 shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:shadow-sm`}
                  >
                    <Icon
                      className={`size-6 ${iconColor} transition-transform duration-300 group-hover:rotate-6`}
                      strokeWidth={2.2}
                    />
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {text}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1fr_1fr]">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 text-3xl sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-border/80 bg-card/95 p-5 shadow-xs transition-all duration-200 hover:border-primary/40 open:border-primary/40 open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg font-medium text-foreground marker:hidden">
                  <span>{faq.q}</span>
                  <span className="ml-3 grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-primary transition-transform duration-200 group-open:rotate-180">
                    <ChevronDown className="size-4" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3.5 rounded-2xl border border-border/70 bg-secondary/30 p-4 text-sm text-muted-foreground">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-primary/20 to-primary/10 border border-primary/20 text-primary shadow-xs">
              <Video className="size-5" />
            </div>
            <span>
              Didn&apos;t find your answer? Leave your number and our specialist will contact you.
            </span>
          </div>
        </div>

        <div id="apply">
          <ApplicationForm />
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="container-page flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-semibold uppercase text-primary-foreground/70">
              Ready to take the next step?
            </span>
            <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
              Start with a conversation. Grow from there.
            </h2>
            <p className="mt-3 text-sm text-primary-foreground/75">
              Book a free demo class or speak with us about career guidance.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link to="/contact" className="btn-gold">
              Book Free Demo <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/auth"
              className="btn-base border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
