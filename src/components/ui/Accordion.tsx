"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemProps {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
  badge?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
}

export type AccordionHeaderProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
>;

const AccordionRoot = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root ref={ref} className={cn("space-y-2", className)} {...props} />
));
AccordionRoot.displayName = "Accordion.Root";

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border border-border rounded-lg overflow-hidden transition-all duration-200",
      "hover:border-muted-foreground/30 data-disabled:opacity-60",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "Accordion.Item";

const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionHeaderProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group w-full flex items-center justify-between px-4 py-3 text-left",
        "bg-muted hover:bg-muted/80 active:bg-muted/60",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
        "disabled:hover:bg-muted disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">{children}</div>
      <ChevronDown
        size={20}
        className="shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionHeader.displayName = "Accordion.Header";

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  >
    <div className="px-4 py-3 border-t border-border bg-background">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "Accordion.Content";

const AccordionBase: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className
}) => {
  const rootClassName = cn("space-y-2", className);

  if (allowMultiple) {
    return (
      <AccordionPrimitive.Root
        type="multiple"
        defaultValue={defaultExpanded}
        className={rootClassName}
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <AccordionItem key={item.id} value={item.id} disabled={item.disabled}>
              <AccordionHeader>
                {Icon ? (
                  <Icon className="shrink-0 text-muted-foreground" size={20} aria-hidden="true" />
                ) : null}
                <span className="text-base font-semibold text-foreground truncate">{item.title}</span>
                {item.badge ? <div className="shrink-0 ml-auto">{item.badge}</div> : null}
              </AccordionHeader>
              <AccordionContent>{item.children}</AccordionContent>
            </AccordionItem>
          );
        })}
      </AccordionPrimitive.Root>
    );
  }

  return (
    <AccordionPrimitive.Root
      type="single"
      defaultValue={defaultExpanded[0]}
      collapsible
      className={rootClassName}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <AccordionItem key={item.id} value={item.id} disabled={item.disabled}>
            <AccordionHeader>
              {Icon ? (
                <Icon className="shrink-0 text-muted-foreground" size={20} aria-hidden="true" />
              ) : null}
              <span className="text-base font-semibold text-foreground truncate">{item.title}</span>
              {item.badge ? <div className="shrink-0 ml-auto">{item.badge}</div> : null}
            </AccordionHeader>
            <AccordionContent>{item.children}</AccordionContent>
          </AccordionItem>
        );
      })}
    </AccordionPrimitive.Root>
  );
};

export const Accordion = Object.assign(AccordionBase, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Header: AccordionHeader,
  Content: AccordionContent,
});
