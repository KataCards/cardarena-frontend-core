"use client";

import { Button } from "@/components/ui/Button";
import { ReactNode } from "react";

export interface WinnerModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Modal title */
  title?: string;
  /** Array of option labels to choose from */
  options: string[];
  /** Callback when an option is selected */
  onSelect: (option: string) => void;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Cancel button text */
  cancelText?: string;
  /** Optional icon to show next to each option */
  optionIcon?: ReactNode;
  /** Color scheme for the accent stripe */
  accentColor?: "red" | "blue" | "green" | "purple";
  /** Whether to close modal when clicking backdrop */
  closeOnBackdrop?: boolean;
}

const accentColors = {
  red: "bg-linear-to-r from-red-600 to-red-400",
  blue: "bg-linear-to-r from-blue-600 to-blue-400",
  green: "bg-linear-to-r from-green-600 to-green-400",
  purple: "bg-linear-to-r from-purple-600 to-purple-400",
};

/**
 * WinnerModal
 * 
 * A modal dialog for selecting from a list of options. Perfect for
 * winner selection, voting, or any choice-based interaction.
 * 
 * @example
 * // Basic winner selection
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <WinnerModal
 *   isOpen={isOpen}
 *   title="Select Winner"
 *   options={["Player 1", "Player 2"]}
 *   onSelect={(winner) => {
 *     console.log(`Winner: ${winner}`);
 *     setIsOpen(false);
 *   }}
 *   onClose={() => setIsOpen(false)}
 * />
 * 
 * @example
 * // Tournament match winner with custom styling
 * <WinnerModal
 *   isOpen={showModal}
 *   title="Round 1 Winner"
 *   options={["John Doe", "Jane Smith"]}
 *   optionIcon="🏆"
 *   accentColor="blue"
 *   cancelText="Cancel"
 *   onSelect={handleWinnerSelect}
 *   onClose={handleClose}
 *   closeOnBackdrop
 * />
 * 
 * @example
 * // Generic selection modal
 * <WinnerModal
 *   isOpen={isOpen}
 *   title="Choose Your Favorite"
 *   options={["Option A", "Option B", "Option C"]}
 *   optionIcon="✓"
 *   accentColor="green"
 *   onSelect={handleSelection}
 *   onClose={() => setIsOpen(false)}
 * />
 */
export function WinnerModal({
  isOpen,
  title = "Select Winner",
  options,
  onSelect,
  onClose,
  cancelText = "Cancel",
  optionIcon = "🏆",
  accentColor = "red",
  closeOnBackdrop = false,
}: WinnerModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <h2 className="text-2xl font-black text-black tracking-tight mb-6 text-center">
            {title}
          </h2>

          <div className="space-y-3">
            {options.map((option) => (
              <Button
                key={option}
                fullWidth
                size="lg"
                colorScheme="red"
                onClick={() => onSelect(option)}
                className="justify-between"
              >
                <span>{option}</span>
                {optionIcon && <span className="opacity-50">{optionIcon}</span>}
              </Button>
            ))}
          </div>

          <button
            className="mt-6 w-full text-center text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-red-600 transition-colors"
            onClick={onClose}
          >
            {cancelText}
          </button>
        </div>

        {/* Decorative stripe */}
        <div className={`h-1.5 ${accentColors[accentColor]}`} />
      </div>
    </div>
  );
}