"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";
import { PageHeader } from "@/components/showcase/PageHeader";
import { Section } from "@/components/showcase/Section";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Avatar, AvatarGroup } from "@/components/ui/Avatar";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Progress, CircularProgress } from "@/components/ui/Progress";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { enrollments, team } from "@/lib/mock-data";
import type { StatusKey } from "@/lib/mock-data";

const PAGE_SIZE = 5;
const statuses: StatusKey[] = ["active", "pending", "completed", "failed"];

export default function DataDisplayPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(enrollments.length / PAGE_SIZE);
  const rows = enrollments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <PageHeader titleKey="page.dataDisplay.title" descKey="page.dataDisplay.desc" />

      <div className="space-y-12">
        {/* Table */}
        <Section title="Data table" description="Sortable-ready table with avatars, progress, status, and pagination.">
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Learner</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead className="w-40">Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Enrolled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar name={e.learner} accent={e.accent} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-text">{e.learner}</p>
                          <p className="truncate text-xs text-text-subtle">{e.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-text-muted">{e.course}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={e.progress}
                          size="sm"
                          tone={e.progress === 100 ? "success" : "primary"}
                        />
                        <span className="w-9 shrink-0 text-right text-xs font-medium text-text-muted">
                          {e.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={e.status} />
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-right text-sm text-text-muted">
                      {e.enrolledOn}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex flex-col items-center justify-between gap-3 border-t border-border px-4 py-3 sm:flex-row">
              <p className="text-xs text-text-muted">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, enrollments.length)} of{" "}
                {enrollments.length}
              </p>
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges & status labels" description="Tones and appearances, plus mapped status labels.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
              <p className="mb-3 text-sm font-medium text-text-muted">Soft</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {(["primary", "secondary", "accent", "success", "warning", "error", "neutral"] as const).map((t) => (
                  <Badge key={t} tone={t} className="capitalize">{t}</Badge>
                ))}
              </div>
              <p className="mb-3 text-sm font-medium text-text-muted">Solid</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {(["primary", "secondary", "accent", "success", "warning", "error"] as const).map((t) => (
                  <Badge key={t} tone={t} appearance="solid" className="capitalize">{t}</Badge>
                ))}
              </div>
              <p className="mb-3 text-sm font-medium text-text-muted">Outline</p>
              <div className="flex flex-wrap gap-2">
                {(["primary", "secondary", "accent", "success", "warning", "error"] as const).map((t) => (
                  <Badge key={t} tone={t} appearance="outline" className="capitalize">{t}</Badge>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
              <p className="mb-3 text-sm font-medium text-text-muted">Status labels (with dot)</p>
              <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <StatusBadge key={s} status={s} />
                ))}
              </div>
              <p className="mb-3 mt-6 text-sm font-medium text-text-muted">Count & pill badges</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="relative inline-flex">
                  <Button variant="outline" size="sm">Inbox</Button>
                  <Badge tone="accent" appearance="solid" size="sm" className="absolute -right-2 -top-2">8</Badge>
                </span>
                <Badge tone="success" dot>Online</Badge>
                <Badge tone="warning" dot>Away</Badge>
                <Badge tone="neutral" dot>Offline</Badge>
              </div>
            </div>
          </div>
        </Section>

        {/* Avatars */}
        <Section title="Avatars" description="Initials fallback, sizes, status rings, and stacked groups.">
          <div className="flex flex-col gap-8 rounded-xl border border-border bg-surface p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-end gap-3">
              <Avatar name="A B" accent="primary" size="xs" />
              <Avatar name="C D" accent="secondary" size="sm" />
              <Avatar name="E F" accent="accent" size="md" />
              <Avatar name="G H" accent="success" size="lg" />
              <Avatar name="I J" accent="warning" size="xl" />
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <Avatar name="On" accent="primary" status="active" />
                <Avatar name="Aw" accent="secondary" status="pending" />
                <Avatar name="Of" accent="neutral" status="offline" />
              </div>
              <AvatarGroup extra={4}>
                {team.slice(0, 3).map((m) => (
                  <Avatar key={m.id} name={m.name} accent={m.accent} />
                ))}
              </AvatarGroup>
            </div>
          </div>
        </Section>

        {/* Progress */}
        <Section title="Progress" description="Linear and circular indicators in every tone.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-5 rounded-xl border border-border bg-surface p-6 shadow-card">
              <Progress label="Designing Digital Learning" value={92} showValue tone="primary" />
              <Progress label="AI in the Classroom" value={68} showValue tone="secondary" />
              <Progress label="Learning Analytics 101" value={45} showValue tone="success" />
              <Progress label="Storage used" value={82} showValue tone="warning" />
              <Progress label="Failed uploads" value={12} showValue tone="error" />
            </div>
            <div className="flex flex-wrap items-center justify-around gap-6 rounded-xl border border-border bg-surface p-6 shadow-card">
              <div className="text-center">
                <CircularProgress value={74} tone="primary" size={84} strokeWidth={8} />
                <p className="mt-2 text-xs text-text-muted">Engagement</p>
              </div>
              <div className="text-center">
                <CircularProgress value={92} tone="success" size={84} strokeWidth={8} />
                <p className="mt-2 text-xs text-text-muted">Completion</p>
              </div>
              <div className="text-center">
                <CircularProgress value={38} tone="accent" size={84} strokeWidth={8} />
                <p className="mt-2 text-xs text-text-muted">At risk</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Empty state */}
        <Section title="Empty state" description="Guides users when there is nothing to show yet.">
          <EmptyState
            icon={<Inbox />}
            title="No enrollments yet"
            description="When learners enroll in your courses, they'll appear here with their progress."
            action={<Button leftIcon={<Inbox />}>Invite learners</Button>}
          />
        </Section>
      </div>
    </div>
  );
}
