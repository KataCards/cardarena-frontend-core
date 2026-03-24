import { ReactNode } from "react";

export interface FeatureCardProps {
  /** Icon element or component to display */
  icon: ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Icon color variant */
  iconColor?: "red" | "blue" | "green" | "purple" | "gray";
  /** Card background variant */
  variant?: "white" | "gray" | "gradient";
  /** Optional click handler */
  onClick?: () => void;
}

const iconColors = {
  red: "text-red-600",
  blue: "text-blue-600",
  green: "text-green-600",
  purple: "text-purple-600",
  gray: "text-gray-600",
};

const variants = {
  white: "bg-white",
  gray: "bg-gray-50",
  gradient: "bg-linear-to-br from-white to-gray-50",
};

/**
 * FeatureCard
 * 
 * A card component for displaying features with an icon, title, and description.
 * Supports multiple color schemes and background variants.
 * 
 * @example
 * // Basic usage
 * import { Zap } from "lucide-react";
 * 
 * <FeatureCard
 *   icon={<Zap className="w-8 h-8" />}
 *   title="Lightning Fast"
 *   description="Experience blazing fast performance"
 * />
 * 
 * @example
 * // With custom colors
 * import { Shield, Rocket, Users } from "lucide-react";
 * 
 * <FeatureCard
 *   icon={<Shield className="w-8 h-8" />}
 *   title="Secure"
 *   description="Bank-level security"
 *   iconColor="blue"
 *   variant="gray"
 * />
 * 
 * <FeatureCard
 *   icon={<Rocket className="w-8 h-8" />}
 *   title="Scalable"
 *   description="Grows with your business"
 *   iconColor="purple"
 *   variant="gradient"
 * />
 * 
 * @example
 * // Interactive card
 * <FeatureCard
 *   icon={<Users className="w-8 h-8" />}
 *   title="Team Collaboration"
 *   description="Work together seamlessly"
 *   onClick={() => console.log("Feature clicked")}
 * />
 */
export function FeatureCard({
  icon,
  title,
  description,
  iconColor = "red",
  variant = "white",
  onClick,
}: FeatureCardProps) {
  const Component = onClick ? "button" : "div";
  
  return (
    <Component
      onClick={onClick}
      className={`${variants[variant]} p-8 rounded-xl shadow-sm hover:shadow-md transition-all ${
        onClick ? "cursor-pointer hover:scale-105 active:scale-100" : ""
      }`}
    >
      <div className={`${iconColors[iconColor]} mb-4`}>{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Component>
  );
}