import { CheckCircle } from 'lucide-react';
import { PricingPlan } from '@/types/ui/pricingplan';
import { Button } from './Button';

export function PricingCard({ 
  name, 
  price, 
  features, 
  buttonText, 
  isPopular, 
  isContact 
}: PricingPlan) {
  return (
    <div className={`bg-white p-8 rounded-xl shadow-sm relative ${isPopular ? 'border-2 border-red-600' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Beliebt
          </span>
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{name}</h3>
      <div className="text-3xl font-bold text-gray-900 mb-6">
        {price}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        variant={isContact ? 'outline' : 'solid'} 
        colorScheme={isPopular ? 'red' : (isContact ? 'gray' : 'dark')}
        fullWidth
      >
        {buttonText}
      </Button>
    </div>
  );
}
