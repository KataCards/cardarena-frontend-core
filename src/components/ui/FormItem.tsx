import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldError } from "@/components/ui/FieldError";
import { Label } from "@/components/ui/Label";

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  (
    { label, description, error, required = false, htmlFor, className, children, ...props },
    ref
  ) => {
    const descriptionId = React.useId();
    const errorId = React.useId();

    type DescribedByProps = { "aria-describedby"?: string };

    const control = React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<DescribedByProps>, {
          "aria-describedby": [
            (children as React.ReactElement<DescribedByProps>).props["aria-describedby"],
            description ? descriptionId : null,
            error ? errorId : null,
          ]
            .filter(Boolean)
            .join(" "),
        })
      : children;

    return (
      <div ref={ref} className={cn("space-y-1.5", className)} {...props}>
        {label ? (
          <Label htmlFor={htmlFor} required={required}>
            {label}
          </Label>
        ) : null}
        {control}
        {description ? (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
        {error ? <FieldError id={errorId}>{error}</FieldError> : null}
      </div>
    );
  }
);

FormItem.displayName = "FormItem";
