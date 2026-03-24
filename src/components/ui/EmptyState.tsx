import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the EmptyState root component
 */
export interface EmptyStateRootProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the EmptyState icon component
 */
export interface EmptyStateIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon component to display */
  icon?: React.ElementType;
  /** Icon size. @default 48 */
  size?: number;
}

/**
 * Props for the EmptyState title component
 */
export interface EmptyStateTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level. @default "h3" */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Props for the EmptyState description component
 */
export interface EmptyStateDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Props for the EmptyState actions component
 */
export interface EmptyStateActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * EmptyState Root Component
 *
 * Container for the empty state compound component system.
 *
 * @example
 * <EmptyState.Root>
 *   <EmptyState.Icon icon={Inbox} />
 *   <EmptyState.Title>No messages</EmptyState.Title>
 *   <EmptyState.Description>
 *     You don't have any messages yet.
 *   </EmptyState.Description>
 *   <EmptyState.Actions>
 *     <Button>Create Message</Button>
 *   </EmptyState.Actions>
 * </EmptyState.Root>
 */
const EmptyStateRoot = React.forwardRef<HTMLDivElement, EmptyStateRootProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col items-center justify-center text-center py-12 px-4", className)}
      role="status"
      aria-live="polite"
      {...props}
    />
  )
);
EmptyStateRoot.displayName = "EmptyState.Root";

/**
 * EmptyState Icon Component
 *
 * Displays an icon for the empty state.
 * Uses muted colors by default.
 *
 * @example
 * import { Inbox } from "lucide-react";
 * <EmptyState.Icon icon={Inbox} />
 *
 * @example
 * <EmptyState.Icon icon={Inbox} size={64} />
 */
const EmptyStateIcon = React.forwardRef<HTMLDivElement, EmptyStateIconProps>(
  ({ icon: Icon, size = 48, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-4 text-muted-foreground", className)}
      aria-hidden="true"
      {...props}
    >
      {Icon ? <Icon size={size} className="mx-auto" /> : children}
    </div>
  )
);
EmptyStateIcon.displayName = "EmptyState.Icon";

/**
 * EmptyState Title Component
 *
 * The main heading for the empty state.
 *
 * @example
 * <EmptyState.Title>No results found</EmptyState.Title>
 *
 * @example
 * <EmptyState.Title as="h2">Empty Inbox</EmptyState.Title>
 */
const EmptyStateTitle = React.forwardRef<HTMLHeadingElement, EmptyStateTitleProps>(
  ({ as: Comp = "h3", className, ...props }, ref) =>
    React.createElement(Comp, {
      ref,
      className: cn("text-lg font-semibold text-foreground mb-2", className),
      ...props,
    })
);
EmptyStateTitle.displayName = "EmptyState.Title";

/**
 * EmptyState Description Component
 *
 * Supporting text for the empty state.
 *
 * @example
 * <EmptyState.Description>
 *   Try adjusting your search or filter to find what you're looking for.
 * </EmptyState.Description>
 */
const EmptyStateDescription = React.forwardRef<HTMLParagraphElement, EmptyStateDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground mb-6 max-w-sm", className)}
      {...props}
    />
  )
);
EmptyStateDescription.displayName = "EmptyState.Description";

/**
 * EmptyState Actions Component
 *
 * Container for action buttons or links.
 *
 * @example
 * <EmptyState.Actions>
 *   <Button>Create New</Button>
 *   <Button variant="outline">Learn More</Button>
 * </EmptyState.Actions>
 */
const EmptyStateActions = React.forwardRef<HTMLDivElement, EmptyStateActionsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-2 flex-wrap", className)}
      {...props}
    />
  )
);
EmptyStateActions.displayName = "EmptyState.Actions";

/**
 * EmptyState Compound Component System
 *
 * A flexible empty state component for displaying "no content" scenarios.
 * Uses semantic theme tokens for consistent theming.
 *
 * Features:
 * - Compound component pattern for flexibility
 * - Semantic color tokens (no hardcoded colors)
 * - ForwardRef support on all components
 * - Accessible by default (role="status", aria-live)
 * - Flexible icon support
 * - Customizable heading levels
 *
 * Design Philosophy:
 * - Composition over configuration
 * - Uses semantic theme tokens for all colors
 * - Accessible by default
 * - Flexible layout and styling
 *
 * @example
 * // Basic empty state
 * import { Inbox } from "lucide-react";
 * <EmptyState.Root>
 *   <EmptyState.Icon icon={Inbox} />
 *   <EmptyState.Title>No messages</EmptyState.Title>
 *   <EmptyState.Description>
 *     You don't have any messages yet.
 *   </EmptyState.Description>
 * </EmptyState.Root>
 *
 * @example
 * // With actions
 * import { Search } from "lucide-react";
 * <EmptyState.Root>
 *   <EmptyState.Icon icon={Search} size={64} />
 *   <EmptyState.Title>No results found</EmptyState.Title>
 *   <EmptyState.Description>
 *     Try adjusting your search or filter to find what you're looking for.
 *   </EmptyState.Description>
 *   <EmptyState.Actions>
 *     <Button onClick={clearFilters}>Clear Filters</Button>
 *     <Button variant="outline" onClick={resetSearch}>Reset Search</Button>
 *   </EmptyState.Actions>
 * </EmptyState.Root>
 *
 * @example
 * // Custom icon (not from lucide)
 * <EmptyState.Root>
 *   <EmptyState.Icon>
 *     <img src="/empty-box.svg" alt="" className="w-16 h-16" />
 *   </EmptyState.Icon>
 *   <EmptyState.Title>Empty Cart</EmptyState.Title>
 *   <EmptyState.Description>
 *     Your shopping cart is empty. Add some items to get started!
 *   </EmptyState.Description>
 *   <EmptyState.Actions>
 *     <Button href="/shop">Browse Products</Button>
 *   </EmptyState.Actions>
 * </EmptyState.Root>
 */
export const EmptyState = {
  Root: EmptyStateRoot,
  Icon: EmptyStateIcon,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Actions: EmptyStateActions,
};