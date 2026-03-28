import { ReactNode, CSSProperties } from "react";

/**
 * Base props shared by all gradient types
 */
interface BaseGradientProps {
  /** Content to render inside the gradient area */
  children?: ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
  /** Array of hex or CSS color strings for the gradient */
  colors?: string[];
  /** Animation duration in seconds @default 15 */
  speed?: number;
  /** Background size percentage (higher = smoother animation) @default 400 */
  backgroundSizePercent?: number;
  /** Z-index for the gradient layer (negative values place it behind content) @default -10 */
  zIndex?: number;
}

/**
 * Props for linear gradient (supports direction)
 */
interface LinearGradientProps extends BaseGradientProps {
  /** Gradient type */
  type?: "linear";
  /** CSS angle for linear gradient direction (e.g., '45deg', '90deg') @default '-45deg' */
  direction?: string;
}

/**
 * Props for radial gradient (direction not applicable)
 */
interface RadialGradientProps extends BaseGradientProps {
  /** Gradient type */
  type: "radial";
  /** Direction is not applicable for radial gradients */
  direction?: never;
}

/**
 * Props for conic gradient (direction not applicable)
 */
interface ConicGradientProps extends BaseGradientProps {
  /** Gradient type */
  type: "conic";
  /** Direction is not applicable for conic gradients */
  direction?: never;
}

export type AnimatedGradientProps = LinearGradientProps | RadialGradientProps | ConicGradientProps;

/**
 * AnimatedGradient
 * 
 * A performant, CSS-only animated background gradient effect.
 * Server Component friendly with no client-side JavaScript required.
 * 
 * The keyframe animation is defined globally in globals.css, avoiding
 * hydration issues and ensuring consistent behavior across all instances.
 * 
 * Features:
 * - Pure CSS animation (no JS overhead)
 * - Customizable colors, speed, and direction
 * - Supports linear, radial, and conic gradients
 * - Type-safe gradient props (direction only applies to linear)
 * - Works with Next.js Server Components
 * - No inline style injection (hydration-safe)
 * 
 * @example
 * // Basic usage with default red gradient
 * <AnimatedGradient>
 *   <div className="p-8">
 *     <h1>Content over animated gradient</h1>
 *   </div>
 * </AnimatedGradient>
 * 
 * @example
 * // Custom colors and speed
 * <AnimatedGradient
 *   colors={['#667eea', '#764ba2', '#f093fb', '#4facfe']}
 *   speed={10}
 *   direction="135deg"
 * >
 *   <section className="min-h-screen flex items-center justify-center">
 *     <h1 className="text-white text-6xl font-bold">Hero Section</h1>
 *   </section>
 * </AnimatedGradient>
 * 
 * @example
 * // Radial gradient for spotlight effect (direction not applicable)
 * <AnimatedGradient
 *   type="radial"
 *   colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731']}
 *   speed={20}
 * >
 *   <div className="p-12 text-center">
 *     <h2 className="text-white text-4xl">Radial Gradient Background</h2>
 *   </div>
 * </AnimatedGradient>
 * 
 * @example
 * // Conic gradient for circular effect (direction not applicable)
 * <AnimatedGradient
 *   type="conic"
 *   colors={['#ee0979', '#ff6a00', '#ee0979']}
 *   speed={8}
 * >
 *   <div className="min-h-[400px] flex items-center justify-center">
 *     <p className="text-white text-2xl">Spinning gradient</p>
 *   </div>
 * </AnimatedGradient>
 */
export function AnimatedGradient({
  children,
  className,
  colors = ["#C23B22", "#E34234", "#F05A5F", "#FF7B54"],
  speed = 15,
  type = "linear",
  direction = "-45deg",
  backgroundSizePercent = 400,
  zIndex = -10,
}: AnimatedGradientProps) {
  const gradientType = {
    linear: `linear-gradient(${direction}, ${colors.join(", ")})`,
    radial: `radial-gradient(circle, ${colors.join(", ")})`,
    conic: `conic-gradient(from 0deg, ${colors.join(", ")})`,
  };

  const cssVariables = {
    "--gradient-bg": gradientType[type],
    "--animation-speed": `${speed}s`,
    "--gradient-size": `${backgroundSizePercent}%`,
  } as CSSProperties;

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`} style={cssVariables}>
      <div
        className="absolute inset-0"
        style={{
          background: "var(--gradient-bg)",
          backgroundSize: "var(--gradient-size) var(--gradient-size)",
          animation: "gradient-move var(--animation-speed) ease infinite",
          zIndex,
        }}
        aria-hidden="true"
      />

      {children}
    </div>
  );
}