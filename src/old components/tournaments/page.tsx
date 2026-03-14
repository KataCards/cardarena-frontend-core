"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "../../../components/Sidebar";
import { Tournament, CardGame, GameMode, TournamentState } from "@/types/tournament";
import { fetchTournaments } from "@/lib/apiClient";
import { 
  PlusCircle, 
  Search, 
  Trophy, 
  Eye, 
  Loader2, 
  MapPin, 
  Users, 
  Calendar, 
  Gamepad2,
  Clock
} from "lucide-react";
import { format } from 'date-fns';

export default function TournamentsListPage() {
  const router = useRouter();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const tournamentsData = await fetchTournaments();
      setTournaments(tournamentsData || []);
    } catch (error: any) {
      setError(error.message || "Fehler beim Laden der Turniere.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCardGameName = (cardgame: number | CardGame): string => {
    if (typeof cardgame === 'object' && cardgame !== null) {
      return cardgame.name;
    }
    return 'Unbekannt';
  };

  const getGameModeName = (gamemode: number | GameMode): string => {
    if (typeof gamemode === 'object' && gamemode !== null) {
      return gamemode.name;
    }
    return 'Unbekannt';
  };

  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), 'dd.MM.yyyy');
  };

  const getStateColor = (state: TournamentState): string => {
    switch (state) {
      case TournamentState.RUNNING:
        return 'bg-green-100 text-green-800';
      case TournamentState.REGISTRATION:
        return 'bg-blue-100 text-blue-800';
      case TournamentState.PLANNED:
        return 'bg-yellow-100 text-yellow-800';
      case TournamentState.FINISHED:
        return 'bg-gray-100 text-gray-800';
      case TournamentState.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStateText = (state: TournamentState): string => {
    switch (state) {
      case TournamentState.RUNNING:
        return 'Läuft';
      case TournamentState.REGISTRATION:
        return 'Anmeldung';
      case TournamentState.PLANNED:
        return 'Geplant';
      case TournamentState.FINISHED:
        return 'Beendet';
      case TournamentState.CANCELLED:
        return 'Abgesagt';
      default:
        return state;
    }
  };
  const filteredTournaments = tournaments.filter(tournament => {
    const cardGame = tournament.cardgame as CardGame;
    return (
      tournament.name.toLowerCase().includes(search.toLowerCase()) ||
      tournament.location.toLowerCase().includes(search.toLowerCase()) ||
      (cardGame?.name && cardGame.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center">
              <Trophy size={32} className="text-red-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">Turniere</h1>
            </div>
            <button
            onClick={() => router.push("/tournaments/new")}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <PlusCircle size={20} className="mr-2" />
            Neues Turnier
          </button>
        </div>

          {/* Search */}
        <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
                placeholder="Turniere suchen (Name, Ort, Kartenspiel)..."
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
              <p className="text-gray-600">Lade Turniere...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
              <button
                onClick={loadTournaments}
                className="ml-4 underline hover:no-underline"
              >
                Erneut versuchen
              </button>
    </div>
          )}

          {/* Tournaments List */}
          {!isLoading && !error && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {filteredTournaments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Turnier
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ort & Datum
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Spiel & Modus
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Teilnehmer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aktionen
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTournaments.map((tournament) => {
                        const cardGame = tournament.cardgame as CardGame;
                        const gameMode = tournament.gamemode as GameMode;
                        
                        return (
                          <tr key={tournament.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link 
                                href={`/tournaments/${tournament.id}`}
                                className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors cursor-pointer"
                              >
                                {tournament.name}
                              </Link>
                              {tournament.time_per_round && (
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                  <Clock size={12} className="mr-1" />
                                  {tournament.time_per_round} Min/Runde
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                <div className="flex items-center">
                                  <MapPin size={14} className="mr-1 text-gray-400" />
                                  {tournament.location}
                                </div>
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                  <Calendar size={12} className="mr-1" />
                                  {formatDate(tournament.date)}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                <div className="flex items-center">
                                  <Gamepad2 size={14} className="mr-1 text-gray-400" />
                                  {getCardGameName(cardGame)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {getGameModeName(gameMode)}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center text-sm text-gray-900">
                                <Users size={14} className="mr-1 text-gray-400" />
                                <span className={`font-medium ${
                                  (tournament.current_players || 0) >= tournament.max_players 
                                    ? 'text-red-600' 
                                    : 'text-gray-900'
                                }`}>
                                  {tournament.current_players || 0}
                                </span>
                                <span className="text-gray-500">/{tournament.max_players}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStateColor(tournament.state)}`}>
                                {getStateText(tournament.state)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                href={`/tournaments/${tournament.id}`}
                                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                              >
                                <Eye size={16} className="mr-1" />
                                Details
                              </Link>
                            </td>
                          </tr>
  );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Trophy className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {tournaments.length > 0 ? "Keine Turniere gefunden" : "Noch keine Turniere"}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {tournaments.length > 0 
                      ? "Keine Turniere entsprechen deiner Suche." 
                      : "Erstelle dein erstes Turnier, um loszulegen."
}
                  </p>
                  {tournaments.length === 0 && (
                    <button
                      onClick={() => router.push("/tournaments/new")}
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      <PlusCircle size={16} className="mr-2" />
                      Erstes Turnier erstellen
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
