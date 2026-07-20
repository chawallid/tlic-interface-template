"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Info, AlertTriangle, XCircle, X, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export interface ToastInput {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastRecord extends ToastInput {
  id: number;
}

interface ToastContextValue {
  toast: (t: ToastInput) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const variantConfig: Record<ToastVariant, { icon: typeof Info; color: string }> = {
  default: { icon: Bell, color: "text-text-muted" },
  success: { icon: CheckCircle2, color: "text-success-500" },
  error: { icon: XCircle, color: "text-error-500" },
  warning: { icon: AlertTriangle, color: "text-warning-500" },
  info: { icon: Info, color: "text-primary-500" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const [mounted, setMounted] = useState(false);
  const counter = useRef(0);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => setMounted(true), []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id = ++counter.current;
      const duration = input.duration ?? 4200;
      setToasts((prev) => [...prev, { ...input, id }]);
      const timer = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
    },
    [dismiss]
  );

  // Clear any pending timers on unmount.
  useEffect(() => {
    const map = timers.current;
    return () => map.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {mounted &&
        createPortal(
          <div className="pointer-events-none fixed inset-x-0 top-0 z-120 flex flex-col items-center gap-2.5 p-4 sm:inset-x-auto sm:right-0 sm:items-end">
            {toasts.map((t) => {
              const { icon: Icon, color } = variantConfig[t.variant ?? "default"];
              return (
                <div
                  key={t.id}
                  role="status"
                  className="pointer-events-auto flex w-full max-w-sm animate-slide-in-right items-start gap-3 rounded-xl border border-border bg-surface p-4 shadow-lg"
                >
                  <Icon size={20} className={cn("mt-0.5 shrink-0", color)} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-text">{t.title}</p>
                    {t.description && (
                      <p className="mt-0.5 text-sm text-text-muted">{t.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismiss(t.id)}
                    aria-label="Dismiss notification"
                    className="-mr-1 -mt-1 flex size-7 shrink-0 items-center justify-center rounded-md text-text-subtle transition-colors hover:bg-surface-hover hover:text-text"
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            })}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
