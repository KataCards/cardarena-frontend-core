import { Gamepad2 } from "lucide-react";

interface PlatformIdDisplayProps {
  platformIds?: Record<string, string>;
  title?: string;
  emptyMessage?: string;
}

export function PlatformIdDisplay({
  platformIds,
  title = "Plattform-IDs",
  emptyMessage = "Keine Plattform-IDs hinterlegt.",
}: PlatformIdDisplayProps) {
  const hasPlatformIds = platformIds && Object.keys(platformIds).length > 0;

  return (
    <div className="border-t pt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Gamepad2 size={24} className="mr-2 text-red-600" />
        {title}
      </h2>
      
      {hasPlatformIds ? (
        <div className="space-y-3">
          {Object.entries(platformIds).map(([platform, playerId], index) => (
            <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-md">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Plattform
                </label>
                <p className="text-gray-900">{platform}</p>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Spieler-ID
                </label>
                <p className="text-gray-900 font-mono">{playerId}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">{emptyMessage}</p>
      )}
    </div>
  );
}