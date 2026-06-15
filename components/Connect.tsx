import Reveal from "@/components/Reveal";
import GlowCard from "@/components/ui/GlowCard";

const EMAIL = "nmka@uoregon.edu";
const IG = "https://instagram.com/polishgirlskinco";

const packages = [
  {
    name: "The Refresh",
    tagline: "A focused starting point",
    features: [
      "Consult on one or two key concerns",
      "Personalized product picks",
      "Clear guidance on how to use it",
    ],
    featured: false,
    subject: "The%20Refresh%3A%20Skincare%20Consultation",
  },
  {
    name: "The Full Routine",
    tagline: "Your complete AM and PM",
    features: [
      "Full routine built around your skin",
      "Matched to lifestyle and budget",
      "Education behind every step",
      "Barrier first, safe ingredients",
    ],
    featured: true,
    subject: "The%20Full%20Routine%3A%20Skincare%20Consultation",
  },
  {
    name: "The Concierge",
    tagline: "Ongoing, evolving care",
    features: [
      "Everything in The Full Routine",
      "We revisit as your skin changes",
      "Priority product guidance",
    ],
    featured: false,
    subject: "The%20Concierge%3A%20Ongoing%20Skincare%20Support",
  },
];

const ways = [
  "Book the personalized consultation package that fits you",
  "Join our monthly subscriber community",
  "Follow along on Instagram @polishgirlskinco",
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
                  <div
                    className={`mb-5 text-sm ${
                      p.featured ? "text-cream/60" : "text-espresso/50"
                    }`}
                  >
                    Pricing by inquiry
                  </div>
                  <a
                    href={`mailto:${EMAIL}?subject=${p.subject}`}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors ${
                      p.featured
                        ? "bg-cream text-plum hover:bg-goldlight"
                        : "bg-plum text-cream hover:bg-clay"
                    }`}
                  >
                    Book {p.name}
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>

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
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${EMAIL}?subject=Polish%20Girl%20Skin%20Co.%20Hello`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-plum transition-colors hover:bg-goldlight"
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
