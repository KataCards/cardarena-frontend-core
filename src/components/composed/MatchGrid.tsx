import * as React from "react";
import { Swords } from "lucide-react";
import { MatchCard } from "@/components/composed/display/MatchCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import type { BracketMatch } from "@/types/ui/bracket";
import type { MatchItem } from "@/types/ui/match";

export interface MatchGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** List of matches to display in the grid */
  matches: readonly (MatchItem | BracketMatch)[];
  /** Optional message displayed when the grid is empty */
  emptyMessage?: string;
  /** Optional secondary empty message subtext */
  emptySubtext?: string;
  /** Display variant - default for active matches, compact for history/archives */
  variant?: "default" | "compact";
  /** Semantic heading level for the empty state title. @default "h3" */
  emptyTitleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const gridClasses = {
  compact: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  default: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
} as const;

function isLegacyMatch(match: MatchItem | BracketMatch): match is MatchItem {
  return "player1" in match && "player2" in match;
}

function normalizeMatch(match: MatchItem | BracketMatch): BracketMatch {
  if (isLegacyMatch(match)) {
    const players = [match.player1, match.player2];
    const winner = players.find((player) => player.isWinner)?.name;

    return {
      id: match.id,
      tableNumber: match.tableNumber,
      round: match.round,
      status: match.status,
      statusLabel: match.statusLabel,
      players,
      winner,
    };
  }

  return match;
}

/**
 * MatchGrid
 *
 * A responsive grid displaying match pairings using MatchCard primitives.
 * Supports legacy MatchItem data by normalizing it to BracketMatch at render time.
 */
export const MatchGrid = React.forwardRef<HTMLDivElement, MatchGridProps>(
  (
    {
      matches,
      emptyMessage = "No matches available",
      emptySubtext = "Matches will be generated when a round is prepared.",
      variant = "default",
      emptyTitleAs = "h3",
      className,
      ...props
    },
    ref
  ) => {
    if (matches.length === 0) {
      return (
        <EmptyState.Root
          ref={ref}
          className={cn(
            "rounded-2xl border border-dashed border-border bg-muted/20",
            className
          )}
          {...props}
        >
          <EmptyState.Icon icon={Swords} />
          <EmptyState.Title as={emptyTitleAs}>{emptyMessage}</EmptyState.Title>
          <EmptyState.Description>{emptySubtext}</EmptyState.Description>
        </EmptyState.Root>
      );
    }

    const normalizedMatches = matches.map(normalizeMatch);

    return (
      <div
        ref={ref}
        role="list"
        className={cn(gridClasses[variant], className)}
        {...props}
      >
        {normalizedMatches.map((match) => (
          <div key={match.id} role="listitem">
            <MatchCard
              match={match}
              variant={variant}
            />
          </div>
        ))}
      </div>
    );
  }
);

MatchGrid.displayName = "MatchGrid";
