"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const sizeStyles = {
  sm: "h-11 w-11",
  md: "h-12 w-12",
  lg: "h-14 w-14",
} as const;

const iconStyles = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-5 w-5",
} as const;

export interface ThemeToggleProps extends Omit<React.ComponentProps<typeof Button>, "children" | "onClick"> {
  size?: keyof typeof sizeStyles;
}

export const ThemeToggle = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ThemeToggleProps>(
  (
    {
      size = "lg",
      variant = "outline",
      className,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = React.useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    React.useEffect(() => {
      setMounted(true);
    }, []);

    function handleToggle() {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    if (!mounted) {
      return (
        <Button
          ref={ref}
          type="button"
          variant={variant}
          size="sm"
          className={cn(
            sizeStyles[size],
            "rounded-full border-border bg-background/90 p-0 shadow-lg backdrop-blur",
            className
          )}
          aria-label="Toggle color mode"
          {...props}
        >
          <Sun className={iconStyles[size]} aria-hidden="true" />
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        type="button"
        variant={variant}
        size="sm"
        onClick={handleToggle}
        className={cn(
          sizeStyles[size],
          "rounded-full border-border bg-background/90 p-0 shadow-lg backdrop-blur",
          className
        )}
        aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        {...props}
      >
        {resolvedTheme === "dark" ? (
          <Sun className={iconStyles[size]} aria-hidden="true" />
        ) : (
          <Moon className={iconStyles[size]} aria-hidden="true" />
        )}
      </Button>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle";
