"use client";

import { useState } from "react";
import { PageHeader } from "@/components/showcase/PageHeader";
import { Tabs } from "@/components/ui/Tabs";
import { BrowserFrame, PhoneFrame } from "@/components/showcase/BrowserFrame";
import {
  DashboardPreview,
  SettingsPreview,
  LoginPreview,
  ProfilePreview,
  MobilePreview,
} from "@/components/showcase/previews";

const views = [
  { value: "dashboard", label: "Dashboard", url: "tlic.cmu.ac.th/dashboard", desc: "Sidebar + top bar with stats, a chart, and a data table — the core admin view." },
  { value: "settings", label: "Settings", url: "tlic.cmu.ac.th/settings", desc: "Vertical section nav beside grouped form cards and a sticky save action." },
  { value: "login", label: "Login", url: "tlic.cmu.ac.th/login", desc: "Split auth screen — a branded panel next to a focused sign-in form." },
  { value: "profile", label: "Profile", url: "tlic.cmu.ac.th/profile", desc: "Cover banner, overlapping avatar, stats, tabs, and a content grid." },
  { value: "mobile", label: "Mobile", url: "tlic.cmu.ac.th", desc: "A mobile-first home — not a shrunk desktop, but a purpose-built layout." },
];

export default function LayoutsPage() {
  const [view, setView] = useState("dashboard");
  const current = views.find((v) => v.value === view) ?? views[0];

  return (
    <div>
      <PageHeader titleKey="page.layouts.title" descKey="page.layouts.desc" />

      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="overflow-x-auto">
            <Tabs variant="pill" items={views} value={view} onValueChange={setView} />
          </div>
        </div>

        <p className="text-sm text-text-muted">{current.desc}</p>

        {view === "mobile" ? (
          <div className="flex justify-center rounded-xl border border-dashed border-border-strong bg-surface-2/40 p-6 sm:p-10">
            <PhoneFrame>
              <MobilePreview />
            </PhoneFrame>
          </div>
        ) : (
          <BrowserFrame url={current.url}>
            {view === "dashboard" && <DashboardPreview />}
            {view === "settings" && <SettingsPreview />}
            {view === "login" && <LoginPreview />}
            {view === "profile" && <ProfilePreview />}
          </BrowserFrame>
        )}
      </div>
    </div>
  );
}
