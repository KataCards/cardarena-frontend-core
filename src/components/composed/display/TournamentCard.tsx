import Link from "next/link";
import { ReactNode } from "react";

export interface TournamentCardMetaItem {
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>;
  /** Label text */
  label: string;
}

export interface TournamentCardProps {
  /** Tournament title */
  title: string;
  /** Optional status badge */
  badge?: {
    label: string;
    variant?: "success" | "info" | "warning" | "danger" | "neutral";
  };
  /** Array of metadata items (location, date, players, etc.) */
  metadata: TournamentCardMetaItem[];
  /** Optional link destination */
  href?: string;
  /** Optional click handler (if not using href) */
  onClick?: () => void;
  /** Call-to-action text */
  ctaText?: string;
  /** Optional footer content (overrides CTA) */
  footer?: ReactNode;
  /** Minimum card width */
  minWidth?: string;
}

const badgeVariants = {
  success: "bg-green-100 text-green-800 border-green-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  danger: "bg-red-100 text-red-800 border-red-200",
  neutral: "bg-gray-100 text-gray-800 border-gray-200",
};

/**
 * TournamentCard
 * 
 * A flexible card component for displaying event/tournament information with
 * metadata, status badges, and call-to-action links. Can be used for any
 * event-based content.
 * 
 * @example
 * // Basic tournament card
 * import { MapPin, Calendar, Users, Gamepad2 } from "lucide-react";
 * 
 * <TournamentCard
 *   title="Summer Championship 2024"
 *   badge={{ label: "Registration Open", variant: "info" }}
 *   metadata={[
 *     { icon: MapPin, label: "New York, NY" },
 *     { icon: Calendar, label: "July 15, 2024" },
 *     { icon: Users, label: "24/32 Players" },
 *     { icon: Gamepad2, label: "Magic: The Gathering" }
 *   ]}
 *   href="/tournaments/summer-2024"
 *   ctaText="View Details"
 * />
 * 
 * @example
 * // Event card with custom footer
 * import { MapPin, Calendar, DollarSign } from "lucide-react";
 * 
 * <TournamentCard
 *   title="Tech Conference 2024"
 *   badge={{ label: "Sold Out", variant: "danger" }}
 *   metadata={[
 *     { icon: MapPin, label: "San Francisco, CA" },
 *     { icon: Calendar, label: "Aug 20-22, 2024" },
 *     { icon: DollarSign, label: "$299" }
 *   ]}
 *   footer={
 *     <button className="text-sm text-blue-600 font-semibold">
 *       Join Waitlist
 *     </button>
 *   }
 * />
 * 
 * @example
 * // Interactive card with onClick
 * <TournamentCard
 *   title="Weekly Game Night"
 *   badge={{ label: "Tonight", variant: "success" }}
 *   metadata={[
 *     { icon: MapPin, label: "Local Game Store" },
 *     { icon: Calendar, label: "Every Friday 7PM" },
 *     { icon: Users, label: "8-12 Players" }
 *   ]}
 *   onClick={() => console.log("Card clicked")}
 *   ctaText="RSVP Now →"
 *   minWidth="350px"
 * />
 */
export function TournamentCard({
  title,
  badge,
  metadata,
  href,
  onClick,
  ctaText = "View Details →",
  footer,
  minWidth = "300px",
}: TournamentCardProps) {
  const cardContent = (
    <div
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group-active:scale-[0.98] h-full flex flex-col"
      style={{ minWidth }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4 gap-4">
        <h3 className="text-xl font-bold text-black tracking-tight leading-tight truncate">
          {title}
        </h3>
        {badge && (
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border shrink-0 ${
              badgeVariants[badge.variant || "neutral"]
            }`}
          >
            {badge.label}
          </span>
        )}
      </div>

      {/* Metadata */}
      <div className="space-y-3 flex-1">
        {metadata.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-center text-gray-500 text-sm font-medium">
              <Icon className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-end">
        {footer ? (
          footer
        ) : (
          <span className="text-xs font-black uppercase tracking-tighter text-red-600 group-hover:translate-x-1 transition-transform">
            {ctaText}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full group">
        {cardContent}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="block h-full group text-left w-full">
        {cardContent}
      </button>
    );
  }

  return <div className="h-full">{cardContent}</div>;
}