"use client";

import { useState, ReactNode } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
    /** Optional tagline below brand name */
    subtext?: string;
    /** Optional logo/icon component */
    logo?: React.ComponentType<{ className?: string }>;
    /** Optional custom logo element (overrides logo prop) */
    logoElement?: ReactNode;
    /** Brand link destination */
    href?: string;
  };
  /** List of navigation links */
  links: NavLink[];
  /** Optional primary action button */
  action?: {
    label: string;
    href: string;
    variant?: "solid" | "outline" | "ghost";
    colorScheme?: "red" | "dark" | "gray";
  };
  /** Background color variant */
  variant?: "white" | "transparent" | "dark";
  /** Whether navbar should stick to top */
  sticky?: boolean;
  /** Custom container max width */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
}

const variantStyles = {
  white: "bg-white border-b border-gray-200 shadow-sm",
  transparent: "bg-transparent",
  dark: "bg-slate-900 border-b border-slate-800",
};

const textColors = {
  white: { primary: "text-gray-900", secondary: "text-gray-700", hover: "hover:text-red-600" },
  transparent: { primary: "text-gray-900", secondary: "text-gray-700", hover: "hover:text-red-600" },
  dark: { primary: "text-white", secondary: "text-slate-300", hover: "hover:text-red-400" },
};

const maxWidths = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

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
 *     href: "/"
 *   }}
 *   links={[
 *     { label: "Home", href: "/", icon: Home },
 *     { label: "About", href: "/about", icon: Info },
 *     { label: "Contact", href: "/contact", icon: Mail }
 *   ]}
 *   action={{ label: "Get Started", href: "/signup", colorScheme: "red" }}
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
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const BrandLogo = brand.logo;
  const colors = textColors[variant];

  const brandContent = (
    <div className="flex items-center gap-3">
      {brand.logoElement ? (
        brand.logoElement
      ) : BrandLogo ? (
        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
          <BrandLogo className="w-6 h-6 text-white" />
        </div>
      ) : null}
      <div className="flex flex-col">
        <span className={`text-xl font-bold ${colors.primary} leading-none`}>
          {brand.name}
        </span>
        {brand.subtext && (
          <span className="text-xs font-medium text-red-600 uppercase tracking-wider">
            {brand.subtext}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <nav className={`${variantStyles[variant]} ${sticky ? "sticky top-0" : ""} z-50`}>
      <div className={`${maxWidths[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          {brand.href ? (
            <Link href={brand.href}>{brandContent}</Link>
          ) : (
            brandContent
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${colors.secondary} ${colors.hover} transition-colors flex items-center gap-1.5`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}
            {action && (
              <Button
                size="md"
                variant={action.variant || "solid"}
                colorScheme={action.colorScheme || "red"}
                href={action.href}
              >
                {action.label}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${colors.secondary} ${colors.hover} transition-colors p-2`}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={`md:hidden ${variant === "dark" ? "bg-slate-800" : "bg-white"} border-t ${variant === "dark" ? "border-slate-700" : "border-gray-200"}`}>
          <div className="px-4 py-6 space-y-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-lg font-medium ${colors.secondary} ${colors.hover} flex items-center gap-2`}
                  onClick={() => setIsOpen(false)}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {link.label}
                </Link>
              );
            })}
            {action && (
              <Button
                variant={action.variant || "solid"}
                colorScheme={action.colorScheme || "red"}
                fullWidth
                href={action.href}
              >
                {action.label}
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}