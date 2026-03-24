// components/composed/Features.tsx
import { FeatureCard } from "@/components/composed/display/FeatureCard";
import { ReactNode } from "react";

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  /** Array of feature objects to display in the grid */
  features: Feature[];
  /** Main heading text for the features section */
  title?: string;
  /** Supporting description text below the title */
  description?: string;
  /** Background color variant for different page contexts */
  variant?: "light" | "white" | "dark";
}

/**
 * Features Section
 * 
 * Displays a grid of feature cards with a centered heading and description.
 * Responsive layout adapts from single column on mobile to three columns on desktop.
 * 
 * @example
 * // Basic usage with custom features
 * <Features 
 *   features={[
 *     { icon: <Trophy />, title: "Tournament Brackets", description: "..." },
 *     { icon: <Users />, title: "Player Management", description: "..." },
 *   ]} 
 * />
 * 
 * @example
 * // Custom heading and dark variant
 * <Features 
 *   variant="dark"
 *   title="Why Choose CardArena?"
 *   description="Built by tournament organizers, for tournament organizers"
 *   features={featuresList}
 * />
 * 
 * @example
 * // White background for alternating sections
 * <Features 
 *   variant="white"
 *   title="Core Features"
 *   description="Everything you need to run professional tournaments"
 *   features={coreFeatures}
 * />
 */
export function Features({
  features,
  title = "Everything you need",
  description = "Professional tools for perfect tournaments",
  variant = "light",
}: FeaturesProps) {
  const variants = {
    light: "bg-gray-50",
    white: "bg-white",
    dark: "bg-slate-900",
  };

  const textColors = {
    light: { title: "text-gray-900", description: "text-gray-600" },
    white: { title: "text-gray-900", description: "text-gray-600" },
    dark: { title: "text-white", description: "text-slate-300" },
  };

  const colors = textColors[variant];

  return (
    <section className={`py-20 ${variants[variant]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${colors.title}`}>
            {title}
          </h2>
          <p className={`text-xl ${colors.description}`}>
            {description}
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
