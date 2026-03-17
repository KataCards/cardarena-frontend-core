import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { PricingCard } from "@/components/ui/PricingCard";
import { Trophy } from "lucide-react";

export function ComponentShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Component Library</h1>
          <p className="text-lg text-gray-600">
            A showcase of the primitive and composed components available in the core package.
          </p>
        </header>

        <div className="space-y-20">
          <ShowcaseSection title="Buttons">
            <div className="flex flex-wrap gap-4">
              <Button variant="solid" colorScheme="red">
                Primary Red
              </Button>
              <Button variant="solid" colorScheme="dark">
                Primary Dark
              </Button>
              <Button variant="secondary" colorScheme="red">
                Secondary Red
              </Button>
              <Button variant="outline" colorScheme="gray">
                Outline Gray
              </Button>
              <Button variant="ghost" colorScheme="red">
                Ghost Red
              </Button>
            </div>
          </ShowcaseSection>

          <ShowcaseSection title="UI Cards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Trophy className="w-8 h-8" />}
                title="Tournament Management"
                description="Easily create and manage complex tournament brackets."
              />
              <TestimonialCard
                name="Alex Smith"
                role="Pro Player"
                content="The best core library for card game developers I've ever used."
                rating={5}
              />
              <PricingCard
                name="Developer"
                price="Free"
                features={["Core Components", "Typescript Support", "Community Access"]}
                buttonText="Get Started"
              />
            </div>
          </ShowcaseSection>
        </div>
      </div>
    </section>
  );
}

function ShowcaseSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b">{title}</h2>
      {children}
    </div>
  );
}
