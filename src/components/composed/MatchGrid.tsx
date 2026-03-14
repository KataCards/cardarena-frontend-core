import { SwordsIcon, CheckCircleIcon, ClockIcon, MinusIcon } from "lucide-react";
import type { MatchGridProps, MatchPlayer } from "@/types/ui/match";

/**
 * Helper to get status-specific icons and styles.
 */
function getMatchMeta(status: 'pending' | 'completed' | 'draw') {
  switch (status) {
    case 'completed':
      return {
        Icon: CheckCircleIcon,
        iconClass: "text-green-600",
        cardClass: "border-green-300 bg-green-50/70",
      };
    case 'draw':
      return {
        Icon: MinusIcon,
        iconClass: "text-yellow-600",
        cardClass: "border-yellow-300 bg-yellow-50/70",
      };
    case 'pending':
    default:
      return {
        Icon: ClockIcon,
        iconClass: "text-gray-600",
        cardClass: "border-white/30 animate-pulse",
      };
  }
}

/**
 * Helper to get player-specific text styling.
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
 * MatchGrid component (Presenter)
 * A responsive grid of match pairings with status indicators.
 */
export function MatchGrid({ 
  matches, 
  emptyMessage = "Keine Paarungen verfügbar",
  emptySubtext = "Paarungen werden generiert, wenn eine Runde vorbereitet wird."
}: MatchGridProps) {
  
  if (matches.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <SwordsIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        <p className="text-xl font-bold text-gray-600">{emptyMessage}</p>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">{emptySubtext}</p>
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
                Tisch {match.tableNumber}
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
                <span className="text-xs font-medium text-gray-500 uppercase">Spieler 1</span>
                <span className={getPlayerClass(match.player1, match.status)}>
                  {match.player1.name}
                </span>
              </div>
              
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white/80 px-2 text-xs font-bold text-gray-400 italic">VS</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between group">
                <span className="text-xs font-medium text-gray-500 uppercase">Spieler 2</span>
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
