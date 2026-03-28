"use client";

import { useState, useEffect, useRef } from "react";
import { ClockIcon, AlertTriangleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Visual variants for the Countdown based on remaining time.
 */
export type CountdownVariant = "success" | "warning" | "danger" | "overtime" | "neutral" | "default";

/**
 * Size presets for the Countdown.
 */
export type CountdownSize = "sm" | "md" | "lg" | "xl";

export interface CountdownProps {
  /** Initial time in seconds */
  initialSeconds: number;
  /** Optional callback when Countdown reaches zero */
  onTimeUp?: () => void;
  /** Optional callback on every tick */
  onTick?: (secondsLeft: number) => void;
  /** The scale of the Countdown component */
  size?: CountdownSize;
  /** Overrides the automatic color logic */
  variant?: CountdownVariant;
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
  /** Whether Countdown should auto-start */
  autoStart?: boolean;
  /** Whether Countdown is paused */
  isPaused?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const sizeMap: Record<CountdownSize, { text: string; icon: number; container: string }> = {
  sm: { text: "text-2xl", icon: 16, container: "p-2" },
  md: { text: "text-4xl", icon: 24, container: "p-4" },
  lg: { text: "text-6xl", icon: 32, container: "p-6" },
  xl: { text: "text-8xl", icon: 40, container: "p-8" },
};

const variantMap: Record<CountdownVariant, { text: string; bg: string; border: string }> = {
  success: { text: "text-success", bg: "bg-success/10", border: "border-success/20" },
  warning: { text: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  danger: { text: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  overtime: { text: "text-info", bg: "bg-info/10", border: "border-info/20" },
  neutral: { text: "text-muted-foreground", bg: "bg-muted", border: "border-border" },
  default: { text: "text-foreground", bg: "bg-background", border: "border-border" },
};

/**
 * Format seconds into a MM:SS or HH:MM:SS string.
 */
function formatTime(seconds: number): string {
  const abs = Math.abs(seconds);
  const hours = Math.floor(abs / 3600);
  const mins = Math.floor((abs % 3600) / 60);
  const secs = abs % 60;
  
  const prefix = seconds < 0 ? '-\u200A' : '';
  
  if (hours > 0) {
    return `${prefix}${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${prefix}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Countdown
 * 
 * A flexible countdown Countdown component with automatic color transitions,
 * pause/resume functionality, and customizable messages.
 */
export function Countdown({
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
  className,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const onTimeUpRef = useRef(onTimeUp);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
    onTickRef.current = onTick;
  }, [onTimeUp, onTick]);

  useEffect(() => {
    setTimeLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!autoStart || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (prev > 0 && next <= 0) onTimeUpRef.current?.();
        onTickRef.current?.(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoStart, isPaused]);

  const variant: CountdownVariant =
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

  const isOvertimeOrWarning = timeLeft < 0 || timeLeft <= 60;

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-500 shadow-sm",
        styles.bg,
        styles.border,
        sizeConfig.container,
        className
      )}
      role="timer"
      aria-label={label ? `${label}: ${formatTime(timeLeft)}` : `Countdown: ${formatTime(timeLeft)}`}
      aria-live={isOvertimeOrWarning ? "polite" : "off"}
      aria-atomic="true"
    >
      <div className="text-center flex flex-col items-center">
        <div className="flex items-center justify-center">
          {showIcon && (
            <>
              {timeLeft < 0 ? (
                <AlertTriangleIcon className={cn("mr-3", styles.text)} size={sizeConfig.icon} />
              ) : (
                <ClockIcon className={cn("mr-3", styles.text)} size={sizeConfig.icon} />
              )}
            </>
          )}
          <span
            className={cn(
              "font-bold tabular-nums leading-none",
              sizeConfig.text,
              styles.text
            )}
            aria-label={`${formatTime(timeLeft)} remaining`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>

        {showStatusMessages && (
          <div className="mt-2 min-h-6">
            {timeLeft < 0 ? (
              <p className={cn("text-sm font-bold uppercase tracking-widest animate-pulse", styles.text)}>
                {overtimeMessage}
              </p>
            ) : timeLeft <= 60 ? (
              <p className={cn("text-sm font-bold uppercase tracking-widest animate-pulse", styles.text)}>
                {lastMinuteMessage}
              </p>
            ) : label ? (
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{label}</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}