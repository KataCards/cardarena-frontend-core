"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Sidebar from '../../../components/Sidebar';
import { Player } from '@/types/player';
import { fetchPlayers } from '@/lib/apiClient';
import { PlusCircle, Search, Users, Eye, Loader2 } from "lucide-react";

export default function PlayersPage() {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const playersData = await fetchPlayers();
      setPlayers(playersData || []);
    } catch (error: any) {
      setError(error.message || "Fehler beim Laden der Spieler.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPlayers = players.filter(player =>
    player.username.toLowerCase().includes(search.toLowerCase()) ||
    player.first_name.toLowerCase().includes(search.toLowerCase()) ||
    player.last_name.toLowerCase().includes(search.toLowerCase()) ||
    player.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center">
              <Users size={32} className="text-red-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">Spieler</h1>
            </div>
            <button
            onClick={() => router.push("/player/new")}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <PlusCircle size={20} className="mr-2" />
            Neuer Spieler
          </button>
        </div>

          {/* Search */}
        <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
                placeholder="Spieler suchen (Name, Benutzername, E-Mail)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
        </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin h-8 w-8 text-red-600 mr-3" />
              <p className="text-gray-600">Lade Spieler...</p>
          </div>
        )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
              <button
                onClick={loadPlayers}
                className="ml-4 underline hover:no-underline"
              >
                Erneut versuchen
              </button>
              </div>
          )}

          {/* Players List */}
          {!isLoading && !error && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {filteredPlayers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Spieler
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Benutzername
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          E-Mail
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Geschlecht
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Plattformen
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aktionen
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPlayers.map((player) => (
                        <tr key={player.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link 
                              href={`/player/${player.id}`}
                              className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors cursor-pointer"
                            >
                              {player.first_name} {player.last_name}
    </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{player.username}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{player.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {player.gender === 'M' ? 'Männlich' : player.gender === 'F' ? 'Weiblich' : 'Andere'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {player.platform_ids && Object.keys(player.platform_ids).length > 0 ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {Object.keys(player.platform_ids).length} Plattform{Object.keys(player.platform_ids).length !== 1 ? 'en' : ''}
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs">Keine</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={`/player/${player.id}`}
                              className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                              <Eye size={16} className="mr-1" />
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {players.length > 0 ? "Keine Spieler gefunden" : "Noch keine Spieler"}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {players.length > 0 
                      ? "Keine Spieler entsprechen deiner Suche." 
                      : "Erstelle deinen ersten Spieler, um loszulegen."
}
                  </p>
                  {players.length === 0 && (
                    <button
                      onClick={() => router.push("/player/new")}
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      <PlusCircle size={16} className="mr-2" />
                      Ersten Spieler erstellen
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link href={href} className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600">
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function MobileLink({ label }: { label: string }) {
  return (
    <a href="#" className="block text-gray-700 hover:text-red-600">
      {label}
    </a>
  );
}