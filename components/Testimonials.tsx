"use client";

import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Reveal from "@/components/Reveal";

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-clay" aria-hidden>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const testimonials = [
  {
    quote:
      "I finally understand my skin. Nicole took the guesswork out and built me a routine that actually works. No overwhelm, no judgment.",
    name: "Maya R.",
    role: "Concierge client",
    initial: "M",
    grad: "from-petal to-rose",
  },
  {
    quote:
      "It felt like talking to a friend who happens to be a skin expert. My barrier has never been happier, and neither have I.",
    name: "Jess T.",
    role: "Full Routine client",
    initial: "J",
    grad: "from-rose to-grape",
  },
  {
    quote:
      "I came for skincare and found a sisterhood. The monthly gatherings genuinely lift me up. It has become my favorite night.",
    name: "Priya K.",
    role: "Monthly member",
    initial: "P",
    grad: "from-grape to-plum",
  },
];

const INTERVAL = 6000;

export default function Testimonials() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  const go = useCallback((next: number) => setActive((next + n) % n), [n]);

  useEffect(() => {
    if (paused || n <= 1) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), INTERVAL);
    return () => clearInterval(id);
  }, [paused, n]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70) go(active + 1);
    else if (info.offset.x > 70) go(active - 1);
  };

  return (
    <section className="relative overflow-hidden bg-mist py-28 sm:py-36">
      {/* soft violet + pink glow */}
      <div className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-grape/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-rose/10 blur-3xl" />
      {/* whisper of lavender, art-directed into the corner */}
      <img
        src="/img/lavender.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 hidden w-[26rem] rounded-[3rem] opacity-[0.14] [mask-image:radial-gradient(circle_at_70%_70%,#000,transparent_70%)] sm:block"
      />

      <div className="relative mx-auto max-w-3xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-clay">Kind Words</p>
            <h2 className="mt-5 text-balance text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.08] text-plumdeep">
              Women are feeling the difference.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="group relative mt-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {/* stacked-paper depth — purely decorative, never holds content so
                nothing can clip. Sits a touch behind the live card. */}
            <div
              aria-hidden
              className="absolute inset-x-6 -bottom-3 top-3 rounded-[1.75rem] bg-ivory/50 ring-1 ring-plum/5 sm:inset-x-8"
            />
            <div
              aria-hidden
              className="absolute inset-x-3 -bottom-1.5 top-1.5 rounded-[1.75rem] bg-ivory/70 ring-1 ring-plum/[0.07]"
            />

            {/* live card — a CSS grid stack: every quote shares one cell, so the
                card is always as tall as the longest quote at the current width.
                No fixed height, no overflow, no clipping. */}
            <motion.div
              className="relative grid cursor-grab touch-pan-y active:cursor-grabbing"
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              dragSnapToOrigin
              onDragEnd={onDragEnd}
            >
              {testimonials.map((t, i) => {
                const isActive = i === active;
                return (
                  <figure
                    key={t.name}
                    aria-hidden={!isActive}
                    className={`col-start-1 row-start-1 flex flex-col rounded-[1.75rem] bg-ivory p-8 text-left shadow-[0_34px_80px_-34px_rgba(94,45,84,0.45)] ring-1 ring-plum/10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-11 ${
                      isActive
                        ? "z-10 translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none translate-y-3 scale-[0.97] opacity-0"
                    }`}
                  >
                    <svg
                      viewBox="0 0 32 32"
                      aria-hidden
                      className="h-9 w-9 text-petal"
                      fill="currentColor"
                    >
                      <path d="M13 8c-3.9 1.6-6 4.8-6 9.2V24h8v-8h-4c0-2.5 1-4.2 3.2-5.4L13 8Zm12 0c-3.9 1.6-6 4.8-6 9.2V24h8v-8h-4c0-2.5 1-4.2 3.2-5.4L25 8Z" />
                    </svg>
                    <div className="mt-4 flex gap-1" aria-label="Rated 5 out of 5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} />
                      ))}
                    </div>
                    <blockquote className="mt-5 text-pretty font-display text-xl leading-relaxed text-plumdeep sm:text-2xl">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-3">
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.grad} font-display text-lg text-white`}
                      >
                        {t.initial}
                      </span>
                      <span>
                        <span className="block font-medium text-plumdeep">{t.name}</span>
                        <span className="block text-sm text-clay">{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                );
              })}
            </motion.div>

            {/* arrows — desktop, fade in on hover */}
            <button
              onClick={() => go(active - 1)}
              aria-label="Previous testimonial"
              className="absolute -left-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 text-plum shadow-lg ring-1 ring-plum/10 backdrop-blur transition-all duration-300 hover:bg-ivory hover:text-magenta lg:flex lg:opacity-0 lg:group-hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={() => go(active + 1)}
              aria-label="Next testimonial"
              className="absolute -right-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 text-plum shadow-lg ring-1 ring-plum/10 backdrop-blur transition-all duration-300 hover:bg-ivory hover:text-magenta lg:flex lg:opacity-0 lg:group-hover:opacity-100"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
        </Reveal>

        {/* dot nav */}
        <div className="mt-9 flex items-center justify-center gap-2.5">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => go(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-magenta" : "w-2 bg-plum/25 hover:bg-plum/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
