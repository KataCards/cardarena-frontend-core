export type BracketMatchStatus = "pending" | "completed" | "draw";

export interface BracketMatchPlayer {
  /** Display name for the player */
  name: string;
  /** Whether this player won the match */
  isWinner?: boolean;
  /** Whether this player lost the match */
  isLoser?: boolean;
}

/**
 * Normalized match shape used by the bracket and match-card layer.
 */
export interface BracketMatch {
  /** Unique identifier for the match */
  id: string;
  /** Table number where the match is being played */
  tableNumber: number;
  /** Optional round number */
  round?: number;
  /** Current status of the match */
  status: BracketMatchStatus;
  /** Optional readable status label */
  statusLabel?: string;
  /** Players participating in the match */
  players: readonly BracketMatchPlayer[];
  /** Winner name when the result is known */
  winner?: string;
}

export interface BattleMatchTeam {
  /** Unique identifier for the team */
  id: string;
  /** Optional team label */
  name?: string;
  /** Players participating on the team */
  players: readonly BracketMatchPlayer[];
  /** Optional team score or result marker */
  score?: number | string;
  /** Whether this team won the battle */
  isWinner?: boolean;
}

/**
 * Team-based match shape for battles beyond 1v1.
 * Supports 2v2, 3v3, or multi-team battles without changing the card API.
 */
export interface BattleMatch {
  /** Unique identifier for the battle */
  id: string;
  /** Table number where the battle is being played */
  tableNumber: number;
  /** Optional round number */
  round?: number;
  /** Current status of the battle */
  status: BracketMatchStatus;
  /** Optional readable status label */
  statusLabel?: string;
  /** Teams participating in the battle */
  teams: readonly [BattleMatchTeam, BattleMatchTeam, ...BattleMatchTeam[]];
  /** Winner team id when the result is known */
  winnerTeamId?: string;
}
