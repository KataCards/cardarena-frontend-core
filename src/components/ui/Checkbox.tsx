"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CheckboxSize = "sm" | "md" | "lg";
type CheckboxColorScheme = "red" | "dark" | "gray";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Whether the checkbox is in an indeterminate state */
  indeterminate?: boolean;
  /** Visible label rendered next to the checkbox */
  label?: React.ReactNode;
  /** Supporting text rendered below the label */
  description?: string;
  /** Checkbox size. @default "md" */
  size?: CheckboxSize;
  /** Color scheme for the checked state. @default "red" */
  colorScheme?: CheckboxColorScheme;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the root wrapper */
  className?: string;
}

const sizeStyles: Record<CheckboxSize, { box: string; icon: string; label: string; description: string }> = {
  sm: { box: "h-3.5 w-3.5 rounded", icon: "h-2 w-2", label: "text-sm", description: "text-xs" },
  md: { box: "h-4.5 w-4.5 rounded-md", icon: "h-2.5 w-2.5", label: "text-sm", description: "text-xs" },
  lg: { box: "h-5.5 w-5.5 rounded-md", icon: "h-3 w-3", label: "text-base", description: "text-sm" },
};

const colorStyles: Record<CheckboxColorScheme, { checked: string; focus: string }> = {
  red: { checked: "bg-red-600 border-red-600", focus: "focus-visible:ring-red-500" },
  dark: { checked: "bg-gray-900 border-gray-900", focus: "focus-visible:ring-gray-700" },
  gray: { checked: "bg-gray-500 border-gray-500", focus: "focus-visible:ring-gray-400" },
};

/** Checkmark SVG */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 8"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="1 4 3.5 6.5 9 1" />
    </svg>
  );
}

/** Indeterminate dash SVG */
function IndeterminateIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 2"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="1" y1="1" x2="9" y2="1" />
    </svg>
  );
}

/**
 * Checkbox
 *
 * An accessible checkbox with optional label and description.
 * Supports checked, unchecked, and indeterminate states.
 * Supports 3 sizes, 3 color schemes, and disabled state.
 *
 * Always pair with a visible label or aria-label for accessibility.
 *
 * @example
 * const [agreed, setAgreed] = useState(false);
 * <Checkbox
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.target.checked)}
 *   label="I agree to the terms"
 * />
 *
 * @example
 * <Checkbox
 *   checked={allSelected}
 *   indeterminate={someSelected}
 *   onChange={handleSelectAll}
 *   label="Select all"
 *   size="lg"
 *   colorScheme="dark"
 * />
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      indeterminate = false,
      label,
      description,
      size = "md",
      colorScheme = "red",
      disabled = false,
      className,
      id: providedId,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;
    const generatedId = React.useId();
    const id = providedId ?? generatedId;
    const descriptionId = description ? `${id}-description` : undefined;

    // Sync indeterminate state — this can only be set via JS, not HTML
    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    const sz = sizeStyles[size];
    const color = colorStyles[colorScheme];
    const isActive = checked || indeterminate;

    return (
      <div className={cn("flex items-start gap-2.5", className)}>
        {/* Hidden native input — drives all accessibility */}
        <div className="relative shrink-0 flex items-center justify-center mt-0.5">
          <input
            ref={resolvedRef}
            id={id}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            aria-label={!label ? ariaLabel : undefined}
            aria-describedby={descriptionId ?? ariaDescribedBy}
            aria-checked={indeterminate ? "mixed" : checked}
            className={cn(
              "absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10",
              disabled && "cursor-not-allowed"
            )}
            {...props}
          />
          {/* Visual box */}
          <div
            className={cn(
              "flex items-center justify-center border-2 transition-all duration-150",
              sz.box,
              isActive
                ? color.checked
                : "border-gray-300 bg-white hover:border-gray-400",
              disabled && "opacity-50",
              // Focus ring follows the native input focus, proxied via peer
              "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
              color.focus
            )}
            aria-hidden="true"
          >
            {indeterminate ? (
              <IndeterminateIcon className={cn("text-white", sz.icon)} />
            ) : checked ? (
              <CheckIcon className={cn("text-white", sz.icon)} />
            ) : null}
          </div>
        </div>

        {/* Label + description */}
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  "font-medium text-gray-900 leading-snug select-none",
                  sz.label,
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={descriptionId}
                className={cn("text-gray-500 leading-snug", sz.description)}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
