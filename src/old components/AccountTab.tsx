"use client";
import { useState, useEffect } from 'react';
import { CurrentUser, UpdateUserPayload } from '@/types/user';
import { fetchCurrentUser, updateUser } from '@/lib/apiClient';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Save, AlertCircle, CheckCircle } from 'lucide-react';

export default function AccountTab() {
  const { refreshUserData } = useAuth();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [formData, setFormData] = useState<UpdateUserPayload>({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await fetchCurrentUser();
      if (userData) {
        setCurrentUser(userData);
        setFormData({
          username: userData.username,
          email: userData.email,
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
        });
      }
    } catch (err: any) {
      console.error("Failed to fetch user data:", err);
      setError(err.message || "Benutzerdaten konnten nicht geladen werden.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!formData.username || !formData.email) {
      setError("Benutzername und E-Mail sind Pflichtfelder.");
      setIsSaving(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      setIsSaving(false);
      return;
    }

    try {
      const updatedUser = await updateUser(formData);
      if (updatedUser) {
        setCurrentUser(updatedUser);
        setSuccess("Kontodaten erfolgreich aktualisiert!");
        // Refresh the auth context to update the user data globally
        await refreshUserData();
      }
    } catch (err: any) {
      console.error("Failed to update user:", err);
      setError(err.message || "Fehler beim Aktualisieren der Kontodaten.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <span className="ml-3 text-gray-600">Lade Kontodaten...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Kontoinformationen</h2>
        <p className="text-gray-600">Aktualisiere deine persönlichen Daten und Kontoinformationen.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          <span className="text-green-700">{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Benutzername *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={isSaving}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              E-Mail-Adresse *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isSaving}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
              Vorname
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              disabled={isSaving}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
              Nachname
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              disabled={isSaving}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Speichere...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Änderungen speichern
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}