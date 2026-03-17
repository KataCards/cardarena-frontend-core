import { MatchCard } from "@/components/ui/MatchCard";
import type { BracketMatch } from "@/types/ui/bracket";

interface MatchDisplayGridProps {
  /** Array of matches to display in the grid */
  matches: BracketMatch[];
  /** Optional message to display when no matches are available */
  emptyMessage?: string;
}

/**
 * MatchDisplayGrid
 * 
 * A responsive, read-only grid display for tournament matches.
 * Uses MatchCard primitives for consistent styling across the application.
 * 
 * @example
 * // Basic usage
 * <MatchDisplayGrid matches={tournamentMatches} />
 * 
 * @example
 * // With custom empty state message
 * <MatchDisplayGrid 
 *   matches={[]} 
 *   emptyMessage="No matches scheduled yet"
 * />
 */
export function MatchDisplayGrid({ 
  matches, 
  emptyMessage = "No matches to display" 
}: MatchDisplayGridProps) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-gray-100">
        <p className="text-gray-400 font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}