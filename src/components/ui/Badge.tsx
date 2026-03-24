import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the Badge component
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Content to display inside the badge */
  children: ReactNode;
  /** Visual variant - determines color scheme. @default "default" */
  variant?: "default" | "success" | "warning" | "error" | "info" | "neutral";
  /** Badge size. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Optional icon component to display before text. Should accept className and size props. */
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  /** Additional CSS classes to merge with defaults */
  className?: string;
}

const variantStyles = {
  default: "bg-gray-100 text-gray-800 border-gray-200",
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  error: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
  neutral: "bg-gray-50 text-gray-600 border-gray-100",
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-0.5",
  lg: "text-base px-3 py-1",
};

const iconSizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
};

/**
 * Badge Component
 *
 * A compact, versatile badge for displaying status, labels, counts, or tags.
 * Supports 6 semantic variants, 3 sizes, optional icons, and full className customization.
 *
 * @param props - Badge configuration
 * @returns The rendered badge element
 *
 * @example
 * // Basic usage
 * <Badge>New</Badge>
 *
 * @example
 * // With variant and size
 * <Badge variant="success" size="lg">Active</Badge>
 *
 * @example
 * // With icon
 * import { CheckCircle } from "lucide-react";
 * <Badge variant="success" icon={CheckCircle}>Completed</Badge>
 *
 * @example
 * // Custom styling
 * <Badge className="bg-purple-100 text-purple-800">Custom</Badge>
 */
export function Badge({
  children,
  variant = "default",
  size = "md",
  icon: Icon,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
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