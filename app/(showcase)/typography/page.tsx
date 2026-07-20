"use client";

import { typographyScale, fontWeights } from "@/lib/design-tokens";
import { useLang } from "@/lib/i18n";
import { PageHeader } from "@/components/showcase/PageHeader";
import { Section, Token } from "@/components/showcase/Section";

const samples: Record<string, string> = {
  Display: "Innovate how the world learns",
  H1: "Teaching & Learning Innovation Center",
  H2: "Designing digital learning experiences",
  H3: "Build once, reuse everywhere",
  H4: "Consistent components by default",
  H5: "Accessible and responsive",
  "H6 / Body": "The quick brown fox jumps over the lazy dog.",
  Small: "Supporting text and helper hints go here.",
  Caption: "LAST UPDATED · JUL 2026",
};

export default function TypographyPage() {
  const { t } = useLang();

  return (
    <div>
      <PageHeader titleKey="page.typography.title" descKey="page.typography.desc" />

      <div className="space-y-12">
        {/* Font families */}
        <Section title="Font families" description="Two typefaces cover Latin and Thai with one consistent voice.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text">Inter</span>
                <Token>font-sans</Token>
              </div>
              <p className="mt-4 text-4xl font-bold tracking-tight text-text">Aa Bb Cc</p>
              <p className="mt-2 text-sm text-text-muted">Latin · UI, numerals & data</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-text">Noto Sans Thai</span>
                <Token>font-thai</Token>
              </div>
              <p className="mt-4 font-thai text-4xl font-bold tracking-tight text-text">ก ข ค ฆ ง</p>
              <p className="mt-2 font-thai text-sm text-text-muted">ไทย · หัวข้อและเนื้อหา</p>
            </div>
          </div>
        </Section>

        {/* Type scale */}
        <Section title="Type scale" description="From display headings down to captions — with tokens, sizes, and weights.">
          <div className="divide-y divide-border rounded-xl border border-border bg-surface shadow-card">
            {typographyScale.map((s) => (
              <div
                key={s.token}
                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <p
                  className="min-w-0 truncate text-text"
                  style={{
                    fontSize: s.size,
                    fontWeight: Number(s.weight),
                    letterSpacing: s.tracking,
                    lineHeight: 1.15,
                  }}
                >
                  {samples[s.role] ?? "The quick brown fox"}
                </p>
                <div className="flex shrink-0 items-center gap-2 text-xs">
                  <span className="w-16 font-medium text-text-muted">{s.role}</span>
                  <Token>{s.token}</Token>
                  <span className="hidden w-14 text-right font-mono text-text-subtle sm:inline">{s.size}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Font weights */}
        <Section title="Font weights" description="Four weights carry the entire hierarchy.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fontWeights.map((w) => (
              <div key={w.token} className="rounded-xl border border-border bg-surface p-5 shadow-card">
                <p className="text-2xl text-text" style={{ fontWeight: Number(w.value) }}>
                  Ag
                </p>
                <p className="mt-3 text-sm font-medium text-text">{w.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Token>{w.token}</Token>
                  <span className="font-mono text-xs text-text-subtle">{w.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Bilingual prose */}
        <Section title="Bilingual prose" description="Real copy — English and Thai side by side at a comfortable measure.">
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-xl border border-border bg-surface p-6 shadow-card">
              <h3 className="text-xl font-semibold text-text">About TLIC</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                The Teaching &amp; Learning Innovation Center leads Chiang Mai University in creating
                learning media, modern teaching practices, and digital platforms. We support faculty
                with research-backed instructional design and analytics that improve outcomes.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                Every product built here draws from one shared design language — so tools feel
                familiar, accessible, and consistent from the first click.
              </p>
            </article>
            <article className="rounded-xl border border-border bg-surface p-6 shadow-card">
              <h3 className="font-thai text-xl font-semibold text-text">เกี่ยวกับ TLIC</h3>
              <p className="mt-3 font-thai text-sm leading-relaxed text-text-muted">
                {t("brand.tagline")}
                {" "}ศูนย์นวัตกรรมการสอนและการเรียนรู้ มหาวิทยาลัยเชียงใหม่
                สนับสนุนอาจารย์ด้วยการออกแบบการเรียนการสอนบนพื้นฐานงานวิจัย
                และการวิเคราะห์ข้อมูลเพื่อยกระดับผลลัพธ์การเรียนรู้
              </p>
              <p className="mt-3 font-thai text-sm leading-relaxed text-text-muted">
                ทุกผลิตภัณฑ์ถูกสร้างจากภาษาดีไซน์เดียวกัน เพื่อให้เครื่องมือใช้งานง่าย
                เข้าถึงได้ และสอดคล้องกันตั้งแต่คลิกแรก
              </p>
            </article>
          </div>
        </Section>
      </div>
    </div>
  );
}
