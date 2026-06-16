"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import AuroraBackground from "@/components/ui/AuroraBackground";
import Sparkles from "@/components/ui/Sparkles";
import FloatingOrbs3D from "@/components/ui/FloatingOrbs3D";
import Magnetic from "@/components/ui/Magnetic";

const lines = ["Your Personal Skincare Concierge.", "Your Sisterhood."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const auroraScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
  };
  const lineUp = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { y: "115%" },
        show: { y: "0%", transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] } },
      };
  const fadeUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[linear-gradient(165deg,#2a1430_0%,#5b2d54_38%,#a4318a_72%,#db2f86_100%)]"
    >
      {/* vibrant drifting aurora + sparkle field + depth-stacked 3D orbs */}
      <motion.div style={{ scale: auroraScale }} className="absolute inset-0 -z-20">
        <AuroraBackground intensity="bold" className="opacity-90" />
      </motion.div>
      <Sparkles className="-z-10" density={30} />
      <div className="absolute inset-0 -z-10">
        <FloatingOrbs3D />
      </div>

      {/* legibility vignette + smooth handoff into the cream page below */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_42%,rgba(20,8,24,0.45)_0%,transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-b from-transparent to-cream" />

      {/* content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center text-cream"
      >
        <motion.img
          src="/logo-mark.png"
          alt="Polish Girl Skin Co."
          width={88}
          height={88}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mx-auto mb-6 h-16 w-16 rounded-full ring-1 ring-cream/40 shadow-[0_18px_50px_-12px_rgba(20,8,24,0.6)] sm:h-[5.5rem] sm:w-[5.5rem]"
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="eyebrow inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-blush backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-blush" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blush" />
          </span>
          Welcome, beautiful
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-7 text-balance text-[clamp(2.5rem,7vw,5.75rem)] leading-[1.03] drop-shadow-[0_2px_40px_rgba(20,8,24,0.55)]"
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
              Your <span className="aurora-text italic">Healing.</span>
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.55 }}
          className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-cream/90 sm:text-lg"
        >
          Personalized skincare without the judgment, curated for your skin, your
          life, and your budget by a woman who genuinely cares how you feel in it.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <a
              href="#connect"
              className="group inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-sm font-medium tracking-wide text-plum shadow-[0_18px_50px_-12px_rgba(219,47,134,0.85)] transition-all duration-300 hover:bg-blush hover:shadow-[0_24px_64px_-12px_rgba(219,47,134,0.95)]"
            >
              Book a Consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#sisterhood"
              className="inline-flex items-center rounded-full border border-cream/45 bg-cream/5 px-8 py-4 text-sm font-medium tracking-wide text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-cream/15"
            >
              Join the Sisterhood
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-11 w-7 items-start justify-center rounded-full border border-cream/50 p-1.5">
          <span className="h-2 w-1 animate-cue rounded-full bg-cream/80" />
        </div>
      </motion.div>
    </section>
  );
}
