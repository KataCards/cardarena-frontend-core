import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchInput, type SearchInputProps } from "@/components/ui/SearchInput";
import { cn } from "@/lib/utils";

export interface EmptyResultsStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled search value */
  query: string;
  /** Callback when the search query changes */
  onQueryChange: (value: string) => void;
  /** Empty state title */
  title?: string;
  /** Empty state description */
  description?: string;
  /** Optional reset callback */
  onReset?: () => void;
  /** Optional custom reset label */
  resetLabel?: string;
  /** Optional action content shown below the message */
  actions?: React.ReactNode;
  /** Optional search input placeholder */
  placeholder?: string;
  /** Accessible label for the search input */
  searchLabel?: string;
  /** Additional props passed to SearchInput */
  searchInputProps?: Omit<SearchInputProps, "value" | "onChange" | "placeholder">;
}

/**
 * EmptyResultsState
 *
 * A composed search-empty pattern for filtered tables, lists, and dashboards.
 */
export const EmptyResultsState = React.forwardRef<HTMLDivElement, EmptyResultsStateProps>(
  (
    {
      query,
      onQueryChange,
      title = "No results found",
      description = "Try adjusting your search or filters to find what you're looking for.",
      onReset,
      resetLabel = "Clear search",
      actions,
      placeholder = "Search...",
      searchLabel,
      searchInputProps,
      className,
      ...props
    },
    ref
  ) => (
    <div ref={ref} className={cn("space-y-6", className)} {...props}>
      <div className="mx-auto max-w-md">
        <SearchInput
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          aria-label={searchLabel ?? `Search ${title}`}
          {...searchInputProps}
        />
      </div>

      <EmptyState.Root className="rounded-2xl border border-dashed border-border bg-muted/20">
        <EmptyState.Icon icon={Search} />
        <EmptyState.Title>{title}</EmptyState.Title>
        <EmptyState.Description>{description}</EmptyState.Description>
        {(onReset || actions) ? (
          <EmptyState.Actions>
            {onReset ? (
              <Button type="button" variant="outline" size="sm" onClick={onReset}>
                {resetLabel}
              </Button>
            ) : null}
            {actions}
          </EmptyState.Actions>
        ) : null}
      </EmptyState.Root>
    </div>
  )
);

EmptyResultsState.displayName = "EmptyResultsState";
