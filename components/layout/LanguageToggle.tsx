"use client";

import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const options: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "th", label: "ไทย" },
];

/** Compact segmented EN / ไทย switch wired to the LanguageProvider. */
export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-surface-2 p-0.5",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {options.map((opt) => {
        const active = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={active}
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
              active
                ? "bg-surface text-primary-700 shadow-sm dark:text-primary-200"
                : "text-text-muted hover:text-text"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
