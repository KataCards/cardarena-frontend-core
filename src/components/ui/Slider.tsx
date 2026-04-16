"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

type SliderSize = "sm" | "md" | "lg";
type SliderValue = number | number[];

interface SliderContextValue {
  values: number[];
  min: number;
  max: number;
  size: SliderSize;
  disabled: boolean;
}

const SliderContext = React.createContext<SliderContextValue | null>(null);

const useSliderContext = () => {
  const context = React.useContext(SliderContext);
  if (!context) {
    throw new Error("Slider compound components must be used within Slider.Root");
  }
  return context;
};

export interface SliderRootProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    "value" | "defaultValue" | "onValueChange" | "size" | "onChange"
  > {
  value?: SliderValue;
  defaultValue?: SliderValue;
  onChange?: (value: SliderValue) => void;
  size?: SliderSize;
}

export type SliderTrackProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>;
export type SliderRangeProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range>;
export type SliderThumbProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>;

export interface SliderValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  format?: (value: SliderValue) => string;
}

export interface SliderRangeLabelsProps extends React.HTMLAttributes<HTMLDivElement> {
  format?: (value: number) => string;
}

const sizeStyles: Record<SliderSize, { track: string; thumb: string; label: string }> = {
  sm: { track: "h-1", thumb: "h-3 w-3", label: "text-xs" },
  md: { track: "h-1.5", thumb: "h-4 w-4", label: "text-sm" },
  lg: { track: "h-2", thumb: "h-5 w-5", label: "text-base" },
};

const SliderRoot = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderRootProps
>(
  (
    {
      value,
      defaultValue,
      onChange,
      min = 0,
      max = 100,
      size = "md",
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isRange = Array.isArray(value) || Array.isArray(defaultValue);
    const normalize = (v: SliderValue | undefined) => {
      if (Array.isArray(v)) return v;
      if (typeof v === "number") return [v];
      return [min];
    };

    const values = normalize(value ?? defaultValue);

    return (
      <SliderContext.Provider value={{ values, min, max, size, disabled }}>
        <SliderPrimitive.Root
          ref={ref}
          min={min}
          max={max}
          disabled={disabled}
          value={value !== undefined ? normalize(value) : undefined}
          defaultValue={value === undefined ? normalize(defaultValue) : undefined}
          onValueChange={(next) => {
            if (!onChange) return;
            onChange(isRange ? next : next[0]);
          }}
          className={cn("relative flex w-full touch-none select-none items-center", className)}
          {...props}
        >
          {children}
        </SliderPrimitive.Root>
      </SliderContext.Provider>
    );
  }
);
SliderRoot.displayName = "Slider.Root";

const SliderTrack = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Track>,
  SliderTrackProps
>(({ className, ...props }, ref) => {
  const { size, disabled } = useSliderContext();
  const sz = sizeStyles[size];

  return (
    <SliderPrimitive.Track
      ref={ref}
      className={cn(
        "relative grow overflow-hidden rounded-full bg-muted",
        sz.track,
        disabled && "opacity-50",
        className
      )}
      {...props}
    />
  );
});
SliderTrack.displayName = "Slider.Track";

const SliderRange = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Range>,
  SliderRangeProps
>(({ className, ...props }, ref) => {
  const { disabled } = useSliderContext();
  return (
    <SliderPrimitive.Range
      ref={ref}
      className={cn("absolute h-full bg-primary", disabled && "opacity-50", className)}
      {...props}
    />
  );
});
SliderRange.displayName = "Slider.Range";

const SliderThumb = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Thumb>,
  SliderThumbProps
>(({ className, ...props }, ref) => {
  const { size, disabled } = useSliderContext();
  const sz = sizeStyles[size];

  return (
    <SliderPrimitive.Thumb
      ref={ref}
      className={cn(
        "block rounded-full border-2 border-primary bg-background shadow-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        disabled && "opacity-50",
        sz.thumb,
        className
      )}
      {...props}
    />
  );
});
SliderThumb.displayName = "Slider.Thumb";

const SliderValueLabel = React.forwardRef<HTMLSpanElement, SliderValueProps>(
  ({ format, className, ...props }, ref) => {
    const { values, size } = useSliderContext();
    const sz = sizeStyles[size];
    const value: SliderValue = values.length > 1 ? values : values[0];

    return (
      <div className={cn("flex justify-end", className)}>
        <span
          ref={ref}
          className={cn("font-semibold tabular-nums text-foreground", sz.label)}
          aria-hidden="true"
          {...props}
        >
          {format ? format(value) : Array.isArray(value) ? `${value[0]} - ${value[1]}` : value}
        </span>
      </div>
    );
  }
);
SliderValueLabel.displayName = "Slider.Value";

const SliderRangeLabels = React.forwardRef<HTMLDivElement, SliderRangeLabelsProps>(
  ({ format = (v) => v.toString(), className, ...props }, ref) => {
    const { min, max, size } = useSliderContext();
    const sz = sizeStyles[size];

    return (
      <div ref={ref} className={cn("flex justify-between", className)} aria-hidden="true" {...props}>
        <span className={cn("text-muted-foreground font-medium", sz.label)}>{format(min)}</span>
        <span className={cn("text-muted-foreground font-medium", sz.label)}>{format(max)}</span>
      </div>
    );
  }
);
SliderRangeLabels.displayName = "Slider.RangeLabels";

export const Slider = {
  Root: SliderRoot,
  Track: SliderTrack,
  Range: SliderRange,
  Thumb: SliderThumb,
  Value: SliderValueLabel,
  RangeLabels: SliderRangeLabels,
};
