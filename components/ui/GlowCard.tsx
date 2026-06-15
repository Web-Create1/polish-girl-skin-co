"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * GlowCard: 21st.dev "spotlight + 3D tilt" card.
 * A cursor-following radial glow rides on top of the content while the whole
 * card tilts in real 3D (CSS perspective). Falls back to a static card under
 * prefers-reduced-motion. Wrap any content; pass `glow` to tint the spotlight.
 */
export default function GlowCard({
  children,
  className,
  glow = "rgba(212,69,138,0.22)",
  tilt = 7,
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
  tilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useMotionValue(50);
  const py = useMotionValue(50);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [tilt, -tilt]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-tilt, tilt]), {
    stiffness: 150,
    damping: 18,
  });
  const spotlight = useTransform(
    [px, py],
    ([x, y]) => `radial-gradient(220px circle at ${x}% ${y}%, ${glow}, transparent 70%)`
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x - 0.5);
    my.set(y - 0.5);
    px.set(x * 100);
    py.set(y * 100);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: reduce ? 0 : rx,
        rotateY: reduce ? 0 : ry,
        transformPerspective: 1000,
      }}
      className={cn("group/glow relative [transform-style:preserve-3d]", className)}
    >
      {children}
      {!reduce && (
        <motion.span
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100"
        />
      )}
    </motion.div>
  );
}
