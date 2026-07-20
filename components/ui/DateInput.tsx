import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { controlClasses } from "./fieldStyles";

export interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

/** Native date picker, styled to match the other controls. */
export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(function DateInput(
  { invalid, className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type="date"
      aria-invalid={invalid || undefined}
      className={controlClasses(
        invalid,
        cn(
          "h-10 px-3.5 [color-scheme:light] dark:[color-scheme:dark]",
          "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-100",
          className
        )
      )}
      {...props}
    />
  );
});
