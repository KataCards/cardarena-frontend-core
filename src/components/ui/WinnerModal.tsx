"use client";

import * as React from "react";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";

/**
 * Props for the WinnerModal root component
 */
export interface WinnerModalRootProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Children components */
  children: React.ReactNode;
}

/**
 * Props for the WinnerModal content component
 */
export interface WinnerModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to show close button. @default false */
  showClose?: boolean;
}

/**
 * Props for the WinnerModal title component
 */
export interface WinnerModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * Props for the WinnerModal options container
 */
export interface WinnerModalOptionsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the WinnerModal option button
 */
export interface WinnerModalOptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon to display on the right side */
  icon?: React.ReactNode;
}

/**
 * Props for the WinnerModal cancel button
 */
export interface WinnerModalCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Props for the WinnerModal accent stripe
 */
export interface WinnerModalStripeProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * WinnerModal Root Component
 *
 * Container for the winner modal compound component system.
 * Built on top of the Dialog primitive.
 *
 * @example
 * <WinnerModal.Root open={isOpen} onOpenChange={setIsOpen}>
 *   <WinnerModal.Portal>
 *     <WinnerModal.Overlay />
 *     <WinnerModal.Content>
 *       <WinnerModal.Title>Select Winner</WinnerModal.Title>
 *       <WinnerModal.Options>
 *         <WinnerModal.Option onClick={() => handleSelect("Player 1")}>
 *           Player 1
 *         </WinnerModal.Option>
 *         <WinnerModal.Option onClick={() => handleSelect("Player 2")}>
 *           Player 2
 *         </WinnerModal.Option>
 *       </WinnerModal.Options>
 *       <WinnerModal.Cancel>Cancel</WinnerModal.Cancel>
 *       <WinnerModal.Stripe />
 *     </WinnerModal.Content>
 *   </WinnerModal.Portal>
 * </WinnerModal.Root>
 */
const WinnerModalRoot: React.FC<WinnerModalRootProps> = ({ open, onOpenChange, children }) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    {children}
  </Dialog.Root>
);
WinnerModalRoot.displayName = "WinnerModal.Root";

/**
 * WinnerModal Portal Component
 *
 * Renders children into a portal.
 * Alias for Dialog.Portal.
 */
const WinnerModalPortal = Dialog.Portal;
WinnerModalPortal.displayName = "WinnerModal.Portal";

/**
 * WinnerModal Overlay Component
 *
 * The backdrop behind the modal.
 * Alias for Dialog.Overlay with custom styling.
 */
const WinnerModalOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <Dialog.Overlay
      ref={ref}
      className={cn("backdrop-blur-md", className)}
      {...props}
    />
  )
);
WinnerModalOverlay.displayName = "WinnerModal.Overlay";

/**
 * WinnerModal Content Component
 *
 * The main modal container with winner modal styling.
 *
 * @example
 * <WinnerModal.Content>
 *   <WinnerModal.Title>Select Winner</WinnerModal.Title>
 *   <WinnerModal.Options>...</WinnerModal.Options>
 * </WinnerModal.Content>
 */
const WinnerModalContent = React.forwardRef<HTMLDivElement, WinnerModalContentProps>(
  ({ showClose = false, className, children, ...props }, ref) => (
    <Dialog.Content
      ref={ref}
      showClose={showClose}
      className={cn(
        "max-w-sm rounded-2xl p-0 overflow-hidden border-border",
        className
      )}
      {...props}
    >
      {children}
    </Dialog.Content>
  )
);
WinnerModalContent.displayName = "WinnerModal.Content";

/**
 * WinnerModal Title Component
 *
 * The bold, centered title for the winner modal.
 *
 * @example
 * <WinnerModal.Title>Select Winner</WinnerModal.Title>
 */
const WinnerModalTitle = React.forwardRef<HTMLHeadingElement, WinnerModalTitleProps>(
  ({ className, ...props }, ref) => (
    <Dialog.Title
      ref={ref}
      className={cn(
        "text-2xl font-black text-foreground tracking-tight text-center px-6 pt-6 pb-4",
        className
      )}
      {...props}
    />
  )
);
WinnerModalTitle.displayName = "WinnerModal.Title";

/**
 * WinnerModal Options Component
 *
 * Container for winner option buttons.
 * Provides consistent spacing.
 *
 * @example
 * <WinnerModal.Options>
 *   <WinnerModal.Option onClick={handleSelect}>Player 1</WinnerModal.Option>
 *   <WinnerModal.Option onClick={handleSelect}>Player 2</WinnerModal.Option>
 * </WinnerModal.Options>
 */
const WinnerModalOptions = React.forwardRef<HTMLDivElement, WinnerModalOptionsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-3 px-6 pb-4", className)}
      {...props}
    />
  )
);
WinnerModalOptions.displayName = "WinnerModal.Options";

/**
 * WinnerModal Option Component
 *
 * A button for selecting a winner option.
 * Styled as a large, full-width button with optional icon.
 *
 * @example
 * <WinnerModal.Option onClick={() => handleSelect("Player 1")}>
 *   Player 1
 * </WinnerModal.Option>
 *
 * @example
 * <WinnerModal.Option icon="🏆" onClick={() => handleSelect("Player 1")}>
 *   Player 1
 * </WinnerModal.Option>
 */
const WinnerModalOption = React.forwardRef<HTMLButtonElement, WinnerModalOptionProps>(
  ({ icon = "🏆", className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        // Base button styles from Button component
        "inline-flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm font-semibold",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        // Full width and large size
        "w-full",
        // Primary variant styles
        "bg-primary text-primary-foreground hover:bg-primary/90",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="opacity-50">{icon}</span>}
    </button>
  )
);
WinnerModalOption.displayName = "WinnerModal.Option";

/**
 * WinnerModal Cancel Component
 *
 * A text button for canceling the modal.
 * Styled as uppercase, tracked text.
 *
 * @example
 * <WinnerModal.Cancel>Cancel</WinnerModal.Cancel>
 */
const WinnerModalCancel = React.forwardRef<HTMLButtonElement, WinnerModalCancelProps>(
  ({ className, children = "Cancel", ...props }, ref) => (
    <Dialog.Close
      ref={ref}
      className={cn(
        "w-full text-center text-sm font-bold text-muted-foreground uppercase tracking-widest",
        "hover:text-primary transition-colors px-6 pb-6",
        className
      )}
      {...props}
    >
      {children}
    </Dialog.Close>
  )
);
WinnerModalCancel.displayName = "WinnerModal.Cancel";

/**
 * WinnerModal Stripe Component
 *
 * A decorative accent stripe at the bottom of the modal.
 * Uses primary color by default.
 *
 * @example
 * <WinnerModal.Stripe />
 *
 * @example
 * // Custom color
 * <WinnerModal.Stripe className="bg-green-600" />
 */
const WinnerModalStripe = React.forwardRef<HTMLDivElement, WinnerModalStripeProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("h-1.5 bg-primary", className)}
      aria-hidden="true"
      {...props}
    />
  )
);
WinnerModalStripe.displayName = "WinnerModal.Stripe";

/**
 * WinnerModal Compound Component System
 *
 * A specialized modal for winner selection built on the Dialog primitive.
 * Provides a beautiful, accessible UI for choosing from a list of options.
 *
 * Features:
 * - Built on Dialog primitive (portal, focus trap, keyboard support)
 * - Compound component pattern for flexibility
 * - Semantic color tokens (no hardcoded brand colors)
 * - Fully accessible (ARIA, keyboard, screen reader)
 * - Customizable styling
 * - Decorative accent stripe
 *
 * Design Philosophy:
 * - Composition over configuration
 * - Built on Dialog primitive for accessibility
 * - Flexible option rendering (not limited to strings)
 * - Semantic tokens for theming
 *
 * @example
 * // Basic winner selection
 * <WinnerModal.Root open={isOpen} onOpenChange={setIsOpen}>
 *   <WinnerModal.Portal>
 *     <WinnerModal.Overlay />
 *     <WinnerModal.Content>
 *       <WinnerModal.Title>Select Winner</WinnerModal.Title>
 *       <WinnerModal.Options>
 *         <WinnerModal.Option onClick={() => handleSelect("Player 1")}>
 *           Player 1
 *         </WinnerModal.Option>
 *         <WinnerModal.Option onClick={() => handleSelect("Player 2")}>
 *           Player 2
 *         </WinnerModal.Option>
 *       </WinnerModal.Options>
 *       <WinnerModal.Cancel />
 *       <WinnerModal.Stripe />
 *     </WinnerModal.Content>
 *   </WinnerModal.Portal>
 * </WinnerModal.Root>
 *
 * @example
 * // With custom icons and colors
 * <WinnerModal.Root open={isOpen} onOpenChange={setIsOpen}>
 *   <WinnerModal.Portal>
 *     <WinnerModal.Overlay />
 *     <WinnerModal.Content>
 *       <WinnerModal.Title>Round 1 Winner</WinnerModal.Title>
 *       <WinnerModal.Options>
 *         <WinnerModal.Option icon="👑" onClick={() => handleSelect("John")}>
 *           John Doe
 *         </WinnerModal.Option>
 *         <WinnerModal.Option icon="👑" onClick={() => handleSelect("Jane")}>
 *           Jane Smith
 *         </WinnerModal.Option>
 *       </WinnerModal.Options>
 *       <WinnerModal.Cancel>Close</WinnerModal.Cancel>
 *       <WinnerModal.Stripe className="bg-yellow-500" />
 *     </WinnerModal.Content>
 *   </WinnerModal.Portal>
 * </WinnerModal.Root>
 *
 * @example
 * // With subtitles (composition)
 * <WinnerModal.Root open={isOpen} onOpenChange={setIsOpen}>
 *   <WinnerModal.Portal>
 *     <WinnerModal.Overlay />
 *     <WinnerModal.Content>
 *       <WinnerModal.Title>Select Winner</WinnerModal.Title>
 *       <WinnerModal.Options>
 *         <WinnerModal.Option onClick={() => handleSelect("player1")}>
 *           <div className="flex flex-col items-start">
 *             <span className="font-bold">Player 1</span>
 *             <span className="text-xs opacity-70">Seed #1</span>
 *           </div>
 *         </WinnerModal.Option>
 *         <WinnerModal.Option onClick={() => handleSelect("player2")}>
 *           <div className="flex flex-col items-start">
 *             <span className="font-bold">Player 2</span>
 *             <span className="text-xs opacity-70">Seed #4</span>
 *           </div>
 *         </WinnerModal.Option>
 *       </WinnerModal.Options>
 *       <WinnerModal.Cancel />
 *       <WinnerModal.Stripe />
 *     </WinnerModal.Content>
 *   </WinnerModal.Portal>
 * </WinnerModal.Root>
 */
export const WinnerModal = {
  Root: WinnerModalRoot,
  Portal: WinnerModalPortal,
  Overlay: WinnerModalOverlay,
  Content: WinnerModalContent,
  Title: WinnerModalTitle,
  Options: WinnerModalOptions,
  Option: WinnerModalOption,
  Cancel: WinnerModalCancel,
  Stripe: WinnerModalStripe,
};