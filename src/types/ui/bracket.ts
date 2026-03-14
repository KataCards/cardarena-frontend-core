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

/**
 * Props for the MatchCard component.
 */
export interface MatchCardProps {
  /** The match data to display */
  match: BracketMatch;
  /** Callback triggered when the card is clicked */
  onClick?: (id: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the BracketList component.
 */
export interface BracketListProps {
  /** List of matches to display in the grid */
  matches: BracketMatch[];
  /** Callback triggered when any match card is clicked */
  onMatchSelect?: (matchId: string) => void;
}

/**
 * Props for the WinnerModal component.
 */
export interface WinnerModalProps {
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Optional title for the modal */
  title?: string;
  /** List of options (player names) to choose from */
  options: string[];
  /** Callback triggered when an option is selected */
  onSelect: (option: string) => void;
  /** Callback triggered when the modal is closed without selection */
  onClose: () => void;
}
