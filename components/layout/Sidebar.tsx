"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";
import { navGroups } from "@/lib/nav";
import { APP_VERSION } from "@/lib/release";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { t } = useLang();

  return (
    <nav className="scroll-slim flex-1 space-y-6 overflow-y-auto px-3 py-5">
      {navGroups.map((group) => (
        <div key={group.titleKey}>
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-text-subtle">
            {t(group.titleKey)}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary-50 text-primary-800 dark:bg-primary-500/15 dark:text-primary-100"
                        : "text-text-muted hover:bg-surface-hover hover:text-text"
                    )}
                  >
                    {active && (
                      <span className="absolute inset-y-1.5 left-0 w-1 rounded-full bg-primary-600" aria-hidden />
                    )}
                    <Icon
                      size={18}
                      className={cn(
                        "shrink-0 transition-colors",
                        active ? "text-primary-600 dark:text-primary-300" : "text-text-subtle group-hover:text-text-muted"
                      )}
                    />
                    {t(item.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarHeader({ onClose }: { onClose?: () => void }) {
  const { lang } = useLang();
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
      <Link href="/" onClick={onClose} className="flex flex-col leading-none">
        <Logo size="sm" />
        <span className="mt-1 text-[11px] font-medium uppercase tracking-wide text-text-subtle">
          {lang === "en" ? "Design System" : "ดีไซน์ซิสเต็ม"}
        </span>
      </Link>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex size-9 items-center justify-center rounded-lg text-text-muted hover:bg-surface-hover lg:hidden"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}

function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useLang();
  return (
    <div className="shrink-0 border-t border-border p-4">
      {/* The version is the entry point to the changelog — see lib/release.ts. */}
      <Link
        href="/changelog"
        onClick={onNavigate}
        className="block rounded-xl bg-brand-gradient p-4 text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <p className="text-sm font-semibold">{t("brand.name")}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/70">
          <span className="rounded bg-white/15 px-1.5 py-0.5 font-medium text-white">
            v{APP_VERSION}
          </span>
          {t("brand.university")}
        </p>
      </Link>
    </div>
  );
}

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop — fixed rail */}
      <aside className="glass glass-nav fixed inset-y-0 left-0 z-30 hidden w-64 flex-col rounded-none lg:flex">
        <SidebarHeader />
        <SidebarNav />
        <SidebarFooter />
      </aside>

      {/* Mobile — slide-in drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-(--overlay) transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={onClose}
        />
        <aside
          className={cn(
            "glass glass-strong absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col rounded-none transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SidebarHeader onClose={onClose} />
          <SidebarNav onNavigate={onClose} />
          <SidebarFooter onNavigate={onClose} />
        </aside>
      </div>
    </>
  );
}
