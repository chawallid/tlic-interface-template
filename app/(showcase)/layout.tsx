import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";

/** Shared shell (sidebar + navbar) for every showcase route. */
export default function ShowcaseLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
