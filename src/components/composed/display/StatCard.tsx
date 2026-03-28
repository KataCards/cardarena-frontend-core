import * as React from "react";
import { cn } from "@/lib/utils";

type StatCardHeading = "h2" | "h3" | "h4" | "h5" | "h6";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stat title/label */
  title: string;
  /** Stat value to display */
  value: string | number;
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>;
  /** Whether the stat is loading */
  isLoading?: boolean;
  /** Error message if stat failed to load */
  error?: string | null;
  /** Icon color variant */
  iconColor?: "primary" | "info" | "success" | "secondary" | "muted";
  /** Card background variant */
  variant?: "muted" | "base" | "surface";
  /** Optional trend indicator */
  trend?: {
    value: number;
    label?: string;
  };
  /** Semantic heading level for the title. @default "h3" */
  as?: StatCardHeading;
}

const iconColors = {
  primary: "text-primary",
  info: "text-info",
  success: "text-success",
  secondary: "text-secondary",
  muted: "text-muted-foreground",
} as const;

const variants = {
  muted: "bg-muted/30 border border-border",
  base: "bg-background border border-border",
  surface: "bg-card border border-border",
} as const;

/**
 * StatCard
 *
 * A card component for displaying statistics with icons, loading states,
 * and optional trend indicators.
 */
export function StatCard({
  title,
  value,
  icon: Icon,
  isLoading = false,
  error = null,
  iconColor = "primary",
  variant = "muted",
  trend,
  as = "h3",
  className,
  ...props
}: StatCardProps) {
  const Heading = as;

  return (
    <div
      className={cn(
        "rounded-lg p-6 shadow-sm transition-all hover:shadow-md",
        variants[variant],
        className
      )}
      {...props}
    >
      <div className={cn("mb-2 flex items-center", iconColors[iconColor])}>
        <Icon className="h-6 w-6" aria-hidden="true" />
        <Heading className="ml-2 text-lg font-semibold text-foreground">{title}</Heading>
      </div>

      {isLoading ? (
        <p className="animate-pulse text-3xl font-bold text-muted-foreground">...</p>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend ? (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  "text-sm font-semibold",
                  trend.value >= 0 ? "text-success" : "text-destructive"
                )}
              >
                {trend.value >= 0 ? "+" : ""}
                {trend.value}%
              </span>
              {trend.label ? (
                <span className="text-xs text-muted-foreground">{trend.label}</span>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
