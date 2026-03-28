"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ReactElement } from "react";
import { cn } from "@/lib/utils";

export interface DeleteConfirmationModalProps {
  /** Controls modal visibility */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Modal title @default "Confirm Deletion" */
  title?: string;
  /** Main message describing the action */
  message: string;
  /** Optional additional context */
  description?: string;
  /** Confirm button text @default "Delete" */
  confirmText?: string;
  /** Cancel button text @default "Cancel" */
  cancelText?: string;
  /** Loading state @default false */
  loading?: boolean;
  /** Loading button text @default "Deleting..." */
  loadingText?: string;
  /** Callback when user confirms - can be async */
  onConfirm: () => void | Promise<void>;
  /** Optional error handler for async operations */
  onError?: (error: Error) => void;
  /** Optional icon element (e.g., <Trash2 />) */
  icon?: ReactElement;
  /** Custom class for icon wrapper */
  iconClassName?: string;
  /** Custom class for content */
  className?: string;
  /** Custom class for header */
  headerClassName?: string;
  /** Custom class for footer */
  footerClassName?: string;
  /** Auto-close on successful confirmation @default true */
  autoClose?: boolean;
}

/**
 * DeleteConfirmationModal - Confirmation dialog for destructive actions
 *
 * Built on the Modal primitive. Demonstrates how to compose domain-specific
 * modals using the base Modal component.
 *
 * @example
 * // Basic usage
 * <DeleteConfirmationModal
 *   open={open}
 *   onOpenChange={setOpen}
 *   message="Delete this item?"
 *   onConfirm={async () => await deleteItem(id)}
 *   onError={(e) => toast.error(e.message)}
 * />
 *
 * @example
 * // With custom icon
 * <DeleteConfirmationModal
 *   open={open}
 *   onOpenChange={setOpen}
 *   message="Delete permanently?"
 *   icon={<Trash2 className="w-5 h-5" />}
 *   iconClassName="text-red-600"
 *   onConfirm={handleDelete}
 * />
 */
export function DeleteConfirmationModal({
  open,
  onOpenChange,
  title = "Confirm Deletion",
  message,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  loadingText = "Deleting...",
  onConfirm,
  onError,
  icon,
  iconClassName,
  className,
  headerClassName,
  footerClassName,
  autoClose = true,
}: DeleteConfirmationModalProps) {
  // Internal async handler with error handling
  const handleConfirm = async () => {
    try {
      await onConfirm();
      if (autoClose) {
        onOpenChange(false);
      }
    } catch (error) {
      if (onError) {
        onError(error as Error);
      } else {
        throw error;
      }
    }
  };

  return (
    <Modal 
      open={open} 
      onOpenChange={onOpenChange} 
      loading={loading}
      showClose={false}
      className={className}
    >
      <Modal.Header className={headerClassName}>
        <div className="flex items-start gap-3">
          {icon && (
            <div 
              className={cn("shrink-0", iconClassName)} 
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
          <div className="flex-1">
            <Modal.Title>{title}</Modal.Title>
            <Modal.Description className="mt-1.5">
              {message}
            </Modal.Description>
            {description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
      </Modal.Header>

      <Modal.Footer className={footerClassName}>
        <Button
          variant="ghost"
          onClick={() => onOpenChange(false)}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          variant="default"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? loadingText : confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationModal;