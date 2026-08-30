"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { AnalyticsProps } from "./types";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick"> & {
  children: ReactNode;
  variant?: "primary" | "outline" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  analytics: AnalyticsProps;
};

/**
 * Button: the primary interactive element.
 *
 * Always requires analytics props. Variants are derived from the design system, not
 * invented here. If the design system declares one accent colour, there is one accent
 * variant. Accessibility includes focus treatment.
 *
 * The analytics prop is not optional — TypeScript will reject any Button rendered
 * without event, testId, and srcRef. This moves the instrumentation check from a
 * build-time gate (which can be bypassed) to a compile-time error (which cannot).
 */
export function Button({
  children,
  variant = "primary",
  disabled = false,
  type = "button",
  onClick,
  className,
  analytics,
  ...rest
}: ButtonProps) {
  const baseClass = "inline-flex items-center justify-center rounded-none px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClass =
    variant === "outline"
      ? "border border-ink text-ink hover:bg-ink hover:bg-opacity-5"
      : variant === "secondary"
        ? "bg-ink bg-opacity-10 text-ink hover:bg-opacity-20"
        : "bg-ink text-canvas hover:bg-opacity-90";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${className || ""}`}
      data-analytics-event={`${analytics.event}`} data-testid={`${analytics.testId}`} data-src={`${analytics.srcRef}`}
      data-track-category={analytics.category}
      data-track-action={analytics.action}
      data-track-label={analytics.label}
      {...rest}
    >
      {children}
    </button>
  );
}
