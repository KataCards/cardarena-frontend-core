import * as React from "react";
import { cn } from "@/lib/utils";

type StatsHeading = "h1" | "h2" | "h3" | "h4";
type StatsVariant = "muted" | "base" | "surface";

export interface Stat {
  /** The primary metric value (e.g., "1000+", "24/7", "99%") */
  value: string;
  /** Descriptive label for the metric */
  label: string;
  /** Optional icon component to display above the value */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional highlight color variant */
  variant?: "default" | "primary" | "success" | "info";
}

interface StatsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Array of statistics to display */
  stats: readonly Stat[];
  /** Optional heading text for the stats section */
  title?: React.ReactNode;
  /** Optional description text below the title */
  description?: React.ReactNode;
  /** Semantic heading level. @default "h2" */
  as?: StatsHeading;
  /** Number of columns on desktop (2, 3, or 4) */
  columns?: 2 | 3 | 4;
  /** Surface variant */
  variant?: StatsVariant;
}

const sectionStyles = {
  muted: {
    section: "bg-muted/30",
    title: "text-foreground",
    description: "text-muted-foreground",
    label: "text-muted-foreground",
    defaultValue: "text-foreground",
  },
  base: {
    section: "bg-background",
    title: "text-foreground",
    description: "text-muted-foreground",
    label: "text-muted-foreground",
    defaultValue: "text-foreground",
  },
  surface: {
    section: "bg-card",
    title: "text-card-foreground",
    description: "text-muted-foreground",
    label: "text-muted-foreground",
    defaultValue: "text-card-foreground",
  },
} as const;

const statVariantStyles = {
  default: {
    icon: "",
    value: "",
  },
  primary: {
    icon: "text-primary",
    value: "text-primary",
  },
  success: {
    icon: "text-success",
    value: "text-success",
  },
  info: {
    icon: "text-info",
    value: "text-info",
  },
} as const;

const gridCols = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
} as const;

/**
 * Stats Section
 *
 * A responsive grid for displaying key metrics and statistics.
 * Supports optional icons, semantic emphasis, and flexible column layouts.
 */
export function Stats({
  stats,
  title,
  description,
  as = "h2",
  columns = 4,
  variant = "base",
  className,
  ...props
}: StatsProps) {
  const Heading = as;
  const titleId = React.useId();
  const styles = sectionStyles[variant];
  const isPlainDescription =
    typeof description === "string" || typeof description === "number";

  return (
    <section
      aria-labelledby={title ? titleId : undefined}
      className={cn("py-16", styles.section, className)}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || description) ? (
          <header className="mb-12 text-center">
            {title ? (
              <Heading
                id={titleId}
                className={cn("mb-4 text-3xl font-bold md:text-4xl", styles.title)}
              >
                {title}
              </Heading>
            ) : null}
            {description ? (
              isPlainDescription ? (
                <p className={cn("text-xl", styles.description)}>{description}</p>
              ) : (
                <div className={cn("text-xl", styles.description)}>{description}</div>
              )
            ) : null}
          </header>
        ) : null}

        <div role="list" className={cn("grid grid-cols-2 gap-8", gridCols[columns])}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            const accent = statVariantStyles[stat.variant ?? "default"];

            return (
              <div key={stat.label} role="listitem" className="text-center">
                {Icon ? (
                  <div className="mb-3 flex justify-center">
                    <Icon
                      className={cn("h-8 w-8", accent.icon || styles.defaultValue)}
                      aria-hidden="true"
                    />
                  </div>
                ) : null}
                <div
                  className={cn(
                    "mb-2 text-3xl font-bold md:text-4xl",
                    accent.value || styles.defaultValue
                  )}
                >
                  {stat.value}
                </div>
                <div className={styles.label}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
