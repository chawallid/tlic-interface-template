import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { controlClasses } from "./fieldStyles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/** Text input with optional leading/trailing icon slots and an error state. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, leftIcon, rightIcon, className, ...props },
  ref
) {
  if (!leftIcon && !rightIcon) {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={controlClasses(invalid, cn("h-10 px-3.5", className))}
        {...props}
      />
    );
  }
  return (
    <div className="relative">
      {leftIcon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle [&_svg]:size-[18px]">
          {leftIcon}
        </span>
      )}
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={controlClasses(
          invalid,
          cn("h-10", leftIcon ? "pl-10" : "pl-3.5", rightIcon ? "pr-10" : "pr-3.5", className)
        )}
        {...props}
      />
      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle [&_svg]:size-[18px]">
          {rightIcon}
        </span>
      )}
    </div>
  );
});
