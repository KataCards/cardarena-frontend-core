import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label for the input field
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
}

/**
 * Input - A styled text input field with optional label and error state
 * 
 * Features:
 * - Optional label
 * - Error state display
 * - Full input HTML attributes support
 * - Accessible with proper ARIA attributes
 * - Consistent styling with other form components
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-4 py-3 border rounded-lg",
            "focus:ring-2 focus:ring-red-500 focus:border-red-500",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            "transition-colors",
            error ? "border-red-300" : "border-gray-300",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";