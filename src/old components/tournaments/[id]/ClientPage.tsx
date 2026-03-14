"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Sidebar from "../../../../components/Sidebar";
import Timer from "../../../../components/Timer";
import MatchupBracket from "../../../components/MatchupBracket";
import {
  Tournament,
  RawTournamentPlayer,
  EnrichedTournamentPlayer,
  CardGame,
  GameMode,
  TournamentState,
  Round,
  RoundState,
  Matchup,
  MatchOutcome
} from "@/types/tournament";
import { Player } from "@/types/player";
import { format } from 'date-fns';
import {
  fetchTournamentById, 
  fetchTournamentParticipants, 
  fetchCardGameById, 
  fetchGameModeById, 
  fetchPlayers,
  fetchPlayerById, 
  fetchCurrentRound,
  updateTournamentState,
  createRound,
  updateRoundState,
  removePlayerFromTournament,
  prepareRound,
  fetchTournamentMatchups,
  updateMatchupOutcome
} from "@/lib/apiClient";
import AddPlayerModal from "@/components/AddPlayerModal";
import { 
  UserPlusIcon, Trash2Icon, UsersIcon, PlayIcon, CheckCircleIcon, 
  XCircleIcon, Loader2Icon, Settings2Icon, RefreshCwIcon, Edit3Icon,
  PlusCircleIcon, ClockIcon, ZapIcon, SkipForwardIcon, SwordsIcon
} from "lucide-react";

interface Props {
  tournamentId: string;
}

interface CreateRoundPayload {
  tournament_id: number;
  start_time: string;
  end_time?: string;
}

export default function TournamentDetailPage({ tournamentId }: Props) {
  console.log(`TournamentDetailPage: Component initialized with tournamentId: "${tournamentId}"`);
  
  // Existing state
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [tournamentParticipants, setTournamentParticipants] = useState<EnrichedTournamentPlayer[]>([]);
  const [allPlayersMap, setAllPlayersMap] = useState<Map<number, Player>>(new Map());
  const [cardGameDetails, setCardGameDetails] = useState<CardGame | null>(null);
  const [gameModeDetails, setGameModeDetails] = useState<GameMode | null>(null);
  const [isLoadingTournament, setIsLoadingTournament] = useState(true);
  const [isLoadingParticipants, setIsLoadingParticipants] = useState(false);
  const [isLoadingActions, setIsLoadingActions] = useState(false);
  const [isLoadingRound, setIsLoadingRound] = useState(false);
  const [errorTournament, setErrorTournament] = useState<string | null>(null);
  const [errorParticipants, setErrorParticipants] = useState<string | null>(null);
  const [errorActions, setErrorActions] = useState<string | null>(null);
  const [errorRound, setErrorRound] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New state for matchups
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [isLoadingMatchups, setIsLoadingMatchups] = useState(false);
  const [errorMatchups, setErrorMatchups] = useState<string | null>(null);

  // Check if adding players is allowed (only during REGISTRATION)
  const canAddPlayers = tournament?.state === TournamentState.REGISTRATION;

  // Check if removing players is allowed (after round completion or during PLANNED/REGISTRATION)
  const canRemovePlayer = (tournament: Tournament, currentRound: Round | null): boolean => {
    // Allow removal during PLANNED or REGISTRATION states
    if (tournament.state === TournamentState.PLANNED || tournament.state === TournamentState.REGISTRATION) {
      return true;
    }

    // During RUNNING state, allow removal when round is NOT running
    if (tournament.state === TournamentState.RUNNING) {
      // If no current round exists, allow removal
      if (!currentRound) {
        return true;
      }
      
      // Allow removal when round is in any state EXCEPT RUNNING
      return currentRound.preparation_status !== RoundState.RUNNING;
    }
    
    return false;
  };

  // Load matchups function
  const loadMatchups = useCallback(async () => {
    if (!tournament || !currentRound || tournament.state !== TournamentState.RUNNING) {
      setMatchups([]);
      return;
    }

    setIsLoadingMatchups(true);
    setErrorMatchups(null);
    
    try {
      const matchupsData = await fetchTournamentMatchups(tournament.id);
      setMatchups(matchupsData || []);
    } catch (error: any) {
      console.error("loadMatchups: Error loading matchups:", error);
      setErrorMatchups(error.message || "Fehler beim Laden der Paarungen.");
    } finally {
      setIsLoadingMatchups(false);
    }
  }, [tournament, currentRound]);

  // Handle matchup winner update
  const handleUpdateMatchupWinner = async (matchupId: number, outcome: MatchOutcome) => {
    try {
      await updateMatchupOutcome(matchupId, outcome);
      // Reload matchups to get updated data
      await loadMatchups();
    } catch (error: any) {
      console.error("Error updating matchup winner:", error);
      alert("Fehler beim Aktualisieren des Gewinners: " + (error.message || "Unbekannter Fehler"));
    }
  };

  const loadTournamentData = useCallback(async () => {
    console.log(`loadTournamentData: Starting to load data for tournament ID: ${tournamentId}`);
    setIsLoadingTournament(true);
    setErrorTournament(null);

    try {
      // Fetch tournament details
      const tournamentData = await fetchTournamentById(tournamentId);
      if (!tournamentData) {
        throw new Error("Turnier nicht gefunden");
      }
      console.log("loadTournamentData: Tournament data loaded:", tournamentData);

      // Fetch card game and game mode details
      const cardGameId = typeof tournamentData.cardgame === 'number' 
        ? tournamentData.cardgame 
        : tournamentData.cardgame.id;
      const gameModeId = typeof tournamentData.gamemode === 'number' 
        ? tournamentData.gamemode 
        : tournamentData.gamemode.id;

      const [cgDetails, gmDetails, currentRoundData, allPlayersForModal] = await Promise.all([
        fetchCardGameById(cardGameId),
        fetchGameModeById(gameModeId),
        fetchCurrentRound(tournamentId),
        fetchPlayers()
      ]);

      setTournament(tournamentData);
      setCardGameDetails(cgDetails);
      setGameModeDetails(gmDetails);
      setCurrentRound(currentRoundData);

      // Set up players map for modal
      if (allPlayersForModal) {
        const playersMap = new Map<number, Player>();
        allPlayersForModal.forEach(player => playersMap.set(player.id, player));
        setAllPlayersMap(playersMap);
      }

      // Load participants
      setIsLoadingParticipants(true);
      try {
        const rawParticipants = await fetchTournamentParticipants(tournamentId);
        if (rawParticipants && rawParticipants.length > 0) {
          const enrichedPromises = rawParticipants.map(async (rp) => {
            const playerDetails = await fetchPlayerById(rp.player);
            return { ...rp, player_details: playerDetails || undefined };
          });
          const enriched = await Promise.all(enrichedPromises);
          setTournamentParticipants(enriched);
        } else {
          setTournamentParticipants([]);
        }
      } catch (error) {
        console.error("loadTournamentData: Error loading participants:", error);
        setErrorParticipants("Fehler beim Laden der Teilnehmer.");
      } finally {
        setIsLoadingParticipants(false);
      }

      setIsLoadingTournament(false);
    } catch (error: any) {
      console.error("loadTournamentData: Error loading tournament data:", error);
      setErrorTournament(error.message || "Fehler beim Laden der Turnierdaten.");
      setIsLoadingTournament(false);
    }
  }, [tournamentId]);

  useEffect(() => {
    loadTournamentData();
  }, [loadTournamentData]);

  // Load matchups when tournament or round changes
  useEffect(() => {
    loadMatchups();
  }, [loadMatchups]);

  const handleUpdateTournamentState = async (newState: TournamentState) => {
    console.log(`handleUpdateTournamentState: Updating to state: ${newState}`);
    if (!tournament) {
      console.error("handleUpdateTournamentState: No tournament data available");
      return;
    }
    setIsLoadingActions(true);
    setErrorActions(null);
    try {
      const updatedTournament = await updateTournamentState(tournament.id, newState);
      setTournament(updatedTournament);
      
      if (newState === TournamentState.REGISTRATION) {
        alert("Anmeldung für das Turnier geöffnet!");
      } else if (newState === TournamentState.RUNNING) {
        alert("Turnier gestartet! Sie können jetzt Runden erstellen und verwalten.");
      } else if (newState === TournamentState.FINISHED) {
        alert("Turnier beendet!");
      }
    } catch (err: any) {
      console.error("handleUpdateTournamentState: Error:", err);
      setErrorActions(err.message || `Fehler beim Ändern des Turnierstatus.`);
    } finally {
      setIsLoadingActions(false);
    }
  };

  const handleCreateRound = async () => {
    console.log("handleCreateRound: Creating new round");
    if (!tournament) {
      console.error("handleCreateRound: No tournament data available");
      return;
    }
    
    if (tournament.state !== TournamentState.RUNNING) {
      setErrorRound("Turnier muss im Status 'Läuft' sein, um Runden zu erstellen.");
      return;
    }

    setIsLoadingRound(true);
    setErrorRound(null);
    
    try {
      // Use a placeholder start time - will be updated when round actually starts
      const placeholderStartTime = new Date().toISOString();
      
      const roundData: CreateRoundPayload = {
        tournament_id: tournament.id,
        start_time: placeholderStartTime
      };

      console.log("handleCreateRound: Creating round with placeholder start time:", roundData);
      const createdRound = await createRound(tournament.id, roundData);
      
      if (createdRound) {
        setCurrentRound(createdRound);
        alert(`Runde ${createdRound.round_number} erfolgreich erstellt! Status: ${createdRound.preparation_status}`);
      } else {
        throw new Error("Runde konnte nicht erstellt werden.");
      }
    } catch (err: any) {
      console.error("handleCreateRound: Error:", err);
      setErrorRound(err.message || "Fehler beim Erstellen der Runde.");
    } finally {
      setIsLoadingRound(false);
    }
  };

  const handleUpdateRoundState = async (newState: RoundState) => {
    console.log(`handleUpdateRoundState: Updating round to state: ${newState}`);
    if (!tournament || !currentRound) {
      console.error("handleUpdateRoundState: No tournament or round data available");
      return;
    }

    setIsLoadingRound(true);
    setErrorRound(null);
    
    try {
      // Special handling for PREPARING state - call prepare-round endpoint
      if (newState === RoundState.PREPARING) {
        console.log('handleUpdateRoundState: Calling prepare-round endpoint');
        
        // First, call the prepare-round endpoint to generate pairings
        const prepareResult = await prepareRound(tournament.id);
        
        if (prepareResult) {
          console.log('handleUpdateRoundState: Prepare-round successful:', prepareResult);
          alert(`Paarungen generiert! ${prepareResult.message}\nAlgorithmus: ${prepareResult.algorithm_used}`);
        }
      }
      
      // Then update the round state
      const updatedRound = await updateRoundState(tournament.id, currentRound.id, newState);
      
      if (updatedRound) {
        setCurrentRound(updatedRound);
        console.log('Round state updated to:', updatedRound.preparation_status);
        
        // Special handling for DONE state - refresh tournament data to get accurate state
        if (newState === RoundState.DONE) {
          console.log('handleUpdateRoundState: Round finished, refreshing all tournament data');
          // Refresh all tournament data to ensure consistency
          setTimeout(() => {
                loadTournamentData();
          }, 500); // Small delay to ensure backend has processed the finish-round
        }
        
        // Reload matchups after state change
        if (newState === RoundState.PREPARING) {
          await loadMatchups();
        }
        
        let message = "";
        switch (newState) {
        case RoundState.PREPARING:
            message = `Runde ${updatedRound.round_number} wurde vorbereitet und Paarungen wurden generiert.`;
          break;
        case RoundState.RUNNING:
            message = `Runde ${updatedRound.round_number} läuft jetzt! Timer gestartet.`;
          break;
        case RoundState.DONE:
            message = `Runde ${updatedRound.round_number} wurde beendet. Endzeit gesetzt.`;
          break;
        default:
            message = `Runde ${updatedRound.round_number} Status aktualisiert.`;
      }
        
        // Only show this alert if we didn't already show the prepare-round alert
        if (newState !== RoundState.PREPARING) {
          alert(message);
    }
      } else {
        throw new Error("Rundenstatus konnte nicht aktualisiert werden.");
  }
    } catch (err: any) {
      console.error("handleUpdateRoundState: Error:", err);

      // More specific error handling
      if (newState === RoundState.PREPARING) {
        setErrorRound(err.message || "Fehler beim Vorbereiten der Runde und Generieren der Paarungen.");
      } else {
        setErrorRound(err.message || "Fehler beim Aktualisieren des Rundenstatus.");
      }
    } finally {
      setIsLoadingRound(false);
    }
  };

  const handlePlayerAdded = useCallback(async (newPlayerEntry: RawTournamentPlayer | null) => {
    console.log("handlePlayerAdded: Player added:", newPlayerEntry);
    if (!newPlayerEntry) {
      console.warn("handlePlayerAdded: No player entry provided");
      return;
    }
    
    console.log("handlePlayerAdded: Refreshing participant list after adding player");
    setIsLoadingParticipants(true);
    try {
      const rawParticipants = await fetchTournamentParticipants(tournamentId);
      if (rawParticipants && rawParticipants.length > 0) {
        const enrichedPromises = rawParticipants.map(async (rp) => {
          const playerDetails = await fetchPlayerById(rp.player);
          return { ...rp, player_details: playerDetails || undefined };
        });
        const enriched = await Promise.all(enrichedPromises);
        setTournamentParticipants(enriched);
        setTournament(prev => prev ? ({ ...prev, players_count: enriched.length }) : null);
      } else {
        setTournamentParticipants([]);
        setTournament(prev => prev ? ({ ...prev, players_count: 0 }) : null);
      }
    } catch (error) {
      console.error("handlePlayerAdded: Error refreshing participants:", error);
      setErrorParticipants("Fehler beim Aktualisieren der Spielerliste nach Hinzufügen.");
    } finally {
      setIsLoadingParticipants(false);
    }
  }, [tournamentId]);

  const handleRemovePlayer = async (tournamentPlayerEntryId: number) => {
    console.log(`handleRemovePlayer: Removing player entry ${tournamentPlayerEntryId}`);
    if (!confirm("Sicher, dass du diesen Spieler vom Turnier entfernen möchtest?")) return;
    
    setIsLoadingActions(true);
    setErrorActions(null);
    try {
      await removePlayerFromTournament(tournamentPlayerEntryId);
      console.log("handleRemovePlayer: Player removed, refreshing participant list");
      
      const rawParticipants = await fetchTournamentParticipants(tournamentId);
      if (rawParticipants && rawParticipants.length > 0) {
        const enrichedPromises = rawParticipants.map(async (rp) => {
          const playerDetails = await fetchPlayerById(rp.player);
          return { ...rp, player_details: playerDetails || undefined };
        });
        const enriched = await Promise.all(enrichedPromises);
        setTournamentParticipants(enriched);
        setTournament(prev => prev ? ({ ...prev, players_count: enriched.length }) : null);
      } else {
        setTournamentParticipants([]);
        setTournament(prev => prev ? ({ ...prev, players_count: 0 }) : null);
      }
    } catch (err: any) {
      console.error("handleRemovePlayer: Error:", err);
      setErrorActions(err.message || "Fehler beim Entfernen des Spielers.");
    } finally {
      setIsLoadingActions(false);
    }
  };

  const currentTournamentPlayerIds = useMemo(() => {
    const ids = tournamentParticipants.map(tp => tp.player);
    console.log("currentTournamentPlayerIds: Calculated IDs:", ids);
    return ids;
  }, [tournamentParticipants]);

  // Calculate timer initial time based on round state and tournament time_per_round
  const getTimerInitialTime = (): number => {
    if (!tournament?.time_per_round || !currentRound) {
      return 0; // No timer if no time_per_round or no current round
    }

    if (currentRound.preparation_status !== RoundState.RUNNING) {
      return 0; // Timer only runs when round is RUNNING
    }

    // Calculate elapsed time since round started
    const roundStartTime = new Date(currentRound.start_time).getTime();
    const currentTime = new Date().getTime();
    const elapsedSeconds = Math.floor((currentTime - roundStartTime) / 1000);
    const totalRoundSeconds = tournament.time_per_round * 60;
    
    // Return remaining time (can be negative if overtime)
    return Math.max(0, totalRoundSeconds - elapsedSeconds);
  };

  // Loading state
  if (isLoadingTournament) {
    console.log("Rendering: Loading state");
    return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <Loader2Icon size={48} className="animate-spin text-red-600" />
          <p className="ml-4 text-xl text-gray-700">Lade Turnierdaten...</p>
      </main>
    </div>
  );
}

  // Error state
  if (errorTournament) {
    console.log("Rendering: Error state");
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <XCircleIcon size={48} className="text-red-600 mx-auto mb-4" />
            <p className="text-xl text-red-600 mb-4">{errorTournament}</p>
            <button 
              onClick={() => {
                setErrorTournament(null);
                loadTournamentData();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Erneut versuchen
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!tournament) {
    console.log("Rendering: No tournament data");
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <p className="text-xl text-gray-700">Keine Turnierdaten verfügbar.</p>
        </main>
      </div>
    );
  }

  console.log("Rendering: Tournament detail page with data");

  // Extract display values
  const cardGameName = cardGameDetails?.name || 'Unbekannt';
  const cardGamePublisher = cardGameDetails?.publisher;
  const gameModeName = gameModeDetails?.name || 'Unbekannt';

  // Common button styling
  const commonButtonClass = "flex items-center px-4 py-2 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const loadingIcon = <Loader2Icon size={18} className="animate-spin mr-2" />;

  // Tournament action buttons based on state
  let tournamentActionButton;
  switch (tournament.state) {
    case TournamentState.PLANNED:
      tournamentActionButton = (
        <button onClick={() => handleUpdateTournamentState(TournamentState.REGISTRATION)} disabled={isLoadingActions}
          className={`${commonButtonClass} bg-yellow-500 hover:bg-yellow-600`}>
          {isLoadingActions && loadingIcon} <Edit3Icon size={18} className="mr-2"/> Anmeldung Öffnen
        </button>
      );
      break;
    case TournamentState.REGISTRATION:
      tournamentActionButton = (
        <button onClick={() => handleUpdateTournamentState(TournamentState.RUNNING)} disabled={isLoadingActions}
          className={`${commonButtonClass} bg-green-600 hover:bg-green-700`}>
          {isLoadingActions && loadingIcon} <PlayIcon size={18} className="mr-2"/> Turnier Starten
        </button>
      );
      break;
    case TournamentState.RUNNING:
      tournamentActionButton = (
        <button onClick={() => handleUpdateTournamentState(TournamentState.FINISHED)} disabled={isLoadingActions}
          className={`${commonButtonClass} bg-blue-600 hover:bg-blue-700`}>
          {isLoadingActions && loadingIcon} <CheckCircleIcon size={18} className="mr-2"/> Turnier Beenden
        </button>
      );
      break;
    case TournamentState.FINISHED:
      tournamentActionButton = (
        <button disabled={true} className={`${commonButtonClass} bg-gray-400 cursor-not-allowed`}>
          <CheckCircleIcon size={18} className="mr-2"/> Turnier Beendet
        </button>
      );
      break;
    case TournamentState.CANCELLED:
      tournamentActionButton = (
        <button disabled={true} className={`${commonButtonClass} bg-red-400 cursor-not-allowed`}>
          <XCircleIcon size={18} className="mr-2"/> Turnier Abgesagt
        </button>
      );
      break;
    default:
      tournamentActionButton = null;
  }

  // Round management buttons
  let roundManagementButton;
  if (tournament.state === TournamentState.RUNNING) {
    if (!currentRound) {
      // No current round - show create button
      roundManagementButton = (
        <button onClick={handleCreateRound} disabled={isLoadingRound}
          className={`${commonButtonClass} bg-indigo-600 hover:bg-indigo-700`}>
          {isLoadingRound && loadingIcon} <PlusCircleIcon size={18} className="mr-2"/> Runde Erstellen
        </button>
      );
    } else {
      // Current round exists - show state transition buttons
      switch (currentRound.preparation_status) {
        case RoundState.PLANNED:
          roundManagementButton = (
            <button onClick={() => handleUpdateRoundState(RoundState.PREPARING)} disabled={isLoadingRound}
              className={`${commonButtonClass} bg-orange-600 hover:bg-orange-700`}>
              {isLoadingRound && loadingIcon} <ClockIcon size={18} className="mr-2"/> Runde Vorbereiten
            </button>
          );
          break;
        case RoundState.PREPARING:
          roundManagementButton = (
            <button onClick={() => handleUpdateRoundState(RoundState.RUNNING)} disabled={isLoadingRound}
              className={`${commonButtonClass} bg-green-600 hover:bg-green-700`}>
              {isLoadingRound && loadingIcon} <ZapIcon size={18} className="mr-2"/> Runde Starten
            </button>
          );
          break;
        case RoundState.RUNNING:
          roundManagementButton = (
            <button onClick={() => handleUpdateRoundState(RoundState.DONE)} disabled={isLoadingRound}
              className={`${commonButtonClass} bg-blue-600 hover:bg-blue-700`}>
              {isLoadingRound && loadingIcon} <CheckCircleIcon size={18} className="mr-2"/> Runde Beenden
            </button>
          );
          break;
        case RoundState.DONE:
          roundManagementButton = (
            <button onClick={handleCreateRound} disabled={isLoadingRound}
              className={`${commonButtonClass} bg-indigo-600 hover:bg-indigo-700`}>
              {isLoadingRound && loadingIcon} <SkipForwardIcon size={18} className="mr-2"/> Nächste Runde
            </button>
          );
          break;
        default:
          roundManagementButton = null;
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Tournament Header */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{tournament.name}</h1>
              <button
                onClick={() => loadTournamentData()} 
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-200 rounded-full transition-colors"
                title="Daten aktualisieren"
                disabled={isLoadingTournament || isLoadingActions || isLoadingParticipants || isLoadingRound} 
              >
                {(isLoadingTournament || isLoadingActions || isLoadingParticipants || isLoadingRound) ? <Loader2Icon size={20} className="animate-spin" /> : <RefreshCwIcon size={20} />}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <p><strong>Ort:</strong> {tournament.location}</p>
              <p><strong>Datum:</strong> {format(new Date(tournament.date), 'dd.MM.yyyy')}</p>
              <p><strong>Kartenspiel:</strong> {cardGameName} {cardGamePublisher && `(${cardGamePublisher})`}</p>
              <p><strong>Spielmodus:</strong> {gameModeName}</p>
              <p><strong>Max. Spieler:</strong> {tournament.max_players}</p>
              <p><strong>Status:</strong> <span className={`font-semibold ${
                tournament.state === TournamentState.RUNNING ? 'text-green-600' : 
                tournament.state === TournamentState.REGISTRATION ? 'text-yellow-600' : 
                tournament.state === TournamentState.FINISHED ? 'text-blue-600' : 'text-gray-600'
              }`}>{tournament.state}</span></p>
              {currentRound && (
                <p><strong>Aktuelle Runde:</strong> <span className={`font-semibold ${
                  currentRound.preparation_status === RoundState.RUNNING ? 'text-green-600' : 
                  currentRound.preparation_status === RoundState.PREPARING ? 'text-orange-600' : 
                  currentRound.preparation_status === RoundState.DONE ? 'text-blue-600' : 'text-gray-600'
                }`}>#{currentRound.round_number} ({currentRound.preparation_status})</span></p>
              )}
            </div>
          </div>

          {/* Tournament Actions */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Turnier-Aktionen</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {tournamentActionButton}
              {roundManagementButton}
              <Link href={`/tournaments/${tournament.id}/bracket`}>
                <button className={`${commonButtonClass} bg-purple-600 hover:bg-purple-700`}>
                  <Settings2Icon size={18} className="mr-2"/> Bracket verwalten
                </button>
              </Link>
              <Link href={`/tournaments/${tournament.id}/display`}>
                <button className={`${commonButtonClass} bg-gray-600 hover:bg-gray-700`}>
                  <Settings2Icon size={18} className="mr-2"/> Display Ansicht
                </button>
              </Link>
            </div>

            {/* Timer - Only shows when round is RUNNING and tournament has time_per_round */}
            {tournament.time_per_round && currentRound && currentRound.preparation_status === RoundState.RUNNING && (
              <div className="mt-4">
                <Timer initialTime={getTimerInitialTime()} />
              </div>
            )}
          </div>

          {/* Error display for actions */}
          {errorActions && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errorActions}
            </div>
          )}

          {/* Error display for rounds */}
          {errorRound && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errorRound}
            </div>
          )}

          {/* Bracket/Matches Section - Only show when tournament is running and there are matchups */}
          {tournament && tournament.state === TournamentState.RUNNING && currentRound && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <SwordsIcon size={24} className="mr-2 text-red-600"/>
                  Paarungen - Runde {currentRound.round_number}
                </h2>
              </div>

              {/* Error display for matchups */}
              {errorMatchups && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {errorMatchups}
                </div>
              )}

              {/* Matchups Display */}
              <MatchupBracket
                matchups={matchups}
                playersMap={allPlayersMap}
                tournament={tournament}
                onUpdateWinner={handleUpdateMatchupWinner}
                isLoading={isLoadingMatchups}
              />
            </div>
          )}

          {/* Players Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <UsersIcon size={24} className="mr-2 text-red-600"/>
                Teilnehmer ({tournamentParticipants.length}/{tournament.max_players})
              </h2>
              
              {/* Add Player Button - Only show during REGISTRATION */}
              {canAddPlayers && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                  disabled={isLoadingParticipants}
                >
                  {isLoadingParticipants ? (
                    <Loader2Icon size={18} className="animate-spin mr-2" />
                  ) : (
                    <UserPlusIcon size={18} className="mr-2" />
                  )}
                  Spieler hinzufügen
                </button>
              )}
              
              {/* State message when adding is not allowed */}
              {!canAddPlayers && tournament.state !== TournamentState.REGISTRATION && (
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
                  Spieler können nur während der Anmeldephase hinzugefügt werden
                </div>
              )}
            </div>

            {/* Error display for participants */}
            {errorParticipants && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errorParticipants}
              </div>
            )}

            {/* Participants List */}
            {isLoadingParticipants ? (
              <div className="flex items-center justify-center py-8">
                <Loader2Icon size={32} className="animate-spin text-red-600 mr-3" />
                <span className="text-gray-600">Lade Teilnehmer...</span>
              </div>
            ) : tournamentParticipants.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <UsersIcon size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg mb-2">Noch keine Teilnehmer</p>
                {canAddPlayers && (
                  <p className="text-sm">Füge den ersten Spieler hinzu, um zu beginnen.</p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {tournamentParticipants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        {participant.player_details?.first_name && participant.player_details?.last_name
                          ? `${participant.player_details.first_name} ${participant.player_details.last_name}`
                          : participant.player_details?.username || `Spieler ${participant.player}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        @{participant.player_details?.username || `player_${participant.player}`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-red-600">
                        {participant.points} Punkte
                      </span>
                      
                      {/* Remove Player Button - Only show when removal is allowed */}
                      {canRemovePlayer(tournament, currentRound) ? (
                        <button
                          onClick={() => handleRemovePlayer(participant.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition-colors"
                          title="Spieler entfernen"
                          disabled={isLoadingActions}
                        >
                          {isLoadingActions ? (
                            <Loader2Icon size={18} className="animate-spin" />
                          ) : (
                            <Trash2Icon size={18} />
                          )}
                        </button>
                      ) : (
                        <div className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">
                          {tournament.state === TournamentState.RUNNING && currentRound?.preparation_status === RoundState.RUNNING
                            ? "Entfernung während laufender Runde nicht möglich"
                            : "Entfernung nicht möglich"}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tournament Management Info */}
          {tournament.state === TournamentState.RUNNING && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Turnier läuft!</h3>
              <p className="text-green-700 text-sm mb-2">
                Das Turnier ist aktiv. Verwenden Sie die Runden-Management-Buttons oben, um Runden zu erstellen und deren Status zu verwalten.
              </p>
              <div className="text-green-600 text-xs">
                <p><strong>Runden-Workflow:</strong> Erstellen → Vorbereiten → Starten (Timer läuft) → Beenden (Endzeit wird gesetzt) → Nächste Runde</p>
                {tournament.time_per_round && (
                  <p className="mt-1"><strong>Timer:</strong> Läuft nur während aktiver Runden ({tournament.time_per_round} Minuten pro Runde)</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Player Modal - Only render when adding is allowed */}
      {isModalOpen && tournament && (
        <AddPlayerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tournamentId={tournament.id}
          currentTournamentPlayerIds={tournamentParticipants.map(p => p.player)}
          onPlayerAdded={handlePlayerAdded}
        />
      )}
    </div>
  );
}