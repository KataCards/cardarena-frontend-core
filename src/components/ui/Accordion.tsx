"use client";
import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  /** Unique identifier for the item */
  id: string;
  /** Title/header content */
  title: ReactNode;
  /** Body content (shown when expanded) */
  children: ReactNode;
  /** Optional badge or count to display in header */
  badge?: ReactNode;
  /** Optional icon to display in header */
  icon?: React.ComponentType<{ className?: string; size?: number }>;
}

export interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItemProps[];
  /** Allow multiple items to be open simultaneously */
  allowMultiple?: boolean;
  /** Initially expanded item IDs */
  defaultExpanded?: string[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Accordion Component
 * 
 * A collapsible accordion component for organizing content into expandable sections.
 * Supports single or multiple open items, icons, and badges.
 * 
 * @example
 * // Basic usage
 * const items = [
 *   { id: '1', title: 'Section 1', children: <p>Content 1</p> },
 *   { id: '2', title: 'Section 2', children: <p>Content 2</p> }
 * ];
 * 
 * <Accordion items={items} />
 * 
 * @example
 * // With badges and icons
 * import { Users } from "lucide-react";
 * 
 * const items = [
 *   { 
 *     id: '1', 
 *     title: 'Team Members', 
 *     icon: Users,
 *     badge: <Badge>5</Badge>,
 *     children: <UserList />
 *   }
 * ];
 * 
 * <Accordion items={items} allowMultiple defaultExpanded={['1']} />
 */
export function Accordion({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className,
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(defaultExpanded)
  );

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => {
        const isExpanded = expandedIds.has(item.id);
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                {Icon && <Icon className="text-gray-600" size={20} />}
                <span className="text-lg font-semibold text-gray-800">
                  {item.title}
                </span>
                {item.badge && <div>{item.badge}</div>}
              </div>
              {isExpanded ? (
                <ChevronUp size={20} className="text-gray-600" />
              ) : (
                <ChevronDown size={20} className="text-gray-600" />
              )}
            </button>

            {/* Content */}
            {isExpanded && (
              <div className="p-4 border-t border-gray-200 bg-white">
                {item.children}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}