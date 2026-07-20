/**
 * Mock data for the TLIC Design System Showcase.
 * Themed around the center's e-learning domain: learners, courses, enrollments.
 * All data is static and for demonstration only.
 */

import type { LucideIcon } from "lucide-react";
import {
  Users,
  GraduationCap,
  Activity,
  BookOpen,
  TrendingUp,
  Award,
} from "lucide-react";

export type Trend = "up" | "down";
export type StatusKey = "active" | "pending" | "completed" | "failed";

/* -------------------------------------------------------------------------- */
/*  KPI stats (dashboard cards)                                               */
/* -------------------------------------------------------------------------- */

export type Stat = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: Trend;
  icon: LucideIcon;
  hint: string;
};

export const stats: Stat[] = [
  {
    id: "learners",
    label: "Active Learners",
    value: "12,847",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    hint: "vs. last 30 days",
  },
  {
    id: "completions",
    label: "Course Completions",
    value: "3,912",
    change: "+12.4%",
    trend: "up",
    icon: GraduationCap,
    hint: "vs. last 30 days",
  },
  {
    id: "engagement",
    label: "Avg. Engagement",
    value: "74.6%",
    change: "-1.8%",
    trend: "down",
    icon: Activity,
    hint: "weekly active rate",
  },
  {
    id: "courses",
    label: "Published Courses",
    value: "268",
    change: "+5",
    trend: "up",
    icon: BookOpen,
    hint: "across 14 faculties",
  },
];

export const secondaryStats: Stat[] = [
  {
    id: "hours",
    label: "Learning Hours",
    value: "48,320",
    change: "+6.1%",
    trend: "up",
    icon: TrendingUp,
    hint: "this semester",
  },
  {
    id: "certificates",
    label: "Certificates Issued",
    value: "1,540",
    change: "+18.0%",
    trend: "up",
    icon: Award,
    hint: "this semester",
  },
];

/* -------------------------------------------------------------------------- */
/*  People (avatars, tables, profile)                                         */
/* -------------------------------------------------------------------------- */

export type Person = {
  id: string;
  name: string;
  email: string;
  role: string;
  /** brand accent used for the initials avatar */
  accent: "primary" | "secondary" | "accent" | "success" | "warning";
  status: StatusKey;
};

export const team: Person[] = [
  { id: "u1", name: "Nattapong Wong", email: "nattapong.w@cmu.ac.th", role: "Instructional Designer", accent: "primary", status: "active" },
  { id: "u2", name: "Ploychompoo Sri", email: "ploychompoo.s@cmu.ac.th", role: "Content Producer", accent: "secondary", status: "active" },
  { id: "u3", name: "Kittisak Meesuk", email: "kittisak.m@cmu.ac.th", role: "Platform Engineer", accent: "accent", status: "pending" },
  { id: "u4", name: "Aticha Rattana", email: "aticha.r@cmu.ac.th", role: "Learning Analyst", accent: "success", status: "active" },
  { id: "u5", name: "Somchai Boonmee", email: "somchai.b@cmu.ac.th", role: "Faculty Liaison", accent: "warning", status: "completed" },
];

/* -------------------------------------------------------------------------- */
/*  Enrollments (data table with status labels)                              */
/* -------------------------------------------------------------------------- */

export type Enrollment = {
  id: string;
  learner: string;
  email: string;
  course: string;
  progress: number;
  status: StatusKey;
  enrolledOn: string;
  accent: Person["accent"];
};

export const enrollments: Enrollment[] = [
  { id: "#EN-4821", learner: "Nattapong Wong", email: "nattapong.w@cmu.ac.th", course: "Designing Digital Learning", progress: 100, status: "completed", enrolledOn: "Jun 2, 2026", accent: "primary" },
  { id: "#EN-4822", learner: "Ploychompoo Sri", email: "ploychompoo.s@cmu.ac.th", course: "Data Literacy for Educators", progress: 68, status: "active", enrolledOn: "Jun 6, 2026", accent: "secondary" },
  { id: "#EN-4823", learner: "Kittisak Meesuk", email: "kittisak.m@cmu.ac.th", course: "AI in the Classroom", progress: 12, status: "pending", enrolledOn: "Jun 9, 2026", accent: "accent" },
  { id: "#EN-4824", learner: "Aticha Rattana", email: "aticha.r@cmu.ac.th", course: "Assessment & Rubrics", progress: 45, status: "active", enrolledOn: "Jun 11, 2026", accent: "success" },
  { id: "#EN-4825", learner: "Somchai Boonmee", email: "somchai.b@cmu.ac.th", course: "Building MOOCs", progress: 0, status: "failed", enrolledOn: "Jun 12, 2026", accent: "warning" },
  { id: "#EN-4826", learner: "Waraporn Chai", email: "waraporn.c@cmu.ac.th", course: "Interactive Video Design", progress: 100, status: "completed", enrolledOn: "Jun 14, 2026", accent: "primary" },
  { id: "#EN-4827", learner: "Thanawat Pho", email: "thanawat.p@cmu.ac.th", course: "Learning Analytics 101", progress: 82, status: "active", enrolledOn: "Jun 15, 2026", accent: "secondary" },
];

/* -------------------------------------------------------------------------- */
/*  Notifications                                                             */
/* -------------------------------------------------------------------------- */

export type NotificationType = "info" | "success" | "warning" | "error";

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
  read: boolean;
};

export const notifications: NotificationItem[] = [
  { id: "n1", title: "New course published", description: "“AI in the Classroom” is now live for enrollment.", time: "2m ago", type: "success", read: false },
  { id: "n2", title: "Weekly report ready", description: "Your learner engagement summary is available.", time: "1h ago", type: "info", read: false },
  { id: "n3", title: "Storage almost full", description: "Media library is at 92% of its quota.", time: "3h ago", type: "warning", read: true },
  { id: "n4", title: "Export failed", description: "The certificate batch export did not complete.", time: "Yesterday", type: "error", read: true },
];

/* -------------------------------------------------------------------------- */
/*  Activity feed                                                             */
/* -------------------------------------------------------------------------- */

export type ActivityItem = {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  accent: Person["accent"];
};

export const activity: ActivityItem[] = [
  { id: "a1", actor: "Ploychompoo Sri", action: "published", target: "Data Literacy for Educators", time: "10 min ago", accent: "secondary" },
  { id: "a2", actor: "Aticha Rattana", action: "commented on", target: "Assessment & Rubrics", time: "42 min ago", accent: "success" },
  { id: "a3", actor: "Nattapong Wong", action: "completed", target: "Designing Digital Learning", time: "2 hours ago", accent: "primary" },
  { id: "a4", actor: "Kittisak Meesuk", action: "updated", target: "Platform release v2.4", time: "5 hours ago", accent: "accent" },
];

/* -------------------------------------------------------------------------- */
/*  Featured courses (feature cards)                                          */
/* -------------------------------------------------------------------------- */

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  lessons: number;
  learners: string;
  accent: Person["accent"];
};

export const courses: Course[] = [
  { id: "c1", title: "Designing Digital Learning", description: "Craft engaging, accessible online courses using proven instructional patterns.", category: "Pedagogy", lessons: 18, learners: "2,410", accent: "primary" },
  { id: "c2", title: "AI in the Classroom", description: "Practical, responsible ways to bring generative AI into teaching workflows.", category: "Innovation", lessons: 12, learners: "1,867", accent: "secondary" },
  { id: "c3", title: "Learning Analytics 101", description: "Turn engagement data into decisions that improve learner outcomes.", category: "Data", lessons: 15, learners: "1,204", accent: "success" },
];

/* -------------------------------------------------------------------------- */
/*  Pricing plans                                                             */
/* -------------------------------------------------------------------------- */

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    period: "/ month",
    description: "For individual educators exploring digital learning.",
    features: ["Up to 3 courses", "100 learners", "Basic analytics", "Community support"],
    highlighted: false,
    cta: "Start free",
  },
  {
    id: "team",
    name: "Team",
    price: "$49",
    period: "/ month",
    description: "For faculties building a shared course library.",
    features: ["Unlimited courses", "5,000 learners", "Advanced analytics", "Custom branding", "Priority support"],
    highlighted: true,
    cta: "Choose Team",
  },
  {
    id: "institution",
    name: "Institution",
    price: "Custom",
    period: "",
    description: "For university-wide deployment and integrations.",
    features: ["Everything in Team", "Unlimited learners", "SSO & LMS integration", "SLA & onboarding", "Dedicated manager"],
    highlighted: false,
    cta: "Contact us",
  },
];

/* -------------------------------------------------------------------------- */
/*  Status label metadata                                                     */
/* -------------------------------------------------------------------------- */

export const statusLabels: Record<StatusKey, string> = {
  active: "Active",
  pending: "Pending",
  completed: "Completed",
  failed: "Failed",
};
