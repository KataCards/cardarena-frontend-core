/**
 * Represents a single ranked item in the list.
 */
export interface RankedItem {
  /** Unique identifier for the item */
  id: string;
  /** Current rank position */
  rank: number;
  /** Primary display text */
  label: string;
  /** Optional secondary text (e.g., username, subtitle) */
  sublabel?: string;
  /** Primary metric value */
  value: number;
  /** Optional label for the metric (e.g., "Points", "Score", "Wins") */
  valueLabel?: string;
  /** Optional icon component to display */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional custom styling for this item */
  className?: string;
}

/**
 * Props for the RankedList component.
 */
export interface RankedListProps {
  /** Array of ranked items to display */
  items: RankedItem[];
  /** Optional heading text for the list */
  title?: string;
  /** Optional icon component for the title */
  titleIcon?: React.ComponentType<{ className?: string }>;
  /** Default label for metric values when not specified per item */
  defaultValueLabel?: string;
  /** Message to display when list is empty */
  emptyMessage?: string;
  /** Maximum height before scrolling (e.g., "400px", "96") */
  maxHeight?: string;
  /** Optional footer content */
  footer?: React.ReactNode;
}