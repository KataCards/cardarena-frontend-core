import { type LucideIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Props for the Hero component actions.
 */
export interface HeroAction {
  label: string;
  href: string;
  icon?: LucideIcon;
  variant?: 'solid' | 'outline' | 'ghost';
  colorScheme?: 'red' | 'dark' | 'gray';
}

/**
 * Props for the Hero component.
 */
export interface HeroProps {
  /** Optional badge text displayed above the title */
  badge?: string;
  /** The main heading, can include JSX for highlighting */
  title: React.ReactNode;
  /** Supporting subtext describing the value proposition */
  description: string;
  /** The primary call to action */
  primaryAction: HeroAction;
  /** Optional secondary call to action */
  secondaryAction?: HeroAction;
}

/**
 * Hero component (Presenter)
 * A high-impact landing page header section.
 */
export function Hero({ 
  badge, 
  title, 
  description, 
  primaryAction, 
  secondaryAction 
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {badge && (
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-red-50 text-red-600 ring-1 ring-inset ring-red-600/20 mb-6">
              {badge}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              href={primaryAction.href} 
              icon={primaryAction.icon || ArrowRight} 
              iconPosition="right"
              variant={primaryAction.variant || 'solid'}
              colorScheme={primaryAction.colorScheme || 'red'}
            >
              {primaryAction.label}
            </Button>
            {secondaryAction && (
              <Button 
                variant={secondaryAction.variant || 'outline'} 
                colorScheme={secondaryAction.colorScheme || 'dark'} 
                size="lg" 
                href={secondaryAction.href}
                icon={secondaryAction.icon}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-red-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-red-100 rounded-full opacity-20 blur-3xl"></div>
    </section>
  );
}
