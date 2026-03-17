export interface Stat {
  /** The primary metric value (e.g., "1000+", "24/7", "99%") */
  value: string;
  /** Descriptive label for the metric */
  label: string;
  /** Optional icon component to display above the value */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional highlight color variant */
  variant?: "default" | "primary" | "success" | "info";
}