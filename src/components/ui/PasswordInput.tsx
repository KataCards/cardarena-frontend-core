import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
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
 * PasswordInput - A password input field with show/hide toggle
 * 
 * Features:
 * - Toggle visibility button with eye icons
 * - Optional label
 * - Error state display
 * - Full input HTML attributes support
 * - Accessible with proper ARIA attributes
 */
export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ label, error, className, disabled, id, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
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
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={showPassword ? "text" : "password"}
          className={cn(
            "w-full px-4 py-3 pr-12 border rounded-lg",
            "focus:ring-2 focus:ring-red-500 focus:border-red-500",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            "transition-colors",
            error ? "border-red-300" : "border-gray-300",
            className
          )}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
          disabled={disabled}
          aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";