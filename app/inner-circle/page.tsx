import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import GlowCard from "@/components/ui/GlowCard";
import InnerCircleForm from "@/components/InnerCircleForm";
import { CALENDLY } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Polish Girl Inner Circle · Polish Girl Skin Co.",
  description:
    "A monthly membership and a chosen family. Glowing skin, real sisterhood, and a community of women healing, growing, and rising together. Find your seat in the Polish Girl Inner Circle.",
};

const benefits = [
  {
    t: "Community",
    d: "A place to connect, relax, and unwind. A place where you belong and are genuinely welcomed exactly as you are, where you find laughs, love, support, and encouragement for everything going on in your life. You are safe here. You are seen here. You matter.",
  },
  {
    t: "Connection",
    d: "Professional connections that change lives. The kind of relationships that open doors you did not know existed and propel you toward the life you are creating.",
  },
  {
    t: "Friendships",
    d: "The world can be lonely and isolating. Here you find the sister you have been longing for, even if the two of you are oceans apart.",
  },
  {
    t: "Fun",
    d: "Something we all need more of. Monthly Zoom facial nights with your favorite drink, real laughter, and conversation that fills you back up.",
  },
  {
    t: "Opportunities",
    d: "Room to grow, to be mentored and to mentor, to pay it forward, and one day to help build L.I.L.A. Safe Haven alongside us.",
  },
];

const moments = [
  { t: "Grab your favorite drink", d: "Coffee, tea, or a glass of wine. Come as you are." },
  { t: "Do a facial together", d: "A shared ritual of slowing down and caring for yourself." },
  { t: "Talk skin, life, and dreams", d: "Real conversation in a soft place to land." },
  { t: "Build a true sisterhood", d: "Friendships and connections that propel you forward." },
];

const belong = [
  {
    t: "You are healing",
    d: "Skincare is part of how you take your power back. You long to look in the mirror and finally love who is looking back. Here, someone sees you, and you are never alone on the journey.",
  },
  {
    t: "You are busy building",
    d: "An entrepreneur or executive whose time is precious. You would love to delegate the shopping and the ingredient research and simply show up glowing, ready to command any room.",
  },
  {
    t: "You are stretched thin",
    d: "A million products and zero bandwidth. You want a trusted skincare bestie to take the guesswork and the overwhelm off your plate, so you can breathe again.",
  },
  {
    t: "You give everything to everyone",
    d: "You care for the kids, the home, the world, and you come last. This is your ten minutes in the morning and fifteen at night, just for you, so you do not run on empty.",
  },
];

const vignettes = [
  {
    t: "A friendship across the ocean",
    d: "You are Polish and you connect with someone in Poland. You build a real relationship and visit one another. A lifelong friend, and a bucket list dream come true.",
  },
  {
    t: "A mentor who changes your path",
    d: "A struggling entrepreneur meets an established one who sees herself in you. She mentors you, it changes your life, and one day you pay it forward to someone else.",
  },
  {
    t: "A sister coast to coast",
    d: "A survivor on the east coast meets a survivor on the west coast. You help each other heal, and a safe place to land is offered when one of you needs it most.",
  },
];

const membership = {
  name: "The Polish Girl Inner Circle",
  tagline: "For the woman ready to fully invest in her skin and herself",
  price: "$500 or $600",
  cadence: "per month membership",
  features: [
    "2 x 60 min Zoom sessions per month with Nicole",
    "Complete in depth skincare bibliography: all day and night products curated for your skin, plus self love rituals",
    "Monthly product swap and shop: 3 new options when something stops working",
    "Weekly skincare questions answered by Nicole personally",
    "Monthly subscriber Zoom facial nights: drinks, facials, and sisterhood",
    "Access to our Skin Lovers Community (via Slack)",
    "Priority access to dermatologist connections at reduced rates, as we grow",
  ],
};

export default function InnerCirclePage() {
  return (
    <div id="top" className="bg-cream">
      <Nav />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[linear-gradient(160deg,#fbe3f0_0%,#f0a9da_44%,#c46fd8_100%)] px-6 pb-28 pt-36 sm:pb-36 sm:pt-44">
          <div className="pointer-events-none absolute -left-16 top-24 h-64 w-64 animate-floaty rounded-full bg-cream/40 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 animate-floaty-slow rounded-full bg-grape/30 blur-3xl" />
          <div className="pointer-events-none absolute bottom-8 left-1/3 h-56 w-56 animate-floaty rounded-full bg-magenta/25 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="eyebrow text-plum">The Polish Girl Inner Circle</p>
              <h1 className="mt-5 text-balance text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.05] text-plumdeep">
                More than skincare. Your chosen family.
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-[1.08rem] leading-relaxed text-plumdeep/80">
                The Inner Circle gives you the right products to transform your
                skin and the community you have been missing, so you can heal what
                life has left lonely. Friendship, laughter, support, and a place
                where you finally belong.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#join"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-plum px-8 py-4 text-sm font-medium text-cream shadow-[0_16px_44px_-14px_rgba(58,35,48,0.6)] transition-colors hover:bg-plumdeep"
                >
                  Join the Inner Circle
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#membership"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-plum/25 bg-cream/40 px-8 py-4 text-sm font-medium text-plumdeep backdrop-blur-sm transition-colors hover:bg-cream/70"
                >
                  See what is included
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* THE VISION */}
        <section id="vision" className="relative overflow-hidden bg-cream py-28 sm:py-36">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Reveal>
              <p className="eyebrow text-clay">Why a community</p>
              <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
                We care about the whole you.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-pretty text-[1.05rem] leading-relaxed text-espresso/80">
                Life is hard. Life can be lonely. At Polish Girl Skin Co. we do not
                just want to get you movie star skin and rebuild your self esteem.
                We care about you, the whole you. We do not aim to be your new
                skincare bestie and send you on your way. We aim to become family.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <blockquote className="mt-10 border-l-2 border-clay/50 pl-6 text-left font-display text-[clamp(1.3rem,2.6vw,1.9rem)] leading-snug text-plumdeep">
                Your new chosen family, here to walk with you through all the ups
                and downs of life.
              </blockquote>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-10 text-pretty text-[1.05rem] leading-relaxed text-espresso/80">
                We want to celebrate your successes, personal and professional. We
                want to host the monthly skincare Zoom where you meet your new best
                friend for life. And although the two of you may be oceans apart,
                you know in your heart you found the sister you were always longing
                for.
              </p>
            </Reveal>
          </div>
        </section>

        {/* BENEFITS */}
        <section id="benefits" className="relative overflow-hidden bg-sand py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <p className="eyebrow text-clay">What you receive</p>
                <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
                  Everything the membership gives you.
                </h2>
              </Reveal>
            </div>

            <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b, i) => (
                <Reveal key={b.t} delay={i * 0.06} className="h-full">
                  <GlowCard className="h-full rounded-[1.75rem]" glow="rgba(219,47,134,0.18)">
                    <div className="shine-border flex h-full flex-col rounded-[1.75rem] bg-ivory p-8 ring-1 ring-plum/10">
                      <h3 className="font-display text-2xl text-plumdeep">{b.t}</h3>
                      <p className="mt-4 text-pretty leading-relaxed text-espresso/75">
                        {b.d}
                      </p>
                    </div>
                  </GlowCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* INSIDE THE CIRCLE */}
        <section className="relative overflow-hidden bg-[linear-gradient(160deg,#fbe3f0_0%,#f0a9da_44%,#c46fd8_100%)] py-28 sm:py-36">
          <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 animate-floaty rounded-full bg-cream/40 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 right-1/4 h-56 w-56 animate-floaty-slow rounded-full bg-magenta/25 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow text-plum">Inside the circle</p>
                <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
                  What a monthly gathering feels like.
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 text-pretty text-[1.05rem] leading-relaxed text-plumdeep/80">
                  Each month, subscribers gather on Zoom to do a facial together and
                  talk skin, life, and dreams, building the kind of lasting,
                  meaningful friendships that propel every woman toward the life she
                  is creating.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <GlowCard tilt={6} glow="rgba(219,47,134,0.18)" className="rounded-[2rem]">
                <div className="shine-border glass rounded-[2rem] p-7 shadow-[0_40px_80px_-40px_rgba(42,20,48,0.5)] ring-1 ring-cream/60 sm:p-9">
                  <p className="font-display text-xl text-plumdeep">A night with us</p>
                  <ul className="mt-6 space-y-5">
                    {moments.map((m) => (
                      <li key={m.t} className="flex gap-4">
                        <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose/30 to-magenta/30 text-clay">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                            <path d="M5 12l5 5L20 6" />
                          </svg>
                        </span>
                        <div>
                          <p className="font-medium text-plumdeep">{m.t}</p>
                          <p className="text-sm leading-relaxed text-espresso/65">{m.d}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </Reveal>
          </div>
        </section>

        {/* WHO IT IS FOR */}
        <section className="relative overflow-hidden bg-cream py-28 sm:py-36">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <p className="eyebrow text-clay">Who it is for</p>
                <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
                  You belong here if...
                </h2>
              </Reveal>
            </div>

            <div className="mt-16 grid items-stretch gap-6 sm:grid-cols-2">
              {belong.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.06} className="h-full">
                  <div className="flex h-full flex-col rounded-[1.75rem] bg-mist p-8 ring-1 ring-plum/10 sm:p-9">
                    <h3 className="font-display text-2xl text-plumdeep">{p.t}</h3>
                    <p className="mt-4 text-pretty leading-relaxed text-espresso/75">{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WHERE THIS CAN LEAD */}
        <section className="relative overflow-hidden bg-plumdeep py-28 text-cream sm:py-36">
          <div className="pointer-events-none absolute -right-10 top-10 h-72 w-72 animate-glow rounded-full bg-grape/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-10 h-64 w-64 animate-floaty-slow rounded-full bg-magenta/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <p className="eyebrow text-goldlight">Where this can lead</p>
                <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-cream">
                  Life changing connections, all through the healing power of self care.
                </h2>
              </Reveal>
            </div>

            <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
              {vignettes.map((v, i) => (
                <Reveal key={v.t} delay={i * 0.08} className="h-full">
                  <div className="flex h-full flex-col rounded-[1.75rem] bg-cream/5 p-8 ring-1 ring-cream/15 backdrop-blur-sm">
                    <h3 className="font-display text-xl text-cream">{v.t}</h3>
                    <p className="mt-4 text-pretty leading-relaxed text-cream/75">{v.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-12 max-w-2xl text-pretty text-center leading-relaxed text-cream/75">
                The Polish Girl community is the bridge to the future in person
                community at L.I.L.A. Safe Haven. Every gathering, every friendship,
                every act of self care becomes a seed for something so much bigger.
              </p>
            </Reveal>
          </div>
        </section>

        {/* MEMBERSHIP */}
        <section id="membership" className="relative overflow-hidden bg-cream py-28 sm:py-36">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <Reveal>
                <p className="eyebrow text-clay">The membership</p>
                <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
                  Everything that is included.
                </h2>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <GlowCard className="mt-14 rounded-[1.75rem]" glow="rgba(255,255,255,0.22)">
                <div className="shine-border flex flex-col rounded-[1.75rem] bg-[linear-gradient(160deg,#5b2d54,#3a1c3a)] p-8 text-cream ring-1 ring-plum shadow-[0_40px_80px_-30px_rgba(94,58,73,0.7)] sm:p-10">
                  <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-medium tracking-wide text-goldlight">
                    ✦ Most loved
                  </span>
                  <h3 className="font-display text-2xl text-cream sm:text-3xl">{membership.name}</h3>
                  <p className="mt-1 text-sm text-cream/70">{membership.tagline}</p>

                  <ul className="mt-7 space-y-3">
                    {membership.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[0.95rem] leading-relaxed">
                        <span className="text-goldlight" aria-hidden>✦</span>
                        <span className="text-cream/85">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-cream/15 pt-5">
                    <p className="font-display text-3xl text-cream">{membership.price}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-cream/55">{membership.cadence}</p>
                  </div>

                  <a
                    href="#join"
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-plum transition-colors hover:bg-goldlight"
                  >
                    Join the Inner Circle
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </GlowCard>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 text-center text-[1.02rem] text-espresso/75">
                Prefer to talk it through first?{" "}
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-plum underline decoration-clay/50 underline-offset-4 transition-colors hover:text-clay"
                >
                  Book a consult with Nicole
                </a>
              </p>
            </Reveal>
          </div>
        </section>

        {/* JOIN */}
        <section id="join" className="relative overflow-hidden bg-sand py-28 sm:py-36">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <Reveal>
                <p className="eyebrow text-clay">Save your seat</p>
                <h2 className="mt-5 text-balance text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] text-plumdeep">
                  Come be part of the Inner Circle.
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mx-auto mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-espresso/75">
                  Tell us a little about you and what you are hoping to find. There
                  are no wrong answers, and no judgment here. Nicole reads every one.
                </p>
              </Reveal>
            </div>

            <div className="mt-14">
              <InnerCircleForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
