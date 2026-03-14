"use client";
import { useState, useEffect } from 'react';
import { CardGame, NewCardGamePayload } from '@/types/tournament';
import { fetchCardGames, createCardGame } from '@/lib/apiClient';
import { Gamepad2, PlusCircle, Trash2 } from 'lucide-react'; // Assuming you might add delete later

export default function CardGamesTab() {
  const [cardGames, setCardGames] = useState<CardGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newGameName, setNewGameName] = useState('');
  const [newGamePublisher, setNewGamePublisher] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loadCardGames = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const games = await fetchCardGames();
      setCardGames(games);
    } catch (err: any) {
      setError(err.message || "Fehler beim Laden der Kartenspiele.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCardGames();
  }, []);

  const handleAddCardGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameName.trim()) {
      setSubmitError("Name des Kartenspiels darf nicht leer sein.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    const payload: NewCardGamePayload = {
      name: newGameName,
      publisher: newGamePublisher.trim() || undefined, // Send undefined if empty
    };
    try {
      const newGame = await createCardGame(payload);
      setCardGames(prevGames => [...prevGames, newGame]);
      setNewGameName('');
      setNewGamePublisher('');
      // alert("Kartenspiel erfolgreich hinzugefügt!"); // Consider toast
    } catch (err: any) {
      setSubmitError(err.message || "Fehler beim Hinzufügen des Kartenspiels.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="mb-10">
        <div className="flex items-center mb-6">
            <Gamepad2 size={32} className="text-red-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Neues Kartenspiel hinzufügen</h2>
        </div>
        <form onSubmit={handleAddCardGame} className="bg-gray-50 p-6 rounded-lg shadow space-y-4 max-w-lg">
          {submitError && <p className="text-red-500 bg-red-50 p-2 rounded-md">{submitError}</p>}
          <div>
            <label htmlFor="newGameName" className="block text-sm font-medium text-gray-700 mb-1">
              Name des Spiels <span className="text-red-600">*</span>
            </label>
            <input
              id="newGameName" type="text" value={newGameName}
              onChange={(e) => setNewGameName(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="newGamePublisher" className="block text-sm font-medium text-gray-700 mb-1">
              Herausgeber (optional)
            </label>
            <input
              id="newGamePublisher" type="text" value={newGamePublisher}
              onChange={(e) => setNewGamePublisher(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 text-white px-5 py-2.5 rounded-md hover:bg-red-700 disabled:opacity-60 flex items-center"
          >
            <PlusCircle size={18} className="mr-2" />
            {isSubmitting ? "Wird hinzugefügt..." : "Kartenspiel hinzufügen"}
          </button>
        </form>
      </section>

      <section>
        <div className="flex items-center mb-6">
            {/* <ListChecks size={32} className="text-red-600 mr-3" /> */}
            <h2 className="text-2xl font-semibold text-gray-800">Vorhandene Kartenspiele ({cardGames.length})</h2>
        </div>
        {isLoading && <p className="text-gray-600">Lade Kartenspiele...</p>}
        {error && <p className="text-red-500 bg-red-50 p-3 rounded-md">{error}</p>}
        {!isLoading && !error && (
          cardGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cardGames.map(game => (
                <div key={game.id} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-800">{game.name}</h3>
                  {game.publisher && <p className="text-sm text-gray-600">Herausgeber: {game.publisher}</p>}
                  {/* Add Edit/Delete buttons here if needed in the future */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Keine Kartenspiele vorhanden. Füge oben eines hinzu!</p>
          )
        )}
      </section>
    </div>
  );
}