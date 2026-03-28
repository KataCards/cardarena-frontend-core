import * as React from "react";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type PricingCardHeading = "h2" | "h3" | "h4" | "h5" | "h6";
type PricingCardHighlight = "primary" | "info" | "secondary";

export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Plan name */
  name: string;
  /** Price display (can include currency, period, etc.) */
  price: string | React.ReactNode;
  /** Optional text displayed next to or below the price (e.g., "per user / month") */
  priceDescription?: string;
  /** Optional plan description */
  description?: string;
  /** List of features included in the plan */
  features: readonly string[];
  /** Call-to-action button text */
  buttonText: string;
  /** Optional button click handler */
  onButtonClick?: () => void;
  /** Optional button href */
  buttonHref?: string;
  /** Whether this is the popular/recommended plan */
  isPopular?: boolean;
  /** Popular badge text */
  popularText?: string;
  /** Button variant override */
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  /** Highlight color for popular plan */
  highlightColor?: PricingCardHighlight;
  /** Semantic heading level for the plan title. @default "h3" */
  as?: PricingCardHeading;
}

const highlightStyles: Record<
  PricingCardHighlight,
  { border: string; badgeVariant: React.ComponentProps<typeof Badge>["variant"] }
> = {
  primary: {
    border: "border-primary",
    badgeVariant: "default",
  },
  info: {
    border: "border-info",
    badgeVariant: "info",
  },
  secondary: {
    border: "border-secondary",
    badgeVariant: "secondary",
  },
};

/**
 * PricingCard
 *
 * A card component for displaying pricing plans with features, pricing,
 * and call-to-action buttons. Supports highlighting popular plans.
 */
export function PricingCard({
  name,
  price,
  priceDescription,
  description,
  features,
  buttonText,
  onButtonClick,
  buttonHref,
  isPopular = false,
  popularText = "Popular",
  buttonVariant,
  highlightColor = "primary",
  as = "h3",
  className,
  ...props
}: PricingCardProps) {
  const Heading = as;
  const highlight = highlightStyles[highlightColor];
  const resolvedButtonVariant = buttonVariant ?? (isPopular ? "default" : "outline");

  return (
    <div
      className={cn(
        "relative rounded-xl bg-card p-8 shadow-sm transition-all hover:shadow-md",
        isPopular ? cn("border-2", highlight.border) : "border border-border",
        className
      )}
      {...props}
    >
      {isPopular ? (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge variant={highlight.badgeVariant} className="shadow-lg">
            {popularText}
          </Badge>
        </div>
      ) : null}

      <Heading className="mb-2 text-xl font-semibold text-card-foreground">{name}</Heading>

      {description ? (
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      ) : null}

      <div className="mb-6">
        <div className="text-3xl font-bold text-card-foreground">{price}</div>
        {priceDescription ? (
          <p className="mt-1 text-sm text-muted-foreground">{priceDescription}</p>
        ) : null}
      </div>

      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={`${feature}-${index}`} className="flex items-start">
            <CheckCircle
              className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-success"
              aria-hidden="true"
            />
            <span className="text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={resolvedButtonVariant}
        fullWidth
        onClick={onButtonClick}
        href={buttonHref}
      >
        {buttonText}
      </Button>
    </div>
  );
}
