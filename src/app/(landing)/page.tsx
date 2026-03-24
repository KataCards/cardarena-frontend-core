"use client";

import { 
  Trophy, Users, Zap, Shield, Rocket, Target, Clock, DollarSign, 
  TrendingUp, MapPin, Calendar, Gamepad2, Settings,
  CheckCircle, Code, Star
} from "lucide-react";

// Layout Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Composed Components
import { Hero } from "@/components/composed/Hero";
import { Features } from "@/components/composed/Features";
import { Stats } from "@/components/composed/Stats";
import { Testimonials } from "@/components/composed/Testimonials";
import { Pricing } from "@/components/composed/Pricing";
import { CTA } from "@/components/composed/CTA";
import { TabSection } from "@/components/composed/TabSection";
import { StatusBanner } from "@/components/composed/StatusBanner";
import { QRRegistrationBanner } from "@/components/composed/WIP_QRRegistrationBanner";

// UI Components
import { Button } from "@/components/ui/Button";
import { FeatureCard } from "@/components/composed/display/FeatureCard";
import { StatCard } from "@/components/composed/display/StatCard";
import { TestimonialCard } from "@/components/composed/display/TestimonialCard";
import { PricingCard } from "@/components/composed/display/PricingCard";
import { TournamentCard } from "@/components/composed/display/TournamentCard";
import { MatchCard } from "@/components/composed/display/MatchCard";
import { Countdown } from "@/components/ui/Countdown";

/**
 * Component Reference Gallery
 * 
 * A comprehensive showcase of all available components in the CardArena Core Library.
 * Each component is rendered with realistic, representative props to demonstrate
 * its purpose, variants, and key features.
 */
export default function ComponentGallery() {
  return (
    <div className="min-h-screen bg-white">
      {/* ========================================
          LAYOUT COMPONENTS
      ======================================== */}
      
      {/* Navbar - White Variant */}
      <Navbar
        brand={{
          name: "CardArena",
          subtext: "Component Gallery",
          href: "/"
        }}
        links={[
          { label: "Home", href: "#" },
          { label: "Features", href: "#features" },
          { label: "Components", href: "#components" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" }
        ]}
        action={{ label: "Get Started", href: "/signup", colorScheme: "red" }}
        variant="white"
        sticky={true}
      />

      <main>
        {/* ========================================
            HERO SECTION
        ======================================== */}
        
        {/* Hero - With Badge & Secondary Action */}
        <Hero
          badge="🎉 v1.0 Now Available"
          title={
            <>
              Build <span className="text-red-600">tournament platforms</span> that players love
            </>
          }
          description="A complete library of production-ready React components for card game tournaments, event management, and competitive gaming platforms."
          primaryText="Explore Components"
          primaryHref="#components"
          secondaryText="View on GitHub"
          secondaryHref="https://github.com"
        />

        {/* Hero - Primary Action Only */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Hero Variants</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Hero
                title="Simple & Focused"
                description="Sometimes less is more. This hero variant focuses on a single, powerful call-to-action."
                primaryText="Start Free Trial"
                primaryHref="/signup"
              />
            </div>
          </div>
        </section>

        {/* ========================================
            STATS SECTION
        ======================================== */}
        
        {/* Stats - 4 Columns with Icons */}
        <Stats
          title="Platform Statistics"
          description="Trusted by thousands of organizers worldwide"
          columns={4}
          stats={[
            { value: "10K+", label: "Active Users", icon: Users, variant: "primary" },
            { value: "500+", label: "Tournaments", icon: Trophy, variant: "success" },
            { value: "99.9%", label: "Uptime", icon: Zap, variant: "info" },
            { value: "24/7", label: "Support", icon: Clock }
          ]}
        />

        {/* Stats - 3 Columns Dark Variant */}
        <Stats
          variant="dark"
          columns={3}
          stats={[
            { value: "$2.5M+", label: "Prize Pool Distributed", icon: DollarSign },
            { value: "150+", label: "Countries", icon: MapPin },
            { value: "4.9/5", label: "User Rating", icon: Star }
          ]}
        />

        {/* ========================================
            FEATURES SECTION
        ======================================== */}
        
        {/* Features - Light Variant */}
        <Features
          title="Everything you need"
          description="Professional tools for perfect tournaments"
          variant="light"
          features={[
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Lightning Fast",
              description: "Built with React 19 Server Components for maximum performance and instant page loads."
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Secure & Reliable",
              description: "Type-safe APIs and validated data processing ensure your tournaments run smoothly."
            },
            {
              icon: <Rocket className="w-8 h-8" />,
              title: "Scalable Architecture",
              description: "Modular components based on Atomic Design principles that grow with your needs."
            },
            {
              icon: <Target className="w-8 h-8" />,
              title: "Tournament Ready",
              description: "Pre-built components for brackets, matches, timers, and player management."
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Player Management",
              description: "Comprehensive tools for registration, rankings, and player profiles."
            },
            {
              icon: <Trophy className="w-8 h-8" />,
              title: "Real-time Updates",
              description: "Live match results, bracket updates, and instant notifications for participants."
            }
          ]}
        />

        {/* Features - Dark Variant */}
        <Features
          title="Why Choose CardArena?"
          description="Built by tournament organizers, for tournament organizers"
          variant="dark"
          features={[
            {
              icon: <CheckCircle className="w-8 h-8" />,
              title: "Battle-Tested",
              description: "Used in over 500 professional tournaments with 10,000+ active users."
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Open Source",
              description: "100% open source and free to use. Contribute and customize as needed."
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "TypeScript First",
              description: "Full type safety and IntelliSense support for better developer experience."
            }
          ]}
        />

        {/* ========================================
            UI COMPONENTS SHOWCASE
        ======================================== */}
        
        <section id="components" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">UI Components</h2>
              <p className="text-xl text-gray-600">Flexible, reusable building blocks</p>
            </div>

            {/* Buttons */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="solid" colorScheme="red">Solid Red</Button>
                <Button variant="solid" colorScheme="dark">Solid Dark</Button>
                <Button variant="secondary" colorScheme="red">Secondary Red</Button>
                <Button variant="outline" colorScheme="dark">Outline Dark</Button>
                <Button variant="ghost" colorScheme="gray">Ghost Gray</Button>
                <Button variant="solid" colorScheme="red" size="lg" icon={Rocket} iconPosition="right">
                  Get Started
                </Button>
                <Button variant="outline" colorScheme="dark" icon={Code}>
                  View on GitHub
                </Button>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Feature Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<Zap className="w-8 h-8" />}
                  title="Lightning Fast"
                  description="Optimized for performance with React Server Components"
                  iconColor="red"
                  variant="white"
                />
                <FeatureCard
                  icon={<Shield className="w-8 h-8" />}
                  title="Secure"
                  description="Bank-level security with type-safe APIs"
                  iconColor="blue"
                  variant="gray"
                />
                <FeatureCard
                  icon={<Rocket className="w-8 h-8" />}
                  title="Scalable"
                  description="Grows with your business from day one"
                  iconColor="purple"
                  variant="gradient"
                />
              </div>
            </div>

            {/* Stat Cards */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Stat Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                  title="Total Users"
                  value="12,345"
                  icon={Users}
                  iconColor="red"
                  variant="gray"
                />
                <StatCard
                  title="Revenue"
                  value="$45,231"
                  icon={DollarSign}
                  iconColor="green"
                  variant="white"
                  trend={{ value: 12.5, label: "vs last month" }}
                />
                <StatCard
                  title="Active Sessions"
                  value={892}
                  icon={TrendingUp}
                  iconColor="blue"
                  variant="gradient"
                  trend={{ value: -3.2, label: "vs yesterday" }}
                />
                <StatCard
                  title="Loading..."
                  value="0"
                  icon={Clock}
                  iconColor="gray"
                  isLoading={true}
                />
              </div>
            </div>

            {/* Tournament Cards */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tournament Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TournamentCard
                  title="Summer Championship 2024"
                  badge={{ label: "Registration Open", variant: "info" }}
                  metadata={[
                    { icon: MapPin, label: "New York, NY" },
                    { icon: Calendar, label: "July 15, 2024" },
                    { icon: Users, label: "24/32 Players" },
                    { icon: Gamepad2, label: "Magic: The Gathering" }
                  ]}
                  href="/tournaments/summer-2024"
                  ctaText="View Details"
                />
                <TournamentCard
                  title="Weekly Game Night"
                  badge={{ label: "Tonight", variant: "success" }}
                  metadata={[
                    { icon: MapPin, label: "Local Game Store" },
                    { icon: Calendar, label: "Every Friday 7PM" },
                    { icon: Users, label: "8-12 Players" }
                  ]}
                  href="/events/game-night"
                  ctaText="RSVP Now →"
                />
                <TournamentCard
                  title="Regional Finals"
                  badge={{ label: "Sold Out", variant: "danger" }}
                  metadata={[
                    { icon: MapPin, label: "San Francisco, CA" },
                    { icon: Calendar, label: "Aug 20-22, 2024" },
                    { icon: DollarSign, label: "$50 Entry" }
                  ]}
                  footer={
                    <button className="text-sm text-blue-600 font-semibold">
                      Join Waitlist
                    </button>
                  }
                />
              </div>
            </div>

            {/* Match Cards */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Match Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MatchCard
                  match={{
                    id: "m1",
                    tableNumber: 1,
                    round: 3,
                    status: "completed",
                    players: ["Alice Johnson", "Bob Smith"],
                    winner: "Alice Johnson"
                  }}
                />
                <MatchCard
                  match={{
                    id: "m2",
                    tableNumber: 5,
                    round: 3,
                    status: "pending",
                    players: ["Charlie Brown", "Diana Prince"]
                  }}
                />
              </div>
            </div>

            {/* Timers */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Timers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Countdown
                  initialSeconds={1800}
                  size="md"
                  label="Round 1"
                  autoStart={false}
                />
                <Countdown
                  initialSeconds={45}
                  size="md"
                  variant="danger"
                  lastMinuteMessage="Hurry Up!"
                  autoStart={false}
                />
                <Countdown
                  initialSeconds={-120}
                  size="md"
                  overtimeMessage="Overtime!"
                  autoStart={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            TESTIMONIALS SECTION
        ======================================== */}
        
        {/* Testimonials - White Variant */}
        <Testimonials
          title="What our customers say"
          description="Trusted by tournament organizers worldwide"
          variant="white"
          testimonials={[
            {
              name: "Sarah Johnson",
              role: "Tournament Director, GameCon",
              content: "CardArena transformed how we run our tournaments. The components are beautiful, fast, and incredibly easy to customize.",
              rating: 5
            },
            {
              name: "Mike Chen",
              role: "Store Owner, Dragon's Lair",
              content: "We've been using CardArena for 6 months and our player satisfaction has never been higher. The real-time updates are a game changer.",
              rating: 5
            },
            {
              name: "Emily Rodriguez",
              role: "Event Coordinator",
              content: "The best tournament management platform I've used. Clean design, powerful features, and excellent documentation.",
              rating: 5
            }
          ]}
        />

        {/* Testimonials - Individual Cards */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Testimonial Card Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TestimonialCard
                name="John Doe"
                role="CEO, TechCorp"
                content="This product changed our business completely!"
                rating={5}
                variant="gray"
              />
              <TestimonialCard
                name="Jane Smith"
                role="Marketing Director"
                content="Outstanding service and support. Highly recommended!"
                rating={5}
                avatar="https://i.pravatar.cc/150?img=4"
                variant="white"
              />
              <TestimonialCard
                name="Alex Taylor"
                role="Product Manager"
                content="The best investment we've made this year."
                avatar={<div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">AT</div>}
                variant="bordered"
                showQuotes={false}
                rating={4}
              />
            </div>
          </div>
        </section>

        {/* ========================================
            PRICING SECTION
        ======================================== */}
        
        {/* Pricing - Light Variant */}
        <Pricing
          title="Simple, Transparent Pricing"
          description="Choose the plan that fits your needs"
          variant="light"
          plans={[
            {
              name: "Starter",
              price: "$9/mo",
              features: [
                "Up to 32 players",
                "Basic bracket management",
                "Email support",
                "1GB storage"
              ],
              buttonText: "Get Started",
              isPopular: false
            },
            {
              name: "Pro",
              price: "$29/mo",
              features: [
                "Unlimited players",
                "Advanced brackets",
                "Priority support",
                "Real-time updates",
                "Custom branding",
                "10GB storage"
              ],
              buttonText: "Start Free Trial",
              isPopular: true
            },
            {
              name: "Enterprise",
              price: "Custom",
              features: [
                "Everything in Pro",
                "Dedicated support",
                "Custom integrations",
                "SLA guarantee",
                "Unlimited storage",
                "White-label option"
              ],
              buttonText: "Contact Sales",
              isPopular: false
            }
          ]}
        />

        {/* Pricing Cards - Individual Variants */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pricing Card Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PricingCard
                name="Basic"
                price="$0"
                priceDescription="per month, billed annually"
                features={["5 tournaments/month", "Basic support", "Community access"]}
                buttonText="Get Started Free"
                buttonHref="/signup"
              />
              <PricingCard
                name="Premium"
                price="$49"
                priceDescription="per user / month"
                description="Best for professionals"
                features={["Unlimited tournaments", "Priority support", "Advanced analytics", "Custom branding"]}
                buttonText="Start Trial"
                isPopular={true}
                highlightColor="blue"
                buttonHref="/signup?plan=premium"
              />
              <PricingCard
                name="Ultimate"
                price={<span className="text-2xl">Contact Us</span>}
                priceDescription="Custom pricing for custom needs"
                features={["Everything in Premium", "Dedicated account manager", "Custom development", "24/7 phone support"]}
                buttonText="Schedule Demo"
                buttonVariant="outline"
                buttonHref="/contact"
              />
            </div>
          </div>
        </section>

        {/* ========================================
            COMPOSED COMPONENTS
        ======================================== */}
        
        {/* Status Banner */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Status Banners</h3>
            <div className="space-y-6">
              <StatusBanner
                primaryStatus={{ label: "Tournament", value: "Active", variant: "success" }}
                centerInfo={{
                  label: "Round",
                  value: 3,
                  statusLabel: "In Progress",
                  icon: Settings,
                  animateIcon: true
                }}
                secondaryStatus={{ label: "Players", current: 24, max: 32 }}
                mainMessage="Round 3 is currently in progress"
                subMessages={[
                  { text: "12 matches active", icon: Clock },
                  { text: "8 players waiting", icon: Users }
                ]}
                variant="info"
              />
              <StatusBanner
                primaryStatus={{ label: "Event", value: "Registration Open", variant: "success" }}
                secondaryStatus={{ label: "Attendees", current: 156, max: 200 }}
                mainMessage="Early bird tickets available"
                subMessages={[{ text: "Downtown Venue", icon: MapPin }]}
                variant="success"
              />
            </div>
          </div>
        </section>

        {/* QR Registration Banner */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">QR Registration Banner</h3>
            <div className="space-y-6">
              <QRRegistrationBanner
                registrationUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                title="Scan to Register"
                description="Join the tournament by scanning this QR code with your phone"
                variant="accent"
              />
              <QRRegistrationBanner
                registrationUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                title="Quick Check-In"
                description="Scan for instant event registration and updates"
                variant="success"
              />
              <QRRegistrationBanner
                registrationUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                title="Get Started Today"
                description="Scan to create your player profile and join the community"
                variant="default"
              />
            </div>
          </div>
        </section>

        {/* Tab Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tab Sections</h3>
            <div className="space-y-6">
              <TabSection
                title="Account Settings"
                description="Manage your account preferences and profile information"
                icon={Settings}
                success="Settings saved successfully!"
              >
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">Form fields would go here...</p>
                  </div>
                </div>
              </TabSection>
              <TabSection
                title="Security"
                description="Update your password and security settings"
                icon={Shield}
                error="Failed to update password. Please try again."
              >
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">Security form fields would go here...</p>
                  </div>
                </div>
              </TabSection>
            </div>
          </div>
        </section>

        {/* ========================================
            CTA SECTIONS
        ======================================== */}
        
        {/* CTA - Default Variant */}
        <CTA
          title="Ready for your first tournament?"
          description="Get started today and experience how simple tournament management can be."
          buttonText="Sign up for free"
          buttonHref="/signup"
          variant="default"
        />

        {/* CTA - Gradient Variant */}
        <CTA
          title="Take your tournaments to the next level"
          description="Join thousands of organizers who trust CardArena for their events."
          buttonText="Explore Features"
          buttonHref="/features"
          variant="gradient"
        />

        {/* CTA - Dark Variant */}
        <CTA
          title="Questions? We're here to help"
          description="Our team is ready to answer your questions and help you get started."
          buttonText="Contact Sales"
          buttonHref="/contact"
          variant="dark"
        />
      </main>

      {/* ========================================
          FOOTER
      ======================================== */}
      
      {/* Footer - Dark Variant */}
      <Footer
        brand={{
          name: "CardArena",
          description: "Professional tournament management for card games and competitive gaming."
        }}
        columns={[
          {
            title: "Product",
            links: [
              { label: "Features", href: "/features" },
              { label: "Pricing", href: "/pricing" },
              { label: "Documentation", href: "/docs" },
              { label: "API Reference", href: "/api" }
            ]
          },
          {
            title: "Company",
            links: [
              { label: "About", href: "/about" },
              { label: "Blog", href: "/blog" },
              { label: "Careers", href: "/careers" },
              { label: "Press Kit", href: "/press" }
            ]
          },
          {
            title: "Resources",
            links: [
              { label: "Community", href: "/community" },
              { label: "Support", href: "/support" },
              { label: "Status", href: "/status" },
              { label: "Changelog", href: "/changelog" }
            ]
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Security", href: "/security" },
              { label: "Cookies", href: "/cookies" }
            ]
          }
        ]}
        copyright="CardArena. All rights reserved."
        variant="dark"
      />
    </div>
  );
}