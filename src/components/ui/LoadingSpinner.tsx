import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  /**
   * Size of the spinner icon
   */
  size?: number;
  /**
   * Optional message to display next to the spinner
   */
  message?: string;
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Additional className for the icon
   */
  iconClassName?: string;
  /**
   * Additional className for the message text
   */
  messageClassName?: string;
}

/**
 * LoadingSpinner - A reusable loading indicator with optional message
 * 
 * Features:
 * - Animated spinning icon
 * - Optional loading message
 * - Customizable size and styling
 * - Centered layout by default
 */
export function LoadingSpinner({
  size = 32,
  message,
  className,
  iconClassName,
  messageClassName,
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <Loader2
        className={cn("animate-spin text-red-600", iconClassName)}
        size={size}
      />
      {message && (
        <p className={cn("ml-3 text-gray-600", messageClassName)}>{message}</p>
      )}
    </div>
  );
}