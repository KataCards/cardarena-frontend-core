import Link from 'next/link';
import { PlusIcon, TrophyIcon, UserRoundPlusIcon, UsersIcon, SettingsIcon, type LucideIcon } from 'lucide-react';
import type { QuickActionItem } from '@/types/ui/dashboard';

const iconMap: Record<string, LucideIcon> = {
  plus: PlusIcon,
  trophy: TrophyIcon,
  'user-plus': UserRoundPlusIcon,
  users: UsersIcon,
  settings: SettingsIcon,
};

/**
 * QuickActionsGrid component (Presenter)
 * A responsive grid of action buttons for the dashboard.
 */
export function QuickActionsGrid({ actions }: { actions: QuickActionItem[] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
        Schnellzugriff
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {actions.map((action, index) => {
          const Icon = iconMap[action.iconName] || PlusIcon;
          return (
            <Link key={index} href={action.href} className="group">
              <div className={`${action.colorClass} text-white p-4 rounded-xl shadow-sm transition-all duration-300 transform group-hover:scale-[1.03] group-hover:shadow-lg group-active:scale-[0.97] flex flex-col items-center text-center gap-3 h-full`}>
                <div className="bg-white/20 p-2 rounded-lg">
                  <Icon size={24} />
                </div>
                <span className="font-bold text-sm leading-tight tracking-tight">
                  {action.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
