import * as React from "react";
import { cn } from "@/lib/utils";

export interface AlertRootProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "destructive" | "warning" | "info";
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export type AlertDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

export type AlertActionProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles = {
  destructive: {
    container: "bg-destructive/10 border-destructive/20 text-destructive",
    title: "text-destructive",
    description: "text-destructive/90",
  },
  warning: {
    container: "bg-warning/10 border-warning/20 text-warning-foreground",
    title: "text-warning",
    description: "text-warning/90",
  },
  info: {
    container: "bg-info/10 border-info/20 text-info-foreground",
    title: "text-info",
    description: "text-info/90",
  },
} as const;

const AlertRoot = React.forwardRef<HTMLDivElement, AlertRootProps>(
  ({ variant = "destructive", className, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      aria-live="assertive"
      className={cn(
        "relative rounded-lg border px-4 py-3",
        variantStyles[variant].container,
        className
      )}
      {...props}
    />
  )
);
AlertRoot.displayName = "Alert.Root";

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ as: Comp = "h5", className, ...props }, ref) =>
    React.createElement(Comp, {
      ref,
      className: cn("font-semibold mb-1", className),
      ...props,
    })
);
AlertTitle.displayName = "Alert.Title";

const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm", className)} {...props} />
  )
);
AlertDescription.displayName = "Alert.Description";

const AlertAction = React.forwardRef<HTMLButtonElement, AlertActionProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "mt-2 inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium",
        "transition-colors hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
AlertAction.displayName = "Alert.Action";

export const Alert = {
  Root: AlertRoot,
  Title: AlertTitle,
  Description: AlertDescription,
  Action: AlertAction,
};