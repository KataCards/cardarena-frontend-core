/**
 * Represents a single player in a match.
 */
export interface MatchPlayer {
  /** Display name for the player */
  name: string;
  /** True if the player won the match */
  isWinner?: boolean;
  /** True if the player lost the match */
  isLoser?: boolean;
}

/**
 * Represents a single match item.
 */
export interface MatchItem {
  /** Unique identifier for the match */
  id: string;
  /** Table number where the match is being played */
  tableNumber: number;
  /** Current status of the match */
  status: 'pending' | 'completed' | 'draw';
  /** Readable text label for the status */
  statusLabel: string;
  /** First player in the match */
  player1: MatchPlayer;
  /** Second player in the match */
  player2: MatchPlayer;
}

/**
 * Props for the MatchGrid component.
 */
export interface MatchGridProps {
  /** List of matches to display in the grid */
  matches: MatchItem[];
  /** Optional message displayed when the grid is empty */
  emptyMessage?: string;
  /** Optional secondary empty message subtext */
  emptySubtext?: string;
}
