"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ExternalLink,
  ArrowUpRight,
  CalendarDays,
  Users,
  Sparkles,
  FolderPlus,
  SearchX,
} from "lucide-react";
import { PageHeader } from "@/components/showcase/PageHeader";
import { Token } from "@/components/showcase/Section";
import { CopyButton } from "@/components/showcase/CopyButton";
import { Badge, Button, Card, EmptyState, Input, Modal } from "@/components/ui";
import type { BadgeTone } from "@/components/ui/Badge";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  works,
  workCategories,
  categoryMeta,
  categoryCounts,
  allTags,
  sortWorks,
  type CategoryTone,
  type Work,
  type WorkStatus,
} from "@/lib/marketplace";

/* -------------------------------------------------------------------------- */
/*  Presentation maps — how the catalogue data is rendered                     */
/* -------------------------------------------------------------------------- */

/** Placeholder gradient used when a work has no screenshot yet. */
const toneGradient: Record<CategoryTone, string> = {
  primary: "from-primary-500 via-primary-600 to-primary-900",
  secondary: "from-secondary-400 via-secondary-600 to-secondary-800",
  accent: "from-accent-400 via-accent-500 to-accent-700",
  success: "from-success-400 via-success-600 to-success-800",
  warning: "from-warning-400 via-warning-500 to-warning-700",
  info: "from-primary-400 via-primary-600 to-secondary-700",
};

const statusMeta: Record<WorkStatus, { tone: BadgeTone; en: string; th: string }> = {
  live: { tone: "success", en: "Live", th: "ใช้งานจริง" },
  beta: { tone: "warning", en: "Beta", th: "เบต้า" },
  prototype: { tone: "info", en: "Prototype", th: "ต้นแบบ" },
  archived: { tone: "neutral", en: "Archived", th: "เก็บถาวร" },
};

const ALL = "all";

/** Outline-button styling for the anchors in the detail dialog. */
const linkButton =
  "inline-flex h-9 items-center gap-2 rounded-lg border border-border-strong bg-surface px-3.5 text-sm font-medium text-text transition-colors hover:border-primary-300 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50";

/** Template pasted into `lib/marketplace.ts` to add a new work. */
const entryTemplate = `  {
    id: "my-project",
    title: "My Project",
    summary: { en: "One line about it.", th: "คำอธิบายสั้น ๆ" },
    category: "web",
    status: "live",
    year: 2026,
    team: "TLIC",
    tags: ["Next.js", "Figma"],
    image: "/works/my-project.png",
    links: [
      { label: { en: "Visit site", th: "เปิดเว็บไซต์" }, href: "https://example.ac.th" },
    ],
  },`;

/* -------------------------------------------------------------------------- */
/*  Thumbnail                                                                 */
/* -------------------------------------------------------------------------- */

function WorkMedia({ work, className }: { work: Work; className?: string }) {
  const meta = categoryMeta(work.category);
  const Icon = meta.icon;

  // A "contain" image is a logo or a tall shot — it sits on a neutral surface,
  // where a brand gradient would fight with it.
  const fitted = Boolean(work.image) && work.imageFit === "contain";

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        fitted ? "bg-surface-2" : cn("bg-gradient-to-br", toneGradient[meta.tone]),
        className
      )}
    >
      {work.image ? (
        // Plain <img>: screenshots are dropped into public/ by hand, so there is
        // no build-time size to hand to next/image.
        <img
          src={work.image}
          alt={work.title}
          loading="lazy"
          className={cn(
            "size-full",
            work.imageFit === "contain" ? "object-contain p-8" : "object-cover"
          )}
        />
      ) : (
        <>
          <span
            aria-hidden
            className="absolute -right-6 -bottom-8 text-white/15 [&_svg]:size-40"
          >
            <Icon strokeWidth={1.25} />
          </span>
          <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-lg font-semibold tracking-tight text-white/95">
            {work.title}
          </span>
        </>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

type CardProps = {
  work: Work;
  wide?: boolean;
  onOpen: () => void;
  onTag: (tag: string) => void;
};

function WorkCard({ work, wide = false, onOpen, onTag }: CardProps) {
  const { lang } = useLang();
  const th = lang === "th";
  const meta = categoryMeta(work.category);
  const CatIcon = meta.icon;
  const status = statusMeta[work.status ?? "live"];

  return (
    <Card
      interactive
      className={cn(
        "group relative flex flex-col overflow-hidden",
        wide && "sm:col-span-2 sm:flex-row"
      )}
    >
      <WorkMedia
        work={work}
        className={cn("aspect-[16/9] shrink-0", wide && "sm:aspect-auto sm:w-2/5")}
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2.5 flex flex-wrap items-center gap-2">
          <Badge tone={meta.tone} size="sm">
            <CatIcon size={12} />
            {meta.label[lang]}
          </Badge>
          <Badge tone={status.tone} size="sm" dot>
            {status[lang]}
          </Badge>
          {work.featured && (
            <Badge tone="accent" appearance="outline" size="sm">
              <Sparkles size={12} />
              {th ? "แนะนำ" : "Featured"}
            </Badge>
          )}
        </div>

        <h3 className="text-base font-semibold text-text">
          {/* The ::after overlay makes the whole card open the dialog, while the
              tag buttons below stay individually clickable. */}
          <button
            type="button"
            onClick={onOpen}
            className="rounded-md text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {work.title}
          </button>
        </h3>

        <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-text-muted">
          {work.summary[lang]}
        </p>

        {work.tags && work.tags.length > 0 && (
          <div className="relative mt-3.5 flex flex-wrap gap-1.5">
            {work.tags.slice(0, wide ? 6 : 3).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onTag(tag)}
                className="rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-text-muted transition-colors hover:border-primary-300 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                {tag}
              </button>
            ))}
            {work.tags.length > (wide ? 6 : 3) && (
              <span className="px-1 py-0.5 text-[11px] text-text-subtle">
                +{work.tags.length - (wide ? 6 : 3)}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-xs text-text-subtle">
          {work.team && (
            <span className="inline-flex items-center gap-1.5">
              <Users size={13} />
              {work.team}
            </span>
          )}
          {work.year && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} />
              {work.year}
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1 font-medium text-text-muted transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-300">
            {th ? "ดูรายละเอียด" : "View details"}
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Detail dialog                                                             */
/* -------------------------------------------------------------------------- */

function WorkDialog({ work, onClose }: { work: Work | null; onClose: () => void }) {
  const { lang } = useLang();
  const th = lang === "th";
  if (!work) return null;

  const meta = categoryMeta(work.category);
  const CatIcon = meta.icon;
  const status = statusMeta[work.status ?? "live"];
  const body = work.description ?? work.summary;

  return (
    <Modal open onClose={onClose} title={work.title} size="lg">
      <div className="space-y-5">
        <WorkMedia work={work} className="aspect-[16/9] rounded-xl" />

        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={meta.tone} size="sm">
            <CatIcon size={12} />
            {meta.label[lang]}
          </Badge>
          <Badge tone={status.tone} size="sm" dot>
            {status[lang]}
          </Badge>
          {work.team && <span className="text-xs text-text-subtle">{work.team}</span>}
          {work.year && <span className="text-xs text-text-subtle">· {work.year}</span>}
        </div>

        <p className="text-sm leading-relaxed text-text-muted">{body[lang]}</p>

        {work.highlights && (
          <div>
            <h4 className="text-sm font-semibold text-text">
              {th ? "จุดเด่น" : "Highlights"}
            </h4>
            <ul className="mt-2.5 space-y-2">
              {work.highlights[lang].map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-text-muted">
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-text-subtle"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {work.tags && work.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {work.tags.map((tag) => (
              <Token key={tag}>{tag}</Token>
            ))}
          </div>
        )}

        {work.links && work.links.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-border pt-4">
            {work.links.map((link) =>
              link.href.startsWith("/") ? (
                <Link key={link.href} href={link.href} onClick={onClose} className={linkButton}>
                  {link.label[lang]}
                  <ArrowUpRight size={16} />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={linkButton}
                >
                  {link.label[lang]}
                  <ExternalLink size={16} />
                </a>
              )
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

/** Everything a search query is matched against, lowercased once per work. */
function haystack(work: Work, lang: Lang): string {
  return [
    work.title,
    work.summary.en,
    work.summary.th,
    work.team ?? "",
    categoryMeta(work.category).label[lang],
    ...(work.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

export default function MarketplacePage() {
  const { lang } = useLang();
  const th = lang === "th";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [tag, setTag] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const counts = useMemo(() => categoryCounts(), []);
  const tags = useMemo(() => allTags(), []);

  // Open a work directly from a shared link (#work-id) on first paint.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id && works.some((w) => w.id === id)) setOpenId(id);
  }, []);

  const open = (id: string) => {
    setOpenId(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  const close = () => {
    setOpenId(null);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortWorks(
      works.filter((w) => {
        if (category !== ALL && w.category !== category) return false;
        if (tag && !(w.tags ?? []).includes(tag)) return false;
        if (q && !haystack(w, lang).includes(q)) return false;
        return true;
      })
    );
  }, [query, category, tag, lang]);

  const filtersOn = query.trim() !== "" || category !== ALL || tag !== null;
  const reset = () => {
    setQuery("");
    setCategory(ALL);
    setTag(null);
  };

  const chip = (active: boolean) =>
    cn(
      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 [&_svg]:size-4",
      active
        ? "border-primary-600 bg-primary-600 text-white hover:bg-primary-700"
        : "border-border bg-surface text-text-muted hover:border-border-strong hover:text-text"
    );

  return (
    <div>
      <PageHeader
        titleKey="page.marketplace.title"
        descKey="page.marketplace.desc"
        actions={
          <Badge tone="primary" className="gap-1.5">
            {works.length} {th ? "ผลงาน" : "works"}
          </Badge>
        }
      />

      {/* ---- Filters ---- */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="sm:max-w-xs sm:flex-1">
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={th ? "ค้นหาผลงาน…" : "Search works…"}
              aria-label={th ? "ค้นหาผลงาน" : "Search works"}
              leftIcon={<Search />}
            />
          </div>
          {filtersOn && (
            <Button variant="ghost" size="sm" leftIcon={<X />} onClick={reset}>
              {th ? "ล้างตัวกรอง" : "Clear filters"}
            </Button>
          )}
          <span className="text-sm text-text-subtle sm:ml-auto">
            {th
              ? `แสดง ${filtered.length} จาก ${works.length} รายการ`
              : `Showing ${filtered.length} of ${works.length}`}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(ALL)}
            aria-pressed={category === ALL}
            className={chip(category === ALL)}
          >
            {th ? "ทั้งหมด" : "All"}
            <span className="text-xs opacity-70">{works.length}</span>
          </button>
          {workCategories.map((c) => {
            const Icon = c.icon;
            const count = counts[c.id] ?? 0;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                aria-pressed={category === c.id}
                disabled={count === 0}
                className={cn(chip(category === c.id), count === 0 && "opacity-45")}
              >
                <Icon />
                {c.label[lang]}
                <span className="text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-medium uppercase tracking-wider text-text-subtle">
              {th ? "แท็ก" : "Tags"}
            </span>
            {tags.map((tg) => {
              const active = tag === tg;
              return (
                <button
                  key={tg}
                  type="button"
                  onClick={() => setTag(active ? null : tg)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-md border px-2 py-0.5 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                    active
                      ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-200"
                      : "border-border bg-surface-2 text-text-muted hover:border-border-strong hover:text-text"
                  )}
                >
                  {tg}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ---- Grid ---- */}
      <div className="mt-7">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<SearchX />}
            title={th ? "ไม่พบผลงานที่ตรงกับตัวกรอง" : "No works match those filters"}
            description={
              th
                ? "ลองล้างตัวกรอง หรือเพิ่มผลงานใหม่ลงในไฟล์ lib/marketplace.ts"
                : "Try clearing the filters, or add a new work to lib/marketplace.ts."
            }
            action={
              <Button variant="outline" size="sm" leftIcon={<X />} onClick={reset}>
                {th ? "ล้างตัวกรอง" : "Clear filters"}
              </Button>
            }
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((work) => (
              <WorkCard
                key={work.id}
                work={work}
                wide={work.featured && !filtersOn}
                onOpen={() => open(work.id)}
                onTag={(t) => setTag(t)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ---- How to add a work ---- */}
      <Card className="mt-10 overflow-hidden">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:p-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-200 [&_svg]:size-5">
            <FolderPlus />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-text">
              {th ? "เพิ่มผลงานใหม่ทีหลังได้" : "Add a work later"}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
              {th ? (
                <>
                  ผลงานทั้งหมดในหน้านี้อ่านมาจากไฟล์เดียวคือ <Token>lib/marketplace.ts</Token>{" "}
                  วางภาพหน้าจอไว้ใน <Token>public/works/</Token> แล้วเพิ่มรายการต่อท้าย{" "}
                  <Token>works</Token> — การ์ด ตัวกรอง แท็ก และจำนวนจะอัปเดตให้เอง
                </>
              ) : (
                <>
                  Everything on this page is read from one file — <Token>lib/marketplace.ts</Token>.
                  Drop a screenshot in <Token>public/works/</Token>, append an entry to{" "}
                  <Token>works</Token>, and the card, filters, tags, and counts follow.
                </>
              )}
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface-2">
              <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
                <span className="font-mono text-xs text-text-muted">lib/marketplace.ts</span>
                <CopyButton
                  value={entryTemplate}
                  label={th ? "คัดลอกเทมเพลต" : "Copy template"}
                  copiedLabel={th ? "คัดลอกแล้ว!" : "Copied!"}
                  size="sm"
                />
              </div>
              <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-text">
                <code className="font-mono">{entryTemplate}</code>
              </pre>
            </div>
          </div>
        </div>
      </Card>

      <WorkDialog work={works.find((w) => w.id === openId) ?? null} onClose={close} />
    </div>
  );
}
