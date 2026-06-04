"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const lines = ["Your Personal Skincare Concierge.", "Your Sisterhood."];

// deterministic soft bokeh (no Math.random → no hydration mismatch)
const bokeh = [
  { left: "8%", top: "24%", size: 120, hue: "var(--color-petal)", o: 0.5, d: "0s", dur: "9s" },
  { left: "78%", top: "18%", size: 170, hue: "var(--color-blush)", o: 0.45, d: "1.2s", dur: "11s" },
  { left: "62%", top: "62%", size: 140, hue: "var(--color-rose)", o: 0.35, d: "0.6s", dur: "10s" },
  { left: "22%", top: "68%", size: 100, hue: "#d9b8ec", o: 0.45, d: "2s", dur: "8.5s" },
  { left: "44%", top: "30%", size: 80, hue: "#ffffff", o: 0.4, d: "1.6s", dur: "12s" },
  { left: "88%", top: "52%", size: 110, hue: "var(--color-petal)", o: 0.35, d: "0.3s", dur: "9.5s" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 130]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* nature imagery — parallax + slow Ken Burns (served statically for reliability) */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-30">
        <div
          className="absolute inset-0 origin-center animate-kenburns bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/hero.jpg')",
            backgroundPosition: "center 45%",
          }}
          role="img"
          aria-label="A lavender field glowing at golden hour"
        />
      </motion.div>

      {/* violet / pink wash — palette + legibility */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(42,20,48,0.62)_0%,rgba(91,45,84,0.34)_42%,rgba(212,69,138,0.16)_68%,var(--color-cream)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(62%_52%_at_50%_40%,rgba(42,20,48,0.5)_0%,transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-cream" />

      {/* drifting bokeh */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {bokeh.map((b, i) => (
          <span
            key={i}
            className={reduce ? "absolute rounded-full blur-2xl" : "absolute animate-floaty rounded-full blur-2xl"}
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              background: b.hue,
              opacity: b.o,
              animationDelay: b.d,
              animationDuration: b.dur,
            }}
          />
        ))}
      </div>

      {/* content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center text-cream"
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="eyebrow text-blush"
        >
          Welcome, beautiful
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-7 text-balance text-[clamp(2.5rem,7vw,5.75rem)] leading-[1.03] drop-shadow-[0_2px_30px_rgba(42,20,48,0.45)]"
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
          className="mx-auto mt-8 max-w-xl text-pretty text-base leading-relaxed text-cream/85 sm:text-lg"
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
            className="group inline-flex items-center gap-2 rounded-full bg-clay px-8 py-4 text-sm font-medium tracking-wide text-white shadow-[0_16px_44px_-12px_rgba(212,69,138,0.7)] transition-all duration-300 hover:bg-rose hover:shadow-[0_20px_54px_-12px_rgba(224,122,166,0.7)]"
          >
            Book a Consultation
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#sisterhood"
            className="inline-flex items-center rounded-full border border-cream/40 bg-cream/5 px-8 py-4 text-sm font-medium tracking-wide text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-cream/15"
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
        <div className="flex h-11 w-7 items-start justify-center rounded-full border border-cream/50 p-1.5">
          <span className="h-2 w-1 animate-cue rounded-full bg-cream/80" />
        </div>
      </motion.div>
    </section>
  );
}
