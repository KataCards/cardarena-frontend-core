import React from "react";

export interface StatCardProps {
  /** Stat title/label */
  title: string;
  /** Stat value to display */
  value: string | number;
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>;
  /** Whether the stat is loading */
  isLoading?: boolean;
  /** Error message if stat failed to load */
  error?: string | null;
  /** Icon color variant */
  iconColor?: "red" | "blue" | "green" | "purple" | "gray";
  /** Card background variant */
  variant?: "gray" | "white" | "gradient";
  /** Optional trend indicator */
  trend?: {
    value: number;
    label?: string;
  };
}

const iconColors = {
  red: "text-red-600",
  blue: "text-blue-600",
  green: "text-green-600",
  purple: "text-purple-600",
  gray: "text-gray-600",
};

const variants = {
  gray: "bg-gray-50",
  white: "bg-white border border-gray-200",
  gradient: "bg-linear-to-br from-white to-gray-50",
};

/**
 * StatCard
 * 
 * A card component for displaying statistics with icons, loading states,
 * and optional trend indicators.
 * 
 * @example
 * // Basic usage
 * import { Users } from "lucide-react";
 * 
 * <StatCard
 *   title="Total Users"
 *   value={1234}
 *   icon={Users}
 * />
 * 
 * @example
 * // With loading and error states
 * import { DollarSign, TrendingUp } from "lucide-react";
 * 
 * <StatCard
 *   title="Revenue"
 *   value="$45,231"
 *   icon={DollarSign}
 *   iconColor="green"
 *   isLoading={isLoading}
 *   error={error}
 * />
 * 
 * @example
 * // With trend indicator
 * <StatCard
 *   title="Active Sessions"
 *   value={892}
 *   icon={TrendingUp}
 *   iconColor="blue"
 *   variant="white"
 *   trend={{ value: 12.5, label: "vs last week" }}
 * />
 */
export function StatCard({
  title,
  value,
  icon: Icon,
  isLoading = false,
  error = null,
  iconColor = "red",
  variant = "gray",
  trend,
}: StatCardProps) {
  return (
    <div className={`${variants[variant]} p-6 rounded-lg shadow-sm hover:shadow-md transition-all`}>
      <div className={`flex items-center ${iconColors[iconColor]} mb-2`}>
        <Icon className="w-6 h-6" />
        <h3 className="ml-2 text-lg font-semibold text-gray-700">{title}</h3>
      </div>
      
      {isLoading ? (
        <p className="text-3xl font-bold text-gray-500 animate-pulse">...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`text-sm font-semibold ${
                  trend.value >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.value >= 0 ? "+" : ""}
                {trend.value}%
              </span>
              {trend.label && <span className="text-xs text-gray-500">{trend.label}</span>}
            </div>
          )}
        </>
      )}
    </div>
  );
}