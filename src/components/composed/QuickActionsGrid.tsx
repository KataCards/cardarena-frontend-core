import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type QuickActionsHeading = "h1" | "h2" | "h3" | "h4";
type QuickActionColor = "primary" | "info" | "success" | "secondary" | "muted";

/**
 * Definition for a quick action button.
 */
export interface QuickActionItem {
  /** Display label */
  title: string;
  /** Target navigation URL */
  href: string;
  /** Icon component to display (e.g., from lucide-react) */
  icon: React.ComponentType<{ className?: string }>;
  /** Semantic surface color */
  color?: QuickActionColor;
}

interface QuickActionsGridProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Array of action items to display in the grid */
  actions: readonly QuickActionItem[];
  /** Optional heading text for the actions section */
  title?: React.ReactNode;
  /** Semantic heading level. @default "h2" */
  as?: QuickActionsHeading;
  /** Background variant for different page contexts */
  variant?: "card" | "flat";
}

const colorStyles: Record<
  QuickActionColor,
  { tile: string; iconWrap: string }
> = {
  primary: {
    tile: "bg-primary text-primary-foreground",
    iconWrap: "bg-primary-foreground/15",
  },
  info: {
    tile: "bg-info text-info-foreground",
    iconWrap: "bg-info-foreground/15",
  },
  success: {
    tile: "bg-success text-success-foreground",
    iconWrap: "bg-success-foreground/15",
  },
  secondary: {
    tile: "bg-secondary text-secondary-foreground",
    iconWrap: "bg-secondary-foreground/15",
  },
  muted: {
    tile: "bg-muted text-foreground",
    iconWrap: "bg-background/70",
  },
};

/**
 * QuickActionsGrid
 *
 * A responsive grid of action tiles, typically used in dashboards
 * or control panels.
 */
export function QuickActionsGrid({
  actions,
  title = "Quick Actions",
  as = "h2",
  variant = "card",
  className,
  ...props
}: QuickActionsGridProps) {
  const Heading = as;
  const titleId = React.useId();

  const gridContent = (
    <div role="list" className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {actions.map((action) => {
        const Icon = action.icon;
        const colors = colorStyles[action.color ?? "primary"];

        return (
          <div key={action.href || String(action.title)} role="listitem" className="h-full">
            <Link
              href={action.href}
              aria-label={typeof action.title === "string" ? action.title : undefined}
              className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div
                className={cn(
                  "flex h-full flex-col items-center gap-3 rounded-xl p-4 text-center shadow-sm transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-lg group-active:scale-[0.97]",
                  colors.tile
                )}
              >
                <div className={cn("rounded-lg p-2", colors.iconWrap)} aria-hidden="true">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold leading-tight tracking-tight">
                  {action.title}
                </span>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );

  if (variant === "flat") {
    return (
      <section
        aria-labelledby={titleId}
        className={cn("py-6", className)}
        {...props}
      >
        <Heading
          id={titleId}
          className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
        >
          {title}
        </Heading>
        {gridContent}
      </section>
    );
  }

  return (
    <Card
      aria-labelledby={titleId}
      className={cn(className)}
      {...props}
    >
      <CardHeader className="pb-0">
        <CardTitle as={as} className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {gridContent}
      </CardContent>
    </Card>
  );
}
