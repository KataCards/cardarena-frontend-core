import { Star } from 'lucide-react';
import { Testimonial } from '@/types/ui/testimonial';

export function TestimonialCard({ name, role, content, rating }: Testimonial) {
  return (
    <div className="bg-gray-50 p-8 rounded-xl">
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">&quot;{content}&quot;</p>
      <div>
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-gray-600 text-sm">{role}</div>
      </div>
    </div>
  );
}
