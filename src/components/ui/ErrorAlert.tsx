import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the ErrorAlert root component
 */
export interface ErrorAlertRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alert variant. @default "destructive" */
  variant?: "destructive" | "warning" | "info";
}

/**
 * Props for the ErrorAlert title component
 */
export interface ErrorAlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level. @default "h5" */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Props for the ErrorAlert description component
 */
export interface ErrorAlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the ErrorAlert action component
 */
export interface ErrorAlertActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Variant styles using semantic tokens
 */
const variantStyles = {
  destructive: {
    container: "bg-destructive/10 border-destructive/20 text-destructive",
    title: "text-destructive",
    description: "text-destructive/90",
  },
  warning: {
    container: "bg-warning/10 border-warning/20 text-warning-foreground",
    title: "text-warning",
    description: "text-warning/90",
  },
  info: {
    container: "bg-info/10 border-info/20 text-info-foreground",
    title: "text-info",
    description: "text-info/90",
  },
};

/**
 * ErrorAlert Root Component
 *
 * Container for the error alert compound component system.
 *
 * @example
 * <ErrorAlert.Root>
 *   <ErrorAlert.Title>Error</ErrorAlert.Title>
 *   <ErrorAlert.Description>
 *     Something went wrong. Please try again.
 *   </ErrorAlert.Description>
 *   <ErrorAlert.Action onClick={handleRetry}>Retry</ErrorAlert.Action>
 * </ErrorAlert.Root>
 */
const ErrorAlertRoot = React.forwardRef<HTMLDivElement, ErrorAlertRootProps>(
  ({ variant = "destructive", className, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      aria-live="assertive"
      className={cn(
        "relative rounded-lg border px-4 py-3",
        variantStyles[variant].container,
        className
      )}
      {...props}
    />
  )
);
ErrorAlertRoot.displayName = "ErrorAlert.Root";

/**
 * ErrorAlert Title Component
 *
 * The heading for the alert.
 *
 * @example
 * <ErrorAlert.Title>Error</ErrorAlert.Title>
 *
 * @example
 * <ErrorAlert.Title as="h3">Connection Failed</ErrorAlert.Title>
 */
const ErrorAlertTitle = React.forwardRef<HTMLHeadingElement, ErrorAlertTitleProps>(
  ({ as: Comp = "h5", className, ...props }, ref) =>
    React.createElement(Comp, {
      ref,
      className: cn("font-semibold mb-1", className),
      ...props,
    })
);
ErrorAlertTitle.displayName = "ErrorAlert.Title";

/**
 * ErrorAlert Description Component
 *
 * The main message content of the alert.
 *
 * @example
 * <ErrorAlert.Description>
 *   Unable to load data. Please check your connection and try again.
 * </ErrorAlert.Description>
 */
const ErrorAlertDescription = React.forwardRef<HTMLDivElement, ErrorAlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm", className)}
      {...props}
    />
  )
);
ErrorAlertDescription.displayName = "ErrorAlert.Description";

/**
 * ErrorAlert Action Component
 *
 * An action button for the alert (e.g., retry, dismiss).
 *
 * @example
 * <ErrorAlert.Action onClick={handleRetry}>Retry</ErrorAlert.Action>
 *
 * @example
 * <ErrorAlert.Action onClick={handleDismiss}>Dismiss</ErrorAlert.Action>
 */
const ErrorAlertAction = React.forwardRef<HTMLButtonElement, ErrorAlertActionProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "mt-2 inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium",
        "transition-colors hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
ErrorAlertAction.displayName = "ErrorAlert.Action";

/**
 * ErrorAlert Compound Component System
 *
 * A flexible alert component for displaying errors, warnings, and info messages.
 * Uses semantic theme tokens for consistent theming.
 *
 * Features:
 * - 3 semantic variants (destructive, warning, info)
 * - Compound component pattern for flexibility
 * - Semantic color tokens (no hardcoded colors)
 * - ForwardRef support on all components
 * - Accessible by default (role="alert", aria-live)
 * - Customizable heading levels
 * - Optional action buttons
 *
 * Design Philosophy:
 * - Composition over configuration
 * - Uses semantic theme tokens for all colors
 * - Accessible by default
 * - Flexible layout and styling
 *
 * @example
 * // Basic error alert
 * <ErrorAlert.Root>
 *   <ErrorAlert.Title>Error</ErrorAlert.Title>
 *   <ErrorAlert.Description>
 *     Something went wrong. Please try again.
 *   </ErrorAlert.Description>
 * </ErrorAlert.Root>
 *
 * @example
 * // With retry action
 * <ErrorAlert.Root>
 *   <ErrorAlert.Title>Connection Failed</ErrorAlert.Title>
 *   <ErrorAlert.Description>
 *     Unable to connect to the server.
 *   </ErrorAlert.Description>
 *   <ErrorAlert.Action onClick={handleRetry}>Retry</ErrorAlert.Action>
 * </ErrorAlert.Root>
 *
 * @example
 * // Warning variant
 * <ErrorAlert.Root variant="warning">
 *   <ErrorAlert.Title>Warning</ErrorAlert.Title>
 *   <ErrorAlert.Description>
 *     Your session will expire in 5 minutes.
 *   </ErrorAlert.Description>
 *   <ErrorAlert.Action onClick={handleExtend}>Extend Session</ErrorAlert.Action>
 * </ErrorAlert.Root>
 *
 * @example
 * // Info variant
 * <ErrorAlert.Root variant="info">
 *   <ErrorAlert.Title>Update Available</ErrorAlert.Title>
 *   <ErrorAlert.Description>
 *     A new version of the app is available.
 *   </ErrorAlert.Description>
 *   <ErrorAlert.Action onClick={handleUpdate}>Update Now</ErrorAlert.Action>
 * </ErrorAlert.Root>
 */
export const ErrorAlert = {
  Root: ErrorAlertRoot,
  Title: ErrorAlertTitle,
  Description: ErrorAlertDescription,
  Action: ErrorAlertAction,
};