'use client';

import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, TrophyIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { TournamentCard } from '@/components/ui/TournamentCard';
import type { TournamentSummary } from '@/types/ui/dashboard';

interface TournamentSectionProps {
  title: string;
  tournaments: TournamentSummary[];
  emptyMessage: string;
  variant?: 'red' | 'gradient';
}

/**
 * TournamentSection component (Presenter)
 * A horizontal scrolling section for tournaments.
 */
export function TournamentSection({ 
  title, 
  tournaments, 
  emptyMessage,
  variant = 'red'
}: TournamentSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340; // Card width + gap
      scrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const bgClass = variant === 'gradient' 
    ? 'bg-linear-to-br from-red-600 to-red-800' 
    : 'bg-red-600';

  return (
    <div className={`${bgClass} rounded-3xl p-8 h-full flex flex-col shadow-inner overflow-hidden relative`}>
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
          {title}
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
            {tournaments.length}
          </span>
        </h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="bg-white/10 hover:bg-white/30 backdrop-blur-md text-white rounded-xl p-3 transition-all duration-300 border border-white/10"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-white/10 hover:bg-white/30 backdrop-blur-md text-white rounded-xl p-3 transition-all duration-300 border border-white/10"
            aria-label="Scroll right"
          >
            <ChevronRightIcon size={24} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 relative">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto h-full pb-4 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {tournaments.length > 0 ? (
            tournaments.map(t => (
              <div key={t.id} className="flex-shrink-0 snap-start">
                <TournamentCard tournament={t} />
              </div>
            ))
          ) : (
            <div className="bg-white/10 backdrop-blur-sm p-12 rounded-2xl border border-white/10 w-full flex flex-col items-center justify-center text-center text-white shrink-0">
              <TrophyIcon size={64} className="opacity-20 mb-6" />
              <p className="text-xl font-bold mb-6 max-w-xs">{emptyMessage}</p>
              <Link 
                href="/tournaments/new" 
                className="bg-white text-red-600 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <PlusIcon size={18} />
                Turnier erstellen
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
