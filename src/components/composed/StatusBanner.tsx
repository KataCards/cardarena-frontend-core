import * as React from "react";
import { cn } from "@/lib/utils";

export type BannerVariant = "success" | "warning" | "info" | "error" | "neutral" | "accent";

type StatusBannerHeading = "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Props for the StatusBanner component.
 */
export interface StatusBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Primary status display info */
  primaryStatus: {
    label: string;
    value: string;
    variant: BannerVariant;
  };
  /** Optional center section info (e.g., round, phase, stage) */
  centerInfo?: {
    label: string;
    value: string | number;
    statusLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    animateIcon?: boolean;
    formatValue?: (value: string | number) => React.ReactNode;
  };
  /** Secondary status display info (e.g., participants, capacity, slots) */
  secondaryStatus: {
    label: string;
    current: number;
    max: number;
  };
  /** The primary status message for the footer */
  mainMessage: string;
  /** Optional list of supporting messages with icons */
  subMessages?: Array<{
    text: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  /** Overall visual style variant for the banner */
  variant: BannerVariant;
  /** Semantic heading level for section labels. @default "h3" */
  as?: StatusBannerHeading;
}

const containerStyles: Record<
  BannerVariant,
  { shell: string; accent: string; chip: string }
> = {
  success: {
    shell: "border-success/30 bg-success/10 text-success",
    accent: "text-success",
    chip: "border-success/20 bg-background/80 text-success",
  },
  warning: {
    shell: "border-warning/30 bg-warning/10 text-warning",
    accent: "text-warning",
    chip: "border-warning/20 bg-background/80 text-warning",
  },
  info: {
    shell: "border-info/30 bg-info/10 text-info",
    accent: "text-info",
    chip: "border-info/20 bg-background/80 text-info",
  },
  error: {
    shell: "border-destructive/30 bg-destructive/10 text-destructive",
    accent: "text-destructive",
    chip: "border-destructive/20 bg-background/80 text-destructive",
  },
  neutral: {
    shell: "border-border bg-muted/40 text-foreground",
    accent: "text-foreground",
    chip: "border-border bg-background/80 text-foreground",
  },
  accent: {
    shell: "border-primary/30 bg-primary/10 text-primary",
    accent: "text-primary",
    chip: "border-primary/20 bg-background/80 text-primary",
  },
};

/**
 * StatusBanner
 *
 * A flexible, stateless informational banner for displaying multi-part status information.
 * Perfect for tournaments, events, sessions, or any scenario requiring primary/secondary
 * status display with optional center information and supporting messages.
 */
export function StatusBanner({
  primaryStatus,
  centerInfo,
  secondaryStatus,
  mainMessage,
  subMessages,
  variant,
  as = "h3",
  className,
  ...props
}: StatusBannerProps) {
  const Heading = as;
  const styles = containerStyles[variant];
  const primaryStyles = containerStyles[primaryStatus.variant];
  const formatCenterValue = centerInfo?.formatValue ?? ((value: string | number) =>
    typeof value === "number" ? `#${value}` : value
  );

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "rounded-2xl border p-6 shadow-sm backdrop-blur-sm transition-all duration-500",
        styles.shell,
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <Heading className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {primaryStatus.label}
          </Heading>
          <p className={cn("text-2xl font-black", primaryStyles.accent)}>
            {primaryStatus.value}
          </p>
        </div>

        {centerInfo ? (
          <div className="flex items-center gap-4 rounded-xl border border-border/80 bg-background/70 px-6 py-3">
            <div className="text-center">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {centerInfo.label}
              </div>
              <p className="text-3xl font-black leading-none text-foreground">
                {formatCenterValue(centerInfo.value)}
              </p>
            </div>
            <div className="h-10 w-px bg-border" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <centerInfo.icon
                className={cn("h-8 w-8 text-foreground", centerInfo.animateIcon && "animate-spin")}
                aria-hidden="true"
              />
              <p className="text-lg font-bold text-foreground">{centerInfo.statusLabel}</p>
            </div>
          </div>
        ) : null}

        <div className="text-center md:text-right">
          <div className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {secondaryStatus.label}
          </div>
          <p className="text-3xl font-black leading-none text-foreground">
            {secondaryStatus.current}
            <span className="ml-1 text-lg font-medium text-muted-foreground">
              /{secondaryStatus.max}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-border/80 pt-6">
        <div className="text-center">
          <p className="mb-4 text-2xl font-black tracking-tight text-foreground">
            {mainMessage}
          </p>

          {subMessages && subMessages.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {subMessages.map((msg) => (
                <div
                  key={msg.text}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-bold",
                    styles.chip
                  )}
                >
                  <msg.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
