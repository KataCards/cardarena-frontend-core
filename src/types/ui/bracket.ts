/**
 * Represents a single match in the tournament bracket.
 */
export interface BracketMatch {
  /** Unique match identifier */
  id: string;
  /** Round number for the match */
  round: number;
  /** Table number for the match */
  tableNumber: number;
  /** List of player names competing in the match */
  players: string[];
  /** Optional name of the winner if the match is complete */
  winner?: string;
  /** Current status of the match */
  status: 'pending' | 'completed';
}
