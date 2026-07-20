import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { controlClasses } from "./fieldStyles";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

/** Styled native <select> with a custom chevron. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, className, children, ...props },
  ref
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={controlClasses(
          invalid,
          cn("h-10 cursor-pointer appearance-none pl-3.5 pr-10", className)
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={18}
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle"
      />
    </div>
  );
});
