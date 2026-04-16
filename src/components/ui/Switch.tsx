"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "size"> {
  size?: SwitchSize;
}

const sizeStyles: Record<SwitchSize, { track: string; thumb: string; translate: string }> = {
  sm: { track: "h-5 w-9", thumb: "h-4 w-4", translate: "data-[state=checked]:translate-x-4" },
  md: { track: "h-6 w-11", thumb: "h-5 w-5", translate: "data-[state=checked]:translate-x-5" },
  lg: { track: "h-7 w-14", thumb: "h-6 w-6", translate: "data-[state=checked]:translate-x-7" },
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ size = "md", className, ...props }, ref) => {
    const sz = sizeStyles[size];

    return (
      <SwitchPrimitive.Root
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 rounded-full border border-transparent transition-colors",
          "bg-muted data-[state=checked]:bg-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          sz.track,
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-background shadow-sm transition-transform",
            "translate-x-0.5",
            sz.thumb,
            sz.translate
          )}
        />
      </SwitchPrimitive.Root>
    );
  }
);

Switch.displayName = "Switch";
