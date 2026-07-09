"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { CALENDLY } from "@/lib/site";

/**
 * DesktopVideoHero
 * ----------------
 * The desktop-only hero: a muted, autoplaying, looping cinematic clip
 * (lavender field → serum-on-the-wrist ritual) that fills the viewport and
 * plays on its own to pull the reader in. A poster paints instantly under it
 * for a fast LCP, and all copy sits over plain gradient scrims (no mix-blend)
 * so nothing forces a re-composite while the video plays. Mobile keeps the
 * scroll-scrubbed CinematicHero; the switch lives in HeroSwitch.
 */

const glass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-medium tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/20";

const textShadow = "[text-shadow:0_2px_28px_rgba(20,8,24,0.55)]";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};
const item = {
  hidden: { y: 22, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function DesktopVideoHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex h-[100svh] w-full items-end overflow-hidden bg-plumdeep">
      {/* poster paints instantly (LCP) and stays as the fallback under the video */}
      <img
        src="/hero/lavender-poster.webp"
        alt="A woman walking through a golden-hour lavender field"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {!reduce && (
        <video
          className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero/lavender-poster.webp"
          aria-hidden
        >
          <source src="/hero/lavender-hero.webm" type="video/webm" />
          <source src="/hero/lavender-hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* depth + legibility — all PLAIN gradients (no mix-blend) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_18%,transparent_38%,rgba(20,8,24,0.42)_100%)]" />
      {/* top wash keeps the eyebrow legible over the bright sky */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-plumdeep/55 to-transparent" />
      {/* bottom wash carries the headline + hands off to the cream page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-plumdeep via-plumdeep/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-cream/90" />

      {/* eyebrow, pinned near the top */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={cn(
          "eyebrow absolute inset-x-0 top-24 z-10 text-center text-white/75 sm:top-28",
          textShadow,
        )}
      >
        Your skincare concierge
      </motion.p>

      {/* copy block, bottom-anchored cinematic third */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 text-center text-white sm:pb-28"
      >
        <motion.h1
          variants={item}
          className={cn(
            "text-balance text-5xl leading-[1.02] sm:text-6xl md:text-7xl",
            textShadow,
          )}
        >
          Skincare made <em className="aurora-text not-italic">personal.</em>
        </motion.h1>

        <motion.p
          variants={item}
          className={cn(
            "mx-auto mt-5 max-w-md text-pretty text-lg leading-8 text-white/85 sm:text-xl",
            textShadow,
          )}
        >
          Curated for your skin. And no one else&apos;s.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex justify-center">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className={cn(glass, "group")}
          >
            Book a consultation
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2 text-white/75"
      >
        <span className="eyebrow text-[0.62rem]">Scroll</span>
        <span className="animate-cue text-lg">↓</span>
      </motion.div>
    </section>
  );
}
