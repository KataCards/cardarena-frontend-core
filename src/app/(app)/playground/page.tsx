import { Sidebar } from "@/components/layout/Sidebar";
import { RoundBanner } from "@/components/composed/RoundBanner";
import { Scoreboard } from "@/components/composed/Scoreboard";
import { MatchGrid } from "@/components/composed/MatchGrid";
import { MatchHistory } from "@/components/composed/MatchHistory";
import { Timer } from "@/components/ui/Timer";
import type { SidebarLinkItem } from "@/types/ui/sidebar";
import type { ScoreboardItem } from "@/types/ui/scoreboard";
import type { MatchItem } from "@/types/ui/match";

/**
 * Visual wrapper for components in the playground.
 */
function PlaygroundSection({ name, description, children }: { name: string; description: string; children: React.ReactNode }) {
  return (
    <section className="border-2 border-dashed border-gray-200 rounded-3xl p-8 relative bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-red-200 hover:bg-white shadow-xs hover:shadow-md">
      <div className="absolute -top-4 left-8 flex items-center gap-2">
        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-200">
          Component: {name}
        </span>
      </div>
      <div className="mb-8">
        <p className="text-gray-500 font-medium text-sm italic">{description}</p>
      </div>
      {children}
    </section>
  );
}

/**
 * Component Playground (Container)
 * A living documentation page that showcases all refactored "Skin" components.
 */
export default async function PlaygroundPage() {
  // 1. Mock Data for Showcase
  const sidebarLinks: SidebarLinkItem[] = [
    { label: "Dashboard", href: "#", iconName: "home" },
    { label: "Playground", href: "/playground", iconName: "gamepad", isActive: true },
    { label: "Turniere", href: "#", iconName: "trophy" },
    { label: "Spieler", href: "#", iconName: "users" },
    { label: "Einstellungen", href: "#", iconName: "settings" },
  ];

  const scoreboardItems: ScoreboardItem[] = [
    { id: "1", rank: 1, name: "Maximilian Mustermann", username: "max_power", points: 15 },
    { id: "2", rank: 2, name: "Sarah Schmidt", username: "lucky_sarah", points: 12 },
    { id: "3", rank: 3, name: "Tim Test", points: 10 },
    { id: "4", rank: 4, name: "Julia Jung", username: "jj_cards", points: 8 },
  ];

  const matchItems: MatchItem[] = [
    {
      id: "m1",
      tableNumber: 1,
      status: "completed",
      statusLabel: "Abgeschlossen",
      player1: { name: "Max Power", isWinner: true },
      player2: { name: "Sarah Schmidt", isLoser: true },
    },
    {
      id: "m2",
      tableNumber: 2,
      status: "pending",
      statusLabel: "Laufend",
      player1: { name: "Tim Test" },
      player2: { name: "Julia Jung" },
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar Showcase */}
      <Sidebar 
        brandName="CardArena" 
        links={sidebarLinks}
        user={{ username: "Admin User" }}
        onLogout={() => console.log("Logout triggered")}
      />
      
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-16">
          <h1 className="text-5xl font-black text-black tracking-tighter mb-4">
            Component <span className="text-red-600 italic underline decoration-wavy decoration-red-200">Playground</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl">
            Dies ist eine lebende Dokumentation unserer refactored "Skin" Komponenten. 
            Jedes Element hier ist 100% stateless and wird ausschließlich über Props gesteuert.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 max-w-6xl">
          
          <PlaygroundSection 
            name="RoundBanner" 
            description="Ein informativer Header für den aktuellen Status eines Turniers oder einer Runde."
          >
            <RoundBanner 
              variant="accent"
              tournamentStatus={{ label: "Turnier-Status", value: "Läuft", variant: "success" }}
              roundInfo={{ number: 3, statusLabel: "Wird vorbereitet", iconName: "settings" }}
              participants={{ current: 24, max: 64 }}
              mainMessage="Die dritte Runde wird generiert..."
              subMessages={[
                { text: "50 Min pro Runde", iconName: "clock" },
                { text: "Live Updates aktiv", iconName: "play" }
              ]}
            />
          </PlaygroundSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PlaygroundSection 
              name="Scoreboard" 
              description="Zeigt die aktuelle Rangliste der Teilnehmer basierend auf Punkten."
            >
              <Scoreboard 
                title="Top Spieler" 
                items={scoreboardItems} 
                footerStats={{ currentCount: 24, maxCount: 64 }} 
              />
            </PlaygroundSection>

            <PlaygroundSection 
              name="Timer" 
              description="Ein interaktiver Countdown-Timer (UI Primitive)."
            >
              <div className="flex flex-col gap-4">
                <Timer initialSeconds={120} label="Verbleibende Zeit" size="lg" />
                <div className="grid grid-cols-2 gap-4">
                  <Timer initialSeconds={45} size="sm" />
                  <Timer initialSeconds={-30} size="sm" variant="overtime" />
                </div>
              </div>
            </PlaygroundSection>
          </div>

          <PlaygroundSection 
            name="MatchGrid" 
            description="Eine Übersicht der aktuellen Paarungen und Tischbelegungen."
          >
            <MatchGrid matches={matchItems} />
          </PlaygroundSection>

          <PlaygroundSection 
            name="MatchHistory" 
            description="Kompakte Darstellung vergangener Runden und deren Ergebnisse."
          >
            <MatchHistory matches={[...matchItems, ...matchItems]} />
          </PlaygroundSection>

        </div>

        <footer className="mt-24 pt-8 border-t border-gray-200 text-center text-gray-400 font-bold text-xs uppercase tracking-[0.3em]">
          End of Playground &bull; Build with Refactor Expert Skill
        </footer>
      </main>
    </div>
  );
}
