"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const glass =
  "inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-medium tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/20";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-plumdeep">
      {/* full-bleed lavender field + warm, light legibility overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-lavender.jpg)" }}
      >
        {/* warm plum wash, left-biased so the copy stays legible without going dark */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(63,26,42,0.58)_0%,rgba(63,26,42,0.28)_44%,transparent_80%)]" />
        {/* golden glow from the sunset side for a warm, inviting feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(255,183,122,0.2)_0%,transparent_55%)]" />
      </div>
      {/* smooth handoff into the cream page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-cream" />

      <motion.div
        variants={reduce ? undefined : containerVariants}
        initial={reduce ? false : "hidden"}
        animate="visible"
        className="relative z-10 flex w-full max-w-4xl flex-col items-start px-6 text-left text-white md:px-12"
      >
        <motion.h1
          variants={itemVariants}
          className="w-full text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Your Personal Skincare Concierge. Your Sisterhood. Your{" "}
          <span className="aurora-text italic">Healing.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 w-full max-w-2xl text-pretty text-lg leading-8 text-white/85"
        >
          Personalized skincare without the judgment, curated for your skin, your
          life, and your budget by a woman who genuinely cares how you feel in it.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a href="#connect" className={cn(glass, "group gap-2")}>
            Book a Consultation
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a href="#sisterhood" className={glass}>
            Join the Sisterhood
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
