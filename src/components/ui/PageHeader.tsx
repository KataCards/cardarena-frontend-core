import { forwardRef, HTMLAttributes, createElement } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Props for the PageHeader root component
 */
export interface PageHeaderProps extends HTMLAttributes<HTMLElement> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the PageHeaderHeading component
 */
export interface PageHeaderHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level. @default "h1" */
  as?: HeadingLevel;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the PageHeaderDescription component
 */
export interface PageHeaderDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the PageHeaderContent component
 */
export interface PageHeaderContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the PageHeaderActions component
 */
export interface PageHeaderActionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes */
  className?: string;
}

/**
 * PageHeader Component
 *
 * A flexible, composable page header system using the Compound Component pattern.
 * Provides semantic sub-components for building complex page headers without prop soup.
 *
 * Features:
 * - Responsive layout (stacks on mobile, horizontal on desktop)
 * - Composable sub-components for maximum flexibility
 * - Semantic HTML with proper heading hierarchy
 * - No hardcoded spacing or colors
 * - ForwardRef support
 *
 * @param props - PageHeader configuration
 * @param ref - Forwarded ref to the header element
 * @returns The rendered header element
 *
 * @example
 * // Simple header
 * <PageHeader>
 *   <PageHeaderHeading>Dashboard</PageHeaderHeading>
 * </PageHeader>
 *
 * @example
 * // Complex header with description and actions
 * <PageHeader>
 *   <div>
 *     <PageHeaderHeading>Tournament Details</PageHeaderHeading>
 *     <PageHeaderDescription>
 *       Manage brackets and participants.
 *     </PageHeaderDescription>
 *   </div>
 *   <PageHeaderActions>
 *     <Button variant="outline">Export</Button>
 *     <Button>Add Player</Button>
 *   </PageHeaderActions>
 * </PageHeader>
 */
export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
        className
      )}
      {...props}
    />
  )
);
PageHeader.displayName = "PageHeader";

/**
 * PageHeaderHeading Component
 *
 * Renders a semantic heading element with consistent typography.
 * Supports all heading levels (h1-h6) via the `as` prop.
 *
 * @param props - Heading configuration
 * @param ref - Forwarded ref to the heading element
 * @returns The rendered heading element
 *
 * @example
 * <PageHeaderHeading>Page Title</PageHeaderHeading>
 *
 * @example
 * // As h2 for sub-sections
 * <PageHeaderHeading as="h2">Section Title</PageHeaderHeading>
 */
export const PageHeaderHeading = forwardRef<HTMLHeadingElement, PageHeaderHeadingProps>(
  ({ as: Comp = "h1", className, ...props }, ref) =>
    createElement(Comp, {
      ref,
      className: cn("text-3xl font-bold text-foreground tracking-tight", className),
      ...props,
    })
);
PageHeaderHeading.displayName = "PageHeaderHeading";

/**
 * PageHeaderDescription Component
 *
 * Renders a description or subtitle below the heading.
 * Uses muted text color for visual hierarchy.
 *
 * @param props - Description configuration
 * @param ref - Forwarded ref to the paragraph element
 * @returns The rendered description element
 *
 * @example
 * <PageHeaderDescription>
 *   Manage your account settings and preferences.
 * </PageHeaderDescription>
 */
export const PageHeaderDescription = forwardRef<HTMLParagraphElement, PageHeaderDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground mt-1", className)}
      {...props}
    />
  )
);
PageHeaderDescription.displayName = "PageHeaderDescription";

/**
 * PageHeaderContent Component
 *
 * A wrapper for heading and description to keep them grouped together.
 * Prevents layout breaks when heading and description are not wrapped.
 * Useful for ensuring the title/description block stays together on responsive layouts.
 *
 * @param props - Content configuration
 * @param ref - Forwarded ref to the div element
 * @returns The rendered content wrapper
 *
 * @example
 * <PageHeader>
 *   <PageHeaderContent>
 *     <PageHeaderHeading>Title</PageHeaderHeading>
 *     <PageHeaderDescription>Description</PageHeaderDescription>
 *   </PageHeaderContent>
 *   <PageHeaderActions>
 *     <Button>Action</Button>
 *   </PageHeaderActions>
 * </PageHeader>
 */
export const PageHeaderContent = forwardRef<HTMLDivElement, PageHeaderContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
);
PageHeaderContent.displayName = "PageHeaderContent";

/**
 * PageHeaderActions Component
 *
 * A flex container for action buttons or other interactive elements.
 * Automatically handles responsive layout and spacing.
 * Mobile-safe with flex-wrap to prevent button overflow on small screens.
 *
 * @param props - Actions configuration
 * @param ref - Forwarded ref to the div element
 * @returns The rendered actions container
 *
 * @example
 * <PageHeaderActions>
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Save Changes</Button>
 * </PageHeaderActions>
 */
export const PageHeaderActions = forwardRef<HTMLDivElement, PageHeaderActionsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-wrap items-center gap-2 w-full sm:w-auto", className)}
      {...props}
    />
  )
);
PageHeaderActions.displayName = "PageHeaderActions";