// components/composed/Pricing.tsx
import { PricingCard } from "@/components/composed/display/PricingCard";

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  isContact?: boolean;
}

interface PricingProps {
  /** Array of pricing plans to display */
  plans: PricingPlan[];
  /** Main heading text for the pricing section */
  title?: string;
  /** Supporting description text below the title */
  description?: string;
  /** Background color variant */
  variant?: "light" | "white" | "dark";
}

/**
 * Pricing Section
 * 
 * Displays a responsive grid of pricing plans with customizable heading and styling.
 * Automatically adapts from single column on mobile to three columns on desktop.
 * 
 * @example
 * // Basic usage with default styling
 * <Pricing plans={pricingPlans} />
 * 
 * @example
 * // Custom heading and description
 * <Pricing 
 *   plans={plans}
 *   title="Choose Your Plan"
 *   description="Flexible pricing for teams of all sizes"
 * />
 * 
 * @example
 * // Dark variant for light-themed pages
 * <Pricing 
 *   plans={plans}
 *   variant="dark"
 *   title="Simple, Transparent Pricing"
 *   description="No hidden fees. Cancel anytime."
 * />
 */
export function Pricing({ 
  plans,
  title = "Simple Pricing",
  description = "Choose the plan that fits your needs",
  variant = "light",
}: PricingProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name || index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
