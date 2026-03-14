'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Calendar, MapPin, Users, Clock, Gamepad2, Plus } from 'lucide-react';
import Sidebar from '../../../../components/Sidebar';
import { fetchCardGames, fetchGameModes, createTournament } from '@/lib/apiClient';
import { CardGame, GameMode, NewTournamentPayload, TournamentState } from '@/types/tournament';

export default function NewTournamentPage() {
  const router = useRouter();
  
  // Form state
  const [tournamentName, setTournamentName] = useState('');
  const [selectedCardGameId, setSelectedCardGameId] = useState<number | null>(null);
  const [selectedGameModeId, setSelectedGameModeId] = useState<number | null>(null);
  const [maxPlayers, setMaxPlayers] = useState<number>(8);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [startTable, setStartTable] = useState<number | null>(null);
  const [timePerRound, setTimePerRound] = useState<number | null>(null);
  
  // Data state
  const [cardGames, setCardGames] = useState<CardGame[]>([]);
  const [gameModes, setGameModes] = useState<GameMode[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [dataLoadingError, setDataLoadingError] = useState<string | null>(null);
  
  // Form submission state
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsDataLoading(true);
        setDataLoadingError(null);
        
        const [cardGamesData, gameModesData] = await Promise.all([
          fetchCardGames(),
          fetchGameModes()
        ]);
        
        setCardGames(cardGamesData);
        setGameModes(gameModesData);
      } catch (error) {
        console.error('Error loading data:', error);
        setDataLoadingError('Fehler beim Laden der Daten. Bitte versuchen Sie es erneut.');
      } finally {
        setIsDataLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!tournamentName.trim()) {
      setFormError('Turniername ist erforderlich.');
      return;
    }
    
    if (!selectedCardGameId) {
      setFormError('Bitte wählen Sie ein Kartenspiel aus.');
      return;
    }
    
    if (!selectedGameModeId) {
      setFormError('Bitte wählen Sie einen Spielmodus aus.');
      return;
    }
    
    if (!date) {
      setFormError('Datum ist erforderlich.');
      return;
    }
    
    if (!location.trim()) {
      setFormError('Ort ist erforderlich.');
      return;
    }
    
    if (maxPlayers < 2) {
      setFormError('Mindestens 2 Spieler sind erforderlich.');
      return;
    }

    try {
      setIsLoading(true);
      setFormError(null);
      
      const payload: NewTournamentPayload = {
        name: tournamentName.trim(),
        date,
        location: location.trim(),
        max_players: maxPlayers,
        cardgame: selectedCardGameId,
        gamemode: selectedGameModeId,
        state: TournamentState.PLANNED,
        ...(startTable && { start_table: startTable }),
        ...(timePerRound && { time_per_round: timePerRound })
      };
      
      await createTournament(payload);
      router.push('/tournaments');
    } catch (error) {
      console.error('Error creating tournament:', error);
      setFormError('Fehler beim Erstellen des Turniers. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isDataLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Lade Daten...</p>
          </div>
        </main>
      </div>
    );
  }

  if (dataLoadingError) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
              <Trophy className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-red-800 mb-2">Fehler beim Laden</h3>
              <p className="text-red-600 mb-4">{dataLoadingError}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Erneut versuchen
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Trophy size={32} className="text-red-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Neues Turnier erstellen</h1>
            </div>
            <p className="text-gray-600">
              Erstellen Sie ein neues Turnier und konfigurieren Sie alle wichtigen Details.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Display */}
              {formError && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-600 text-sm">{formError}</p>
                </div>
              )}

              {/* Basic Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Grundinformationen</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tournament Name */}
                  <div className="md:col-span-2">
                    <label htmlFor="tournamentName" className="block text-sm font-medium text-gray-700 mb-1">
                      Turniername <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <Trophy size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="tournamentName"
                        type="text"
                        value={tournamentName}
                        onChange={(e) => setTournamentName(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        placeholder="z.B. Pokémon TCG Turnier 2024"
                        required
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Ort <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        placeholder="z.B. Spieleladen München"
                        required
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Datum <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Configuration Section */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Gamepad2 size={24} className="mr-2 text-red-600" />
                  Spiel-Konfiguration
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card Game */}
                  <div>
                    <label htmlFor="cardGame" className="block text-sm font-medium text-gray-700 mb-1">
                      Kartenspiel <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="cardGame"
                      value={selectedCardGameId || ''}
                      onChange={(e) => setSelectedCardGameId(e.target.value ? Number(e.target.value) : null)}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Kartenspiel auswählen</option>
                      {cardGames.map((game) => (
                        <option key={game.id} value={game.id}>
                          {game.name} {game.publisher && `(${game.publisher})`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Game Mode */}
                  <div>
                    <label htmlFor="gameMode" className="block text-sm font-medium text-gray-700 mb-1">
                      Spielmodus <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="gameMode"
                      value={selectedGameModeId || ''}
                      onChange={(e) => setSelectedGameModeId(e.target.value ? Number(e.target.value) : null)}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Spielmodus auswählen</option>
                      {gameModes.map((mode) => (
                        <option key={mode.id} value={mode.id}>
                          {mode.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tournament Settings Section */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Turnier-Einstellungen</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Max Players */}
                  <div>
                    <label htmlFor="maxPlayers" className="block text-sm font-medium text-gray-700 mb-1">
                      Max. Spieler <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <Users size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="maxPlayers"
                        type="number"
                        min="2"
                        max="128"
                        value={maxPlayers}
                        onChange={(e) => setMaxPlayers(Number(e.target.value))}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Start Table */}
                  <div>
                    <label htmlFor="startTable" className="block text-sm font-medium text-gray-700 mb-1">
                      Starttisch (optional)
                    </label>
                    <input
                      id="startTable"
                      type="number"
                      min="1"
                      value={startTable || ''}
                      onChange={(e) => setStartTable(e.target.value ? Number(e.target.value) : null)}
                      className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      placeholder="z.B. 1"
                    />
                  </div>

                  {/* Time per Round */}
                  <div>
                    <label htmlFor="timePerRound" className="block text-sm font-medium text-gray-700 mb-1">
                      Zeit pro Runde (Min.)
                    </label>
                    <div className="relative">
                      <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="timePerRound"
                        type="number"
                        min="1"
                        max="180"
                        value={timePerRound || ''}
                        onChange={(e) => setTimePerRound(e.target.value ? Number(e.target.value) : null)}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                        placeholder="z.B. 50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t pt-6">
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => router.push('/tournaments')}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    disabled={isLoading}
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-red-600 text-white px-6 py-2.5 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Wird erstellt...
                      </>
                    ) : (
                      <>
                        <Plus size={18} className="mr-2" />
                        Turnier erstellen
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}