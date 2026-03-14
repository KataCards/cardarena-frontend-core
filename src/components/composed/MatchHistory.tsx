import { CheckCircleIcon, ClockIcon, MinusIcon } from "lucide-react";
import type { MatchItem, MatchPlayer } from "@/types/ui/match";

/**
 * Helper to get small status-specific icons and styles.
 */
function getHistoryMeta(status: 'pending' | 'completed' | 'draw') {
  switch (status) {
    case 'completed':
      return {
        Icon: CheckCircleIcon,
        iconClass: "text-green-500",
        cardClass: "border-green-100 bg-green-50/50",
      };
    case 'draw':
      return {
        Icon: MinusIcon,
        iconClass: "text-yellow-500",
        cardClass: "border-yellow-100 bg-yellow-50/50",
      };
    case 'pending':
    default:
      return {
        Icon: ClockIcon,
        iconClass: "text-gray-400",
        cardClass: "border-gray-100 bg-gray-50/50",
      };
  }
}

/**
 * Helper for player text in history view.
 */
function getHistoryPlayerClass(player: MatchPlayer, status: string) {
  const base = "text-sm font-medium transition-colors";
  if (player.isWinner) return `${base} text-green-700 font-bold`;
  if (player.isLoser) return `${base} text-gray-400 line-through decoration-gray-200`;
  if (status === 'draw') return `${base} text-yellow-700`;
  return `${base} text-gray-700`;
}

/**
 * MatchHistory component (Presenter)
 * A compact, dense grid for displaying historical match results.
 */
export function MatchHistory({ matches }: { matches: MatchItem[] }) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <p className="text-sm text-gray-500 font-medium">Keine historischen Paarungen verfügbar</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {matches.map((match) => {
        const { Icon, iconClass, cardClass } = getHistoryMeta(match.status);
        
        return (
          <div 
            key={match.id} 
            className={`rounded-lg p-3 border shadow-xs transition-all duration-200 hover:shadow-md ${cardClass}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">
                Tisch {match.tableNumber}
              </span>
              <Icon className={`h-4 w-4 ${iconClass}`} />
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="flex items-center justify-between">
                <span className={getHistoryPlayerClass(match.player1, match.status)}>
                  {match.player1.name}
                </span>
              </div>
              <div className="h-px bg-gray-200/50 w-full" />
              <div className="flex items-center justify-between">
                <span className={getHistoryPlayerClass(match.player2, match.status)}>
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
