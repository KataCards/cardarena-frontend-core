import type { StatusBannerProps, BannerVariant } from "@/types/ui/round-banner";

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
 * StatusBanner
 * 
 * A flexible, stateless informational banner for displaying multi-part status information.
 * Perfect for tournaments, events, sessions, or any scenario requiring primary/secondary
 * status display with optional center information and supporting messages.
 * 
 * @example
 * // Tournament round status
 * import { Settings, Clock, Users } from "lucide-react";
 * 
 * <StatusBanner
 *   primaryStatus={{ label: "Tournament", value: "Active", variant: "success" }}
 *   centerInfo={{ 
 *     label: "Round", 
 *     value: 3, 
 *     statusLabel: "In Progress",
 *     icon: Settings,
 *     animateIcon: true
 *   }}
 *   secondaryStatus={{ label: "Players", current: 24, max: 32 }}
 *   mainMessage="Round 3 is currently in progress"
 *   subMessages={[
 *     { text: "12 matches active", icon: Clock },
 *     { text: "8 players waiting", icon: Users }
 *   ]}
 *   variant="info"
 * />
 * 
 * @example
 * // Event capacity status
 * import { CheckCircle, MapPin } from "lucide-react";
 * 
 * <StatusBanner
 *   primaryStatus={{ label: "Event", value: "Registration Open", variant: "success" }}
 *   secondaryStatus={{ label: "Attendees", current: 156, max: 200 }}
 *   mainMessage="Early bird tickets available"
 *   subMessages={[{ text: "Downtown Venue", icon: MapPin }]}
 *   variant="success"
 * />
 * 
 * @example
 * // Simple status without center info
 * import { AlertCircle } from "lucide-react";
 * 
 * <StatusBanner
 *   primaryStatus={{ label: "System", value: "Maintenance", variant: "warning" }}
 *   secondaryStatus={{ label: "Affected Users", current: 45, max: 1000 }}
 *   mainMessage="Scheduled maintenance in progress"
 *   variant="warning"
 * />
 */
export function StatusBanner({
  primaryStatus,
  centerInfo,
  secondaryStatus,
  mainMessage,
  subMessages,
  variant
}: StatusBannerProps) {
  return (
    <div className={`backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 shadow-sm ${variantStyles[variant]}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Primary Status */}
        <div className="text-center md:text-left">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
            {primaryStatus.label}
          </h3>
          <p className={`text-2xl font-black ${textVariantStyles[primaryStatus.variant]}`}>
            {primaryStatus.value}
          </p>
        </div>

        {/* Center: Optional Info (Round, Phase, Stage, etc.) */}
        {centerInfo && (
          <div className="flex items-center gap-4 bg-white/40 px-6 py-3 rounded-xl border border-white/20">
            <div className="text-center">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                {centerInfo.label}
              </h4>
              <p className="text-3xl font-black text-black leading-none">
                {typeof centerInfo.value === 'number' ? `#${centerInfo.value}` : centerInfo.value}
              </p>
            </div>
            <div className="w-px h-10 bg-gray-300/50" />
            <div className="flex items-center gap-3">
              <centerInfo.icon 
                className={`h-8 w-8 ${centerInfo.animateIcon ? 'animate-spin' : ''}`} 
              />
              <p className="text-lg font-bold text-black">{centerInfo.statusLabel}</p>
            </div>
          </div>
        )}

        {/* Right Side: Secondary Status */}
        <div className="text-center md:text-right">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
            {secondaryStatus.label}
          </h4>
          <p className="text-3xl font-black text-black leading-none">
            {secondaryStatus.current}
            <span className="text-lg text-gray-400 font-medium ml-1">/{secondaryStatus.max}</span>
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
              {subMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 text-sm font-bold text-gray-600 bg-white/30 px-3 py-1.5 rounded-full border border-white/20"
                >
                  <msg.icon className="h-4 w-4" />
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}