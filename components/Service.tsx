import Reveal from "@/components/Reveal";
import GlowCard from "@/components/ui/GlowCard";

type Pillar = { title: string; body: string; icon: React.ReactNode };

const I = {
  heart: (
    <path d="M12 20.5C12 20.5 4 16 4 9.8 4 7 6.2 5 8.6 5c1.6 0 2.8.9 3.4 2 .6-1.1 1.8-2 3.4-2C19.8 5 22 7 22 9.8 22 16 12 20.5 12 20.5Z" />
  ),
  spark: (
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.4L12 17l-1.9-5.6L4.5 10l5.6-1.4L12 3Z" />
  ),
  shield: (
    <path d="M12 3l7 3v5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V6l7-3Zm-2.4 8.6 1.7 1.8 3.3-3.5" />
  ),
  leaf: (
    <path d="M5 19c-1-8 5-14 15-14 .5 9-4.5 15-13 15M8 16c2.5-3 5-5 8.5-6.5" />
  ),
};

const pillars: Pillar[] = [
  {
    title: "Judgment Free",
    body: "No shame, no pressure, no overwhelm. Just honest guidance that meets you exactly where you are.",
    icon: I.heart,
  },
  {
    title: "Education First",
    body: "You will understand the why behind every product, ingredient, and step, so the confidence stays with you.",
    icon: I.spark,
  },
  {
    title: "Trauma Aware",
    body: "Care that is as gentle with your story as it is with your skin barrier. You are safe here.",
    icon: I.shield,
  },
  {
    title: "Rooted in Compassion",
    body: "Real life expertise from a woman who has lived it, and who genuinely cares how you feel in your skin.",
    icon: I.leaf,
  },
];

export default function Service() {
  return (
    <section id="service" className="relative overflow-hidden bg-sand py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow text-clay">What We Do</p>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
              A personal concierge for your skin.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-pretty text-[1.05rem] leading-relaxed text-espresso/80">
              Polish Girl is a personalized skincare concierge service. Nicole
              personally researches and curates product recommendations matched to
              your unique skin concerns, lifestyle, and budget, guided by the
              thoughtful skincare questionnaires she designed just for you.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <GlowCard className="h-full rounded-3xl">
                <div className="shine-border flex h-full flex-col rounded-3xl bg-cream p-7 ring-1 ring-plum/10 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(219,47,134,0.45)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blush to-petal text-plum shadow-inner">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      {p.icon}
                    </svg>
                  </span>
                  <h3 className="mt-6 font-display text-xl text-plumdeep">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-espresso/70">
                    {p.body}
                  </p>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-16 max-w-3xl text-balance text-center font-display text-2xl leading-snug text-plum sm:text-3xl">
            No overwhelm. No guesswork. Just the right products for your skin, and a
            woman who genuinely cares.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
