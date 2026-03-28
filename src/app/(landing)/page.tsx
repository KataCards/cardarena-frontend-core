"use client";

import { useState } from "react";
import { 
  Trophy, Users, Zap, Shield, Rocket, Target, Clock, DollarSign, 
  TrendingUp, MapPin, Calendar, Gamepad2, Settings,
  CheckCircle, Code, Star, Mail, Search, Info, AlertTriangle
} from "lucide-react";

// Layout Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Composed Components
import { Hero } from "@/components/composed/Hero";
import { Features } from "@/components/composed/Features";
import { CTA } from "@/components/composed/CTA";

// UI Components
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Countdown } from "@/components/ui/Countdown";
import { Accordion } from "@/components/ui/Accordion";
import { 
  TableContainer, Table, TableHeader, TableBody, TableRow, TableHead, TableCell 
} from "@/components/ui/Table";
import { Slider } from "@/components/ui/Slider";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { SearchInput } from "@/components/ui/SearchInput";
import { Label } from "@/components/ui/Label";
import { FieldError } from "@/components/ui/FieldError";
import { WinnerModal } from "@/components/modals/WinnerModal";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { EmptyState } from "@/components/ui/EmptyState";

/**
 * Component Reference Gallery
 * 
 * A comprehensive showcase of all available components in the CardArena Core Library.
 * Each component is rendered with realistic, representative props to demonstrate
 * its purpose, variants, and key features.
 */
export default function ComponentGallery() {
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [accordionExpanded, setAccordionExpanded] = useState<Set<string>>(new Set(["1"]));

  const handleAccordionToggle = (id: string) => {
    setAccordionExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const tableData = [
    { id: 1, name: "Alice Johnson", role: "Organizer", status: "Active" },
    { id: 2, name: "Bob Smith", role: "Player", status: "Inactive" },
    { id: 3, name: "Charlie Brown", role: "Admin", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-background">
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
        action={{ label: "Get Started", href: "/signup" }}
        variant="white"
        sticky={true}
      />

      <main>
        {/* ========================================
            HERO SECTION
        ======================================== */}
        
        {/* Hero - With Badge & Secondary Action */}
        <Hero
          badge="🎉 v0.2.0 Now Available"
          title={
            <>
              Build <span className="text-primary">tournament platforms</span> that players love
            </>
          }
          description="A complete library of production-grade React components for card game tournaments, event management, and competitive gaming platforms."
          primaryText="Explore Components"
          primaryHref="#components"
          secondaryText="View on GitHub"
          secondaryHref="https://github.com"
        />

        {/* ========================================
            UI COMPONENTS SHOWCASE
        ======================================== */}
        
        <section id="components" className="py-20 bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">UI Components</h2>
              <p className="text-xl text-muted-foreground">Flexible, reusable building blocks</p>
            </div>

            {/* Buttons & Badges */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-foreground mb-6">Buttons & Badges</h3>
              <div className="space-y-8">
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="default" size="lg" icon={Rocket} iconPosition="right">
                    Get Started
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-foreground mb-6">Forms & Inputs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" required>Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" leftSlot={<Mail className="w-4 h-4 text-muted-foreground" />} />
                  </div>
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <SearchInput id="search" placeholder="Search tournaments..." />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput id="password" placeholder="Enter your password" />
                  </div>
                  <div>
                    <Label htmlFor="error-input">Input with Error</Label>
                    <Input id="error-input" placeholder="Invalid value" className="border-destructive" aria-invalid="true" />
                    <FieldError>This field is required.</FieldError>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-foreground mb-6">Data Table</h3>
              <TableContainer>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead align="right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell align="right">
                          <Badge variant={row.status === "Active" ? "success" : "secondary"}>
                            {row.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            {/* Accordion & Slider */}
            <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Accordion</h3>
                <Accordion.Root>
                  <Accordion.Item id="1" isExpanded={accordionExpanded.has("1")} onToggle={handleAccordionToggle}>
                    <Accordion.Header id="1" isExpanded={accordionExpanded.has("1")} onToggle={handleAccordionToggle}>
                      What is CardArena?
                    </Accordion.Header>
                    <Accordion.Content id="1" isExpanded={accordionExpanded.has("1")}>
                      CardArena is a professional tournament management platform for card games.
                    </Accordion.Content>
                  </Accordion.Item>
                  <Accordion.Item id="2" isExpanded={accordionExpanded.has("2")} onToggle={handleAccordionToggle}>
                    <Accordion.Header id="2" isExpanded={accordionExpanded.has("2")} onToggle={handleAccordionToggle}>
                      Is it open source?
                    </Accordion.Header>
                    <Accordion.Content id="2" isExpanded={accordionExpanded.has("2")}>
                      Yes! CardArena is built as an open-source core library for developers.
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Slider</h3>
                <div className="space-y-8">
                  <Slider.Root value={sliderValue} onChange={setSliderValue} min={0} max={100} size="md">
                    <div className="flex justify-between items-center mb-2">
                      <Label className="mb-0">Volume Control</Label>
                      <Slider.Value format={(v) => `${v}%`} />
                    </div>
                    <Slider.Track>
                      <Slider.Range />
                      <Slider.Thumb />
                    </Slider.Track>
                    <Slider.RangeLabels />
                  </Slider.Root>

                  <Slider.Root value={25} onChange={() => {}} size="lg">
                    <Slider.Track>
                      <Slider.Range className="bg-success" />
                      <Slider.Thumb className="[&::-webkit-slider-thumb]:border-success" />
                    </Slider.Track>
                  </Slider.Root>
                </div>
              </div>
            </div>

            {/* Modal & Alerts */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-foreground mb-6">Modals & Feedback</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <ErrorAlert.Root>
                    <ErrorAlert.Title>System Error</ErrorAlert.Title>
                    <ErrorAlert.Description>
                      Unable to connect to the game server. Please check your internet connection.
                    </ErrorAlert.Description>
                    <ErrorAlert.Action onClick={() => {}}>Retry Connection</ErrorAlert.Action>
                  </ErrorAlert.Root>
                  
                  <ErrorAlert.Root variant="warning">
                    <ErrorAlert.Title>Low Balance</ErrorAlert.Title>
                    <ErrorAlert.Description>
                      Your account balance is low. Please top up to join more tournaments.
                    </ErrorAlert.Description>
                  </ErrorAlert.Root>
                </div>
                <div className="flex flex-col items-center justify-center p-8 border border-dashed border-border rounded-xl">
                  <Button onClick={() => setIsWinnerModalOpen(true)} size="lg">
                    Open Winner Modal
                  </Button>
                  <p className="mt-4 text-sm text-muted-foreground">Click to test the Dialog primitive composition</p>
                </div>
              </div>
            </div>

            {/* Empty States */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-foreground mb-6">Empty States</h3>
              <div className="bg-muted/30 rounded-2xl border border-border">
                <EmptyState.Root>
                  <EmptyState.Icon icon={Trophy} />
                  <EmptyState.Title>No Tournaments Yet</EmptyState.Title>
                  <EmptyState.Description>
                    You haven't joined any tournaments. Start your competitive journey today!
                  </EmptyState.Description>
                  <EmptyState.Actions>
                    <Button>Explore Tournaments</Button>
                  </EmptyState.Actions>
                </EmptyState.Root>
              </div>
            </div>

            {/* Timers */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-6">Timers</h3>
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
                  variant="overtime"
                  overtimeMessage="Overtime!"
                  autoStart={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================
            LEGACY COMPONENTS (Demos)
        ======================================== */}
        
        <Features
          title="Everything you need"
          description="Professional tools for perfect tournaments"
          variant="light"
          features={[
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Lightning Fast",
              description: "Built with React 19 Server Components for maximum performance."
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Secure & Reliable",
              description: "Type-safe APIs and validated data processing ensure smooth runs."
            },
            {
              icon: <Rocket className="w-8 h-8" />,
              title: "Scalable",
              description: "Modular components based on Atomic Design principles."
            }
          ]}
        />

        <CTA
          title="Ready for your first tournament?"
          description="Get started today and experience how simple tournament management can be."
          buttonText="Sign up for free"
          buttonHref="/signup"
          variant="gradient"
        />
      </main>

      {/* ========================================
          FOOTER
      ======================================== */}
      
      <Footer
        brand={{
          name: "CardArena",
          description: "Professional tournament management for card games."
        }}
        columns={[
          {
            title: "Product",
            links: [
              { label: "Features", href: "#" },
              { label: "Pricing", href: "#" },
              { label: "Docs", href: "#" }
            ]
          },
          {
            title: "Resources",
            links: [
              { label: "Community", href: "#" },
              { label: "Support", href: "#" },
              { label: "Status", href: "#" }
            ]
          }
        ]}
        copyright="CardArena Core. All rights reserved."
        variant="dark"
      />

      {/* Winner Modal Composition */}
      <WinnerModal.Root open={isWinnerModalOpen} onOpenChange={setIsWinnerModalOpen}>
        <WinnerModal.Portal>
          <WinnerModal.Overlay />
          <WinnerModal.Content>
            <WinnerModal.Title>Select Winner</WinnerModal.Title>
            <WinnerModal.Options>
              <WinnerModal.Option onClick={() => setIsWinnerModalOpen(false)}>
                Alice Johnson
              </WinnerModal.Option>
              <WinnerModal.Option onClick={() => setIsWinnerModalOpen(false)}>
                Bob Smith
              </WinnerModal.Option>
            </WinnerModal.Options>
            <WinnerModal.Cancel onClick={() => setIsWinnerModalOpen(false)}>Cancel</WinnerModal.Cancel>
            <WinnerModal.Stripe />
          </WinnerModal.Content>
        </WinnerModal.Portal>
      </WinnerModal.Root>
    </div>
  );
}