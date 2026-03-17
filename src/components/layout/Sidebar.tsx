"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export interface SidebarLink {
  /** Link label text */
  label: string;
  /** Link destination */
  href: string;
  /** Optional icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Whether this link is currently active */
  isActive?: boolean;
  /** Optional badge content (e.g., notification count) */
  badge?: string | number;
}

export interface SidebarProps {
  /** Brand identity */
  brand: {
    /** Brand name */
    name: string;
    /** Optional logo/icon component */
    logo?: React.ComponentType<{ className?: string }>;
    /** Optional custom logo element */
    logoElement?: ReactNode;
    /** Optional brand link destination */
    href?: string;
  };
  /** Array of navigation links */
  links: SidebarLink[];
  /** Optional user information */
  user?: {
    /** User display name */
    name: string;
    /** Optional user email or subtitle */
    subtitle?: string;
    /** Optional avatar URL or element */
    avatar?: string | ReactNode;
  };
  /** Optional logout handler */
  onLogout?: () => void;
  /** Whether logout is in progress */
  isLoggingOut?: boolean;
  /** Logout button text */
  logoutText?: string;
  /** Loading logout text */
  logoutLoadingText?: string;
  /** User section label */
  userLabel?: string;
  /** Sidebar width */
  width?: "sm" | "md" | "lg";
  /** Whether sidebar should be sticky */
  sticky?: boolean;
  /** Optional footer content */
  footer?: ReactNode;
}

const widths = {
  sm: "w-64",
  md: "w-72",
  lg: "w-80",
};

/**
 * Sidebar
 * 
 * A flexible navigation sidebar for application layouts.
 * Supports branding, navigation links, user info, and logout functionality.
 * 
 * @example
 * // Basic usage
 * import { Home, Settings, Users } from "lucide-react";
 * 
 * <Sidebar
 *   brand={{ name: "MyApp", logo: Trophy }}
 *   links={[
 *     { label: "Dashboard", href: "/dashboard", icon: Home, isActive: true },
 *     { label: "Users", href: "/users", icon: Users },
 *     { label: "Settings", href: "/settings", icon: Settings }
 *   ]}
 * />
 * 
 * @example
 * // With user and logout
 * <Sidebar
 *   brand={{ name: "CardArena", logo: Trophy, href: "/" }}
 *   links={navLinks}
 *   user={{
 *     name: "John Doe",
 *     subtitle: "john@example.com",
 *     avatar: "/avatar.jpg"
 *   }}
 *   onLogout={handleLogout}
 *   isLoggingOut={isLoading}
 *   logoutText="Sign Out"
 *   logoutLoadingText="Signing out..."
 * />
 * 
 * @example
 * // With badges and custom width
 * <Sidebar
 *   width="lg"
 *   brand={{ name: "Dashboard" }}
 *   links={[
 *     { label: "Messages", href: "/messages", icon: Mail, badge: 5 },
 *     { label: "Notifications", href: "/notifications", icon: Bell, badge: "New" }
 *   ]}
 *   footer={<div className="text-xs text-gray-500">v1.0.0</div>}
 * />
 */
export function Sidebar({
  brand,
  links,
  user,
  onLogout,
  isLoggingOut = false,
  logoutText = "Sign Out",
  logoutLoadingText = "Signing out...",
  userLabel = "Signed in as",
  width = "md",
  sticky = true,
  footer,
}: SidebarProps) {
  const BrandLogo = brand.logo;

  const brandContent = (
    <div className="flex items-center gap-3 group">
      {brand.logoElement ? (
        brand.logoElement
      ) : BrandLogo ? (
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200 group-hover:rotate-6 transition-transform">
          <BrandLogo className="w-6 h-6 text-white" />
        </div>
      ) : null}
      <span className="text-2xl font-black text-black tracking-tighter uppercase">
        {brand.name}
      </span>
    </div>
  );

  return (
    <aside
      className={`hidden md:flex md:flex-col ${widths[width]} bg-white border-r border-gray-100 shadow-sm h-screen ${sticky ? "sticky top-0" : ""} transition-all duration-300`}
    >
      {/* Brand Header */}
      <div className="p-8">
        {brand.href ? <Link href={brand.href}>{brandContent}</Link> : brandContent}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = link.isActive;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 group
                ${
                  isActive
                    ? "bg-red-50 text-red-600 shadow-sm"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              {Icon && (
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-red-600" : "text-gray-400 group-hover:text-gray-900"} transition-colors`}
                />
              )}
              <span className="text-sm tracking-tight flex-1">{link.label}</span>
              {link.badge && (
                <span className="px-2 py-0.5 text-xs font-bold bg-red-600 text-white rounded-full">
                  {link.badge}
                </span>
              )}
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout Section */}
      <div className="p-6 border-t border-gray-50">
        {user && (
          <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-gray-50/50 border border-gray-100/50">
            {typeof user.avatar === "string" ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
              />
            ) : user.avatar ? (
              user.avatar
            ) : (
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-gray-200 to-gray-300 border-2 border-white shadow-sm" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                {userLabel}
              </p>
              <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
              {user.subtitle && (
                <p className="text-xs text-gray-500 truncate">{user.subtitle}</p>
              )}
            </div>
          </div>
        )}

        {onLogout && (
          <button
            onClick={onLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-xl py-3.5 text-sm font-black uppercase tracking-widest hover:bg-red-600 hover:shadow-lg hover:shadow-red-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98]"
          >
            <LogOut className={`w-5 h-5 ${isLoggingOut ? "animate-pulse" : ""}`} />
            <span>{isLoggingOut ? logoutLoadingText : logoutText}</span>
          </button>
        )}

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </aside>
  );
}