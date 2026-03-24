import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the Badge component
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Content to display inside the badge */
  children: React.ReactNode;
  /** Visual variant - determines color scheme. @default "default" */
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "info" | "outline";
  /** Badge size. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Optional icon component to display before text. Should accept className and size props. */
  icon?: React.ComponentType<{ className?: string; size?: number }>;
}

/**
 * Semantic variant styles using theme tokens
 */
const variantStyles = {
  default: "bg-primary text-primary-foreground border-primary",
  secondary: "bg-secondary text-secondary-foreground border-secondary",
  success: "bg-success text-success-foreground border-success",
  warning: "bg-warning text-warning-foreground border-warning",
  destructive: "bg-destructive text-destructive-foreground border-destructive",
  info: "bg-info text-info-foreground border-info",
  outline: "bg-background text-foreground border-border",
};

/**
 * Size styles
 */
const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-0.5",
  lg: "text-base px-3 py-1",
};

/**
 * Icon size mapping
 */
const iconSizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
};

/**
 * Badge Component
 *
 * A compact, accessible badge for displaying status, labels, counts, or tags.
 * Uses semantic theme tokens for consistent theming across light/dark modes.
 *
 * Features:
 * - 7 semantic variants (default, secondary, success, warning, destructive, info, outline)
 * - 3 sizes (sm, md, lg)
 * - Optional icon support
 * - ForwardRef support
 * - Semantic color tokens (no hardcoded colors)
 * - Full className customization
 *
 * Design Philosophy:
 * - Uses semantic theme tokens for all colors
 * - Accessible by default
 * - Icon support with proper ARIA attributes
 * - Flexible sizing and styling
 *
 * @param props - Badge configuration
 * @param ref - Forwarded ref to the span element
 * @returns The rendered badge element
 *
 * @example
 * // Basic usage
 * <Badge>New</Badge>
 *
 * @example
 * // Status badges
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="destructive">Error</Badge>
 *
 * @example
 * // With icon
 * import { CheckCircle } from "lucide-react";
 * <Badge variant="success" icon={CheckCircle}>Completed</Badge>
 *
 * @example
 * // Different sizes
 * <Badge size="sm">Small</Badge>
 * <Badge size="md">Medium</Badge>
 * <Badge size="lg">Large</Badge>
 *
 * @example
 * // Outline variant
 * <Badge variant="outline">Neutral</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = "default",
      size = "md",
      icon: Icon,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 font-medium rounded-full border",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...rest}
      >
        {Icon && (
          <Icon
            className="shrink-0"
            size={iconSizeMap[size]}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";