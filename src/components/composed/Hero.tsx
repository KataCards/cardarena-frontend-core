import { ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-red-50 text-red-600 ring-1 ring-inset ring-red-600/20 mb-6">
            Core Library Launch v0.1.0
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            The foundation for your
            <span className="text-red-600 block">Card Game Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Congrats on launching the CardArena Frontend Core! A collection of high-performance, 
            reusable components designed for tournament management and card game ecosystems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" href="#showcase" icon={ArrowRight} iconPosition="right">
              Explore Components
            </Button>
            <Button variant="outline" colorScheme="dark" size="lg" icon={Github}>
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-red-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-red-100 rounded-full opacity-20 blur-3xl"></div>
    </section>
  );
}
