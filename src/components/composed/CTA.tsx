import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function CTA() {
  return (
    <section className="py-20 bg-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Bereit für dein erstes Turnier?
        </h2>
        <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
          Starte noch heute und erlebe, wie einfach Turnier-Management sein kann.
        </p>
        <Button 
          href="/login" 
          variant="solid"
          colorScheme="gray"
          size="lg"
          className="bg-white text-red-600 hover:bg-gray-100"
        >
          Kostenlos registrieren
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
}
