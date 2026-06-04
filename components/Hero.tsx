"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import CanvasErrorBoundary from "@/components/three/CanvasErrorBoundary";

const Scene3D = dynamic(() => import("@/components/three/Scene3D"), {
  ssr: false,
  loading: () => null,
});

const lines = [
  "Your Personal Skincare Concierge.",
  "Your Sisterhood.",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.18]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.11, delayChildren: 0.2 },
    },
  };
  const lineUp = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { y: "115%" },
        show: {
          y: "0%",
          transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
        },
      };
  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* base wash — also the graceful fallback if WebGL is unavailable */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(120%_90%_at_50%_-10%,#fff7f1_0%,#fbe9e2_38%,#f4d3ca_64%,#ecc0b7_100%)]" />

      {/* WebGL scene */}
      <motion.div
        style={{ scale: sceneScale, opacity: sceneOpacity }}
        className="absolute inset-0 -z-10"
      >
        <CanvasErrorBoundary fallback={null}>
          <Scene3D />
        </CanvasErrorBoundary>
      </motion.div>

      {/* legibility veils */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_45%,transparent_30%,rgba(250,244,238,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-cream" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="eyebrow text-clay"
        >
          Polish Girl Skin Co.
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-7 text-balance text-[clamp(2.6rem,7vw,5.75rem)] leading-[1.02] text-plumdeep"
        >
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.12em]">
              <motion.span variants={lineUp} className="block">
                {line}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span variants={lineUp} className="block">
              Your <span className="gold-text italic">Healing.</span>
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.55 }}
          className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-espresso/75 sm:text-lg"
        >
          Personalized, judgment-free skincare — curated for your skin, your life,
          and your budget by a woman who genuinely cares how you feel in it.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#connect"
            className="group inline-flex items-center gap-2 rounded-full bg-plum px-8 py-4 text-sm font-medium tracking-wide text-cream shadow-[0_14px_40px_-12px_rgba(94,58,73,0.6)] transition-all duration-300 hover:bg-clay hover:shadow-[0_18px_50px_-12px_rgba(184,111,99,0.6)]"
          >
            Book a Consultation
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#sisterhood"
            className="inline-flex items-center rounded-full border border-plum/25 px-8 py-4 text-sm font-medium tracking-wide text-plum transition-colors duration-300 hover:bg-plum/5"
          >
            Join the Sisterhood
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-11 w-7 items-start justify-center rounded-full border border-plum/30 p-1.5">
          <span className="h-2 w-1 animate-cue rounded-full bg-plum/60" />
        </div>
      </motion.div>
    </section>
  );
}
