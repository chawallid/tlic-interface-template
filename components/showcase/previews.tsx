import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  Search,
  Home,
  User,
  Bell,
  Plus,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { stats, enrollments, courses } from "@/lib/mock-data";
import { Logo } from "@/components/layout/Logo";
import { StatCard } from "@/components/ui/StatCard";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge, Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Toggle } from "@/components/ui/Toggle";
import { Tabs } from "@/components/ui/Tabs";

const railNav = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Courses", icon: BookOpen, active: false },
  { label: "Learners", icon: Users, active: false },
  { label: "Analytics", icon: BarChart3, active: false },
  { label: "Settings", icon: Settings, active: false },
];

const chart = [42, 58, 47, 72, 63, 88, 79];

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */
export function DashboardPreview() {
  return (
    <div className="flex min-h-[600px]">
      <aside className="hidden w-52 shrink-0 flex-col border-r border-border bg-surface p-3 sm:flex">
        <div className="px-2 py-2">
          <Logo size="sm" />
        </div>
        <nav className="mt-2 space-y-0.5">
          {railNav.map((n) => {
            const Icon = n.icon;
            return (
              <span
                key={n.label}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                  n.active
                    ? "bg-primary-50 text-primary-800 dark:bg-primary-500/15 dark:text-primary-100"
                    : "text-text-muted"
                )}
              >
                <Icon size={17} className={n.active ? "text-primary-600 dark:text-primary-300" : "text-text-subtle"} />
                {n.label}
              </span>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b border-border bg-surface px-4">
          <span className="text-sm font-semibold text-text">Dashboard</span>
          <div className="ml-auto hidden items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs text-text-subtle sm:flex">
            <Search size={14} /> Search…
          </div>
          <Avatar name="Nattapong Wong" accent="primary" size="sm" status="active" />
        </header>

        <main className="flex-1 space-y-4 p-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.id} stat={s} />
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-surface p-4 shadow-card lg:col-span-2">
              <p className="text-sm font-semibold text-text">Weekly engagement</p>
              <div className="mt-4 flex h-32 items-end gap-2">
                {chart.map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <div
                      className="w-full rounded-t-md bg-primary-500/80"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[10px] text-text-subtle">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
              <p className="text-sm font-semibold text-text">Top courses</p>
              <div className="mt-3 space-y-3">
                {courses.map((c) => (
                  <div key={c.id}>
                    <p className="truncate text-xs font-medium text-text">{c.title}</p>
                    <Progress value={Number(c.learners.replace(/\D/g, "")) / 30} size="sm" tone={c.accent as "primary"} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
            <div className="border-b border-border px-4 py-3 text-sm font-semibold text-text">
              Recent enrollments
            </div>
            <ul className="divide-y divide-border">
              {enrollments.slice(0, 3).map((e) => (
                <li key={e.id} className="flex items-center gap-3 px-4 py-2.5">
                  <Avatar name={e.learner} accent={e.accent} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text">{e.learner}</p>
                    <p className="truncate text-xs text-text-subtle">{e.course}</p>
                  </div>
                  <StatusBadge status={e.status} />
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Settings                                                           */
/* ------------------------------------------------------------------ */
const settingsTabs = ["General", "Account", "Notifications", "Billing", "Security"];

export function SettingsPreview() {
  return (
    <div className="p-5 sm:p-8">
      <h1 className="text-xl font-bold text-text">Settings</h1>
      <p className="mt-1 text-sm text-text-muted">Manage your profile, account, and preferences.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[190px_1fr]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {settingsTabs.map((tabName, i) => (
            <span
              key={tabName}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium",
                i === 0
                  ? "bg-primary-50 text-primary-800 dark:bg-primary-500/15 dark:text-primary-100"
                  : "text-text-muted"
              )}
            >
              {tabName}
            </span>
          ))}
        </nav>

        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
            <p className="text-sm font-semibold text-text">Profile</p>
            <div className="mt-4 flex items-center gap-4">
              <Avatar name="Nattapong Wong" accent="primary" size="lg" />
              <Button variant="outline" size="sm">Change photo</Button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FormField label="Full name" htmlFor="s-name">
                <Input id="s-name" defaultValue="Nattapong Wong" />
              </FormField>
              <FormField label="Email" htmlFor="s-email">
                <Input id="s-email" defaultValue="nattapong.w@cmu.ac.th" />
              </FormField>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
            <p className="text-sm font-semibold text-text">Notifications</p>
            <div className="mt-4 space-y-4">
              <Toggle defaultChecked label="Email notifications" description="Weekly digest and updates" />
              <Toggle defaultChecked label="Course activity" description="New enrollments and completions" />
              <Toggle label="Product marketing" description="News, tips, and offers" />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Login                                                              */
/* ------------------------------------------------------------------ */
export function LoginPreview() {
  return (
    <div className="grid min-h-[600px] lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-brand-gradient p-10 text-white lg:flex">
        <Logo size="md" mono="white" />
        <div>
          <p className="text-2xl font-bold leading-snug">
            Innovate how the world learns.
          </p>
          <p className="mt-3 max-w-xs text-sm text-white/70">
            ผู้นำด้านนวัตกรรมสื่อการเรียน การสอน และการสร้างดิจิทัลแพลตฟอร์ม
          </p>
        </div>
        <p className="text-xs text-white/60">© 2026 TLIC · Chiang Mai University</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Logo size="md" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-text">Welcome back</h1>
          <p className="mt-1 text-sm text-text-muted">Sign in to your TLIC account.</p>

          <div className="mt-6 space-y-4">
            <FormField label="Email" htmlFor="l-email">
              <Input id="l-email" type="email" placeholder="you@cmu.ac.th" defaultValue="nattapong.w@cmu.ac.th" />
            </FormField>
            <FormField label="Password" htmlFor="l-pass">
              <PasswordInput id="l-pass" placeholder="••••••••" defaultValue="password" />
            </FormField>
            <div className="flex items-center justify-between">
              <Toggle size="sm" defaultChecked label="Remember me" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Forgot password?</span>
            </div>
            <Button fullWidth size="lg">Sign in</Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-text-subtle">or continue with</span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline">Google</Button>
            <Button variant="outline">Microsoft</Button>
          </div>
          <p className="mt-6 text-center text-sm text-text-muted">
            Don&apos;t have an account?{" "}
            <span className="font-medium text-primary-700 dark:text-primary-300">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Profile                                                            */
/* ------------------------------------------------------------------ */
export function ProfilePreview() {
  return (
    <div className="min-h-[600px]">
      <div className="h-28 bg-brand-gradient sm:h-32" />
      <div className="px-5 pb-6 sm:px-8">
        <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="rounded-full ring-4 ring-surface">
            <Avatar name="Ploychompoo Sri" accent="secondary" size="xl" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-text">Ploychompoo Sri</h1>
            <p className="text-sm text-text-muted">Content Producer · TLIC, Chiang Mai University</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Message</Button>
            <Button size="sm" leftIcon={<Plus />}>Follow</Button>
          </div>
        </div>

        <div className="mt-6 grid max-w-md grid-cols-3 gap-3">
          {[
            { n: "24", l: "Courses" },
            { n: "3,120", l: "Learners" },
            { n: "4.9", l: "Rating" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-surface p-3 text-center shadow-card">
              <p className="text-lg font-bold text-text">{s.n}</p>
              <p className="text-xs text-text-muted">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Tabs items={[{ value: "about", label: "About" }, { value: "courses", label: "Courses" }, { value: "activity", label: "Activity" }]} />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-card lg:col-span-2">
            <p className="text-sm font-semibold text-text">About</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Content producer focused on interactive video and instructional design. I help faculty
              turn their expertise into engaging, accessible online courses.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="primary">Video</Badge>
              <Badge tone="secondary">Instructional Design</Badge>
              <Badge tone="success">Accessibility</Badge>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
            <p className="text-sm font-semibold text-text">Latest courses</p>
            <ul className="mt-3 space-y-3">
              {courses.slice(0, 3).map((c) => (
                <li key={c.id} className="flex items-center gap-2 text-sm text-text">
                  <BookOpen size={15} className="shrink-0 text-text-subtle" />
                  <span className="truncate">{c.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile-first                                                       */
/* ------------------------------------------------------------------ */
const mobileTabs = [
  { label: "Home", icon: Home, active: true },
  { label: "Courses", icon: BookOpen, active: false },
  { label: "Stats", icon: BarChart3, active: false },
  { label: "Profile", icon: User, active: false },
];

export function MobilePreview() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-surface/90 px-4 pb-3 pt-7 backdrop-blur">
        <div className="flex items-center gap-2.5">
          <Avatar name="Nattapong Wong" accent="primary" size="sm" />
          <div>
            <p className="text-xs text-text-muted">Good morning</p>
            <p className="text-sm font-semibold text-text">Nattapong</p>
          </div>
        </div>
        <span className="relative inline-flex size-9 items-center justify-center rounded-lg text-text-muted">
          <Bell size={18} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-accent-500" />
        </span>
      </header>

      <main className="flex-1 space-y-4 p-4">
        <div className="rounded-2xl bg-brand-gradient p-5 text-white">
          <p className="text-xs text-white/70">Learning hours this week</p>
          <p className="mt-1 text-3xl font-bold">12.5h</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full w-[72%] rounded-full bg-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-surface p-3 shadow-card">
            <p className="text-xs text-text-muted">Courses</p>
            <p className="mt-1 text-xl font-bold text-text">6</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3 shadow-card">
            <p className="text-xs text-text-muted">Certificates</p>
            <p className="mt-1 text-xl font-bold text-text">3</p>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-text">Continue learning</p>
            <ChevronRight size={16} className="text-text-subtle" />
          </div>
          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c.id} className="rounded-xl border border-border bg-surface p-3 shadow-card">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300">
                    <BookOpen size={16} />
                  </div>
                  <p className="min-w-0 flex-1 truncate text-sm font-medium text-text">{c.title}</p>
                </div>
                <Progress value={c.id === "c1" ? 68 : c.id === "c2" ? 42 : 12} size="sm" className="mt-2.5" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <nav className="sticky bottom-0 grid grid-cols-4 border-t border-border bg-surface/95 backdrop-blur">
        {mobileTabs.map((tabItem) => {
          const Icon = tabItem.icon;
          return (
            <span
              key={tabItem.label}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium",
                tabItem.active ? "text-primary-700 dark:text-primary-300" : "text-text-subtle"
              )}
            >
              <Icon size={19} />
              {tabItem.label}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
