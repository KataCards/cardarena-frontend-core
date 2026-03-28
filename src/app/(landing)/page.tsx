import {
  ArrowRight,
  Blocks,
  LayoutTemplate,
  LogIn,
  Settings,
  Sparkles,
  SwatchBook,
  Trophy,
} from "lucide-react";
import packageJson from "../../../package.json";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { CTA } from "@/components/composed/CTA";
import { Features } from "@/components/composed/Features";
import { MarketingSection } from "@/components/composed/MarketingSection";
import { MetricsOverview } from "@/components/composed/MetricsOverview";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

const showcaseRoutes = [
  {
    title: "UI Showcase",
    href: "/ui",
    description:
      "Browse primitives and examples in a dedicated route instead of a monolithic landing-page gallery.",
    icon: SwatchBook,
    eyebrow: "Living docs",
  },
  {
    title: "Login Demo",
    href: "/login",
    description:
      "See a route-level authentication example built from the actual input, alert, and button primitives.",
    icon: LogIn,
    eyebrow: "Auth pattern",
  },
  {
    title: "Settings Demo",
    href: "/settings",
    description:
      "Review a tabbed settings flow composed from real primitives, not internal throwaway demo controls.",
    icon: Settings,
    eyebrow: "App pattern",
  },
] as const;

const featureItems = [
  {
    icon: <Blocks className="h-8 w-8" />,
    title: "Primitives First",
    description:
      "UI components stay generic, typed, accessible, and theme-aware so higher-level patterns do not drift.",
  },
  {
    icon: <LayoutTemplate className="h-8 w-8" />,
    title: "Composed Layer",
    description:
      "Sections, dashboards, and workflow shells are built from primitives instead of reintroducing one-off styling.",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Showcase Routes",
    description:
      "Examples now live under real App Router pages so they behave like living documentation rather than dead snippets.",
  },
] as const;

export default function LandingPage() {
  const version = packageJson.version;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        brand={{
          name: "CardArena Core",
          subtext: `v${version}`,
          href: "/",
        }}
        links={[
          { label: "Overview", href: "#overview" },
          { label: "Routes", href: "#routes" },
          { label: "Components", href: "#components" },
          { label: "Adoption", href: "#adoption" },
        ]}
        action={{ label: "Open UI Showcase", href: "/ui" }}
        variant="white"
        sticky
      />

      <main>
        <AmbientBackground
          variant="aurora"
          pattern="grid"
          intensity="strong"
          className="border-b border-border bg-linear-to-br from-background via-primary/5 to-info/10"
          contentClassName="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
        >
          <section
            id="overview"
            className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]"
          >
            <div>
              <div className="mb-6 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                v{version} • App Router showcase ready
              </div>
              <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-foreground md:text-6xl">
                A frontend core for tournament products, now organized like a real app.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                The library now separates primitives, composed patterns, layout shells, and
                showcase routes cleanly. The landing page introduces the system. The live
                routes prove it.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/ui" size="lg" icon={ArrowRight} iconPosition="right">
                  Explore UI Showcase
                </Button>
                <Button href="/settings" size="lg" variant="outline">
                  Open Settings Demo
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {showcaseRoutes.map((route, index) => {
                const Icon = route.icon;
                const surfaceStyles = [
                  "border-primary/20 bg-gradient-to-br from-background via-primary/5 to-primary/10",
                  "border-info/20 bg-gradient-to-br from-background via-info/5 to-info/10",
                  "border-success/20 bg-gradient-to-br from-background via-success/5 to-success/10",
                ] as const;
                const iconStyles = [
                  "bg-primary/12 text-primary",
                  "bg-info/12 text-info",
                  "bg-success/12 text-success",
                ] as const;

                return (
                  <Card
                    key={route.href}
                    className={`${surfaceStyles[index]} backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl`}
                  >
                    <CardHeader className="pb-3">
                      <div className="mb-3 flex items-center gap-3">
                        <div className={`rounded-xl p-2 ${iconStyles[index]}`} aria-hidden="true">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
                          {route.eyebrow}
                        </span>
                      </div>
                      <CardTitle as="h2" className="text-2xl">
                        {route.title}
                      </CardTitle>
                      <CardDescription className="mt-1">{route.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button href={route.href} variant="ghost" className="px-0 text-primary hover:bg-transparent">
                        Visit route
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </AmbientBackground>

        <MarketingSection
          id="routes"
          badge={{ label: "Navigation", variant: "info" }}
          title="Reach every showcase route directly"
          description="The landing page is no longer the only place where components exist. It now points into live route-level demos that reflect actual App Router usage."
          className="bg-linear-to-b from-background via-muted/10 to-background py-4"
          actions={
            <>
              <Button href="/login" variant="outline">
                Login Route
              </Button>
              <Button href="/settings" variant="outline">
                Settings Route
              </Button>
              <Button href="/ui">UI Route</Button>
            </>
          }
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {showcaseRoutes.map((route, index) => {
              const Icon = route.icon;
              const panelStyles = [
                "border-primary/15 bg-primary/5",
                "border-info/15 bg-info/5",
                "border-success/15 bg-success/5",
              ] as const;
              const chipStyles = [
                "bg-primary/10 text-primary",
                "bg-info/10 text-info",
                "bg-success/10 text-success",
              ] as const;

              return (
                <Card key={route.href} className={`h-full ${panelStyles[index]}`}>
                  <CardHeader>
                    <div className={`mb-2 inline-flex w-fit rounded-lg p-2 ${chipStyles[index]}`} aria-hidden="true">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle as="h3" className="text-xl">
                      {route.title}
                    </CardTitle>
                    <CardDescription>{route.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button href={route.href} fullWidth variant="outline">
                      Open {route.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </MarketingSection>

        <section
          id="components"
          className="border-y border-border bg-linear-to-r from-primary/5 via-background to-info/5 py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MetricsOverview
              badge={{ label: "System snapshot", variant: "secondary" }}
              title="A smaller, clearer component system"
              description="The core is now organized around primitives, composed patterns, effects, and route-level showcases."
              stats={[
                {
                  title: "Showcase routes",
                  value: "3",
                  icon: LayoutTemplate,
                  iconColor: "primary",
                  variant: "surface",
                },
                {
                  title: "Effect primitives",
                  value: "2",
                  icon: Sparkles,
                  iconColor: "info",
                  variant: "surface",
                },
                {
                  title: "Battle-ready cards",
                  value: "1v1 + teams",
                  icon: Trophy,
                  iconColor: "success",
                  variant: "surface",
                },
                {
                  title: "Current release",
                  value: `v${version}`,
                  icon: SwatchBook,
                  iconColor: "muted",
                  variant: "surface",
                },
              ]}
            />
          </div>
        </section>

        <Features
          title="The library is opinionated where it helps, generic where it matters"
          description="The goal is not a pile of demo widgets. It is a coherent system you can actually build from."
          variant="muted"
          maxWidth="7xl"
          className="bg-linear-to-b from-background via-muted/20 to-background"
          features={featureItems}
        />

        <section
          id="adoption"
          className="bg-linear-to-br from-background via-info/5 to-primary/5 py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-primary/20 bg-linear-to-br from-background via-primary/5 to-primary/10">
                <CardHeader>
                  <div className="mb-2 inline-flex w-fit rounded-lg bg-primary/10 p-2 text-primary" aria-hidden="true">
                    <Blocks className="h-5 w-5" />
                  </div>
                  <CardTitle as="h2" className="text-2xl">
                    What changed in v{version}
                  </CardTitle>
                  <CardDescription>
                    The repo now treats examples as real routes, trims example-only clutter from the component tree,
                    and adds a stronger composed layer for application patterns.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <p>Showcase pages live under `app/(showcase)` instead of pretending to be reusable components.</p>
                  <p>Layout and global CSS now come from the real root App Router layout.</p>
                  <p>Display cards and match types were tightened so 1v1 and team battles have clearer ownership.</p>
                </CardContent>
              </Card>

              <Card className="border-info/20 bg-linear-to-br from-background via-info/5 to-info/10">
                <CardHeader>
                  <div className="mb-2 inline-flex w-fit rounded-lg bg-info/10 p-2 text-info" aria-hidden="true">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <CardTitle as="h2" className="text-2xl">
                    Start with the route that matches your goal
                  </CardTitle>
                  <CardDescription>
                    You do not need to inspect a giant demo page to understand the system anymore.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-3">
                  <Button href="/ui" variant="outline">
                    Browse UI
                  </Button>
                  <Button href="/login" variant="outline">
                    Test Auth
                  </Button>
                  <Button href="/settings" variant="outline">
                    Review Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <CTA
          title="Use the landing page as an introduction, not as the whole product"
          description="Jump into the route that matches the part of the system you want to evaluate first."
          buttonText="Open the UI showcase"
          buttonHref="/ui"
          variant="gradient"
        />
      </main>

      <Footer
        brand={{
          name: "CardArena Core",
          description: "A typed, theme-aware frontend core for tournament and competitive gaming products.",
        }}
        columns={[
          {
            title: "Showcase",
            links: [
              { label: "UI", href: "/ui" },
              { label: "Login", href: "/login" },
              { label: "Settings", href: "/settings" },
            ],
          },
          {
            title: "Sections",
            links: [
              { label: "Overview", href: "#overview" },
              { label: "Routes", href: "#routes" },
              { label: "Components", href: "#components" },
            ],
          },
        ]}
        copyright={`CardArena Core v${version}`}
        variant="dark"
      />
    </div>
  );
}
