import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-bg px-6 text-center">
      <Logo size="lg" />
      <p className="mt-8 text-7xl font-extrabold tracking-tight text-primary-700 dark:text-primary-300">
        404
      </p>
      <h1 className="mt-2 text-xl font-semibold text-text">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="mt-6">
        <Button>Back to overview</Button>
      </Link>
    </div>
  );
}
