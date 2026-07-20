import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps {
  title: string;
  description?: string;
  id?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** A titled block within a showcase page. */
export function Section({ title, description, id, actions, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-text">{title}</h2>
          {description && (
            <p className="mt-1 max-w-2xl text-sm text-text-muted">{description}</p>
          )}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

export interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional caption shown beneath the preview surface. */
  label?: string;
  /** Vertically + horizontally center the demo. */
  center?: boolean;
  padded?: boolean;
}

/** A bordered surface that frames a live component demo. */
export function Preview({
  label,
  center = false,
  padded = true,
  className,
  children,
  ...props
}: PreviewProps) {
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "rounded-xl border border-border bg-surface",
          padded && "p-6",
          center && "flex min-h-[132px] items-center justify-center",
          className
        )}
        {...props}
      >
        {children}
      </div>
      {label && <p className="mt-2 px-1 text-xs text-text-subtle">{label}</p>}
    </div>
  );
}

/** Inline monospace token / class-name chip. */
export function Token({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <code
      className={cn(
        "rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[0.8em] text-text",
        className
      )}
    >
      {children}
    </code>
  );
}
