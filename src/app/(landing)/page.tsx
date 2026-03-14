import { Trophy, Github, Zap, Shield, Smartphone, Star, Users, Layout } from "lucide-react";
import { Navbar, type NavLink } from "@/components/layout/Navbar";
import { Hero, type HeroAction } from "@/components/composed/Hero";
import { Features } from "@/components/composed/Features";
import { Stats } from "@/components/composed/Stats";
import { Testimonials } from "@/components/composed/Testimonials";
import { Pricing } from "@/components/composed/Pricing";
import { ComponentShowcase } from "@/components/composed/ComponentShowcase";
import { Footer } from "@/components/layout/Footer";

/**
 * Home Page (Container)
 * Orchestrates the landing page by providing data to Presenter components.
 * This is a Server Component.
 */
export default function Home() {
  // Navigation Data
  const navLinks: NavLink[] = [
    { label: "Features", href: "#features" },
    { label: "Components", href: "#showcase" },
    { label: "Pricing", href: "#pricing" },
    { label: "GitHub", href: "https://github.com", iconName: "github" },
  ];

  const navBrand = {
    name: "CardArena",
    subtext: "Core Library",
    logo: "trophy" as const,
  };

  // Hero Data
  const heroTitle = (
    <>
      The foundation for your
      <span className="text-red-600 block">Card Game Platform</span>
    </>
  );

  const primaryAction: HeroAction = {
    label: "Explore Components",
    href: "#showcase",
  };

  const secondaryAction: HeroAction = {
    label: "View on GitHub",
    href: "https://github.com",
    icon: Github,
    variant: "outline",
    colorScheme: "dark",
  };

  // Stats Data
  const stats = [
    { number: "10k+", label: "Turniere" },
    { number: "50k+", label: "Spieler" },
    { number: "100%", label: "Open Source" },
    { number: "24/7", label: "Live Updates" },
  ];

  // Features Data
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Blitzschnell",
      description: "Optimierte React 19 Server Components für maximale Performance."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sicher & Robust",
      description: "Typsichere API-Anbindung und validierte Datenverarbeitung."
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: "Modular",
      description: "Komponenten basierend auf dem Atomic Design Prinzip."
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: "Marc Richter",
      role: "Tournament Organizer",
      content: "Die beste Library für Card Game Projekte. Extrem einfach zu erweitern.",
      rating: 5
    },
    {
      name: "Sarah Meyer",
      role: "UI Designer",
      content: "Wunderschöne Komponenten, die sich nahtlos in jedes Design einfügen.",
      rating: 5
    },
    {
      name: "Tim Wagner",
      role: "Pro Player",
      content: "Die Live-Updates während des Turniers sind ein Gamechanger.",
      rating: 4
    }
  ];

  // Pricing Data
  const pricingPlans = [
    {
      name: "Community",
      price: "0€",
      features: ["Alle UI Komponenten", "GitHub Support", "MIT Lizenz"],
      buttonText: "Jetzt starten"
    },
    {
      name: "Pro",
      price: "49€",
      features: ["Premium Layouts", "Prioritäts-Support", "Custom Themes"],
      buttonText: "Pro wählen"
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Full Service", "SLA Support", "On-Premise Option"],
      buttonText: "Kontakt aufnehmen"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        brand={navBrand} 
        links={navLinks} 
        action={{ label: "Get Started", href: "#" }} 
      />
      
      <main>
        <Hero 
          badge="Core Library Launch v0.1.0"
          title={heroTitle}
          description="Congrats on launching the CardArena Frontend Core! A collection of high-performance, reusable components designed for tournament management and card game ecosystems."
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
        />

        <Stats stats={stats} />
        
        <Features features={features} />

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
              <a href="#" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">Jetzt kostenlos starten</a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
