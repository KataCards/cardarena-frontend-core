import Link from 'next/link';
import { MapPin, CalendarIcon, UsersIcon, Gamepad2Icon } from 'lucide-react';
import type { TournamentSummary } from '@/types/ui/dashboard';

/**
 * Helper to get state-specific visual styles.
 */
function getStateStyles(state: TournamentSummary['state']) {
  switch (state) {
    case 'running': return 'bg-green-100 text-green-800 border-green-200';
    case 'registration': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'planned': return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'finished': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

/**
 * TournamentCard component (UI Primitive)
 * A clean, stateless card for displaying tournament summaries.
 */
export function TournamentCard({ tournament }: { tournament: TournamentSummary }) {
  const stateClass = getStateStyles(tournament.state);

  return (
    <Link href={`/tournaments/${tournament.id}`} className="block h-full group">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group-active:scale-[0.98] min-w-[300px] h-full flex flex-col">
        <div className="flex justify-between items-start mb-4 gap-4">
          <h3 className="text-xl font-bold text-black tracking-tight leading-tight truncate">
            {tournament.name}
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border shrink-0 ${stateClass}`}>
            {tournament.stateLabel}
          </span>
        </div>
        
        <div className="space-y-3 flex-1">
          <div className="flex items-center text-gray-500 text-sm font-medium">
            <MapPin size={16} className="mr-2 text-gray-400 shrink-0" />
            <span className="truncate">{tournament.location}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm font-medium">
            <CalendarIcon size={16} className="mr-2 text-gray-400 shrink-0" />
            <span>{tournament.dateLabel}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm font-medium">
            <UsersIcon size={16} className="mr-2 text-gray-400 shrink-0" />
            <span>{tournament.currentPlayers}/{tournament.maxPlayers} Spieler</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm font-medium">
            <Gamepad2Icon size={16} className="mr-2 text-gray-400 shrink-0" />
            <span className="truncate">{tournament.gameName}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-end">
          <span className="text-xs font-black uppercase tracking-tighter text-red-600 group-hover:translate-x-1 transition-transform">
            Details ansehen →
          </span>
        </div>
      </div>
    </Link>
  );
}
