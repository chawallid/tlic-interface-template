import { forwardRef, type HTMLAttributes, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
}

/** Accessible radio built on a native input with a custom inner dot. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
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
          type="radio"
          disabled={disabled}
          className="peer size-[18px] cursor-pointer appearance-none rounded-full border border-border-strong bg-surface transition-colors checked:border-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed"
          {...props}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute size-2 scale-0 rounded-full bg-primary-600 transition-transform duration-150 peer-checked:scale-100"
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

/** Simple vertical group wrapper with the correct ARIA role. */
export function RadioGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="radiogroup" className={cn("flex flex-col gap-3", className)} {...props} />;
}
