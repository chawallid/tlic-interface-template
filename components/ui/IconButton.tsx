import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariant, type ButtonSize } from "./Button";

const iconSizes: Record<ButtonSize, string> = {
  sm: "h-9 w-9 [&_svg]:size-4",
  md: "h-10 w-10 [&_svg]:size-[18px]",
  lg: "h-12 w-12 [&_svg]:size-5",
};

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon: ReactNode;
  /** Required for accessibility — describes the action. */
  "aria-label": string;
}

/** Square, icon-only button. Shares Button's variant styles. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ variant = "ghost", size = "md", icon, className, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-55",
          buttonVariants[variant],
          iconSizes[size],
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);
