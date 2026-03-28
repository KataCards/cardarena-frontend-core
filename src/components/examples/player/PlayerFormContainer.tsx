import { ReactNode } from "react";
import { UserPlus } from "lucide-react";

interface PlayerFormContainerProps {
  title?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  error?: string | null;
  onSubmit: (e: { preventDefault: () => void }) => void;
  submitLabel?: string;
  isLoading?: boolean;
  loadingLabel?: string;
  children: ReactNode;
}

export function PlayerFormContainer({
  title = "Neuen Spieler erstellen",
  icon: Icon = UserPlus,
  error,
  onSubmit,
  submitLabel = "Spieler erstellen",
  isLoading = false,
  loadingLabel = "Wird erstellt...",
  children,
}: PlayerFormContainerProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 animate-fade-in">
        <div className="flex items-center mb-6">
          <Icon size={32} className="text-red-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {children}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Icon size={20} className="mr-2" />
            {isLoading ? loadingLabel : submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}