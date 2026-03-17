"use client";

import { useState, useEffect, useRef } from "react";
import { ClockIcon, AlertTriangleIcon } from "lucide-react";

/**
 * Visual variants for the timer based on remaining time.
 */
export type TimerVariant = "success" | "warning" | "danger" | "overtime" | "neutral";

/**
 * Size presets for the timer.
 */
export type TimerSize = "sm" | "md" | "lg" | "xl";

export interface TimerProps {
  /** Initial time in seconds */
  initialSeconds: number;
  /** Optional callback when timer reaches zero */
  onTimeUp?: () => void;
  /** Optional callback on every tick */
  onTick?: (secondsLeft: number) => void;
  /** The scale of the timer component */
  size?: TimerSize;
  /** Overrides the automatic color logic */
  variant?: TimerVariant;
  /** Optional descriptive label */
  label?: string;
  /** Custom message when time is up */
  overtimeMessage?: string;
  /** Custom message for last minute warning */
  lastMinuteMessage?: string;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Whether to show status messages */
  showStatusMessages?: boolean;
  /** Whether timer should auto-start */
  autoStart?: boolean;
  /** Whether timer is paused */
  isPaused?: boolean;
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
 * Timer
 * 
 * A flexible countdown timer component with automatic color transitions,
 * pause/resume functionality, and customizable messages. Perfect for
 * tournaments, games, presentations, or any time-sensitive applications.
 * 
 * @example
 * // Basic countdown timer
 * <Timer
 *   initialSeconds={300}
 *   onTimeUp={() => console.log("Time's up!")}
 * />
 * 
 * @example
 * // Tournament round timer with custom messages
 * <Timer
 *   initialSeconds={1800}
 *   size="lg"
 *   label="Round 1"
 *   overtimeMessage="Overtime!"
 *   lastMinuteMessage="Final Minute!"
 *   onTimeUp={handleRoundEnd}
 *   onTick={(seconds) => console.log(`${seconds}s remaining`)}
 * />
 * 
 * @example
 * // Controlled timer with pause
 * const [isPaused, setIsPaused] = useState(false);
 * 
 * <Timer
 *   initialSeconds={600}
 *   isPaused={isPaused}
 *   variant="neutral"
 *   showStatusMessages={false}
 * />
 * <button onClick={() => setIsPaused(!isPaused)}>
 *   {isPaused ? "Resume" : "Pause"}
 * </button>
 * 
 * @example
 * // Minimal timer without icon or messages
 * <Timer
 *   initialSeconds={120}
 *   size="sm"
 *   showIcon={false}
 *   showStatusMessages={false}
 *   variant="success"
 * />
 */
export function Timer({
  initialSeconds,
  onTimeUp,
  onTick,
  size = "md",
  variant: forcedVariant,
  label,
  overtimeMessage = "Overtime!",
  lastMinuteMessage = "Last Minute!",
  showIcon = true,
  showStatusMessages = true,
  autoStart = true,
  isPaused = false,
  className = "",
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const onTimeUpRef = useRef(onTimeUp);
  const onTickRef = useRef(onTick);

  // Update refs to avoid effect re-triggers on callback change
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
    onTickRef.current = onTick;
  }, [onTimeUp, onTick]);

  // Handle initialSeconds updates
  useEffect(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  // Main countdown logic
  useEffect(() => {
    if (!autoStart || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next === 0) onTimeUpRef.current?.();
        onTickRef.current?.(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoStart, isPaused]);

  // Automatic variant selection
  const variant: TimerVariant =
    forcedVariant ||
    (timeLeft < 0
      ? "overtime"
      : timeLeft <= 60
        ? "danger"
        : timeLeft <= 300
          ? "warning"
          : "success");

  const styles = variantMap[variant];
  const sizeConfig = sizeMap[size];

  return (
    <div
      className={`rounded-2xl border transition-all duration-500 shadow-sm ${styles.bg} ${styles.border} ${sizeConfig.container} ${className}`}
    >
      <div className="text-center flex flex-col items-center">
        <div className="flex items-center justify-center">
          {showIcon && (
            <>
              {timeLeft < 0 ? (
                <AlertTriangleIcon className={`mr-3 ${styles.text}`} size={sizeConfig.icon * 4} />
              ) : (
                <ClockIcon className={`mr-3 ${styles.text}`} size={sizeConfig.icon * 4} />
              )}
            </>
          )}
          <span
            className={`font-black tracking-tighter tabular-nums leading-none ${sizeConfig.text} ${styles.text}`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Dynamic Status Messages */}
        {showStatusMessages && (
          <div className="mt-2 min-h-6">
            {timeLeft < 0 ? (
              <p className="text-sm font-bold uppercase tracking-widest text-purple-600 animate-pulse">
                {overtimeMessage}
              </p>
            ) : timeLeft <= 60 ? (
              <p className="text-sm font-bold uppercase tracking-widest text-red-600 animate-pulse">
                {lastMinuteMessage}
              </p>
            ) : label ? (
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">{label}</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}