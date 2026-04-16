"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DialogRootProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DialogPortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

export interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
  closeOnClick?: boolean;
}

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showClose?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "div" | "span";
}

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const DialogRoot: React.FC<DialogRootProps> = ({ open, onOpenChange, children }) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    {children}
  </DialogPrimitive.Root>
);
DialogRoot.displayName = "Dialog.Root";

const DialogPortal: React.FC<DialogPortalProps> = ({ children, container }) => (
  <DialogPrimitive.Portal container={container}>{children}</DialogPrimitive.Portal>
);
DialogPortal.displayName = "Dialog.Portal";

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ closeOnClick: _closeOnClick = true, className, ...props }, ref) => {
    void _closeOnClick;
    return (
      <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          className
        )}
        {...props}
      />
    );
  }
);
DialogOverlay.displayName = "Dialog.Overlay";

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      showClose = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      className,
      children,
      onPointerDownOutside,
      onEscapeKeyDown,
      ...props
    },
    ref
  ) => {
    return (
      <DialogPrimitive.Content
        ref={ref}
        onPointerDownOutside={(event) => {
          if (!closeOnOverlayClick) {
            event.preventDefault();
          }
          onPointerDownOutside?.(event);
        }}
        onEscapeKeyDown={(event) => {
          if (!closeOnEscape) {
            event.preventDefault();
          }
          onEscapeKeyDown?.(event);
        }}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
          "bg-background rounded-lg shadow-lg",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showClose ? (
          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    );
  }
);
DialogContent.displayName = "Dialog.Content";

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 p-6 pb-4", className)} {...props} />
  )
);
DialogHeader.displayName = "Dialog.Header";

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ as = "h2", className, children, ...props }, ref) => {
    const shared = { className: cn("text-lg font-semibold text-foreground", className), ...props };

    switch (as) {
      case "h1":
        return (
          <DialogPrimitive.Title asChild>
            <h1 ref={ref as React.Ref<HTMLHeadingElement>} {...shared}>
              {children}
            </h1>
          </DialogPrimitive.Title>
        );
      case "h3":
        return (
          <DialogPrimitive.Title asChild>
            <h3 ref={ref as React.Ref<HTMLHeadingElement>} {...shared}>
              {children}
            </h3>
          </DialogPrimitive.Title>
        );
      case "h4":
        return (
          <DialogPrimitive.Title asChild>
            <h4 ref={ref as React.Ref<HTMLHeadingElement>} {...shared}>
              {children}
            </h4>
          </DialogPrimitive.Title>
        );
      case "h5":
        return (
          <DialogPrimitive.Title asChild>
            <h5 ref={ref as React.Ref<HTMLHeadingElement>} {...shared}>
              {children}
            </h5>
          </DialogPrimitive.Title>
        );
      case "h6":
        return (
          <DialogPrimitive.Title asChild>
            <h6 ref={ref as React.Ref<HTMLHeadingElement>} {...shared}>
              {children}
            </h6>
          </DialogPrimitive.Title>
        );
      default:
        return (
          <DialogPrimitive.Title asChild>
            <h2 ref={ref as React.Ref<HTMLHeadingElement>} {...shared}>
              {children}
            </h2>
          </DialogPrimitive.Title>
        );
    }
  }
);
DialogTitle.displayName = "Dialog.Title";

const DialogDescription = React.forwardRef<HTMLElement, DialogDescriptionProps>(
  ({ as = "p", className, children, ...props }, ref) => {
    const shared = { className: cn("text-sm text-muted-foreground", className), ...props };

    switch (as) {
      case "div":
        return (
          <DialogPrimitive.Description asChild>
            <div ref={ref as React.Ref<HTMLDivElement>} {...shared}>
              {children}
            </div>
          </DialogPrimitive.Description>
        );
      case "span":
        return (
          <DialogPrimitive.Description asChild>
            <span ref={ref as React.Ref<HTMLSpanElement>} {...shared}>
              {children}
            </span>
          </DialogPrimitive.Description>
        );
      default:
        return (
          <DialogPrimitive.Description asChild>
            <p ref={ref as React.Ref<HTMLParagraphElement>} {...shared}>
              {children}
            </p>
          </DialogPrimitive.Description>
        );
    }
  }
);
DialogDescription.displayName = "Dialog.Description";

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

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, ...props }, ref) => (
    <DialogPrimitive.Close ref={ref} type="button" className={className} {...props}>
      {children}
    </DialogPrimitive.Close>
  )
);
DialogClose.displayName = "Dialog.Close";

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
