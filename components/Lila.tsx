import Reveal from "@/components/Reveal";
import Sparkles from "@/components/ui/Sparkles";
import { EMAIL } from "@/lib/site";

export default function Lila() {
  return (
    <section
      id="lila"
      className="relative overflow-hidden bg-plumdeep py-32 text-cream sm:py-40"
    >
      {/* sanctuary glow + drifting light */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full bg-[radial-gradient(circle,rgba(164,85,194,0.4)_0%,rgba(219,47,134,0.2)_45%,transparent_70%)]" />
      <Sparkles
        className="opacity-80"
        density={22}
        colors={["#ffffff", "#ddb6f0", "#f3b4d4", "#8b5cf6"]}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="eyebrow text-goldlight">Skincare With a Mission</p>
          <h2 className="mt-6 text-balance text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05]">
            L.I.L.A. <span className="aurora-text">Safe Haven</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-cream/80">
            Portions of every sale go toward building L.I.L.A. Safe Haven, Nicole&apos;s
            future healing sanctuary for survivors of trauma. When you care for your
            skin with Polish Girl, you help build a place where others can begin to
            heal, too.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mx-auto mt-12 h-px w-24 bg-gold/50" />
          <p className="mt-12 font-display text-2xl italic leading-snug text-cream sm:text-3xl">
            “Every act of self care becomes a seed for someone else&apos;s safe place
            to land.”
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <a
            href={`mailto:${EMAIL}?subject=L.I.L.A.%20Safe%20Haven%3A%20Getting%20Involved`}
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-gold/50 px-8 py-4 text-sm font-medium text-goldlight transition-colors hover:bg-gold/10"
          >
            Learn how Polish Girl funds L.I.L.A.
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
