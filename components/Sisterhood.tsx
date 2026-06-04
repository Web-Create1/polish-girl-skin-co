import Reveal from "@/components/Reveal";

const moments = [
  { t: "Grab your favorite drink", d: "Coffee, tea, or a glass of wine — come as you are." },
  { t: "Do a facial together", d: "A shared ritual of slowing down and caring for yourself." },
  { t: "Talk skin, life & dreams", d: "Real conversation in a soft place to land." },
  { t: "Build a true sisterhood", d: "Friendships and connections that propel you forward." },
];

export default function Sisterhood() {
  return (
    <section
      id="sisterhood"
      className="relative overflow-hidden bg-[linear-gradient(160deg,#fbe3f0_0%,#f0c9e6_44%,#d49bd0_100%)] py-28 sm:py-36"
    >
      {/* ambient floating orbs */}
      <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 animate-floaty rounded-full bg-cream/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 animate-floaty-slow rounded-full bg-gold/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-56 w-56 animate-floaty rounded-full bg-plum/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-plum">The Bigger Vision</p>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
              More than skincare. A sisterhood.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 text-pretty text-[1.05rem] leading-relaxed text-plumdeep/80">
              Polish Girl is a growing community of women empowering, uplifting,
              and healing one another — through connection, self-care, and shared
              sisterhood.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-plumdeep/80">
              Each month, subscribers gather on Zoom to do a facial together and
              talk skin, life, and dreams — building the kind of lasting,
              meaningful friendships and professional connections that propel every
              woman toward the life she’s creating.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="mailto:nmka@uoregon.edu?subject=Joining%20the%20Polish%20Girl%20Sisterhood"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-plum px-8 py-4 text-sm font-medium text-cream shadow-[0_16px_44px_-14px_rgba(58,35,48,0.6)] transition-colors hover:bg-plumdeep"
            >
              Join the Monthly Community
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-[2rem] bg-cream/70 p-7 shadow-[0_40px_80px_-40px_rgba(42,20,48,0.5)] ring-1 ring-cream/60 backdrop-blur-md sm:p-9">
            <p className="font-display text-xl text-plumdeep">
              What a gathering feels like
            </p>
            <ul className="mt-6 space-y-5">
              {moments.map((m) => (
                <li key={m.t} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose/20 text-clay">
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
        </Reveal>
      </div>
    </section>
  );
}
