"use client";

import { useState, type ReactNode } from "react";
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertVariant = "info" | "success" | "warning" | "error";

const config: Record<
  AlertVariant,
  { icon: typeof Info; wrap: string; iconColor: string; title: string }
> = {
  info: {
    icon: Info,
    wrap: "border-primary-200 bg-primary-50 dark:border-primary-500/25 dark:bg-primary-500/10",
    iconColor: "text-primary-600 dark:text-primary-300",
    title: "text-primary-900 dark:text-primary-100",
  },
  success: {
    icon: CheckCircle2,
    wrap: "border-success-200 bg-success-50 dark:border-success-500/25 dark:bg-success-500/10",
    iconColor: "text-success-600 dark:text-success-300",
    title: "text-success-900 dark:text-success-100",
  },
  warning: {
    icon: AlertTriangle,
    wrap: "border-warning-200 bg-warning-50 dark:border-warning-500/25 dark:bg-warning-500/10",
    iconColor: "text-warning-600 dark:text-warning-300",
    title: "text-warning-900 dark:text-warning-100",
  },
  error: {
    icon: XCircle,
    wrap: "border-error-200 bg-error-50 dark:border-error-500/25 dark:bg-error-500/10",
    iconColor: "text-error-600 dark:text-error-300",
    title: "text-error-900 dark:text-error-100",
  },
};

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  dismissible?: boolean;
  className?: string;
}

export function Alert({ variant = "info", title, children, dismissible, className }: AlertProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  const c = config[variant];
  const Icon = c.icon;

  return (
    <div role="alert" className={cn("flex gap-3 rounded-xl border p-4", c.wrap, className)}>
      <Icon size={20} className={cn("mt-0.5 shrink-0", c.iconColor)} />
      <div className="min-w-0 flex-1">
        {title && <p className={cn("text-sm font-semibold", c.title)}>{title}</p>}
        {children && (
          <div className={cn("text-sm text-text-muted", title && "mt-0.5")}>{children}</div>
        )}
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss"
          className={cn(
            "-mr-1 -mt-1 flex size-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/10",
            c.iconColor
          )}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
