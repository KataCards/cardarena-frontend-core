import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps {
  /** Content to display inside the badge */
  children: ReactNode;
  /** Visual variant of the badge */
  variant?: "default" | "success" | "warning" | "error" | "info" | "neutral";
  /** Size of the badge */
  size?: "sm" | "md" | "lg";
  /** Optional icon to display before the text */
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  /** Additional CSS classes */
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

/**
 * Badge Component
 * 
 * A versatile badge component for displaying status, labels, or counts.
 * Supports multiple variants, sizes, and optional icons.
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
 */
export function Badge({
  children,
  variant = "default",
  size = "md",
  icon: Icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {Icon && <Icon className="mr-1" size={size === "sm" ? 12 : size === "lg" ? 16 : 14} />}
      {children}
    </span>
  );
}