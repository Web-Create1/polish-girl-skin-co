import { CALENDLY } from "@/lib/site";

/**
 * HeroPoster: the static, dependency-light hero used for the server render and
 * the brief moment before HeroSwitch knows the viewport. It carries the real
 * <h1> (SEO / LCP) and mirrors the hero layout, so the hand-off to either the
 * desktop video or the mobile scroll-scrub is a single seamless frame swap —
 * no flash, no layout shift.
 */
export default function HeroPoster() {
  return (
    <section className="relative flex h-[100svh] w-full items-end overflow-hidden bg-plumdeep">
      <img
        src="/hero/poster.webp"
        alt="A woman walking through a golden-hour lavender field"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(20,8,24,0.85)_0%,rgba(20,8,24,0.2)_48%,rgba(20,8,24,0.35)_100%)]" />
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 text-center text-white">
        <p className="eyebrow text-white/75">Your skincare concierge</p>
        <h1 className="mt-4 text-balance text-5xl leading-[1.02] [text-shadow:0_2px_28px_rgba(20,8,24,0.55)] sm:text-6xl md:text-7xl">
          Skincare made <em className="aurora-text not-italic">personal.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-pretty text-lg text-white/85 [text-shadow:0_2px_28px_rgba(20,8,24,0.55)] sm:text-xl">
          Curated for your skin. And no one else&apos;s.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-medium tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Book a consultation <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
