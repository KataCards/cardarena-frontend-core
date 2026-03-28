import * as React from "react";
import { Swords } from "lucide-react";
import { MatchCard } from "@/components/composed/display/MatchCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import type { BracketMatch } from "@/types/ui/bracket";

/**
 * Props for the BracketList component.
 */
export interface BracketListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** List of matches to display in the grid */
  matches: readonly BracketMatch[];
  /** Callback triggered when any match card is clicked */
  onMatchSelect?: (matchId: string) => void;
  /** Title displayed when the list is empty */
  emptyTitle?: string;
  /** Optional description displayed when the list is empty */
  emptyDescription?: string;
  /** Semantic heading level for the empty state title. @default "h2" */
  emptyTitleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * BracketList component (Presenter)
 *
 * A responsive grid display for tournament bracket matches.
 * Stateless and Server-Component friendly.
 */
export const BracketList = React.forwardRef<HTMLDivElement, BracketListProps>(
  (
    {
      matches,
      onMatchSelect,
      emptyTitle = "No matches available",
      emptyDescription = "Pairings will appear here when the bracket is ready.",
      emptyTitleAs = "h2",
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
          <EmptyState.Title as={emptyTitleAs}>{emptyTitle}</EmptyState.Title>
          <EmptyState.Description>{emptyDescription}</EmptyState.Description>
        </EmptyState.Root>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
          className
        )}
        {...props}
      >
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            onClick={onMatchSelect}
          />
        ))}
      </div>
    );
  }
);

BracketList.displayName = "BracketList";
