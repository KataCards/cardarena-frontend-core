import { Swords, CheckCircle, Clock, Minus } from "lucide-react";
import { MatchCard } from "@/components/composed/display/MatchCard";
import type { BracketMatch } from "@/types/ui/bracket";

/**
 * Represents a single player in a match (legacy interface support).
 */
export interface MatchPlayer {
  /** Display name for the player */
  name: string;
  /** True if the player won the match */
  isWinner?: boolean;
  /** True if the player lost the match */
  isLoser?: boolean;
}

/**
 * Represents a single match item (legacy interface support).
 */
export interface MatchItem {
  /** Unique identifier for the match */
  id: string;
  /** Table number where the match is being played */
  tableNumber: number;
  /** Current status of the match */
  status: 'pending' | 'completed' | 'draw';
  /** Readable text label for the status */
  statusLabel: string;
  /** First player in the match */
  player1: MatchPlayer;
  /** Second player in the match */
  player2: MatchPlayer;
}

export interface MatchGridProps {
  /** List of matches to display in the grid */
  matches: (MatchItem | BracketMatch)[];
  /** Optional message displayed when the grid is empty */
  emptyMessage?: string;
  /** Optional secondary empty message subtext */
  emptySubtext?: string;
  /** Display variant - default for active matches, compact for history/archives */
  variant?: "default" | "compact";
}

/**
 * MatchGrid
 * 
 * A responsive grid displaying match pairings using MatchCard primitives.
 * Supports a flexible grid layout with responsive column counts.
 */
export function MatchGrid({ 
  matches, 
  emptyMessage = "No matches available",
  emptySubtext = "Matches will be generated when a round is prepared.",
  variant = "default",
}: MatchGridProps) {
  
  if (matches.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
        <Swords className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        <p className="text-xl font-bold text-gray-600">{emptyMessage}</p>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">{emptySubtext}</p>
      </div>
    );
  }

  // Helper to normalize legacy MatchItem to BracketMatch if needed
  // This ensures we can use the MatchCard primitive consistently
  const normalizedMatches = matches.map(match => {
    if ('player1' in match && !('players' in match)) {
      // It's a legacy MatchItem
      const m = match as MatchItem;
      return {
        id: m.id,
        tableNumber: m.tableNumber,
        status: m.status,
        statusLabel: m.statusLabel,
        players: [
          { name: m.player1.name, isWinner: m.player1.isWinner },
          { name: m.player2.name, isWinner: m.player2.isWinner }
        ]
      } as BracketMatch;
    }
    return match as BracketMatch;
  });

  const gridClasses = variant === "compact" 
    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <div className={gridClasses}>
      {normalizedMatches.map((match) => (
        <MatchCard 
          key={match.id} 
          match={match} 
          variant={variant}
        />
      ))}
    </div>
  );
}