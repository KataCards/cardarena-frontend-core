import * as React from "react";
import { FieldError } from "@/components/ui/FieldError";
import { cn } from "@/lib/utils";

type FormSectionHeading = "h2" | "h3" | "h4" | "h5" | "h6";

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title: string;
  /** Optional section description */
  description?: string;
  /** Optional semantic heading level. @default "h2" */
  as?: FormSectionHeading;
  /** Optional status or actions aligned with the heading */
  aside?: React.ReactNode;
  /** Optional error displayed above the section fields */
  error?: React.ReactNode;
  /** Optional helper text below the fields */
  helpText?: React.ReactNode;
  /** Section field content */
  children: React.ReactNode;
  /** Optional explicit id for helper text linkage */
  helpTextId?: string;
  /** Optional class name for the children wrapper. @default "space-y-4" */
  childrenClassName?: string;
}

/**
 * FormSection
 *
 * A reusable form grouping primitive with a heading, optional error, and helper copy.
 */
export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  (
    {
      title,
      description,
      as = "h2",
      aside,
      error,
      helpText,
      helpTextId,
      childrenClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Heading = as;
    const generatedId = React.useId();
    const resolvedHelpTextId = helpText ? (helpTextId ?? `${generatedId}-help`) : undefined;

    return (
      <section
        ref={ref}
        className={cn("space-y-4", className)}
        aria-describedby={resolvedHelpTextId}
        {...props}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <Heading className="text-lg font-semibold text-foreground">{title}</Heading>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>

        {error ? <FieldError className="mt-0">{error}</FieldError> : null}

        <div className={cn("space-y-4", childrenClassName)}>{children}</div>

        {helpText ? (
          <p id={resolvedHelpTextId} className="text-sm text-muted-foreground">
            {helpText}
          </p>
        ) : null}
      </section>
    );
  }
);

FormSection.displayName = "FormSection";
