"use client";

import type { ReactNode } from "react";

export type BadgeProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};

/**
 * Badge: a small label for status or category.
 *
 * Variants correspond to the design system's semantic colours.
 */
export function Badge({ children, variant = "primary", className }: BadgeProps) {
  const variantClass =
    variant === "outline"
      ? "bg-transparent border border-line text-ink"
      : variant === "secondary"
        ? "bg-ink bg-opacity-10 text-ink"
        : "bg-ink text-canvas";

  return (
    <span className={`inline-block px-2 py-1 rounded-none text-xs font-medium ${variantClass} ${className || ""}`}>
      {children}
    </span>
  );
}
