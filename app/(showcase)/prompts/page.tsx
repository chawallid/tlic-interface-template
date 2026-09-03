"use client";

import { useState } from "react";
import { Rocket, Wrench, GitBranch, Check } from "lucide-react";
import { PageHeader } from "@/components/showcase/PageHeader";
import { Section } from "@/components/showcase/Section";
import { CopyButton } from "@/components/showcase/CopyButton";
import { Badge, Card, FormField, Input, Select } from "@/components/ui";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const REPO_URL = "https://github.com/chawallid/tlic-interface-template.git";

/* -------------------------------------------------------------------------- */
/*  Template catalogue                                                        */
/* -------------------------------------------------------------------------- */

type TemplateKind = "bootstrap" | "retrofit";

type TemplateMeta = {
  kind: TemplateKind;
  icon: typeof Rocket;
  tone: "primary" | "secondary";
  title: { en: string; th: string };
  tagline: { en: string; th: string };
  when: { en: string; th: string };
  bullets: { en: string[]; th: string[] };
};

const templates: TemplateMeta[] = [
  {
    kind: "bootstrap",
    icon: Rocket,
    tone: "primary",
    title: { en: "Bootstrap", th: "เริ่มระบบใหม่" },
    tagline: {
      en: "Start a new project from this template",
      th: "สร้างโปรเจกต์ใหม่จาก template นี้",
    },
    when: {
      en: "You are starting from zero and want this component library and token set as the foundation.",
      th: "เริ่มจากศูนย์ และอยากใช้ component กับ design token ชุดนี้เป็นฐาน",
    },
    bullets: {
      en: ["Clone + fresh git history", "Re-brand every touchpoint", "Retune tokens", "Swap the mock data"],
      th: ["Clone + เริ่ม git ใหม่", "เปลี่ยนแบรนด์ทุกจุด", "ปรับ design token", "เปลี่ยน mock data"],
    },
  },
  {
    kind: "retrofit",
    icon: Wrench,
    tone: "secondary",
    title: { en: "Retrofit", th: "ปรับปรุงระบบเดิม" },
    tagline: {
      en: "Improve an existing system's design code",
      th: "ยกระดับ design code ของระบบที่มีอยู่",
    },
    when: {
      en: "You already have a working system and want to raise its UI to this design language — without a rewrite.",
      th: "มีระบบใช้งานอยู่แล้ว อยากยกระดับ UI ให้เข้ากับ design language นี้ โดยไม่ rewrite",
    },
    bullets: {
      en: ["Study the reference", "Audit as a table", "Plan before editing", "Apply in small commits"],
      th: ["ศึกษา reference", "ทำ audit เป็นตาราง", "วางแผนก่อนแก้", "แก้ทีละกลุ่ม"],
    },
  },
];

/* ---- Option lists for the config form ---- */

const domains = [
  { value: "elearning", en: "E-learning / LMS", th: "อีเลิร์นนิง / LMS", entities: "learners, courses, enrollments" },
  { value: "ecommerce", en: "E-commerce", th: "อีคอมเมิร์ซ", entities: "orders, products, customers" },
  { value: "admin", en: "Internal admin tool", th: "ระบบหลังบ้าน", entities: "users, roles, audit logs" },
  { value: "crm", en: "CRM / Sales", th: "CRM / งานขาย", entities: "leads, deals, activities" },
  { value: "healthcare", en: "Healthcare", th: "สุขภาพ / โรงพยาบาล", entities: "patients, appointments, visit records" },
];

const stacks = [
  { value: "nextjs", label: "Next.js (App Router)" },
  { value: "react", label: "React + Vite" },
  { value: "vue", label: "Vue / Nuxt" },
  { value: "other", label: "Other / legacy stack" },
];

const focuses = [
  {
    value: "all",
    en: "Everything (tokens → components → layout)",
    th: "ทั้งหมด (token → component → layout)",
    checklistEn:
      "hardcoded colors/spacing that should be tokens · duplicated components · missing states (hover / focus-visible / disabled / loading / empty) · dark mode + accessibility",
    checklistTh:
      "สี/ระยะที่ hardcode ไว้และควรเป็น token · component ที่ซ้ำซ้อน · สถานะที่ขาด (hover / focus-visible / disabled / loading / empty) · dark mode และ accessibility",
  },
  {
    value: "tokens",
    en: "Design tokens & color only",
    th: "เฉพาะ token และสี",
    checklistEn: "hardcoded colors, spacing, radii, and shadows that should become design tokens",
    checklistTh: "สี ระยะ มุมโค้ง และเงา ที่ hardcode ไว้และควรเปลี่ยนเป็น design token",
  },
  {
    value: "components",
    en: "Component consistency only",
    th: "เฉพาะความสม่ำเสมอของ component",
    checklistEn: "duplicated or inconsistent components that should collapse into one shared primitive",
    checklistTh: "component ที่ซ้ำซ้อนหรือไม่สม่ำเสมอ ซึ่งควรยุบเหลือตัวกลางตัวเดียว",
  },
  {
    value: "a11y",
    en: "Accessibility & dark mode only",
    th: "เฉพาะ accessibility และ dark mode",
    checklistEn: "contrast ratios, focus-visible rings, touch target size, and dark-mode correctness",
    checklistTh: "ค่า contrast, focus-visible ring, ขนาดพื้นที่กด และความถูกต้องของ dark mode",
  },
];

/* -------------------------------------------------------------------------- */
/*  Prompt builders                                                           */
/* -------------------------------------------------------------------------- */

type Config = {
  projectName: string;
  brandName: string;
  domain: string;
  targetPath: string;
  stack: string;
  focus: string;
  branch: string;
};

function buildBootstrap(cfg: Config, lang: Lang): string {
  const project = cfg.projectName.trim() || "my-app";
  const brand = cfg.brandName.trim() || (lang === "en" ? "[brand name]" : "[ชื่อแบรนด์]");
  const domain = domains.find((d) => d.value === cfg.domain) ?? domains[0];

  if (lang === "th") {
    return `ใช้ design system นี้เป็นจุดตั้งต้นของโปรเจกต์ใหม่:
${REPO_URL}  (branch: ${cfg.branch})

ชื่อโปรเจกต์: ${project}
ชื่อแบรนด์: ${brand}
โดเมนงาน: ${domain.th}

1) SETUP
   - git clone ${REPO_URL} ${project}
   - ลบ git history เดิมแล้วเริ่มใหม่ (rm -rf .git && git init)
   - npm install --include=dev   ← ต้องใส่ --include=dev
   - npm run dev                 ← ใช้ script นี้ ห้ามเรียก next dev ตรง ๆ

2) RE-BRAND  เปลี่ยนจาก "TLIC" เป็น "${brand}" ทุกจุด:
   - lib/i18n.ts               ข้อความ EN / ไทย ทั้งหมด
   - components/layout/Logo.tsx + ไฟล์โลโก้ใน /public
   - app/layout.tsx            metadata (title, description, favicon)
   - package.json, README.md

3) DESIGN TOKENS  ปรับใน app/globals.css และ tailwind.config.ts:
   - primary / secondary / accent ให้ตรงกับ brand guideline ใหม่
   - ตรวจ contrast ให้ผ่าน WCAG AA ทั้ง light และ dark mode
   - คงชื่อ token เดิมไว้ (primary-500, text-muted ฯลฯ) เพื่อไม่ให้ component พัง

4) MOCK DATA  แทนที่ lib/mock-data.ts ด้วยข้อมูลของโดเมน "${domain.th}"
   (เอนทิตีหลัก: ${domain.entities})
   ⚠️ ใช้ชื่อ-อีเมลสมมุติเท่านั้น (@example.com) ห้ามใส่ข้อมูลบุคคลจริง

5) VERIFY  รัน npm run dev แล้วเปิดตรวจทุกหน้า
   (/ /colors /typography /buttons /forms /cards /navigation /data-display /feedback /layouts)
   ทั้ง light/dark mode และ EN/ไทย ก่อน commit แรก`;
  }

  return `Use this design system as the starting template for a new project:
${REPO_URL}  (branch: ${cfg.branch})

Project name: ${project}
Brand name: ${brand}
Domain: ${domain.en}

1) SETUP
   - git clone ${REPO_URL} ${project}
   - drop the old git history and start fresh (rm -rf .git && git init)
   - npm install --include=dev   ← the --include=dev flag is required
   - npm run dev                 ← use this script, never \`next dev\` directly

2) RE-BRAND  replace every "TLIC" reference with "${brand}":
   - lib/i18n.ts               all EN / TH strings
   - components/layout/Logo.tsx + the logo asset in /public
   - app/layout.tsx            metadata (title, description, favicon)
   - package.json, README.md

3) DESIGN TOKENS  in app/globals.css and tailwind.config.ts:
   - retune primary / secondary / accent to the new brand palette
   - verify WCAG AA contrast in both light and dark mode
   - keep the existing token names (primary-500, text-muted, …) so components keep working

4) MOCK DATA  replace lib/mock-data.ts with data for the "${domain.en}" domain
   (core entities: ${domain.entities})
   ⚠️ Use fictional names and @example.com addresses only — never real personal data.

5) VERIFY  run npm run dev and check every page
   (/ /colors /typography /buttons /forms /cards /navigation /data-display /feedback /layouts)
   in light + dark mode and EN + TH before the first commit.`;
}

function buildRetrofit(cfg: Config, lang: Lang): string {
  const target = cfg.targetPath.trim() || (lang === "en" ? "[path or URL of my project]" : "[path หรือ URL ของโปรเจกต์]");
  const stack = stacks.find((s) => s.value === cfg.stack) ?? stacks[0];
  const focus = focuses.find((f) => f.value === cfg.focus) ?? focuses[0];

  if (lang === "th") {
    return `ใช้ design system นี้เป็น "reference implementation":
${REPO_URL}  (branch: ${cfg.branch})

ระบบเดิมของผมอยู่ที่: ${target}
Stack: ${stack.label}
ขอบเขตที่ต้องการปรับ: ${focus.th}

1) STUDY  อ่าน reference ก่อนเริ่มแก้ (ดึงผ่าน git ได้เลย):
   - app/globals.css           ชุด design token + base layer
   - components/ui/*           Button, Card, Input, Badge, Avatar, Modal
   - components/layout/*       Sidebar, Navbar, Logo
   - README.md                 หลักการของระบบ
   สรุปให้ผมก่อนว่า token / pattern หลักมีอะไรบ้าง

2) AUDIT  เทียบระบบเดิมกับ reference แล้วทำรายงานเป็นตาราง:
   | จุดที่พบ | ไฟล์:บรรทัด | ปัญหา | แนวทางแก้ตาม reference |
   เน้นเรื่อง: ${focus.checklistTh}

3) PLAN  เสนอลำดับการแก้แบบ incremental (token → component → layout)
   พร้อมประเมินผลกระทบต่อหน้าจอที่มีอยู่ อย่าเพิ่งแก้จนกว่าผมจะอนุมัติ

4) APPLY  เมื่ออนุมัติแล้ว แก้ทีละกลุ่ม + commit แยกเป็นเรื่อง ๆ
   ข้อกำหนด:
   - ห้ามเปลี่ยน business logic / API contract
   - คง API ของ component เดิมไว้ ถ้าจำเป็นต้องเปลี่ยนให้แจ้งก่อน
   - ทุกหน้าต้องผ่านทั้ง light และ dark mode

5) VERIFY  รัน build + เปิดดูจริงทุกหน้าที่แตะ แล้วสรุป before/after ให้ผม`;
  }

  return `Use this design system as a reference implementation:
${REPO_URL}  (branch: ${cfg.branch})

My existing project: ${target}
Stack: ${stack.label}
Scope of this pass: ${focus.en}

1) STUDY  read the reference first (pull it via git):
   - app/globals.css           design tokens + base layer
   - components/ui/*           Button, Card, Input, Badge, Avatar, Modal
   - components/layout/*       Sidebar, Navbar, Logo
   - README.md                 the principles behind the system
   Summarise the key tokens and patterns back to me before touching anything.

2) AUDIT  compare my project against the reference, report as a table:
   | Finding | file:line | Problem | Fix per reference |
   Focus on: ${focus.checklistEn}

3) PLAN  propose an incremental order (tokens → components → layout) with the
   blast radius of each step. Do not edit anything until I approve.

4) APPLY  once approved, work group by group with one commit per concern.
   Rules:
   - do not change business logic or API contracts
   - keep existing component APIs stable; flag it first if a break is unavoidable
   - every screen must pass in both light and dark mode

5) VERIFY  run the build, open every page you touched, then give me a before/after summary.`;
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function PromptsPage() {
  const { lang } = useLang();
  const [kind, setKind] = useState<TemplateKind>("bootstrap");
  const [cfg, setCfg] = useState<Config>({
    projectName: "my-app",
    brandName: "",
    domain: "elearning",
    targetPath: "",
    stack: "nextjs",
    focus: "all",
    branch: "main",
  });

  const set = <K extends keyof Config>(key: K, value: Config[K]) =>
    setCfg((c) => ({ ...c, [key]: value }));

  const prompt = kind === "bootstrap" ? buildBootstrap(cfg, lang) : buildRetrofit(cfg, lang);
  const th = lang === "th";

  return (
    <div>
      <PageHeader
        titleKey="page.prompts.title"
        descKey="page.prompts.desc"
        actions={
          <CopyButton
            value={`git clone ${REPO_URL}`}
            label={th ? "คัดลอก git clone" : "Copy git clone"}
            copiedLabel={th ? "คัดลอกแล้ว!" : "Copied!"}
            size="sm"
          />
        }
      />

      <div className="space-y-12">
        {/* ---- Step 1: pick a template ---- */}
        <Section
          title={th ? "1. เลือกรูปแบบที่ต้องการ" : "1. Choose a template"}
          description={
            th
              ? "สองรูปแบบนี้อ้าง repository เดียวกัน ต่างกันที่ใช้เป็นจุดตั้งต้น หรือใช้เป็นต้นแบบอ้างอิง"
              : "Both reference the same repository — the difference is whether it becomes your starting point or your reference."
          }
        >
          <div role="radiogroup" className="grid gap-4 md:grid-cols-2">
            {templates.map((tpl) => {
              const Icon = tpl.icon;
              const on = tpl.kind === kind;
              return (
                <button
                  key={tpl.kind}
                  role="radio"
                  aria-checked={on}
                  onClick={() => setKind(tpl.kind)}
                  className={cn(
                    "rounded-xl border bg-surface p-5 text-left shadow-card transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                    on
                      ? "border-primary-500 ring-2 ring-primary-500/25"
                      : "border-border hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        "flex size-11 items-center justify-center rounded-lg",
                        tpl.tone === "primary"
                          ? "bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300"
                          : "bg-secondary-50 text-secondary-600 dark:bg-secondary-500/15 dark:text-secondary-300"
                      )}
                    >
                      <Icon size={22} />
                    </div>
                    {on ? (
                      <Badge tone="primary" appearance="solid" size="sm">
                        <Check size={12} />
                        {th ? "เลือกอยู่" : "Selected"}
                      </Badge>
                    ) : (
                      <Badge tone="neutral" size="sm">
                        {th ? "กดเพื่อเลือก" : "Click to select"}
                      </Badge>
                    )}
                  </div>

                  <h3 className="mt-4 font-semibold text-text">{tpl.title[lang]}</h3>
                  <p className="mt-0.5 text-sm font-medium text-text-muted">{tpl.tagline[lang]}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{tpl.when[lang]}</p>

                  <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
                    {tpl.bullets[lang].map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-text-subtle">
                        <Check size={13} className="shrink-0 text-success-500" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </Section>

        {/* ---- Step 2: fill in the details ---- */}
        <Section
          title={th ? "2. ใส่รายละเอียดโปรเจกต์" : "2. Fill in your project details"}
          description={
            th
              ? "ค่าที่กรอกจะถูกแทรกลงใน prompt ด้านล่างทันที"
              : "Everything you type is interpolated into the prompt below as you go."
          }
        >
          <Card className="p-5 sm:p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {kind === "bootstrap" ? (
                <>
                  <FormField
                    label={th ? "ชื่อโปรเจกต์" : "Project name"}
                    htmlFor="p-project"
                    hint={th ? "ใช้เป็นชื่อโฟลเดอร์ตอน git clone" : "Used as the git clone target folder"}
                  >
                    <Input
                      id="p-project"
                      value={cfg.projectName}
                      onChange={(e) => set("projectName", e.target.value)}
                      placeholder="my-app"
                    />
                  </FormField>
                  <FormField label={th ? "ชื่อแบรนด์" : "Brand name"} htmlFor="p-brand">
                    <Input
                      id="p-brand"
                      value={cfg.brandName}
                      onChange={(e) => set("brandName", e.target.value)}
                      placeholder={th ? "เช่น Acme Learning" : "e.g. Acme Learning"}
                    />
                  </FormField>
                  <FormField
                    label={th ? "โดเมนงาน" : "Domain"}
                    htmlFor="p-domain"
                    hint={th ? "กำหนดว่า mock data จะเป็นข้อมูลแบบไหน" : "Decides what the mock data becomes"}
                  >
                    <Select
                      id="p-domain"
                      value={cfg.domain}
                      onChange={(e) => set("domain", e.target.value)}
                    >
                      {domains.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d[lang]}
                        </option>
                      ))}
                    </Select>
                  </FormField>
                </>
              ) : (
                <>
                  <FormField
                    label={th ? "ที่อยู่โปรเจกต์เดิม" : "Existing project"}
                    htmlFor="p-target"
                    hint={th ? "path ในเครื่อง หรือ URL ของ repo" : "A local path or a repo URL"}
                  >
                    <Input
                      id="p-target"
                      value={cfg.targetPath}
                      onChange={(e) => set("targetPath", e.target.value)}
                      placeholder="~/projects/legacy-admin"
                    />
                  </FormField>
                  <FormField label="Stack" htmlFor="p-stack">
                    <Select
                      id="p-stack"
                      value={cfg.stack}
                      onChange={(e) => set("stack", e.target.value)}
                    >
                      {stacks.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </Select>
                  </FormField>
                  <FormField
                    label={th ? "ขอบเขตที่ต้องการปรับ" : "Scope of this pass"}
                    htmlFor="p-focus"
                    className="sm:col-span-2"
                  >
                    <Select
                      id="p-focus"
                      value={cfg.focus}
                      onChange={(e) => set("focus", e.target.value)}
                    >
                      {focuses.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f[lang]}
                        </option>
                      ))}
                    </Select>
                  </FormField>
                </>
              )}

              <FormField
                label={th ? "Git branch / tag" : "Git branch / tag"}
                htmlFor="p-branch"
                hint={th ? "ระบุให้ชัดเพื่อให้ผลลัพธ์คงที่" : "Pin it so results stay reproducible"}
              >
                <Input
                  id="p-branch"
                  value={cfg.branch}
                  onChange={(e) => set("branch", e.target.value)}
                  placeholder="main"
                  leftIcon={<GitBranch />}
                />
              </FormField>
            </div>
          </Card>
        </Section>

        {/* ---- Step 3: copy the result ---- */}
        <Section
          title={th ? "3. คัดลอก prompt ไปใช้งาน" : "3. Copy your prompt"}
          description={
            th
              ? "วางลงใน Claude Code, Cursor หรือ agent ตัวไหนก็ได้ที่เข้าถึง git ได้"
              : "Paste it into Claude Code, Cursor, or any agent that can reach git."
          }
          actions={
            <CopyButton
              value={prompt}
              label={th ? "คัดลอก prompt" : "Copy prompt"}
              copiedLabel={th ? "คัดลอกแล้ว!" : "Copied!"}
              variant="primary"
              size="sm"
            />
          }
        >
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-2 px-4 py-2.5">
              <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                <GitBranch size={14} />
                <span className="font-mono">{cfg.branch}</span>
                <span className="text-text-subtle">·</span>
                <span>{templates.find((t) => t.kind === kind)?.title[lang]}</span>
              </div>
              <span className="text-xs text-text-subtle">
                {prompt.split("\n").length} {th ? "บรรทัด" : "lines"}
              </span>
            </div>
            <pre className="max-h-[520px] overflow-auto p-4 text-xs leading-relaxed text-text sm:p-5 sm:text-[13px]">
              <code className="font-mono">{prompt}</code>
            </pre>
          </div>
        </Section>
      </div>
    </div>
  );
}
