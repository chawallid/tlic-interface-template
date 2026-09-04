/**
 * Release metadata for the showcase.
 *
 * This is the single source of truth for the version shown in the sidebar and
 * the entries rendered on `/changelog`. When you cut a release:
 *   1. bump `version` in package.json to match `APP_VERSION`
 *   2. prepend a new entry to `releases`
 *   3. mirror it in CHANGELOG.md
 */

export type ChangeKind = "added" | "changed" | "fixed";

export type Change = {
  kind: ChangeKind;
  en: string;
  th: string;
};

export type Release = {
  version: string;
  /** ISO date (YYYY-MM-DD) — formatted per locale at render time. */
  date: string;
  summary: { en: string; th: string };
  changes: Change[];
};

/** Current version — keep in sync with package.json. */
export const APP_VERSION = "1.2.0";

/** Newest first. The first entry is treated as the current release. */
export const releases: Release[] = [
  {
    version: "1.2.0",
    date: "2026-09-03",
    summary: {
      en: "A marketplace page for showing off work built with the system, driven by a single data file.",
      th: "เพิ่มหน้ามาร์เก็ตเพลสสำหรับแสดงผลงานที่สร้างด้วยระบบนี้ โดยอ่านข้อมูลจากไฟล์เดียว",
    },
    changes: [
      {
        kind: "added",
        en: "Marketplace page (/marketplace) — a gallery of sample work with category and tag filters, search, a detail dialog, and shareable #id links.",
        th: "หน้ามาร์เก็ตเพลส (/marketplace) — แกลเลอรีตัวอย่างผลงาน พร้อมตัวกรองหมวดหมู่และแท็ก ช่องค้นหา กล่องรายละเอียด และลิงก์ #id ที่ส่งต่อได้",
      },
      {
        kind: "added",
        en: "lib/marketplace.ts — the catalogue behind that page. Adding a work is one entry in this file; the cards, filters, tags, and counts follow automatically.",
        th: "ไฟล์ lib/marketplace.ts — คลังข้อมูลของหน้านั้น เพิ่มผลงานใหม่ด้วยการเพิ่มรายการเดียวในไฟล์นี้ แล้วการ์ด ตัวกรอง แท็ก และจำนวนจะอัปเดตตามเอง",
      },
      {
        kind: "added",
        en: "public/works/ for screenshots. A work without one falls back to a branded gradient placeholder, so it can be listed before its screenshot exists.",
        th: "โฟลเดอร์ public/works/ สำหรับเก็บภาพหน้าจอ ผลงานที่ยังไม่มีภาพจะแสดงพื้นหลังกราเดียนต์ของแบรนด์แทน จึงลงรายการก่อนมีภาพได้",
      },
    ],
  },
  {
    version: "1.1.0",
    date: "2026-09-03",
    summary: {
      en: "A prompt generator for reusing the system, a changelog, and fixes from design review.",
      th: "เพิ่มตัวสร้าง prompt สำหรับนำระบบไปใช้ต่อ หน้าบันทึกการเปลี่ยนแปลง และแก้ไขจากการรีวิวดีไซน์",
    },
    changes: [
      {
        kind: "added",
        en: "Prompt Templates page (/prompts) — pick Bootstrap or Retrofit, fill in your project, and copy a ready-to-run prompt. The generated prompt follows the active language.",
        th: "หน้าพรอมป์เทมเพลต (/prompts) — เลือกแบบเริ่มระบบใหม่หรือปรับปรุงระบบเดิม กรอกรายละเอียดโปรเจกต์ แล้วคัดลอก prompt ไปใช้ได้ทันที โดย prompt จะออกตามภาษาที่เลือกอยู่",
      },
      {
        kind: "added",
        en: "This changelog (/changelog), plus a version badge in the sidebar that links to it.",
        th: "หน้าบันทึกการเปลี่ยนแปลงนี้ (/changelog) พร้อมป้ายเวอร์ชันในแถบเมนูที่กดเข้ามาดูได้",
      },
      {
        kind: "fixed",
        en: "The hero heading on the overview page now renders white on the brand gradient — a base heading style was overriding the inherited color.",
        th: "หัวข้อใหญ่บนหน้าภาพรวมแสดงเป็นสีขาวบนพื้นกราเดียนต์ถูกต้องแล้ว — เดิมถูกสไตล์พื้นฐานของหัวข้อทับสีที่สืบทอดมา",
      },
      {
        kind: "fixed",
        en: "The logo in the login layout preview no longer stretches — it now keeps its natural proportions.",
        th: "โลโก้ในตัวอย่างเลย์เอาต์หน้าเข้าสู่ระบบไม่ยืดผิดสัดส่วนอีกต่อไป",
      },
      {
        kind: "changed",
        en: "Every name and email address in the demo content is now a clearly fictional placeholder, so nothing resembling real personal data ships in the showcase.",
        th: "ชื่อและอีเมลทั้งหมดในเนื้อหาตัวอย่างเปลี่ยนเป็นข้อมูลสมมุติที่ชัดเจนแล้ว เพื่อไม่ให้มีข้อมูลที่ดูเหมือนข้อมูลบุคคลจริงอยู่ในระบบ",
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-07-20",
    summary: {
      en: "First release of the TLIC Design System Showcase.",
      th: "เวอร์ชันแรกของ TLIC Design System Showcase",
    },
    changes: [
      {
        kind: "added",
        en: "Ten showcase pages covering colors, typography, buttons, forms, cards, navigation, data display, feedback, and layout examples.",
        th: "หน้าตัวอย่างสิบหน้า ครอบคลุมระบบสี ตัวอักษร ปุ่ม ฟอร์ม การ์ด การนำทาง การแสดงข้อมูล การตอบสนอง และตัวอย่างเลย์เอาต์",
      },
      {
        kind: "added",
        en: "A shared component library with brand color tokens derived from the TLIC logo.",
        th: "ไลบรารีคอมโพเนนต์กลาง พร้อมโทเคนสีของแบรนด์ที่ถอดมาจากโลโก้ TLIC",
      },
      {
        kind: "added",
        en: "Light and dark mode, and a bilingual English / ไทย interface.",
        th: "โหมดสว่างและมืด พร้อมอินเทอร์เฟซสองภาษา อังกฤษ / ไทย",
      },
    ],
  },
];

/** The newest release — what the sidebar badge points at. */
export const currentRelease = releases[0];

/**
 * Format a release date for display.
 * Pinned to UTC so the server and client agree (a local timezone could shift
 * the day and trip a hydration mismatch). Thai dates come back in the
 * Buddhist era, which is what `th-TH` readers expect.
 */
export function formatReleaseDate(iso: string, lang: "en" | "th"): string {
  return new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
