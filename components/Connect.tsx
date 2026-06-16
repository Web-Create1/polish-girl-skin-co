import Reveal from "@/components/Reveal";
import GlowCard from "@/components/ui/GlowCard";
import { CALENDLY, EMAIL, IG, IG_HANDLE } from "@/lib/site";

const packages = [
  {
    name: "The Polish Girl Starter",
    tagline: "For the skincare minimalist ready to glow",
    price: "$99 or $149",
    cadence: "one time · 30 or 45 min",
    features: [
      "30 or 45 min 1:1 session with Nicole",
      "Full review of your current products: keep, toss, or swap",
      "Your personalized clean slate product edit",
    ],
    featured: false,
    cta: "Book this package",
  },
  {
    name: "The Polish Girl Ritual",
    tagline: "For the skincare enthusiast ready to level up",
    price: "$250 or $300",
    cadence: "one time · 60 min",
    features: [
      "60 min 1:1 Zoom session with Nicole",
      "Personalized skincare bibliography: a complete product roadmap from morning to night",
      "Access to our Skin Lovers Community (via Slack)",
      "3 follow up questions answered after your session",
    ],
    featured: true,
    cta: "Book this package",
  },
  {
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
    featured: false,
    cta: "Join the Inner Circle",
  },
];

const ways = [
  "Book the personalized consultation package that fits you",
  "Join the Inner Circle monthly membership",
  `Follow along on Instagram ${IG_HANDLE}`,
  "Reach out about how Polish Girl funds L.I.L.A. Safe Haven",
  "Get involved: invest, fundraise, or spread the word",
];

export default function Connect() {
  return (
    <section id="connect" className="relative overflow-hidden bg-cream py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow text-clay">How to Connect</p>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
              Choose your path.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-pretty text-[1.05rem] leading-relaxed text-espresso/80">
              Find the right level of support for exactly where you are right now.
              Every package begins with a conversation.
            </p>
          </Reveal>
        </div>

        {/* package cards */}
        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="h-full">
              <GlowCard
                className="h-full rounded-[1.75rem]"
                glow={p.featured ? "rgba(255,255,255,0.22)" : "rgba(219,47,134,0.2)"}
              >
                <div
                  className={`shine-border flex h-full flex-col rounded-[1.75rem] p-8 ring-1 transition-shadow duration-300 ${
                    p.featured
                      ? "bg-[linear-gradient(160deg,#5b2d54,#3a1c3a)] text-cream ring-plum shadow-[0_40px_80px_-30px_rgba(94,58,73,0.7)]"
                      : "bg-ivory text-espresso ring-plum/10 hover:shadow-[0_30px_60px_-30px_rgba(94,58,73,0.4)]"
                  }`}
                >
                  {p.featured && (
                    <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-medium tracking-wide text-goldlight">
                      ✦ Most loved
                    </span>
                  )}
                  <h3
                    className={`font-display text-2xl ${
                      p.featured ? "text-cream" : "text-plumdeep"
                    }`}
                  >
                    {p.name}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      p.featured ? "text-cream/70" : "text-clay"
                    }`}
                  >
                    {p.tagline}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[0.95rem] leading-relaxed">
                        <span
                          className={p.featured ? "text-goldlight" : "text-clay"}
                          aria-hidden
                        >
                          ✦
                        </span>
                        <span className={p.featured ? "text-cream/85" : "text-espresso/75"}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex-1" />
                  <div className={`mb-5 border-t pt-5 ${p.featured ? "border-cream/15" : "border-plum/10"}`}>
                    <p className={`font-display text-3xl ${p.featured ? "text-cream" : "text-plumdeep"}`}>
                      {p.price}
                    </p>
                    <p className={`mt-1 text-xs uppercase tracking-wide ${p.featured ? "text-cream/55" : "text-espresso/45"}`}>
                      {p.cadence}
                    </p>
                  </div>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors ${
                      p.featured
                        ? "bg-cream text-plum hover:bg-goldlight"
                        : "bg-plum text-cream hover:bg-clay"
                    }`}
                  >
                    {p.cta}
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-[1.02rem] text-espresso/75">
            Not sure which to choose?{" "}
            <a
              href="/intake"
              className="font-medium text-plum underline decoration-clay/50 underline-offset-4 transition-colors hover:text-clay"
            >
              Start with the skincare intake form
            </a>
          </p>
        </Reveal>

        {/* ways to connect + contact */}
        <div className="mt-10 grid gap-6 overflow-hidden rounded-[2rem] bg-sand ring-1 ring-plum/10 lg:grid-cols-2">
          <div className="p-9 sm:p-11">
            <Reveal>
              <h3 className="font-display text-2xl text-plumdeep">
                Ways to get involved
              </h3>
              <ul className="mt-6 space-y-4">
                {ways.map((w) => (
                  <li key={w} className="flex gap-3 leading-relaxed text-espresso/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden bg-plumdeep p-9 text-cream sm:p-11">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 animate-glow rounded-full bg-grape/25 blur-3xl" />
            <Reveal>
              <p className="eyebrow text-goldlight">Let’s begin</p>
              <p className="mt-4 font-display text-3xl leading-tight text-cream">
                Ready when you are.
              </p>
              <p className="mt-4 leading-relaxed text-cream/75">
                Reach out and Nicole will personally help you find the right place
                to start.
              </p>
              <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-plum transition-colors hover:bg-goldlight"
                >
                  Book on Calendly
                  <span aria-hidden>→</span>
                </a>
                <a
                  href={`mailto:${EMAIL}?subject=Polish%20Girl%20Skin%20Co.%20Hello`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                >
                  Email Nicole
                </a>
                <a
                  href={IG}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                >
                  Follow on Instagram
                </a>
              </div>
              <p className="mt-6 text-sm text-cream/60">{EMAIL}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
