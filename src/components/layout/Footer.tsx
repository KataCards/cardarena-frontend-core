import Link from "next/link";
import { ReactNode } from "react";

export interface FooterLink {
  /** Link label text */
  label: string;
  /** Link destination */
  href: string;
}

export interface FooterColumn {
  /** Column heading */
  title: string;
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
    /** Optional logo/icon component */
    logo?: React.ComponentType<{ className?: string }>;
    /** Optional custom logo element */
    logoElement?: ReactNode;
  };
  /** Array of footer columns with links */
  columns: FooterColumn[];
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

const variantStyles = {
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
 * Footer
 * 
 * A flexible, multi-column footer with branding, link sections, and optional social links.
 * Fully customizable with support for light and dark variants.
 * 
 * @example
 * // Basic usage
 * import { Trophy } from "lucide-react";
 * 
 * <Footer
 *   brand={{
 *     name: "MyApp",
 *     description: "The best app for your needs",
 *     logo: Trophy
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
 * // With social links
 * import { Trophy, Github, Twitter, Linkedin } from "lucide-react";
 * 
 * <Footer
 *   brand={{
 *     name: "CardArena",
 *     description: "Professional tournament management",
 *     logo: Trophy
 *   }}
 *   columns={footerColumns}
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
  const styles = variantStyles[variant];
  const BrandLogo = brand.logo;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${styles.bg} ${styles.text} py-16`}>
      <div className={`${maxWidths[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(columns.length + 1, 5)} gap-8`}>
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {brand.logoElement ? (
                brand.logoElement
              ) : BrandLogo ? (
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <BrandLogo className="w-5 h-5 text-white" />
                </div>
              ) : null}
              <span className="text-xl font-bold">{brand.name}</span>
            </div>
            <p className={`${styles.textMuted} mb-4`}>{brand.description}</p>
            
            {social && social.length > 0 && (
              <div className="flex gap-3">
                {social.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`${styles.textMuted} ${styles.hover} transition-colors`}
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
          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${styles.textMuted} ${styles.hover} transition-colors text-sm`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className={`border-t ${styles.border} mt-12 pt-8 text-center ${styles.textMuted}`}>
          <p>
            &copy; {currentYear} {copyright || brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}