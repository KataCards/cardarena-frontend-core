"use client";

import * as React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Props for the WinnerModal component
 */
export interface WinnerModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Modal title @default "Select Winner" */
  title?: string;
  /** Array of winner options to display — must contain at least one option */
  options: [WinnerOption, ...WinnerOption[]];
  /** Callback when an option is selected */
  onSelect: (id: string) => void;
  /** Cancel button text @default "Cancel" */
  cancelText?: string;
  /** Custom class for the modal content */
  className?: string;
  /** Custom class for the accent stripe */
  stripeClassName?: string;
}

export interface WinnerOption {
  /** Unique identifier for the option */
  id: string;
  /** Display label for the option */
  label: React.ReactNode;
  /** Optional icon to display — defaults to 🏆 */
  icon?: React.ReactNode;
}

/**
 * WinnerModal - Specialized modal for winner selection
 *
 * Built on the Modal primitive. Provides a beautiful, accessible UI
 * for choosing from a list of options with a distinctive visual style.
 *
 * @example
 * // Basic winner selection
 * <WinnerModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   options={[
 *     { id: "player1", label: "Player 1" },
 *     { id: "player2", label: "Player 2" },
 *   ]}
 *   onSelect={(id) => {
 *     console.log("Selected:", id);
 *     setIsOpen(false);
 *   }}
 * />
 *
 * @example
 * // With custom icons and title
 * <WinnerModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Round 1 Winner"
 *   options={[
 *     { id: "john", label: "John Doe", icon: "👑" },
 *     { id: "jane", label: "Jane Smith", icon: "👑" },
 *   ]}
 *   onSelect={handleWinnerSelect}
 * />
 *
 * @example
 * // With complex option labels
 * <WinnerModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   options={[
 *     {
 *       id: "player1",
 *       label: (
 *         <div className="flex flex-col items-start">
 *           <span className="font-bold">Player 1</span>
 *           <span className="text-xs opacity-70">Seed #1</span>
 *         </div>
 *       ),
 *     },
 *     {
 *       id: "player2",
 *       label: (
 *         <div className="flex flex-col items-start">
 *           <span className="font-bold">Player 2</span>
 *           <span className="text-xs opacity-70">Seed #4</span>
 *         </div>
 *       ),
 *     },
 *   ]}
 *   onSelect={handleWinnerSelect}
 * />
 */
export function WinnerModal({
  open,
  onOpenChange,
  title = "Select Winner",
  options,
  onSelect,
  cancelText = "Cancel",
  className,
  stripeClassName,
}: WinnerModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      showClose={false}
      className={cn(
        "max-w-sm rounded-2xl p-0 overflow-hidden border-gray-100",
        className
      )}
    >
      {/* Title */}
      <Modal.Header className="px-6 pt-6 pb-4">
        <Modal.Title className="text-2xl font-black text-gray-900 tracking-tight text-center">
          {title}
        </Modal.Title>
      </Modal.Header>

      {/* Options */}
      <div
        className="flex flex-col gap-3 px-6 pb-4"
        role="group"
        aria-label="Available options"
      >
        {options.map((option) => (
          <Button
            key={option.id}
            variant="default"
            fullWidth
            onClick={() => onSelect(option.id)}
            className="justify-between"
          >
            <span>{option.label}</span>
            <span className="opacity-50" aria-hidden="true">
              {option.icon ?? "🏆"}
            </span>
          </Button>
        ))}
      </div>

      {/* Cancel button */}
      <div className="px-6 pb-6">
        <Button
          variant="ghost"
          fullWidth
          onClick={() => onOpenChange(false)}
          className="text-sm font-bold uppercase tracking-widest"
        >
          {cancelText}
        </Button>
      </div>

      {/* Decorative accent stripe */}
      <div
        className={cn("h-1.5 bg-red-600", stripeClassName)}
        aria-hidden="true"
      />
    </Modal>
  );
}

export default WinnerModal;