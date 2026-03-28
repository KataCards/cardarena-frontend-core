import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type CTAHeading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type CTAMaxWidth = "xl" | "2xl" | "4xl" | "5xl" | "7xl";

export interface CTAProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Main heading text displayed prominently at the top */
  title?: React.ReactNode;
  /** Supporting description text below the title */
  description?: React.ReactNode;
  /** Text displayed on the call-to-action button */
  buttonText?: string;
  /** URL or path the button navigates to */
  buttonHref?: string;
  /** Visual style variant for different contexts */
  variant?: "default" | "gradient" | "dark";
  /** Semantic heading level. @default "h2" */
  as?: CTAHeading;
  /** Width constraint for the inner content. @default "4xl" */
  maxWidth?: CTAMaxWidth;
}

const variantStyles = {
  default: {
    section: "bg-primary text-primary-foreground",
    description: "text-primary-foreground/80",
    buttonVariant: "secondary" as const,
    overlay: undefined,
  },
  gradient: {
    section:
      "bg-gradient-to-br from-primary via-primary to-foreground text-primary-foreground",
    description: "text-primary-foreground/85",
    buttonVariant: "secondary" as const,
    overlay:
      "bg-[radial-gradient(circle_at_30%_50%,color-mix(in_oklab,var(--color-primary-foreground)_12%,transparent),transparent_50%)]",
  },
  dark: {
    section: "bg-card text-card-foreground border-y border-border",
    description: "text-muted-foreground",
    buttonVariant: "default" as const,
    overlay: undefined,
  },
} as const;

const maxWidthStyles: Record<CTAMaxWidth, string> = {
  xl: "max-w-6xl",
  "2xl": "max-w-screen-2xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
};

/**
 * CTA (Call-to-Action) Section
 *
 * A prominent, full-width section designed to drive user engagement with a clear
 * action. Supports multiple visual variants and fully customizable content.
 */
export function CTA({
  title = "Ready for your first tournament?",
  description = "Get started today and experience how simple tournament management can be.",
  buttonText = "Sign up for free",
  buttonHref = "/login",
  variant = "default",
  as = "h2",
  maxWidth = "4xl",
  className,
  ...props
}: CTAProps) {
  const Heading = as;
  const titleId = React.useId();
  const styles = variantStyles[variant];

  return (
    <section
      aria-labelledby={titleId}
      className={cn("relative overflow-hidden py-24", styles.section, className)}
      {...props}
    >
      {variant === "gradient" && styles.overlay ? (
        <div className={cn("absolute inset-0", styles.overlay)} aria-hidden="true" />
      ) : null}

      <div
        className={cn(
          "relative mx-auto px-4 text-center sm:px-6 lg:px-8",
          maxWidthStyles[maxWidth]
        )}
      >
        <Heading
          id={titleId}
          className="mb-6 text-4xl font-bold tracking-tight md:text-5xl"
        >
          {title}
        </Heading>
        <div className="mx-auto max-w-2xl">
          <div className={cn("mb-10 text-lg leading-relaxed md:text-xl", styles.description)}>
            {typeof description === "string" || typeof description === "number" ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>
        </div>
        <Button
          href={buttonHref}
          variant={styles.buttonVariant}
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          className="transition-transform duration-200 hover:scale-105"
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
