"use client";

import { Mail, Phone, MapPin, User, Trophy, Target } from "lucide-react";
import { FlipCard, FlipCardFront, FlipCardBack, FlipCardInteractive } from "@/components/composed/FlipCard";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export function BasicFlipCardExample() {
  return (
    <FlipCard
      minHeight="300px"
      front={
        <FlipCardFront>
          <CardHeader>
            <CardTitle>Hover to Flip</CardTitle>
            <CardDescription>SSR-friendly with pure CSS</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This card uses CSS-only animations and works without JavaScript.
            </p>
          </CardContent>
        </FlipCardFront>
      }
      back={
        <FlipCardBack>
          <CardHeader>
            <CardTitle>Back Side</CardTitle>
            <CardDescription>Zero client-side JS needed</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Perfect for server-side rendering and optimal performance.
            </p>
          </CardContent>
        </FlipCardBack>
      }
    />
  );
}

export function PlayerCardFlipExample() {
  return (
    <FlipCard
      minHeight="320px"
      front={
        <FlipCardFront className="bg-linear-to-br from-primary/10 to-info/10">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
              <User className="h-10 w-10 text-primary" />
            </div>
            <CardTitle>Mira Vale</CardTitle>
            <CardDescription>Professional Player</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Badge variant="success" className="mb-2">
              Champion
            </Badge>
            <p className="text-sm text-muted-foreground">Hover for contact info</p>
          </CardContent>
        </FlipCardFront>
      }
      back={
        <FlipCardBack>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>mira.vale@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>San Francisco, CA</span>
            </div>
          </CardContent>
        </FlipCardBack>
      }
    />
  );
}

export function StatsCardFlipExample() {
  return (
    <FlipCard
      minHeight="280px"
      front={
        <FlipCardFront className="bg-linear-to-br from-success/10 to-primary/10">
          <CardHeader className="text-center">
            <Trophy className="mx-auto mb-2 h-12 w-12 text-success" />
            <CardTitle>Tournament Stats</CardTitle>
            <CardDescription>Season 2024</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-foreground">24</div>
            <p className="text-sm text-muted-foreground">Total Wins</p>
          </CardContent>
        </FlipCardFront>
      }
      back={
        <FlipCardBack>
          <CardHeader>
            <CardTitle className="text-lg">Detailed Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Win Rate:</span>
              <span className="font-semibold">78%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tournaments:</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Top 8 Finishes:</span>
              <span className="font-semibold">9</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Championships:</span>
              <span className="font-semibold">3</span>
            </div>
          </CardContent>
        </FlipCardBack>
      }
    />
  );
}

export function ClickToFlipExample() {
  return (
    <FlipCardInteractive
      trigger="click"
      minHeight="280px"
      front={
        <FlipCardFront className="cursor-pointer">
          <CardHeader className="text-center">
            <Target className="mx-auto mb-2 h-12 w-12 text-info" />
            <CardTitle>Click to Flip</CardTitle>
            <CardDescription>Interactive with JavaScript</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Click anywhere on this card to flip it over.
            </p>
          </CardContent>
        </FlipCardFront>
      }
      back={
        <FlipCardBack className="cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">You Flipped It!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This variant uses client-side JavaScript for click interactions.
            </p>
            <p className="text-xs text-muted-foreground">
              Click again to flip back.
            </p>
          </CardContent>
        </FlipCardBack>
      }
    />
  );
}

export function ControlledFlipExample() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={isFlipped ? "outline" : "default"}
          onClick={() => setIsFlipped(false)}
        >
          Show Front
        </Button>
        <Button
          size="sm"
          variant={isFlipped ? "default" : "outline"}
          onClick={() => setIsFlipped(true)}
        >
          Show Back
        </Button>
      </div>
      <FlipCardInteractive
        trigger="manual"
        isFlipped={isFlipped}
        minHeight="240px"
        front={
          <FlipCardFront>
            <CardHeader>
              <CardTitle>Controlled State</CardTitle>
              <CardDescription>Programmatic control</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Use the buttons above to control which side is visible.
              </p>
            </CardContent>
          </FlipCardFront>
        }
        back={
          <FlipCardBack>
            <CardHeader>
              <CardTitle>Back Side</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Perfect for wizards, tutorials, or multi-step flows.
              </p>
            </CardContent>
          </FlipCardBack>
        }
      />
    </div>
  );
}

export function VerticalFlipExample() {
  return (
    <FlipCard
      axis="x"
      minHeight="280px"
      front={
        <FlipCardFront className="bg-linear-to-br from-secondary/10 to-muted/10">
          <CardHeader className="text-center">
            <CardTitle>Vertical Flip</CardTitle>
            <CardDescription>X-axis rotation</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              This card flips vertically instead of horizontally.
            </p>
          </CardContent>
        </FlipCardFront>
      }
      back={
        <FlipCardBack>
          <CardHeader>
            <CardTitle className="text-lg">Flipped!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use <code className="text-xs bg-muted px-1 py-0.5 rounded">axis="x"</code> for vertical flips.
            </p>
          </CardContent>
        </FlipCardBack>
      }
    />
  );
}

export function CustomDurationExample() {
  return (
    <FlipCard
      duration={1200}
      minHeight="280px"
      front={
        <FlipCardFront className="bg-linear-to-br from-warning/10 to-danger/10">
          <CardHeader className="text-center">
            <CardTitle>Slow Motion</CardTitle>
            <CardDescription>1.2 second animation</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              This card has a slower, more dramatic flip animation.
            </p>
          </CardContent>
        </FlipCardFront>
      }
      back={
        <FlipCardBack>
          <CardHeader>
            <CardTitle className="text-lg">Smooth!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Customize duration with the <code className="text-xs bg-muted px-1 py-0.5 rounded">duration</code> prop.
            </p>
          </CardContent>
        </FlipCardBack>
      }
    />
  );
}