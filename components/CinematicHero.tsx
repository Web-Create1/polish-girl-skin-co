"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { CALENDLY } from "@/lib/site";

/**
 * CinematicHero
 * -------------
 * A scroll-scrubbed image-sequence hero. As the reader scrolls the top of the
 * page, 60 WebP frames (900x1600) are drawn to a <canvas> and advanced by scroll
 * position, so the golden-hour lavender-field-to-serum-on-the-wrist ritual plays
 * forward. Canvas (not <video>) because iOS Safari makes scroll-driven
 * video.currentTime janky; a pre-decoded frame sequence scrubs buttery-smooth.
 *
 * Tuned for quality AND performance on mobile:
 *  - The colour grade, generator-watermark removal and edge crop are BAKED INTO
 *    the frames. So there is no per-frame ctx.filter, no CSS filter on the moving
 *    canvas, and no stacked mix-blend colour layers over it — those forced a
 *    full-viewport GPU re-composite on every scroll tick and were the old jank.
 *    Only plain (non-blend) legibility scrims remain.
 *  - 60 frames at 900x1600 instead of 120 at 720x1280: less decoded-image memory
 *    (~350 MB vs ~440 MB, so no decode thrash on fast scroll) AND higher
 *    resolution, so the canvas stays crisp at a 2x DPR backing store instead of
 *    the previous soft 1.5x cap.
 *  - Draws run off refs + a single rAF (never setState per scroll frame), with an
 *    early-out when the resolved frame index is unchanged, so Lenis stays smooth.
 *  - poster.webp (the graded first frame) is the SSR / no-JS / LCP paint under
 *    the canvas; prefers-reduced-motion gets just the poster + copy.
 */

const FRAME_COUNT = 60;
const frameSrc = (i: number) =>
  `/hero-frames/frame_${String(i + 1).padStart(3, "0")}.webp`;

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

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  iw: number,
  ih: number,
  cw: number,
  ch: number,
  scale: number,
) {
  const s = Math.max(cw / iw, ch / ih) * scale;
  const dw = iw * s;
  const dh = ih * s;
  ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
}

export default function CinematicHero() {
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const progressRef = useRef(0);
  const currentFrameRef = useRef(-1);
  const rafRef = useRef<number | null>(null);

  const [loadPct, setLoadPct] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // scroll-driven surfaces (safe: these only strengthen a scrim / hide a cue)
  const cueOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const bottomScrim = useTransform(scrollYProgress, [0, 0.25, 1], [0.42, 0.58, 0.72]);
  const handoff = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  const paint = useCallback(() => {
    rafRef.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const p = progressRef.current;
    let idx = Math.round(p * (FRAME_COUNT - 1));
    idx = Math.max(0, Math.min(FRAME_COUNT - 1, idx));

    // fall back to the nearest already-loaded frame to avoid blanks on fast scroll
    let srcIdx = idx;
    if (!loadedRef.current[srcIdx]) {
      while (srcIdx >= 0 && !loadedRef.current[srcIdx]) srcIdx--;
    }
    if (srcIdx < 0) return;

    // Nothing to do if the same frame would land on screen again — skip the
    // redundant clear+draw so micro-scrolls don't burn paints on mobile.
    if (srcIdx === currentFrameRef.current) return;

    const img = imagesRef.current[srcIdx];
    if (!img || !img.naturalWidth) return;

    const scale = 1.07 - 0.07 * Math.min(1, Math.max(0, p)); // slow push-in
    // High-quality resampling so the frames stay crisp as the canvas scales them
    // to fill the viewport (helps the mobile downscale and the wide-desktop
    // upscale alike). Context state resets on backing-store resize, so set here.
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Grade is baked into the frames, so the per-frame draw is just a plain
    // cover blit — no filter, no blend, nothing extra per scroll tick.
    drawCover(ctx, img, img.naturalWidth, img.naturalHeight, canvas.width, canvas.height, scale);
    currentFrameRef.current = srcIdx;
  }, []);

  const schedule = useCallback(() => {
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(paint);
  }, [paint]);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // 900px-wide frames feed a 2x DPR backing store nearly 1:1, so the scrub is
    // crisp without over-filling the canvas. With the grade baked into the frames
    // there is no per-frame filter cost forcing us down to the old 1.5x cap.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    currentFrameRef.current = -1;
    schedule();
  }, [schedule]);

  // preload the sequence (skip entirely under reduced motion)
  useEffect(() => {
    if (reduce) return;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
    imagesRef.current = images;
    loadedRef.current = loaded;
    let done = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      const mark = () => {
        loaded[i] = true;
        done += 1;
        setLoadPct(Math.round((done / FRAME_COUNT) * 100));
        const need = Math.round(progressRef.current * (FRAME_COUNT - 1));
        if (i === need || done === 1) schedule();
      };
      img.onload = mark;
      img.onerror = () => {
        done += 1;
        setLoadPct(Math.round((done / FRAME_COUNT) * 100));
      };
      img.src = frameSrc(i);
      if (img.complete && img.naturalWidth) mark();
      images[i] = img;
    }
  }, [reduce, schedule]);

  // size + keep sized
  useEffect(() => {
    if (reduce) return;
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
    };
  }, [reduce, resize]);

  // scroll -> progress -> draw
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    progressRef.current = p;
    schedule();
  });

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  // ---------- reduced motion: static poster hero (grade already baked in) ----------
  if (reduce) {
    return (
      <section className="relative flex h-[100svh] w-full items-end overflow-hidden bg-plumdeep">
        <img
          src="/hero/poster.webp"
          alt="A woman walking through a golden-hour lavender field"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(20,8,24,0.85)_0%,rgba(20,8,24,0.2)_48%,rgba(20,8,24,0.35)_100%)]" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 text-center text-white">
          <p className="eyebrow text-white/75">Your skincare concierge</p>
          <h1 className={cn("mt-4 text-balance text-5xl leading-[1.02] sm:text-6xl", textShadow)}>
            Skincare made <em className="aurora-text not-italic">personal.</em>
          </h1>
          <p className={cn("mx-auto mt-5 max-w-md text-pretty text-lg text-white/85", textShadow)}>
            Curated for your skin. And no one else&apos;s.
          </p>
          <div className="mt-8 flex justify-center">
            <a href={CALENDLY} target="_blank" rel="noreferrer" className={glass}>
              Book a consultation <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ---------- scroll-scrubbed cinematic hero ----------
  return (
    <section ref={sectionRef} className="relative h-[260vh] w-full bg-plumdeep">
      <div className="sticky top-0 flex h-[100svh] w-full items-end overflow-hidden">
        {/* SSR / no-JS / LCP paint — the canvas draws over this once ready */}
        <img
          src="/hero/poster.webp"
          alt="A woman walking through a golden-hour lavender field"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full [transform:translateZ(0)] [will-change:transform]"
        />

        {/* depth + legibility — all PLAIN gradients (no mix-blend), so the canvas
            never has to re-composite a blended stack while it scrubs */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_85%_at_50%_18%,transparent_38%,rgba(20,8,24,0.4)_100%)]" />
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
          <motion.h1
            variants={item}
            className={cn("text-balance text-5xl leading-[1.02] sm:text-6xl md:text-7xl", textShadow)}
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
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
          </motion.div>
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

        {/* unobtrusive first-load progress, fades out when the sequence is in */}
        {loadPct < 100 && (
          <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-white/10">
            <div
              className="h-full bg-[linear-gradient(90deg,#d4458a,#8b5cf6,#e07aa6)] transition-[width] duration-300"
              style={{ width: `${loadPct}%` }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
