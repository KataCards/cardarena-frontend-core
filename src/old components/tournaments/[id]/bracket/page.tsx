"use client";
import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '../../../../../components/Sidebar';
import { Player } from '@/types/player';
import {
  Tournament,
  Round,
  Matchup,
  EnrichedTournamentPlayer,
  TournamentState,
  RoundState
} from '@/types/tournament';
import {
  fetchTournamentById,
  fetchTournamentParticipants,
  fetchPlayers,
  fetchCurrentRound,
  fetchTournamentMatchups,
  bulkUpdateMatchups,
  BulkMatchupUpdate,
  BulkUpdateMatchupsPayload,
  BulkUpdateMatchupsResponse,
  updateRoundState
} from '@/lib/apiClient';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent, DragOverlay, Active, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SaveIcon, UsersIcon, SwordsIcon, AlertTriangleIcon, XIcon, CheckCircleIcon, PlayIcon, CrownIcon } from 'lucide-react';

const DRAGGABLE_TYPE_PLAYER = 'player';
const DROPPABLE_TYPE_SLOT = 'slot';
const UNASSIGNED_AREA_ID = 'unassigned_players_area';

// BYE player constants
      const BYE_DUMMY_PLAYER_ID = 1;
const BYE_PLAYER_NAME = "BYE (Freilos)";

// Interface for a table matchup (enhanced to track changes)
interface TableMatchup {
  tableNumber: number;
  player1Id: number | null;
  player2Id: number | null;
  matchupId: number;
  originalPlayer1Id: number | null; // Track original assignments
  originalPlayer2Id: number | null;
  hasChanges: boolean; // Track if this matchup has been modified
}

// Special BYE player object for UI consistency
interface ByePlayer {
  player: number;
  player_details: {
    first_name: string;
    last_name: string;
    username: string;
  };
  points: number;
  id: number;
  tournament: number;
}

// Draggable Player Card
function DraggablePlayerItem({ player }: { player: EnrichedTournamentPlayer }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `player-${player.player}`,
    data: {
      type: DRAGGABLE_TYPE_PLAYER,
      playerId: player.player,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const playerName = player.player_details?.first_name && player.player_details?.last_name
    ? `${player.player_details.first_name} ${player.player_details.last_name}`
    : player.player_details?.username || `Spieler ${player.player}`;
    return (
                    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-blue-100 border border-blue-300 rounded-lg p-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                    >
      <div className="text-sm font-medium text-blue-900">{playerName}</div>
      <div className="text-xs text-blue-700">{player.points} Punkte</div>
                      </div>
  );
}

// Special Draggable BYE Player Card
function DraggableByePlayerItem({ player }: { player: EnrichedTournamentPlayer }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `player-${player.player}`,
    data: {
      type: DRAGGABLE_TYPE_PLAYER,
      playerId: player.player,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center">
        <CrownIcon size={16} className="mr-2 text-yellow-600" />
        <div className="text-sm font-medium text-yellow-900">{BYE_PLAYER_NAME}</div>
      </div>
      <div className="text-xs text-yellow-700">Automatischer Gewinner</div>
    </div>
  );
}

// Table Slot Component
function TableSlot({ 
  tableNumber, 
  slotType, 
  playerId, 
  playerName, 
  onClear,
  hasChanges,
  isByePlayer = false
}: { 
  tableNumber: number; 
  slotType: 'player1' | 'player2'; 
  playerId: number | null; 
  playerName: string | null;
  onClear: () => void;
  hasChanges: boolean;
  isByePlayer?: boolean;
}) {
  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id: `table-${tableNumber}-${slotType}`,
    data: {
      type: DROPPABLE_TYPE_SLOT,
      tableNumber,
      slotType,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[60px] border-2 border-dashed rounded-lg p-3 flex items-center justify-between
        ${isOver ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'}
        ${playerId ? (isByePlayer ? 'bg-yellow-100 border-yellow-300' : 'bg-green-100 border-green-300') : ''}
        ${hasChanges ? 'ring-2 ring-orange-400 bg-orange-50' : ''}
      `}
    >
      {playerId ? (
        <>
          <span className={`text-sm font-medium ${
            hasChanges ? 'text-orange-900' : 
            isByePlayer ? 'text-yellow-900' : 'text-green-900'
          }`}>
            {isByePlayer && <CrownIcon size={14} className="inline mr-1" />}
            {playerName}
            {hasChanges && <span className="ml-1 text-xs">(geändert)</span>}
          </span>
          <button
            onClick={onClear}
            className="text-red-500 hover:text-red-700 text-xs"
          >
            <XIcon size={16} />
          </button>
        </>
      ) : (
        <span className="text-gray-500 text-sm">
          {slotType === 'player1' ? 'Spieler 1' : 'Spieler 2'}
        </span>
      )}
    </div>
  );
}

// Unassigned Area Component
function UnassignedArea({ children }: { children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({
    id: UNASSIGNED_AREA_ID,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[200px] space-y-2 p-3 border-2 border-dashed rounded-lg ${
        isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
      }`}
    >
      {children}
    </div>
  );
}

export default function TournamentBracketAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const tournamentId = params.id as string;
  
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [participants, setParticipants] = useState<EnrichedTournamentPlayer[]>([]);
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [tableMatchups, setTableMatchups] = useState<TableMatchup[]>([]);
  const [activeDragItem, setActiveDragItem] = useState<Active | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingRound, setIsUpdatingRound] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  // Check if bracket editing is allowed (only during PREPARING state)
  const canEditBracket = tournament?.state === TournamentState.RUNNING && 
                            currentRound?.preparation_status === RoundState.PREPARING;

  // Check if there are any changes to save
  const hasChanges = useMemo(() => {
    return tableMatchups.some(table => table.hasChanges);
  }, [tableMatchups]);

  // Create BYE player object
  const createByePlayer = (): ByePlayer => ({
    player: BYE_DUMMY_PLAYER_ID,
    player_details: {
      first_name: "BYE",
      last_name: "(Freilos)",
      username: "bye_player"
    },
    points: 0,
    id: BYE_DUMMY_PLAYER_ID,
    tournament: parseInt(tournamentId)
  });

  // Get unassigned players including BYE player when needed
  const unassignedPlayers = useMemo(() => {
    const assignedPlayerIds = new Set<number>();
    tableMatchups.forEach(table => {
      if (table.player1Id) assignedPlayerIds.add(table.player1Id);
      if (table.player2Id) assignedPlayerIds.add(table.player2Id);
    });
    
    const regularUnassigned = participants.filter(p => !assignedPlayerIds.has(p.player));
    
    // Add BYE player if we have an odd number of total players and BYE is not assigned
    const totalPlayers = participants.length;
    const shouldShowBye = totalPlayers % 2 === 1 && !assignedPlayerIds.has(BYE_DUMMY_PLAYER_ID);
    
    if (shouldShowBye) {
      const byePlayer = createByePlayer() as EnrichedTournamentPlayer;
      return [...regularUnassigned, byePlayer];
    }
    
    return regularUnassigned;
  }, [participants, tableMatchups, tournamentId]);

  // Check if all players are assigned (including BYE when needed)
  const allPlayersAssigned = useMemo(() => {
    const assignedPlayerIds = new Set<number>();
    tableMatchups.forEach(table => {
      if (table.player1Id) assignedPlayerIds.add(table.player1Id);
      if (table.player2Id) assignedPlayerIds.add(table.player2Id);
    });
    
    const totalPlayers = participants.length;
    const expectedAssignedCount = totalPlayers % 2 === 1 ? totalPlayers + 1 : totalPlayers;
    
    return assignedPlayerIds.size === expectedAssignedCount;
  }, [tableMatchups, participants]);

  // Get player details by ID (including BYE player)
  const getPlayerById = (playerId: number): EnrichedTournamentPlayer | null => {
    if (playerId === BYE_DUMMY_PLAYER_ID) {
      return createByePlayer() as EnrichedTournamentPlayer;
    }
    return participants.find(p => p.player === playerId) || null;
  };

  const getPlayerName = (playerId: number): string => {
    if (playerId === BYE_DUMMY_PLAYER_ID) {
      return BYE_PLAYER_NAME;
    }
    
    const player = getPlayerById(playerId);
    if (!player?.player_details) return `Spieler ${playerId}`;
    
    return player.player_details.first_name && player.player_details.last_name
      ? `${player.player_details.first_name} ${player.player_details.last_name}`
      : player.player_details.username;
  };

  // Load existing matchups and populate table assignments
  const loadExistingMatchups = async () => {
    if (!tournament || !currentRound) return;

    try {
      const matchups = await fetchTournamentMatchups(tournament.id);

      // Create table matchups from existing backend data
      // Each matchup has its own ID and needs to be mapped to a table
      const tables: TableMatchup[] = matchups.map((matchup, index) => ({
        tableNumber: (tournament.start_table || 1) + index,
        player1Id: matchup.player1,
        player2Id: matchup.player2,
        matchupId: matchup.id, // This is the critical part - store the actual matchup ID
        originalPlayer1Id: matchup.player1,
        originalPlayer2Id: matchup.player2,
        hasChanges: false,
      }));

      setTableMatchups(tables);
      console.log('Loaded matchups with IDs:', tables.map(t => ({ table: t.tableNumber, matchupId: t.matchupId })));
    } catch (err: any) {
      console.error("Error loading existing matchups:", err);
      setError(err.message || "Fehler beim Laden der bestehenden Paarungen.");
    }
  };

  const fetchData = async (showLoadingSpinner = true) => {
    if (!tournamentId) return;
    if (showLoadingSpinner) setIsLoading(true);
    setError(null);

    try {
      console.log('fetchData: Loading bracket data for tournament', tournamentId);
      
      const [
        tournamentData,
        rawParticipantsData,
        allPlayersData,
        currentRoundData,
      ] = await Promise.all([
        fetchTournamentById(tournamentId),
        fetchTournamentParticipants(tournamentId),
        fetchPlayers(),
        fetchCurrentRound(tournamentId),
      ]);

      console.log('fetchData: Data loaded', {
        tournament: tournamentData?.name,
        participants: rawParticipantsData?.length,
        currentRound: currentRoundData?.id,
      });

      setTournament(tournamentData);

      // Set up player details map
      const playerDetailsMap = new Map<number, Player>();
      (allPlayersData || []).forEach(p => playerDetailsMap.set(p.id, p));
      
      // Enrich participants with player details
      const enrichedParticipants = (rawParticipantsData || []).map(rp => ({
        ...rp,
        player_details: playerDetailsMap.get(rp.player)
      }));
      setParticipants(enrichedParticipants);
      
      setCurrentRound(currentRoundData);

    } catch (err: any) {
      console.error("Failed to load bracket page data:", err);
      setError(err.message || "Fehler beim Laden der Bracket-Daten.");
    } finally {
      if (showLoadingSpinner) setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadTournamentData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [tournamentData, participantsData] = await Promise.all([
          fetchTournamentById(tournamentId),
          fetchTournamentParticipants(tournamentId)
        ]);

        if (!tournamentData) {
          throw new Error("Turnier nicht gefunden");
        }

        setTournament(tournamentData);

        if (participantsData && participantsData.length > 0) {
          const allPlayers = await fetchPlayers();
          const playersMap = new Map(allPlayers.map(p => [p.id, p]));

          const enrichedParticipants = participantsData.map(participant => ({
            ...participant,
            player_details: playersMap.get(participant.player)
          }));

          setParticipants(enrichedParticipants);
        }

        const currentRoundData = await fetchCurrentRound(tournamentId);
        setCurrentRound(currentRoundData);

      } catch (err: any) {
        console.error("Error loading tournament data:", err);
        setError(err.message || "Fehler beim Laden der Turnierdaten.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTournamentData();
  }, [tournamentId]);

  // Load existing matchups when data is ready
  useEffect(() => {
    if (tournament && currentRound && participants.length > 0) {
      loadExistingMatchups();
    }
  }, [tournament, currentRound, participants]);

  const handleDragStart = (event: DragEndEvent) => {
    setActiveDragItem(event.active);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (!over) return;

    const draggedPlayerId = active.data.current?.playerId;
    if (!draggedPlayerId) return;

    // Handle dropping to unassigned area
    if (over.id === UNASSIGNED_AREA_ID) {
      setTableMatchups(prev => prev.map(table => {
        const newTable = { ...table };
        let changed = false;

        if (table.player1Id === draggedPlayerId) {
          newTable.player1Id = null;
          changed = true;
        }
        if (table.player2Id === draggedPlayerId) {
          newTable.player2Id = null;
          changed = true;
        }

        if (changed) {
          newTable.hasChanges = 
            newTable.player1Id !== table.originalPlayer1Id || 
            newTable.player2Id !== table.originalPlayer2Id;
        }

        return newTable;
      }));
      return;
    }

    // Handle dropping to table slot
    const targetData = over.data.current;
    if (targetData?.type === DROPPABLE_TYPE_SLOT) {
      const { tableNumber, slotType } = targetData;
      
      setTableMatchups(prev => prev.map(table => {
        // Remove player from any existing slot
        const clearedTable = {
          ...table,
          player1Id: table.player1Id === draggedPlayerId ? null : table.player1Id,
          player2Id: table.player2Id === draggedPlayerId ? null : table.player2Id,
        };
        
        // Add player to target slot
        if (table.tableNumber === tableNumber) {
          const newTable = {
            ...clearedTable,
            [slotType === 'player1' ? 'player1Id' : 'player2Id']: draggedPlayerId,
          };

          newTable.hasChanges = 
            newTable.player1Id !== table.originalPlayer1Id || 
            newTable.player2Id !== table.originalPlayer2Id;

          return newTable;
        }
        
        // Check if other tables have changes after player removal
        clearedTable.hasChanges = 
          clearedTable.player1Id !== table.originalPlayer1Id || 
          clearedTable.player2Id !== table.originalPlayer2Id;

        return clearedTable;
      }));
    }
  };

  const clearTableSlot = (tableNumber: number, slotType: 'player1' | 'player2') => {
    setTableMatchups(prev => prev.map(table => {
      if (table.tableNumber === tableNumber) {
        const newTable = {
          ...table,
          [slotType === 'player1' ? 'player1Id' : 'player2Id']: null,
        };

        newTable.hasChanges = 
          newTable.player1Id !== table.originalPlayer1Id || 
          newTable.player2Id !== table.originalPlayer2Id;

        return newTable;
      }
      return table;
    }));
  };

  const handleSaveAssignments = async () => {
    if (!tournament || !currentRound) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      console.log('Starting bulk save process...');

      if (tableMatchups.length === 0) {
        console.log('No matchups to save');
        alert('Keine Paarungen zum Speichern.');
        return;
      }

      const bulkUpdates: BulkMatchupUpdate[] = [];

      for (const table of tableMatchups) {
        console.log('Processing table:', table.tableNumber, {
          player1Id: table.player1Id,
          player2Id: table.player2Id,
          matchupId: table.matchupId,
          hasChanges: table.hasChanges
        });

        if (!table.matchupId) {
          console.error('No matchup ID found for table:', table.tableNumber);
          throw new Error(`Keine Matchup-ID für Tisch ${table.tableNumber} gefunden.`);
        }

        let player1Id = table.player1Id;
        let player2Id = table.player2Id;

        // Handle BYE cases - always ensure we have two players
        if (player1Id && !player2Id) {
          player2Id = BYE_DUMMY_PLAYER_ID;
        } else if (!player1Id && player2Id) {
          player1Id = player2Id;
          player2Id = BYE_DUMMY_PLAYER_ID;
        } else if (!player1Id && !player2Id) {
          console.warn('Both players empty for table:', table.tableNumber, 'assigning BYE_DUMMY vs BYE_DUMMY');
          player1Id = BYE_DUMMY_PLAYER_ID;
          player2Id = BYE_DUMMY_PLAYER_ID;
        }

        bulkUpdates.push({
          matchup_id: table.matchupId,
          player1_id: player1Id!,
          player2_id: player2Id!,
        });
      }

      console.log('Bulk update payload (all matchups):', bulkUpdates);
      console.log('Total matchups to update:', bulkUpdates.length);

      const bulkUpdatePayload: BulkUpdateMatchupsPayload = {
        matchups: bulkUpdates
      };

      const result = await bulkUpdateMatchups(currentRound.id, bulkUpdatePayload);
      console.log('Bulk update successful:', result);

      setTableMatchups(prev => prev.map(table => ({
        ...table,
        originalPlayer1Id: table.player1Id,
        originalPlayer2Id: table.player2Id,
        hasChanges: false,
      })));

      await loadExistingMatchups();

      const changedCount = tableMatchups.filter(t => t.hasChanges).length;
      if (changedCount > 0) {
        alert(`${result.updated_count} Paarungen erfolgreich aktualisiert!\n${changedCount} Änderungen gespeichert.\n${result.message}`);
      } else {
        alert(`Alle ${result.updated_count} Paarungen erfolgreich synchronisiert!\n${result.message}`);
      }

      // Navigate back to tournament detail page after successful save
      router.push(`/tournaments/${tournamentId}`);

    } catch (err: any) {
      console.error("Error saving assignments:", err);
      setSaveError(err.message || "Fehler beim Speichern der Zuordnungen.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateRoundState = async (newState: RoundState) => {
    if (!tournament || !currentRound) return;

    setIsUpdatingRound(true);
    try {
      const updatedRound = await updateRoundState(tournament.id, currentRound.id, newState);
      if (updatedRound) {
        setCurrentRound(updatedRound);
        alert(`Runde ${updatedRound.round_number} Status aktualisiert zu: ${newState}`);
      }
    } catch (err: any) {
      console.error("Error updating round state:", err);
      alert("Fehler beim Aktualisieren des Rundenstatus.");
    } finally {
      setIsUpdatingRound(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Lade Turnierdaten...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <AlertTriangleIcon size={48} className="mx-auto mb-4 text-red-500" />
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!tournament || !currentRound) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-6">
          <p className="text-gray-600">Keine Turnierdaten verfügbar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Bracket-Zuordnung: {tournament.name}
            </h1>
            <p className="text-gray-600">
              Runde {currentRound.round_number} - {currentRound.preparation_status === RoundState.PREPARING ? 'Vorbereitung' : 'Läuft'}
            </p>
            {participants.length % 2 === 1 && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <CrownIcon size={16} className="mr-2 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    Ungerade Spielerzahl ({participants.length}) - BYE-Spieler wurde automatisch hinzugefügt
                  </span>
                </div>
              </div>
            )}
          </div>

          {!canEditBracket && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangleIcon size={20} className="mr-2 text-yellow-600" />
                <span className="text-yellow-800">
                  Bracket-Bearbeitung ist nur während der Vorbereitungsphase möglich.
                </span>
              </div>
            </div>
          )}

          {saveError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangleIcon size={20} className="mr-2 text-red-600" />
                <span className="text-red-800">{saveError}</span>
              </div>
            </div>
          )}

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Unassigned Players */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <UsersIcon size={20} className="mr-2" />
                  Nicht zugewiesene Spieler ({unassignedPlayers.length})
                </h2>
                
                <SortableContext 
                  items={unassignedPlayers.map(p => `player-${p.player}`)}
                  strategy={verticalListSortingStrategy}
                >
                  <UnassignedArea>
                    {unassignedPlayers.map((player) => (
                      player.player === BYE_DUMMY_PLAYER_ID ? (
                        <DraggableByePlayerItem key={player.player} player={player} />
                      ) : (
                        <DraggablePlayerItem key={player.player} player={player} />
                      )
                    ))}
                    {unassignedPlayers.length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        Alle Spieler zugewiesen
                      </div>
                    )}
                  </UnassignedArea>
                </SortableContext>
              </div>

              {/* Table Assignments */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <SwordsIcon size={20} className="mr-2" />
                  Tisch-Zuordnungen
                  {hasChanges && (
                    <span className="ml-2 text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      Ungespeicherte Änderungen
                    </span>
                  )}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tableMatchups.map((table) => (
                    <div 
                      key={table.tableNumber} 
                      className={`border rounded-lg p-4 ${
                        table.hasChanges ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                      }`}
                    >
                      <h3 className="font-medium text-gray-900 mb-3 flex items-center justify-between">
                        <span>Tisch {table.tableNumber}</span>
                        {table.hasChanges && (
                          <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded">
                            Geändert
                          </span>
                        )}
                      </h3>
                      <div className="space-y-2">
                        <TableSlot
                          tableNumber={table.tableNumber}
                          slotType="player1"
                          playerId={table.player1Id}
                          playerName={table.player1Id ? getPlayerName(table.player1Id) : null}
                          onClear={() => clearTableSlot(table.tableNumber, 'player1')}
                          hasChanges={table.hasChanges}
                          isByePlayer={table.player1Id === BYE_DUMMY_PLAYER_ID}
                        />
                        <div className="text-center text-gray-400 text-sm">vs</div>
                        <TableSlot
                          tableNumber={table.tableNumber}
                          slotType="player2"
                          playerId={table.player2Id}
                          playerName={table.player2Id ? getPlayerName(table.player2Id) : null}
                          onClear={() => clearTableSlot(table.tableNumber, 'player2')}
                          hasChanges={table.hasChanges}
                          isByePlayer={table.player2Id === BYE_DUMMY_PLAYER_ID}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Save Button */}
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {allPlayersAssigned ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircleIcon size={16} className="mr-1" />
                        Alle Spieler zugewiesen
                      </span>
                    ) : (
                      <span className="flex items-center text-orange-600">
                        <AlertTriangleIcon size={16} className="mr-1" />
                        Nicht alle Spieler zugewiesen
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={handleSaveAssignments}
                    disabled={!canEditBracket || isSaving || !allPlayersAssigned}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                      canEditBracket && allPlayersAssigned && !isSaving
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Speichere...
                      </>
                    ) : (
                      <>
                        <SaveIcon size={16} className="mr-2" />
                        Zuordnungen speichern
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <DragOverlay>
              {activeDragItem ? (
                activeDragItem.data.current?.playerId === BYE_DUMMY_PLAYER_ID ? (
                  <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 shadow-lg">
                    <div className="flex items-center">
                      <CrownIcon size={16} className="mr-2 text-yellow-600" />
                      <div className="text-sm font-medium text-yellow-900">{BYE_PLAYER_NAME}</div>
                    </div>
                    <div className="text-xs text-yellow-700">Automatischer Gewinner</div>
                  </div>
                ) : (
                  <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 shadow-lg">
                    <div className="text-sm font-medium text-blue-900">
                      {getPlayerName(activeDragItem.data.current?.playerId)}
                    </div>
                  </div>
                )
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </main>
    </div>
  );
}