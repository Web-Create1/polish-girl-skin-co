"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import GlowCard from "@/components/ui/GlowCard";

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);
  const orbY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 90, reduce ? 0 : -90]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -70, reduce ? 0 : 70]);

  return (
    <section id="story" className="relative overflow-hidden bg-cream py-28 sm:py-36">
      <div ref={ref} className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* portrait / founder panel */}
        <div className="relative order-2 lg:order-1">
          <motion.div
            style={{ y: orbY }}
            className="absolute -left-6 -top-10 h-44 w-44 rounded-full bg-magenta/35 blur-3xl"
          />
          <motion.div
            style={{ y: orbY2 }}
            className="absolute -right-4 bottom-0 h-40 w-40 rounded-full bg-grape/30 blur-3xl"
          />
          <motion.div style={{ y: portraitY }} className="relative">
            <GlowCard tilt={9} glow="rgba(255,255,255,0.28)" className="rounded-[2.25rem]">
              <div className="shine-border relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-[linear-gradient(150deg,#f9d4e8_0%,#db2f86_46%,#3a1c3a_100%)] shadow-[0_40px_90px_-30px_rgba(42,20,48,0.6)] ring-1 ring-plum/10">
                {/* subtle monogram + caption. Drop a portrait of Nicole in here. */}
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[11rem] leading-none text-cream/15 sm:text-[14rem]">
                  PG
                </span>
                <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-cream/85 px-5 py-4 backdrop-blur-sm">
                  <p className="font-display text-xl text-plumdeep">Nicole Kaminski</p>
                  <p className="eyebrow mt-1 text-clay">Founder · Skincare Concierge</p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        {/* story copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow text-clay">Our Story</p>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
              Born from real life and real healing.
            </h2>
          </Reveal>

          <div className="mt-7 space-y-5 text-pretty text-[1.02rem] leading-relaxed text-espresso/80">
            <Reveal delay={0.05}>
              <p>
                Polish Girl Skin Co. was founded by{" "}
                <span className="font-medium text-plum">Nicole Kaminski</span>, a
                domestic violence survivor, entrepreneur, and lifelong skincare
                shopaholic who spent years shopping at Sephora and Ulta before going
                on to work at both.
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
            <blockquote className="mt-10 border-l-2 border-magenta pl-6">
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
