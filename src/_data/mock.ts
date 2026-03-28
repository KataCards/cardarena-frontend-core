import type { NavLink, NavbarProps } from "@/components/layout/Navbar";
import type { HeroAction } from "@/components/composed/Hero";
import type { TournamentSummary, QuickActionItem } from "@/types/ui/dashboard";
import type { ScoreboardItem } from "@/types/ui/scoreboard";
import type { MatchItem } from "@/types/ui/match";
import type { SidebarLinkItem } from "@/types/ui/sidebar";
import { Testimonial } from "@/types/ui/testimonial";
import { PricingPlan } from "@/types/ui/pricingplan";

// --- Landing Page Data ---

export const navLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Components", href: "#showcase" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Playground", href: "/playground" },
  { label: "GitHub", href: "https://github.com", iconName: "github" },
];

export const navBrand: NavbarProps['brand'] = {
  name: "CardArena",
  subtext: "Core Library",
  logo: "trophy",
};

export const heroTitle = "The foundation for your Card Game Platform";

export const primaryAction: HeroAction = {
  label: "Zum Dashboard",
  href: "/dashboard",
};

export const secondaryAction: HeroAction = {
  label: "Playground",
  href: "/playground",
  variant: "outline",
  colorScheme: "dark",
};

export const stats = [
  { number: "10k+", label: "Turniere" },
  { number: "50k+", label: "Spieler" },
  { number: "100%", label: "Open Source" },
  { number: "24/7", label: "Live Updates" },
];

export const features = [
  {
    title: "Blitzschnell",
    description: "Optimierte React 19 Server Components für maximale Performance."
  },
  {
    title: "Sicher & Robust",
    description: "Typsichere API-Anbindung und validierte Datenverarbeitung."
  },
  {
    title: "Modular",
    description: "Komponenten basierend auf dem Atomic Design Prinzip."
  }
];

// --- Application / Dashboard Data ---

export const quickActions: QuickActionItem[] = [
  { title: 'Neues Turnier', href: '#', iconName: 'plus', color: 'success' },
  { title: 'Alle Turniere', href: '#', iconName: 'trophy', color: 'info' },
  { title: 'Neuer Spieler', href: '#', iconName: 'user-plus', color: 'secondary' },
  { title: 'Alle Spieler', href: '#', iconName: 'users', color: 'primary' },
  { title: 'Einstellungen', href: '#', iconName: 'settings', color: 'muted' },
];

export const mockTournaments: TournamentSummary[] = [
  {
    id: "t1",
    name: "Summer Cup 2026",
    state: "running",
    stateLabel: "Läuft",
    location: "Berlin, DE",
    dateLabel: "15.06.2026",
    currentPlayers: 32,
    maxPlayers: 64,
    gameName: "Magic: The Gathering",
  },
  {
    id: "t2",
    name: "Regional Championship",
    state: "registration",
    stateLabel: "Anmeldung",
    location: "Munich, DE",
    dateLabel: "20.07.2026",
    currentPlayers: 12,
    maxPlayers: 128,
    gameName: "Yu-Gi-Oh!",
  },
  {
    id: "t3",
    name: "Casual Friday",
    state: "planned",
    stateLabel: "Geplant",
    location: "Online",
    dateLabel: "22.03.2026",
    currentPlayers: 0,
    maxPlayers: 16,
    gameName: "Pokémon TCG",
  }
];

// --- Playground Specific Data ---

export const sidebarLinks: SidebarLinkItem[] = [
  { label: "Dashboard", href: "/dashboard", iconName: "home" },
  { label: "Playground", href: "/playground", iconName: "gamepad" },
  { label: "Turniere", href: "#", iconName: "trophy" },
  { label: "Spieler", href: "#", iconName: "users" },
  { label: "Einstellungen", href: "#", iconName: "settings" },
];

export const scoreboardItems: ScoreboardItem[] = [
  { id: "1", rank: 1, name: "Maximilian Mustermann", username: "max_power", points: 15 },
  { id: "2", rank: 2, name: "Sarah Schmidt", username: "lucky_sarah", points: 12 },
  { id: "3", rank: 3, name: "Tim Test", points: 10 },
  { id: "4", rank: 4, name: "Julia Jung", username: "jj_cards", points: 8 },
];

export const matchItems: MatchItem[] = [
  {
    id: "m1",
    tableNumber: 1,
    status: "completed",
    statusLabel: "Abgeschlossen",
    player1: { name: "Max Power", isWinner: true },
    player2: { name: "Sarah Schmidt", isLoser: true },
  },
  {
    id: "m2",
    tableNumber: 2,
    status: "pending",
    statusLabel: "Laufend",
    player1: { name: "Tim Test" },
    player2: { name: "Julia Jung" },
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Ursula",
    role: "important",
    content:"I am suprised",
    rating: 2
  }
]

export const pricingPlans: PricingPlan[] = [
  {
    name: "Premium Plus",
    price: "2000CHF",
    features:["Scam","Scummy"],
    buttonText: "Scam now",
    isPopular: false,
    isContact: true
  }
]
