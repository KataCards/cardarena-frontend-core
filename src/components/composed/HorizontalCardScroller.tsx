"use client";

import { useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalCardScrollerProps {
  /** Main heading text for the section */
  title: string;
  /** Number of items being displayed (shown in badge) */
  itemCount: number;
  /** Child card components to display in the scroller */
  children: ReactNode;
  /** Optional custom empty state component */
  emptyState?: ReactNode;
  /** Default message when no items are available */
  emptyMessage?: string;
  /** Background color variant */
  variant?: "solid" | "gradient";
  /** Background color scheme */
  colorScheme?: "red" | "blue" | "green" | "gray";
  /** Amount to scroll per button click (in pixels) */
  scrollAmount?: number;
  /** Optional icon component for the title */
  titleIcon?: React.ComponentType<{ className?: string }>;
}

const colorVariants = {
  solid: {
    red: "bg-red-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
    gray: "bg-gray-600",
  },
  gradient: {
    red: "bg-gradient-to-br from-red-600 to-red-800",
    blue: "bg-gradient-to-br from-blue-600 to-blue-800",
    green: "bg-gradient-to-br from-green-600 to-green-800",
    gray: "bg-gradient-to-br from-gray-600 to-gray-800",
  },
};

/**
 * HorizontalCardScroller
 * 
 * A flexible, horizontally scrolling container for displaying card-based content.
 * Features smooth scrolling, snap points, arrow navigation, and responsive design.
 * Perfect for showcasing collections of items like tournaments, products, events, etc.
 * 
 * @example
 * // Basic tournament carousel
 * import { Trophy } from "lucide-react";
 * 
 * <HorizontalCardScroller
 *   title="Active Tournaments"
 *   titleIcon={Trophy}
 *   itemCount={tournaments.length}
 * >
 *   {tournaments.map(t => (
 *     <TournamentCard key={t.id} tournament={t} />
 *   ))}
 * </HorizontalCardScroller>
 * 
 * @example
 * // Product showcase with custom empty state
 * import { ShoppingBag } from "lucide-react";
 * 
 * <HorizontalCardScroller
 *   title="Featured Products"
 *   titleIcon={ShoppingBag}
 *   itemCount={products.length}
 *   colorScheme="blue"
 *   variant="gradient"
 *   emptyState={
 *     <div className="text-center py-12">
 *       <p className="text-white text-lg font-bold">No products available</p>
 *       <Link href="/products/new" className="mt-4 inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-bold">
 *         Add Product
 *       </Link>
 *     </div>
 *   }
 * >
 *   {products.map(p => (
 *     <ProductCard key={p.id} product={p} />
 *   ))}
 * </HorizontalCardScroller>
 * 
 * @example
 * // Events carousel with custom scroll amount
 * import { Calendar } from "lucide-react";
 * 
 * <HorizontalCardScroller
 *   title="Upcoming Events"
 *   titleIcon={Calendar}
 *   itemCount={events.length}
 *   colorScheme="green"
 *   scrollAmount={500}
 *   emptyMessage="No events scheduled"
 * >
 *   {events.map(e => (
 *     <EventCard key={e.id} event={e} />
 *   ))}
 * </HorizontalCardScroller>
 */
export function HorizontalCardScroller({
  title,
  itemCount,
  children,
  emptyState,
  emptyMessage = "No items to display",
  variant = "solid",
  colorScheme = "red",
  scrollAmount = 340,
  titleIcon: TitleIcon,
}: HorizontalCardScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const bgClass = colorVariants[variant][colorScheme];
  const isEmpty = itemCount === 0;

  return (
    <div
      className={`${bgClass} rounded-3xl p-8 h-full flex flex-col shadow-inner overflow-hidden relative`}
    >
      <div className="flex items-center justify-between mb-8 shrink-0">
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
          {TitleIcon && <TitleIcon className="h-8 w-8" />}
          {title}
          {!isEmpty && (
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
              {itemCount}
            </span>
          )}
        </h2>

        {!isEmpty && (
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="bg-white/10 hover:bg-white/30 backdrop-blur-md text-white rounded-xl p-3 transition-all duration-300 border border-white/10"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="bg-white/10 hover:bg-white/30 backdrop-blur-md text-white rounded-xl p-3 transition-all duration-300 border border-white/10"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 min-h-0 relative">
        {isEmpty ? (
          <div className="bg-white/10 backdrop-blur-sm p-12 rounded-2xl border border-white/10 w-full h-full flex items-center justify-center text-center text-white">
            {emptyState || (
              <div>
                <p className="text-xl font-bold">{emptyMessage}</p>
              </div>
            )}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto h-full pb-4 snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}