import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type TournamentCardHeading = "h2" | "h3" | "h4" | "h5" | "h6";

export interface TournamentCardMetaItem {
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>;
  /** Label text */
  label: string;
}

export interface TournamentCardProps {
  /** Tournament title */
  title: string;
  /** Optional status badge */
  badge?: {
    label: string;
    variant?: "success" | "info" | "warning" | "danger" | "neutral";
  };
  /** Array of metadata items (location, date, players, etc.) */
  metadata: TournamentCardMetaItem[];
  /** Optional link destination */
  href?: string;
  /** Optional click handler (if not using href) */
  onClick?: () => void;
  /** Call-to-action text */
  ctaText?: string;
  /** Optional footer content (overrides CTA) */
  footer?: React.ReactNode;
  /** Minimum card width */
  minWidth?: string;
  /** Additional CSS classes */
  className?: string;
  /** Semantic heading level for the title. @default "h3" */
  as?: TournamentCardHeading;
}

const badgeVariants = {
  success: "success",
  info: "info",
  warning: "warning",
  danger: "destructive",
  neutral: "outline",
} as const;

/**
 * TournamentCard
 *
 * A flexible card component for displaying event/tournament information with
 * metadata, status badges, and call-to-action links.
 */
export function TournamentCard({
  title,
  badge,
  metadata,
  href,
  onClick,
  ctaText = "View Details →",
  footer,
  minWidth = "300px",
  className,
  as = "h3",
}: TournamentCardProps) {
  const Heading = as;

  const cardContent = (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group-active:scale-[0.98]",
        className
      )}
      style={{ minWidth }}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <Heading className="truncate text-xl font-bold leading-tight tracking-tight text-card-foreground">
          {title}
        </Heading>
        {badge ? (
          <Badge
            variant={badgeVariants[badge.variant || "neutral"]}
            size="sm"
            className="shrink-0 text-[10px] font-black uppercase tracking-widest"
          >
            {badge.label}
          </Badge>
        ) : null}
      </div>

      <div className="flex-1 space-y-3">
        {metadata.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center text-sm font-medium text-muted-foreground">
              <Icon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-end border-t border-border/70 pt-4">
        {footer ? (
          footer
        ) : (
          <span className="text-xs font-black uppercase tracking-tighter text-primary transition-transform group-hover:translate-x-1">
            {ctaText}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group block h-full">
        {cardContent}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="group block h-full w-full text-left">
        {cardContent}
      </button>
    );
  }

  return <div className="h-full">{cardContent}</div>;
}
