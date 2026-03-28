import * as React from "react";
import { Badge, type BadgeProps } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type MarketingSectionHeading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface MarketingSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Optional badge shown above the title */
  badge?: {
    label: React.ReactNode;
    variant?: BadgeProps["variant"];
  };
  /** Section title */
  title: React.ReactNode;
  /** Optional descriptive copy */
  description?: React.ReactNode;
  /** Optional heading level. @default "h2" */
  as?: MarketingSectionHeading;
  /** Optional actions such as buttons or links */
  actions?: React.ReactNode;
  /** Content rendered below the section heading */
  children?: React.ReactNode;
  /** Width constraint for the inner content. @default "7xl" */
  maxWidth?: "xl" | "2xl" | "5xl" | "7xl" | "full";
  /** Text alignment */
  align?: "left" | "center";
}

const maxWidthStyles = {
  xl: "max-w-6xl",
  "2xl": "max-w-screen-2xl",
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
} as const;

/**
 * MarketingSection
 *
 * A generic heading-and-content wrapper for landing page sections.
 */
export const MarketingSection = React.forwardRef<HTMLElement, MarketingSectionProps>(
  (
    {
      badge,
      title,
      description,
      as = "h2",
      actions,
      children,
      maxWidth = "7xl",
      align = "center",
      className,
      ...props
    },
    ref
  ) => {
    const Heading = as;
    const isPlainDescription =
      typeof description === "string" || typeof description === "number";

    return (
      <section ref={ref} className={className} {...props}>
        <div className={cn(maxWidthStyles[maxWidth], "mx-auto px-4 sm:px-6 lg:px-8")}>
          <div
            className={cn(
              "mx-auto mb-12 flex max-w-3xl flex-col gap-4",
              align === "center" ? "items-center text-center" : "items-start text-left"
            )}
          >
            {badge ? <Badge variant={badge.variant}>{badge.label}</Badge> : null}
            <Heading className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {title}
            </Heading>
            {description ? (
              isPlainDescription ? (
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {description}
                </p>
              ) : (
                <div className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {description}
                </div>
              )
            ) : null}
            {actions ? (
              <div
                className={cn(
                  "flex flex-wrap gap-3",
                  align === "center" ? "justify-center" : "justify-start"
                )}
              >
                {actions}
              </div>
            ) : null}
          </div>

          {children}
        </div>
      </section>
    );
  }
);

MarketingSection.displayName = "MarketingSection";
