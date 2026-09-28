import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BrainCircuit,
  Check,
  Gamepad2,
  GraduationCap,
  Laptop,
  MonitorSmartphone,
  Trophy,
  Users,
  Video,
} from "lucide-react";

import heroChess from "@/assets/hero-chess.jpg";
import onlineLesson from "@/assets/online-lesson.jpg";
import piecesDetail from "@/assets/pieces-detail.jpg";
import tournament from "@/assets/tournament.jpg";
import { ApplicationForm } from "@/components/site/ApplicationForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unique Wellness Institute — Online Chess Coaching for Ages 5–16" },
      {
        name: "description",
        content:
          "From the first move to tournament-ready. Live online chess courses of 16 interactive sessions for children aged 5–16, with small groups and personal feedback.",
      },
      {
        property: "og:title",
        content: "Unique Wellness Institute — Online Chess Coaching for Ages 5–16",
      },
      {
        property: "og:description",
        content:
          "Live online chess courses of 16 interactive sessions for children aged 5–16, with small groups, progress tracking and tournament preparation.",
      },
    ],
  }),
  component: Home,
});

const benefits = [
  { icon: Gamepad2, title: "Game format", text: "Completing chess tasks. Points, ratings, leaders." },
  { icon: GraduationCap, title: "Experienced teachers", text: "Many years of teaching experience." },
  { icon: MonitorSmartphone, title: "All devices", text: "Solve tasks on computer, phone or tablet." },
  { icon: Award, title: "Original courses", text: "Structured chess courses built in-house." },
  { icon: Trophy, title: "Competition preparation", text: "On request we prepare you for competitions." },
  { icon: Laptop, title: "Online learning", text: "Lessons with a teacher from anywhere in the world." },
  { icon: BrainCircuit, title: "Mental skills", text: "At any age chess is beneficial for the mind." },
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

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-28">
          <div>
            <span className="eyebrow text-accent">Online chess academy · Mumbai, India</span>
            <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              From the first move to tournament-ready
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-foreground/75">
              Professional online chess coaching for children aged 5–16. Structured training for every
              level, from complete beginners to advanced tournament players.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">
                Book a free trial lesson
              </Link>
              <Link
                to="/method"
                className="btn-base border border-ink-foreground/25 text-ink-foreground hover:bg-ink-foreground/10"
              >
                See the method
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ink-foreground/15 pt-8">
              {[
                ["16", "live sessions per course"],
                ["5–16", "years of age"],
                ["1:small", "group attention"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl text-accent">{value}</dt>
                  <dd className="mt-1 text-xs text-ink-foreground/60">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src={heroChess}
              alt="Chess board set up for a game"
              width={1600}
              height={1200}
              className="col-span-2 h-64 w-full rounded-2xl object-cover shadow-lift sm:h-80"
            />
            <img
              src={onlineLesson}
              alt="Student taking a live online chess lesson"
              width={1200}
              height={912}
              loading="lazy"
              className="h-40 w-full rounded-2xl object-cover sm:h-48"
            />
            <img
              src={tournament}
              alt="Young players with tournament certificates"
              width={1200}
              height={912}
              loading="lazy"
              className="h-40 w-full rounded-2xl object-cover sm:h-48"
            />
          </div>
        </div>
      </section>

      <section className="container-page grid gap-14 py-20 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <span className="eyebrow">About the academy</span>
          <h2 className="mt-4 text-3xl sm:text-4xl">A clear learning pathway for every student</h2>
          <div className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-muted-foreground">
            <p>
              Unique Wellness Institute provides professional online chess coaching for children aged
              5–16. Led by experienced international coach Mr. Vivek Rane, the academy offers
              structured training for every level—from complete beginners to advanced tournament
              players.
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
              Originally from the airlines industry and part of service at the Saudi King&apos;s palace
              three times, Mrunal served kings and presidents worldwide. Since coaching was a passion,
              Mrunal decided to focus on it fully and provide online chess coaching, career
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
          <h2 className="mt-4 text-3xl sm:text-4xl">
            Frequently asked questions about the school
          </h2>
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
            <Video className="size-4 text-primary" /> Didn&apos;t find your answer? Leave your number
            and a specialist will contact you.
          </p>
        </div>

        <div id="apply">
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
