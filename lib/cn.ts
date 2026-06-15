import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names with conflict resolution (21st.dev standard helper). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
