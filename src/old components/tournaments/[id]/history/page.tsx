"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import Sidebar from "../../../../../components/Sidebar";
import HistoryBracketDisplay from "../../../../../components/HistoryBracketDisplay";
import {
  Tournament,
  Matchup,
  EnrichedTournamentPlayer,
  CardGame,
  GameMode
} from "@/types/tournament";
import { Player } from "@/types/player";
import {
  fetchTournamentById,
  fetchTournamentParticipants,
  fetchTournamentMatchupsByTournamentId,
  fetchPlayerById,
  fetchCardGameById,
  fetchGameModeById
} from "@/lib/apiClient";
import { format } from 'date-fns';
import { 
  Loader2Icon, 
  TrophyIcon,
  HistoryIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  Gamepad2Icon,
  ChevronDownIcon,
  ChevronUpIcon
} from "lucide-react";

interface RoundGroup {
  roundId: number;
  roundNumber: number;
  matchups: Matchup[];
}

export default function TournamentHistoryPage() {
  const { id } = useParams();
  const tournamentId = id as string;

  // State management
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [participants, setParticipants] = useState<EnrichedTournamentPlayer[]>([]);
  const [playersMap, setPlayersMap] = useState<Map<number, Player>>(new Map());
  const [cardGameDetails, setCardGameDetails] = useState<CardGame | null>(null);
  const [gameModeDetails, setGameModeDetails] = useState<GameMode | null>(null);
  const [expandedRounds, setExpandedRounds] = useState<Set<number>>(new Set());

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTournamentHistory = useCallback(async () => {
    console.log(`loadTournamentHistory: Starting to load data for tournament ID: ${tournamentId}`);
    setIsLoading(true);
    setError(null);

    try {
      // Fetch tournament details
      const tournamentData = await fetchTournamentById(tournamentId);
      if (!tournamentData) {
        throw new Error("Turnier nicht gefunden");
      }
      console.log("loadTournamentHistory: Tournament data loaded:", tournamentData);
      setTournament(tournamentData);

      // Fetch card game and game mode details
      const cardGameId = typeof tournamentData.cardgame === 'number' 
        ? tournamentData.cardgame 
        : tournamentData.cardgame.id;
      const gameModeId = typeof tournamentData.gamemode === 'number' 
        ? tournamentData.gamemode 
        : tournamentData.gamemode.id;

      const [cgDetails, gmDetails] = await Promise.all([
        fetchCardGameById(cardGameId),
        fetchGameModeById(gameModeId)
      ]);

      setCardGameDetails(cgDetails);
      setGameModeDetails(gmDetails);

      // Fetch all matchups for this tournament
      const matchupsData = await fetchTournamentMatchupsByTournamentId(tournamentId);
      setMatchups(matchupsData || []);

      // Fetch participants
      const participantsData = await fetchTournamentParticipants(tournamentId);
      if (participantsData && participantsData.length > 0) {
        const enrichedParticipants = await Promise.all(
          participantsData.map(async (participant) => {
            const playerDetails = await fetchPlayerById(participant.player);
            return { ...participant, player_details: playerDetails || undefined };
          })
        );
        setParticipants(enrichedParticipants);

        // Create players map
        const newPlayersMap = new Map<number, Player>();
        enrichedParticipants.forEach(participant => {
          if (participant.player_details) {
            newPlayersMap.set(participant.player, participant.player_details);
          }
        });
        setPlayersMap(newPlayersMap);
      }

      setIsLoading(false);
    } catch (error: any) {
      console.error("loadTournamentHistory: Error loading tournament history:", error);
      setError(error.message || "Fehler beim Laden der Turnier-Historie.");
      setIsLoading(false);
    }
  }, [tournamentId]);

  // Group matchups by rounds
  const roundGroups = useMemo((): RoundGroup[] => {
    if (!matchups.length) return [];

    // Group matchups by round ID
    const groupedByRound = matchups.reduce((acc, matchup) => {
      const roundId = matchup.match;
      if (!acc[roundId]) {
        acc[roundId] = [];
      }
      acc[roundId].push(matchup);
      return acc;
    }, {} as Record<number, Matchup[]>);

    // Convert to array and sort by round ID, then assign sequential round numbers
    const rounds = Object.entries(groupedByRound)
      .map(([roundId, roundMatchups]) => ({
        roundId: parseInt(roundId),
        matchups: roundMatchups
      }))
      .sort((a, b) => a.roundId - b.roundId)
      .map((round, index) => ({
        ...round,
        roundNumber: index + 1 // Start counting from 1, ignore actual round numbers
      }));

    return rounds;
  }, [matchups]);

  useEffect(() => {
    loadTournamentHistory();
  }, [loadTournamentHistory]);

  // Helper functions for display
  const cardGameName = cardGameDetails?.name || 'Unbekannt';
  const cardGamePublisher = cardGameDetails?.publisher;
  const gameModeName = gameModeDetails?.name || 'Unbekannt';

  const toggleRound = (roundId: number) => {
    const newExpanded = new Set(expandedRounds);
    if (newExpanded.has(roundId)) {
      newExpanded.delete(roundId);
    } else {
      newExpanded.add(roundId);
    }
    setExpandedRounds(newExpanded);
  };

  const expandAllRounds = () => {
    setExpandedRounds(new Set(roundGroups.map(round => round.roundId)));
  };

  const collapseAllRounds = () => {
    setExpandedRounds(new Set());
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2Icon size={48} className="animate-spin text-red-600 mx-auto mb-4" />
            <p className="text-gray-600">Lade Turnier-Historie...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadTournamentHistory}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Turnier nicht gefunden</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center mb-4">
              <HistoryIcon size={32} className="mr-3 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Turnier-Historie</h1>
                <p className="text-gray-600">Alle Paarungen und Ergebnisse nach Runden</p>
              </div>
            </div>

            {/* Tournament Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <TrophyIcon size={20} className="mr-2 text-red-600" />
                {tournament.name}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon size={16} className="mr-2 text-gray-400" />
                  <span><strong>Ort:</strong> {tournament.location}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon size={16} className="mr-2 text-gray-400" />
                  <span><strong>Datum:</strong> {format(new Date(tournament.date), 'dd.MM.yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <Gamepad2Icon size={16} className="mr-2 text-gray-400" />
                  <span><strong>Kartenspiel:</strong> {cardGameName} {cardGamePublisher && `(${cardGamePublisher})`}</span>
                </div>
                <div className="flex items-center">
                  <span><strong>Spielmodus:</strong> {gameModeName}</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon size={16} className="mr-2 text-gray-400" />
                  <span><strong>Teilnehmer:</strong> {participants.length}/{tournament.max_players}</span>
                </div>
                <div className="flex items-center">
                  <span><strong>Status:</strong> <span className="font-semibold text-blue-600">{tournament.state}</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Rounds History */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Runden-Historie ({roundGroups.length} Runden, {matchups.length} Paarungen)
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={expandAllRounds}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors"
                >
                  Alle öffnen
                </button>
                <button
                  onClick={collapseAllRounds}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors"
                >
                  Alle schließen
                </button>
              </div>
            </div>

            {roundGroups.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Keine Runden verfügbar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {roundGroups.map((round) => (
                  <div key={round.roundId} className="border border-gray-200 rounded-lg">
                    {/* Round Header */}
                    <button
                      onClick={() => toggleRound(round.roundId)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                    >
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-800">
                          Runde {round.roundNumber}
                        </h3>
                        <span className="ml-3 text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
                          {round.matchups.length} Paarungen
                        </span>
                      </div>
                      {expandedRounds.has(round.roundId) ? (
                        <ChevronUpIcon size={20} className="text-gray-600" />
                      ) : (
                        <ChevronDownIcon size={20} className="text-gray-600" />
                      )}
                    </button>

                    {/* Round Content */}
                    {expandedRounds.has(round.roundId) && (
                      <div className="p-4 border-t border-gray-200">
                        <HistoryBracketDisplay
                          matchups={round.matchups}
                          playersMap={playersMap}
                          startTable={tournament.start_table}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}