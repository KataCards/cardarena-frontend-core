import { TrophyIcon, MedalIcon, AwardIcon, UserIcon } from "lucide-react";
import type { ScoreboardProps } from "@/types/ui/scoreboard";

/**
 * Helper to get rank-specific icon and styling.
 */
function getRankMeta(rank: number) {
  switch (rank) {
    case 1:
      return {
        Icon: TrophyIcon,
        iconClass: "text-yellow-600",
        containerClass: "bg-linear-to-r from-yellow-200/70 to-yellow-300/70 border-yellow-400/50 scale-105",
      };
    case 2:
      return {
        Icon: MedalIcon,
        iconClass: "text-gray-500",
        containerClass: "bg-linear-to-r from-gray-200/70 to-gray-300/70 border-gray-400/50",
      };
    case 3:
      return {
        Icon: AwardIcon,
        iconClass: "text-orange-600",
        containerClass: "bg-linear-to-r from-orange-200/70 to-orange-300/70 border-orange-400/50",
      };
    default:
      return {
        Icon: UserIcon,
        iconClass: "text-gray-600",
        containerClass: "bg-white/50 border-white/30",
      };
  }
}

/**
 * Scoreboard component (Presenter)
 * A clean, stateless ranking display for tournament participants.
 */
export function Scoreboard({ 
  title = "Rangliste", 
  items, 
  footerStats 
}: ScoreboardProps) {
  
  if (items.length === 0) {
    return (
      <div className="bg-white backdrop-blur-sm rounded-xl p-6 border border-white/30 text-black shadow-sm">
        <h3 className="text-2xl font-bold mb-4 text-center flex items-center justify-center">
          <TrophyIcon className="h-6 w-6 mr-2 text-red-600" />
          {title}
        </h3>
        <div className="text-center py-8">
          <UserIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg text-gray-500">Keine Teilnehmer</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white backdrop-blur-sm rounded-xl p-6 border border-white/30 text-black shadow-sm">
      <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
        <TrophyIcon className="h-6 w-6 mr-2 text-red-600" />
        {title}
      </h3>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {items.map((item) => {
          const { Icon, iconClass, containerClass } = getRankMeta(item.rank);
          
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${containerClass}`}
            >
              <div className="flex items-center flex-1 min-w-0">
                <div className="flex items-center mr-4">
                  <Icon className={`h-6 w-6 ${iconClass}`} />
                  <span className="ml-2 text-lg font-bold text-black">
                    {item.rank}.
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-black truncate">
                    {item.name}
                  </p>
                  {item.username && (
                    <p className="text-sm text-gray-600 truncate">
                      @{item.username}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-black leading-tight">
                  {item.points}
                </p>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {item.points === 1 ? 'Punkt' : 'Punkte'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {footerStats && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm font-medium text-gray-500">
            <span>Teilnehmer: {footerStats.currentCount}</span>
            <span>Max: {footerStats.maxCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
