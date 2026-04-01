import * as React from "react";
import * as ButtonExamples from "../_components/ButtonsExamples";
import * as CountdownExamples from "../_components/CountdownExamples";
import * as ComposedExamples from "../_components/ComposedExamples";
import * as FlipCardExamples from "../_components/FlipCardExamples";
import * as InputExamples from "../_components/InputExamples";
import * as PageHeaderExamples from "../_components/PageHeaderExamples";
import * as SpinnerExamples from "../_components/SpinnerExamples";
import * as TableExamples from "../_components/TableExamples";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { InPageNavbar } from "@/components/composed/InPageNavbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { PageHeader, PageHeaderContent, PageHeaderDescription, PageHeaderHeading } from "@/components/ui/PageHeader";
import { cn } from "@/lib/utils";

type ShowcaseItem = {
  title: string;
  component: () => React.ReactElement | Promise<React.ReactElement>;
  fullWidth?: boolean;
};

type ShowcaseSection = {
  title: string;
  description: string;
  items: ShowcaseItem[];
};

function toSectionId(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and");
}

const sections: ShowcaseSection[] = [
  {
    title: "Buttons & Badges",
    description: "Action variants, sizes, and status treatments from the primitive layer.",
    items: [
      { title: "Button Variants", component: ButtonExamples.ButtonVariantsExample },
      { title: "Button Sizes", component: ButtonExamples.ButtonSizesExample },
      { title: "Buttons with Icons", component: ButtonExamples.ButtonWithIconsExample },
      { title: "Button States", component: ButtonExamples.ButtonStatesExample },
      { title: "Badge Variants", component: ButtonExamples.BadgeVariantsExample },
      { title: "Badge Sizes", component: ButtonExamples.BadgeSizesExample },
    ],
  },
  {
    title: "Countdown",
    description: "Time-based UI for rounds, warnings, and paused states.",
    items: [
      { title: "Basic Countdown", component: CountdownExamples.BasicCountdownExample },
      { title: "Warning State", component: CountdownExamples.WarningCountdownExample },
      { title: "Paused Countdown", component: CountdownExamples.PausedCountdownExample },
    ],
  },
  {
    title: "Composed Patterns",
    description: "Higher-level UI pieces built from the primitive layer.",
    items: [
      { title: "Match Card", component: ComposedExamples.MatchCardExample },
      { title: "Match Grid", component: ComposedExamples.MatchGridExample, fullWidth: true },
      { title: "Bracket List", component: ComposedExamples.BracketListExample, fullWidth: true },
      { title: "Battle Card", component: ComposedExamples.BattleCardExample },
      { title: "Battle Card Compact", component: ComposedExamples.CompactBattleCardExample },
      { title: "Quick Actions Grid", component: ComposedExamples.QuickActionsGridExample },
      { title: "Ranked List", component: ComposedExamples.RankedListExample },
      { title: "Pricing Section", component: ComposedExamples.PricingExample, fullWidth: true },
      {
        title: "Testimonials Section",
        component: ComposedExamples.TestimonialsExample,
        fullWidth: true,
      },
    ],
  },
  {
    title: "Flip Cards",
    description: "3D flip card animations with SSR-friendly CSS and interactive variants.",
    items: [
      { title: "Basic Hover Flip", component: FlipCardExamples.BasicFlipCardExample },
      { title: "Player Card", component: FlipCardExamples.PlayerCardFlipExample },
      { title: "Stats Card", component: FlipCardExamples.StatsCardFlipExample },
      { title: "Click to Flip", component: FlipCardExamples.ClickToFlipExample },
      { title: "Controlled State", component: FlipCardExamples.ControlledFlipExample },
      { title: "Vertical Flip", component: FlipCardExamples.VerticalFlipExample },
      { title: "Custom Duration", component: FlipCardExamples.CustomDurationExample },
    ],
  },
  {
    title: "Inputs",
    description: "Field primitives and composed input patterns.",
    items: [
      { title: "Basic Input", component: InputExamples.BasicInputExample },
      { title: "With Label", component: InputExamples.InputWithLabelExample },
      { title: "Required Label", component: InputExamples.InputWithRequiredLabelExample },
      { title: "Error State", component: InputExamples.InputWithErrorExample },
      { title: "Left Icon", component: InputExamples.InputWithLeftIconExample },
      { title: "Right Icon", component: InputExamples.InputWithRightIconExample },
      { title: "Both Slots", component: InputExamples.InputWithBothSlotsExample },
      { title: "Password Input", component: InputExamples.PasswordInputBasicExample },
      { title: "Localized Password", component: InputExamples.PasswordInputLocalizedExample },
      { title: "Password Error", component: InputExamples.PasswordInputWithErrorExample },
      { title: "Basic Search", component: InputExamples.SearchInputBasicExample },
      { title: "Search with Label", component: InputExamples.SearchInputWithLabelExample },
      { title: "Large Search", component: InputExamples.SearchInputCustomSizeExample },
      { title: "QR Code", component: InputExamples.QrCodeExample, fullWidth: true },
      { title: "Complete Login Form", component: InputExamples.CompleteLoginFormExample },
      { title: "Disabled States", component: InputExamples.DisabledInputsExample },
    ],
  },
  {
    title: "Tables",
    description: "Data display patterns built on the table primitive.",
    items: [
      { title: "Simple Table", component: TableExamples.SimpleTableExample },
      { title: "Interactive Rows", component: TableExamples.InteractiveTableExample },
      { title: "Actions", component: TableExamples.TableWithActionsExample },
      { title: "Striped", component: TableExamples.StripedTableExample },
      { title: "Empty State", component: TableExamples.EmptyTableExample },
      { title: "Responsive Scroll", component: TableExamples.ResponsiveTableExample },
    ],
  },
  {
    title: "Loading",
    description: "Spinner and loading-state usage across common surfaces.",
    items: [
      { title: "Spinner in Buttons", component: SpinnerExamples.SpinnerInButtonExample },
      { title: "Spinner Sizes", component: SpinnerExamples.SpinnerSizesExample },
      { title: "Spinner Variants", component: SpinnerExamples.SpinnerVariantsExample },
      { title: "Spinner in Table", component: SpinnerExamples.SpinnerInTableExample },
      { title: "Simple Loading State", component: SpinnerExamples.LoadingStateSimpleExample },
      { title: "Loading with Message", component: SpinnerExamples.LoadingStateWithMessageExample },
      { title: "Custom Height", component: SpinnerExamples.LoadingStateCustomExample },
      { title: "Spinner in Card", component: SpinnerExamples.SpinnerInCardExample },
      { title: "Conditional Loading", component: SpinnerExamples.ConditionalLoadingExample },
      { title: "Full Page Loading", component: SpinnerExamples.FullPageLoadingExample },
    ],
  },
  {
    title: "Page Headers",
    description: "Heading and action compositions for app screens.",
    items: [
      { title: "Simple", component: PageHeaderExamples.SimplePageHeaderExample },
      { title: "With Description", component: PageHeaderExamples.PageHeaderWithDescriptionExample },
      { title: "Single Action", component: PageHeaderExamples.PageHeaderWithActionExample },
      { title: "Multiple Actions", component: PageHeaderExamples.PageHeaderWithMultipleActionsExample },
      { title: "Heading Icon", component: PageHeaderExamples.PageHeaderWithIconExample },
      { title: "Back Button", component: PageHeaderExamples.PageHeaderWithBackButtonExample },
      { title: "With Search", component: PageHeaderExamples.PageHeaderWithSearchExample },
      { title: "Section Header", component: PageHeaderExamples.SectionHeaderExample },
      { title: "Custom Spacing", component: PageHeaderExamples.PageHeaderWithCustomSpacingExample },
      { title: "Minimal", component: PageHeaderExamples.MinimalHeaderExample },
    ],
  },
];

export default function ShowcaseUiPage() {
  const navItems = sections.map((section) => ({
    label: section.title,
    href: `#${toSectionId(section.title)}`,
  }));

  return (
    <AmbientBackground
      variant="spotlight"
      pattern="dots"
      intensity="subtle"
      className="min-h-screen"
      contentClassName="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <PageHeader className="mt-10 mb-10">
        <PageHeaderContent>
          <PageHeaderHeading>UI Showcase</PageHeaderHeading>
          <PageHeaderDescription>
            Living documentation for the primitive layer and common composition patterns.
          </PageHeaderDescription>
        </PageHeaderContent>
      </PageHeader>

      <InPageNavbar items={navItems} className="mb-10" />

      <div className="space-y-12">
        {sections.map((section) => (
          <section
            key={section.title}
            aria-labelledby={toSectionId(section.title)}
          >
            <div className="mb-5">
              <h2
                id={toSectionId(section.title)}
                className="before:pointer-events-none before:invisible before:block before:h-56 before:-mt-56 sm:before:h-48 sm:before:-mt-48 lg:before:h-40 lg:before:-mt-40 text-2xl font-bold tracking-tight text-foreground"
              >
                {section.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {section.items.map((item) => {
                const Example = item.component;

                return (
                  <Card
                    key={item.title}
                    className={cn(
                      "border-border/80 bg-card/95 backdrop-blur-sm",
                      item.fullWidth && "lg:col-span-2"
                    )}
                  >
                    <CardHeader className="pb-4">
                      <CardTitle as="h3" className="text-lg">
                        {item.title}
                      </CardTitle>
                      <CardDescription>{section.title} example</CardDescription>
                    </CardHeader>
                    <CardContent>{Example ? <Example /> : null}</CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </AmbientBackground>
  );
}