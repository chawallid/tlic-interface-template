"use client";

import { useLang, type TranslationKey } from "@/lib/i18n";
import type { ReactNode } from "react";

export interface PageHeaderProps {
  titleKey: TranslationKey;
  descKey: TranslationKey;
  actions?: ReactNode;
}

/** Bilingual page title + description, driven by the language toggle. */
export function PageHeader({ titleKey, descKey, actions }: PageHeaderProps) {
  const { t } = useLang();
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">{t(titleKey)}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
          {t(descKey)}
        </p>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
