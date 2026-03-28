"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, InputProps } from "./Input";

interface PasswordInputProps extends Omit<InputProps, "type" | "rightSlot"> {
  /** Accessible label for "show password" button. @default "Show password" */
  showPasswordLabel?: string;
  /** Accessible label for "hide password" button. @default "Hide password" */
  hidePasswordLabel?: string;
}

/**
 * PasswordInput Component
 *
 * A password input field with visibility toggle built on the slot-based Input primitive.
 * Demonstrates how specialized inputs can be built in ~20 lines using the Input's slot architecture.
 *
 * Features:
 * - Toggle visibility button with eye icons
 * - Localized/customizable ARIA labels
 * - Semantic color tokens (no hardcoded brand colors)
 * - Full input HTML attributes support
 * - ForwardRef support for form libraries
 * - Accessible with proper ARIA attributes
 *
 * Design Philosophy:
 * - Built on Input primitive using rightSlot
 * - No label or error logic (use Label and FieldError components)
 * - Localization-ready with customizable button labels
 * - Type is locked to "password" (cannot be overridden)
 *
 * @param props - PasswordInput configuration
 * @param ref - Forwarded ref to the input element
 * @returns The rendered password input element
 *
 * @example
 * // Basic usage
 * <PasswordInput placeholder="Enter password" />
 *
 * @example
 * // With custom labels (localization)
 * <PasswordInput
 *   showPasswordLabel="Mostrar contraseña"
 *   hidePasswordLabel="Ocultar contraseña"
 * />
 *
 * @example
 * // Complete form field
 * <div>
 *   <Label htmlFor="password" required>Password</Label>
 *   <PasswordInput id="password" />
 *   <FieldError id="password-error">Password is required</FieldError>
 * </div>
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      showPasswordLabel = "Show password",
      hidePasswordLabel = "Hide password",
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground transition-colors disabled:cursor-not-allowed"
            disabled={disabled}
            aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
