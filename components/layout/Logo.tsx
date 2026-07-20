import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "h-7",
  md: "h-9",
  lg: "h-12",
  xl: "h-16",
};

export interface LogoProps {
  size?: keyof typeof sizeClasses;
  className?: string;
  /** Render the mark as solid white — for use on the brand gradient / dark hero. */
  mono?: "white" | "current";
  /** Override the asset path (defaults to the SVG in /public). */
  src?: string;
}

/**
 * The TLIC logo (image asset in /public/tlic-logo.png).
 * Swap the file to change the artwork, or pass a different `src`.
 */
export function Logo({ size = "md", className, mono, src = "/tlic-logo.png" }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="TLIC"
      className={cn(
        "w-auto select-none",
        sizeClasses[size],
        mono === "white" && "filter-[brightness(0)_invert(1)]",
        className
      )}
    />
  );
}
