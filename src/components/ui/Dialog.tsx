"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Context for sharing dialog state between compound components
 */
interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog compound components must be used within Dialog.Root");
  }
  return context;
};

/**
 * Props for the Dialog root component
 */
export interface DialogRootProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Children components */
  children: React.ReactNode;
}

/**
 * Props for the Dialog portal component
 */
export interface DialogPortalProps {
  /** Children to render in portal */
  children: React.ReactNode;
  /** Container element to portal into. @default document.body */
  container?: HTMLElement;
}

/**
 * Props for the Dialog overlay component
 */
export interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether clicking overlay closes dialog. @default true */
  closeOnClick?: boolean;
}

/**
 * Props for the Dialog content component
 */
export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to show close button. @default true */
  showClose?: boolean;
  /** Whether clicking overlay closes dialog. @default true */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape closes dialog. @default true */
  closeOnEscape?: boolean;
}

/**
 * Props for the Dialog header component
 */
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the Dialog title component
 */
export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level. @default "h2" */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Props for the Dialog description component
 */
export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Props for the Dialog footer component
 */
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Props for the Dialog close button component
 */
export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Dialog Root Component
 *
 * Container for the dialog compound component system.
 * Provides context for all child components.
 *
 * @example
 * <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
 *   <Dialog.Portal>
 *     <Dialog.Overlay />
 *     <Dialog.Content>
 *       <Dialog.Header>
 *         <Dialog.Title>Delete Account</Dialog.Title>
 *         <Dialog.Description>
 *           This action cannot be undone.
 *         </Dialog.Description>
 *       </Dialog.Header>
 *       <Dialog.Footer>
 *         <Dialog.Close>Cancel</Dialog.Close>
 *         <button>Confirm</button>
 *       </Dialog.Footer>
 *     </Dialog.Content>
 *   </Dialog.Portal>
 * </Dialog.Root>
 */
const DialogRoot: React.FC<DialogRootProps> = ({ open, onOpenChange, children }) => {
  const titleId = React.useId();
  const descriptionId = React.useId();

  return (
    <DialogContext.Provider value={{ open, onOpenChange, titleId, descriptionId }}>
      {children}
    </DialogContext.Provider>
  );
};
DialogRoot.displayName = "Dialog.Root";

/**
 * Dialog Portal Component
 *
 * Renders children into a portal at document.body.
 * Prevents z-index and overflow issues.
 *
 * @example
 * <Dialog.Portal>
 *   <Dialog.Overlay />
 *   <Dialog.Content>...</Dialog.Content>
 * </Dialog.Portal>
 */
const DialogPortal: React.FC<DialogPortalProps> = ({ children, container }) => {
  const { open } = useDialogContext();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(children, container || document.body);
};
DialogPortal.displayName = "Dialog.Portal";

/**
 * Dialog Overlay Component
 *
 * The backdrop behind the dialog.
 * Handles click-to-close functionality.
 *
 * @example
 * <Dialog.Overlay />
 *
 * @example
 * // Custom styling
 * <Dialog.Overlay className="bg-black/60" />
 */
const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ closeOnClick = true, className, ...props }, ref) => {
    const { onOpenChange } = useDialogContext();

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          className
        )}
        data-state="open"
        onClick={closeOnClick ? () => onOpenChange(false) : undefined}
        {...props}
      />
    );
  }
);
DialogOverlay.displayName = "Dialog.Overlay";

/**
 * Dialog Content Component
 *
 * The main dialog container with focus trap and accessibility.
 * Handles Escape key, focus management, and ARIA attributes.
 *
 * @example
 * <Dialog.Content>
 *   <Dialog.Header>
 *     <Dialog.Title>Title</Dialog.Title>
 *   </Dialog.Header>
 * </Dialog.Content>
 */
const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      showClose = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { onOpenChange, titleId, descriptionId } = useDialogContext();
    const contentRef = React.useRef<HTMLDivElement>(null);

    // Merge refs
    React.useImperativeHandle(ref, () => contentRef.current!);

    // Focus trap
    React.useEffect(() => {
      const content = contentRef.current;
      if (!content) return;

      // Focus first focusable element
      const focusableElements = content.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      firstFocusable?.focus();

      // Trap focus within dialog
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      };

      content.addEventListener("keydown", handleTab);
      return () => content.removeEventListener("keydown", handleTab);
    }, []);

    // Escape key handler
    React.useEffect(() => {
      if (!closeOnEscape) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onOpenChange(false);
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [closeOnEscape, onOpenChange]);

    // Lock body scroll
    React.useEffect(() => {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }, []);

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={closeOnOverlayClick ? () => onOpenChange(false) : undefined}
      >
        <div
          ref={contentRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cn(
            "relative bg-background rounded-lg shadow-lg w-full max-w-lg",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
          data-state="open"
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
          {showClose && (
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);
DialogContent.displayName = "Dialog.Content";

/**
 * Dialog Header Component
 *
 * Container for title and description.
 * Provides consistent spacing and layout.
 *
 * @example
 * <Dialog.Header>
 *   <Dialog.Title>Delete Account</Dialog.Title>
 *   <Dialog.Description>This cannot be undone.</Dialog.Description>
 * </Dialog.Header>
 */
const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-6 pb-4", className)}
      {...props}
    />
  )
);
DialogHeader.displayName = "Dialog.Header";

/**
 * Dialog Title Component
 *
 * The main heading for the dialog.
 * Automatically linked via aria-labelledby.
 *
 * @example
 * <Dialog.Title>Confirm Action</Dialog.Title>
 *
 * @example
 * <Dialog.Title as="h1">Important Notice</Dialog.Title>
 */
const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ as: Comp = "h2", className, ...props }, ref) => {
    const { titleId } = useDialogContext();

    return React.createElement(Comp, {
      ref,
      id: titleId,
      className: cn("text-lg font-semibold text-foreground", className),
      ...props,
    });
  }
);
DialogTitle.displayName = "Dialog.Title";

/**
 * Dialog Description Component
 *
 * Supporting text for the dialog.
 * Automatically linked via aria-describedby.
 *
 * @example
 * <Dialog.Description>
 *   This action cannot be undone.
 * </Dialog.Description>
 */
const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { descriptionId } = useDialogContext();

    return (
      <p
        ref={ref}
        id={descriptionId}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
DialogDescription.displayName = "Dialog.Description";

/**
 * Dialog Footer Component
 *
 * Container for action buttons.
 * Provides consistent spacing and layout.
 *
 * @example
 * <Dialog.Footer>
 *   <Dialog.Close>Cancel</Dialog.Close>
 *   <button>Confirm</button>
 * </Dialog.Footer>
 */
const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-end gap-2 p-6 pt-4", className)}
      {...props}
    />
  )
);
DialogFooter.displayName = "Dialog.Footer";

/**
 * Dialog Close Component
 *
 * A button that closes the dialog when clicked.
 * Can be styled as needed.
 *
 * @example
 * <Dialog.Close>Cancel</Dialog.Close>
 *
 * @example
 * <Dialog.Close className="btn-secondary">Close</Dialog.Close>
 */
const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, ...props }, ref) => {
    const { onOpenChange } = useDialogContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onOpenChange(false)}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DialogClose.displayName = "Dialog.Close";

/**
 * Dialog Compound Component System
 *
 * A fully accessible dialog/modal primitive with focus trap, portal rendering,
 * and keyboard support. Built following WAI-ARIA Dialog pattern.
 *
 * Features:
 * - Portal rendering (no z-index issues)
 * - Focus trap (keyboard users stay in dialog)
 * - Escape key to close
 * - Body scroll lock
 * - ARIA attributes (role, aria-modal, aria-labelledby, aria-describedby)
 * - Compound component pattern for flexibility
 * - Semantic tokens for theming
 *
 * Design Philosophy:
 * - Composition over configuration
 * - Accessibility by default
 * - Flexible styling
 * - Keyboard and screen reader friendly
 *
 * @example
 * // Basic dialog
 * <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
 *   <Dialog.Portal>
 *     <Dialog.Overlay />
 *     <Dialog.Content>
 *       <Dialog.Header>
 *         <Dialog.Title>Delete Account</Dialog.Title>
 *         <Dialog.Description>
 *           This action cannot be undone.
 *         </Dialog.Description>
 *       </Dialog.Header>
 *       <Dialog.Footer>
 *         <Dialog.Close>Cancel</Dialog.Close>
 *         <button>Confirm</button>
 *       </Dialog.Footer>
 *     </Dialog.Content>
 *   </Dialog.Portal>
 * </Dialog.Root>
 */
export const Dialog = {
  Root: DialogRoot,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
};