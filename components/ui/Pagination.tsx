"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/** Build a compact page list with ellipses, e.g. 1 … 4 5 6 … 20. */
function pageItems(page: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | "…")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) items.push("…");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("…");
  items.push(total);
  return items;
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  const go = (p: number) => onPageChange(Math.max(1, Math.min(totalPages, p)));
  const items = pageItems(page, totalPages);

  const navBtn =
    "inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-lg border border-border bg-surface px-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-hover disabled:pointer-events-none disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

  return (
    <nav className={cn("flex items-center gap-1.5", className)} aria-label="Pagination">
      <button className={navBtn} onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Previous page">
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      <div className="flex items-center gap-1">
        {items.map((it, i) =>
          it === "…" ? (
            <span key={`gap-${i}`} className="px-2 text-sm text-text-subtle">
              …
            </span>
          ) : (
            <button
              key={it}
              onClick={() => go(it)}
              aria-current={it === page ? "page" : undefined}
              className={cn(
                "inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                it === page
                  ? "bg-primary-700 text-white shadow-sm"
                  : "border border-border bg-surface text-text hover:bg-surface-hover"
              )}
            >
              {it}
            </button>
          )
        )}
      </div>

      <button
        className={navBtn}
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
