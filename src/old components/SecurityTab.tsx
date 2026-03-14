"use client";
import { useState } from 'react';
import { ChangePasswordPayload } from '@/types/user';
import { changePassword } from '@/lib/apiClient';
import { Shield, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Monitor, Smartphone } from 'lucide-react';

export default function SecurityTab() {
  const [formData, setFormData] = useState<ChangePasswordPayload>({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push("Mindestens 8 Zeichen");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Mindestens ein Großbuchstabe");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Mindestens ein Kleinbuchstabe");
    }
    if (!/\d/.test(password)) {
      errors.push("Mindestens eine Zahl");
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    // Validation
    if (!formData.current_password) {
      setError("Aktuelles Passwort ist erforderlich.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.new_password) {
      setError("Neues Passwort ist erforderlich.");
      setIsSubmitting(false);
      return;
    }

    if (formData.new_password !== formData.confirm_password) {
      setError("Die neuen Passwörter stimmen nicht überein.");
      setIsSubmitting(false);
      return;
    }

    const passwordErrors = validatePassword(formData.new_password);
    if (passwordErrors.length > 0) {
      setError(`Passwort-Anforderungen nicht erfüllt: ${passwordErrors.join(', ')}`);
      setIsSubmitting(false);
      return;
    }

    try {
      await changePassword(formData);
      setSuccess("Passwort erfolgreich geändert!");
      setFormData({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
    } catch (err: any) {
      console.error("Failed to change password:", err);
      setError(err.message || "Fehler beim Ändern des Passworts.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const PasswordInput = ({ 
    id, 
    name, 
    label, 
    value, 
    showPassword, 
    onToggle 
  }: {
    id: string;
    name: string;
    label: string;
    value: string;
    showPassword: boolean;
    onToggle: () => void;
  }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={name}
          value={value}
          onChange={handleInputChange}
          disabled={isSubmitting}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-400" />
          ) : (
            <Eye className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sicherheitseinstellungen</h2>
        <p className="text-gray-600">Verwalte dein Passwort und Sicherheitseinstellungen.</p>
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

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2" />
          Passwort ändern
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput
            id="current_password"
            name="current_password"
            label="Aktuelles Passwort"
            value={formData.current_password}
            showPassword={showPasswords.current}
            onToggle={() => togglePasswordVisibility('current')}
          />

          <PasswordInput
            id="new_password"
            name="new_password"
            label="Neues Passwort"
            value={formData.new_password}
            showPassword={showPasswords.new}
            onToggle={() => togglePasswordVisibility('new')}
          />

          <PasswordInput
            id="confirm_password"
            name="confirm_password"
            label="Neues Passwort bestätigen"
            value={formData.confirm_password}
            showPassword={showPasswords.confirm}
            onToggle={() => togglePasswordVisibility('confirm')}
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Passwort-Anforderungen:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Mindestens 8 Zeichen</li>
              <li>• Mindestens ein Großbuchstabe</li>
              <li>• Mindestens ein Kleinbuchstabe</li>
              <li>• Mindestens eine Zahl</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Ändere Passwort...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Passwort ändern
              </>
            )}
          </button>
        </form>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weitere Sicherheitsoptionen</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Zwei-Faktor-Authentifizierung</h4>
              <p className="text-sm text-gray-600">Zusätzliche Sicherheit für dein Konto</p>
            </div>
            <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Bald verfügbar
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Aktive Sitzungen</h4>
              <p className="text-sm text-gray-600">Verwalte deine angemeldeten Geräte</p>
            </div>
            <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
              Anzeigen
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktuelle Sitzungen</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex items-center">
              <Monitor className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Desktop - Chrome</p>
                <p className="text-xs text-gray-500">Aktuelle Sitzung • Deutschland</p>
              </div>
            </div>
            <span className="text-xs text-green-600 font-medium">Aktiv</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <div className="flex items-center">
              <Smartphone className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Mobile - Safari</p>
                <p className="text-xs text-gray-500">Vor 2 Stunden • Deutschland</p>
              </div>
            </div>
            <button className="text-xs text-red-600 hover:text-red-800">Beenden</button>
          </div>
        </div>
      </div>
    </div>
  );
}