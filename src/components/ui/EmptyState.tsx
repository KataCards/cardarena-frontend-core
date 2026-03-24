import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  // Icon to display
  icon: LucideIcon;
  // Size of the icon
  iconSize?: number;
  //Main heading text
  title: string;
  // Description text
  description: string;
  // Optional action button or element
  action?: React.ReactNode;
  // Additional className for the container
  className?: string;
}

/**
 * EmptyState - A centered empty state component with icon, text, and optional action
 * 
 * Features:
 * - Customizable icon from lucide-react
 * - Title and description text
 * - Optional action slot for buttons
 * - Centered layout with consistent spacing
 */
export function EmptyState({
  icon: Icon,
  iconSize = 48,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-12", className)}>
      <Icon className="mx-auto text-gray-400 mb-4" size={iconSize}/>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}