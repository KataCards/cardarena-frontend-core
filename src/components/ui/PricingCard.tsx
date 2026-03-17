import { CheckCircle } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./Button";

export interface PricingCardProps {
  /** Plan name */
  name: string;
  /** Price display (can include currency, period, etc.) */
  price: string | ReactNode;
  /** Optional plan description */
  description?: string;
  /** List of features included in the plan */
  features: string[];
  /** Call-to-action button text */
  buttonText: string;
  /** Optional button click handler */
  onButtonClick?: () => void;
  /** Optional button href */
  buttonHref?: string;
  /** Whether this is the popular/recommended plan */
  isPopular?: boolean;
  /** Popular badge text */
  popularText?: string;
  /** Button variant override */
  buttonVariant?: "solid" | "outline" | "ghost";
  /** Color scheme for popular plan */
  highlightColor?: "red" | "blue" | "purple";
}

const highlightColors = {
  red: {
    border: "border-red-600",
    badge: "bg-red-600",
    button: "red" as const,
  },
  blue: {
    border: "border-blue-600",
    badge: "bg-blue-600",
    button: "dark" as const,
  },
  purple: {
    border: "border-purple-600",
    badge: "bg-purple-600",
    button: "dark" as const,
  },
};

/**
 * PricingCard
 * 
 * A card component for displaying pricing plans with features, pricing,
 * and call-to-action buttons. Supports highlighting popular plans.
 * 
 * @example
 * // Basic pricing card
 * <PricingCard
 *   name="Starter"
 *   price="$9/mo"
 *   features={[
 *     "Up to 10 users",
 *     "Basic support",
 *     "1GB storage"
 *   ]}
 *   buttonText="Get Started"
 *   buttonHref="/signup?plan=starter"
 * />
 * 
 * @example
 * // Popular plan with custom styling
 * <PricingCard
 *   name="Pro"
 *   price="$29/mo"
 *   description="Perfect for growing teams"
 *   features={[
 *     "Unlimited users",
 *     "Priority support",
 *     "100GB storage",
 *     "Advanced analytics"
 *   ]}
 *   buttonText="Start Free Trial"
 *   isPopular
 *   popularText="Most Popular"
 *   highlightColor="blue"
 *   onButtonClick={() => console.log("Pro plan selected")}
 * />
 * 
 * @example
 * // Enterprise/Contact plan
 * <PricingCard
 *   name="Enterprise"
 *   price={<span className="text-2xl">Custom</span>}
 *   description="For large organizations"
 *   features={[
 *     "Unlimited everything",
 *     "Dedicated support",
 *     "Custom integrations",
 *     "SLA guarantee"
 *   ]}
 *   buttonText="Contact Sales"
 *   buttonVariant="outline"
 *   buttonHref="/contact"
 * />
 */
export function PricingCard({
  name,
  price,
  description,
  features,
  buttonText,
  onButtonClick,
  buttonHref,
  isPopular = false,
  popularText = "Popular",
  buttonVariant,
  highlightColor = "red",
}: PricingCardProps) {
  const colors = highlightColors[highlightColor];
  
  // Determine button variant
  const variant = buttonVariant || (isPopular ? "solid" : "outline");
  const colorScheme = isPopular ? colors.button : "gray";

  return (
    <div
      className={`bg-white p-8 rounded-xl shadow-sm relative transition-all hover:shadow-md ${
        isPopular ? `border-2 ${colors.border}` : "border border-gray-200"
      }`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className={`${colors.badge} text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg`}>
            {popularText}
          </span>
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>

      {/* Description */}
      {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}

      {/* Price */}
      <div className="text-3xl font-bold text-gray-900 mb-6">
        {typeof price === "string" ? price : price}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Button
        variant={variant}
        colorScheme={colorScheme}
        fullWidth
        onClick={onButtonClick}
        href={buttonHref}
      >
        {buttonText}
      </Button>
    </div>
  );
}