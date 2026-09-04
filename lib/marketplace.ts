/**
 * Marketplace catalogue — the sample works shown on `/marketplace`.
 *
 * This file is the single source of truth for that page. Add an entry here and
 * the card, the category filters, the tag list, the counts, and the detail
 * dialog all pick it up. No other file needs to change.
 *
 * ── Adding a work ───────────────────────────────────────────────────────────
 *  1. Drop a screenshot in `public/works/` (16:9 reads best, e.g. 1600×900).
 *     Skip it and the card falls back to a branded gradient placeholder.
 *  2. Append an entry to `works` below. Only `id`, `title`, `summary`, and
 *     `category` are required — every other field is optional.
 *  3. Newest first is the convention; `featured: true` pins an item to the top.
 *
 *     {
 *       id: "my-project",
 *       title: "My Project",
 *       summary: { en: "One line about it.", th: "คำอธิบายสั้น ๆ" },
 *       category: "web",
 *       year: 2026,
 *       image: "/works/my-project.png",
 *       tags: ["Next.js", "Figma"],
 *       links: [{ label: { en: "Visit site", th: "เปิดเว็บไซต์" }, href: "https://…" }],
 *     }
 *
 * The entries below are demonstration placeholders — replace them with real
 * work as it ships.
 */

import type { LucideIcon } from "lucide-react";
import {
  Globe,
  LayoutDashboard,
  Smartphone,
  PlaySquare,
  Bot,
  Palette,
} from "lucide-react";

export type Bilingual = { en: string; th: string };

/* -------------------------------------------------------------------------- */
/*  Categories                                                                */
/* -------------------------------------------------------------------------- */

export type WorkCategory = "web" | "dashboard" | "mobile" | "media" | "ai" | "brand";

/** Colour family used for the card placeholder and the category chip. */
export type CategoryTone = "primary" | "secondary" | "accent" | "success" | "warning" | "info";

export type CategoryMeta = {
  id: WorkCategory;
  label: Bilingual;
  icon: LucideIcon;
  tone: CategoryTone;
};

/** Filter order on the page follows this array. */
export const workCategories: CategoryMeta[] = [
  {
    id: "web",
    label: { en: "Web & Platform", th: "เว็บและแพลตฟอร์ม" },
    icon: Globe,
    tone: "primary",
  },
  {
    id: "dashboard",
    label: { en: "Dashboard & Admin", th: "แดชบอร์ดและระบบหลังบ้าน" },
    icon: LayoutDashboard,
    tone: "info",
  },
  {
    id: "mobile",
    label: { en: "Mobile", th: "โมบายแอป" },
    icon: Smartphone,
    tone: "secondary",
  },
  {
    id: "media",
    label: { en: "Learning Media", th: "สื่อการเรียนรู้" },
    icon: PlaySquare,
    tone: "warning",
  },
  {
    id: "ai",
    label: { en: "AI & Automation", th: "AI และระบบอัตโนมัติ" },
    icon: Bot,
    tone: "success",
  },
  {
    id: "brand",
    label: { en: "Brand & Design System", th: "แบรนด์และดีไซน์ซิสเต็ม" },
    icon: Palette,
    tone: "accent",
  },
];

/* -------------------------------------------------------------------------- */
/*  Works                                                                     */
/* -------------------------------------------------------------------------- */

/** Lifecycle of a work — rendered as a badge on the card. */
export type WorkStatus = "live" | "beta" | "prototype" | "archived";

export type WorkLink = {
  label: Bilingual;
  href: string;
};

export type Work = {
  /** Unique slug — the React key and the `?work=` deep link. */
  id: string;
  /** Product name. Shown as-is in both languages. */
  title: string;
  /** One line for the card. */
  summary: Bilingual;
  /** Longer copy for the detail dialog. Falls back to `summary`. */
  description?: Bilingual;
  category: WorkCategory;
  /** Defaults to "live". */
  status?: WorkStatus;
  /** Year or period shown in the card footer, e.g. 2026 or "2025–2026". */
  year?: string | number;
  /** Who built it. */
  team?: string;
  /** Free-form chips — also searchable and clickable as filters. */
  tags?: string[];
  /** Path under `public/`, e.g. "/works/my-project.png". Omit for a placeholder. */
  image?: string;
  /** "cover" (default) crops to fill; "contain" fits a logo or a tall shot. */
  imageFit?: "cover" | "contain";
  /** Bullet points for the detail dialog. */
  highlights?: { en: string[]; th: string[] };
  /** External links — opened in a new tab. */
  links?: WorkLink[];
  /** Pins the item to the top of the grid with a "Featured" badge. */
  featured?: boolean;
};

/** Newest first. Append new work at the top. */
export const works: Work[] = [
  {
    id: "tlic-design-system",
    title: "TLIC Design System",
    summary: {
      en: "The component library, token set, and showcase you are looking at right now.",
      th: "คลังคอมโพเนนต์ ชุด design token และหน้าโชว์เคสที่คุณกำลังดูอยู่นี้",
    },
    description: {
      en: "A brand-driven design system for TLIC products: 30+ typed React primitives, a token layer that drives light and dark mode from one place, and eleven showcase pages documenting how each piece is meant to be used.",
      th: "ดีไซน์ซิสเต็มที่ยึดแบรนด์ TLIC เป็นหลัก — คอมโพเนนต์ React แบบ typed กว่า 30 ตัว ชั้น design token ที่คุมทั้งโหมดสว่างและมืดจากที่เดียว และหน้าโชว์เคส 11 หน้าที่อธิบายวิธีใช้แต่ละส่วน",
    },
    category: "brand",
    status: "live",
    year: 2026,
    team: "TLIC · Design & Engineering",
    tags: ["Next.js", "Tailwind CSS", "Design tokens", "Dark mode", "EN / ไทย"],
    image: "/tlic-logo.png",
    imageFit: "contain",
    highlights: {
      en: [
        "Brand palette derived from the TLIC logo — T blue, L purple, I green, C coral",
        "Every token defined once in CSS and mirrored in TypeScript for the Copy Tokens feature",
        "Bilingual EN / ไทย chrome with a persisted preference",
      ],
      th: [
        "ชุดสีของแบรนด์ถอดมาจากโลโก้ TLIC — T น้ำเงิน L ม่วง I เขียว C ส้มแดง",
        "โทเคนทุกตัวนิยามครั้งเดียวใน CSS และมิเรอร์ไว้ใน TypeScript เพื่อใช้กับฟีเจอร์ Copy Tokens",
        "ส่วนติดต่อผู้ใช้สองภาษา EN / ไทย พร้อมจดจำภาษาที่เลือกไว้",
      ],
    },
    links: [
      {
        label: { en: "Prompt templates", th: "พรอมป์เทมเพลต" },
        href: "/prompts",
      },
    ],
    featured: true,
  },
  {
    id: "cmu-learning-hub",
    title: "CMU Learning Hub",
    summary: {
      en: "A course portal where learners browse, enrol, and track their progress in one place.",
      th: "พอร์ทัลรายวิชาที่ผู้เรียนค้นหา ลงทะเบียน และติดตามความคืบหน้าได้ในที่เดียว",
    },
    description: {
      en: "A public-facing catalogue paired with a personal learning space. Search, filters, and enrolment run on the same tokens and primitives as the rest of the system, so the portal stays visually consistent with the admin tools behind it.",
      th: "หน้ารวมรายวิชาสำหรับบุคคลทั่วไป คู่กับพื้นที่การเรียนรู้ส่วนตัว การค้นหา ตัวกรอง และการลงทะเบียนใช้ token และคอมโพเนนต์ชุดเดียวกับส่วนอื่นของระบบ ทำให้หน้าตาสอดคล้องกับเครื่องมือหลังบ้าน",
    },
    category: "web",
    status: "live",
    year: 2026,
    team: "TLIC · Platform",
    tags: ["Next.js", "Search", "Responsive", "Accessibility"],
    highlights: {
      en: [
        "Faceted search across courses, instructors, and skill tags",
        "Progress and certificates surfaced on the learner dashboard",
        "Keyboard-navigable throughout, checked against WCAG AA contrast",
      ],
      th: [
        "ค้นหาแบบหลายเงื่อนไข ทั้งรายวิชา ผู้สอน และแท็กทักษะ",
        "แสดงความคืบหน้าและใบรับรองบนแดชบอร์ดของผู้เรียน",
        "ใช้งานด้วยคีย์บอร์ดได้ทั้งหน้า และตรวจค่า contrast ตามมาตรฐาน WCAG AA",
      ],
    },
  },
  {
    id: "exam-operations-console",
    title: "Exam Operations Console",
    summary: {
      en: "An admin console for scheduling exams, seating candidates, and watching sessions live.",
      th: "คอนโซลผู้ดูแลสำหรับจัดตารางสอบ จัดที่นั่ง และติดตามการสอบแบบเรียลไทม์",
    },
    description: {
      en: "Data-dense screens built from the table, badge, and pagination primitives — designed so an operator can scan hundreds of rows and still spot the one session that needs attention.",
      th: "หน้าจอที่มีข้อมูลหนาแน่น ประกอบขึ้นจากคอมโพเนนต์ตาราง แบดจ์ และการแบ่งหน้า ออกแบบให้ผู้ดูแลกวาดสายตาผ่านข้อมูลหลายร้อยแถวแล้วยังเห็นรายการที่ต้องจัดการทันที",
    },
    category: "dashboard",
    status: "beta",
    year: 2026,
    team: "TLIC · Assessment",
    tags: ["Data tables", "Realtime", "Role-based access"],
    highlights: {
      en: [
        "Status badges map one-to-one onto the semantic colour tokens",
        "Bulk actions with an undo window instead of confirm-everything dialogs",
        "A density toggle for long invigilation shifts",
      ],
      th: [
        "แบดจ์สถานะจับคู่หนึ่งต่อหนึ่งกับโทเคนสีเชิงความหมาย",
        "ทำงานหลายรายการพร้อมกันได้ พร้อมช่วงเวลายกเลิก แทนการถามยืนยันทุกครั้ง",
        "สลับความหนาแน่นของตารางได้ สำหรับการคุมสอบเป็นเวลานาน",
      ],
    },
  },
  {
    id: "cmu-learn-mobile",
    title: "CMU Learn Mobile",
    summary: {
      en: "A mobile-first companion for lessons, deadlines, and announcements on the go.",
      th: "แอปคู่หูบนมือถือ สำหรับดูบทเรียน กำหนดส่งงาน และประกาศระหว่างเดินทาง",
    },
    description: {
      en: "Not a shrunken desktop view — a purpose-built layout with a bottom tab bar, thumb-reachable actions, and offline-friendly lesson caching.",
      th: "ไม่ใช่การย่อหน้าจอเดสก์ท็อป แต่เป็นเลย์เอาต์ที่ออกแบบมาเพื่อมือถือโดยเฉพาะ มีแถบแท็บด้านล่าง ปุ่มอยู่ในระยะนิ้วโป้ง และแคชบทเรียนไว้ใช้ตอนออฟไลน์",
    },
    category: "mobile",
    status: "prototype",
    year: 2026,
    team: "TLIC · Mobile",
    tags: ["Mobile-first", "Offline", "Push notifications"],
  },
  {
    id: "micro-lesson-media-kit",
    title: "Micro-lesson Media Kit",
    summary: {
      en: "Slide, thumbnail, and lower-third templates that keep every course video on brand.",
      th: "เทมเพลตสไลด์ ภาพปก และแถบชื่อ ที่ทำให้วิดีโอทุกรายวิชาอยู่ในแนวทางแบรนด์เดียวกัน",
    },
    description: {
      en: "A production kit for teaching teams recording their own micro-lessons: title cards, chapter breaks, caption styling, and export presets — all using the same palette and type scale as the software.",
      th: "ชุดเครื่องมือผลิตสื่อสำหรับทีมผู้สอนที่ถ่ายทำบทเรียนสั้นเอง ทั้งการ์ดชื่อเรื่อง คั่นบท สไตล์คำบรรยาย และค่าพรีเซ็ตการส่งออก โดยใช้ชุดสีและขนาดตัวอักษรเดียวกับซอฟต์แวร์",
    },
    category: "media",
    status: "live",
    year: 2025,
    team: "TLIC · Media Production",
    tags: ["Video", "Templates", "Brand"],
  },
  {
    id: "course-assistant",
    title: "Course Assistant",
    summary: {
      en: "An AI helper that drafts quizzes and lesson outlines from existing course material.",
      th: "ผู้ช่วย AI ที่ร่างแบบทดสอบและโครงบทเรียนจากเนื้อหารายวิชาที่มีอยู่",
    },
    description: {
      en: "Instructors upload their material and get a first draft they can edit — question banks, learning outcomes, and a suggested lesson order. Every generated item is shown as a draft awaiting review, never as finished content.",
      th: "ผู้สอนอัปโหลดเอกสารแล้วได้ร่างแรกที่แก้ไขต่อได้ ทั้งคลังคำถาม ผลลัพธ์การเรียนรู้ และลำดับบทเรียนที่แนะนำ ทุกชิ้นที่ระบบสร้างจะแสดงเป็นฉบับร่างที่รอการตรวจเสมอ ไม่ใช่เนื้อหาสำเร็จรูป",
    },
    category: "ai",
    status: "prototype",
    year: 2026,
    team: "TLIC · Innovation Lab",
    tags: ["AI", "Streaming UI", "Human review"],
    highlights: {
      en: [
        "Draft-first interface — nothing is published until an instructor approves it",
        "Streaming responses that reuse the skeleton states from the feedback page",
        "Every suggestion cites the source page it came from",
      ],
      th: [
        "ยึดแนวคิดร่างก่อนเสมอ ไม่มีอะไรถูกเผยแพร่จนกว่าผู้สอนจะอนุมัติ",
        "แสดงผลแบบสตรีมพร้อมสถานะสเกลตันจากหน้า Feedback",
        "ทุกข้อเสนอแนะอ้างอิงหน้าเอกสารต้นทางที่นำมาใช้",
      ],
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Derived helpers                                                           */
/* -------------------------------------------------------------------------- */

/** Look up a category's label, icon, and tone. Falls back to the first entry. */
export function categoryMeta(id: WorkCategory): CategoryMeta {
  return workCategories.find((c) => c.id === id) ?? workCategories[0];
}

/** How many works sit in each category — used for the filter counts. */
export function categoryCounts(items: Work[] = works): Record<string, number> {
  return items.reduce<Record<string, number>>((acc, w) => {
    acc[w.category] = (acc[w.category] ?? 0) + 1;
    return acc;
  }, {});
}

/**
 * Every tag used across the catalogue, de-duplicated and sorted.
 *
 * Plain code-unit ordering, not `localeCompare`: this list is rendered on the
 * server and hydrated on the client, and ICU collation differs between Node and
 * the browser — a locale-aware sort produces two different orders and breaks
 * hydration.
 */
export function allTags(items: Work[] = works): string[] {
  return [...new Set(items.flatMap((w) => w.tags ?? []))].sort();
}

/**
 * Featured works first; everything else keeps the order it has in `works`,
 * which is authored newest-first. `Array#sort` is stable, so nothing else moves.
 */
export function sortWorks(items: Work[]): Work[] {
  return [...items].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}
