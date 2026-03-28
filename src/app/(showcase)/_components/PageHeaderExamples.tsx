import { 
  PageHeader, 
  PageHeaderHeading, 
  PageHeaderDescription, 
  PageHeaderContent,
  PageHeaderActions 
} from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Trophy, Users, Settings, ArrowLeft, Download, Plus } from "lucide-react";

/**
 * Example 1: Simple Page Header
 * 
 * Basic page header with just a title.
 */
export function SimplePageHeaderExample() {
  return (
    <PageHeader>
      <PageHeaderHeading>Dashboard</PageHeaderHeading>
    </PageHeader>
  );
}

/**
 * Example 2: Page Header with Description (using PageHeaderContent)
 * 
 * Header with title and descriptive subtitle using the Content wrapper.
 */
export function PageHeaderWithDescriptionExample() {
  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderHeading>Account Settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your account settings and preferences.
        </PageHeaderDescription>
      </PageHeaderContent>
    </PageHeader>
  );
}

/**
 * Example 3: Page Header with Single Action
 * 
 * Header with title and a single action button.
 */
export function PageHeaderWithActionExample() {
  return (
    <PageHeader>
      <PageHeaderHeading>Users</PageHeaderHeading>
      <PageHeaderActions>
        <Button>
          <Plus className="mr-2" size={16} />
          Add User
        </Button>
      </PageHeaderActions>
    </PageHeader>
  );
}

/**
 * Example 4: Page Header with Multiple Actions
 * 
 * Complex header with multiple action buttons using PageHeaderContent.
 */
export function PageHeaderWithMultipleActionsExample() {
  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderHeading>Tournament Details</PageHeaderHeading>
        <PageHeaderDescription>
          Manage brackets and participants.
        </PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button variant="outline">
          <Download className="mr-2" size={16} />
          Export
        </Button>
        <Button>
          <Plus className="mr-2" size={16} />
          Add Player
        </Button>
      </PageHeaderActions>
    </PageHeader>
  );
}

/**
 * Example 5: Page Header with Icon in Heading
 * 
 * Shows how to add an icon directly in the heading.
 */
export function PageHeaderWithIconExample() {
  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderHeading className="flex items-center gap-3">
          <Trophy className="text-primary" size={32} />
          Tournaments
        </PageHeaderHeading>
        <PageHeaderDescription>
          View and manage all tournaments.
        </PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button>Create Tournament</Button>
      </PageHeaderActions>
    </PageHeader>
  );
}

/**
 * Example 6: Page Header with Back Button
 * 
 * Header with back navigation and actions.
 */
export function PageHeaderWithBackButtonExample() {
  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderHeading className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft size={20} />
          </Button>
          Player Profile
        </PageHeaderHeading>
        <PageHeaderDescription>
          View and edit player information.
        </PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </PageHeaderActions>
    </PageHeader>
  );
}

/**
 * Example 7: Page Header with Search
 * 
 * Header with integrated search input. Shows mobile-safe button wrapping.
 */
export function PageHeaderWithSearchExample() {
  return (
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderHeading>
          <Users className="inline-block mr-2 text-primary" size={28} />
          Team Members
        </PageHeaderHeading>
        <PageHeaderDescription>
          Manage your team and permissions.
        </PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderActions>
        <Input 
          placeholder="Search members..." 
          className="w-full sm:w-64"
        />
        <Button>
          <Plus className="mr-2" size={16} />
          Invite
        </Button>
      </PageHeaderActions>
    </PageHeader>
  );
}

/**
 * Example 8: Section Header (h2)
 * 
 * Using PageHeader for a sub-section with h2.
 */
export function SectionHeaderExample() {
  return (
    <PageHeader className="border-b border-border pb-4">
      <PageHeaderContent>
        <PageHeaderHeading as="h2" className="text-2xl">
          Recent Activity
        </PageHeaderHeading>
        <PageHeaderDescription>
          Your latest actions and updates.
        </PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button variant="ghost" size="sm">View All</Button>
      </PageHeaderActions>
    </PageHeader>
  );
}

/**
 * Example 9: Page Header with Custom Spacing
 * 
 * Shows how to control outer spacing via parent container.
 */
export function PageHeaderWithCustomSpacingExample() {
  return (
    <div className="mb-8">
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderHeading>
            <Settings className="inline-block mr-2 text-primary" size={28} />
            System Configuration
          </PageHeaderHeading>
          <PageHeaderDescription>
            Configure system-wide settings and preferences.
          </PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderActions>
          <Button variant="outline">Reset</Button>
          <Button>Apply Changes</Button>
        </PageHeaderActions>
      </PageHeader>
    </div>
  );
}

/**
 * Example 10: Minimal Header for Modal
 * 
 * Compact header suitable for modals or cards.
 */
export function MinimalHeaderExample() {
  return (
    <PageHeader className="pb-4 border-b border-border">
      <PageHeaderHeading className="text-xl">
        Edit Profile
      </PageHeaderHeading>
      <PageHeaderActions>
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </PageHeaderActions>
    </PageHeader>
  );
}