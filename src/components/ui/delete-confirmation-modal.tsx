import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  isDeleting?: boolean;
  deletingButtonText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmationModal({
  isOpen,
  title = "Bestätigung erforderlich",
  message,
  confirmButtonText = "Löschen",
  cancelButtonText = "Abbrechen",
  isDeleting = false,
  deletingButtonText = "Löschen...",
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 transition-colors"
          >
            {cancelButtonText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {isDeleting ? deletingButtonText : confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}