"use client";

import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { allNavItems } from "@/lib/nav";
import { Avatar } from "@/components/ui/Avatar";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

function useCurrentTitle() {
  const pathname = usePathname();
  const { t } = useLang();
  const match =
    [...allNavItems]
      .sort((a, b) => b.href.length - a.href.length)
      .find((i) => (i.href === "/" ? pathname === "/" : pathname.startsWith(i.href))) ??
    allNavItems[0];
  return t(match.labelKey);
}

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { t } = useLang();
  const title = useCurrentTitle();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-surface/85 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="inline-flex size-10 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-hover hover:text-text lg:hidden"
      >
        <Menu size={20} />
      </button>

      <h1 className="truncate text-base font-semibold text-text lg:hidden">{title}</h1>

      {/* Search — decorative on mobile, functional-looking on desktop */}
      <div className="relative ml-auto hidden w-full max-w-xs lg:block">
        <Search
          size={17}
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle"
        />
        <input
          type="search"
          placeholder={t("ui.search")}
          className="h-10 w-full rounded-lg border border-border bg-surface-2 pl-9 pr-3 text-sm text-text placeholder:text-text-subtle transition-colors focus-visible:border-primary-500 focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 lg:ml-3">
        <LanguageToggle className="hidden sm:inline-flex" />
        <ThemeToggle />
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex size-10 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-hover hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <Bell size={19} />
          <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-accent-500 ring-2 ring-surface" />
        </button>
        <div className="ml-1 hidden sm:block">
          <Avatar name="Jane Cooper" accent="primary" size="sm" status="active" />
        </div>
      </div>
    </header>
  );
}
