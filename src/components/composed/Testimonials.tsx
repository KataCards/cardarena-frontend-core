// components/composed/Testimonials.tsx
import { TestimonialCard } from "@/components/composed/display/TestimonialCard";

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface TestimonialsProps {
  /** Array of testimonial objects to display */
  testimonials: Testimonial[];
  /** Main heading text for the testimonials section */
  title?: string;
  /** Supporting description text below the title */
  description?: string;
  /** Background color variant for different page contexts */
  variant?: "light" | "white" | "dark";
}

/**
 * Testimonials Section
 * 
 * Displays a responsive grid of customer testimonials with ratings and user details.
 * Automatically adapts from single column on mobile to three columns on desktop.
 * 
 * @example
 * // Basic usage with default styling
 * <Testimonials testimonials={customerReviews} />
 * 
 * @example
 * // Custom heading and description
 * <Testimonials
 *   testimonials={reviews}
 *   title="Customer Success Stories"
 *   description="See why teams love our platform"
 * />
 * 
 * @example
 * // Dark variant for light-themed pages
 * <Testimonials
 *   testimonials={reviews}
 *   variant="dark"
 *   title="Trusted by Professionals"
 *   description="Join thousands of satisfied users worldwide"
 * />
 */
export function Testimonials({ 
  testimonials,
  title = "What our customers say",
  description = "Trusted by thousands of satisfied users",
  variant = "white",
}: TestimonialsProps) {
  const variants = {
    light: "bg-gray-50",
    white: "bg-white",
    dark: "bg-slate-900",
  };

  const textColors = {
    light: { title: "text-gray-900", description: "text-gray-600" },
    white: { title: "text-gray-900", description: "text-gray-600" },
    dark: { title: "text-white", description: "text-slate-300" },
  };

  const colors = textColors[variant];

  return (
    <section className={`py-20 ${variants[variant]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${colors.title}`}>
            {title}
          </h2>
          <p className={`text-xl ${colors.description}`}>
            {description}
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name || index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
