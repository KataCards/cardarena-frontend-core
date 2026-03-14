'use client';

import { Button } from "@/components/ui/Button";
import type { WinnerModalProps } from "@/types/ui/bracket";

/**
 * WinnerModal component (UI Primitive)
 * A stateless dialog for selecting a match winner.
 */
export function WinnerModal({
  isOpen,
  title = "Gewinner festlegen",
  options,
  onSelect,
  onClose,
}: WinnerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <h2 className="text-2xl font-black text-black tracking-tight mb-6 text-center">
            {title}
          </h2>
          
          <div className="space-y-3">
            {options.map((player) => (
              <Button
                key={player}
                fullWidth
                size="lg"
                colorScheme="red"
                onClick={() => onSelect(player)}
                className="justify-between"
              >
                <span>{player}</span>
                <span className="opacity-50">🏆</span>
              </Button>
            ))}
          </div>

          <button
            className="mt-6 w-full text-center text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-red-600 transition-colors"
            onClick={onClose}
          >
            Abbrechen
          </button>
        </div>
        
        {/* Decorative stripe */}
        <div className="h-1.5 bg-linear-to-r from-red-600 to-red-400" />
      </div>
    </div>
  );
}
