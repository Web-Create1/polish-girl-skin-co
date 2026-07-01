"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { CALENDLY } from "@/lib/site";

/**
 * CinematicHeroVideo
 * ------------------
 * The serum-ritual hero (golden-hour lavender field -> serum on the wrist),
 * played as a real hardware-decoded <video> instead of a 120-frame canvas
 * scrub.
 *
 * Why this is smooth + high quality on mobile where the canvas version was not:
 *  - A <video> holds ~one decoded frame in memory; the old hero held 120 decoded
 *    WebP frames (~440 MB), which thrashed mobile memory and stuttered on fast
 *    scroll. The decoder is also hardware accelerated and renders at native
 *    resolution, so it looks crisp instead of an up-scaled 1.5x-DPR canvas.
 *  - The colour grade, watermark removal, edge-crop and a seamless crossfade
 *    loop are all BAKED INTO the file. That removes the per-frame canvas draw,
 *    the per-frame CSS filter, and the three stacked mix-blend layers that used
 *    to force a full-viewport GPU re-composite on every scroll tick.
 *  - Scroll now only drives GPU-composited transforms/opacity (a slow parallax
 *    push-in + the legibility scrim), so nothing runs per-frame on the main
 *    thread and Lenis stays perfectly smooth on phone and desktop alike.
 *
 * poster.webp is the video's own first frame, so the SSR / pre-play / LCP paint
 * matches the moment playback begins (no flash). An IntersectionObserver pauses
 * the decoder once the hero scrolls away, and prefers-reduced-motion gets the
 * static poster with no video at all.
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

function Copy() {
  return (
    <>
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
        <a href={CALENDLY} target="_blank" rel="noreferrer" className={cn(glass, "group")}>
          Book a consultation
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </a>
      </motion.div>
    </>
  );
}

export default function CinematicHeroVideo() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Only cheap, GPU-composited surfaces are scroll-driven. The scale stays >1 at
  // all times so the push-in never reveals an edge behind the object-cover video.
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const bottomScrim = useTransform(scrollYProgress, [0, 0.3, 1], [0.5, 0.62, 0.76]);
  const handoff = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  // Autoplay resilience (some iOS states reject the initial autoplay) + pause the
  // decoder whenever the hero is off-screen, so scrolling the rest of the page
  // never competes with video decode.
  useEffect(() => {
    if (reduce) return;
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) tryPlay();
          else v.pause();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  // ---------- reduced motion: static poster hero (grade already baked in) ----------
  if (reduce) {
    return (
      <section className="relative flex h-[100svh] w-full items-end overflow-hidden bg-plumdeep">
        <img
          src="/hero/poster.webp"
          alt="A lavender petal and serum on skin in a golden-hour lavender field"
          className="absolute inset-0 h-full w-full object-cover object-[50%_42%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(20,8,24,0.85)_0%,rgba(20,8,24,0.2)_48%,rgba(20,8,24,0.35)_100%)]" />
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 text-center text-white"
        >
          <p className="eyebrow text-white/75">Your skincare concierge</p>
          <div className="mt-4">
            <Copy />
          </div>
        </motion.div>
      </section>
    );
  }

  // ---------- cinematic autoplay video hero ----------
  return (
    <section ref={sectionRef} className="relative h-[130vh] w-full bg-plumdeep">
      <div className="sticky top-0 flex h-[100svh] w-full items-end overflow-hidden">
        <motion.video
          ref={videoRef}
          style={{ scale: mediaScale }}
          className="absolute inset-0 h-full w-full object-cover object-[50%_42%] [transform:translateZ(0)] [will-change:transform]"
          poster="/hero/poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden
          tabIndex={-1}
        >
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </motion.video>

        {/* Legibility + a whisper of brand mood. All PLAIN gradients (no
            mix-blend-mode) so the video layer never has to re-composite while it
            plays — this is the difference between smooth and janky on mobile. */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(124,58,180,0.10)_0%,transparent_32%,transparent_60%,rgba(91,45,84,0.18)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_16%,transparent_42%,rgba(20,8,24,0.42)_100%)]" />
        <motion.div
          aria-hidden
          style={{ opacity: bottomScrim }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-plumdeep via-plumdeep/55 to-transparent"
        />
        {/* handoff to the cream page below on the last stretch */}
        <motion.div
          aria-hidden
          style={{ opacity: handoff }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cream"
        />

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

        {/* copy block, bottom-anchored cinematic third — persistent, staggered in */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 text-center text-white sm:pb-28"
        >
          <Copy />
        </motion.div>

        {/* scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2 text-white/75"
        >
          <span className="eyebrow text-[0.62rem]">Scroll</span>
          <span className="animate-cue text-lg">↓</span>
        </motion.div>
      </div>
    </section>
  );
}
