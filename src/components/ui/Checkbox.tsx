"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxSize = "sm" | "md" | "lg";
type CheckboxColorScheme = "red" | "dark" | "gray";

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "size"> {
  size?: CheckboxSize;
  colorScheme?: CheckboxColorScheme;
  indeterminate?: boolean;
}

const sizeStyles: Record<CheckboxSize, { box: string; icon: string }> = {
  sm: { box: "h-4 w-4", icon: "h-3 w-3" },
  md: { box: "h-5 w-5", icon: "h-3.5 w-3.5" },
  lg: { box: "h-6 w-6", icon: "h-4 w-4" },
};

const colorStyles: Record<CheckboxColorScheme, string> = {
  red: "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary",
  dark: "data-[state=checked]:bg-foreground data-[state=checked]:border-foreground data-[state=indeterminate]:bg-foreground data-[state=indeterminate]:border-foreground",
  gray: "data-[state=checked]:bg-muted-foreground data-[state=checked]:border-muted-foreground data-[state=indeterminate]:bg-muted-foreground data-[state=indeterminate]:border-muted-foreground",
};

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      size = "md",
      colorScheme = "red",
      indeterminate = false,
      checked,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sz = sizeStyles[size];
    const resolvedChecked = indeterminate ? "indeterminate" : checked;

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        checked={resolvedChecked}
        className={cn(
          "inline-flex items-center justify-center rounded-md border-2 border-input bg-background",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          sz.box,
          colorStyles[colorScheme],
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="text-white">
          {resolvedChecked === "indeterminate" ? (
            <Minus className={sz.icon} />
          ) : (
            <Check className={sz.icon} />
          )}
        </CheckboxPrimitive.Indicator>
        {children}
      </CheckboxPrimitive.Root>
    );
  }
);

Checkbox.displayName = "Checkbox";
