'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/composed/Hero";
import { ComponentShowcase } from "@/components/composed/ComponentShowcase";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ComponentShowcase />
        <section className="py-24 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Open Source Core</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              This library is part of the CardArena ecosystem. It provides the essential 
              UI components used across our tournament platform.
            </p>
            <div className="flex justify-center gap-6">
              <a href="#" className="text-gray-900 font-semibold hover:underline transition-colors">Documentation</a>
              <a href="#" className="text-gray-900 font-semibold hover:underline transition-colors">Contributing</a>
              <a href="#" className="text-gray-900 font-semibold hover:underline transition-colors">License</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
