import * as React from "react";
import { cn } from "@/lib/utils";

export interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Error message to display */
  children: React.ReactNode;
}

/**
 * FieldError Component
 *
 * A semantic error message primitive for form fields.
 * Provides consistent error styling and accessibility attributes.
 *
 * Features:
 * - Semantic HTML with proper paragraph element
 * - Consistent error typography and color
 * - Accessible with proper role and styling
 * - ForwardRef support
 * - Full paragraph HTML attributes support
 *
 * Design Philosophy:
 * - Standalone primitive - not tied to any specific input
 * - Use id to link with input's aria-describedby
 * - Pair with Label and Input for complete form fields
 *
 * @param props - FieldError configuration
 * @param ref - Forwarded ref to the paragraph element
 * @returns The rendered error message element
 *
 * @example
 * <FieldError id="email-error">Email is required</FieldError>
 *
 * @example
 * <FieldError id="password-error">
 *   Password must be at least 8 characters
 * </FieldError>
 */
export const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("mt-1.5 text-sm text-destructive", className)}
      role="alert"
      {...props}
    >
      {children}
    </p>
  )
);

FieldError.displayName = "FieldError";