"use client";

import type { SelectHTMLAttributes, Ref } from "react";
import { forwardRef } from "react";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
};

/**
 * Select: dropdown choice component.
 *
 * Built on native select for accessibility and baseline support. Styled with
 * the design system's tokens.
 *
 * Accessibility: native select ensures screen reader support and keyboard navigation
 * work automatically. No fake dropdown required.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, className, options, ...props }, ref: Ref<HTMLSelectElement>) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `error-${selectId}` : undefined;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={selectId} className="text-sm text-ink">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`px-3 py-2 border border-line rounded-none focus:outline-none focus:ring-2 focus:ring-offset-2 ${error ? "border-red-500" : "border-line"} ${className || ""}`}
          aria-describedby={errorId}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
