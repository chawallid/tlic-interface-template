import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Stat } from "@/lib/mock-data";
import { Card } from "./Card";

const accentBg: Record<string, string> = {
  learners: "bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300",
  completions: "bg-secondary-50 text-secondary-600 dark:bg-secondary-500/15 dark:text-secondary-300",
  engagement: "bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300",
  courses: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-300",
  hours: "bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300",
  certificates: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-300",
};

export function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  const up = stat.trend === "up";
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex size-11 items-center justify-center rounded-lg",
            accentBg[stat.id] ?? "bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300"
          )}
        >
          <Icon size={20} />
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-semibold",
            up
              ? "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-300"
              : "bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-300"
          )}
        >
          {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {stat.change}
        </span>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold tracking-tight text-text">{stat.value}</div>
        <div className="mt-1 text-sm font-medium text-text">{stat.label}</div>
        <div className="mt-0.5 text-xs text-text-subtle">{stat.hint}</div>
      </div>
    </Card>
  );
}
