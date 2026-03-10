export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  isContact?: boolean;
}
