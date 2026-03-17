// components/composed/CTA.tsx
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CTAProps {
  /** Main heading text displayed prominently at the top */
  title?: string;
  /** Supporting description text below the title */
  description?: string;
  /** Text displayed on the call-to-action button */
  buttonText?: string;
  /** URL or path the button navigates to */
  buttonHref?: string;
  /** Visual style variant for different contexts */
  variant?: "default" | "gradient" | "dark";
}

/**
 * CTA (Call-to-Action) Section
 * 
 * A prominent, full-width section designed to drive user engagement with a clear
 * action. Supports multiple visual variants and fully customizable content.
 * 
 * @example
 * // Default usage with english defaults
 * <CTA />
 * 
 * @example
 * // Custom content with gradient variant
 * <CTA 
 *   variant="gradient"
 *   title="Ready to compete?"
 *   description="Join thousands of players in epic tournaments."
 *   buttonText="Start Playing"
 *   buttonHref="/signup"
 * />
 * 
 * @example
 * // Dark variant for light-themed pages
 * <CTA 
 *   variant="dark"
 *   title="Take your tournaments to the next level"
 *   description="Professional tools for serious organizers."
 *   buttonText="View Pricing"
 *   buttonHref="/pricing"
 * />
 */
export function CTA({
  title = "Ready for your first tournament?",
  description = "Get started today and experience how simple tournament management can be.",
  buttonText = "Sign up for free",
  buttonHref = "/login",
  variant = "default",
}: CTAProps) {
  const variants = {
    default: {
      section: "bg-red-600",
      title: "text-white",
      description: "text-red-100",
      button: "bg-white text-red-600 hover:bg-gray-100",
    },
    gradient: {
      section: "bg-gradient-to-br from-red-600 via-red-700 to-red-800",
      title: "text-white",
      description: "text-red-50",
      button: "bg-white text-red-600 hover:bg-gray-50 shadow-xl",
    },
    dark: {
      section: "bg-slate-900",
      title: "text-white",
      description: "text-slate-300",
      button: "bg-red-600 text-white hover:bg-red-700",
    },
  };

  const styles = variants[variant];

  return (
    <section className={`relative py-24 overflow-hidden ${styles.section}`}>
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      )}
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${styles.title}`}>
          {title}
        </h2>
        <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${styles.description}`}>
          {description}
        </p>
        <Button
          href={buttonHref}
          variant="solid"
          colorScheme="gray"
          size="lg"
          className={`${styles.button} transition-all duration-200 transform hover:scale-105`}
        >
          {buttonText}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </section>
  );
}
