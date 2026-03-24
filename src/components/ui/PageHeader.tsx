import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  /**
   * Header title text
   */
  title: string;
  /**
   * Optional icon component from lucide-react
   */
  icon?: LucideIcon;
  /**
   * Size of the icon
   */
  iconSize?: number;
  /**
   * Optional action button or element to display on the right
   */
  action?: React.ReactNode;
  /**
   * Additional className for the container
   */
  className?: string;
}

/**
 * PageHeader - A consistent page header with optional icon and action button
 * 
 * Features:
 * - Responsive layout (stacks on mobile, horizontal on desktop)
 * - Optional icon with customizable size
 * - Flexible action slot for buttons or other elements
 * - Consistent spacing and typography
 */
export function PageHeader({
  title,
  icon: Icon,
  iconSize = 32,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4",
        className
      )}
    >
      <div className="flex items-center">
        {Icon && <Icon size={iconSize} className="text-red-600 mr-3" />}
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}