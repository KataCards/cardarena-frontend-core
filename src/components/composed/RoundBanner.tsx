import { PlayIcon, PauseIcon, CheckCircleIcon, ClockIcon, SettingsIcon, AlertCircleIcon, type LucideIcon } from "lucide-react";
import type { RoundBannerProps, BannerVariant, BannerIcon } from "@/types/ui/round-banner";

const iconMap: Record<BannerIcon, LucideIcon> = {
  play: PlayIcon,
  pause: PauseIcon,
  check: CheckCircleIcon,
  clock: ClockIcon,
  settings: SettingsIcon,
  alert: AlertCircleIcon,
};

const variantStyles: Record<BannerVariant, string> = {
  success: "border-green-500/50 bg-green-50/70 text-green-700",
  warning: "border-orange-500/50 bg-orange-50/70 text-orange-700",
  info: "border-blue-500/50 bg-blue-50/70 text-blue-700",
  error: "border-red-500/50 bg-red-50/70 text-red-700",
  neutral: "border-gray-500/50 bg-gray-50/70 text-gray-700",
  accent: "border-red-500/50 bg-red-50/70 text-red-700",
};

const textVariantStyles: Record<BannerVariant, string> = {
  success: "text-green-600",
  warning: "text-orange-600",
  info: "text-blue-600",
  error: "text-red-600",
  neutral: "text-gray-600",
  accent: "text-red-600",
};

/**
 * RoundBanner component (Presenter)
 * A stateless informational header for tournament and round status.
 */
export function RoundBanner({
  tournamentStatus,
  roundInfo,
  participants,
  mainMessage,
  subMessages,
  variant
}: RoundBannerProps) {
  return (
    <div className={`backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 shadow-sm ${variantStyles[variant]}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Tournament Status */}
        <div className="text-center md:text-left">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{tournamentStatus.label}</h3>
          <p className={`text-2xl font-black ${textVariantStyles[tournamentStatus.variant]}`}>
            {tournamentStatus.value}
          </p>
        </div>

        {/* Center: Round Status */}
        {roundInfo && (
          <div className="flex items-center gap-4 bg-white/40 px-6 py-3 rounded-xl border border-white/20">
            <div className="text-center">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Runde</h4>
              <p className="text-3xl font-black text-black leading-none">#{roundInfo.number}</p>
            </div>
            <div className="w-px h-10 bg-gray-300/50" />
            <div className="flex items-center gap-3">
              {(() => {
                const Icon = iconMap[roundInfo.iconName];
                return <Icon className={`h-8 w-8 ${roundInfo.iconName === 'settings' ? 'animate-spin' : ''}`} />;
              })()}
              <p className="text-lg font-bold text-black">{roundInfo.statusLabel}</p>
            </div>
          </div>
        )}

        {/* Right Side: Participant Info */}
        <div className="text-center md:text-right">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Teilnehmer</h4>
          <p className="text-3xl font-black text-black leading-none">
            {participants.current}
            <span className="text-lg text-gray-400 font-medium ml-1">/{participants.max}</span>
          </p>
        </div>
      </div>

      {/* Footer Section: Main Message & Sub-details */}
      <div className="mt-6 pt-6 border-t border-gray-200/50">
        <div className="text-center">
          <p className="text-2xl font-black text-black tracking-tight mb-4">
            {mainMessage}
          </p>
          
          {subMessages && subMessages.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-6">
              {subMessages.map((msg, idx) => {
                const Icon = iconMap[msg.iconName];
                return (
                  <div key={idx} className="flex items-center gap-2 text-sm font-bold text-gray-600 bg-white/30 px-3 py-1.5 rounded-full border border-white/20">
                    <Icon className="h-4 w-4" />
                    <span>{msg.text}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
