"use client";

import type { LabelHTMLAttributes } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

/**
 * Label: a text label for a form control.
 *
 * Accessibility: associates with a form control via htmlFor.
 * Styled with the design system's text treatment.
 */
export function Label({ className, ...props }: LabelProps) {
  return <label className={`text-sm text-ink ${className || ""}`} {...props} />;
}
