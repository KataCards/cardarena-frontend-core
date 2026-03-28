import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type TestimonialCardVariant = "muted" | "base" | "outlined";

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Customer name */
  name: string;
  /** Customer role or title */
  role: string;
  /** Testimonial content/quote */
  content: string;
  /** Rating out of 5 stars */
  rating?: number;
  /** Optional avatar image URL or element */
  avatar?: string | React.ReactNode;
  /** Card surface variant */
  variant?: TestimonialCardVariant;
  /** Whether to show quote marks */
  showQuotes?: boolean;
}

const variantStyles: Record<TestimonialCardVariant, string> = {
  muted: "bg-muted/30",
  base: "bg-card",
  outlined: "bg-card border-2 border-border",
};

/**
 * TestimonialCard
 *
 * A card component for displaying customer testimonials with ratings, avatars,
 * and semantic styling.
 */
export function TestimonialCard({
  name,
  role,
  content,
  rating = 5,
  avatar,
  variant = "muted",
  showQuotes = true,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <Card className={cn("h-full shadow-sm", variantStyles[variant], className)} {...props}>
      <CardContent className="p-8">
        {rating > 0 ? (
          <div
            className="mb-4 flex"
            aria-label={`${rating} out of 5 stars`}
            role="img"
          >
            {Array.from({ length: rating }).map((_, index) => (
              <Star
                key={`${name}-star-${index}`}
                className="h-5 w-5 fill-current text-warning"
                aria-hidden="true"
              />
            ))}
          </div>
        ) : null}

        <p className="mb-6 italic text-foreground">
          {showQuotes ? '"' : null}
          {content}
          {showQuotes ? '"' : null}
        </p>

        <div className="flex items-center gap-3">
          {avatar ? (
            <div className="shrink-0">
              {typeof avatar === "string" ? (
                <Image
                  src={avatar}
                  alt={name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                avatar
              )}
            </div>
          ) : null}
          <div>
            <div className="font-semibold text-foreground">{name}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
