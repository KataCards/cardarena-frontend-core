"use client";
import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CountdownProps {
  /** Initial time in seconds */
  initialTime: number;
  /** Callback when countdown reaches zero */
  onComplete?: () => void;
  /** Callback on every tick (second) */
  onTick?: (timeLeft: number) => void;
  /** Show icon */
  showIcon?: boolean;
  /** Optional label text */
  label?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** Color variant */
  variant?: "default" | "danger" | "warning" | "success";
  /** Show status messages */
  showStatusMessages?: boolean;
  /** Custom message when time is up */
  overtimeMessage?: string;
  /** Custom message for last minute */
  lastMinuteMessage?: string;
  /** Additional CSS classes */
  className?: string;
}

const sizeConfig = {
  sm: { container: "p-3", text: "text-2xl", icon: 4 },
  md: { container: "p-4", text: "text-4xl", icon: 6 },
  lg: { container: "p-6", text: "text-6xl", icon: 8 },
  xl: { container: "p-8", text: "text-8xl", icon: 10 },
};

const variantStyles = {
  default: {
    bg: "bg-white",
    border: "border-gray-200",
    text: "text-gray-900",
  },
  danger: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-600",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-600",
  },
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
  },
};

/**
 * Countdown Component
 * 
 * A versatile countdown timer with multiple size and color variants,
 * status messages, and callbacks for completion and ticks.
 * 
 * @example
 * // Basic usage
 * <Countdown initialTime={300} />
 * 
 * @example
 * // With callbacks and custom messages
 * <Countdown 
 *   initialTime={60}
 *   onComplete={() => alert('Time is up!')}
 *   onTick={(time) => console.log(time)}
 *   showStatusMessages
 *   overtimeMessage="OVERTIME!"
 *   lastMinuteMessage="HURRY UP!"
 * />
 * 
 * @example
 * // Large danger variant
 * <Countdown 
 *   initialTime={120}
 *   size="lg"
 *   variant="danger"
 *   label="Time Remaining"
 * />
 */
export function Countdown({
  initialTime,
  onComplete,
  onTick,
  showIcon = true,
  label,
  size = "md",
  variant = "default",
  showStatusMessages = true,
  overtimeMessage = "TIME'S UP!",
  lastMinuteMessage = "FINAL MINUTE!",
  className,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        onTick?.(newTime);
        
        if (newTime === 0) {
          onComplete?.();
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete, onTick]);

  const formatTime = (seconds: number): string => {
    const absSeconds = Math.abs(seconds);
    const hours = Math.floor(absSeconds / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);
    const secs = absSeconds % 60;

    if (hours > 0) {
      return `${seconds < 0 ? "-" : ""}${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${seconds < 0 ? "-" : ""}${minutes}:${String(secs).padStart(2, "0")}`;
  };

  const styles = variantStyles[variant];
  const config = sizeConfig[size];

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-500 shadow-sm",
        styles.bg,
        styles.border,
        config.container,
        className
      )}
    >
      <div className="text-center flex flex-col items-center">
        <div className="flex items-center justify-center">
          {showIcon && (
            <>
              {timeLeft < 0 ? (
                <AlertTriangle className={cn("mr-3", styles.text)} size={config.icon * 4} />
              ) : (
                <Clock className={cn("mr-3", styles.text)} size={config.icon * 4} />
              )}
            </>
          )}
          <span
            className={cn(
              "font-bold tabular-nums leading-none",
              config.text,
              styles.text
            )}
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