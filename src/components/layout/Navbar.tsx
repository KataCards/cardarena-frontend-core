"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type NavbarVariant = "white" | "transparent" | "dark";
type NavbarBrandTag = "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface NavLink {
  /** Link label text */
  label: string;
  /** Link destination */
  href: string;
  /** Optional icon component */
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavbarProps {
  /** Brand identity information */
  brand: {
    /** Brand name text */
    name: string;
    /** Optional heading/element level for the brand label. @default "span" */
    as?: NavbarBrandTag;
    /** Optional tagline below brand name */
    subtext?: string;
    /** Optional logo/icon component */
    logo?: React.ComponentType<{ className?: string }>;
    /** Optional custom logo element (overrides logo prop) */
    logoElement?: React.ReactNode;
    /** Brand link destination */
    href?: string;
  };
  /** List of navigation links */
  links: NavLink[];
  /** Optional primary action button */
  action?: {
    label: string;
    href: string;
    variant?: React.ComponentProps<typeof Button>["variant"];
  };
  /** Background color variant */
  variant?: NavbarVariant;
  /** Whether navbar should stick to top */
  sticky?: boolean;
  /** Custom container max width */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
  /** Optional custom class name for the navbar root */
  className?: string;
}

const variantStyles: Record<NavbarVariant, string> = {
  white: "bg-background/95 border-b border-border shadow-sm supports-[backdrop-filter]:bg-background/80 backdrop-blur",
  transparent: "bg-transparent",
  dark: "bg-card/95 border-b border-border supports-[backdrop-filter]:bg-card/90 backdrop-blur",
};

const textStyles: Record<
  NavbarVariant,
  { primary: string; secondary: string; hover: string; mobileSurface: string }
> = {
  white: {
    primary: "text-foreground",
    secondary: "text-muted-foreground",
    hover: "hover:text-primary",
    mobileSurface: "bg-background border-border",
  },
  transparent: {
    primary: "text-foreground",
    secondary: "text-muted-foreground",
    hover: "hover:text-primary",
    mobileSurface: "bg-background border-border",
  },
  dark: {
    primary: "text-card-foreground",
    secondary: "text-muted-foreground",
    hover: "hover:text-primary",
    mobileSurface: "bg-card border-border",
  },
};

const maxWidths = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
} as const;

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/**
 * Navbar
 *
 * A flexible, responsive navigation bar with mobile menu support.
 * Supports custom branding, links, action buttons, and multiple visual variants.
 *
 * @example
 * // Basic usage
 * import { Trophy } from "lucide-react";
 *
 * <Navbar
 *   brand={{ name: "MyApp", logo: Trophy }}
 *   links={[
 *     { label: "Features", href: "/features" },
 *     { label: "Pricing", href: "/pricing" }
 *   ]}
 *   action={{ label: "Sign Up", href: "/signup" }}
 * />
 *
 * @example
 * // With icons and custom branding
 * import { Home, Info, Mail } from "lucide-react";
 *
 * <Navbar
 *   brand={{
 *     name: "CardArena",
 *     subtext: "Tournament Platform",
 *     logo: Trophy,
 *     href: "/",
 *     as: "h1"
 *   }}
 *   links={[
 *     { label: "Home", href: "/", icon: Home },
 *     { label: "About", href: "/about", icon: Info },
 *     { label: "Contact", href: "/contact", icon: Mail }
 *   ]}
 *   action={{ label: "Get Started", href: "/signup", variant: "default" }}
 * />
 *
 * @example
 * // Dark variant with custom logo
 * <Navbar
 *   variant="dark"
 *   sticky={false}
 *   maxWidth="full"
 *   brand={{
 *     name: "MyBrand",
 *     logoElement: <img src="/logo.svg" alt="Logo" className="h-8" />
 *   }}
 *   links={navLinks}
 * />
 */
export function Navbar({
  brand,
  links,
  action,
  variant = "white",
  sticky = true,
  maxWidth = "7xl",
  className,
}: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const BrandLogo = brand.logo;
  const BrandName = brand.as ?? "span";
  const styles = textStyles[variant];
  const mobileMenuId = React.useId();
  const mobileDialogRef = React.useRef<HTMLDivElement>(null);
  const mobileMenuLabel = `${brand.name} navigation menu`;

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const mobileDialog = mobileDialogRef.current;
    const focusableElements = mobileDialog?.querySelectorAll<HTMLElement>(focusableSelector) ?? [];
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    (firstFocusableElement ?? mobileDialog)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !mobileDialog) {
        return;
      }

      if (focusableElements.length === 0) {
        event.preventDefault();
        mobileDialog.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement?.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousActiveElement?.focus();
    };
  }, [isOpen]);

  const brandContent = (
    <div className="flex items-center gap-3">
      {brand.logoElement ? (
        brand.logoElement
      ) : BrandLogo ? (
        <BrandLogo className={cn("h-8 w-8 shrink-0", styles.primary)} aria-hidden="true" />
      ) : null}
      <div className="flex flex-col">
        <BrandName className={cn("text-xl font-bold leading-none", styles.primary)}>
          {brand.name}
        </BrandName>
        {brand.subtext ? (
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            {brand.subtext}
          </span>
        ) : null}
      </div>
    </div>
  );

  return (
    <nav
      aria-label="Primary"
      className={cn(
        variantStyles[variant],
        sticky && "sticky top-0",
        "z-50",
        className
      )}
    >
      <div className={cn(maxWidths[maxWidth], "mx-auto px-4 sm:px-6 lg:px-8")}>
        <div className="flex h-16 items-center justify-between">
          {brand.href ? (
            <Link href={brand.href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md">
              {brandContent}
            </Link>
          ) : (
            brandContent
          )}

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
                    styles.secondary,
                    styles.hover
                  )}
                >
                  {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
                  {link.label}
                </Link>
              );
            })}
            {action ? (
              <Button
                size="md"
                variant={action.variant ?? "default"}
                href={action.href}
              >
                {action.label}
              </Button>
            ) : null}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className={cn(
                "rounded-md p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                styles.secondary,
                styles.hover
              )}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls={mobileMenuId}
              aria-haspopup="dialog"
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="md:hidden">
          <div
            className="fixed inset-0 top-16 z-40 bg-black/40"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
          <div
            id={mobileMenuId}
            ref={mobileDialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={mobileMenuLabel}
            tabIndex={-1}
            className={cn(
              "fixed inset-x-0 top-16 z-50 border-t shadow-lg outline-none",
              styles.mobileSurface
            )}
          >
            <div className="space-y-4 px-4 py-6">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 rounded-sm text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      styles.secondary,
                      styles.hover
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
                    {link.label}
                  </Link>
                );
              })}
              {action ? (
                <Button
                  variant={action.variant ?? "default"}
                  fullWidth
                  href={action.href}
                  onClick={() => setIsOpen(false)}
                >
                  {action.label}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
