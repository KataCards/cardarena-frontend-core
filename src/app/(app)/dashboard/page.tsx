import { fetchTournaments } from '@/lib/apiClient';
import { Tournament, TournamentState } from '@/types/tournament';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Sidebar } from '@/components/layout/Sidebar';
import { QuickActionsGrid } from '@/components/composed/QuickActionsGrid';
import { TournamentSection } from '@/components/composed/TournamentSection';
import type { TournamentSummary, QuickActionItem } from '@/types/ui/dashboard';

/**
 * Dashboard Page (Container)
 * Orchestrates the application dashboard.
 * Fetches data on the server and passes it to stateless presenters.
 */
export default async function DashboardPage() {
  // 1. Data Fetching (Server-Side)
  let tournamentsRaw: Tournament[] = [];
  try {
    tournamentsRaw = await fetchTournaments();
  } catch (error) {
    console.error("Dashboard data fetch failed", error);
  }

  // 2. Data Transformation (Mapping to UI Types)
  const tournaments: TournamentSummary[] = tournamentsRaw.map((t) => ({
    id: t.id,
    name: t.name,
    state: t.state.toLowerCase() as TournamentSummary['state'],
    stateLabel: mapStateToLabel(t.state),
    location: t.location,
    dateLabel: format(new Date(t.date), 'dd.MM.yyyy', { locale: de }),
    currentPlayers: t.current_players || 0,
    maxPlayers: t.max_players,
    gameName: t.cardgame?.name || 'Unbekannt',
  }));

  const running = tournaments.filter(t => t.state === 'running');
  const upcoming = tournaments.filter(t => ['planned', 'registration'].includes(t.state));

  // 3. Static Configuration
  const quickActions: QuickActionItem[] = [
    { title: 'Neues Turnier', href: '/tournaments/new', iconName: 'plus', colorClass: 'bg-green-600 hover:bg-green-700' },
    { title: 'Alle Turniere', href: '/tournaments', iconName: 'trophy', colorClass: 'bg-blue-600 hover:bg-blue-700' },
    { title: 'Neuer Spieler', href: '/player/new', iconName: 'user-plus', colorClass: 'bg-purple-600 hover:bg-purple-700' },
    { title: 'Alle Spieler', href: '/player', iconName: 'users', colorClass: 'bg-indigo-600 hover:bg-indigo-700' },
    { title: 'Einstellungen', href: '/settings', iconName: 'settings', colorClass: 'bg-gray-600 hover:bg-gray-700' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-hidden flex flex-col gap-8">
        {/* Header Section */}
        <header className="flex-shrink-0 flex flex-col gap-6">
          <h1 className="text-4xl font-black text-black tracking-tight">
            Willkommen zurück!
          </h1>
          <QuickActionsGrid actions={quickActions} />
        </header>

        {/* Dynamic Sections */}
        <div className="flex-1 flex flex-col gap-6 min-h-0">
          <div className="flex-1 min-h-0">
            <TournamentSection 
              title="Laufende Turniere"
              tournaments={running}
              emptyMessage="Aktuell finden keine Turniere statt."
              variant="gradient"
            />
          </div>
          
          <div className="flex-1 min-h-0">
            <TournamentSection 
              title="Aufkommende Turniere"
              tournaments={upcoming}
              emptyMessage="Keine geplanten Turniere in Sicht."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 * Helper to map API states to human labels.
 */
function mapStateToLabel(state: TournamentState): string {
  const map: Record<string, string> = {
    [TournamentState.PLANNED]: 'Geplant',
    [TournamentState.REGISTRATION]: 'Anmeldung',
    [TournamentState.RUNNING]: 'Läuft',
    [TournamentState.FINISHED]: 'Beendet',
    [TournamentState.CANCELLED]: 'Abgebrochen',
  };
  return map[state] || 'Unbekannt';
}
