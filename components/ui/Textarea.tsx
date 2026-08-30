"use client";

import type { TextareaHTMLAttributes, Ref } from "react";
import { forwardRef } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

/**
 * Textarea: multi-line text input.
 *
 * Accessibility: associated label, focus ring, error messaging with aria-describedby.
 * Same pattern as TextField, but for longer content.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className, ...props }, ref: Ref<HTMLTextAreaElement>) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `error-${textareaId}` : undefined;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={textareaId} className="text-sm text-ink">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`px-3 py-2 border border-line rounded-none focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none ${error ? "border-red-500" : "border-line"} ${className || ""}`}
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

Textarea.displayName = "Textarea";
