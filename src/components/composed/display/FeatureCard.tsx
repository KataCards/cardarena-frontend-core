import * as React from "react";
import { cn } from "@/lib/utils";

type FeatureCardHeading = "h2" | "h3" | "h4" | "h5" | "h6";

export interface FeatureCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onClick"> {
  /** Icon element or component to display */
  icon: React.ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Icon color variant */
  iconColor?: "primary" | "info" | "success" | "secondary" | "muted";
  /** Card background variant */
  variant?: "base" | "muted" | "surface";
  /** Optional click handler */
  onClick?: () => void;
  /** Semantic heading level for the title. @default "h3" */
  as?: FeatureCardHeading;
}

const iconColors = {
  primary: "text-primary",
  info: "text-info",
  success: "text-success",
  secondary: "text-secondary",
  muted: "text-muted-foreground",
} as const;

const variants = {
  base: "bg-background border border-border",
  muted: "bg-muted/30 border border-border",
  surface: "bg-card border border-border",
} as const;

/**
 * FeatureCard
 *
 * A card component for displaying features with an icon, title, and description.
 * Supports semantic color schemes and surface variants.
 */
export function FeatureCard({
  icon,
  title,
  description,
  iconColor = "primary",
  variant = "base",
  onClick,
  as = "h3",
  className,
  ...props
}: FeatureCardProps) {
  const Heading = as;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "rounded-xl p-8 shadow-sm transition-all hover:shadow-md cursor-pointer hover:scale-105 active:scale-100 text-left",
          variants[variant],
          className
        )}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        <div className={cn("mb-4", iconColors[iconColor])} aria-hidden="true">
          {icon}
        </div>
        <Heading className="mb-3 text-xl font-semibold text-foreground">{title}</Heading>
        <p className="text-muted-foreground">{description}</p>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl p-8 shadow-sm transition-all hover:shadow-md",
        variants[variant],
        className
      )}
      {...props}
    >
      <div className={cn("mb-4", iconColors[iconColor])} aria-hidden="true">
        {icon}
      </div>
      <Heading className="mb-3 text-xl font-semibold text-foreground">{title}</Heading>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
