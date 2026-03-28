import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Whether the field is required (adds visual indicator) */
  required?: boolean;
}

/**
 * Label Component
 *
 * A semantic label primitive for form fields.
 * Provides consistent typography and optional required indicator.
 *
 * Features:
 * - Semantic HTML with proper label element
 * - Optional required indicator (*)
 * - Consistent typography across forms
 * - ForwardRef support
 * - Full label HTML attributes support
 *
 * Design Philosophy:
 * - Standalone primitive - not tied to any specific input
 * - Use htmlFor to associate with input id
 * - Pair with Input and FieldError for complete form fields
 *
 * @param props - Label configuration
 * @param ref - Forwarded ref to the label element
 * @returns The rendered label element
 *
 * @example
 * <Label htmlFor="email">Email Address</Label>
 *
 * @example
 * <Label htmlFor="password" required>Password</Label>
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, className, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "block text-sm font-medium text-foreground mb-1.5",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-destructive ml-1" aria-label="required">*</span>}
    </label>
  )
);

Label.displayName = "Label";