"use client";

import type { ReactNode } from "react";

export type CardProps = {
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

/**
 * Card: a contained surface for grouped content.
 *
 * The design system defines card background and border treatment. Cards use no shadow
 * (the design explicitly forbids it). No radius unless the design system declares it.
 *
 * Accessibility: if the card is clickable, it should probably be a button or link instead.
 * Card is for container semantics, not interaction.
 */
export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={`bg-paper-card p-4 rounded-none ${className || ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
