import { MatchCard } from "@/components/ui/MatchCard";
import type { BracketMatch } from "@/types/ui/bracket";

/**
 * Props for the BracketList component.
 */
export interface BracketListProps {
  /** List of matches to display in the grid */
  matches: BracketMatch[];
  /** Callback triggered when any match card is clicked */
  onMatchSelect?: (matchId: string) => void;
}

/**
 * BracketList component (Presenter)
 * A responsive grid display for tournament bracket matches.
 * Stateless and Server-Component friendly.
 */
export function BracketList({ matches, onMatchSelect }: BracketListProps) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <p className="text-lg font-bold text-gray-500 uppercase tracking-widest">
          Keine Paarungen
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
