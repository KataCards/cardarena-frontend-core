import { Mail } from "lucide-react";

interface PlayerData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
}

interface PlayerInfoDisplayProps {
  player: PlayerData;
  title?: string;
}

export function PlayerInfoDisplay({ 
  player, 
  title = "Grundinformationen" 
}: PlayerInfoDisplayProps) {
  const getGenderLabel = (gender: string) => {
    switch (gender) {
      case 'M': return 'Männlich';
      case 'F': return 'Weiblich';
      default: return 'Andere/Keine Angabe';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Benutzername
          </label>
          <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
            {player.username}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-Mail
          </label>
          <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md flex items-center">
            <Mail size={16} className="mr-2 text-gray-500" />
            {player.email}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vorname
          </label>
          <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
            {player.first_name}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nachname
          </label>
          <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
            {player.last_name}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Geschlecht
          </label>
          <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
            {getGenderLabel(player.gender)}
          </p>
        </div>
      </div>
    </div>
  );
}