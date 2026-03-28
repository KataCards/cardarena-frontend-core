import * as React from "react";
import { TestimonialCard } from "@/components/composed/display/TestimonialCard";
import { cn } from "@/lib/utils";

type TestimonialsHeading = "h1" | "h2" | "h3" | "h4";
type TestimonialsVariant = "muted" | "base" | "surface";

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Array of testimonial objects to display */
  testimonials: readonly Testimonial[];
  /** Main heading text for the testimonials section */
  title?: React.ReactNode;
  /** Supporting description text below the title */
  description?: React.ReactNode;
  /** Semantic heading level. @default "h2" */
  as?: TestimonialsHeading;
  /** Surface variant */
  variant?: TestimonialsVariant;
}

const variantStyles = {
  muted: {
    section: "bg-muted/30",
    title: "text-foreground",
    description: "text-muted-foreground",
    cardVariant: "muted" as const,
  },
  base: {
    section: "bg-background",
    title: "text-foreground",
    description: "text-muted-foreground",
    cardVariant: "base" as const,
  },
  surface: {
    section: "bg-card",
    title: "text-card-foreground",
    description: "text-muted-foreground",
    cardVariant: "outlined" as const,
  },
} as const;

/**
 * Testimonials Section
 *
 * Displays a responsive grid of customer testimonials with ratings and user details.
 * Automatically adapts from single column on mobile to three columns on desktop.
 */
export function Testimonials({
  testimonials,
  title = "What our customers say",
  description = "Trusted by thousands of satisfied users",
  as = "h2",
  variant = "base",
  className,
  ...props
}: TestimonialsProps) {
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name || index}
              variant={styles.cardVariant}
              {...testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
