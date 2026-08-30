"use client";

import type { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Dialog: a modal overlay with focus trap, escape handler, and return focus.
 *
 * Built on Radix Dialog for accessibility that is battle-tested. Radix handles:
 * - role="dialog" and aria-modal="true"
 * - Focus trap: Tab cycles within the modal only
 * - Escape key closes
 * - Portal positioning
 * - aria-labelledby and aria-describedby
 *
 * This is a thin wrapper around Radix to apply the design system's styling.
 */
export function Dialog({ open, onOpenChange, title, children, className }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-40" />
        <DialogPrimitive.Content
          className={`fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-canvas p-6 rounded-none shadow-lg z-50 max-w-md w-[90vw] max-h-[90vh] overflow-y-auto ${className || ""}`}
        >
          {title && (
            <DialogPrimitive.Title className="text-lg font-semibold text-ink mb-4">
              {title}
            </DialogPrimitive.Title>
          )}
          {children}
          <DialogPrimitive.Close className="absolute right-4 top-4 text-ink hover:opacity-70">
            ×
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
