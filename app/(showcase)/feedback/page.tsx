"use client";

import { useState } from "react";
import { CheckCircle2, RefreshCw, WifiOff, Trash2, PartyPopper } from "lucide-react";
import { PageHeader } from "@/components/showcase/PageHeader";
import { Section } from "@/components/showcase/Section";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useToast } from "@/components/ui/Toast";
import { Skeleton, SkeletonText, SkeletonCard } from "@/components/ui/Skeleton";
import { Avatar } from "@/components/ui/Avatar";

export default function FeedbackPage() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const runDelete = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setConfirmOpen(false);
      toast({ title: "Course deleted", description: "“Building MOOCs” was removed.", variant: "success" });
    }, 1400);
  };

  return (
    <div>
      <PageHeader titleKey="page.feedback.title" descKey="page.feedback.desc" />

      <div className="space-y-12">
        {/* Alerts */}
        <Section title="Alerts" description="Inline messages in four intents, optionally dismissible.">
          <div className="space-y-3">
            <Alert variant="info" title="Scheduled maintenance" dismissible>
              The platform will be briefly unavailable on Sunday, 02:00–03:00 ICT.
            </Alert>
            <Alert variant="success" title="Course published" dismissible>
              “AI in the Classroom” is now live and open for enrollment.
            </Alert>
            <Alert variant="warning" title="Storage almost full">
              Your media library is at 92% capacity. Consider archiving old assets.
            </Alert>
            <Alert variant="error" title="Upload failed" dismissible>
              We couldn&apos;t process 2 files. Check the format and try again.
            </Alert>
          </div>
        </Section>

        {/* Toasts */}
        <Section title="Toast notifications" description="Transient messages that stack and auto-dismiss.">
          <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => toast({ title: "Saved", description: "Your changes were saved.", variant: "success" })}>
                Success toast
              </Button>
              <Button variant="outline" onClick={() => toast({ title: "Heads up", description: "Review before publishing.", variant: "info" })}>
                Info toast
              </Button>
              <Button variant="outline" onClick={() => toast({ title: "Storage low", description: "92% of quota used.", variant: "warning" })}>
                Warning toast
              </Button>
              <Button variant="outline" onClick={() => toast({ title: "Something went wrong", description: "Please try again.", variant: "error" })}>
                Error toast
              </Button>
            </div>
          </div>
        </Section>

        {/* Modal + Confirm */}
        <Section title="Modal & confirm dialog" description="Focused overlays for details and decisions.">
          <div className="rounded-xl border border-border bg-surface p-6 shadow-card">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setModalOpen(true)}>Open modal</Button>
              <Button variant="danger" leftIcon={<Trash2 />} onClick={() => setConfirmOpen(true)}>
                Delete course
              </Button>
            </div>
          </div>

          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Invite a collaborator"
            description="They'll be able to edit this course and its lessons."
            footer={
              <>
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setModalOpen(false);
                    toast({ title: "Invitation sent", variant: "success" });
                  }}
                >
                  Send invite
                </Button>
              </>
            }
          >
            <div className="space-y-3">
              <p className="text-sm text-text-muted">
                Enter an email address and choose a role. This is a demo modal with an overlay,
                focus handling, and Escape-to-close.
              </p>
              <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-2 p-3">
                <Avatar name="Jenny Wilson" accent="success" size="sm" />
                <div className="text-sm">
                  <p className="font-medium text-text">Jenny Wilson</p>
                  <p className="text-text-muted">jenny.wilson@example.edu</p>
                </div>
              </div>
            </div>
          </Modal>

          <ConfirmDialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={runDelete}
            variant="danger"
            title="Delete this course?"
            description="This permanently removes “Building MOOCs” and all its lessons. This action cannot be undone."
            confirmLabel="Delete course"
            loading={confirmLoading}
          />
        </Section>

        {/* Skeletons */}
        <Section
          title="Loading skeletons"
          description="Placeholder shapes that reduce perceived wait time."
          actions={
            <Button variant="outline" size="sm" leftIcon={<RefreshCw />} onClick={() => setShowSkeleton((s) => !s)}>
              {showSkeleton ? "Show content" : "Show skeleton"}
            </Button>
          }
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {showSkeleton ? (
              <SkeletonCard />
            ) : (
              <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <Avatar name="Jane Cooper" accent="primary" />
                  <div>
                    <p className="text-sm font-medium text-text">Jane Cooper</p>
                    <p className="text-xs text-text-muted">Instructional Designer</p>
                  </div>
                </div>
                <p className="mt-5 text-sm text-text-muted">
                  Loaded content replaces the skeleton once data is ready, keeping layout shift to a minimum.
                </p>
              </div>
            )}
            <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
              {showSkeleton ? (
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full rounded-lg" />
                  <SkeletonText lines={3} />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex h-32 items-center justify-center rounded-lg bg-brand-gradient text-white">
                    <PartyPopper size={32} />
                  </div>
                  <p className="text-sm text-text-muted">
                    Your dashboard is ready. All widgets have finished loading.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* Success / error states */}
        <Section title="Success & error states" description="Full-surface confirmations and recoverable failures.">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="flex flex-col items-center rounded-xl border border-border bg-surface p-8 text-center shadow-card">
              <div className="flex size-14 items-center justify-center rounded-full bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-300">
                <CheckCircle2 size={30} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text">Enrollment complete</h3>
              <p className="mt-1.5 max-w-xs text-sm text-text-muted">
                You&apos;re enrolled in Designing Digital Learning. A confirmation is on its way.
              </p>
              <Button className="mt-5" variant="outline">
                Go to course
              </Button>
            </div>
            <div className="flex flex-col items-center rounded-xl border border-border bg-surface p-8 text-center shadow-card">
              <div className="flex size-14 items-center justify-center rounded-full bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-300">
                <WifiOff size={28} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text">Connection lost</h3>
              <p className="mt-1.5 max-w-xs text-sm text-text-muted">
                We couldn&apos;t reach the server. Check your connection and try again.
              </p>
              <Button className="mt-5" leftIcon={<RefreshCw />}>
                Retry
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
