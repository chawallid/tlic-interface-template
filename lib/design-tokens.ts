/**
 * TLIC Design Tokens — TypeScript source of truth.
 *
 * Mirrors styles/tokens.css so the showcase can render swatches, copy tokens,
 * and document the system programmatically. Keep this file in sync with the CSS.
 */

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
};

export type ColorFamily = {
  /** token prefix, e.g. "primary" → primary-500 */
  key: string;
  /** display name */
  name: string;
  /** short role description (EN) */
  role: string;
  /** which step reads as the "base" swatch */
  base: keyof ColorScale;
  scale: ColorScale;
};

/* -------------------------------------------------------------------------- */
/*  Brand color families                                                      */
/* -------------------------------------------------------------------------- */

export const colorFamilies: ColorFamily[] = [
  {
    key: "primary",
    name: "Primary",
    role: "TLIC blue / navy — the “T”. Core brand & primary actions.",
    base: 800,
    scale: {
      50: "#eaf3fa",
      100: "#cbe0f1",
      200: "#9ec6e4",
      300: "#6ba6d3",
      400: "#4090c9",
      500: "#2b7db8",
      600: "#21659b",
      700: "#1b5280",
      800: "#15406a",
      900: "#0f3052",
      950: "#0a2138",
    },
  },
  {
    key: "secondary",
    name: "Secondary",
    role: "Purple — the “L”. Supporting emphasis & secondary actions.",
    base: 500,
    scale: {
      50: "#f1eff9",
      100: "#ddd8f0",
      200: "#beb6e1",
      300: "#9a8ecf",
      400: "#7c6ebe",
      500: "#6455ac",
      600: "#544593",
      700: "#453979",
      800: "#362d60",
      900: "#271f45",
    },
  },
  {
    key: "accent",
    name: "Accent",
    role: "Coral / pink — top of the “C”. Highlights & marketing accents.",
    base: 400,
    scale: {
      50: "#fdecef",
      100: "#fbd0d9",
      200: "#f6a6b6",
      300: "#f17c93",
      400: "#ee5a78",
      500: "#e23d60",
      600: "#c82e50",
      700: "#a62642",
      800: "#7f1e33",
      900: "#5c1626",
    },
  },
  {
    key: "success",
    name: "Success",
    role: "Green — the “I”. Positive states & confirmations.",
    base: 500,
    scale: {
      50: "#f0f8e7",
      100: "#dbeec2",
      200: "#bfe08e",
      300: "#a0d25a",
      400: "#8cc63f",
      500: "#74ac2e",
      600: "#5c8c24",
      700: "#46701c",
      800: "#365516",
      900: "#24380f",
    },
  },
  {
    key: "warning",
    name: "Warning",
    role: "Amber — cautionary states & pending review.",
    base: 500,
    scale: {
      50: "#fef6e7",
      100: "#fce7bf",
      200: "#f9d489",
      300: "#f7c153",
      400: "#f5b740",
      500: "#ee9f17",
      600: "#c97f0b",
      700: "#9d610a",
      800: "#7a4c0d",
      900: "#653f10",
    },
  },
  {
    key: "error",
    name: "Error",
    role: "Crimson — bottom of the “C”. Destructive actions & failures.",
    base: 500,
    scale: {
      50: "#fdecef",
      100: "#fad0d7",
      200: "#f5a3b0",
      300: "#ee7183",
      400: "#e24e6e",
      500: "#c93b5a",
      600: "#ac2e49",
      700: "#8c243b",
      800: "#6f1f30",
      900: "#5a1b29",
    },
  },
  {
    key: "neutral",
    name: "Neutral",
    role: "Cool, navy-tinted grays for text, surfaces & borders.",
    base: 500,
    scale: {
      50: "#f7f9fb",
      100: "#eef1f5",
      200: "#e2e7ee",
      300: "#cdd5df",
      400: "#9aa5b4",
      500: "#6c7889",
      600: "#4e5a6b",
      700: "#3a4552",
      800: "#262e39",
      900: "#141a22",
      950: "#0c1017",
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Semantic tokens (theme-aware)                                             */
/* -------------------------------------------------------------------------- */

export type SemanticToken = {
  token: string;
  css: string;
  light: string;
  dark: string;
  usage: string;
};

export const semanticTokens: SemanticToken[] = [
  { token: "bg", css: "--bg", light: "#f7f9fb", dark: "#0a0f16", usage: "App background" },
  { token: "surface", css: "--surface", light: "#ffffff", dark: "#121a24", usage: "Cards, sheets, menus" },
  { token: "surface-2", css: "--surface-2", light: "#f2f5f9", dark: "#1a2430", usage: "Inset / subtle panels" },
  { token: "border", css: "--border", light: "#e2e7ee", dark: "#26333f", usage: "Dividers & outlines" },
  { token: "text", css: "--text", light: "#141a22", dark: "#eef2f7", usage: "Primary text" },
  { token: "text-muted", css: "--text-muted", light: "#6c7889", dark: "#9aa5b4", usage: "Secondary text" },
  { token: "text-subtle", css: "--text-subtle", light: "#9aa5b4", dark: "#6c7889", usage: "Captions & hints" },
  { token: "ring", css: "--ring", light: "#2b7db8", dark: "#4090c9", usage: "Focus ring" },
];

/* -------------------------------------------------------------------------- */
/*  Scale tokens                                                              */
/* -------------------------------------------------------------------------- */

export const radii = [
  { token: "rounded-md", value: "0.375rem", px: "6px" },
  { token: "rounded-lg", value: "0.625rem", px: "10px" },
  { token: "rounded-xl", value: "0.875rem", px: "14px" },
  { token: "rounded-2xl", value: "1.125rem", px: "18px" },
  { token: "rounded-full", value: "9999px", px: "pill" },
];

export const shadows = [
  { token: "shadow-xs", usage: "Hairline lift (inputs, chips)" },
  { token: "shadow-sm", usage: "Buttons & small controls" },
  { token: "shadow-card", usage: "Cards & surfaces" },
  { token: "shadow-lg", usage: "Popovers & dropdowns" },
  { token: "shadow-xl", usage: "Modals & dialogs" },
];

export const spacingScale = [
  { token: "1", value: "0.25rem", px: "4px" },
  { token: "2", value: "0.5rem", px: "8px" },
  { token: "3", value: "0.75rem", px: "12px" },
  { token: "4", value: "1rem", px: "16px" },
  { token: "6", value: "1.5rem", px: "24px" },
  { token: "8", value: "2rem", px: "32px" },
  { token: "12", value: "3rem", px: "48px" },
  { token: "16", value: "4rem", px: "64px" },
];

export const typographyScale = [
  { token: "text-5xl", role: "Display", size: "3rem", weight: "700", tracking: "-0.02em" },
  { token: "text-4xl", role: "H1", size: "2.25rem", weight: "700", tracking: "-0.02em" },
  { token: "text-3xl", role: "H2", size: "1.875rem", weight: "700", tracking: "-0.015em" },
  { token: "text-2xl", role: "H3", size: "1.5rem", weight: "600", tracking: "-0.01em" },
  { token: "text-xl", role: "H4", size: "1.25rem", weight: "600", tracking: "-0.01em" },
  { token: "text-lg", role: "H5", size: "1.125rem", weight: "600", tracking: "0" },
  { token: "text-base", role: "H6 / Body", size: "1rem", weight: "400", tracking: "0" },
  { token: "text-sm", role: "Small", size: "0.875rem", weight: "400", tracking: "0" },
  { token: "text-xs", role: "Caption", size: "0.75rem", weight: "500", tracking: "0.01em" },
];

export const fontWeights = [
  { token: "font-normal", name: "Regular", value: "400" },
  { token: "font-medium", name: "Medium", value: "500" },
  { token: "font-semibold", name: "Semibold", value: "600" },
  { token: "font-bold", name: "Bold", value: "700" },
];

/* -------------------------------------------------------------------------- */
/*  Serialization for the "Copy Tokens" feature                              */
/* -------------------------------------------------------------------------- */

/** Flatten every brand + semantic color into a `{ "primary-500": "#..." }` map. */
export function flattenColorTokens(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const family of colorFamilies) {
    for (const [step, hex] of Object.entries(family.scale)) {
      if (hex) out[`${family.key}-${step}`] = hex;
    }
  }
  return out;
}

/** Export the palette as ready-to-paste CSS custom properties. */
export function tokensToCss(): string {
  const lines = Object.entries(flattenColorTokens()).map(
    ([name, hex]) => `  --${name}: ${hex};`
  );
  return `:root {\n${lines.join("\n")}\n}`;
}

/** Export the palette as a JSON string. */
export function tokensToJson(): string {
  return JSON.stringify(flattenColorTokens(), null, 2);
}
