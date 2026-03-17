export type BannerVariant = 'success' | 'warning' | 'info' | 'error' | 'neutral' | 'accent';

/**
 * Props for the StatusBanner component.
 */
export interface StatusBannerProps {
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
}