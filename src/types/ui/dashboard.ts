/**
 * Serializable summary of a tournament for dashboard cards.
 */
export interface TournamentSummary {
  /** Unique identifier */
  id: string;
  /** Display name of the tournament */
  name: string;
  /** Current state (e.g., 'running', 'planned') */
  state: 'running' | 'registration' | 'planned' | 'finished' | 'cancelled';
  /** Human-readable state text */
  stateLabel: string;
  /** Physical or virtual location */
  location: string;
  /** Formatted date string */
  dateLabel: string;
  /** Current number of joined players */
  currentPlayers: number;
  /** Maximum capacity */
  maxPlayers: number;
  /** Name of the card game being played */
  gameName: string;
}

/**
 * Definition for a quick action button.
 */
export interface QuickActionItem {
  /** Display label */
  title: string;
  /** Target navigation URL */
  href: string;
  /** Icon component to display (e.g., from lucide-react) */
  icon: React.ComponentType<{ className?: string }>;
  /** CSS background color class */
  colorClass: string;
}