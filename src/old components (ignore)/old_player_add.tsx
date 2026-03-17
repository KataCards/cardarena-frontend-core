"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../../components/Sidebar"; // Adjust path as needed
import { NewPlayerPayload } from "@/types/player";
import { createPlayer } from "@/lib/apiClient";
import { UserPlus, Plus, Trash2 } from "lucide-react";

interface PlatformId {
  platform: string;
  playerId: string;
}

export default function NewPlayerPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<NewPlayerPayload>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "O", // Default to "Other/No Gender"
  });

  const [platformIds, setPlatformIds] = useState<PlatformId[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPlatform = () => {
    setPlatformIds(prev => [...prev, { platform: "", playerId: "" }]);
  };

  const handleRemovePlatform = (index: number) => {
    setPlatformIds(prev => prev.filter((_, i) => i !== index));
  };

  const handlePlatformChange = (index: number, field: 'platform' | 'playerId', value: string) => {
    setPlatformIds(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic validation
    if (!formData.username || !formData.first_name || !formData.last_name || !formData.email) {
      setFormError("Bitte fülle alle Pflichtfelder aus.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }

    // Validate platform IDs - both fields must be filled if one is filled
    for (let i = 0; i < platformIds.length; i++) {
      const { platform, playerId } = platformIds[i];
      if ((platform && !playerId) || (!platform && playerId)) {
        setFormError(`Plattform-Eintrag ${i + 1}: Beide Felder (Plattformname und Spieler-ID) müssen ausgefüllt werden.`);
        return;
      }
    }

    // Convert platform IDs to the format expected by the backend
    const validPlatformIds = platformIds.filter(p => p.platform && p.playerId);
    const platformIdsObject: Record<string, string> = {};
    validPlatformIds.forEach(p => {
      platformIdsObject[p.platform] = p.playerId;
    });

    const payload: NewPlayerPayload = {
      ...formData,
      platform_ids: Object.keys(platformIdsObject).length > 0 ? platformIdsObject : undefined
    };

    setIsLoading(true);
    try {
      await createPlayer(payload);
      router.push("/player");
    } catch (error: any) {
      setFormError(error.message || "Fehler beim Erstellen des Spielers. Bitte versuche es erneut.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 animate-fade-in">
            <div className="flex items-center mb-6">
              <UserPlus size={32} className="text-red-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">Neuen Spieler erstellen</h1>
          </div>

          {formError && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
                {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Player Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Benutzername <span className="text-red-600">*</span>
              </label>
              <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    required
              />
            </div>

            <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail <span className="text-red-600">*</span>
              </label>
              <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    required
              />
            </div>

            <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Vorname <span className="text-red-600">*</span>
              </label>
              <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    required
              />
            </div>

            <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nachname <span className="text-red-600">*</span>
              </label>
              <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    required
              />
            </div>
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Geschlecht
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              >
                <option value="M">Männlich</option>
                <option value="F">Weiblich</option>
                <option value="O">Andere/Keine Angabe</option>
              </select>
            </div>

              {/* Platform IDs Section */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Plattform-IDs (Optional)</h3>
            <button
                    type="button"
                    onClick={handleAddPlatform}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                    <Plus size={16} className="mr-1" />
                    Hinzufügen
            </button>
                </div>

                {platformIds.length === 0 ? (
                  <p className="text-gray-500 text-sm mb-4">
                    Keine Plattform-IDs hinzugefügt. Klicke auf "Hinzufügen", um eine Plattform-ID zu erstellen.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {platformIds.map((platformId, index) => (
                      <div key={index} className="flex gap-3 items-center p-3 bg-gray-50 rounded-md">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Plattformname (z.B. Pokemon-TCG)"
                            value={platformId.platform}
                            onChange={(e) => handlePlatformChange(index, 'platform', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Spieler-ID auf der Plattform"
                            value={platformId.playerId}
                            onChange={(e) => handlePlatformChange(index, 'playerId', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
    </div>
                        <button
                          type="button"
                          onClick={() => handleRemovePlatform(index)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-md transition-colors"
                          title="Plattform-ID entfernen"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-2">
                  Beispiel: Plattformname "Pokemon-TCG" mit Spieler-ID "player123456"
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <UserPlus size={20} className="mr-2" />
                {isLoading ? "Wird erstellt..." : "Spieler erstellen"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}