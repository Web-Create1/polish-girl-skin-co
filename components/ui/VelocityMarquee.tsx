"use client";

import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * VelocityMarquee: an infinite track whose base drift speeds up and skews with
 * scroll velocity, and flips direction with scroll direction (framer-motion +
 * 21st.dev "scroll velocity" pattern). Under reduced motion it falls back to a
 * calm CSS marquee.
 */
export default function VelocityMarquee({
  children,
  baseVelocity = 2.4,
  className,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(smoothVelocity, [-1500, 0, 1500], [-6, 0, 6], { clamp: true });

  // wrap one copy width (we render two copies = -50%)
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  if (reduce) {
    return (
      <div className={cn("flex overflow-hidden", className)}>
        <div className="flex shrink-0 animate-marquee items-center whitespace-nowrap">
          {children}
          {children}
        </div>
      </div>
    );
  }

  return (
    <motion.div style={{ skewX: skew }} className={cn("flex overflow-hidden", className)}>
      <motion.div className="flex shrink-0 items-center whitespace-nowrap will-change-transform" style={{ x }}>
        {children}
        {children}
      </motion.div>
    </motion.div>
  );
}

/** wrap a value into the [min, max) range: for seamless looping */
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
}
