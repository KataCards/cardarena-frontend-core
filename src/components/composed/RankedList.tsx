import { User } from "lucide-react";
import type { RankedListProps } from "@/types/ui/scoreboard";

/**
 * RankedList
 * 
 * A clean, flexible component for displaying ranked items with optional icons,
 * sublabels, and custom styling. Perfect for leaderboards, standings, rankings,
 * or any ordered list with associated metrics.
 * 
 * @example
 * // Basic leaderboard
 * import { Trophy } from "lucide-react";
 * 
 * <RankedList
 *   title="Top Players"
 *   titleIcon={Trophy}
 *   items={[
 *     { id: "1", rank: 1, label: "Alice", value: 2500 },
 *     { id: "2", rank: 2, label: "Bob", value: 2300 },
 *     { id: "3", rank: 3, label: "Charlie", value: 2100 }
 *   ]}
 *   defaultValueLabel="Points"
 * />
 * 
 * @example
 * // With custom styling for top ranks
 * import { Trophy, Medal, Award } from "lucide-react";
 * 
 * <RankedList
 *   title="Tournament Standings"
 *   items={[
 *     { 
 *       id: "1", 
 *       rank: 1, 
 *       label: "Alice", 
 *       sublabel: "@alice_pro",
 *       value: 2500,
 *       icon: Trophy,
 *       className: "bg-gradient-to-r from-yellow-200/70 to-yellow-300/70 border-yellow-400"
 *     },
 *     { 
 *       id: "2", 
 *       rank: 2, 
 *       label: "Bob",
 *       value: 2300,
 *       icon: Medal,
 *       className: "bg-gradient-to-r from-gray-200/70 to-gray-300/70 border-gray-400"
 *     }
 *   ]}
 * />
 * 
 * @example
 * // Sales leaderboard with footer
 * import { DollarSign } from "lucide-react";
 * 
 * <RankedList
 *   title="Sales Leaders"
 *   titleIcon={DollarSign}
 *   items={salesData}
 *   defaultValueLabel="Revenue"
 *   maxHeight="500px"
 *   footer={<div className="text-sm text-gray-500">Updated hourly</div>}
 * />
 */
export function RankedList({ 
  items,
  title,
  titleIcon: TitleIcon,
  defaultValueLabel = "Score",
  emptyMessage = "No items to display",
  maxHeight = "96",
  footer,
}: RankedListProps) {
  
  if (items.length === 0) {
    return (
      <div className="bg-white backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm">
        {title && (
          <h3 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            {TitleIcon && <TitleIcon className="h-6 w-6 text-red-600" />}
            {title}
          </h3>
        )}
        <div className="text-center py-8">
          <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm">
      {title && (
        <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          {TitleIcon && <TitleIcon className="h-6 w-6 text-red-600" />}
          {title}
        </h3>
      )}

      <div 
        className="space-y-3 overflow-y-auto pr-1"
        style={{ maxHeight: maxHeight.includes('px') ? maxHeight : `${parseInt(maxHeight) * 4}px` }}
      >
        {items.map((item) => {
          const ItemIcon = item.icon;
          const valueLabel = item.valueLabel || defaultValueLabel;
          
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                item.className || 'bg-white/50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center flex-1 min-w-0 gap-4">
                <div className="flex items-center gap-2">
                  {ItemIcon && <ItemIcon className="h-6 w-6" />}
                  <span className="text-lg font-bold text-black">
                    {item.rank}.
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-black truncate">
                    {item.label}
                  </p>
                  {item.sublabel && (
                    <p className="text-sm text-gray-600 truncate">
                      {item.sublabel}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right ml-4">
                <p className="text-2xl font-bold text-black leading-tight">
                  {item.value}
                </p>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {valueLabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {footer && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
}