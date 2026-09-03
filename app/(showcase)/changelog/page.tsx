"use client";

import { Plus, Wrench, RefreshCw, Tag } from "lucide-react";
import { PageHeader } from "@/components/showcase/PageHeader";
import { Badge, Card } from "@/components/ui";
import { useLang } from "@/lib/i18n";
import {
  releases,
  formatReleaseDate,
  type ChangeKind,
  type Release,
} from "@/lib/release";

/* ---- How each kind of change is labelled and coloured ---- */
const kindMeta: Record<
  ChangeKind,
  { icon: typeof Plus; tone: "success" | "primary" | "warning"; en: string; th: string }
> = {
  added: { icon: Plus, tone: "success", en: "Added", th: "เพิ่มใหม่" },
  fixed: { icon: Wrench, tone: "primary", en: "Fixed", th: "แก้ไข" },
  changed: { icon: RefreshCw, tone: "warning", en: "Changed", th: "ปรับเปลี่ยน" },
};

/** Renders one release as a timeline entry. */
function ReleaseEntry({ release, latest }: { release: Release; latest: boolean }) {
  const { lang } = useLang();
  const th = lang === "th";

  // Keep the kinds in a stable order rather than however they were authored.
  const order: ChangeKind[] = ["added", "changed", "fixed"];
  const grouped = order
    .map((kind) => ({ kind, items: release.changes.filter((c) => c.kind === kind) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="relative pl-8 sm:pl-10">
      {/* Timeline rail + node */}
      <span
        aria-hidden
        className="absolute left-[7px] top-3 h-full w-px bg-border sm:left-[11px]"
      />
      <span
        aria-hidden
        className={
          latest
            ? "absolute left-0 top-1.5 size-4 rounded-full border-2 border-primary-500 bg-primary-500 ring-4 ring-primary-500/15 sm:size-[22px] sm:border-4"
            : "absolute left-0 top-1.5 size-4 rounded-full border-2 border-border-strong bg-surface sm:size-[22px] sm:border-4"
        }
      />

      <div className="pb-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-lg font-bold tracking-tight text-text">v{release.version}</h2>
          {latest && (
            <Badge tone="primary" appearance="solid" size="sm">
              {th ? "เวอร์ชันปัจจุบัน" : "Current"}
            </Badge>
          )}
          <span className="text-sm text-text-subtle">
            {formatReleaseDate(release.date, lang)}
          </span>
        </div>

        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-text-muted">
          {release.summary[lang]}
        </p>

        <Card className="mt-4 divide-y divide-border">
          {grouped.map((group) => {
            const meta = kindMeta[group.kind];
            const Icon = meta.icon;
            return (
              <div key={group.kind} className="p-4 sm:p-5">
                <Badge tone={meta.tone} size="sm">
                  <Icon size={12} />
                  {meta[lang]}
                </Badge>
                <ul className="mt-3 space-y-2.5">
                  {group.items.map((c) => (
                    <li
                      key={c.en}
                      className="flex gap-2.5 text-sm leading-relaxed text-text-muted"
                    >
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-text-subtle" />
                      <span>{c[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

export default function ChangelogPage() {
  const { lang } = useLang();
  const th = lang === "th";

  return (
    <div>
      <PageHeader
        titleKey="page.changelog.title"
        descKey="page.changelog.desc"
        actions={
          <Badge tone="primary" className="gap-1.5">
            <Tag size={13} />
            v{releases[0].version}
          </Badge>
        }
      />

      <div className="max-w-3xl">
        {releases.map((release, i) => (
          <ReleaseEntry key={release.version} release={release} latest={i === 0} />
        ))}

        <p className="pl-8 text-xs text-text-subtle sm:pl-10">
          {th
            ? "เวอร์ชันเป็นแบบ semantic versioning — เลขกลางเพิ่มเมื่อมีของใหม่ เลขท้ายเพิ่มเมื่อเป็นการแก้ไข"
            : "Versions follow semantic versioning — the minor number moves for new work, the patch number for fixes."}
        </p>
      </div>
    </div>
  );
}
