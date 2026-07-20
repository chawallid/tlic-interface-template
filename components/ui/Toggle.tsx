"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  label?: ReactNode;
  description?: string;
  id?: string;
  className?: string;
}

/** Switch control. Works controlled (`checked`) or uncontrolled (`defaultChecked`). */
export function Toggle({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  label,
  description,
  id,
  className,
}: ToggleProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const [internal, setInternal] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onCheckedChange?.(!on);
  };

  const dims =
    size === "sm"
      ? { track: "h-5 w-9", thumb: "size-4", travel: "translate-x-4" }
      : { track: "h-6 w-11", thumb: "size-5", travel: "translate-x-5" };

  const control = (
    <button
      type="button"
      role="switch"
      id={fieldId}
      aria-checked={on}
      aria-label={typeof label === "string" ? label : undefined}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-55",
        dims.track,
        on ? "bg-primary-600" : "bg-neutral-300 dark:bg-neutral-700"
      )}
    >
      <span
        className={cn(
          "pointer-events-none ml-0.5 inline-block rounded-full bg-white shadow-sm transition-transform duration-200",
          dims.thumb,
          on ? dims.travel : "translate-x-0"
        )}
      />
    </button>
  );

  if (!label && !description) return <div className={className}>{control}</div>;

  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <label htmlFor={fieldId} className="flex cursor-pointer flex-col gap-0.5">
        {label && <span className="text-sm font-medium text-text">{label}</span>}
        {description && <span className="text-xs text-text-muted">{description}</span>}
      </label>
      {control}
    </div>
  );
}
