"use client";

import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "th";

type Entry = { en: string; th: string };

/**
 * Bilingual dictionary for the showcase chrome (navigation, section titles &
 * descriptions, and shared UI strings). Component *demo* content stays English.
 */
export const dictionary = {
  /* ---- Brand ---- */
  "brand.name": { en: "TLIC Design System", th: "TLIC Design System" },
  "brand.full": {
    en: "Teaching & Learning Innovation Center",
    th: "ศูนย์นวัตกรรมการสอนและการเรียนรู้",
  },
  "brand.university": { en: "Chiang Mai University", th: "มหาวิทยาลัยเชียงใหม่" },
  "brand.tagline": {
    en: "Leading innovation in learning media, teaching, and digital platforms.",
    th: "ผู้นำด้านนวัตกรรมสื่อการเรียน การสอน และการสร้างดิจิทัลแพลตฟอร์ม",
  },

  /* ---- Navigation groups ---- */
  "nav.group.foundations": { en: "Foundations", th: "พื้นฐาน" },
  "nav.group.components": { en: "Components", th: "คอมโพเนนต์" },
  "nav.group.patterns": { en: "Patterns", th: "รูปแบบ" },
  "nav.group.about": { en: "About", th: "เกี่ยวกับ" },

  /* ---- Navigation items ---- */
  "nav.overview": { en: "Overview", th: "ภาพรวม" },
  "nav.colors": { en: "Color System", th: "ระบบสี" },
  "nav.typography": { en: "Typography", th: "ตัวอักษร" },
  "nav.buttons": { en: "Buttons", th: "ปุ่ม" },
  "nav.forms": { en: "Form Components", th: "ฟอร์ม" },
  "nav.cards": { en: "Cards & Surfaces", th: "การ์ด" },
  "nav.navigation": { en: "Navigation", th: "การนำทาง" },
  "nav.dataDisplay": { en: "Data Display", th: "การแสดงข้อมูล" },
  "nav.feedback": { en: "Feedback", th: "การตอบสนอง" },
  "nav.layouts": { en: "Layout Examples", th: "ตัวอย่างเลย์เอาต์" },
  "nav.prompts": { en: "Prompt Templates", th: "พรอมป์เทมเพลต" },
  "nav.changelog": { en: "Changelog", th: "การเปลี่ยนแปลง" },

  /* ---- Common UI ---- */
  "ui.search": { en: "Search components…", th: "ค้นหาคอมโพเนนต์…" },
  "ui.viewComponents": { en: "View Components", th: "ดูคอมโพเนนต์" },
  "ui.copyTokens": { en: "Copy Tokens", th: "คัดลอก Tokens" },
  "ui.tokensCopied": { en: "Design tokens copied to clipboard", th: "คัดลอก Tokens แล้ว" },
  "ui.copied": { en: "Copied!", th: "คัดลอกแล้ว!" },
  "ui.copy": { en: "Copy", th: "คัดลอก" },
  "ui.theme": { en: "Toggle theme", th: "สลับธีม" },
  "ui.language": { en: "Language", th: "ภาษา" },
  "ui.menu": { en: "Menu", th: "เมนู" },
  "ui.getStarted": { en: "Get Started", th: "เริ่มต้นใช้งาน" },
  "ui.usage": { en: "Usage", th: "การใช้งาน" },
  "ui.preview": { en: "Preview", th: "ตัวอย่าง" },

  /* ---- Page: Overview ---- */
  "page.overview.title": { en: "Overview", th: "ภาพรวม" },
  "page.overview.desc": {
    en: "A cohesive, brand-driven design system for TLIC products — tokens, components, and patterns in one place.",
    th: "ระบบดีไซน์ที่สอดคล้องกับแบรนด์ TLIC — รวม Tokens คอมโพเนนต์ และรูปแบบไว้ในที่เดียว",
  },
  "page.overview.heroTitle": {
    en: "Build TLIC products with one consistent design language.",
    th: "สร้างผลิตภัณฑ์ TLIC ด้วยภาษาดีไซน์เดียวที่สอดคล้องกัน",
  },
  "page.overview.heroSub": {
    en: "Production-ready components, brand color tokens, and layout patterns — crafted for SaaS dashboards, admin tools, and internal web apps.",
    th: "คอมโพเนนต์พร้อมใช้งานจริง โทเคนสีของแบรนด์ และรูปแบบเลย์เอาต์ — ออกแบบสำหรับแดชบอร์ด SaaS เครื่องมือแอดมิน และเว็บแอปภายในองค์กร",
  },

  /* ---- Page: Colors ---- */
  "page.colors.title": { en: "Color System", th: "ระบบสี" },
  "page.colors.desc": {
    en: "Brand palettes derived from the TLIC logo, plus theme-aware semantic tokens. Click any swatch to copy its token.",
    th: "ชุดสีของแบรนด์ที่มาจากโลโก้ TLIC พร้อมโทเคนเชิงความหมายที่รองรับธีม คลิกที่ตัวอย่างสีเพื่อคัดลอกโทเคน",
  },

  /* ---- Page: Typography ---- */
  "page.typography.title": { en: "Typography", th: "ตัวอักษร" },
  "page.typography.desc": {
    en: "Inter for Latin UI and Noto Sans Thai for Thai — a clear type scale from display down to caption.",
    th: "ใช้ฟอนต์ Inter สำหรับภาษาอังกฤษและ Noto Sans Thai สำหรับภาษาไทย พร้อมลำดับขนาดตัวอักษรที่ชัดเจน",
  },

  /* ---- Page: Buttons ---- */
  "page.buttons.title": { en: "Buttons", th: "ปุ่ม" },
  "page.buttons.desc": {
    en: "Every variant, size, and state — primary, secondary, outline, ghost, danger, loading, and icon-only.",
    th: "ครบทุกรูปแบบ ขนาด และสถานะ — primary, secondary, outline, ghost, danger, loading และแบบไอคอน",
  },

  /* ---- Page: Forms ---- */
  "page.forms.title": { en: "Form Components", th: "ฟอร์ม" },
  "page.forms.desc": {
    en: "Inputs, selects, toggles, and choices with default, focus, error, and disabled states plus validation.",
    th: "ช่องกรอกข้อมูล ตัวเลือก สวิตช์ และตัวเลือกต่าง ๆ พร้อมสถานะปกติ โฟกัส ผิดพลาด และปิดใช้งาน รวมถึงการตรวจสอบความถูกต้อง",
  },

  /* ---- Page: Cards ---- */
  "page.cards.title": { en: "Cards & Surfaces", th: "การ์ดและพื้นผิว" },
  "page.cards.desc": {
    en: "Composable surfaces — basic, stat, profile, pricing, feature, and notification cards with consistent elevation.",
    th: "พื้นผิวที่ประกอบได้ — การ์ดพื้นฐาน สถิติ โปรไฟล์ ราคา ฟีเจอร์ และการแจ้งเตือน ด้วยเงาและระยะที่สม่ำเสมอ",
  },

  /* ---- Page: Navigation ---- */
  "page.navigation.title": { en: "Navigation", th: "การนำทาง" },
  "page.navigation.desc": {
    en: "Sidebar, top navbar, breadcrumbs, tabs, and a mobile menu — all with clear active states.",
    th: "แถบข้าง แถบนำทางด้านบน เบรดครัมบ์ แท็บ และเมนูมือถือ — พร้อมสถานะที่กำลังใช้งานที่ชัดเจน",
  },

  /* ---- Page: Data Display ---- */
  "page.dataDisplay.title": { en: "Data Display", th: "การแสดงข้อมูล" },
  "page.dataDisplay.desc": {
    en: "Tables, badges, avatars, progress, pagination, status labels, and empty states for data-dense screens.",
    th: "ตาราง แบดจ์ อวาตาร์ แถบความคืบหน้า การแบ่งหน้า ป้ายสถานะ และสถานะว่าง สำหรับหน้าจอที่มีข้อมูลจำนวนมาก",
  },

  /* ---- Page: Feedback ---- */
  "page.feedback.title": { en: "Feedback Components", th: "การตอบสนอง" },
  "page.feedback.desc": {
    en: "Alerts, toasts, modals, confirm dialogs, and loading skeletons that keep users informed.",
    th: "การแจ้งเตือน โทสต์ โมดัล กล่องยืนยัน และสเกลตันขณะโหลด ที่ทำให้ผู้ใช้รับรู้สถานะเสมอ",
  },

  /* ---- Page: Layouts ---- */
  "page.layouts.title": { en: "Layout Examples", th: "ตัวอย่างเลย์เอาต์" },
  "page.layouts.desc": {
    en: "Real page compositions built from the system — dashboard, settings, login, profile, and a mobile-first view.",
    th: "หน้าเว็บจริงที่ประกอบจากระบบนี้ — แดชบอร์ด ตั้งค่า เข้าสู่ระบบ โปรไฟล์ และมุมมองแบบ mobile-first",
  },

  /* ---- Page: Prompt templates ---- */
  "page.prompts.title": { en: "Prompt Templates", th: "พรอมป์เทมเพลต" },
  "page.prompts.desc": {
    en: "Pick a template, fill in your project, and copy a ready-to-run prompt that points an AI agent at this repository.",
    th: "เลือกรูปแบบ ใส่รายละเอียดโปรเจกต์ แล้วคัดลอก prompt ที่พร้อมใช้ ซึ่งชี้ให้ AI agent มาอ้างอิง repository นี้",
  },

  /* ---- Page: Changelog ---- */
  "page.changelog.title": { en: "Changelog", th: "บันทึกการเปลี่ยนแปลง" },
  "page.changelog.desc": {
    en: "What changed in each release of this design system, newest first.",
    th: "สรุปสิ่งที่เปลี่ยนแปลงในแต่ละเวอร์ชันของดีไซน์ซิสเต็มนี้ เรียงจากใหม่ไปเก่า",
  },
} satisfies Record<string, Entry>;

export type TranslationKey = keyof typeof dictionary;

/* -------------------------------------------------------------------------- */
/*  Provider + hooks                                                          */
/* -------------------------------------------------------------------------- */

const STORAGE_KEY = "tlic-lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Load the saved preference after mount (avoids hydration mismatch).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "th") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Plain functions: the provider only re-renders when `lang` changes, so these
  // always close over the current value without stale-closure risk.
  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore quota / private-mode errors */
    }
  };

  const toggleLang = () => setLang(lang === "en" ? "th" : "en");

  const t = (key: TranslationKey) => {
    const entry = dictionary[key];
    return entry ? entry[lang] : key;
  };

  return createElement(
    LanguageContext.Provider,
    { value: { lang, setLang, toggleLang, t } },
    children
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}
