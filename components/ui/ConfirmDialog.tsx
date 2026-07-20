"use client";

import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "./Modal";
import { Button } from "./Button";

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  loading?: boolean;
}

/** Focused yes/no dialog built on top of Modal. */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm" hideClose>
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full",
            variant === "danger"
              ? "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-300"
              : "bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300"
          )}
        >
          <AlertTriangle size={22} />
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-text">{title}</h2>
          {description && <p className="mt-1 text-sm text-text-muted">{description}</p>}
        </div>
      </div>
      <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          variant={variant === "danger" ? "danger" : "primary"}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
