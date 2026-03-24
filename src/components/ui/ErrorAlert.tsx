import { cn } from "@/lib/utils";
import { Button } from "./Button";

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  retryText?: string;
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
  retryText = "Retry?",
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
        <Button
          variant="ghost"
          colorScheme="red"
          size="sm"
          onClick={onRetry}
        >
          {retryText}
        </Button>
      )}
    </div>
  );
}