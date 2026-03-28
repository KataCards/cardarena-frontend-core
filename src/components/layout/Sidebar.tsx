"use client";

import * as React from "react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type SidebarBrandTag = "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

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
    /** Optional heading/element level for the brand label. @default "span" */
    as?: SidebarBrandTag;
    /** Optional logo element */
    logo?: React.ReactNode;
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
    avatar?: string | React.ReactNode;
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
  footer?: React.ReactNode;
  /** Accessible label for the aside landmark */
  asideLabel?: string;
  /** Accessible label for the navigation landmark */
  navLabel?: string;
}

const widths = {
  sm: "w-64",
  md: "w-72",
  lg: "w-80",
} as const;

/**
 * Sidebar
 *
 * A flexible navigation sidebar for application layouts.
 * Supports branding, navigation links, user info, and logout functionality.
 * Uses semantic color tokens for full theme compatibility.
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
  asideLabel,
  navLabel,
}: SidebarProps) {
  const BrandName = brand.as ?? "span";
  const resolvedAsideLabel = asideLabel ?? `${brand.name} sidebar`;
  const resolvedNavLabel = navLabel ?? `${brand.name} navigation`;

  const brandContent = (
    <div className="group flex items-center gap-3">
      {brand.logo ? brand.logo : null}
      <BrandName className="text-2xl font-black uppercase tracking-tighter text-foreground">
        {brand.name}
      </BrandName>
    </div>
  );

  return (
    <aside
      aria-label={resolvedAsideLabel}
      className={cn(
        "hidden h-screen bg-background shadow-sm transition-all duration-300 md:flex md:flex-col",
        widths[width],
        sticky && "sticky top-0",
        "border-r border-border"
      )}
    >
      <div className="p-8">
        {brand.href ? (
          <Link
            href={brand.href}
            className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {brandContent}
          </Link>
        ) : (
          brandContent
        )}
      </div>

      <nav aria-label={resolvedNavLabel} className="flex-1 space-y-2 overflow-y-auto px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = link.isActive;
          const hasBadge = link.badge !== undefined && link.badge !== null;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {Icon ? (
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
                  )}
                  aria-hidden="true"
                />
              ) : null}
              <span className="flex-1 text-sm tracking-tight">{link.label}</span>
              {hasBadge ? (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  {link.badge}
                </span>
              ) : null}
              {isActive ? (
                <div
                  className="h-1.5 w-1.5 rounded-full bg-primary shadow-primary-glow"
                  aria-hidden="true"
                />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-6">
        {user ? (
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
            {typeof user.avatar === "string" ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full border-2 border-background object-cover shadow-sm"
              />
            ) : user.avatar ? (
              user.avatar
            ) : (
              <div
                className="h-8 w-8 rounded-full border-2 border-background bg-linear-to-br from-muted to-muted-foreground/20 shadow-sm"
                aria-hidden="true"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                {userLabel}
              </p>
              <p className="truncate text-sm font-bold text-foreground">{user.name}</p>
              {user.subtitle ? (
                <p className="truncate text-xs text-muted-foreground">{user.subtitle}</p>
              ) : null}
            </div>
          </div>
        ) : null}

        {onLogout ? (
          <Button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            fullWidth
            variant="default"
            icon={LogOut}
            className="rounded-xl py-3.5 text-sm font-black uppercase tracking-widest transition-all duration-300 active:scale-[0.98]"
          >
            {isLoggingOut ? logoutLoadingText : logoutText}
          </Button>
        ) : null}

        {footer ? <div className="mt-4">{footer}</div> : null}
      </div>
    </aside>
  );
}