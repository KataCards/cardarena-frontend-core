import * as React from "react";
import { CheckCircle, LucideIcon } from "lucide-react";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { cn } from "@/lib/utils";

type TabSectionHeading = "h1" | "h2" | "h3" | "h4";
type TabSectionMaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

interface TabSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** The main heading for the section */
  title: React.ReactNode;
  /** Optional descriptive text below the title */
  description?: React.ReactNode;
  /** Optional Lucide icon to display next to the title */
  icon?: LucideIcon;
  /** Error message to display in an alert banner */
  error?: React.ReactNode;
  /** Success message to display in a status banner */
  success?: React.ReactNode;
  /** The content of the section (typically form fields or info lists) */
  children: React.ReactNode;
  /** Semantic heading level. @default "h2" */
  as?: TabSectionHeading;
  /** Semantic width constraint. @default "lg" */
  maxWidth?: TabSectionMaxWidth;
}

const maxWidthStyles: Record<TabSectionMaxWidth, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  "2xl": "max-w-6xl",
  full: "max-w-full",
};

/**
 * TabSection
 *
 * A structural container used within tab-based views to group related content.
 * Provides consistent layout for titles, icons, descriptions, and status banners.
 */
export function TabSection({
  title,
  description,
  icon: Icon,
  error,
  success,
  children,
  as = "h2",
  maxWidth = "lg",
  className,
  ...props
}: TabSectionProps) {
  const Heading = as;
  const isPlainDescription =
    typeof description === "string" || typeof description === "number";

  return (
    <section className={cn(maxWidthStyles[maxWidth], className)} {...props}>
      <div className="mb-6">
        <div className="mb-2 flex items-center">
          {Icon ? <Icon className="mr-3 h-6 w-6 text-primary" aria-hidden="true" /> : null}
          <Heading className="text-2xl font-bold text-foreground">{title}</Heading>
        </div>
        {description ? (
          isPlainDescription ? (
            <p className="text-muted-foreground">{description}</p>
          ) : (
            <div className="text-muted-foreground">{description}</div>
          )
        ) : null}
      </div>

      {error ? (
        <ErrorAlert.Root className="mb-6">
          <ErrorAlert.Description>{error}</ErrorAlert.Description>
        </ErrorAlert.Root>
      ) : null}

      {success ? (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 flex items-center rounded-lg border border-success/20 bg-success/10 p-4 text-success"
        >
          <CheckCircle className="mr-3 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{success}</span>
        </div>
      ) : null}

      {children}
    </section>
  );
}
