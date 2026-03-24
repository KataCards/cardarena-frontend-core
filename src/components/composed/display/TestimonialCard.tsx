import { Star } from "lucide-react";
import { ReactNode } from "react";

export interface TestimonialCardProps {
  /** Customer name */
  name: string;
  /** Customer role or title */
  role: string;
  /** Testimonial content/quote */
  content: string;
  /** Rating out of 5 stars */
  rating?: number;
  /** Optional avatar image URL or element */
  avatar?: string | ReactNode;
  /** Card background variant */
  variant?: "gray" | "white" | "bordered";
  /** Whether to show quote marks */
  showQuotes?: boolean;
}

const variants = {
  gray: "bg-gray-50",
  white: "bg-white shadow-sm",
  bordered: "bg-white border-2 border-gray-200",
};

/**
 * TestimonialCard
 * 
 * A card component for displaying customer testimonials with ratings, avatars,
 * and customizable styling.
 * 
 * @example
 * // Basic usage
 * <TestimonialCard
 *   name="John Doe"
 *   role="CEO, TechCorp"
 *   content="This product changed our business completely!"
 *   rating={5}
 * />
 * 
 * @example
 * // With avatar and custom variant
 * <TestimonialCard
 *   name="Jane Smith"
 *   role="Marketing Director"
 *   content="Outstanding service and support. Highly recommended!"
 *   rating={5}
 *   avatar="/avatars/jane.jpg"
 *   variant="white"
 * />
 * 
 * @example
 * // Without rating, with custom avatar element
 * <TestimonialCard
 *   name="Mike Johnson"
 *   role="Product Manager"
 *   content="The best investment we've made this year."
 *   avatar={<div className="w-12 h-12 bg-blue-500 rounded-full" />}
 *   variant="bordered"
 *   showQuotes={false}
 * />
 */
export function TestimonialCard({
  name,
  role,
  content,
  rating = 5,
  avatar,
  variant = "gray",
  showQuotes = true,
}: TestimonialCardProps) {
  return (
    <div className={`${variants[variant]} p-8 rounded-xl`}>
      {/* Rating */}
      {rating > 0 && (
        <div className="flex mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      )}

      {/* Content */}
      <p className="text-gray-700 mb-6 italic">
        {showQuotes && '"'}
        {content}
        {showQuotes && '"'}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {avatar && (
          <div className="shrink-0">
            {typeof avatar === "string" ? (
              <img
                src={avatar}
                alt={name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              avatar
            )}
          </div>
        )}
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-gray-600 text-sm">{role}</div>
        </div>
      </div>
    </div>
  );
}