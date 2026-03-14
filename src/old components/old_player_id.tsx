"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "../../../../components/Sidebar";
import { Player, NewPlayerPayload } from "@/types/player";
import { fetchPlayerById, updatePlayer, deletePlayer } from "@/lib/apiClient";
import { 
  User, 
  Mail, 
  Edit3, 
  Save, 
  X, 
  Trash2, 
  Plus, 
  ArrowLeft,
  AlertTriangle,
  Gamepad2
} from "lucide-react";

interface PlatformId {
  platform: string;
  playerId: string;
}

export default function PlayerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const playerId = parseInt(params.id as string);

  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState<NewPlayerPayload>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "O",
  });

  const [platformIds, setPlatformIds] = useState<PlatformId[]>([]);

  useEffect(() => {
    loadPlayerData();
  }, [playerId]);

  const loadPlayerData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const playerData = await fetchPlayerById(playerId);
      
      if (playerData) {
        setPlayer(playerData);
        setFormData({
          username: playerData.username,
          first_name: playerData.first_name,
          last_name: playerData.last_name,
          email: playerData.email,
          gender: playerData.gender,
        });

        // Convert platform_ids object to array format
        if (playerData.platform_ids) {
          const platformArray = Object.entries(playerData.platform_ids).map(([platform, playerId]) => ({
            platform,
            playerId
          }));
          setPlatformIds(platformArray);
        } else {
          setPlatformIds([]);
        }
      } else {
        setError("Spieler nicht gefunden.");
      }
    } catch (error: any) {
      setError(error.message || "Fehler beim Laden der Spielerdaten.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleSave = async () => {
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

    // Validate platform IDs
    for (let i = 0; i < platformIds.length; i++) {
      const { platform, playerId } = platformIds[i];
      if ((platform && !playerId) || (!platform && playerId)) {
        setFormError(`Plattform-Eintrag ${i + 1}: Beide Felder müssen ausgefüllt werden.`);
        return;
      }
    }

    // Convert platform IDs to object format
    const validPlatformIds = platformIds.filter(p => p.platform && p.playerId);
    const platformIdsObject: Record<string, string> = {};
    validPlatformIds.forEach(p => {
      platformIdsObject[p.platform] = p.playerId;
    });

    const payload: Partial<NewPlayerPayload> = {
      ...formData,
      platform_ids: Object.keys(platformIdsObject).length > 0 ? platformIdsObject : {}
    };

    setIsSaving(true);
    try {
      const updatedPlayer = await updatePlayer(playerId, payload);
      if (updatedPlayer) {
        setPlayer(updatedPlayer);
        setIsEditing(false);
        setFormError(null);
      }
    } catch (error: any) {
      setFormError(error.message || "Fehler beim Aktualisieren des Spielers.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePlayer(playerId);
      router.push("/player");
    } catch (error: any) {
      setError(error.message || "Fehler beim Löschen des Spielers.");
      console.error(error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const cancelEdit = () => {
    if (player) {
      setFormData({
        username: player.username,
        first_name: player.first_name,
        last_name: player.last_name,
        email: player.email,
        gender: player.gender,
      });

      if (player.platform_ids) {
        const platformArray = Object.entries(player.platform_ids).map(([platform, playerId]) => ({
          platform,
          playerId
        }));
        setPlatformIds(platformArray);
      } else {
        setPlatformIds([]);
      }
    }
    setIsEditing(false);
    setFormError(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Lade Spielerdaten...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error && !player) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Fehler</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => router.push("/player")}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Zurück zur Spielerliste
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => router.push("/player")}
                className="mr-4 p-2 text-gray-500 hover:text-red-600 hover:bg-gray-200 rounded-full transition-colors"
                title="Zurück zur Spielerliste"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center">
                <User size={32} className="text-red-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-800">
                  {player ? `${player.first_name} ${player.last_name}` : 'Spieler Details'}
                </h1>
              </div>
            </div>

            {!isEditing && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Edit3 size={18} className="mr-2" />
                  Bearbeiten
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={18} className="mr-2" />
                  Löschen
                </button>
              </div>
            )}

            {isEditing && (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  <Save size={18} className="mr-2" />
                  {isSaving ? "Speichern..." : "Speichern"}
                </button>
                <button
                  onClick={cancelEdit}
                  disabled={isSaving}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors"
                >
                  <X size={18} className="mr-2" />
                  Abbrechen
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
              {error}
            </div>
          )}

          {formError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
              {formError}
            </div>
          )}

          {player && (
            <div className="bg-white rounded-lg shadow-xl p-8">
              {!isEditing ? (
                // View Mode
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Grundinformationen</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Benutzername</label>
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{player.username}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md flex items-center">
                          <Mail size={16} className="mr-2 text-gray-500" />
                          {player.email}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vorname</label>
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{player.first_name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nachname</label>
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{player.last_name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Geschlecht</label>
                        <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                          {player.gender === 'M' ? 'Männlich' : player.gender === 'F' ? 'Weiblich' : 'Andere/Keine Angabe'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Platform IDs */}
                  <div className="border-t pt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Gamepad2 size={24} className="mr-2 text-red-600" />
                      Plattform-IDs
                    </h2>
                    {player.platform_ids && Object.keys(player.platform_ids).length > 0 ? (
                      <div className="space-y-3">
                        {Object.entries(player.platform_ids).map(([platform, playerId], index) => (
                          <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-md">
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-gray-500 mb-1">Plattform</label>
                              <p className="text-gray-900">{platform}</p>
                            </div>
                            <div className="flex-1">
                              <label className="block text-xs font-medium text-gray-500 mb-1">Spieler-ID</label>
                              <p className="text-gray-900 font-mono">{playerId}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Keine Plattform-IDs hinterlegt.</p>
                    )}
                  </div>
                </div>
              ) : (
                // Edit Mode
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Spieler bearbeiten</h2>
                  
                  {/* Basic Information Form */}
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

                    <div className="md:col-span-2">
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
                  </div>

                  {/* Platform IDs Edit Section */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-800">Plattform-IDs</h3>
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
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">Spieler löschen</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Bist du sicher, dass du den Spieler <strong>{player?.first_name} {player?.last_name}</strong> löschen möchtest? 
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isDeleting ? "Löschen..." : "Löschen"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}