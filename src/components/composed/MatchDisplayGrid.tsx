import { MatchCard } from "@/components/ui/MatchCard";
import type { BracketMatch } from "@/types/ui/bracket";

/**
 * MatchDisplayGrid component (Presenter)
 * A read-only grid display for tournament matches.
 * Reuses the MatchCard primitive for consistent styling.
 */
export function MatchDisplayGrid({ matches }: { matches: BracketMatch[] }) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-gray-100">
        <p className="text-gray-400 font-medium">Keine Paarungen zum Anzeigen</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          // No onClick passed, makes the MatchCard read-only
        />
      ))}
    </div>
  );
}
