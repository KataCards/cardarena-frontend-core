import * as React from "react";
import { PricingCard } from "@/components/composed/display/PricingCard";
import { cn } from "@/lib/utils";

type PricingHeading = "h1" | "h2" | "h3" | "h4";
type PricingVariant = "muted" | "base" | "surface";
type PricingMaxWidth = "xl" | "2xl" | "5xl" | "7xl" | "full";

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  isContact?: boolean;
}

interface PricingProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Array of pricing plans to display */
  plans: readonly PricingPlan[];
  /** Main heading text for the pricing section */
  title?: React.ReactNode;
  /** Supporting description text below the title */
  description?: React.ReactNode;
  /** Semantic heading level. @default "h2" */
  as?: PricingHeading;
  /** Surface variant */
  variant?: PricingVariant;
  /** Width constraint for the section content. @default "7xl" */
  maxWidth?: PricingMaxWidth;
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

const maxWidthStyles: Record<PricingMaxWidth, string> = {
  xl: "max-w-6xl",
  "2xl": "max-w-screen-2xl",
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

/**
 * Pricing Section
 *
 * Displays a responsive grid of pricing plans with customizable heading and styling.
 * Automatically adapts from single column on mobile to three columns on desktop.
 */
export function Pricing({
  plans,
  title = "Simple Pricing",
  description = "Choose the plan that fits your needs",
  as = "h2",
  variant = "muted",
  maxWidth = "7xl",
  className,
  ...props
}: PricingProps) {
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name || index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
