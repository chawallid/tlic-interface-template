import { forwardRef, type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
}

/** Accessible checkbox built on a native input with a custom check mark. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, className, disabled, id, ...props },
  ref
) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "group flex items-start gap-3 select-none",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className
      )}
    >
      <span className="relative mt-0.5 flex items-center justify-center">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          disabled={disabled}
          className="peer size-[18px] cursor-pointer appearance-none rounded-[5px] border border-border-strong bg-surface transition-colors checked:border-primary-600 checked:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed"
          {...props}
        />
        <Check
          size={13}
          strokeWidth={3}
          aria-hidden
          className="pointer-events-none absolute text-white opacity-0 transition-opacity peer-checked:opacity-100"
        />
      </span>
      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && <span className="text-sm font-medium text-text">{label}</span>}
          {description && <span className="text-xs text-text-muted">{description}</span>}
        </span>
      )}
    </label>
  );
});
