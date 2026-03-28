"use client";

import * as React from "react";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";

/**
 * Props for the Modal component
 */
export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Whether the modal is in a loading state */
  loading?: boolean;
  /** Custom class for the content container (targets Dialog.Content element) */
  className?: string;
  /** Custom class for the overlay/backdrop */
  overlayClassName?: string;
  /** Whether to show the close button. @default true */
  showClose?: boolean;
  /** Children components */
  children: React.ReactNode;
}

/**
 * Props for Modal.Header
 */
export type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Props for Modal.Title
 */
export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level. @default "h2" */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Props for Modal.Description
 */
export interface ModalDescriptionProps extends React.HTMLAttributes<HTMLElement> {
  /** Element type to render as. @default "p" */
  as?: "p" | "div" | "span";
}

/**
 * Props for Modal.Footer
 */
export type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Modal Component
 *
 * A composable modal primitive that wraps Dialog.Root, Dialog.Portal, Dialog.Overlay,
 * and Dialog.Content into a single component. Provides automatic loading state handling
 * and consistent backdrop blur across all modals.
 *
 * Features:
 * - Automatic loading state management (disables close on overlay click, escape, and close button)
 * - Backdrop blur with low-opacity background (content remains visible but defocused)
 * - Named slot components for consistent structure
 * - No domain-specific props (icon, message, confirmText, etc.)
 * - Built on Dialog primitive for full accessibility
 *
 * Design Philosophy:
 * - Single source of truth for modal behavior
 * - Loading interlock handled automatically
 * - Composition over configuration
 * - No modal should touch Dialog API directly
 *
 * @example
 * // Basic modal
 * <Modal open={isOpen} onOpenChange={setIsOpen}>
 *   <Modal.Header>
 *     <Modal.Title>Delete Account</Modal.Title>
 *     <Modal.Description>This action cannot be undone.</Modal.Description>
 *   </Modal.Header>
 *   <Modal.Footer className="justify-end">
 *     <Button variant="ghost">Cancel</Button>
 *     <Button variant="solid" colorScheme="red">Delete</Button>
 *   </Modal.Footer>
 * </Modal>
 *
 * @example
 * // With loading state
 * <Modal open={isOpen} onOpenChange={setIsOpen} loading={isDeleting}>
 *   <Modal.Header>
 *     <Modal.Title>Deleting...</Modal.Title>
 *   </Modal.Header>
 *   <Modal.Footer className="justify-end">
 *     <Button disabled>Cancel</Button>
 *     <Button disabled>Delete</Button>
 *   </Modal.Footer>
 * </Modal>
 *
 * @example
 * // Without close button
 * <Modal open={isOpen} onOpenChange={setIsOpen} showClose={false}>
 *   <Modal.Header>
 *     <Modal.Title>Important Notice</Modal.Title>
 *   </Modal.Header>
 *   <Modal.Footer className="justify-end">
 *     <Button>Acknowledge</Button>
 *   </Modal.Footer>
 * </Modal>
 *
 * @example
 * // Custom backdrop blur for high-focus modals
 * <Modal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   overlayClassName="backdrop-blur-md"
 * >
 *   <Modal.Header>
 *     <Modal.Title>Winner Selected!</Modal.Title>
 *   </Modal.Header>
 *   <Modal.Footer className="justify-center">
 *     <Button>Continue</Button>
 *   </Modal.Footer>
 * </Modal>
 *
 * @example
 * // Description with structured content (maintains ARIA linkage)
 * <Modal open={isOpen} onOpenChange={setIsOpen}>
 *   <Modal.Header>
 *     <Modal.Title>Requirements</Modal.Title>
 *     <Modal.Description as="div">
 *       <ul className="list-disc pl-4 space-y-1">
 *         <li>Must be 18 years or older</li>
 *         <li>Valid email address required</li>
 *       </ul>
 *     </Modal.Description>
 *   </Modal.Header>
 *   <Modal.Footer className="justify-end">
 *     <Button>Accept</Button>
 *   </Modal.Footer>
 * </Modal>
 */
const ModalRoot = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onOpenChange,
      loading = false,
      className,
      overlayClassName,
      showClose = true,
      children,
    },
    ref
  ) => {
    // When loading, disable all close mechanisms
    const closeOnOverlayClick = !loading;
    const closeOnEscape = !loading;
    const showCloseButton = showClose && !loading;

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay
            closeOnClick={closeOnOverlayClick}
            className={cn("bg-black/30 backdrop-blur-sm", overlayClassName)}
          />
          <Dialog.Content
            ref={ref}
            showClose={showCloseButton}
            closeOnOverlayClick={closeOnOverlayClick}
            closeOnEscape={closeOnEscape}
            className={className}
          >
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);
ModalRoot.displayName = "Modal";

/**
 * Modal.Header Component
 *
 * Container for title and description.
 * Maps directly to Dialog.Header.
 *
 * @example
 * <Modal.Header>
 *   <Modal.Title>Delete Account</Modal.Title>
 *   <Modal.Description>This cannot be undone.</Modal.Description>
 * </Modal.Header>
 */
const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => (
    <Dialog.Header ref={ref} className={className} {...props} />
  )
);
ModalHeader.displayName = "Modal.Header";

/**
 * Modal.Title Component
 *
 * The main heading for the modal.
 * Maps directly to Dialog.Title.
 *
 * @example
 * <Modal.Title>Confirm Action</Modal.Title>
 *
 * @example
 * <Modal.Title as="h1">Important Notice</Modal.Title>
 */
const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ as = "h2", className, ...props }, ref) => (
    <Dialog.Title ref={ref} as={as} className={className} {...props} />
  )
);
ModalTitle.displayName = "Modal.Title";

/**
 * Modal.Description Component
 *
 * Supporting text for the modal.
 * Maps directly to Dialog.Description with polymorphic rendering.
 * Maintains ARIA linkage via Dialog context.
 *
 * @example
 * <Modal.Description>
 *   This action cannot be undone.
 * </Modal.Description>
 *
 * @example
 * // Render as div for structured content
 * <Modal.Description as="div">
 *   <ul>
 *     <li>Item 1</li>
 *     <li>Item 2</li>
 *   </ul>
 * </Modal.Description>
 */
const ModalDescription = React.forwardRef<HTMLElement, ModalDescriptionProps>(
  ({ as = "p", className, ...props }, ref) => (
    <Dialog.Description ref={ref} as={as} className={className} {...props} />
  )
);
ModalDescription.displayName = "Modal.Description";

/**
 * Modal.Footer Component
 *
 * Container for action buttons.
 * Defaults to flex justify-end gap-2 for consistent button alignment.
 * Override with className for centered or split-action layouts.
 *
 * @example
 * // Default: right-aligned buttons
 * <Modal.Footer>
 *   <Button variant="ghost">Cancel</Button>
 *   <Button variant="solid">Confirm</Button>
 * </Modal.Footer>
 *
 * @example
 * // Centered buttons
 * <Modal.Footer className="justify-center">
 *   <Button>Acknowledge</Button>
 * </Modal.Footer>
 *
 * @example
 * // Split-action layout
 * <Modal.Footer className="justify-between">
 *   <Button variant="ghost">Back</Button>
 *   <Button variant="solid">Next</Button>
 * </Modal.Footer>
 */
const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => (
    <Dialog.Footer
      ref={ref}
      className={cn("flex gap-2", className)}
      {...props}
    />
  )
);
ModalFooter.displayName = "Modal.Footer";

/**
 * Modal Compound Component System
 *
 * The single base for all modals in the codebase.
 * Wraps Dialog.Root, Dialog.Portal, Dialog.Overlay, and Dialog.Content
 * into one composable primitive.
 *
 * No modal should touch the Dialog API directly.
 *
 * Features:
 * - Automatic loading state management
 * - Backdrop blur with low-opacity background
 * - Named slot components (Header, Title, Description, Footer)
 * - Consistent button alignment in Footer
 * - No domain-specific props
 *
 * @example
 * <Modal open={isOpen} onOpenChange={setIsOpen}>
 *   <Modal.Header>
 *     <Modal.Title>Title</Modal.Title>
 *     <Modal.Description>Description</Modal.Description>
 *   </Modal.Header>
 *   <Modal.Footer>
 *     <Button>Action</Button>
 *   </Modal.Footer>
 * </Modal>
 */
export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Footer: ModalFooter,
});
