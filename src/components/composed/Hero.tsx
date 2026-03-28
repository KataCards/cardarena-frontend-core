import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type HeroHeading = "h1" | "h2" | "h3" | "h4";

interface HeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Optional badge text displayed above the title */
  badge?: React.ReactNode;
  /** Main heading text, can include JSX for highlighting */
  title: React.ReactNode;
  /** Supporting description text below the title */
  description: React.ReactNode;
  /** Primary CTA button text */
  primaryText: string;
  /** Primary CTA button link */
  primaryHref: string;
  /** Optional secondary CTA button text */
  secondaryText?: string;
  /** Optional secondary CTA button link */
  secondaryHref?: string;
  /** Semantic heading level. @default "h1" */
  as?: HeroHeading;
}

/**
 * Hero Section
 *
 * High-impact landing page header with animated background,
 * optional badge, heading, description, and up to two call-to-action buttons.
 */
export function Hero({
  badge,
  title,
  description,
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  as = "h1",
  className,
  ...props
}: HeroProps) {
  const Heading = as;
  const titleId = React.useId();
  const isPlainDescription =
    typeof description === "string" || typeof description === "number";

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/40",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-info/10 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-primary)_14%,transparent),transparent_65%)] animate-[spin_20s_linear_infinite]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="text-center">
          {badge ? (
            <Badge
              variant="outline"
              className="mb-6 animate-fade-in border-primary/20 bg-primary/10 text-primary"
            >
              {badge}
            </Badge>
          ) : null}

          <Heading
            id={titleId}
            className="mb-6 text-4xl font-bold tracking-tight text-foreground animate-fade-in md:text-6xl [animation-delay:100ms]"
          >
            {title}
          </Heading>

          {description ? (
            isPlainDescription ? (
              <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-muted-foreground animate-fade-in [animation-delay:200ms]">
                {description}
              </p>
            ) : (
              <div className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-muted-foreground animate-fade-in [animation-delay:200ms]">
                {description}
              </div>
            )
          ) : null}

          <div className="flex flex-col justify-center gap-4 animate-fade-in [animation-delay:300ms] sm:flex-row">
            <Button
              size="lg"
              href={primaryHref}
              variant="default"
              icon={ArrowRight}
              iconPosition="right"
            >
              {primaryText}
            </Button>

            {secondaryText && secondaryHref ? (
              <Button
                size="lg"
                href={secondaryHref}
                variant="outline"
              >
                {secondaryText}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
