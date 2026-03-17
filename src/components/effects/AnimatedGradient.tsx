import { ReactNode, CSSProperties } from "react";

export interface AnimatedGradientProps {
  /** Content to render inside the gradient area */
  children?: ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
  /** Array of hex or CSS color strings for the gradient */
  colors?: string[];
  /** Animation duration in seconds */
  speed?: number;
  /** Gradient type */
  type?: "linear" | "radial" | "conic";
  /** CSS angle for linear gradient direction (e.g., '45deg', '90deg') */
  direction?: string;
  /** Background size multiplier (higher = smoother animation) */
  size?: number;
  /** Z-index for the gradient layer (negative values place it behind content) */
  zIndex?: number;
}

/**
 * AnimatedGradient
 * 
 * A performant, CSS-only animated background gradient effect.
 * Server Component friendly with no client-side JavaScript required.
 * 
 * Features:
 * - Pure CSS animation (no JS overhead)
 * - Customizable colors, speed, and direction
 * - Supports linear, radial, and conic gradients
 * - Works with Next.js Server Components
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
 * // Radial gradient for spotlight effect
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
 * // Conic gradient for circular effect
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
  className = "",
  colors = ["#C23B22", "#E34234", "#F05A5F", "#FF7B54"],
  speed = 15,
  type = "linear",
  direction = "-45deg",
  size = 400,
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
    "--gradient-size": `${size}%`,
  } as CSSProperties;

  return (
    <div className={`relative overflow-hidden ${className}`} style={cssVariables}>
      <style>
        {`
          @keyframes gradient-move {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animated-gradient-bg {
            background: var(--gradient-bg);
            background-size: var(--gradient-size) var(--gradient-size);
            animation: gradient-move var(--animation-speed) ease infinite;
          }
        `}
      </style>

      <div
        className="animated-gradient-bg absolute inset-0"
        style={{ zIndex }}
        aria-hidden="true"
      />

      {children}
    </div>
  );
}