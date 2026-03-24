import { cn } from "@/lib/utils";

interface ErrorAlertProps {
  /**
   * Error message to display
   */
  message: string;
  /**
   * Optional retry callback
   */
  onRetry?: () => void;
  /**
   * Text for the retry button
   */
  retryText?: string;
  /**
   * Additional className for the container
   */
  className?: string;
}

/**
 * ErrorAlert - A styled error message component with optional retry action
 * 
 * Features:
 * - Prominent error styling with red theme
 * - Optional retry button
 * - Customizable retry text
 * - Accessible button with hover states
 */
export function ErrorAlert({
  message,
  onRetry,
  retryText = "Erneut versuchen",
  className,
}: ErrorAlertProps) {
  return (
    <div
      className={cn(
        "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg",
        className
      )}
      role="alert"
    >
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 underline hover:no-underline font-medium transition-all"
        >
          {retryText}
        </button>
      )}
    </div>
  );
}