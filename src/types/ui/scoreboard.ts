/**
 * Represents a single participant's score entry.
 */
export interface ScoreboardItem {
  /** Unique identifier for the participant */
  id: string;
  /** Current rank in the tournament */
  rank: number;
  /** Display name for the player */
  name: string;
  /** Optional username for additional identity */
  username?: string;
  /** Total points accumulated */
  points: number;
  /** Optional flag for special player status */
  isSpecial?: boolean;
}

/**
 * Props for the Scoreboard component.
 */
export interface ScoreboardProps {
  /** The title displayed at the top of the scoreboard */
  title?: string;
  /** Pre-sorted list of score entries */
  items: ScoreboardItem[];
  /** Optional summary stats displayed in the footer */
  footerStats?: {
    currentCount: number;
    maxCount: number;
  };
}
