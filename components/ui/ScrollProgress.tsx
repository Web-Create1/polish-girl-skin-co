"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress: vibrant gradient bar pinned to the top of the page that
 * fills as you scroll. A tiny, high-impact "alive" cue.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[linear-gradient(90deg,#d4458a,#8b5cf6,#e07aa6,#d4458a)]"
    />
  );
}
