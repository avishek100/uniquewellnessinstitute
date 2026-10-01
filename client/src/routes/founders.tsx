import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import mrunalKore from "@/assets/murnalkore.png";

export const Route = createFileRoute("/founders")({
    head: () => ({
        meta: [
            { title: "Founder Mrunal Kore — Unique Wellness Institute Mumbai" },
            {
                name: "description",
                content:
                    "Meet Mrunal Kore, Founder of Unique Wellness Institute. Leadership in wellness, training, and holistic chess education based in Mumbai, India.",
            },
            {
                name: "keywords",
                content:
                    "Mrunal Kore, Unique Wellness Institute Founder, chess institute Mumbai founder, leadership wellness training India",
            },
            { property: "og:title", content: "Founder Mrunal Kore — Unique Wellness Institute Mumbai" },
            {
                property: "og:description",
                content:
                    "Meet Mrunal Kore, Founder of Unique Wellness Institute. Decades of leadership across hospitality, sales, training, and wellness education.",
            },
            { property: "og:url", content: "https://uniquewellnessinstitute.com/founders" },
            { property: "og:image", content: "https://uniquewellnessinstitute.com/logo.png" },
        ],
        links: [{ rel: "canonical", href: "https://uniquewellnessinstitute.com/founders" }],
    }),
    component: FounderPage,
});

function FounderPage() {
    return (
        <>
            <section className="bg-secondary/50 py-14 lg:py-16">
                <div className="container-page">
                    <span className="eyebrow">Founder</span>
                    <h1 className="mt-4 text-4xl sm:text-5xl">Mrunal Kore.</h1>
                    <p className="mt-3 text-lg text-muted-foreground">Founder · Unique Wellness Institute</p>
                </div>
            </section>

            <section className="container-page grid gap-10 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14 lg:py-20">
                <figure className="card-soft overflow-hidden">
                    <img
                        src={mrunalKore}
                        alt="Mrunal Kore, Founder of Unique Wellness Institute"
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover object-center"
                    />
                    <figcaption className="p-5">
                        <p className="font-semibold">Mrunal Kore</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Founder · Unique Wellness Institute
                        </p>
                    </figcaption>
                </figure>

                <div>
                    <span className="eyebrow">About Me</span>
                    <div className="mt-5 space-y-5 text-base leading-relaxed text-muted-foreground">
                        <p>
                            My name is Mrunal Kore. I have gained experience across promotions, food and beverage,
                            sales, marketing, customer service, and training.
                        </p>
                        <p>
                            To complete my hospitality education, I joined JPMorgan Chase as a CSA. I became a top
                            seller and was recognised for delivering excellent customer service.
                        </p>
                        <p>
                            I was part of the food and beverage service team at the Saudi King&apos;s Palace for
                            three annual meetings, attended by presidents and kings from around the world. At the
                            third event, I was part of the team serving Donald Trump, then President of the United
                            States.
                        </p>
                        <p>
                            I started with a small training center and gradually expanded. Today, my primary focus
                            is chess coaching for children and career support.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        <article className="card-soft p-4">
                            <h2 className="font-semibold">Royal F&amp;B Service</h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Served at the Saudi King&apos;s Palace annual meeting three times.
                            </p>
                        </article>
                        <article className="card-soft p-4">
                            <h2 className="font-semibold">JPMorgan Chase</h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Top seller as a CSA, recognised for customer service.
                            </p>
                        </article>
                        <article className="card-soft p-4">
                            <h2 className="font-semibold">Founder</h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Built Unique Wellness Institute from a small training center.
                            </p>
                        </article>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="https://uniquewellnessinsti.lovable.app/career-counseling"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-outline"
                        >
                            Career Counseling
                        </a>
                        <a
                            href="https://uniquewellnessinsti.lovable.app/signup"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-gold"
                        >
                            Book a Demo <ArrowRight className="size-4" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
