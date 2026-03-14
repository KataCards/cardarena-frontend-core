"use client";
import { useState } from 'react';
import { FeedbackPayload } from '@/types/user';
import { submitFeedback } from '@/lib/apiClient';
import { MessageSquare, Star, Send, AlertCircle, CheckCircle, Bug, Lightbulb, Settings, MessageCircle } from 'lucide-react';

export default function FeedbackTab() {
  const [formData, setFormData] = useState<FeedbackPayload>({
    category: 'general',
    subject: '',
    message: '',
    rating: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const categories = [
    { value: 'bug', label: 'Bug Report', icon: Bug, description: 'Melde einen Fehler oder ein Problem' },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb, description: 'Schlage eine neue Funktion vor' },
    { value: 'improvement', label: 'Verbesserung', icon: Settings, description: 'Vorschlag zur Verbesserung bestehender Features' },
    { value: 'general', label: 'Allgemeines Feedback', icon: MessageCircle, description: 'Allgemeine Kommentare oder Fragen' },
  ] as const;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    // Validation
    if (!formData.subject.trim()) {
      setError("Betreff ist erforderlich.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.message.trim()) {
      setError("Nachricht ist erforderlich.");
      setIsSubmitting(false);
      return;
    }

    if (formData.message.trim().length < 10) {
      setError("Die Nachricht muss mindestens 10 Zeichen lang sein.");
      setIsSubmitting(false);
      return;
    }

    try {
      await submitFeedback(formData);
      setSuccess("Vielen Dank für dein Feedback! Wir werden es prüfen und uns bei Bedarf bei dir melden.");
      setFormData({
        category: 'general',
        subject: '',
        message: '',
        rating: undefined,
      });
    } catch (err: any) {
      console.error("Failed to submit feedback:", err);
      setError(err.message || "Fehler beim Senden des Feedbacks. Bitte versuche es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, onRatingChange }: { rating?: number; onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`p-1 rounded transition-colors ${
              rating && star <= rating
                ? 'text-yellow-400 hover:text-yellow-500'
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star className="w-6 h-6 fill-current" />
          </button>
        ))}
        {rating && (
          <span className="ml-2 text-sm text-gray-600">
            {rating} von 5 Sternen
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Feedback senden</h2>
        <p className="text-gray-600">
          Deine Meinung ist uns wichtig! Teile dein Feedback, melde Bugs oder schlage neue Features vor.
        </p>
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
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Kategorie
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <label
                  key={category.value}
                  className={`relative flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.category === category.value
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={formData.category === category.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <IconComponent className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{category.label}</div>
                    <div className="text-xs text-gray-500">{category.description}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Betreff *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            disabled={isSubmitting}
            placeholder="Kurze Beschreibung deines Feedbacks"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Nachricht *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            disabled={isSubmitting}
            placeholder="Beschreibe dein Feedback im Detail..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
          />
          <p className="mt-1 text-xs text-gray-500">
            Mindestens 10 Zeichen erforderlich
          </p>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Bewertung (optional)
          </label>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Wie zufrieden bist du mit CardArena?</span>
            <StarRating rating={formData.rating} onRatingChange={handleRatingChange} />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Sende Feedback...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-3" />
                Feedback senden
              </>
            )}
          </button>
        </div>
      </form>

      {/* Additional Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Weitere Kontaktmöglichkeiten
        </h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• E-Mail: support@cardarena.com</p>
          <p>• Telefon: +49 (0) 123 456 789</p>
          <p>• Live-Chat: Verfügbar Mo-Fr 9:00-17:00 Uhr</p>
        </div>
      </div>
    </div>
  );
}