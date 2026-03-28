import * as React from "react";
import { User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

type RankedListHeading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type RankedItemVariant = "default" | "primary" | "success" | "warning";

/**
 * Represents a single ranked item in the list.
 */
export interface RankedItem {
  /** Unique identifier for the item */
  id: string;
  /** Current rank position */
  rank: number;
  /** Primary display text */
  label: string;
  /** Optional secondary text (e.g., username, subtitle) */
  sublabel?: string;
  /** Primary metric value */
  value: number;
  /** Optional label for the metric (e.g., "Points", "Score", "Wins") */
  valueLabel?: string;
  /** Optional icon component to display */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional semantic row emphasis */
  variant?: RankedItemVariant;
  /** Optional custom styling for this item */
  className?: string;
}

/**
 * Props for the RankedList component.
 */
export interface RankedListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Array of ranked items to display */
  items: readonly RankedItem[];
  /** Optional heading text for the list */
  title?: React.ReactNode;
  /** Optional icon component for the title */
  titleIcon?: React.ComponentType<{ className?: string }>;
  /** Semantic heading level. @default "h3" */
  as?: RankedListHeading;
  /** Default label for metric values when not specified per item */
  defaultValueLabel?: string;
  /** Message to display when list is empty */
  emptyMessage?: string;
  /** Maximum height before scrolling (any valid CSS length). @default "24rem" */
  maxHeight?: string;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Semantic heading level for the empty state title. @default "h3" */
  emptyTitleAs?: RankedListHeading;
}

const itemVariantStyles: Record<RankedItemVariant, string> = {
  default: "bg-background border-border hover:bg-accent/40",
  primary: "bg-primary/10 border-primary/30 hover:bg-primary/15",
  success: "bg-success/10 border-success/30 hover:bg-success/15",
  warning: "bg-warning/10 border-warning/30 hover:bg-warning/15",
};

/**
 * RankedList
 *
 * A clean, flexible component for displaying ranked items with optional icons,
 * sublabels, and semantic item emphasis. Perfect for leaderboards, standings,
 * rankings, or any ordered list with associated metrics.
 */
export const RankedList = React.forwardRef<HTMLDivElement, RankedListProps>(
  (
    {
      items,
      title,
      titleIcon: TitleIcon,
      as = "h3",
      defaultValueLabel = "Score",
      emptyMessage = "No items to display",
      maxHeight = "24rem",
      footer,
      emptyTitleAs = "h3",
      className,
      ...props
    },
    ref
  ) => {
    if (items.length === 0) {
      return (
        <Card ref={ref} className={className} {...props}>
          {title ? (
            <CardHeader>
              <CardTitle as={as} className="flex items-center justify-center gap-2 text-center">
                {TitleIcon ? <TitleIcon className="h-6 w-6 text-primary" aria-hidden="true" /> : null}
                {title}
              </CardTitle>
            </CardHeader>
          ) : null}
          <CardContent className={cn(title ? undefined : "pt-6")}>
            <EmptyState.Root className="rounded-xl border border-dashed border-border bg-muted/20">
              <EmptyState.Icon icon={User} />
              <EmptyState.Title as={emptyTitleAs}>{emptyMessage}</EmptyState.Title>
            </EmptyState.Root>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={className} {...props}>
        {title ? (
          <CardHeader>
            <CardTitle as={as} className="flex items-center justify-center gap-2 text-center">
              {TitleIcon ? <TitleIcon className="h-6 w-6 text-primary" aria-hidden="true" /> : null}
              {title}
            </CardTitle>
          </CardHeader>
        ) : null}

        <CardContent className={cn("space-y-3 overflow-y-auto pr-1", title ? undefined : "pt-6")} style={{ maxHeight }}>
          <div role="list" className="space-y-3">
            {items.map((item) => {
              const ItemIcon = item.icon;
              const valueLabel = item.valueLabel || defaultValueLabel;

              return (
                <div
                  key={item.id}
                  role="listitem"
                  className={cn(
                    "flex items-center justify-between rounded-xl border p-4 transition-all duration-300",
                    itemVariantStyles[item.variant ?? "default"],
                    item.className
                  )}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex items-center gap-2">
                      {ItemIcon ? <ItemIcon className="h-6 w-6 text-primary" aria-hidden="true" /> : null}
                      <span className="text-lg font-bold text-foreground">
                        {item.rank}.
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-lg font-semibold text-foreground">
                        {item.label}
                      </p>
                      {item.sublabel ? (
                        <p className="truncate text-sm text-muted-foreground">
                          {item.sublabel}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="ml-4 text-right">
                    <p className="text-2xl font-bold leading-tight text-foreground">
                      {item.value}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {valueLabel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>

        {footer ? (
          <CardFooter className="border-t border-border pt-4">
            {footer}
          </CardFooter>
        ) : null}
      </Card>
    );
  }
);

RankedList.displayName = "RankedList";
