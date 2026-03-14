export type BannerVariant = 'success' | 'warning' | 'info' | 'error' | 'neutral' | 'accent';

export type BannerIcon = 'play' | 'pause' | 'check' | 'clock' | 'settings' | 'alert';

/**
 * Props for the RoundBanner component.
 */
export interface RoundBannerProps {
  /** Tournament status display info */
  tournamentStatus: {
    label: string;
    value: string;
    variant: BannerVariant;
  };
  /** Optional current round info */
  roundInfo?: {
    number: number;
    statusLabel: string;
    iconName: BannerIcon;
  };
  /** Participant occupancy info */
  participants: {
    current: number;
    max: number;
  };
  /** The primary status message for the footer */
  mainMessage: string;
  /** Optional list of supporting messages with icons */
  subMessages?: Array<{
    text: string;
    iconName: BannerIcon;
  }>;
  /** Overall visual style variant for the banner */
  variant: BannerVariant;
}
