import React from "react";
import { AlertCircle, CheckCircle, LucideIcon } from "lucide-react";

interface TabSectionProps {
  /** The main heading for the section */
  title: string;
  /** Optional descriptive text below the title */
  description?: string;
  /** Optional Lucide icon to display next to the title */
  icon?: LucideIcon;
  /** Error message to display in an alert banner */
  error?: string | null;
  /** Success message to display in an alert banner */
  success?: string | null;
  /** The content of the section (typically form fields or info lists) */
  children: React.ReactNode;
  /** Tailwind max-width class (defaults to max-w-2xl) */
  maxWidth?: string;
  /** Additional Tailwind classes for the container */
  className?: string;
}

/**
 * TabSection
 * 
 * A structural container used within tab-based views to group related content.
 * Provides consistent layout for titles, icons, descriptions, and status banners.
 */
export function TabSection({
  title,
  description,
  icon: Icon,
  error,
  success,
  children,
  maxWidth = "max-w-2xl",
  className = "",
}: TabSectionProps) {
  return (
    <div className={`${maxWidth} ${className}`}>
      <div className="mb-6">
        <div className="flex items-center mb-2">
          {Icon && <Icon className="w-6 h-6 text-red-600 mr-3" />}
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        {description && <p className="text-gray-600">{description}</p>}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          <span className="text-green-700">{success}</span>
        </div>
      )}

      {children}
    </div>
  );
}
