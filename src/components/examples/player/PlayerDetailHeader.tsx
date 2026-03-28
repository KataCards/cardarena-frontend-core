import { ArrowLeft, Edit3, Trash2, Save, X } from "lucide-react";

interface PlayerDetailHeaderProps {
  title: string;
  isEditing: boolean;
  isSaving?: boolean;
  onBack: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  editButtonText?: string;
  deleteButtonText?: string;
  saveButtonText?: string;
  savingButtonText?: string;
  cancelButtonText?: string;
}

export function PlayerDetailHeader({
  title,
  isEditing,
  isSaving = false,
  onBack,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  editButtonText = "Bearbeiten",
  deleteButtonText = "Löschen",
  saveButtonText = "Speichern",
  savingButtonText = "Speichern...",
  cancelButtonText = "Abbrechen",
}: PlayerDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="mr-4 p-2 text-gray-500 hover:text-red-600 hover:bg-gray-200 rounded-full transition-colors"
          title="Zurück"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>

      {!isEditing ? (
        <div className="flex space-x-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Edit3 size={18} className="mr-2" />
              {editButtonText}
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Trash2 size={18} className="mr-2" />
              {deleteButtonText}
            </button>
          )}
        </div>
      ) : (
        <div className="flex space-x-2">
          {onSave && (
            <button
              onClick={onSave}
              disabled={isSaving}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <Save size={18} className="mr-2" />
              {isSaving ? savingButtonText : saveButtonText}
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              disabled={isSaving}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors"
            >
              <X size={18} className="mr-2" />
              {cancelButtonText}
            </button>
          )}
        </div>
      )}
    </div>
  );
}