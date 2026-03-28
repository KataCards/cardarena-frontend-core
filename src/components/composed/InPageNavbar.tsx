import * as React from "react";
import { cn } from "@/lib/utils";

export interface InPageNavbarItem {
  label: string;
  href: string;
}

export interface InPageNavbarProps extends React.HTMLAttributes<HTMLElement> {
  items: readonly InPageNavbarItem[];
  sticky?: boolean;
}

/**
 * InPageNavbar
 *
 * A compact sticky navigation bar for long single-page documents or showcase pages.
 * Uses anchor links so sections remain directly addressable without client state.
 */
export function InPageNavbar({
  items,
  sticky = true,
  className,
  ...props
}: InPageNavbarProps) {
  return (
    <nav
      aria-label="In-page navigation"
      className={cn(
        "rounded-2xl border border-border/70 bg-background/85 p-3 shadow-sm backdrop-blur",
        sticky && "sticky top-4 z-40",
        className
      )}
      {...props}
    >
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.href} className="flex">
            <a
              href={item.href}
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
