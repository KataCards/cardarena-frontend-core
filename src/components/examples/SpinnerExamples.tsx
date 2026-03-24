import { Spinner, LoadingState } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

/**
 * Example 1: Spinner Primitive - Inside Button
 * 
 * Demonstrates the minimal Spinner component inside a button.
 */
export function SpinnerInButtonExample() {
  return (
    <div className="flex gap-4">
      <Button disabled>
        <Spinner size="sm" variant="inherit" className="mr-2" />
        Loading...
      </Button>
      
      <Button variant="outline" disabled>
        <Spinner size="sm" variant="inherit" className="mr-2" />
        Processing
      </Button>
      
      <Button variant="ghost" disabled>
        <Spinner size="sm" variant="inherit" className="mr-2" />
        Saving
      </Button>
    </div>
  );
}

/**
 * Example 2: Spinner Sizes
 * 
 * Shows all available spinner sizes.
 */
export function SpinnerSizesExample() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-xs text-muted-foreground">Small</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-xs text-muted-foreground">Medium</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs text-muted-foreground">Large</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <span className="text-xs text-muted-foreground">Extra Large</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner size={64} />
        <span className="text-xs text-muted-foreground">Custom (64px)</span>
      </div>
    </div>
  );
}

/**
 * Example 3: Spinner Variants
 * 
 * Shows all available color variants.
 */
export function SpinnerVariantsExample() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="default" />
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="muted" />
        <span className="text-xs text-muted-foreground">Muted</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="primary" />
        <span className="text-xs text-muted-foreground">Primary</span>
      </div>
      
      <div className="flex flex-col items-center gap-2 text-blue-600">
        <Spinner variant="inherit" />
        <span className="text-xs text-muted-foreground">Inherit (blue)</span>
      </div>
    </div>
  );
}

/**
 * Example 4: Spinner in Table Cell
 * 
 * Demonstrates inline spinner usage in tight spaces.
 */
export function SpinnerInTableExample() {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted border-b border-border">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold">User</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          <tr>
            <td className="px-4 py-3">Alice Johnson</td>
            <td className="px-4 py-3">Active</td>
            <td className="px-4 py-3">
              <Button size="sm" variant="ghost">Edit</Button>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3">Bob Smith</td>
            <td className="px-4 py-3">
              <span className="inline-flex items-center gap-2">
                <Spinner size="sm" variant="muted" />
                <span className="text-sm text-muted-foreground">Updating...</span>
              </span>
            </td>
            <td className="px-4 py-3">
              <Button size="sm" variant="ghost" disabled>Edit</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/**
 * Example 5: LoadingState - Simple
 * 
 * Basic loading state for sections or pages.
 */
export function LoadingStateSimpleExample() {
  return (
    <Card className="p-0">
      <LoadingState />
    </Card>
  );
}

/**
 * Example 6: LoadingState with Message
 * 
 * Loading state with descriptive message.
 */
export function LoadingStateWithMessageExample() {
  return (
    <Card className="p-0">
      <LoadingState 
        message="Loading user data..." 
        size="lg"
        variant="primary"
      />
    </Card>
  );
}

/**
 * Example 7: LoadingState - Custom Height
 * 
 * Loading state with custom container height.
 */
export function LoadingStateCustomExample() {
  return (
    <Card className="p-0">
      <LoadingState 
        message="Fetching results..."
        className="min-h-96"
        size="xl"
      />
    </Card>
  );
}

/**
 * Example 8: Spinner in Card Header
 * 
 * Inline spinner next to text in a card header.
 */
export function SpinnerInCardExample() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Recent Activity
          <Spinner size="sm" variant="muted" />
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Loading recent activity data...
      </p>
    </Card>
  );
}

/**
 * Example 9: Conditional Loading States
 * 
 * Shows how to conditionally render loading states.
 */
export function ConditionalLoadingExample() {
  const isLoading = true;
  const data = [];

  return (
    <Card className="p-0">
      {isLoading ? (
        <LoadingState message="Loading items..." />
      ) : data.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No items found
        </div>
      ) : (
        <div className="p-6">
          {/* Data content would go here */}
        </div>
      )}
    </Card>
  );
}

/**
 * Example 10: Full Page Loading
 * 
 * Loading state for full page scenarios.
 */
export function FullPageLoadingExample() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingState 
        size="xl"
        variant="primary"
        message="Initializing application..."
        className="py-0"
      />
    </div>
  );
}