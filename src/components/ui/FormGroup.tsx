import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormGroupProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: React.ReactNode;
  description?: React.ReactNode;
}

export const FormGroup = React.forwardRef<HTMLFieldSetElement, FormGroupProps>(
  ({ legend, description, className, children, ...props }, ref) => (
    <fieldset ref={ref} className={cn("space-y-2", className)} {...props}>
      {legend ? <legend className="text-sm font-medium text-foreground">{legend}</legend> : null}
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      {children}
    </fieldset>
  )
);

FormGroup.displayName = "FormGroup";
