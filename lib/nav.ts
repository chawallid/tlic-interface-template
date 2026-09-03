import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Palette,
  Type,
  MousePointerClick,
  FormInput,
  SquareStack,
  Compass,
  Table2,
  BellRing,
  PanelsTopLeft,
  Sparkles,
} from "lucide-react";
import type { TranslationKey } from "./i18n";

export type NavItem = {
  labelKey: TranslationKey;
  href: string;
  icon: LucideIcon;
};

export type NavGroup = {
  titleKey: TranslationKey;
  items: NavItem[];
};

/** Sidebar / mobile-menu structure, grouped by concern. */
export const navGroups: NavGroup[] = [
  {
    titleKey: "nav.group.foundations",
    items: [
      { labelKey: "nav.overview", href: "/", icon: LayoutDashboard },
      { labelKey: "nav.colors", href: "/colors", icon: Palette },
      { labelKey: "nav.typography", href: "/typography", icon: Type },
    ],
  },
  {
    titleKey: "nav.group.components",
    items: [
      { labelKey: "nav.buttons", href: "/buttons", icon: MousePointerClick },
      { labelKey: "nav.forms", href: "/forms", icon: FormInput },
      { labelKey: "nav.cards", href: "/cards", icon: SquareStack },
      { labelKey: "nav.navigation", href: "/navigation", icon: Compass },
      { labelKey: "nav.dataDisplay", href: "/data-display", icon: Table2 },
      { labelKey: "nav.feedback", href: "/feedback", icon: BellRing },
    ],
  },
  {
    titleKey: "nav.group.patterns",
    items: [
      { labelKey: "nav.layouts", href: "/layouts", icon: PanelsTopLeft },
      { labelKey: "nav.prompts", href: "/prompts", icon: Sparkles },
    ],
  },
];

/** Flat list of all routes, handy for search / prev-next. */
export const allNavItems: NavItem[] = navGroups.flatMap((g) => g.items);
