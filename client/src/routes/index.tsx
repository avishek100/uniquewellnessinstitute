import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  Laptop,
  MonitorSmartphone,
  Star,
  Trophy,
  Users,
  Video,
} from "lucide-react";

import onlineLesson from "@/assets/online-lesson.png";
import piecesDetail from "@/assets/pieces-detail.jpg";
import { ApplicationForm } from "@/components/site/ApplicationForm";
import { chessCourses } from "@/lib/chess-courses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unique Wellness Institute — Chess, Career & Wellness" },
      {
        name: "description",
        content:
          "International chess coaching, career guidance and wellness plans from Unique Wellness Institute. Explore programs and book a consultation.",
      },
      {
        property: "og:title",
        content: "Unique Wellness Institute — Chess, Career & Wellness",
      },
      {
        property: "og:description",
        content:
          "Chess, career guidance and wellness — delivered with care and backed by decades of international experience.",
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
  },
  {
    icon: GraduationCap,
    title: "Experienced teachers",
    text: "Many years of teaching experience.",
  },
  {
    icon: MonitorSmartphone,
    title: "All devices",
    text: "Solve tasks on computer, phone or tablet.",
  },
  { icon: Award, title: "Original courses", text: "Structured chess courses built in-house." },
  {
    icon: Trophy,
    title: "Competition preparation",
    text: "On request we prepare you for competitions.",
  },
  {
    icon: Laptop,
    title: "Online learning",
    text: "Lessons with a teacher from anywhere in the world.",
  },
  {
    icon: BrainCircuit,
    title: "Mental skills",
    text: "At any age chess is beneficial for the mind.",
  },
  { icon: Users, title: "Group classes", text: "New friendly connections and joint games." },
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

const testimonials = [
  {
    quote:
      "My son went from learning the rules to winning his school tournament. The coaching made a real difference.",
    name: "Priya S.",
    role: "Parent",
  },
  {
    quote:
      "The live lessons feel engaging, and the clear course structure makes it easy to see progress.",
    name: "Karthik R.",
    role: "Chess student",
  },
  {
    quote: "Personal feedback on my games helped me understand positions and make better plans.",
    name: "Anita M.",
    role: "Chess student",
  },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <span className="eyebrow text-primary">
              Chess · Career Guidance · Wellness — all under one roof
            </span>
            <h1 className="mt-5 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 motion-reduce:animate-none text-5xl leading-[0.98] sm:text-6xl lg:text-7xl uppercase">
              Grow with <span className="text-primary">international coaching</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-foreground/75">
              Unique Wellness Institute pairs world-class chess coaching with career mentorship and
              wellness — built on decades of cross-industry experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">
                Book Demo Class <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/"
                hash="services"
                className="btn-base border border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10"
              >
                Explore Services
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm">
              <span className="flex gap-0.5 text-accent" aria-label="Rated 4.9 out of 5">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star key={starIndex} className="size-4 fill-current" />
                ))}
              </span>
              <span className="font-semibold">4.9 / 5</span>
              <span className="text-ink-foreground/65">· 100+ Google reviews</span>
            </div>
          </div>

          <div className="relative">
            <img
              src={onlineLesson}
              alt="Student learning chess in a live online lesson"
              width={1200}
              height={912}
              fetchPriority="high"
              className="aspect-[0.83] w-full rounded-lg object-contain shadow-lift"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <dl className="container-page grid grid-cols-2 gap-6 py-8 sm:grid-cols-4 sm:py-10">
          {[
            ["100+", "Google reviews"],
            ["847", "Students benefited"],
            ["180+", "Tournament winners"],
            ["98%", "Satisfaction rate"],
          ].map(([value, label]) => (
            <div key={label} className="text-center sm:text-left">
              <dt className="font-display text-3xl font-semibold text-primary sm:text-4xl">
                {value}
              </dt>
              <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="services" className="container-page scroll-mt-24 py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">What we offer</span>
          <h2 className="mt-4 text-3xl sm:text-4xl">Three pillars. One institute.</h2>
          <p className="mt-4 text-muted-foreground">
            Chess, career, and wellness — guided by experience and delivered with care.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <article className="card-soft flex flex-col p-6 sm:p-7">
            <Trophy className="size-6 text-primary" />
            <p className="mt-5 text-xs font-semibold uppercase text-primary">Chess Mastery</p>
            <h3 className="mt-2 text-2xl">International Chess Coaching</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              For kids aged 5–16. Beginner to advanced batches with tournament preparation under
              International Coach Mr. Vivek Rane.
            </p>
            <Link
              to="/"
              hash="courses"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              View courses <ArrowRight className="size-4" />
            </Link>
          </article>
          <article className="card-soft flex flex-col p-6 sm:p-7">
            <BriefcaseBusiness className="size-6 text-primary" />
            <p className="mt-5 text-xs font-semibold uppercase text-primary">Career Counseling</p>
            <h3 className="mt-2 text-2xl">Career &amp; International Employment</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              Personalised career guidance, interview training, and recruiter-ready resumes, backed
              by experience in hospitality, sales, and recruitment.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Learn more <ArrowRight className="size-4" />
            </Link>
          </article>
          <article className="card-soft flex flex-col p-6 sm:p-7">
            <HeartPulse className="size-6 text-primary" />
            <p className="mt-5 text-xs font-semibold uppercase text-primary">Wellness</p>
            <h3 className="mt-2 text-2xl">Diet &amp; Exercise Plans</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              Sustainable diet and workout plans built around your routine, with regular check-ins
              to help you stay on track.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Get started <ArrowRight className="size-4" />
            </Link>
          </article>
        </div>
      </section>

      <section id="courses" className="scroll-mt-24 bg-secondary/45 py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="eyebrow">Chess curriculum</span>
              <h2 className="mt-4 text-3xl sm:text-4xl">Courses for every level</h2>
              <p className="mt-3 text-muted-foreground">
                A clear progression path — every course is 16 live sessions.
              </p>
            </div>
            <Link
              to="/prices"
              className="hidden items-center gap-2 text-sm font-semibold text-primary sm:inline-flex"
            >
              Full course details <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {chessCourses.map((course, courseIndex) => (
              <article key={course.name} className="card-soft flex flex-col p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase text-primary">
                  <span className="grid size-7 place-items-center rounded-full bg-primary/10 text-[11px]">
                    {String(courseIndex + 1).padStart(2, "0")}
                  </span>
                  {course.tagline}
                </p>
                <h3 className="mt-4 text-xl">{course.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
                <p className="mt-5 font-display text-2xl font-semibold text-primary">
                  {course.fee}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">16 sessions · Live coaching</p>
                <Link to="/contact" className="btn-outline mt-5 w-full py-2.5 text-sm">
                  Enroll <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
          <Link
            to="/prices"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary sm:hidden"
          >
            Full course details <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="eyebrow">Student stories</span>
            <h2 className="mt-4 text-3xl sm:text-4xl">Loved by players worldwide</h2>
            <p className="mt-3 text-muted-foreground">
              Trusted by families and students at every stage of their chess journey.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Star className="size-5 fill-current text-accent" />
            <span>4.9 / 5</span>
            <span className="text-muted-foreground">· 100+ Google reviews</span>
          </div>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="card-soft flex flex-col p-6">
              <div className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <Star key={starIndex} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <span className="block font-semibold">{testimonial.name}</span>
                <span className="text-xs text-muted-foreground">{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="container-page scroll-mt-24 grid gap-14 py-20 lg:grid-cols-[1.15fr_1fr]"
      >
        <div>
          <span className="eyebrow">About us</span>
          <h2 className="mt-4 text-3xl sm:text-4xl">Built on experience, driven by passion.</h2>
          <div className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-muted-foreground">
            <p>
              Unique Wellness Institute combines international chess coaching, career mentorship,
              and wellness guidance under one roof. Led by experienced coach Mr. Vivek Rane, the
              academy supports students from their first game through advanced tournament play.
            </p>
            <p>
              Each course consists of 16 live, interactive sessions designed to develop tactical
              skills, strategic thinking, calculation, confidence and a deeper understanding of the
              game. Students benefit from personalised feedback, progress tracking, small-group
              instruction and focused preparation for competitive and FIDE-rated tournaments.
            </p>
            <p>
              With a supportive environment, Unique Wellness Institute helps every student improve
              consistently, enjoy chess and reach their full potential.
            </p>
          </div>

          <figure className="mt-8 rounded-2xl border-l-4 border-accent bg-sand/60 p-6">
            <blockquote className="text-sm leading-relaxed text-foreground/85">
              Originally from the airlines industry and part of service at the Saudi King&apos;s
              palace three times, Mrunal served kings and presidents worldwide. Since coaching was a
              passion, Mrunal decided to focus on it fully and provide online chess coaching, career
              counselling and personality development globally.
            </blockquote>
          </figure>
        </div>

        <div className="space-y-6">
          <div className="card-soft overflow-hidden">
            <img
              src={piecesDetail}
              alt="Chess knight and pawn"
              width={1200}
              height={912}
              loading="lazy"
              className="h-44 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl">Mrunal Kore</h3>
              <p className="text-sm text-muted-foreground">Owner &amp; head coach</p>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  "Chess, career and personality development coach",
                  "Worked with seven-time world champion Viswanathan Anand as a Business Head",
                  "International trainer in chess, personal development and global employment",
                  "Committed to high-quality training at affordable prices",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary mt-6 w-full">
                Schedule a lesson
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="container-page">
          <span className="eyebrow">Benefits</span>
          <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl">
            Everything a young player needs to keep improving
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card-soft p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1fr_1fr]">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 text-3xl sm:text-4xl">Frequently asked questions about the school</h2>
          <div className="mt-8 divide-y divide-border">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="cursor-pointer list-none font-display text-lg text-foreground marker:hidden">
                  {faq.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Video className="size-4 text-primary" /> Didn&apos;t find your answer? Leave your
            number and a specialist will contact you.
          </p>
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
              Book a free demo class or speak with us about career and wellness guidance.
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
