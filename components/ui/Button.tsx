import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success";

export type ButtonSize = "sm" | "md" | "lg";

/** Shared base — layout, focus ring, disabled + icon auto-sizing. */
const base =
  "relative inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap rounded-lg transition-[background-color,border-color,color,box-shadow,transform] duration-150 active:translate-y-px select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-55";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary-700 text-white shadow-sm hover:bg-primary-800 active:bg-primary-900",
  secondary: "bg-secondary-600 text-white shadow-sm hover:bg-secondary-700 active:bg-secondary-800",
  outline:
    "border border-border-strong bg-surface text-text hover:bg-surface-hover hover:border-primary-300 active:bg-surface-2",
  ghost: "text-text hover:bg-surface-hover active:bg-surface-2",
  danger: "bg-error-600 text-white shadow-sm hover:bg-error-700 active:bg-error-800",
  success: "bg-success-600 text-white shadow-sm hover:bg-success-700 active:bg-success-800",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5 [&_svg]:size-4",
  md: "h-10 px-4 text-sm [&_svg]:size-[18px]",
  lg: "h-12 px-6 text-base [&_svg]:size-5",
};

const iconOnlySizes: Record<ButtonSize, string> = {
  sm: "h-9 w-9 [&_svg]:size-4",
  md: "h-10 w-10 [&_svg]:size-[18px]",
  lg: "h-12 w-12 [&_svg]:size-5",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    iconOnly = false,
    fullWidth = false,
    disabled,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        base,
        buttonVariants[variant],
        iconOnly ? iconOnlySizes[size] : sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading && (
        <Loader2 className="animate-spin" aria-hidden />
      )}
      {!loading && leftIcon}
      {!iconOnly && children}
      {!loading && rightIcon}
    </button>
  );
});
