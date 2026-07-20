import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/** A macOS-style browser chrome that frames a full-page layout preview. */
export function BrowserFrame({
  url = "tlic.cmu.ac.th",
  children,
  className,
  bodyClassName,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-lg", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-3 rounded-full bg-error-400" />
          <span className="size-3 rounded-full bg-warning-400" />
          <span className="size-3 rounded-full bg-success-400" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1 text-xs text-text-subtle">
          <Lock size={11} />
          {url}
        </div>
      </div>
      <div className={cn("scroll-slim max-h-[600px] overflow-auto bg-bg", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}

/** A phone chrome for the mobile-first preview. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-[300px] shrink-0">
      <div className="rounded-[2.25rem] border-4 border-neutral-800 bg-neutral-800 p-1.5 shadow-xl dark:border-neutral-700 dark:bg-neutral-700">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-bg">
          <div className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-neutral-800 dark:bg-neutral-700" />
          <div className="scroll-slim h-[600px] overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
