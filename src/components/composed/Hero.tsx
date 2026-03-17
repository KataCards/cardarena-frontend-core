// components/composed/Hero.tsx
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  /** Optional badge text displayed above the title */
  badge?: string;
  /** Main heading text, can include JSX for highlighting */
  title: React.ReactNode;
  /** Supporting description text below the title */
  description: string;
  /** Primary CTA button text */
  primaryText: string;
  /** Primary CTA button link */
  primaryHref: string;
  /** Optional secondary CTA button text */
  secondaryText?: string;
  /** Optional secondary CTA button link */
  secondaryHref?: string;
}

/**
 * Hero Section
 * 
 * High-impact landing page header with animated gradient background,
 * optional badge, heading, description, and up to two call-to-action buttons.
 * 
 * @example
 * // Basic usage with primary action only
 * <Hero
 *   title="Build tournaments that players love"
 *   description="Professional tournament management made simple and beautiful."
 *   primaryText="Get Started"
 *   primaryHref="/signup"
 * />
 * 
 * @example
 * // With badge and secondary action
 * <Hero
 *   badge="🎉 Now in Open Beta"
 *   title={<>Manage tournaments <span className="text-red-600">effortlessly</span></>}
 *   description="Everything you need to run professional card game tournaments."
 *   primaryText="Start Free Trial"
 *   primaryHref="/signup"
 *   secondaryText="View Demo"
 *   secondaryHref="/demo"
 * />
 * 
 * @example
 * // Custom highlighted title
 * <Hero
 *   title={
 *     <>
 *       The <span className="text-red-600">ultimate</span> tournament platform
 *     </>
 *   }
 *   description="Trusted by organizers worldwide to deliver flawless events."
 *   primaryText="Explore Features"
 *   primaryHref="/features"
 * />
 */
export function Hero({
  badge,
  title,
  description,
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-gray-50 via-white to-red-50">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-200 rounded-full opacity-30 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-red-300 rounded-full opacity-20 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-gradient-radial from-red-100/40 to-transparent rounded-full animate-[spin_20s_linear_infinite]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {badge && (
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-red-50 text-red-600 ring-1 ring-inset ring-red-600/20 mb-6 animate-fade-in">
              {badge}
            </div>
          )}
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight animate-fade-in [animation-delay:100ms]">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in [animation-delay:200ms]">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:300ms]">
            <Button
              size="lg"
              href={primaryHref}
              variant="solid"
              colorScheme="red"
              icon={ArrowRight}
              iconPosition="right"
            >
              {primaryText}
            </Button>
            
            {secondaryText && secondaryHref && (
              <Button
                size="lg"
                href={secondaryHref}
                variant="outline"
                colorScheme="dark"
              >
                {secondaryText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
