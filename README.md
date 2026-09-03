# TLIC Design System Showcase

A production-ready **Design System Showcase** for the **Teaching &amp; Learning Innovation Center (TLIC), Chiang Mai University** — built with Next.js, TypeScript, and Tailwind CSS v4.

The brand palette is derived directly from the TLIC logo: **T = blue/navy**, **L = purple**, **I = green**, **C = coral → crimson**, anchored by a signature deep navy. The whole system supports **light/dark mode** and a **bilingual (EN / ไทย)** UI.

---

## ✨ What's inside

A shared component library plus **11 showcase pages**, each with a title, description, and live examples:

| # | Page | Highlights |
|---|------|-----------|
| 1 | **Overview** (`/`) | Hero, brand concept, dashboard preview, “Copy Tokens” CTA |
| 2 | **Color System** (`/colors`) | 7 brand scales + semantic tokens, click-a-swatch to copy |
| 3 | **Typography** (`/typography`) | Inter + Noto Sans Thai, full type scale, weights, bilingual prose |
| 4 | **Buttons** (`/buttons`) | 6 variants · 3 sizes · icon / loading / disabled |
| 5 | **Forms** (`/forms`) | Inputs, select, textarea, checkbox, radio, toggle, date + live validation |
| 6 | **Cards** (`/cards`) | Basic, stat, profile, pricing, feature, notification |
| 7 | **Navigation** (`/navigation`) | Sidebar, navbar, breadcrumb, tabs, mobile menu |
| 8 | **Data Display** (`/data-display`) | Table + pagination, badges, avatars, progress, empty state |
| 9 | **Feedback** (`/feedback`) | Alerts, toasts, modal, confirm dialog, skeletons |
| 10 | **Layout Examples** (`/layouts`) | Framed Dashboard / Settings / Login / Profile / Mobile previews |
| 11 | **Prompt Templates** (`/prompts`) | Pick Bootstrap or Retrofit, fill in your project, copy a ready-to-run prompt |

---

## 🚀 Getting started

**Requirements:** Node.js 18.18+ (tested on Node 24) and npm.

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

> ### ⚠️ This machine has `NODE_ENV=production` set globally
> That single setting causes **two** problems, both already handled:
>
> **1. `npm install` silently skips devDependencies** (Tailwind, TypeScript, types) → the build fails with `Cannot find module '@tailwindcss/postcss'`. Always install with:
> ```bash
> npm install --include=dev
> ```
>
> **2. `next dev` breaks.** With a non-standard `NODE_ENV`, Next skips its Tailwind/PostCSS pipeline and fails to parse `globals.css` (`Module parse failed: Unexpected character '@'`). To fix this, `npm run dev` goes through [`scripts/dev.mjs`](scripts/dev.mjs), a tiny zero-dependency wrapper that forces `NODE_ENV=development`. Use `npm run dev` (not `next dev` directly).
>
> The permanent fix is to remove the global `NODE_ENV=production` from your environment — it breaks dev tooling well beyond this project.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (forces `NODE_ENV=development` — **use this**) |
| `npm run dev:plain` | Raw `next dev` (fails if `NODE_ENV=production` is set) |
| `npm run build` | Production build (type-checks + lints) |
| `npm start` | Serve the production build |

> **Switching between `dev` and `build`?** They share the `.next` folder and their artifacts are not compatible. If you see `Cannot find module './611.js'` or similar, just delete the cache and re-run:
> ```bash
> rm -rf .next && npm run dev
> ```

---

## 🧱 Project structure

```
app/
  layout.tsx            # Root: fonts, providers, no-flash theme script
  globals.css           # Tailwind import + @theme token mapping + base styles
  not-found.tsx         # Branded 404
  (showcase)/
    layout.tsx          # Sidebar + navbar shell (AppShell)
    page.tsx            # Overview
    colors/ typography/ buttons/ forms/ cards/
    navigation/ data-display/ feedback/ layouts/
components/
  ui/                   # 30+ reusable primitives (Button, Card, Input, Modal, …)
  layout/               # Sidebar, Navbar, AppShell, ThemeToggle, LanguageToggle, Logo
  showcase/             # Page scaffolding: PageHeader, Section, ColorSwatch, previews…
lib/
  design-tokens.ts      # TS source of truth for colors, type, spacing (powers Copy Tokens)
  mock-data.ts          # Learners, courses, enrollments, stats, notifications, pricing
  i18n.ts               # EN/TH dictionary + LanguageProvider + useLang()/t()
  nav.ts                # Sidebar navigation config
  utils.ts              # cn(), formatters, clipboard helper
styles/
  tokens.css            # All design tokens as CSS custom properties (+ dark overrides)
```

---

## 🎨 Design tokens

Tokens live in **two synced places**:

- **`styles/tokens.css`** — the runtime source of truth. Brand scales (`--primary-500` …) are static; semantic tokens (`--bg`, `--surface`, `--text`, `--border` …) are redefined under `.dark`.
- **`lib/design-tokens.ts`** — the same values in TypeScript, used to render the Color System page and the **Copy Tokens** feature.

`app/globals.css` maps these into Tailwind's theme with `@theme inline`, so you get utilities like `bg-primary-500`, `text-text-muted`, `border-border`, and `shadow-card` that automatically adapt to the active theme.

**To re-brand:** edit the hex values in `styles/tokens.css` (and mirror them in `lib/design-tokens.ts`). Every component updates automatically.

---

## 🌗 Dark mode &amp; 🌐 language

- **Dark mode** — class-based (`.dark` on `<html>`), toggled from the navbar, persisted to `localStorage`, with an inline script that applies the saved theme **before paint** (no flash). Defaults to the OS preference.
- **Bilingual (EN / ไทย)** — a lightweight in-house i18n layer (`lib/i18n.ts`). The navbar toggle switches all showcase chrome (nav, page titles, descriptions). Component demo content stays English. Preference is persisted.

---

## 🧩 Component conventions

- Every component is typed, reusable, and composed with a `cn()` helper (`clsx` + `tailwind-merge`).
- Focus-visible rings, ARIA roles, and keyboard handling (Esc-to-close modals, `role="switch"`, etc.) are built in.
- Import from the barrel: `import { Button, Card, Badge } from "@/components/ui"`.

---

## 📌 Limitations &amp; notes

- **Fonts** (`Inter`, `Noto Sans Thai`) are fetched by `next/font/google` at build time, so the **first build needs network access**. Next caches them afterward.
- **`NODE_ENV=production` in the shell** breaks both `npm install` (omits devDependencies) and `next dev` (skips the PostCSS pipeline) — see the note above. Worked around via `--include=dev` and `scripts/dev.mjs`.
- **`.next` is shared** by dev and production builds; interleaving `npm run build` and `npm run dev` can leave incompatible artifacts. Delete `.next` when switching.
- Toasts, modals, tables, and forms are **front-end demos** — there is no backend, and all data in `lib/mock-data.ts` is static.
- Icons are limited to the **lucide-react** set.
- Layout examples on `/layouts` are **framed previews** (a browser/phone chrome) rather than standalone routes, so navigating the showcase stays intact.

---

Built for the **Teaching &amp; Learning Innovation Center · Chiang Mai University**.
