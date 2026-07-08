"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import GlowCard from "@/components/ui/GlowCard";
import { cn } from "@/lib/cn";

/**
 * ParallaxImage: the site's one editorial image treatment.
 * A photo sits inside a tilting GlowCard, gently drifting on scroll (the image
 * is over-scaled so the drift never exposes an edge) with an optional caption
 * chip. One component keeps every section's imagery framed, lit, and animated
 * the same way — so the page reads as one intentional system, not stock drops.
 */
export default function ParallaxImage({
  src,
  alt,
  className,
  aspect = "aspect-[4/3]",
  chip,
  caption,
  glow = "rgba(219,47,134,0.2)",
  tilt = 7,
  amount = 42,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
  chip?: string;
  caption?: string;
  glow?: string;
  tilt?: number;
  amount?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : amount, reduce ? 0 : -amount],
  );

  return (
    <GlowCard glow={glow} tilt={tilt} className={cn("rounded-[2rem]", className)}>
      <div
        ref={ref}
        className={cn(
          "shine-border relative overflow-hidden rounded-[2rem] shadow-[0_44px_90px_-40px_rgba(42,20,48,0.55)] ring-1 ring-plum/10",
          aspect,
        )}
      >
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          style={{ y, scale: 1.14 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* readability wash toward the bottom for the caption */}
        {(caption || chip) && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-plumdeep/45 to-transparent" />
        )}
        {chip && (
          <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3.5 py-1.5 text-xs font-medium tracking-wide text-plum shadow-sm backdrop-blur">
            {chip}
          </span>
        )}
        {caption && (
          <p className="absolute inset-x-5 bottom-5 font-display text-lg leading-snug text-cream [text-shadow:0_2px_18px_rgba(20,8,24,0.5)]">
            {caption}
          </p>
        )}
      </div>
    </GlowCard>
  );
}
