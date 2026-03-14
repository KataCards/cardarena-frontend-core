import type { MatchCardProps } from "@/types/ui/bracket";

/**
 * MatchCard component (UI Primitive)
 * A clean, stateless card representing a single tournament match.
 */
export function MatchCard({ match, onClick, className = "" }: MatchCardProps) {
  const isComplete = match.status === 'completed';

  return (
    <div
      className={`bg-white/80 backdrop-blur-sm p-5 rounded-xl border transition-all duration-300 shadow-sm
        ${isComplete ? 'border-green-100 bg-green-50/50' : 'border-gray-200 hover:border-red-400/50 hover:bg-white'}
        ${onClick ? 'cursor-pointer hover:shadow-md active:scale-[0.98]' : ''}
        ${className}`}
      onClick={() => onClick?.(match.id)}
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          Tisch {match.tableNumber}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border
          ${isComplete ? 'bg-green-100 border-green-200 text-green-700' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
          {isComplete ? 'Abgeschlossen' : 'Offen'}
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-tighter">Runde {match.round}</h4>
        <div className="flex flex-col gap-1">
          {match.players.map((player, idx) => (
            <p key={idx} className={`text-lg font-bold tracking-tight ${match.winner === player ? 'text-green-600' : 'text-black'}`}>
              {player}
              {match.winner === player && <span className="ml-2">🏆</span>}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100/50">
        <p className={`text-xs font-bold uppercase tracking-widest ${isComplete ? 'text-green-600' : 'text-gray-400'}`}>
          Gewinner: {match.winner ?? "Ausstehend"}
        </p>
      </div>
    </div>
  );
}
