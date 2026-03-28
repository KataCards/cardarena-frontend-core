"use client";

import * as React from "react";
import { Bell, CreditCard, Info, Lock, Mail, User } from "lucide-react";
import { AmbientBackground } from "@/components/effects/AmbientBackground";
import { TabSection } from "@/components/composed/TabSection";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PageHeader, PageHeaderContent, PageHeaderDescription, PageHeaderHeading } from "@/components/ui/PageHeader";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Switch } from "@/components/ui/Switch";
import { cn } from "@/lib/utils";

type SettingsTabId = "account" | "security" | "notifications" | "billing";

interface SettingsTab {
  id: SettingsTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SettingsMessage {
  type: "success" | "error";
  text: string;
}

export interface SettingsShowcaseProps {
  initialData?: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

const tabs: readonly SettingsTab[] = [
  { id: "account", label: "Account", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export function SettingsShowcase({
  initialData = {
    username: "demo_user",
    email: "demo@example.com",
    firstName: "Demo",
    lastName: "User",
  },
}: SettingsShowcaseProps) {
  const [activeTab, setActiveTab] = React.useState<SettingsTabId>("account");
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState<SettingsMessage | null>(null);
  const [marketingEnabled, setMarketingEnabled] = React.useState(false);
  const [weeklyDigestEnabled, setWeeklyDigestEnabled] = React.useState(true);
  const [pushEnabled, setPushEnabled] = React.useState(true);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsLoading(false);
    setMessage({ type: "success", text: "Settings saved successfully." });
  }

  return (
    <AmbientBackground
      variant="mesh"
      pattern="grid"
      intensity="subtle"
      className="min-h-screen"
      contentClassName="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <PageHeader className="mb-8">
        <PageHeaderContent>
          <PageHeaderHeading>Settings Showcase</PageHeaderHeading>
          <PageHeaderDescription>
            Route-level example using the actual form, tab, switch, checkbox, and button primitives.
          </PageHeaderDescription>
        </PageHeaderContent>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Settings sections" className="rounded-2xl border border-border bg-card p-2 shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div>
          {activeTab === "account" ? (
            <TabSection
              title="Account Information"
              description="Update your profile and login identity."
              error={message?.type === "error" ? message.text : null}
              success={message?.type === "success" ? message.text : null}
              maxWidth="full"
            >
              <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="settings-username" required>
                    Username
                  </Label>
                  <Input
                    id="settings-username"
                    defaultValue={initialData.username}
                    disabled={isLoading}
                    required
                    leftSlot={<User className="h-4 w-4 text-muted-foreground" />}
                  />
                </div>
                <div>
                  <Label htmlFor="settings-email" required>
                    Email Address
                  </Label>
                  <Input
                    id="settings-email"
                    type="email"
                    defaultValue={initialData.email}
                    disabled={isLoading}
                    required
                    leftSlot={<Mail className="h-4 w-4 text-muted-foreground" />}
                  />
                </div>
                <div>
                  <Label htmlFor="settings-first-name">First Name</Label>
                  <Input
                    id="settings-first-name"
                    defaultValue={initialData.firstName}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="settings-last-name">Last Name</Label>
                  <Input
                    id="settings-last-name"
                    defaultValue={initialData.lastName}
                    disabled={isLoading}
                  />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </TabSection>
          ) : null}

          {activeTab === "security" ? (
            <TabSection
              title="Security"
              description="Manage passwords and session protections."
              error={message?.type === "error" ? message.text : null}
              success={message?.type === "success" ? message.text : null}
              maxWidth="full"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="settings-current-password" required>
                    Current Password
                  </Label>
                  <PasswordInput
                    id="settings-current-password"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="settings-new-password" required>
                    New Password
                  </Label>
                  <PasswordInput
                    id="settings-new-password"
                    disabled={isLoading}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="settings-confirm-password" required>
                    Confirm New Password
                  </Label>
                  <PasswordInput
                    id="settings-confirm-password"
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </TabSection>
          ) : null}

          {activeTab === "notifications" ? (
            <TabSection
              title="Notifications"
              description="Choose which updates should reach the user."
              error={message?.type === "error" ? message.text : null}
              success={message?.type === "success" ? message.text : null}
              maxWidth="full"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <Switch
                  checked={weeklyDigestEnabled}
                  onChange={(event) => setWeeklyDigestEnabled(event.target.checked)}
                  label="Weekly digest"
                  description="Send a weekly summary of platform activity."
                />
                <Switch
                  checked={pushEnabled}
                  onChange={(event) => setPushEnabled(event.target.checked)}
                  label="Browser push notifications"
                  description="Notify the user when match state changes."
                />
                <Checkbox
                  checked={marketingEnabled}
                  onChange={(event) => setMarketingEnabled(event.target.checked)}
                  label="Product announcements"
                  description="Receive updates about launches and product news."
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </form>
            </TabSection>
          ) : null}

          {activeTab === "billing" ? (
            <TabSection
              title="Billing"
              description="Manage plan information and payment details."
              error={message?.type === "error" ? message.text : null}
              success={message?.type === "success" ? message.text : null}
              maxWidth="full"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-3 rounded-xl border border-info/20 bg-info/10 p-4 text-info-foreground">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-info" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Current plan: Free</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Upgrade to a paid tier to unlock advanced tournament tooling.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="settings-card-number">Card Number</Label>
                    <Input
                      id="settings-card-number"
                      placeholder="1234 5678 9012 3456"
                      disabled={isLoading}
                      leftSlot={<CreditCard className="h-4 w-4 text-muted-foreground" />}
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="settings-expiry">Expiry Date</Label>
                      <Input
                        id="settings-expiry"
                        placeholder="MM/YY"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="settings-cvc">CVC</Label>
                      <Input
                        id="settings-cvc"
                        placeholder="123"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Payment Method"}
                  </Button>
                </form>
              </div>
            </TabSection>
          ) : null}
        </div>
      </div>
    </AmbientBackground>
  );
}
