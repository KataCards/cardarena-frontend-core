"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Timer from '../../../../../components/Timer';
import TVBracketDisplay from '../../../../../components/TVBracketDisplay';
import TVScoreboard from '../../../../../components/TVScoreboard';
import TVRoundStatus from '../../../../../components/TVRoundStatus';
import {
  Tournament,
  Round,
  Matchup,
  EnrichedTournamentPlayer,
  TournamentState,
  RoundState,
  CardGame,
  GameMode
} from "@/types/tournament";
import { Player } from "@/types/player";
import {
  fetchTournamentById,
  fetchTournamentParticipants,
  fetchCurrentRound,
  fetchTournamentMatchups,
  fetchPlayerById,
  fetchCardGameById,
  fetchGameModeById
} from "@/lib/apiClient";
import { format } from 'date-fns';
import { 
  Loader2Icon, 
  WifiOffIcon, 
  RefreshCwIcon,
  TrophyIcon,
  ClockIcon,
  UsersIcon,
  EyeOffIcon,
  EyeIcon
} from "lucide-react";

export default function TVDisplayPage() {
  const { id } = useParams();
  const tournamentId = id as string;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // State management
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [participants, setParticipants] = useState<EnrichedTournamentPlayer[]>([]);
  const [playersMap, setPlayersMap] = useState<Map<number, Player>>(new Map());
  const [cardGameDetails, setCardGameDetails] = useState<CardGame | null>(null);
  const [gameModeDetails, setGameModeDetails] = useState<GameMode | null>(null);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isConnected, setIsConnected] = useState(true);

  // UI state
  const [isScoreboardVisible, setIsScoreboardVisible] = useState(true);
  const [hideWinners, setHideWinners] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Auto-refresh interval (every 5 seconds)
  const REFRESH_INTERVAL = 5000;
  const SCROLL_SPEED = 50; // pixels per second
  const SCROLL_PAUSE_DURATION = 3000; // pause at top/bottom for 3 seconds

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let scrollDirection = 1; // 1 for down, -1 for up
    let isPaused = false;

    const scroll = () => {
      if (isPaused) return;

      const maxScroll = container.scrollHeight - container.clientHeight;
      const currentScroll = container.scrollTop;

      if (scrollDirection === 1 && currentScroll >= maxScroll) {
        // Reached bottom, pause and then reverse
        isPaused = true;
        setTimeout(() => {
          scrollDirection = -1;
          isPaused = false;
        }, SCROLL_PAUSE_DURATION);
      } else if (scrollDirection === -1 && currentScroll <= 0) {
        // Reached top, pause and then reverse
        isPaused = true;
        setTimeout(() => {
          scrollDirection = 1;
          isPaused = false;
        }, SCROLL_PAUSE_DURATION);
      } else {
        // Continue scrolling
        container.scrollTop += scrollDirection * (SCROLL_SPEED / 60); // 60fps
      }
    };

    const interval = setInterval(scroll, 1000 / 60); // 60fps

    return () => clearInterval(interval);
  }, [isAutoScrolling, SCROLL_SPEED, SCROLL_PAUSE_DURATION]);

  // Load tournament data
  const loadTournamentData = useCallback(async () => {
    try {
      setError(null);
      setIsConnected(true);

      // Fetch tournament details
      const tournamentData = await fetchTournamentById(tournamentId);
      if (!tournamentData) {
        throw new Error("Turnier nicht gefunden");
      }
      setTournament(tournamentData);

      // Fetch card game and game mode details
      const cardGameId = typeof tournamentData.cardgame === 'number' 
        ? tournamentData.cardgame 
        : tournamentData.cardgame.id;
      const gameModeId = typeof tournamentData.gamemode === 'number' 
        ? tournamentData.gamemode 
        : tournamentData.gamemode.id;

      const [cardGame, gameMode] = await Promise.all([
        fetchCardGameById(cardGameId),
        fetchGameModeById(gameModeId)
      ]);

      setCardGameDetails(cardGame);
      setGameModeDetails(gameMode);

      // Fetch current round
      const roundData = await fetchCurrentRound(tournamentId);
      setCurrentRound(roundData);

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

      // Fetch matchups if tournament is running and has current round
      if (tournamentData.state === TournamentState.RUNNING && roundData) {
        const matchupsData = await fetchTournamentMatchups(tournamentData.id);
        setMatchups(matchupsData || []);
      } else {
        setMatchups([]);
      }

      setLastUpdate(new Date());
      setIsLoading(false);
    } catch (err: any) {
      console.error("Error loading tournament data:", err);
      setError(err.message || "Fehler beim Laden der Turnierdaten");
      setIsConnected(false);
      setIsLoading(false);
    }
  }, [tournamentId]);

  // Initial load
  useEffect(() => {
    loadTournamentData();
  }, [loadTournamentData]);

  // Auto-refresh based on round state
  useEffect(() => {
    if (!tournament || !currentRound) return;

    let interval: NodeJS.Timeout;

    // More frequent updates during active rounds
    const refreshRate = currentRound.preparation_status === RoundState.RUNNING 
      ? REFRESH_INTERVAL / 2  // 2.5 seconds during active rounds
      : REFRESH_INTERVAL;     // 5 seconds otherwise

    interval = setInterval(() => {
      loadTournamentData();
    }, refreshRate);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tournament, currentRound, loadTournamentData]);

  // Toggle functions
  const toggleScoreboard = () => setIsScoreboardVisible(!isScoreboardVisible);
  const toggleWinners = () => setHideWinners(!hideWinners);
  const toggleAutoScroll = () => setIsAutoScrolling(!isAutoScrolling);

  // Get timer initial time
  const getTimerInitialTime = (): number => {
    if (!tournament?.time_per_round || !currentRound) {
      return 0;
    }

    if (currentRound.preparation_status !== RoundState.RUNNING) {
      return 0;
    }

    const roundStartTime = new Date(currentRound.start_time).getTime();
    const currentTime = new Date().getTime();
    const elapsedSeconds = Math.floor((currentTime - roundStartTime) / 1000);
    const totalRoundSeconds = tournament.time_per_round * 60;
    
    return Math.max(0, totalRoundSeconds - elapsedSeconds);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-red-500 to-yellow-500">
        <div className="text-center text-white">
          <Loader2Icon className="animate-spin h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-2">Lade Turnierdaten...</h2>
          <p className="text-xl opacity-90">Display wird vorbereitet</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-red-500 to-yellow-500">
        <div className="text-center text-white">
          <WifiOffIcon className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Verbindungsfehler</h2>
          <p className="text-xl mb-6">{error}</p>
          <button
            onClick={loadTournamentData}
            className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center mx-auto"
          >
            <RefreshCwIcon className="h-5 w-5 mr-2" />
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-red-500 to-yellow-500">
        <div className="text-center text-white">
          <TrophyIcon className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold">Turnier nicht gefunden</h2>
        </div>
      </div>
    );
  }

  const cardGameName = cardGameDetails?.name || 'Unbekanntes Spiel';
  const gameModeName = gameModeDetails?.name || 'Unbekannter Modus';

  return (
    <div className="h-screen bg-gradient-to-br from-red-500 to-yellow-500 flex">
      {/* Left Side - Tournament Info & Bracket */}
      <div className="flex-1 flex flex-col">
        <div 
          ref={scrollContainerRef}
          className="flex-1 p-8 overflow-y-auto"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Tournament Header */}
          <div className="mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 text-black">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <TrophyIcon className="h-12 w-12 mr-4 text-red-600" />
                  <div>
                    <h1 className="text-5xl font-bold mb-2">{tournament.name}</h1>
                    <p className="text-2xl opacity-75">{tournament.location} • {format(new Date(tournament.date), 'dd.MM.yyyy')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl opacity-75">{cardGameName}</p>
                  <p className="text-lg opacity-60">{gameModeName}</p>
                </div>
              </div>
              
              {/* Connection Status */}
              <div className="flex items-center justify-between text-sm opacity-75">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span>{isConnected ? 'Live' : 'Offline'}</span>
                </div>
                <span>Letztes Update: {format(lastUpdate, 'HH:mm:ss')}</span>
              </div>
            </div>
          </div>

          {/* Round Status */}
          <TVRoundStatus 
            tournament={tournament}
            currentRound={currentRound}
            participantCount={participants.length}
          />

          {/* Timer */}
          {tournament.time_per_round && currentRound && currentRound.preparation_status === RoundState.RUNNING && (
            <div className="mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 text-center text-black">
                <div className="flex items-center justify-center mb-4">
                  <ClockIcon className="h-8 w-8 mr-3 text-red-600" />
                  <h3 className="text-3xl font-bold">Runden-Timer</h3>
                </div>
                <Timer initialTime={getTimerInitialTime()} size="tv" />
              </div>
            </div>
          )}

          {/* Bracket Display */}
          {tournament.state === TournamentState.RUNNING && currentRound && matchups.length > 0 && (
            <div className="mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 text-black">
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Paarungen - Runde {currentRound.round_number}
                </h2>
                <TVBracketDisplay 
                  matchups={matchups}
                  playersMap={playersMap}
                  currentRound={currentRound}
                  tournament={tournament}
                  hideWinners={hideWinners}
                />
              </div>
            </div>
          )}

          {/* Tournament Info */}
          <div className="mt-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/30 text-black">
              <h3 className="text-xl font-bold mb-4 text-center">Turnier-Info</h3>
              <div className="space-y-3 text-center">
                <div>
                  <p className="text-sm opacity-75">Teilnehmer</p>
                  <p className="text-2xl font-bold">{participants.length}/{tournament.max_players}</p>
                </div>
                {currentRound && (
                  <div>
                    <p className="text-sm opacity-75">Aktuelle Runde</p>
                    <p className="text-2xl font-bold">#{currentRound.round_number}</p>
                  </div>
                )}
                {tournament.time_per_round && (
                  <div>
                    <p className="text-sm opacity-75">Zeit pro Runde</p>
                    <p className="text-2xl font-bold">{tournament.time_per_round} Min</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Scoreboard & Controls */}
      <div className="w-96 bg-black/20 backdrop-blur-sm p-6 flex flex-col">
        {/* Control Buttons */}
        <div className="mb-6 space-y-3">
          <button
            onClick={toggleScoreboard}
            className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
          >
            {isScoreboardVisible ? <EyeOffIcon className="h-5 w-5 mr-2" /> : <EyeIcon className="h-5 w-5 mr-2" />}
            {isScoreboardVisible ? 'Rangliste ausblenden' : 'Rangliste anzeigen'}
          </button>
          
          <button
            onClick={toggleWinners}
            className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
          >
            {hideWinners ? <EyeIcon className="h-5 w-5 mr-2" /> : <EyeOffIcon className="h-5 w-5 mr-2" />}
            {hideWinners ? 'Gewinner anzeigen' : 'Gewinner ausblenden'}
          </button>

          <button
            onClick={toggleAutoScroll}
            className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
          >
            <UsersIcon className="h-5 w-5 mr-2" />
            {isAutoScrolling ? 'Auto-Scroll aus' : 'Auto-Scroll an'}
          </button>
        </div>

        {/* Scoreboard */}
        {isScoreboardVisible && (
          <div className="flex-1">
            <TVScoreboard 
              participants={participants}
              tournament={tournament}
            />
          </div>
        )}
      </div>
    </div>
  );
}