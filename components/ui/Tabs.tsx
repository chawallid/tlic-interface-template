"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  value: string;
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
};

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: "line" | "pill";
  className?: string;
}

/**
 * Tab list control (line or pill). Works controlled or uncontrolled.
 * The consumer renders the active panel based on the current value.
 */
export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  variant = "line",
  className,
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value);
  const active = value ?? internal;

  const select = (v: string) => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  };

  if (variant === "pill") {
    return (
      <div
        role="tablist"
        className={cn(
          "inline-flex items-center gap-1 rounded-xl border border-border bg-surface-2 p-1",
          className
        )}
      >
        {items.map((item) => {
          const on = item.value === active;
          return (
            <button
              key={item.value}
              role="tab"
              aria-selected={on}
              onClick={() => select(item.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 [&_svg]:size-4",
                on
                  ? "bg-surface text-primary-700 shadow-sm dark:text-primary-200"
                  : "text-text-muted hover:text-text"
              )}
            >
              {item.icon}
              {item.label}
              {item.badge}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div role="tablist" className={cn("flex items-center gap-1 border-b border-border", className)}>
      {items.map((item) => {
        const on = item.value === active;
        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={on}
            onClick={() => select(item.value)}
            className={cn(
              "-mb-px inline-flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 [&_svg]:size-4",
              on
                ? "border-primary-600 text-primary-700 dark:text-primary-300"
                : "border-transparent text-text-muted hover:border-border-strong hover:text-text"
            )}
          >
            {item.icon}
            {item.label}
            {item.badge}
          </button>
        );
      })}
    </div>
  );
}
