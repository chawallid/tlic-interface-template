import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
  size?: number;
  label?: string;
};

/** Accessible loading spinner. */
export function Spinner({ className, size = 18, label = "Loading" }: SpinnerProps) {
  return (
    <Loader2
      role="status"
      aria-label={label}
      className={cn("animate-spin", className)}
      size={size}
    />
  );
}
