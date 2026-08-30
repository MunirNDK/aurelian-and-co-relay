/**
 * Shared types for this project's UI primitives.
 *
 * AnalyticsProps is required on every interactive component. It cannot be optional: TypeScript
 * refuses to compile a control that does not carry its event, test id and source reference, which
 * puts the instrumentation guarantee at compile time rather than at a build gate.
 */

export type AnalyticsProps = {
  /** Becomes data-analytics-event in the built application. */
  event: string;
  /** Becomes data-testid. */
  testId: string;
  /** Becomes data-src, pointing at the file and symbol that emitted it. */
  srcRef: string;
  /** The house analytics contract. Required, so an untagged control cannot compile. */
  category: "cta" | "navigation" | "content" | "conversion" | "form" | "tool" | "social" | "media";
  action: "click" | "submit" | "view" | "scroll" | "hover" | "toggle" | "focus" | "download";
  /** Kebab-case, matching the element's visible text. */
  label: string;
};
