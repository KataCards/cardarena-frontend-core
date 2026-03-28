"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";
const themeStorageKey = "theme";

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

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.dataset.theme = theme;
}

function getResolvedTheme(): Theme {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
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
    const [theme, setTheme] = React.useState<Theme>("light");

    React.useEffect(() => {
      const resolvedTheme = getResolvedTheme();
      setTheme(resolvedTheme);
      setMounted(true);
    }, []);

    function handleToggle() {
      const nextTheme: Theme = theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      localStorage.setItem(themeStorageKey, nextTheme);
      setTheme(nextTheme);
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
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        {...props}
      >
        {theme === "dark" ? (
          <Sun className={iconStyles[size]} aria-hidden="true" />
        ) : (
          <Moon className={iconStyles[size]} aria-hidden="true" />
        )}
      </Button>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle";
