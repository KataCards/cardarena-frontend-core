// components/composed/QuickActionsGrid.tsx
import Link from "next/link";
import type { QuickActionItem } from "@/types/ui/dashboard";

interface QuickActionsGridProps {
  /** Array of action items to display in the grid */
  actions: QuickActionItem[];
  /** Optional heading text for the actions section */
  title?: string;
  /** Background variant for different page contexts */
  variant?: "card" | "flat";
}

/**
 * QuickActionsGrid
 * 
 * A responsive grid of colorful action buttons, typically used in dashboards
 * or control panels. Accepts any icon component (lucide-react, heroicons, etc.)
 * for maximum flexibility.
 * 
 * @example
 * // Basic usage with lucide-react icons
 * import { Trophy, UserPlus, Settings } from "lucide-react";
 * 
 * <QuickActionsGrid 
 *   actions={[
 *     { 
 *       title: "New Tournament", 
 *       href: "/tournaments/new", 
 *       icon: Trophy,
 *       colorClass: "bg-red-600"
 *     },
 *     { 
 *       title: "Add Player", 
 *       href: "/players/new", 
 *       icon: UserPlus,
 *       colorClass: "bg-blue-600"
 *     },
 *     { 
 *       title: "Settings", 
 *       href: "/settings", 
 *       icon: Settings,
 *       colorClass: "bg-gray-600"
 *     }
 *   ]}
 * />
 * 
 * @example
 * // Custom title and flat variant
 * <QuickActionsGrid 
 *   actions={actions}
 *   title="Quick Actions"
 *   variant="flat"
 * />
 * 
 * @example
 * // With custom icon library
 * import { PlusCircleIcon } from "@heroicons/react/24/outline";
 * 
 * <QuickActionsGrid 
 *   actions={[
 *     { 
 *       title: "Create", 
 *       href: "/create", 
 *       icon: PlusCircleIcon,
 *       colorClass: "bg-green-600"
 *     }
 *   ]}
 * />
 */
export function QuickActionsGrid({ 
  actions,
  title = "Quick Actions",
  variant = "card",
}: QuickActionsGridProps) {
  const content = (
    <>
      <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link key={action.href || index} href={action.href} className="group">
              <div 
                className={`${action.colorClass} text-white p-4 rounded-xl shadow-sm transition-all duration-300 transform group-hover:scale-[1.03] group-hover:shadow-lg group-active:scale-[0.97] flex flex-col items-center text-center gap-3 h-full`}
              >
                <div className="bg-white/20 p-2 rounded-lg">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-sm leading-tight tracking-tight">
                  {action.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );

  if (variant === "flat") {
    return <div className="py-6">{content}</div>;
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      {content}
    </div>
  );
}