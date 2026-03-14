'use client';

import { useState, useEffect, useRef } from 'react';
import { ClockIcon, AlertTriangleIcon } from 'lucide-react';

/**
 * Visual variants for the timer based on remaining time.
 */
export type TimerVariant = 'success' | 'warning' | 'danger' | 'overtime' | 'neutral';

/**
 * Size presets for the timer.
 */
export type TimerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface TimerProps {
  /** Initial time in seconds */
  initialSeconds: number;
  /** Optional callback when timer reaches zero */
  onTimeUp?: () => void;
  /** The scale of the timer component */
  size?: TimerSize;
  /** Overrides the automatic color logic */
  variant?: TimerVariant;
  /** Optional descriptive label */
  label?: string;
  /** Additional CSS classes */
  className?: string;
}

const sizeMap: Record<TimerSize, { text: string; icon: number; container: string }> = {
  sm: { text: "text-2xl", icon: 6, container: "p-2" },
  md: { text: "text-4xl", icon: 8, container: "p-4" },
  lg: { text: "text-6xl", icon: 12, container: "p-6" },
  xl: { text: "text-8xl", icon: 16, container: "p-8" },
};

const variantMap: Record<TimerVariant, { text: string; bg: string; border: string }> = {
  success: { text: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  warning: { text: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
  danger: { text: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
  overtime: { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
  neutral: { text: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" },
};

/**
 * Format seconds into a MM:SS string.
 */
function formatTime(seconds: number): string {
  const abs = Math.abs(seconds);
  const mins = Math.floor(abs / 60);
  const secs = abs % 60;
  const prefix = seconds < 0 ? '-' : '';
  return `${prefix}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Timer component (UI Primitive)
 * A clean, interactive countdown timer for tournaments.
 */
export function Timer({ 
  initialSeconds, 
  onTimeUp, 
  size = 'md', 
  variant: forcedVariant,
  label,
  className = "" 
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const onTimeUpRef = useRef(onTimeUp);
  
  // Update ref to avoid effect re-triggers on callback change
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  // Handle initialSeconds updates
  useEffect(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  // Main countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next === 0) onTimeUpRef.current?.();
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Automatic variant selection
  const variant: TimerVariant = forcedVariant || (
    timeLeft < 0 ? 'overtime' :
    timeLeft <= 60 ? 'danger' :
    timeLeft <= 300 ? 'warning' : 'success'
  );

  const styles = variantMap[variant];
  const sizeConfig = sizeMap[size];

  return (
    <div className={`rounded-2xl border transition-all duration-500 shadow-sm ${styles.bg} ${styles.border} ${sizeConfig.container} ${className}`}>
      <div className="text-center flex flex-col items-center">
        <div className="flex items-center justify-center">
          {timeLeft < 0 ? (
            <AlertTriangleIcon className={`mr-3 ${styles.text}`} size={sizeConfig.icon * 4} />
          ) : (
            <ClockIcon className={`mr-3 ${styles.text}`} size={sizeConfig.icon * 4} />
          )}
          <span className={`font-black tracking-tighter tabular-nums leading-none ${sizeConfig.text} ${styles.text}`}>
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Dynamic Status Messages */}
        <div className="mt-2 min-h-[1.5rem]">
          {timeLeft < 0 ? (
            <p className="text-sm font-bold uppercase tracking-widest text-purple-600 animate-pulse">Nachspielzeit!</p>
          ) : timeLeft <= 60 ? (
            <p className="text-sm font-bold uppercase tracking-widest text-red-600 animate-pulse">Letzte Minute!</p>
          ) : label ? (
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">{label}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
