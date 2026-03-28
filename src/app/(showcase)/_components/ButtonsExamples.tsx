import { ArrowRight, CheckCircle2, Rocket, ShieldAlert, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ButtonVariantsExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}

export function ButtonSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" icon={Sparkles}>
        Small
      </Button>
      <Button size="md" icon={Rocket}>
        Medium
      </Button>
      <Button size="lg" icon={Zap}>
        Large
      </Button>
    </div>
  );
}

export function ButtonWithIconsExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button icon={Rocket}>Launch Bracket</Button>
      <Button variant="secondary" icon={ArrowRight} iconPosition="right">
        Continue Setup
      </Button>
      <Button variant="outline" icon={CheckCircle2}>
        Confirm Result
      </Button>
    </div>
  );
}

export function ButtonStatesExample() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button fullWidth>Full Width Action</Button>
      <Button fullWidth variant="secondary" disabled>
        Disabled Action
      </Button>
    </div>
  );
}

export function BadgeVariantsExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success" icon={CheckCircle2}>
        Success
      </Badge>
      <Badge variant="warning" icon={Sparkles}>
        Warning
      </Badge>
      <Badge variant="destructive" icon={ShieldAlert}>
        Destructive
      </Badge>
      <Badge variant="info" icon={Zap}>
        Info
      </Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

export function BadgeSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm" variant="info">
        Small
      </Badge>
      <Badge size="md" variant="success">
        Medium
      </Badge>
      <Badge size="lg" variant="warning">
        Large
      </Badge>
    </div>
  );
}
