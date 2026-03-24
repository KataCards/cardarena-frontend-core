import { Plus, Trash2 } from "lucide-react";

export interface PlatformId {
  platform: string;
  playerId: string;
}

interface PlatformIdManagerProps {
  platformIds: PlatformId[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: 'platform' | 'playerId', value: string) => void;
  title?: string;
  addButtonText?: string;
  emptyStateText?: string;
  helpText?: string;
}

export function PlatformIdManager({
  platformIds,
  onAdd,
  onRemove,
  onChange,
  title = "Plattform-IDs (Optional)",
  addButtonText = "Hinzufügen",
  emptyStateText = "Keine Plattform-IDs hinzugefügt. Klicke auf \"Hinzufügen\", um eine Plattform-ID zu erstellen.",
  helpText = "Beispiel: Plattformname \"Pokemon-TCG\" mit Spieler-ID \"player123456\"",
}: PlatformIdManagerProps) {
  return (
    <div className="border-t pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="mr-1" />
          {addButtonText}
        </button>
      </div>

      {platformIds.length === 0 ? (
        <p className="text-gray-500 text-sm mb-4">{emptyStateText}</p>
      ) : (
        <div className="space-y-3">
          {platformIds.map((platformId, index) => (
            <div key={index} className="flex gap-3 items-center p-3 bg-gray-50 rounded-md">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Plattformname (z.B. Pokemon-TCG)"
                  value={platformId.platform}
                  onChange={(e) => onChange(index, 'platform', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Spieler-ID auf der Plattform"
                  value={platformId.playerId}
                  onChange={(e) => onChange(index, 'playerId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-md transition-colors"
                title="Plattform-ID entfernen"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {helpText && (
        <p className="text-xs text-gray-500 mt-2">{helpText}</p>
      )}
    </div>
  );
}