"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SliderSize = "sm" | "md" | "lg";

/**
 * Context for sharing slider state between compound components
 */
interface SliderContextValue {
  value: number;
  min: number;
  max: number;
  step: number;
  size: SliderSize;
  disabled: boolean;
  onChange: (value: number) => void;
}

const SliderContext = React.createContext<SliderContextValue | null>(null);

const useSliderContext = () => {
  const context = React.useContext(SliderContext);
  if (!context) {
    throw new Error("Slider compound components must be used within Slider.Root");
  }
  return context;
};

/**
 * Props for the Slider root component
 */
export interface SliderRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Current value */
  value: number;
  /** Minimum value. @default 0 */
  min?: number;
  /** Maximum value. @default 100 */
  max?: number;
  /** Step increment. @default 1 */
  step?: number;
  /** Callback on value change */
  onChange: (value: number) => void;
  /** Slider size. @default "md" */
  size?: SliderSize;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Optional accessible label — use when no visible label is present */
  "aria-label"?: string;
  /** ID of the element that labels this slider */
  "aria-labelledby"?: string;
}

/**
 * Props for the Slider track component
 */
export interface SliderTrackProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the Slider filled range component
 */
export interface SliderRangeProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the Slider thumb component (native input)
 */
export interface SliderThumbProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "onChange"> {}

/**
 * Props for the Slider value label component
 */
export interface SliderValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Custom formatter for the value. @default (value) => value.toString() */
  format?: (value: number) => string;
}

/**
 * Props for the Slider range labels component
 */
export interface SliderRangeLabelsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom formatter for min/max values. @default (value) => value.toString() */
  format?: (value: number) => string;
}

const sizeStyles: Record<SliderSize, { track: string; thumb: string; label: string }> = {
  sm: { track: "h-1", thumb: "h-3 w-3", label: "text-xs" },
  md: { track: "h-1.5", thumb: "h-4 w-4", label: "text-sm" },
  lg: { track: "h-2", thumb: "h-5 w-5", label: "text-base" },
};

/**
 * Slider Root Component
 *
 * Container for the slider compound component system.
 * Provides context for all child components.
 *
 * @example
 * <Slider.Root value={volume} onChange={setVolume}>
 *   <Slider.Value />
 *   <Slider.Track>
 *     <Slider.Range />
 *     <Slider.Thumb />
 *   </Slider.Track>
 *   <Slider.RangeLabels />
 * </Slider.Root>
 */
const SliderRoot = React.forwardRef<HTMLDivElement, SliderRootProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      size = "md",
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <SliderContext.Provider value={{ value, min, max, step, size, disabled, onChange }}>
        <div ref={ref} className={cn("flex flex-col gap-1.5 w-full", className)} {...props}>
          {children}
        </div>
      </SliderContext.Provider>
    );
  }
);
SliderRoot.displayName = "Slider.Root";

/**
 * Slider Track Component
 *
 * The track container that holds the range and thumb.
 * Renders the background track automatically.
 *
 * @example
 * <Slider.Track>
 *   <Slider.Range />
 *   <Slider.Thumb />
 * </Slider.Track>
 */
const SliderTrack = React.forwardRef<HTMLDivElement, SliderTrackProps>(
  ({ className, children, ...props }, ref) => {
    const { size, disabled } = useSliderContext();
    const sz = sizeStyles[size];

    return (
      <div ref={ref} className="relative flex items-center w-full" {...props}>
        {/* Background track */}
        <div
          className={cn(
            "absolute w-full rounded-full bg-muted",
            sz.track,
            disabled && "opacity-50"
          )}
          aria-hidden="true"
        />
        {children}
      </div>
    );
  }
);
SliderTrack.displayName = "Slider.Track";

/**
 * Slider Range Component
 *
 * The filled portion of the track representing the current value.
 * Uses semantic primary color by default.
 *
 * @example
 * <Slider.Range />
 *
 * @example
 * // Custom color
 * <Slider.Range className="bg-green-600" />
 */
const SliderRange = React.forwardRef<HTMLDivElement, SliderRangeProps>(
  ({ className, ...props }, ref) => {
    const { value, min, max, size, disabled } = useSliderContext();
    const percent = ((value - min) / (max - min)) * 100;
    const sz = sizeStyles[size];

    return (
      <div
        ref={ref}
        className={cn(
          "absolute rounded-full transition-all duration-100",
          sz.track,
          "bg-primary",
          disabled && "opacity-50",
          className
        )}
        style={{ width: `${percent}%` }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
SliderRange.displayName = "Slider.Range";

/**
 * Slider Thumb Component
 *
 * The draggable thumb (native range input).
 * Invisible but functional for accessibility.
 * Focus ring appears on the thumb itself via focus-within.
 *
 * @example
 * <Slider.Thumb />
 *
 * @example
 * // Custom thumb styling
 * <Slider.Thumb className="[&::-webkit-slider-thumb]:border-green-600" />
 */
const SliderThumb = React.forwardRef<HTMLInputElement, SliderThumbProps>(
  ({ className, ...props }, ref) => {
    const { value, min, max, step, size, disabled, onChange } = useSliderContext();
    const sz = sizeStyles[size];

    return (
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        onChange={(e) => onChange(e.target.valueAsNumber)}
        className={cn(
          // Make the native input overlay the track, keeping the thumb visible
          "relative w-full appearance-none bg-transparent cursor-pointer",
          // Thumb styling via Tailwind's arbitrary selector support
          "[&::-webkit-slider-thumb]:appearance-none",
          `[&::-webkit-slider-thumb]:${sz.thumb}`,
          "[&::-webkit-slider-thumb]:rounded-full",
          "[&::-webkit-slider-thumb]:bg-background",
          "[&::-webkit-slider-thumb]:border-2",
          "[&::-webkit-slider-thumb]:border-primary",
          "[&::-webkit-slider-thumb]:shadow-sm",
          "[&::-webkit-slider-thumb]:transition-colors",
          "[&::-webkit-slider-thumb]:hover:border-primary/80",
          "[&::-webkit-slider-thumb]:active:border-primary/60",
          // Firefox
          "[&::-moz-range-thumb]:appearance-none",
          `[&::-moz-range-thumb]:${sz.thumb}`,
          "[&::-moz-range-thumb]:rounded-full",
          "[&::-moz-range-thumb]:bg-background",
          "[&::-moz-range-thumb]:border-2",
          "[&::-moz-range-thumb]:border-primary",
          "[&::-moz-range-thumb]:shadow-sm",
          "[&::-moz-range-thumb]:transition-colors",
          "[&::-moz-range-thumb]:hover:border-primary/80",
          "[&::-moz-range-thumb]:active:border-primary/60",
          // Focus ring on thumb
          "focus:outline-none",
          "focus-visible:[&::-webkit-slider-thumb]:ring-2",
          "focus-visible:[&::-webkit-slider-thumb]:ring-ring",
          "focus-visible:[&::-webkit-slider-thumb]:ring-offset-2",
          "focus-visible:[&::-moz-range-thumb]:ring-2",
          "focus-visible:[&::-moz-range-thumb]:ring-ring",
          "focus-visible:[&::-moz-range-thumb]:ring-offset-2",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);
SliderThumb.displayName = "Slider.Thumb";

/**
 * Slider Value Component
 *
 * Displays the current value with tabular nums to prevent layout jitter.
 * Positioned at the end by default.
 *
 * @example
 * <Slider.Value />
 *
 * @example
 * // Custom formatter
 * <Slider.Value format={(v) => `${v}%`} />
 *
 * @example
 * // Custom positioning
 * <Slider.Value className="justify-start" />
 */
const SliderValue = React.forwardRef<HTMLSpanElement, SliderValueProps>(
  ({ format = (v) => v.toString(), className, ...props }, ref) => {
    const { value, size } = useSliderContext();
    const sz = sizeStyles[size];

    return (
      <div className={cn("flex justify-end", className)}>
        <span
          ref={ref}
          className={cn("font-semibold tabular-nums text-foreground", sz.label)}
          aria-hidden="true"
          {...props}
        >
          {format(value)}
        </span>
      </div>
    );
  }
);
SliderValue.displayName = "Slider.Value";

/**
 * Slider Range Labels Component
 *
 * Displays min and max values at the ends of the track.
 *
 * @example
 * <Slider.RangeLabels />
 *
 * @example
 * // Custom formatter
 * <Slider.RangeLabels format={(v) => `$${v}`} />
 */
const SliderRangeLabels = React.forwardRef<HTMLDivElement, SliderRangeLabelsProps>(
  ({ format = (v) => v.toString(), className, ...props }, ref) => {
    const { min, max, size } = useSliderContext();
    const sz = sizeStyles[size];

    return (
      <div ref={ref} className={cn("flex justify-between", className)} aria-hidden="true" {...props}>
        <span className={cn("text-muted-foreground font-medium", sz.label)}>
          {format(min)}
        </span>
        <span className={cn("text-muted-foreground font-medium", sz.label)}>
          {format(max)}
        </span>
      </div>
    );
  }
);
SliderRangeLabels.displayName = "Slider.RangeLabels";

/**
 * Slider Compound Component System
 *
 * A flexible, composable slider built on native <input type="range"> for accessibility.
 * Uses semantic color tokens and compound component pattern for maximum flexibility.
 *
 * Features:
 * - Native range input for accessibility (keyboard, screen reader, touch)
 * - Compound component pattern for flexible layouts
 * - Semantic color tokens (no hardcoded brand colors)
 * - Focus ring on thumb (not container)
 * - Tabular nums to prevent layout jitter
 * - Custom formatters for values
 * - Three size variants
 *
 * Design Philosophy:
 * - Composition over configuration
 * - Semantic tokens for theming
 * - Native HTML for accessibility
 * - Flexible label positioning
 *
 * @example
 * // Simple slider
 * <Slider.Root value={volume} onChange={setVolume}>
 *   <Slider.Track>
 *     <Slider.Range />
 *     <Slider.Thumb />
 *   </Slider.Track>
 * </Slider.Root>
 *
 * @example
 * // With value and range labels
 * <Slider.Root value={progress} onChange={setProgress} min={0} max={200}>
 *   <Slider.Value format={(v) => `${v}%`} />
 *   <Slider.Track>
 *     <Slider.Range />
 *     <Slider.Thumb />
 *   </Slider.Track>
 *   <Slider.RangeLabels />
 * </Slider.Root>
 *
 * @example
 * // Custom colors
 * <Slider.Root value={health} onChange={setHealth}>
 *   <Slider.Track>
 *     <Slider.Range className="bg-green-600" />
 *     <Slider.Thumb className="[&::-webkit-slider-thumb]:border-green-600" />
 *   </Slider.Track>
 * </Slider.Root>
 */
export const Slider = {
  Root: SliderRoot,
  Track: SliderTrack,
  Range: SliderRange,
  Thumb: SliderThumb,
  Value: SliderValue,
  RangeLabels: SliderRangeLabels,
};