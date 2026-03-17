import React from "react";

export interface Stat {
  /** The primary metric value (e.g., "1000+", "24/7", "99%") */
  value: string;
  /** Descriptive label for the metric */
  label: string;
  /** Optional icon component to display above the value */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional highlight color variant */
  variant?: "default" | "primary" | "success" | "info";
}

interface StatsProps {
  /** Array of statistics to display */
  stats: Stat[];
  /** Optional heading text for the stats section */
  title?: string;
  /** Optional description text below the title */
  description?: string;
  /** Number of columns on desktop (2, 3, or 4) */
  columns?: 2 | 3 | 4;
  /** Background variant for different page contexts */
  variant?: "light" | "white" | "dark";
}

const variantStyles = {
  light: {
    section: "bg-gray-50",
    title: "text-gray-900",
    description: "text-gray-600",
  },
  white: {
    section: "bg-white",
    title: "text-gray-900",
    description: "text-gray-600",
  },
  dark: {
    section: "bg-slate-900",
    title: "text-white",
    description: "text-slate-300",
  },
};

const statVariants = {
  default: "text-gray-900",
  primary: "text-red-600",
  success: "text-green-600",
  info: "text-blue-600",
};

/**
 * Stats Section
 * 
 * A responsive grid for displaying key metrics and statistics.
 * Supports optional icons, custom colors, and flexible column layouts.
 * 
 * @example
 * // Basic usage
 * <Stats 
 *   stats={[
 *     { value: "10K+", label: "Active Users" },
 *     { value: "500+", label: "Tournaments" },
 *     { value: "99.9%", label: "Uptime" },
 *     { value: "24/7", label: "Support" }
 *   ]}
 * />
 * 
 * @example
 * // With title and icons
 * import { Users, Trophy, Zap, Clock } from "lucide-react";
 * 
 * <Stats
 *   title="Platform Statistics"
 *   description="Trusted by thousands worldwide"
 *   columns={4}
 *   stats={[
 *     { value: "10K+", label: "Active Users", icon: Users, variant: "primary" },
 *     { value: "500+", label: "Tournaments", icon: Trophy, variant: "success" },
 *     { value: "99.9%", label: "Uptime", icon: Zap, variant: "info" },
 *     { value: "24/7", label: "Support", icon: Clock }
 *   ]}
 * />
 * 
 * @example
 * // Dark variant with 3 columns
 * <Stats
 *   variant="dark"
 *   columns={3}
 *   title="Why Choose Us"
 *   stats={companyStats}
 * />
 */
export function Stats({ 
  stats, 
  title,
  description,
  columns = 4,
  variant = "white",
}: StatsProps) {
  const styles = variantStyles[variant];
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  return (
    <section className={`py-16 ${styles.section}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <header className="text-center mb-12">
            {title && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${styles.title}`}>
                {title}
              </h2>
            )}
            {description && (
              <p className={`text-xl ${styles.description}`}>
                {description}
              </p>
            )}
          </header>
        )}
        
        <div className={`grid grid-cols-2 ${gridCols[columns]} gap-8`}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            // Adjust default text color based on the section variant (dark mode)
            let valueColor = statVariants[stat.variant || "default"];
            if (!stat.variant && variant === "dark") {
              valueColor = "text-white";
            }
            
            return (
              <div key={index} className="text-center">
                {Icon && (
                  <div className="flex justify-center mb-3">
                    <Icon className={`h-8 w-8 ${valueColor}`} />
                  </div>
                )}
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${valueColor}`}>
                  {stat.value}
                </div>
                <div className={variant === "dark" ? "text-slate-400" : "text-gray-600"}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}