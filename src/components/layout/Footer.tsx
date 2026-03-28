import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FooterLink {
  /** Link label text */
  label: string;
  /** Link destination */
  href: string;
}

export interface FooterColumn {
  /** Column heading */
  title: string;
  /** Heading level for the column title. @default "h4" */
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
  /** Array of links in this column */
  links: FooterLink[];
}

export interface FooterProps {
  /** Brand identity information */
  brand: {
    /** Brand name */
    name: string;
    /** Brand description/tagline */
    description: string;
    /** Optional logo element (component or pre-rendered element) */
    logo?: ReactNode;
  };
  /** Array of footer columns with links (at least one column required) */
  columns: [FooterColumn, ...FooterColumn[]];
  /** Copyright text (year is automatically added) */
  copyright?: string;
  /** Optional social media links */
  social?: Array<{
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  /** Background color variant */
  variant?: "dark" | "light";
  /** Custom container max width */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full";
}

const VARIANT_STYLES = {
  dark: {
    bg: "bg-gray-900",
    text: "text-white",
    textMuted: "text-gray-400",
    border: "border-gray-800",
    hover: "hover:text-white",
  },
  light: {
    bg: "bg-gray-50",
    text: "text-gray-900",
    textMuted: "text-gray-600",
    border: "border-gray-200",
    hover: "hover:text-gray-900",
  },
} as const;

const MAX_WIDTHS = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
} as const;

const GRID_COLUMNS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

/**
 * Footer
 * 
 * A flexible, multi-column footer with branding, link sections, and optional social links.
 * Fully customizable with support for light and dark variants.
 * 
 * @example
 * // Basic usage with icon component
 * import { Trophy } from "lucide-react";
 * 
 * <Footer
 *   brand={{
 *     name: "MyApp",
 *     description: "The best app for your needs",
 *     logo: (
 *       <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
 *         <Trophy className="w-5 h-5 text-white" />
 *       </div>
 *     )
 *   }}
 *   columns={[
 *     {
 *       title: "Product",
 *       links: [
 *         { label: "Features", href: "/features" },
 *         { label: "Pricing", href: "/pricing" }
 *       ]
 *     },
 *     {
 *       title: "Company",
 *       links: [
 *         { label: "About", href: "/about" },
 *         { label: "Blog", href: "/blog" }
 *       ]
 *     }
 *   ]}
 *   copyright="MyApp. All rights reserved."
 * />
 * 
 * @example
 * // With social links and custom heading levels
 * import { Trophy, Github, Twitter, Linkedin } from "lucide-react";
 * 
 * <Footer
 *   brand={{
 *     name: "CardArena",
 *     description: "Professional tournament management",
 *     logo: (
 *       <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
 *         <Trophy className="w-5 h-5 text-white" />
 *       </div>
 *     )
 *   }}
 *   columns={[
 *     {
 *       title: "Product",
 *       as: "h3",
 *       links: [...]
 *     },
 *     {
 *       title: "Company",
 *       as: "h3",
 *       links: [...]
 *     }
 *   ]}
 *   social={[
 *     { label: "GitHub", href: "https://github.com", icon: Github },
 *     { label: "Twitter", href: "https://twitter.com", icon: Twitter },
 *     { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin }
 *   ]}
 *   copyright="CardArena"
 * />
 * 
 * @example
 * // Light variant
 * <Footer
 *   variant="light"
 *   maxWidth="full"
 *   brand={{ name: "MyBrand", description: "Tagline here" }}
 *   columns={columns}
 * />
 */
export function Footer({
  brand,
  columns,
  copyright,
  social,
  variant = "dark",
  maxWidth = "7xl",
}: FooterProps) {
  const styles = VARIANT_STYLES[variant];
  const currentYear = new Date().getFullYear();
  const columnCount = Math.min(columns.length + 1, 5);

  return (
    <footer className={cn(styles.bg, styles.text, "py-16")} aria-label="Site footer">
      <div className={cn(MAX_WIDTHS[maxWidth], "mx-auto px-4 sm:px-6 lg:px-8")}>
        <div className={cn("grid grid-cols-1 gap-8", GRID_COLUMNS[columnCount])}>
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {brand.logo}
              <span className="text-xl font-bold">{brand.name}</span>
            </div>
            <p className={cn(styles.textMuted, "mb-4")}>{brand.description}</p>
            
            {social && social.length > 0 && (
              <div className="flex gap-3">
                {social.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(styles.textMuted, styles.hover, "transition-colors")}
                      aria-label={item.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Link Columns */}
          {columns.map((column) => {
            const Heading = column.as || "h4";
            return (
              <div key={column.title}>
                <Heading className="font-semibold mb-4">{column.title}</Heading>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          styles.textMuted,
                          styles.hover,
                          "transition-colors text-sm"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Copyright */}
        <div className={cn("border-t mt-12 pt-8 text-center", styles.border, styles.textMuted)}>
          <p>
            &copy; {currentYear} {copyright || brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}