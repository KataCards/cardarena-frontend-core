import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes, useId } from "react";

type SpinnerSize = "sm" | "md" | "lg" | "xl";
type SpinnerVariant = "default" | "muted" | "primary" | "inherit";

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const variantMap: Record<SpinnerVariant, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  inherit: "text-current",
};

/**
 * Props for the Spinner component
 */
export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Size of the spinner. @default "md" */
  size?: SpinnerSize | number;
  /** Visual variant. @default "muted" */
  variant?: SpinnerVariant;
  /** Accessible label for screen readers. @default "Loading" */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the LoadingState component
 */
export interface LoadingStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the spinner. @default "md" */
  size?: SpinnerSize | number;
  /** Visual variant. @default "muted" */
  variant?: SpinnerVariant;
  /** Optional message to display below spinner */
  message?: string;
  /** Additional CSS classes for container */
  className?: string;
  /** Additional CSS classes for message */
  messageClassName?: string;
}

/**
 * Spinner Component
 *
 * A minimal, unopinionated loading spinner primitive. Just the icon, no layout.
 * Use this when you need a spinner inside buttons, table cells, or custom layouts.
 *
 * Features:
 * - Minimal styling (only the spinning animation)
 * - Semantic color variants
 * - Accessible with proper ARIA attributes
 * - Inherits parent text color by default
 * - ForwardRef support
 *
 * @param props - Spinner configuration
 * @param ref - Forwarded ref to the span element
 * @returns The rendered spinner element
 *
 * @example
 * // Inside a button
 * <Button disabled>
 *   <Spinner size="sm" variant="inherit" className="mr-2" />
 *   Loading...
 * </Button>
 *
 * @example
 * // Standalone with custom size
 * <Spinner size={40} variant="primary" />
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = "md", variant = "muted", label = "Loading", className, ...props }, ref) => {
    const spinnerSize = typeof size === "number" ? size : sizeMap[size];

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn("inline-block", className)}
        {...props}
      >
        <Loader2
          className={cn("animate-spin", variantMap[variant])}
          size={spinnerSize}
          aria-hidden="true"
        />
      </span>
    );
  }
);
Spinner.displayName = "Spinner";

/**
 * LoadingState Component
 *
 * A composed loading indicator with centered layout and optional message.
 * Use this for full-page loading states, empty sections, or loading overlays.
 *
 * Features:
 * - Centered layout with padding
 * - Optional loading message
 * - Accessible with proper ARIA attributes
 * - Semantic HTML structure
 *
 * @param props - LoadingState configuration
 * @param ref - Forwarded ref to the container div
 * @returns The rendered loading state element
 *
 * @example
 * // Simple loading state
 * <LoadingState />
 *
 * @example
 * // With message
 * <LoadingState message="Loading users..." />
 *
 * @example
 * // Custom styling
 * <LoadingState
 *   size="lg"
 *   variant="primary"
 *   message="Please wait..."
 *   className="min-h-96"
 * />
 */
export const LoadingState = forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ size = "md", variant = "muted", message, className, messageClassName, ...props }, ref) => {
    const id = useId();
    const messageId = message ? `loading-message-${id}` : undefined;

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-describedby={messageId}
        className={cn("flex flex-col items-center justify-center gap-3 py-12", className)}
        {...props}
      >
        <Spinner size={size} variant={variant} label={message || "Loading"} />
        {message && (
          <p id={messageId} className={cn("text-sm text-muted-foreground", messageClassName)}>
            {message}
          </p>
        )}
      </div>
    );
  }
);
LoadingState.displayName = "LoadingState";

/**
 * @deprecated Use `Spinner` or `LoadingState` instead.
 * This export is kept for backward compatibility.
 */
export const LoadingSpinner = LoadingState;