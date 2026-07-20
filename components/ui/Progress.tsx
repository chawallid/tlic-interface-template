import { cn } from "@/lib/utils";

export type ProgressTone = "primary" | "secondary" | "accent" | "success" | "warning" | "error";

const toneClasses: Record<ProgressTone, string> = {
  primary: "bg-primary-600",
  secondary: "bg-secondary-500",
  accent: "bg-accent-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  error: "bg-error-500",
};

export interface ProgressProps {
  value: number;
  max?: number;
  tone?: ProgressTone;
  size?: "sm" | "md";
  label?: string;
  showValue?: boolean;
  className?: string;
}

/** Linear progress bar. */
export function Progress({
  value,
  max = 100,
  tone = "primary",
  size = "md",
  label,
  showValue = false,
  className,
}: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          {label && <span className="font-medium text-text">{label}</span>}
          {showValue && <span className="text-text-muted">{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={cn(
          "w-full overflow-hidden rounded-full bg-surface-2",
          size === "sm" ? "h-1.5" : "h-2.5"
        )}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-500 ease-out", toneClasses[tone])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/** Compact circular progress indicator. */
export function CircularProgress({
  value,
  max = 100,
  size = 56,
  strokeWidth = 6,
  tone = "primary",
  label,
}: {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  tone?: ProgressTone;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const strokeColor: Record<ProgressTone, string> = {
    primary: "stroke-primary-600",
    secondary: "stroke-secondary-500",
    accent: "stroke-accent-500",
    success: "stroke-success-500",
    warning: "stroke-warning-500",
    error: "stroke-error-500",
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-surface-2"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("fill-none transition-[stroke-dashoffset] duration-500 ease-out", strokeColor[tone])}
        />
      </svg>
      <span className="absolute text-sm font-semibold text-text">{label ?? `${Math.round(pct)}%`}</span>
    </div>
  );
}
