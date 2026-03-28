import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type SettingsSectionHeading = "h2" | "h3" | "h4" | "h5" | "h6";

export interface SettingsSectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title: string;
  /** Optional section description */
  description?: string;
  /** Optional semantic heading level for the title. @default "h2" */
  as?: SettingsSectionHeading;
  /** Optional leading icon */
  icon?: React.ComponentType<{ className?: string }>;
  /** Optional trailing content in the header */
  headerAction?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Main settings content */
  children: React.ReactNode;
}

/**
 * SettingsSectionCard
 *
 * A high-level settings container built on Card primitives.
 * Useful for account, notification, privacy, and preferences screens.
 */
export const SettingsSectionCard = React.forwardRef<HTMLDivElement, SettingsSectionCardProps>(
  (
    {
      title,
      description,
      as = "h2",
      icon: Icon,
      headerAction,
      footer,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <Card ref={ref} className={cn("overflow-hidden", className)} {...props}>
      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          {Icon ? (
            <div className="rounded-xl bg-primary/10 p-2 text-primary" aria-hidden="true">
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
          <div className="min-w-0">
            <CardTitle as={as} className="text-xl">
              {title}
            </CardTitle>
            {description ? <CardDescription className="mt-1">{description}</CardDescription> : null}
          </div>
        </div>
        {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
      {footer ? <CardFooter className="border-t border-border pt-6">{footer}</CardFooter> : null}
    </Card>
  )
);

SettingsSectionCard.displayName = "SettingsSectionCard";
