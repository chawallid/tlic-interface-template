# Changelog

All notable changes to the TLIC Design System Showcase.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [semantic versioning](https://semver.org/).

> The user-facing version of this page lives at [`/changelog`](http://localhost:3000/changelog).
> Both read from [`lib/release.ts`](lib/release.ts) — **update that file first**, then mirror it here.

## [1.3.0] — 2026-09-04

### Added
- **Glass surface utilities** (`.glass`, `.glass-strong`, `.glass-nav`) — translucent, blurred panels with a soft highlight border, tuned for both light and dark mode.
- **Ambient aurora backdrop** — three slow-drifting, brand-hued blurred blobs fixed behind the app shell, giving the glass panels colour to refract. Respects `prefers-reduced-motion`.

### Changed
- The sidebar, navbar, and the overview page's hero preview, brand tiles, feature cards, and dashboard-preview cards now use the glass surfaces instead of flat backgrounds.

## [1.2.0] — 2026-09-03

### Added
- **Marketplace page** (`/marketplace`) — a gallery of sample work built with the system: category and tag filters, search, a detail dialog with highlights and links, and shareable `#id` deep links.
- **`lib/marketplace.ts`** — the catalogue behind that page and the only file you touch to add a work. Cards, filters, tags, and counts all derive from it.
- **`public/works/`** — where screenshots live. A work without one falls back to a branded gradient placeholder, so it can be listed before its screenshot exists.

## [1.1.0] — 2026-09-03

### Added
- **Prompt Templates page** (`/prompts`) — pick Bootstrap or Retrofit, fill in your project details, and copy a ready-to-run prompt for handing this repository to an AI agent. The generated prompt follows the active UI language.
- **Changelog page** (`/changelog`) and a version badge in the sidebar that links to it.
- `PROMPTS.md` — read-only reference copy of both prompt templates.

### Fixed
- The hero heading on the overview page now renders white on the brand gradient. The `h1..h6 { color: var(--text) }` rule in the `@layer base` block was overriding the color inherited from the section.
- The logo in the login layout preview no longer stretches. It sits in a `flex-col justify-between` panel sized by a grid track, so the default `align-items: stretch` was expanding its width while `h-9` pinned its height.

### Changed
- Every name and email address in the demo content is now a clearly fictional placeholder (`Jane Cooper`, `@example.edu`, …) instead of realistic Thai names on the real `cmu.ac.th` domain, so nothing resembling real personal data ships in the showcase.

## [1.0.0] — 2026-07-20

### Added
- Ten showcase pages: overview, colors, typography, buttons, forms, cards, navigation, data display, feedback, and layout examples.
- A shared component library with brand color tokens derived from the TLIC logo.
- Light and dark mode, plus a bilingual English / ไทย interface.

## Releasing

1. Bump `APP_VERSION` in [`lib/release.ts`](lib/release.ts) and prepend a release entry (bilingual).
2. Match `version` in `package.json`.
3. Mirror the entry here.
