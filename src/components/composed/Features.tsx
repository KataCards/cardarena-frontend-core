import * as React from "react";
import { FeatureCard } from "@/components/composed/display/FeatureCard";
import { cn } from "@/lib/utils";

type FeaturesHeading = "h1" | "h2" | "h3" | "h4";
type FeaturesMaxWidth = "xl" | "2xl" | "5xl" | "7xl" | "full";

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Array of feature objects to display in the grid */
  features: readonly Feature[];
  /** Main heading text for the features section */
  title?: React.ReactNode;
  /** Supporting description text below the title */
  description?: React.ReactNode;
  /** Semantic heading level. @default "h2" */
  as?: FeaturesHeading;
  /** Surface variant for different page contexts */
  variant?: "muted" | "base" | "surface";
  /** Width constraint for the section content. @default "7xl" */
  maxWidth?: FeaturesMaxWidth;
}

const variantStyles = {
  muted: {
    section: "bg-muted/30",
    title: "text-foreground",
    description: "text-muted-foreground",
  },
  base: {
    section: "bg-background",
    title: "text-foreground",
    description: "text-muted-foreground",
  },
  surface: {
    section: "bg-card",
    title: "text-card-foreground",
    description: "text-muted-foreground",
  },
} as const;

const maxWidthStyles: Record<FeaturesMaxWidth, string> = {
  xl: "max-w-6xl",
  "2xl": "max-w-screen-2xl",
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

/**
 * Features Section
 *
 * Displays a grid of feature cards with a centered heading and description.
 * Responsive layout adapts from single column on mobile to three columns on desktop.
 */
export function Features({
  features,
  title = "Everything you need",
  description = "Professional tools for perfect tournaments",
  as = "h2",
  variant = "muted",
  maxWidth = "7xl",
  className,
  ...props
}: FeaturesProps) {
  const Heading = as;
  const titleId = React.useId();
  const styles = variantStyles[variant];
  const isPlainDescription =
    typeof description === "string" || typeof description === "number";

  return (
    <section
      aria-labelledby={titleId}
      className={cn("py-20", styles.section, className)}
      {...props}
    >
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", maxWidthStyles[maxWidth])}>
        <header className="mb-16 text-center">
          <Heading
            id={titleId}
            className={cn("mb-4 text-3xl font-bold md:text-4xl", styles.title)}
          >
            {title}
          </Heading>
          {description ? (
            isPlainDescription ? (
              <p className={cn("text-xl", styles.description)}>{description}</p>
            ) : (
              <div className={cn("text-xl", styles.description)}>{description}</div>
            )
          ) : null}
        </header>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
