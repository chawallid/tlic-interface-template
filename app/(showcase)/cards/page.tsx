"use client";

import {
  Check,
  BookOpen,
  Users,
  Star,
  MessageSquare,
  MapPin,
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { PageHeader } from "@/components/showcase/PageHeader";
import { Section } from "@/components/showcase/Section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { stats, courses, pricingPlans, notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const notifIcon = {
  info: { icon: Info, color: "text-primary-500" },
  success: { icon: CheckCircle2, color: "text-success-500" },
  warning: { icon: AlertTriangle, color: "text-warning-500" },
  error: { icon: XCircle, color: "text-error-500" },
};

const courseAccent: Record<string, string> = {
  primary: "bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300",
  secondary: "bg-secondary-50 text-secondary-600 dark:bg-secondary-500/15 dark:text-secondary-300",
  success: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-300",
};

export default function CardsPage() {
  return (
    <div>
      <PageHeader titleKey="page.cards.title" descKey="page.cards.desc" />

      <div className="space-y-12">
        {/* Basic */}
        <Section title="Basic card" description="Header, content, and footer slots with consistent padding.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Course overview</CardTitle>
                <CardDescription>A quick summary of this term&apos;s progress.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-muted">
                  This card composes the header, content, and footer sub-components. Use it as the
                  base surface for almost anything.
                </p>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" size="sm">
                  Dismiss
                </Button>
                <Button size="sm">View details</Button>
              </CardFooter>
            </Card>

            <Card interactive className="cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600 dark:bg-secondary-500/15 dark:text-secondary-300">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <CardTitle>Interactive card</CardTitle>
                    <CardDescription>Hover me — I lift on interaction.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-muted">
                  Set <code className="font-mono text-xs">interactive</code> for a subtle hover
                  elevation, ideal for clickable cards and links.
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Stat cards */}
        <Section title="Stat cards" description="Compact KPIs with an icon, trend, and hint.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.id} stat={s} />
            ))}
          </div>
        </Section>

        {/* Profile card */}
        <Section title="Profile card" description="A person summary with stats and actions.">
          <Card className="mx-auto max-w-sm">
            <div className="flex flex-col items-center p-6 text-center">
              <Avatar name="Ploychompoo Sri" accent="secondary" size="xl" status="active" />
              <h3 className="mt-4 text-lg font-semibold text-text">Ploychompoo Sri</h3>
              <p className="text-sm text-text-muted">Content Producer · TLIC</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-text-subtle">
                <MapPin size={12} /> Chiang Mai, Thailand
              </p>
              <div className="mt-5 grid w-full grid-cols-3 gap-2 border-y border-border py-4">
                <div>
                  <p className="text-lg font-bold text-text">24</p>
                  <p className="text-xs text-text-muted">Courses</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-text">3.1k</p>
                  <p className="text-xs text-text-muted">Learners</p>
                </div>
                <div>
                  <p className="flex items-center justify-center gap-0.5 text-lg font-bold text-text">
                    4.9 <Star size={13} className="fill-warning-400 text-warning-400" />
                  </p>
                  <p className="text-xs text-text-muted">Rating</p>
                </div>
              </div>
              <div className="mt-5 flex w-full gap-3">
                <Button variant="outline" fullWidth leftIcon={<MessageSquare />}>
                  Message
                </Button>
                <Button fullWidth>Follow</Button>
              </div>
            </div>
          </Card>
        </Section>

        {/* Pricing cards */}
        <Section title="Pricing cards" description="Tiered plans with a highlighted recommendation.">
          <div className="grid gap-4 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  "relative flex flex-col p-6",
                  plan.highlighted && "ring-2 ring-primary-600"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge tone="primary" appearance="solid">
                      Most popular
                    </Badge>
                  </span>
                )}
                <h3 className="text-base font-semibold text-text">{plan.name}</h3>
                <p className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-text">{plan.price}</span>
                  <span className="text-sm text-text-muted">{plan.period}</span>
                </p>
                <p className="mt-2 text-sm text-text-muted">{plan.description}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-text">
                      <Check size={16} className="shrink-0 text-success-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6"
                  fullWidth
                  variant={plan.highlighted ? "primary" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Card>
            ))}
          </div>
        </Section>

        {/* Feature cards */}
        <Section title="Feature cards" description="Course highlights with an icon, category, and metadata.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <Card key={c.id} interactive className="flex flex-col p-6">
                <div
                  className={cn(
                    "flex size-12 items-center justify-center rounded-xl",
                    courseAccent[c.accent] ?? courseAccent.primary
                  )}
                >
                  <BookOpen size={24} />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Badge tone="neutral" size="sm">
                    {c.category}
                  </Badge>
                  <span className="text-xs text-text-subtle">{c.lessons} lessons</span>
                </div>
                <h3 className="mt-2 font-semibold text-text">{c.title}</h3>
                <p className="mt-1 flex-1 text-sm text-text-muted">{c.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-text-muted">
                  <Users size={14} /> {c.learners} enrolled
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Notification card */}
        <Section title="Notification card" description="A grouped list surface with typed icons and unread markers.">
          <Card className="mx-auto max-w-md">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">Notifications</CardTitle>
              <Badge tone="primary" size="sm">
                2 new
              </Badge>
            </CardHeader>
            <ul className="divide-y divide-border">
              {notifications.map((n) => {
                const { icon: Icon, color } = notifIcon[n.type];
                return (
                  <li
                    key={n.id}
                    className={cn("flex gap-3 px-5 py-3.5", !n.read && "bg-primary-50/40 dark:bg-primary-500/5")}
                  >
                    <Icon size={18} className={cn("mt-0.5 shrink-0", color)} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text">{n.title}</p>
                      <p className="text-sm text-text-muted">{n.description}</p>
                      <p className="mt-0.5 text-xs text-text-subtle">{n.time}</p>
                    </div>
                    {!n.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary-500" />}
                  </li>
                );
              })}
            </ul>
          </Card>
        </Section>
      </div>
    </div>
  );
}
