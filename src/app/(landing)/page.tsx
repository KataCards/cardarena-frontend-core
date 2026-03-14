import { Github } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero, type HeroAction } from "@/components/composed/Hero";
import { Features } from "@/components/composed/Features";
import { Stats } from "@/components/composed/Stats";
import { Testimonials } from "@/components/composed/Testimonials";
import { Pricing } from "@/components/composed/Pricing";
import { ComponentShowcase } from "@/components/composed/ComponentShowcase";
import { Footer } from "@/components/layout/Footer";
import { Feature } from '@/types/ui/feature';
import { 
  navLinks, 
  navBrand, 
  heroTitle, 
  primaryAction, 
  secondaryAction, 
  stats, 
  features, 
  testimonials, 
  pricingPlans 
} from "@/_data/mock";

/**
 * Home Page (Container)
 * Orchestrates the landing page using static mock data.
 * This is a Server Component.
 */
export default function Home() {
  const formattedHeroTitle = (
    <>
      {heroTitle.split("Card Game Platform")[0]}
      <span className="text-red-600 block">Card Game Platform</span>
    </>
  );

  const heroPrimary: HeroAction = {
    ...primaryAction,
  };

  const heroSecondary: HeroAction = {
    ...secondaryAction,
    icon: Github
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        brand={navBrand} 
        links={navLinks} 
        action={{ label: "Get Started", href: "/dashboard" }} 
      />

      <main>
        <Hero 
          badge="Core Library Launch v0.1.0"
          title={formattedHeroTitle}
          description="Congrats on launching the CardArena Frontend Core! A collection of high-performance, reusable components designed for tournament management and card game ecosystems."
          primaryAction={heroPrimary}
          secondaryAction={heroSecondary}
        />

        <Stats stats={stats} />

        <Features features={features as Feature[]} />



        <ComponentShowcase />

        <Testimonials testimonials={testimonials} />

        <Pricing plans={pricingPlans} />
        
        {/* Call to Action Section */}
        <section className="py-24 bg-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-black mb-6 tracking-tight">Bereit für das nächste Turnier?</h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto mb-10 font-medium">
              Starten Sie noch heute mit dem CardArena Frontend Core und bauen Sie die 
              Plattform Ihrer Träume.
            </p>
            <div className="flex justify-center gap-6">
              <a href="/dashboard" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">Jetzt Dashboard ansehen</a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
