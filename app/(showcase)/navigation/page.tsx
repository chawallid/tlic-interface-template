"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  Menu,
} from "lucide-react";
import { PageHeader } from "@/components/showcase/PageHeader";
import { Section } from "@/components/showcase/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

const miniNav = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Courses", icon: BookOpen, active: false },
  { label: "Learners", icon: Users, active: false },
  { label: "Analytics", icon: BarChart3, active: false },
  { label: "Settings", icon: Settings, active: false },
];

const tabItems = [
  { value: "overview", label: "Overview" },
  { value: "curriculum", label: "Curriculum" },
  { value: "reviews", label: "Reviews" },
  { value: "settings", label: "Settings", icon: <Settings /> },
];

const tabCopy: Record<string, string> = {
  overview: "A high-level summary of the course, its goals, and outcomes.",
  curriculum: "Modules, lessons, and assessments organized week by week.",
  reviews: "What learners are saying — ratings and written feedback.",
  settings: "Visibility, enrollment rules, and certificate options.",
};

export default function NavigationPage() {
  const [tab, setTab] = useState("overview");
  const [pillTab, setPillTab] = useState("day");

  return (
    <div>
      <PageHeader titleKey="page.navigation.title" descKey="page.navigation.desc" />

      <div className="space-y-12">
        <Section title="Breadcrumb" description="Shows the path back up the hierarchy.">
          <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Courses", href: "/" },
                { label: "Digital Learning", href: "/" },
                { label: "Module 3" },
              ]}
            />
          </div>
        </Section>

        <Section title="Tabs" description="Line and pill styles — both controlled here with live panels.">
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
              <Tabs items={tabItems} value={tab} onValueChange={setTab} />
              <p className="mt-5 text-sm text-text-muted">{tabCopy[tab]}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
              <Tabs
                variant="pill"
                items={[
                  { value: "day", label: "Day" },
                  { value: "week", label: "Week" },
                  { value: "month", label: "Month" },
                ]}
                value={pillTab}
                onValueChange={setPillTab}
              />
              <p className="mt-5 text-sm text-text-muted">
                Viewing analytics for the selected <span className="font-medium text-text">{pillTab}</span> range.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Sidebar navigation" description="Grouped links with a clear active state and accent rail.">
          <div className="max-w-xs overflow-hidden rounded-xl border border-border bg-surface p-3 shadow-card">
            <ul className="space-y-0.5">
              {miniNav.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <span
                      className={cn(
                        "relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        item.active
                          ? "bg-primary-50 text-primary-800 dark:bg-primary-500/15 dark:text-primary-100"
                          : "text-text-muted hover:bg-surface-hover hover:text-text"
                      )}
                    >
                      {item.active && (
                        <span className="absolute inset-y-1.5 left-0 w-1 rounded-full bg-primary-600" />
                      )}
                      <Icon
                        size={18}
                        className={item.active ? "text-primary-600 dark:text-primary-300" : "text-text-subtle"}
                      />
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Section>

        <Section title="Top navbar" description="A sticky bar with search, actions, and the current user.">
          <div className="overflow-hidden rounded-xl border border-border shadow-card">
            <div className="flex h-16 items-center gap-3 border-b border-border bg-surface px-4">
              <Logo size="sm" />
              <div className="relative ml-4 hidden flex-1 sm:block">
                <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle" />
                <div className="h-9 w-full max-w-xs rounded-lg border border-border bg-surface-2 pl-9 pr-3 text-sm leading-9 text-text-subtle">
                  Search…
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="relative inline-flex size-9 items-center justify-center rounded-lg text-text-muted">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-1.5 rounded-full bg-accent-500" />
                </span>
                <Avatar name="Jane Cooper" accent="primary" size="sm" status="active" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Mobile menu" description="On small screens the sidebar becomes a slide-in drawer.">
          <div className="flex justify-center rounded-xl border border-dashed border-border-strong bg-surface-2/40 p-6">
            <div className="w-64 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
              <div className="flex h-14 items-center justify-between border-b border-border px-4">
                <Logo size="sm" />
                <Menu size={18} className="text-text-muted" />
              </div>
              <ul className="space-y-0.5 p-3">
                {miniNav.slice(0, 4).map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.label}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                        item.active
                          ? "bg-primary-50 text-primary-800 dark:bg-primary-500/15 dark:text-primary-100"
                          : "text-text-muted"
                      )}
                    >
                      <Icon size={18} className={item.active ? "text-primary-600 dark:text-primary-300" : "text-text-subtle"} />
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-text-muted">
            Resize the window below <code className="font-mono text-xs">lg</code> to try the real drawer.
          </p>
        </Section>
      </div>
    </div>
  );
}
