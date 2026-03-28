import * as React from "react";
import { cn } from "@/lib/utils";

export interface AmbientBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Content rendered above the effect layers */
  children?: React.ReactNode;
  /** Additional classes applied to the root shell */
  className?: string;
  /** Visual background preset */
  variant?: "aurora" | "mesh" | "spotlight";
  /** Optional surface pattern overlay */
  pattern?: "none" | "grid" | "dots";
  /** Visual intensity of the background treatment */
  intensity?: "subtle" | "medium" | "strong";
  /** Additional classes applied to the inner content wrapper above the effects */
  contentClassName?: string;
}

const baseStyles =
  "relative isolate overflow-hidden bg-background text-foreground";

const variantStyles = {
  aurora: "bg-gradient-to-br from-background via-background to-muted/40",
  mesh: "bg-gradient-to-br from-background via-muted/20 to-card",
  spotlight: "bg-gradient-to-b from-background via-background to-muted/30",
} as const;

const intensityStyles = {
  subtle: {
    primary: "bg-primary/8",
    secondary: "bg-info/6",
    tertiary: "bg-success/8",
    overlay: "opacity-50",
  },
  medium: {
    primary: "bg-primary/12",
    secondary: "bg-info/10",
    tertiary: "bg-success/12",
    overlay: "opacity-70",
  },
  strong: {
    primary: "bg-primary/16",
    secondary: "bg-info/14",
    tertiary: "bg-success/16",
    overlay: "opacity-90",
  },
} as const;

const patternStyles = {
  none: "",
  grid: "[background-image:linear-gradient(to_right,color-mix(in_oklab,var(--color-border)_80%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-border)_80%,transparent)_1px,transparent_1px)] [background-size:28px_28px]",
  dots: "[background-image:radial-gradient(color-mix(in_oklab,var(--color-border)_85%,transparent)_1px,transparent_1px)] [background-size:22px_22px]",
} as const;

export const AmbientBackground = React.forwardRef<
  HTMLDivElement,
  AmbientBackgroundProps
>(
  (
    {
      children,
      className,
      contentClassName,
      variant = "aurora",
      pattern = "grid",
      intensity = "medium",
      ...props
    },
    ref
  ) => {
    const glow = intensityStyles[intensity];

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className={cn("absolute inset-0", patternStyles[pattern], glow.overlay)}
          />

          {variant === "aurora" ? (
            <>
              <div
                className={cn(
                  "absolute -left-24 top-0 h-72 w-72 rounded-full blur-3xl",
                  glow.primary
                )}
              />
              <div
                className={cn(
                  "absolute right-0 top-1/4 h-80 w-80 rounded-full blur-3xl",
                  glow.secondary
                )}
              />
              <div
                className={cn(
                  "absolute bottom-0 left-1/3 h-64 w-64 rounded-full blur-3xl",
                  glow.tertiary
                )}
              />
            </>
          ) : null}

          {variant === "mesh" ? (
            <>
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,color-mix(in_oklab,var(--color-primary)_18%,transparent),transparent_65%)]",
                  glow.overlay
                )}
              />
              <div
                className={cn(
                  "absolute -left-20 bottom-0 h-72 w-72 rounded-full blur-3xl",
                  glow.secondary
                )}
              />
              <div
                className={cn(
                  "absolute -right-16 top-16 h-64 w-64 rounded-full blur-3xl",
                  glow.primary
                )}
              />
            </>
          ) : null}

          {variant === "spotlight" ? (
            <>
              <div
                className={cn(
                  "absolute left-1/2 top-0 h-96 w-[42rem] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl",
                  glow.primary
                )}
              />
              <div
                className={cn(
                  "absolute bottom-0 right-0 h-64 w-64 translate-x-1/4 translate-y-1/4 rounded-full blur-3xl",
                  glow.secondary
                )}
              />
            </>
          ) : null}
        </div>

        <div className={cn("relative z-10", contentClassName)}>{children}</div>
      </div>
    );
  }
);

AmbientBackground.displayName = "AmbientBackground";
