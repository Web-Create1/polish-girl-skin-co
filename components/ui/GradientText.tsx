import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * GradientText: animated, vibrant pink → violet → magenta gradient text
 * (21st.dev "animated gradient / shimmer text" pattern). The shimmer is defined
 * in globals.css (.aurora-text) and pauses under prefers-reduced-motion.
 */
export default function GradientText({
  children,
  className,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "strong" | "em" | "h1" | "h2" | "h3";
}) {
  return <Tag className={cn("aurora-text", className)}>{children}</Tag>;
}
