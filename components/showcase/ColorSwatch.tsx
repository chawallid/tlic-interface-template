"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn, copyToClipboard } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { useLang } from "@/lib/i18n";
import type { ColorFamily } from "@/lib/design-tokens";

/** Pick readable text (dark vs light) for a given hex background. */
function isLightColor(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62;
}

export function Swatch({
  token,
  hex,
  step,
  isBase = false,
}: {
  token: string;
  hex: string;
  step: string;
  isBase?: boolean;
}) {
  const { toast } = useToast();
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const light = isLightColor(hex);

  const onClick = async () => {
    const ok = await copyToClipboard(token);
    if (ok) {
      setCopied(true);
      toast({ title: t("ui.copied"), description: token, variant: "success", duration: 1600 });
      setTimeout(() => setCopied(false), 1400);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title={`Copy "${token}"`}
      className={cn(
        "group relative flex h-16 w-full flex-col justify-between rounded-lg p-2 text-left transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg hover:scale-[1.03]",
        light ? "text-neutral-900/80" : "text-white/90",
        isBase && "ring-2 ring-primary-500 ring-offset-2 ring-offset-bg"
      )}
      style={{ backgroundColor: hex }}
    >
      <span className="flex items-center justify-between text-[11px] font-semibold">
        {step}
        <span className="opacity-0 transition-opacity group-hover:opacity-100">
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </span>
      </span>
      <span className="font-mono text-[10px] uppercase tracking-tight opacity-80">{hex}</span>
    </button>
  );
}

/** Full color family: name, role, and its swatch scale. */
export function ColorScaleRow({ family }: { family: ColorFamily }) {
  const steps = Object.entries(family.scale).filter(([, hex]) => Boolean(hex));
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-text">{family.name}</h3>
          <p className="mt-0.5 max-w-md text-xs text-text-muted">{family.role}</p>
        </div>
        <code className="shrink-0 rounded-md bg-surface-2 px-2 py-1 font-mono text-xs text-text-muted">
          {family.key}-{String(family.base)}
        </code>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-11">
        {steps.map(([step, hex]) => (
          <Swatch
            key={step}
            step={step}
            hex={hex as string}
            token={`${family.key}-${step}`}
            isBase={String(family.base) === step}
          />
        ))}
      </div>
    </div>
  );
}
