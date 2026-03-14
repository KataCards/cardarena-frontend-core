import { Sidebar } from '@/components/layout/Sidebar';
import { QuickActionsGrid } from '@/components/composed/QuickActionsGrid';
import { TournamentSection } from '@/components/composed/TournamentSection';
import { 
  sidebarLinks, 
  quickActions, 
  mockTournaments 
} from "@/_data/mock";

/**
 * Dashboard Example Page (Container)
 * Showcases the dashboard layout using static mock data.
 * This is a Server Component.
 */
export default async function DashboardPage() {
  const running = mockTournaments.filter(t => t.state === 'running');
  const upcoming = mockTournaments.filter(t => ['planned', 'registration'].includes(t.state));

  return (
    <div className="flex h-screen bg-gray-50/50">
      <Sidebar 
        brandName="CardArena" 
        links={sidebarLinks.map(l => ({ ...l, isActive: l.href === '/dashboard' }))}
        user={{ username: "Example User" }}
      />
      
      <main className="flex-1 p-8 overflow-hidden flex flex-col gap-8">
        {/* Header Section */}
        <header className="flex-shrink-0 flex flex-col gap-6">
          <h1 className="text-4xl font-black text-black tracking-tight">
            Dashboard <span className="text-red-600">Overview</span>
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
