import * as React from "react";
import { Badge, type BadgeProps } from "@/components/ui/Badge";
import { Countdown, type CountdownProps } from "@/components/ui/Countdown";
import { StatCard, type StatCardProps } from "@/components/composed/display/StatCard";
import { cn } from "@/lib/utils";

type MetricsOverviewHeading = "h2" | "h3" | "h4" | "h5" | "h6";

export interface MetricsOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main heading for the overview */
  title?: string;
  /** Optional supporting description */
  description?: string;
  /** Optional semantic heading level for the title. @default "h2" */
  as?: MetricsOverviewHeading;
  /** Optional status badge */
  badge?: {
    label: React.ReactNode;
    variant?: BadgeProps["variant"];
  };
  /** Primary stat cards */
  stats: [StatCardProps, ...StatCardProps[]];
  /** Optional countdown highlight */
  countdown?: CountdownProps;
  /** Optional actions aligned with the header */
  actions?: React.ReactNode;
}

/**
 * MetricsOverview
 *
 * A compact dashboard summary composed from stat cards, badges, and an optional countdown.
 */
export const MetricsOverview = React.forwardRef<HTMLDivElement, MetricsOverviewProps>(
  (
    {
      title = "Overview",
      description,
      as = "h2",
      badge,
      stats,
      countdown,
      actions,
      className,
      ...props
    },
    ref
  ) => {
    const Heading = as;

    return (
      <section ref={ref} className={cn("space-y-6", className)} {...props}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            {badge ? <Badge variant={badge.variant}>{badge.label}</Badge> : null}
            <div>
              <Heading className="text-2xl font-bold tracking-tight text-foreground">
                {title}
              </Heading>
              {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
            </div>
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>

        <div
          className={cn(
            "grid gap-4",
            countdown ? "grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px]" : "grid-cols-1"
          )}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={`${stat.title}-${index}`} {...stat} />
            ))}
          </div>
          {countdown ? (
            <div className="flex h-full items-stretch">
              <Countdown className="w-full" {...countdown} />
            </div>
          ) : null}
        </div>
      </section>
    );
  }
);

MetricsOverview.displayName = "MetricsOverview";
