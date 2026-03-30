import { Bolt, Crown, Shield, Swords, Trophy, Users } from "lucide-react";
import { BracketList } from "@/components/composed/BracketList";
import { MatchGrid } from "@/components/composed/MatchGrid";
import { Pricing } from "@/components/composed/Pricing";
import { BattleCard } from "@/components/composed/display/BattleCard";
import { MatchCard } from "@/components/composed/display/MatchCard";
import { QuickActionsGrid } from "@/components/composed/QuickActionsGrid";
import { RankedList } from "@/components/composed/RankedList";
import { Testimonials } from "@/components/composed/Testimonials";
import type { BattleMatch, BracketMatch } from "@/types/ui/bracket";

const battleExample: BattleMatch = {
  id: "battle-finals",
  tableNumber: 7,
  round: 3,
  status: "completed",
  statusLabel: "Final",
  winnerTeamId: "alpha",
  teams: [
    {
      id: "alpha",
      name: "Alpha Squad",
      score: 2,
      isWinner: true,
      players: [
        { name: "Mira", isWinner: true },
        { name: "Jules", isWinner: true },
        { name: "Rin", isWinner: true },
      ],
    },
    {
      id: "nova",
      name: "Nova Unit",
      score: 1,
      players: [
        { name: "Kai" },
        { name: "Tess" },
        { name: "Noor" },
      ],
    },
  ],
};

const battleCompactExample: BattleMatch = {
  id: "battle-round-two",
  tableNumber: 2,
  round: 2,
  status: "pending",
  statusLabel: "Pairing Ready",
  teams: [
    {
      id: "crimson",
      name: "Crimson",
      players: [{ name: "Ava" }, { name: "Luca" }],
    },
    {
      id: "onyx",
      name: "Onyx",
      players: [{ name: "Zane" }, { name: "Iris" }],
    },
    {
      id: "sol",
      name: "Sol",
      players: [{ name: "Theo" }, { name: "Nia" }],
    },
  ],
};

const standardMatchExample: BracketMatch = {
  id: "match-finals-1",
  tableNumber: 4,
  round: 5,
  status: "completed",
  statusLabel: "Final",
  winner: "Mira Vale",
  players: [
    { name: "Mira Vale", isWinner: true },
    { name: "Theo Park", isLoser: true },
  ],
};

const bracketMatchesExample: readonly BracketMatch[] = [
  {
    id: "bracket-1",
    tableNumber: 1,
    round: 1,
    status: "completed",
    winner: "Ariana Cole",
    players: [
      { name: "Ariana Cole", isWinner: true },
      { name: "Noor Hayes", isLoser: true },
    ],
  },
  {
    id: "bracket-2",
    tableNumber: 2,
    round: 1,
    status: "pending",
    players: [{ name: "Luca Shin" }, { name: "Jae Moreno" }],
  },
  {
    id: "bracket-3",
    tableNumber: 3,
    round: 1,
    status: "completed",
    winner: "CoolUpCards",
    players: [
      { name: "CoolUpCards", isWinner: true },
      { name: "Iris Quinn", isLoser: true },
    ],
  },
  {
    id: "bracket-4",
    tableNumber: 4,
    round: 1,
    status: "pending",
    players: [{ name: "Tess Lane" }, { name: "Kai Mercer" }],
  },
];

export function BattleCardExample() {
  return <BattleCard battle={battleExample} />;
}

export function CompactBattleCardExample() {
  return <BattleCard battle={battleCompactExample} variant="compact" />;
}

export function MatchCardExample() {
  return <MatchCard match={standardMatchExample} />;
}

export function MatchGridExample() {
  return <MatchGrid matches={bracketMatchesExample} />;
}

export function BracketListExample() {
  return <BracketList matches={bracketMatchesExample} />;
}

export function QuickActionsGridExample() {
  return (
    <QuickActionsGrid
      title="Tournament Controls"
      actions={[
        { title: "Create Bracket", href: "/login", icon: Swords, color: "primary" },
        { title: "Review Teams", href: "/login", icon: Users, color: "info" },
        { title: "Award Winner", href: "/login", icon: Trophy, color: "success" },
        { title: "Security Rules", href: "/login", icon: Shield, color: "secondary" },
        { title: "Live Ops", href: "/login", icon: Bolt, color: "muted" },
      ]}
    />
  );
}

export function RankedListExample() {
  return (
    <RankedList
      title="Top Players"
      titleIcon={Crown}
      items={[
        {
          id: "1",
          rank: 1,
          label: "Mira Vale",
          sublabel: "12 straight match wins",
          value: 1240,
          valueLabel: "Points",
          icon: Crown,
          variant: "primary",
        },
        {
          id: "2",
          rank: 2,
          label: "Theo Park",
          sublabel: "Consistent finals presence",
          value: 1180,
          valueLabel: "Points",
          icon: Trophy,
          variant: "success",
        },
        {
          id: "3",
          rank: 3,
          label: "Iris Quinn",
          sublabel: "Strong control archetype results",
          value: 1115,
          valueLabel: "Points",
          icon: Shield,
          variant: "warning",
        },
      ]}
      footer={<p className="text-sm text-muted-foreground">Updated after the latest weekly cup.</p>}
    />
  );
}

export function TestimonialsExample() {
  return (
    <Testimonials
      title="Teams use CardArena Core to ship faster"
      description="A showcase of the testimonial and card layer working as a higher-level section."
      variant="muted"
      testimonials={[
        {
          name: "Ariana Cole",
          role: "Product Designer",
          content:
            "The composed layer gave us real product patterns instead of another pile of disconnected demos.",
          rating: 5,
        },
        {
          name: "John Fortnite",
          role: "Frontend Lead",
          content:
            "The semantic token work made dark mode and future theming changes much less risky than before.",
          rating: 5,
        },
        {
          name: "Jae Moreno",
          role: "Tournament Ops",
          content:
            "The battle card support finally lets us model team formats without forcing everything through 1v1 assumptions.",
          rating: 5,
        },
      ]}
    />
  );
}

export function PricingExample() {
  return (
    <Pricing
      title="Pricing for organizers of every size"
      description="A full section example using the composed pricing layer with different plan emphasis."
      variant="muted"
      plans={[
        {
          name: "Starter",
          price: "€19",
          priceDescription: "per month",
          description: "For local communities and weekly events.",
          features: ["Up to 64 players", "Bracket generation", "Basic analytics"],
          buttonText: "Start small",
          buttonHref: "/login",
        },
        {
          name: "Pro",
          price: "€59",
          priceDescription: "per month",
          description: "For clubs running recurring leagues and cups.",
          features: ["Unlimited players", "Team formats", "Advanced scheduling", "Priority support"],
          buttonText: "Go pro",
          buttonHref: "/settings",
          isPopular: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          priceDescription: "contact us",
          description: "For multi-venue events and partner networks.",
          features: ["Custom workflows", "Dedicated onboarding", "Admin roles", "Integration support"],
          buttonText: "Talk to sales",
          buttonHref: "/login",
        },
      ]}
    />
  );
}
