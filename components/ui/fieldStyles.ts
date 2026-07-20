import { cn } from "@/lib/utils";

/** Shared visual language for text-like form controls (input, select, textarea). */
export function controlClasses(invalid?: boolean, extra?: string) {
  return cn(
    "w-full rounded-lg border bg-surface text-sm text-text shadow-xs transition-colors",
    "placeholder:text-text-subtle",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
    "disabled:cursor-not-allowed disabled:bg-surface-2 disabled:opacity-60",
    invalid
      ? "border-error-400 focus-visible:border-error-500 focus-visible:ring-error-500/25"
      : "border-border hover:border-border-strong focus-visible:border-primary-500 focus-visible:ring-ring/30",
    extra
  );
}
