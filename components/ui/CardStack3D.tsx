"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type StackCard = {
  id: string;
  content: ReactNode;
};

/**
 * CardStack3D: a depth-stacked, auto-advancing 3D card carousel (port of the
 * agency's 21st.dev "VerticalImageStack / animated-testimonials" pattern).
 * The front card sits flat; cards behind recede in real 3D (translateZ + scale
 * + tilt). Auto-rotates, pauses on hover, is drag-to-advance, and degrades to a
 * simple stacked fade under prefers-reduced-motion.
 */
export default function CardStack3D({
  cards,
  className,
  interval = 5200,
}: {
  cards: StackCard[];
  className?: string;
  interval?: number;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = cards.length;

  const advance = useCallback(() => setActive((a) => (a + 1) % n), [n]);

  useEffect(() => {
    if (paused || n <= 1) return;
    const id = setInterval(advance, interval);
    return () => clearInterval(id);
  }, [advance, interval, paused, n]);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className="relative h-[20rem] w-full [perspective:1400px] sm:h-[18rem]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ transformStyle: "preserve-3d" }}
      >
        {cards.map((card, i) => {
          const pos = (i - active + n) % n; // 0 = front, 1 = next, ...
          const visible = pos < 3;
          const depth = reduce ? 0 : pos;

          return (
            <motion.div
              key={card.id}
              className="absolute inset-0"
              initial={false}
              animate={{
                z: -depth * 90,
                y: depth * 22,
                scale: 1 - depth * 0.06,
                rotateX: reduce ? 0 : depth * 4,
                opacity: visible ? (pos === 0 ? 1 : 0.55 - pos * 0.12) : 0,
                filter: pos === 0 ? "blur(0px)" : `blur(${pos * 1.5}px)`,
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transformStyle: "preserve-3d",
                pointerEvents: pos === 0 ? "auto" : "none",
                zIndex: n - pos,
              }}
              drag={pos === 0 && !reduce ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80 || info.offset.x > 80) advance();
              }}
            >
              {card.content}
            </motion.div>
          );
        })}
      </div>

      {n > 1 && (
        <div className="mt-7 flex items-center gap-2.5">
          {cards.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active ? "w-7 bg-magenta" : "w-2 bg-plum/25 hover:bg-plum/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
