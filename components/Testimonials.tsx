import Reveal from "@/components/Reveal";
import CardStack3D, { type StackCard } from "@/components/ui/CardStack3D";

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-clay" aria-hidden>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const testimonials = [
  {
    quote:
      "I finally understand my skin. Nicole took the guesswork out and built me a routine that actually works. No overwhelm, no judgment.",
    name: "Maya R.",
    role: "Concierge client",
    initial: "M",
    grad: "from-petal to-rose",
  },
  {
    quote:
      "It felt like talking to a friend who happens to be a skin expert. My barrier has never been happier, and neither have I.",
    name: "Jess T.",
    role: "Full Routine client",
    initial: "J",
    grad: "from-rose to-grape",
  },
  {
    quote:
      "I came for skincare and found a sisterhood. The monthly gatherings genuinely lift me up. It has become my favorite night.",
    name: "Priya K.",
    role: "Monthly member",
    initial: "P",
    grad: "from-grape to-plum",
  },
];

const cards: StackCard[] = testimonials.map((t) => ({
  id: t.name,
  content: (
    <figure className="flex h-full flex-col rounded-[1.75rem] bg-ivory p-9 text-left shadow-[0_34px_80px_-34px_rgba(94,45,84,0.45)] ring-1 ring-plum/10 sm:p-11">
      <div className="flex gap-1" aria-label="Rated 5 out of 5">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} />
        ))}
      </div>
      <blockquote className="mt-6 flex-1 text-pretty font-display text-xl leading-relaxed text-plumdeep sm:text-2xl">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.grad} font-display text-lg text-white`}
        >
          {t.initial}
        </span>
        <span>
          <span className="block font-medium text-plumdeep">{t.name}</span>
          <span className="block text-sm text-clay">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  ),
}));

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-mist py-28 sm:py-36">
      {/* soft violet + pink glow */}
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-grape/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-rose/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow text-clay">Kind Words</p>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
              Women are feeling the difference.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-sm text-espresso/55">
              Drag, tap a dot, or let it drift.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <CardStack3D cards={cards} className="mt-14" />
        </Reveal>
      </div>
    </section>
  );
}
