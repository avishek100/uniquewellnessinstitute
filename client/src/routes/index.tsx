import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Gamepad2,
  GraduationCap,
  Laptop,
  MonitorSmartphone,
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
      "I'm going for chess coaching and I love the classes. The trainer is very patient and teaches the concepts well. (Samvritha student)\n\nFor all those of you who want to train your young minds in the game of chess, I would suggest \"Unique wellness\". They not only teach the concepts well but they also train the young minds on discipline, setting goals for themselves and also stay healthy. They have provided counseling sessions for my daughter to understand her focus areas and a lovely chess board was also gifted for her birthday. There are many well known chess academic centers which are more expensive and teach the same concepts but here the trainers are at par Excellence and navigate their teaching methods as per the child needs. Without blinking an eye, I would recommend anyone to just go for this academy as they offer holistic guidance for the child which helps to build their personality and focus on areas where they require improvement.",
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
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <span className="eyebrow text-primary">
              Chess · Career Guidance — all under one roof
            </span>
            <h1 className="hero-heading-fade mt-5 max-w-2xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl uppercase">
              Grow with <span className="text-primary">international coaching</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-foreground/75">
              Unique Wellness Institute pairs world-class chess coaching with career mentorship,
              built on decades of cross-industry experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-gold">
                Book Demo Class <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/prices"
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
            Chess and career guidance, backed by experience and delivered with care.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="card-soft flex flex-col p-6 sm:p-7">
            <Trophy className="size-6 text-primary" />
            <p className="mt-5 text-xs font-semibold uppercase text-primary">Chess Mastery</p>
            <h3 className="mt-2 text-2xl">International Chess Coaching</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              For kids aged 5–16. Beginner to advanced batches with tournament preparation under
              International Coach Mr. Vivek Rane.
            </p>
            <Link
              to="/prices"
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
                    <article
                      className="mx-auto flex h-fit w-full max-w-[300px] flex-col rounded-[28px] border border-[#e2e2e2] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-5"
                    >
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

                      <div className="mt-6 flex items-center gap-1 text-[#f0b832]" aria-label="5 out of 5 stars">
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

      <section className="container-page py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">Benefits</span>
          <h2 className="mt-4 text-3xl sm:text-4xl">
            Everything a young player needs to keep improving
          </h2>
        </div>
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
