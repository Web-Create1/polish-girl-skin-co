"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);
  const orbY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 90, reduce ? 0 : -90]);

  return (
    <section id="story" className="relative bg-cream py-28 sm:py-36">
      <div ref={ref} className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* portrait / founder panel */}
        <div className="relative order-2 lg:order-1">
          <motion.div
            style={{ y: orbY }}
            className="absolute -left-6 -top-10 h-40 w-40 rounded-full bg-petal/45 blur-3xl"
          />
          <motion.div style={{ y: portraitY }} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-[linear-gradient(150deg,#f3c6dd_0%,#c75fa0_44%,#3a1c3a_100%)] shadow-[0_40px_80px_-30px_rgba(42,20,48,0.5)] ring-1 ring-plum/10">
              {/* subtle monogram + caption — drop a portrait of Nicole in here */}
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[11rem] leading-none text-cream/15 sm:text-[14rem]">
                PG
              </span>
              <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-cream/85 px-5 py-4 backdrop-blur-sm">
                <p className="font-display text-xl text-plumdeep">Nicole Kaminski</p>
                <p className="eyebrow mt-1 text-clay">Founder · Skincare Concierge</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* story copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow text-clay">Our Story</p>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
              Born from real life — and real healing.
            </h2>
          </Reveal>

          <div className="mt-7 space-y-5 text-pretty text-[1.02rem] leading-relaxed text-espresso/80">
            <Reveal delay={0.05}>
              <p>
                Polish Girl Skin Co. was founded by{" "}
                <span className="font-medium text-plum">Nicole Kaminski</span> — a
                domestic-violence survivor, entrepreneur, and self-confessed
                skincare shopaholic who spent years shopping at Sephora and Ulta
                before going on to work at both.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                All the while, she was quietly battling four skin conditions of her
                own. Along the way she learned what truly worked, which ingredients
                were actually safe, and what genuinely supported the skin barrier
                rather than damaging it.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                She turned that passion into purpose: helping women feel confident,
                beautiful, and cared for in their own skin again.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <blockquote className="mt-10 border-l-2 border-gold pl-6">
              <p className="font-display text-2xl italic leading-snug text-plum sm:text-[1.7rem]">
                “Because how we care for ourselves is part of how we heal.”
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
