"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";

const steps = [
  {
    n: "01",
    title: "Share your skin story",
    body: "Answer a thoughtful questionnaire about your skin concerns, lifestyle, current routine, and budget. The more honest, the better.",
  },
  {
    n: "02",
    title: "Nicole curates for you",
    body: "She personally researches and handpicks the products and ingredients matched to you. Safe, effective, and kind to your skin barrier.",
  },
  {
    n: "03",
    title: "Glow with confidence",
    body: "Receive your personalized routine with the education to actually use it, and a concierge who stays in your corner.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative overflow-hidden bg-cream py-28 sm:py-36">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <Reveal>
            <p className="eyebrow text-clay">How It Works</p>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.1] text-plumdeep">
              Simple, personal, and entirely about you.
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute bottom-2 left-[21px] top-2 w-px bg-plum/12" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute bottom-2 left-[21px] top-2 w-px origin-top bg-[linear-gradient(180deg,#db2f86,#8b5cf6,#e96aa3)]"
          />

          <div className="space-y-12">
            {steps.map((s) => (
              <Reveal key={s.n}>
                <div className="group relative grid grid-cols-[44px_1fr] gap-5">
                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-magenta to-grape font-display text-cream shadow-[0_10px_30px_-8px_rgba(219,47,134,0.7)] ring-4 ring-cream transition-transform duration-300 group-hover:scale-110">
                    {s.n}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-display text-2xl text-plumdeep">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-espresso/75">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
