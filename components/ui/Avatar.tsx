import type { ReactNode } from "react";
import { cn, initials as toInitials } from "@/lib/utils";

export type AvatarAccent = "primary" | "secondary" | "accent" | "success" | "warning" | "neutral";
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const accentClasses: Record<AvatarAccent, string> = {
  primary: "bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-200",
  secondary: "bg-secondary-100 text-secondary-700 dark:bg-secondary-500/20 dark:text-secondary-200",
  accent: "bg-accent-100 text-accent-700 dark:bg-accent-500/20 dark:text-accent-200",
  success: "bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-200",
  warning: "bg-warning-100 text-warning-800 dark:bg-warning-500/20 dark:text-warning-200",
  neutral: "bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200",
};

const sizeClasses: Record<AvatarSize, string> = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-xl",
};

const statusColors = {
  active: "bg-success-500",
  pending: "bg-warning-500",
  offline: "bg-neutral-400",
} as const;

export interface AvatarProps {
  name: string;
  src?: string;
  accent?: AvatarAccent;
  size?: AvatarSize;
  status?: keyof typeof statusColors;
  className?: string;
}

export function Avatar({
  name,
  src,
  accent = "primary",
  size = "md",
  status,
  className,
}: AvatarProps) {
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center overflow-hidden rounded-full font-semibold ring-2 ring-surface",
          sizeClasses[size],
          !src && accentClasses[accent]
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name} className="h-full w-full object-cover" />
        ) : (
          toInitials(name)
        )}
      </span>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-surface",
            size === "xs" || size === "sm" ? "size-2" : "size-2.5",
            statusColors[status]
          )}
          aria-label={status}
        />
      )}
    </span>
  );
}

/** Overlapping stack of avatars with an optional "+N" overflow chip. */
export function AvatarGroup({
  children,
  max,
  size = "md",
  extra,
}: {
  children: ReactNode;
  max?: number;
  size?: AvatarSize;
  extra?: number;
}) {
  return (
    <div className="flex items-center -space-x-2.5">
      {children}
      {extra && extra > 0 && (
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-neutral-100 font-semibold text-text-muted ring-2 ring-surface dark:bg-neutral-800",
            sizeClasses[size]
          )}
        >
          +{extra}
        </span>
      )}
    </div>
  );
}
