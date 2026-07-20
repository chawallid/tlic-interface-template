import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { StatusKey } from "@/lib/mock-data";

export type BadgeTone =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";

export type BadgeAppearance = "soft" | "solid" | "outline";

const soft: Record<BadgeTone, string> = {
  neutral: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
  primary: "bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-200",
  secondary: "bg-secondary-50 text-secondary-700 dark:bg-secondary-500/15 dark:text-secondary-200",
  accent: "bg-accent-50 text-accent-700 dark:bg-accent-500/15 dark:text-accent-200",
  success: "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-200",
  warning: "bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-200",
  error: "bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-200",
  info: "bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-200",
};

const solid: Record<BadgeTone, string> = {
  neutral: "bg-neutral-600 text-white",
  primary: "bg-primary-700 text-white",
  secondary: "bg-secondary-600 text-white",
  accent: "bg-accent-500 text-white",
  success: "bg-success-600 text-white",
  warning: "bg-warning-500 text-white",
  error: "bg-error-600 text-white",
  info: "bg-primary-600 text-white",
};

const outline: Record<BadgeTone, string> = {
  neutral: "border border-border-strong text-text-muted",
  primary: "border border-primary-300 text-primary-700 dark:text-primary-300",
  secondary: "border border-secondary-300 text-secondary-700 dark:text-secondary-300",
  accent: "border border-accent-300 text-accent-700 dark:text-accent-300",
  success: "border border-success-300 text-success-700 dark:text-success-300",
  warning: "border border-warning-300 text-warning-700 dark:text-warning-300",
  error: "border border-error-300 text-error-700 dark:text-error-300",
  info: "border border-primary-300 text-primary-700 dark:text-primary-300",
};

const dotColor: Record<BadgeTone, string> = {
  neutral: "bg-neutral-400",
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  accent: "bg-accent-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
  info: "bg-primary-500",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  appearance?: BadgeAppearance;
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  tone = "neutral",
  appearance = "soft",
  size = "md",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const tones = appearance === "solid" ? solid : appearance === "outline" ? outline : soft;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        tones[tone],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("size-1.5 rounded-full", dotColor[tone])} aria-hidden />}
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  StatusBadge — maps enrollment/order status to a tone + label             */
/* -------------------------------------------------------------------------- */

const statusToTone: Record<StatusKey, BadgeTone> = {
  active: "primary",
  pending: "warning",
  completed: "success",
  failed: "error",
};

const statusText: Record<StatusKey, string> = {
  active: "Active",
  pending: "Pending",
  completed: "Completed",
  failed: "Failed",
};

export function StatusBadge({ status, className }: { status: StatusKey; className?: string }) {
  return (
    <Badge tone={statusToTone[status]} appearance="soft" dot className={className}>
      {statusText[status]}
    </Badge>
  );
}
