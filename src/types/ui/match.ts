import type { BracketMatchStatus } from "@/types/ui/bracket";

export interface MatchItemPlayer {
  /** Display name for the player */
  name: string;
  /** Whether this player won the match */
  isWinner?: boolean;
  /** Whether this player lost the match */
  isLoser?: boolean;
}

/**
 * Legacy match input shape that is normalized before rendering.
 */
export interface MatchItem {
  /** Unique identifier for the match */
  id: string;
  /** Table number where the match is being played */
  tableNumber: number;
  /** Current status of the match */
  status: BracketMatchStatus;
  /** Readable text label for the status */
  statusLabel: string;
  /** First player in the match */
  player1: MatchItemPlayer;
  /** Second player in the match */
  player2: MatchItemPlayer;
  /** Optional round number */
  round?: number;
}
