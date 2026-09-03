"use client";

import Link from "next/link";
import {
  ArrowRight,
  Palette,
  Type,
  Blocks,
  PanelsTopLeft,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useToast } from "@/components/ui/Toast";
import { copyToClipboard } from "@/lib/utils";
import { tokensToCss } from "@/lib/design-tokens";
import { stats, activity, enrollments } from "@/lib/mock-data";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Section } from "@/components/showcase/Section";

const brandLetters = [
  { letter: "T", word: "Teaching", color: "text-primary-600 dark:text-primary-400", bg: "bg-primary-50 dark:bg-primary-500/10" },
  { letter: "L", word: "Learning", color: "text-secondary-500", bg: "bg-secondary-50 dark:bg-secondary-500/10" },
  { letter: "I", word: "Innovation", color: "text-success-500", bg: "bg-success-50 dark:bg-success-500/10" },
  { letter: "C", word: "Center", color: "text-accent-500", bg: "bg-accent-50 dark:bg-accent-500/10" },
];

const features = [
  { key: "colors", href: "/colors", icon: Palette, title: "Color System", desc: "7 brand palettes + semantic tokens" },
  { key: "type", href: "/typography", icon: Type, title: "Typography", desc: "Inter + Noto Sans Thai type scale" },
  { key: "components", href: "/buttons", icon: Blocks, title: "Components", desc: "30+ reusable, accessible parts" },
  { key: "layouts", href: "/layouts", icon: PanelsTopLeft, title: "Layout Patterns", desc: "Dashboard, settings, auth & more" },
];

export default function OverviewPage() {
  const { t } = useLang();
  const { toast } = useToast();

  const copyTokens = async () => {
    const ok = await copyToClipboard(tokensToCss());
    toast({
      title: ok ? t("ui.tokensCopied") : "Copy failed",
      description: ok ? ":root { --primary-500 … }" : undefined,
      variant: ok ? "success" : "error",
    });
  };

  return (
    <div className="space-y-12">
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden rounded-2xl bg-brand-gradient p-8 text-white shadow-lg sm:p-12">
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 right-24 size-72 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles size={13} />
              {t("brand.university")}
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              {t("page.overview.heroTitle")}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {t("page.overview.heroSub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/buttons">
                <Button
                  size="lg"
                  className="bg-white text-primary-800 hover:bg-white/90 active:bg-white/80"
                  rightIcon={<ArrowRight />}
                >
                  {t("ui.viewComponents")}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={copyTokens}
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                {t("ui.copyTokens")}
              </Button>
            </div>
          </div>

          {/* Floating component preview */}
          <div className="relative hidden lg:block">
            <div className="ml-auto max-w-sm rounded-2xl border border-white/15 bg-white/95 p-5 shadow-xl backdrop-blur dark:bg-neutral-900/95">
              <div className="flex items-center justify-between">
                <Logo size="md" />
                <MoreHorizontal className="text-text-subtle" size={18} />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-surface-2 p-3">
                  <p className="text-xs text-text-muted">Active Learners</p>
                  <p className="mt-1 text-xl font-bold text-text">12,847</p>
                  <p className="mt-0.5 text-xs font-medium text-success-600">▲ 8.2%</p>
                </div>
                <div className="rounded-xl border border-border bg-surface-2 p-3">
                  <p className="text-xs text-text-muted">Completions</p>
                  <p className="mt-1 text-xl font-bold text-text">3,912</p>
                  <p className="mt-0.5 text-xs font-medium text-success-600">▲ 12.4%</p>
                </div>
              </div>
              <div className="mt-3 space-y-2 rounded-xl border border-border bg-surface p-3">
                <Progress label="Designing Digital Learning" value={68} showValue tone="primary" size="sm" />
                <Progress label="AI in the Classroom" value={42} showValue tone="secondary" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Brand concept ---- */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-text">{t("brand.full")}</h2>
          <p className="mt-1 text-sm text-text-muted">{t("brand.tagline")}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {brandLetters.map((b) => (
            <div key={b.letter} className={`rounded-xl border border-border p-5 ${b.bg}`}>
              <span className={`text-4xl font-extrabold ${b.color}`}>{b.letter}</span>
              <p className="mt-2 text-sm font-semibold text-text">{b.word}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- What's inside ---- */}
      <Section title="Explore the system" description="Jump straight into any part of the design language.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Link key={f.key} href={f.href} className="group">
                <Card interactive className="h-full p-5">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100 dark:bg-primary-500/15 dark:text-primary-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 flex items-center gap-1 font-semibold text-text">
                    {f.title}
                    <ArrowRight
                      size={15}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">{f.desc}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ---- Dashboard preview ---- */}
      <Section
        title="Dashboard preview"
        description="The same tokens and components, composed into a real analytics view."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.id} stat={s} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {/* Recent enrollments */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent enrollments</CardTitle>
              <CardDescription>Latest learners across all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {enrollments.slice(0, 4).map((e) => (
                  <li key={e.id} className="flex items-center gap-3 py-3">
                    <Avatar name={e.learner} accent={e.accent} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-text">{e.learner}</p>
                      <p className="truncate text-xs text-text-muted">{e.course}</p>
                    </div>
                    <StatusBadge status={e.status} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>What the team is doing</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {activity.map((a) => (
                  <li key={a.id} className="flex gap-3">
                    <Avatar name={a.actor} accent={a.accent} size="xs" />
                    <div className="min-w-0">
                      <p className="text-sm leading-snug text-text">
                        <span className="font-medium">{a.actor}</span>{" "}
                        <span className="text-text-muted">{a.action}</span>{" "}
                        <span className="font-medium">{a.target}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-text-subtle">{a.time}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}
