"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Whether the switch is checked */
  checked?: boolean;
  /** Visible label rendered next to the switch */
  label?: React.ReactNode;
  /** Supporting text rendered below the label */
  description?: string;
  /** Switch size. @default "md" */
  size?: SwitchSize;
  /** Additional CSS classes for the root wrapper */
  className?: string;
}

const sizeStyles: Record<
  SwitchSize,
  { track: string; thumb: string; translate: string; label: string; description: string }
> = {
  sm: {
    track: "h-5 w-9",
    thumb: "h-4 w-4",
    translate: "peer-checked:translate-x-4",
    label: "text-sm",
    description: "text-xs",
  },
  md: {
    track: "h-6 w-11",
    thumb: "h-5 w-5",
    translate: "peer-checked:translate-x-5",
    label: "text-sm",
    description: "text-xs",
  },
  lg: {
    track: "h-7 w-14",
    thumb: "h-6 w-6",
    translate: "peer-checked:translate-x-7",
    label: "text-base",
    description: "text-sm",
  },
};

/**
 * Switch
 *
 * A binary on/off control for settings-style interfaces.
 * Uses a native checkbox for accessibility and form support, with switch semantics.
 *
 * Always pair with a visible label or aria-label for accessibility.
 *
 * @example
 * const [enabled, setEnabled] = useState(false);
 * <Switch
 *   checked={enabled}
 *   onChange={(e) => setEnabled(e.target.checked)}
 *   label="Enable notifications"
 * />
 *
 * @example
 * <Switch
 *   defaultChecked
 *   size="lg"
 *   label="Dark mode"
 *   description="Use the darker appearance throughout the app."
 * />
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked,
      label,
      description,
      size = "md",
      disabled = false,
      className,
      id: providedId,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = providedId ?? generatedId;
    const descriptionId = description ? `${id}-description` : undefined;
    const sz = sizeStyles[size];

    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex items-start gap-3",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <div className="relative mt-0.5 shrink-0">
          <input
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            checked={checked}
            disabled={disabled}
            aria-label={!label ? ariaLabel : undefined}
            aria-describedby={descriptionId ?? ariaDescribedBy}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "rounded-full border border-transparent bg-muted transition-colors duration-200",
              "peer-checked:bg-primary",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
              "peer-disabled:cursor-not-allowed",
              sz.track
            )}
            aria-hidden="true"
          >
            <div
              className={cn(
                "absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full bg-background shadow-sm transition-transform duration-200",
                sz.thumb,
                sz.translate
              )}
            />
          </div>
        </div>

        {(label || description) ? (
          <div className="flex flex-col gap-0.5">
            {label ? (
              <span className={cn("font-medium leading-snug text-foreground", sz.label)}>
                {label}
              </span>
            ) : null}
            {description ? (
              <span
                id={descriptionId}
                className={cn("leading-snug text-muted-foreground", sz.description)}
              >
                {description}
              </span>
            ) : null}
          </div>
        ) : null}
      </label>
    );
  }
);

Switch.displayName = "Switch";
