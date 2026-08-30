"use client";

import type { InputHTMLAttributes, Ref } from "react";
import { forwardRef } from "react";
import type { AnalyticsProps } from "./types";

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  analytics?: AnalyticsProps;
};

/**
 * TextField: single-line text input.
 *
 * Accessibility: uses native HTML input with associated label. Focus ring
 * matches the design system. Error messages are announced with aria-describedby.
 * The component carries the project's text treatment and spacing.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, id, className, analytics, ...props }, ref: Ref<HTMLInputElement>) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `error-${inputId}` : undefined;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="text-sm text-ink">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`px-3 py-2 border border-line rounded-none focus:outline-none focus:ring-2 focus:ring-offset-2 ${error ? "border-red-500" : "border-line"} ${className || ""}`}
          aria-describedby={errorId}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
