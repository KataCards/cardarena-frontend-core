import { Swords, CheckCircle, Clock, Minus } from "lucide-react";
import type { MatchGridProps, MatchPlayer } from "@/types/ui/match";

interface MatchGridExtendedProps extends MatchGridProps {
  /** Label prefix for match location (e.g., "Table", "Arena", "Court") */
  locationLabel?: string;
  /** Label for first player */
  player1Label?: string;
  /** Label for second player */
  player2Label?: string;
  /** Display variant - default for active matches, compact for history/archives */
  variant?: "default" | "compact";
}

/**
 * Helper to get status-specific icons and styles.
 */
function getMatchMeta(status: 'pending' | 'completed' | 'draw') {
  switch (status) {
    case 'completed':
      return {
        Icon: CheckCircle,
        iconClass: "text-green-600",
        cardClass: "border-green-300 bg-green-50/70",
      };
    case 'draw':
      return {
        Icon: Minus,
        iconClass: "text-yellow-600",
        cardClass: "border-yellow-300 bg-yellow-50/70",
      };
    case 'pending':
    default:
      return {
        Icon: Clock,
        iconClass: "text-gray-600",
        cardClass: "border-white/30 animate-pulse",
      };
  }
}

/**
 * Helper to get player-specific text styling for default variant.
 */
function getPlayerClass(player: MatchPlayer, status: string) {
  const base = "text-lg font-semibold transition-transform";
  if (status === 'pending') return `${base} text-black`;
  if (player.isWinner) return `${base} text-green-600 scale-105`;
  if (player.isLoser) return `${base} text-gray-400 line-through decoration-gray-300`;
  if (status === 'draw') return `${base} text-yellow-600`;
  return `${base} text-black`;
}

/**
 * Helper to get player-specific text styling for compact variant.
 */
function getCompactPlayerClass(player: MatchPlayer, status: string) {
  const base = "text-sm font-medium transition-colors";
  if (player.isWinner) return `${base} text-green-700 font-bold`;
  if (player.isLoser) return `${base} text-gray-400 line-through decoration-gray-200`;
  if (status === 'draw') return `${base} text-yellow-700`;
  return `${base} text-gray-700`;
}

/**
 * MatchGrid
 * 
 * A responsive grid displaying 1v1 match pairings with visual status indicators.
 * Supports pending, completed, and draw states with appropriate styling and animations.
 * 
 * Two variants available:
 * - **default**: Full-size cards with detailed player labels (3 columns max)
 * - **compact**: Dense history view optimized for scanning many results (5 columns max)
 * 
 * @example
 * // Active matches with full details
 * <MatchGrid matches={currentMatches} />
 * 
 * @example
 * // Compact history view
 * <MatchGrid 
 *   matches={pastMatches} 
 *   variant="compact"
 *   emptyMessage="No match history"
 * />
 * 
 * @example
 * // Custom location label for different sports
 * <MatchGrid 
 *   matches={matches} 
 *   locationLabel="Court"
 *   player1Label="Home"
 *   player2Label="Away"
 * />
 * 
 * @example
 * // With custom empty state
 * <MatchGrid 
 *   matches={[]} 
 *   emptyMessage="No matches scheduled"
 *   emptySubtext="Matches will appear when the round begins"
 * />
 */
export function MatchGrid({ 
  matches, 
  emptyMessage = "No matches available",
  emptySubtext = "Matches will be generated when a round is prepared.",
  locationLabel = "Table",
  player1Label = "Player 1",
  player2Label = "Player 2",
  variant = "default",
}: MatchGridExtendedProps) {
  
  if (matches.length === 0) {
    return variant === "compact" ? (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <p className="text-sm text-gray-500 font-medium">{emptyMessage}</p>
      </div>
    ) : (
      <div className="text-center py-12 px-4">
        <Swords className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        <p className="text-xl font-bold text-gray-600">{emptyMessage}</p>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">{emptySubtext}</p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {matches.map((match) => {
          const { Icon, iconClass, cardClass } = getMatchMeta(match.status);
          
          return (
            <div 
              key={match.id} 
              className={`rounded-lg p-3 border shadow-xs transition-all duration-200 hover:shadow-md ${cardClass}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">
                  {locationLabel} {match.tableNumber}
                </span>
                <Icon className={`h-4 w-4 ${iconClass}`} />
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-center justify-between">
                  <span className={getCompactPlayerClass(match.player1, match.status)}>
                    {match.player1.name}
                  </span>
                </div>
                <div className="h-px bg-gray-200/50 w-full" />
                <div className="flex items-center justify-between">
                  <span className={getCompactPlayerClass(match.player2, match.status)}>
                    {match.player2.name}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-center">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                  {match.statusLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {matches.map((match) => {
        const { Icon, iconClass, cardClass } = getMatchMeta(match.status);
        
        return (
          <div 
            key={match.id} 
            className={`bg-white/70 backdrop-blur-sm rounded-xl p-4 border text-black transition-all duration-300 shadow-sm ${cardClass}`}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100/50">
              <h3 className="text-xl font-bold text-black tracking-tight">
                {locationLabel} {match.tableNumber}
              </h3>
              <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/50 border border-white/20">
                <Icon className={`h-5 w-5 ${iconClass}`} />
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  {match.statusLabel}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between group">
                <span className="text-xs font-medium text-gray-500 uppercase">{player1Label}</span>
                <span className={getPlayerClass(match.player1, match.status)}>
                  {match.player1.name}
                </span>
              </div>
              
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white/80 px-2 text-xs font-bold text-gray-400 italic">VS</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between group">
                <span className="text-xs font-medium text-gray-500 uppercase">{player2Label}</span>
                <span className={getPlayerClass(match.player2, match.status)}>
                  {match.player2.name}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}