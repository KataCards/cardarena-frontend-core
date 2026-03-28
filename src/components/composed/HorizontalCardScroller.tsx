"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, GalleryHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

type HorizontalCardScrollerHeading = "h1" | "h2" | "h3" | "h4";
type HorizontalCardScrollerVariant = "base" | "muted" | "surface";

interface HorizontalCardScrollerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Main heading text for the section */
  title: React.ReactNode;
  /** Number of items being displayed (shown in badge) */
  itemCount: number;
  /** Child card components to display in the scroller */
  children: React.ReactNode;
  /** Optional custom empty state component */
  emptyState?: React.ReactNode;
  /** Default message when no items are available */
  emptyMessage?: string;
  /** Surface variant */
  variant?: HorizontalCardScrollerVariant;
  /** Amount to scroll per button click (in pixels) */
  scrollAmount?: number;
  /** Optional icon component for the title */
  titleIcon?: React.ComponentType<{ className?: string }>;
  /** Semantic heading level. @default "h2" */
  as?: HorizontalCardScrollerHeading;
  /** Optional description displayed under the title */
  description?: React.ReactNode;
}

const variantStyles: Record<
  HorizontalCardScrollerVariant,
  {
    shell: string;
    title: string;
    description: string;
    controls: string;
    emptyState: string;
  }
> = {
  base: {
    shell: "bg-background border border-border shadow-sm",
    title: "text-foreground",
    description: "text-muted-foreground",
    controls: "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
    emptyState: "border-border bg-muted/20",
  },
  muted: {
    shell: "bg-muted/30 border border-border shadow-sm",
    title: "text-foreground",
    description: "text-muted-foreground",
    controls: "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
    emptyState: "border-border bg-background/70",
  },
  surface: {
    shell: "bg-card border border-border shadow-sm",
    title: "text-card-foreground",
    description: "text-muted-foreground",
    controls: "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
    emptyState: "border-border bg-muted/20",
  },
};

/**
 * HorizontalCardScroller
 *
 * A flexible, horizontally scrolling container for displaying card-based content.
 * Features smooth scrolling, snap points, arrow navigation, and responsive design.
 */
export function HorizontalCardScroller({
  title,
  itemCount,
  children,
  emptyState,
  emptyMessage = "No items to display",
  variant = "muted",
  scrollAmount = 340,
  titleIcon: TitleIcon,
  as = "h2",
  description,
  className,
  ...props
}: HorizontalCardScrollerProps) {
  const Heading = as;
  const titleId = React.useId();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const styles = variantStyles[variant];
  const isEmpty = itemCount === 0;
  const isPlainDescription =
    typeof description === "string" || typeof description === "number";

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-3xl p-8",
        styles.shell,
        className
      )}
      {...props}
    >
      <div className="mb-8 flex shrink-0 items-start justify-between gap-4">
        <div className="min-w-0">
          <Heading
            id={titleId}
            className={cn("flex items-center gap-3 text-3xl font-black tracking-tight", styles.title)}
          >
            {TitleIcon ? <TitleIcon className="h-7 w-7 shrink-0" aria-hidden="true" /> : null}
            <span className="min-w-0 truncate">{title}</span>
            {!isEmpty ? (
              <Badge variant="outline" className="shrink-0">
                {itemCount}
              </Badge>
            ) : null}
          </Heading>
          {description ? (
            isPlainDescription ? (
              <p className={cn("mt-2 text-sm", styles.description)}>{description}</p>
            ) : (
              <div className={cn("mt-2 text-sm", styles.description)}>{description}</div>
            )
          ) : null}
        </div>

        {!isEmpty ? (
          <div className="flex shrink-0 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className={styles.controls}
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className={styles.controls}
            >
              <ChevronRight aria-hidden="true" />
            </Button>
          </div>
        ) : null}
      </div>

      <div className="relative min-h-0 flex-1">
        {isEmpty ? (
          emptyState ? (
            emptyState
          ) : (
            <EmptyState.Root
              className={cn(
                "h-full w-full rounded-2xl border border-dashed px-6",
                styles.emptyState
              )}
            >
              <EmptyState.Icon icon={GalleryHorizontal} />
              <EmptyState.Title as="h3">{emptyMessage}</EmptyState.Title>
            </EmptyState.Root>
          )
        ) : (
          <div
            ref={scrollRef}
            className="flex h-full snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
