import Reveal from "@/components/Reveal";

const features = [
  { t: "All-natural & organic", d: "Clean Polish ingredients, chosen to love your skin barrier." },
  { t: "Grown on L.I.L.A.’s land", d: "Cultivated where the sanctuary takes root." },
  { t: "Bottled by survivors", d: "Made with care, by hands that are healing." },
  { t: "Farm-fresh to your door", d: "Shipped fresh — every package tells L.I.L.A.’s story." },
];

const Leaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M5 19c-1-8 5-14 15-14 .5 9-4.5 15-13 15" />
    <path d="M8 16c2.5-3 5-5 8.5-6.5" />
  </svg>
);

export default function Future() {
  return (
    <section className="relative bg-[radial-gradient(120%_120%_at_85%_0%,#efe6f6_0%,#fbf2f7_55%)] py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow text-sage">What’s Growing Next</p>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
              A skincare line, grown with love.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-pretty text-[1.05rem] leading-relaxed text-espresso/80">
              As Polish Girl grows, Nicole plans to launch a skincare line featuring
              all-natural, organic Polish ingredients — grown on L.I.L.A.’s land,
              bottled by survivors, and shipped farm-fresh to your door.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.t} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl bg-cream/80 p-7 ring-1 ring-sage/25 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(110,63,134,0.35)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/15 text-sage">
                  <Leaf />
                </span>
                <h3 className="mt-6 font-display text-lg text-plumdeep">{f.t}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-espresso/70">
                  {f.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-cream/60 px-5 py-2 text-sm font-medium tracking-wide text-sage">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              On the horizon
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
