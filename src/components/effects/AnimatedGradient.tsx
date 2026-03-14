import React from 'react';

/**
 * Props for the AnimatedGradient component.
 */
export interface AnimatedGradientProps {
  /** Content to render inside the gradient area */
  children?: React.ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
  /** Array of hex or CSS color strings for the gradient */
  colors?: string[];
  /** Animation duration in seconds */
  speed?: number;
  /** CSS angle for the gradient direction (e.g., '45deg') */
  direction?: string;
}

/**
 * AnimatedGradient component (Effect)
 * A performant, CSS-only background effect with moving gradients.
 * Server-Component friendly.
 */
export function AnimatedGradient({
  children,
  className = '',
  colors = ['#C23B22', '#E34234', '#F05A5F', '#FF7B54'],
  speed = 15,
  direction = '-45deg'
}: AnimatedGradientProps) {
  
  const cssVariables = {
    '--gradient-colors': colors.join(', '),
    '--animation-speed': `${speed}s`,
    '--gradient-direction': direction,
  } as React.CSSProperties;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={cssVariables}
    >
      {/* 
        Inline style tag for the keyframes. 
        Using a standard style tag is RSC-safe and avoids 'style jsx' dependencies.
      */}
      <style>
        {`
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-logic {
            background: linear-gradient(var(--gradient-direction), var(--gradient-colors));
            background-size: 400% 400%;
            animation: gradient-move var(--animation-speed) ease infinite;
          }
        `}
      </style>
      
      <div className="animate-gradient-logic absolute inset-0 -z-10" />
      
      {children}
    </div>
  );
}
