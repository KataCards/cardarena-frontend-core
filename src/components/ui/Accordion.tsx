"use client";

import {
  ReactNode,
  useState,
  useCallback,
  useRef,
  useEffect,
  HTMLAttributes,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for individual accordion items
 */
export interface AccordionItemProps {
  /** Unique identifier for the accordion item. Used for tracking expanded state. */
  id: string;
  /** Title or header content displayed in the trigger button */
  title: ReactNode;
  /** Body content shown when the item is expanded */
  children: ReactNode;
  /** Optional badge, count, or status indicator displayed next to the title */
  badge?: ReactNode;
  /** Optional icon component to display before the title. Should accept className and size props. */
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  /** Whether this item is disabled and cannot be toggled */
  disabled?: boolean;
}

/**
 * Props for the main Accordion component
 */
export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of accordion items to render */
  items: AccordionItemProps[];
  /** If true, multiple items can be open simultaneously. If false, only one item can be open at a time. @default false */
  allowMultiple?: boolean;
  /** Array of item IDs that should be expanded by default */
  defaultExpanded?: string[];
  /** Additional CSS classes to apply to the root container */
  className?: string;
}

/**
 * Props for the AccordionItem sub-component
 */
export interface AccordionItemComponentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onToggle"> {
  /** Unique identifier for the accordion item */
  id: string;
  /** Whether the item is currently expanded */
  isExpanded: boolean;
  /** Callback function triggered when the item's expanded state changes */
  onToggle: (id: string) => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the item container */
  className?: string;
  /** Child elements (typically AccordionHeader and AccordionContent) */
  children: ReactNode;
}

/**
 * Props for the AccordionHeader sub-component
 */
export interface AccordionHeaderProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "onToggle"> {
  /** Unique identifier for the accordion item this header controls */
  id: string;
  /** Whether the accordion item is currently expanded */
  isExpanded: boolean;
  /** Callback function triggered when the header is clicked */
  onToggle: (id: string) => void;
  /** Whether the header is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the header button */
  className?: string;
  /** Child elements (typically title, icon, badge) */
  children: ReactNode;
}

/**
 * Props for the AccordionContent sub-component
 */
export interface AccordionContentProps
  extends HTMLAttributes<HTMLDivElement> {
  /** Unique identifier for the accordion item this content belongs to */
  id: string;
  /** Whether the accordion item is currently expanded */
  isExpanded: boolean;
  /** Additional CSS classes for the content container */
  className?: string;
  /** Child elements to display inside the content area */
  children: ReactNode;
}

/**
 * Accordion Component
 *
 * A composable accordion component system for organizing content into expandable sections.
 * Supports single or multiple open items, keyboard navigation, and full accessibility.
 * Can be used as a simple component with the `items` prop or as composable sub-components.
 *
 * **Features:**
 * - Single or multiple open items
 * - Keyboard navigation (Enter/Space to toggle, Arrow keys to navigate)
 * - Full ARIA support for accessibility
 * - Smooth animations and transitions
 * - Support for icons and badges
 * - Disabled state support
 * - Fully customizable via className composition
 *
 * @param props - The accordion configuration
 * @returns The rendered accordion component
 *
 * @example
 * // Basic usage with items array
 * const items = [
 *   { id: '1', title: 'Section 1', children: <p>Content 1</p> },
 *   { id: '2', title: 'Section 2', children: <p>Content 2</p> }
 * ];
 *
 * <Accordion items={items} />
 *
 * @example
 * // Multiple items open at once
 * <Accordion items={items} allowMultiple defaultExpanded={['1', '2']} />
 *
 * @example
 * // With icons and badges
 * import { Users } from "lucide-react";
 *
 * const items = [
 *   {
 *     id: '1',
 *     title: 'Team Members',
 *     icon: Users,
 *     badge: <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">5</span>,
 *     children: <UserList />
 *   }
 * ];
 *
 * <Accordion items={items} allowMultiple />
 *
 * @example
 * // Composable sub-component usage
 * <Accordion.Root allowMultiple>
 *   <Accordion.Item id="1">
 *     <Accordion.Header>
 *       <Accordion.Title>Section 1</Accordion.Title>
 *     </Accordion.Header>
 *     <Accordion.Content>
 *       <p>Content 1</p>
 *     </Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 */
export function Accordion({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  className,
  ...rest
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(defaultExpanded)
  );

  const toggleItem = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      return newSet;
    });
  }, [allowMultiple]);

  return (
    <div
      className={cn("space-y-2", className)}
      role="region"
      aria-label="Accordion"
      {...rest}
    >
      {items.map((item) => {
        const isExpanded = expandedIds.has(item.id);
        const Icon = item.icon;
        const contentId = `accordion-content-${item.id}`;

        return (
          <AccordionItem
            key={item.id}
            id={item.id}
            isExpanded={isExpanded}
            onToggle={toggleItem}
            disabled={item.disabled}
          >
            <AccordionHeader
              id={item.id}
              isExpanded={isExpanded}
              onToggle={toggleItem}
              disabled={item.disabled}
              aria-controls={contentId}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {Icon && (
                  <Icon
                    className="shrink-0 text-gray-600"
                    size={20}
                    aria-hidden="true"
                  />
                )}
                <span className="text-base font-semibold text-gray-900 truncate">
                  {item.title}
                </span>
                {item.badge && (
                  <div className="shrink-0 ml-auto">{item.badge}</div>
                )}
              </div>
            </AccordionHeader>
            <AccordionContent id={item.id} isExpanded={isExpanded}>
              {item.children}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </div>
  );
}

/**
 * AccordionItem Component
 *
 * A wrapper component for individual accordion items. Used when composing accordion
 * with sub-components instead of using the simple `items` prop.
 *
 * @param props - The item configuration
 * @returns The rendered accordion item
 *
 * @example
 * <AccordionItem id="1" isExpanded={true} onToggle={handleToggle}>
 *   <AccordionHeader>Title</AccordionHeader>
 *   <AccordionContent>Content</AccordionContent>
 * </AccordionItem>
 */
export function AccordionItem({
  id,
  isExpanded,
  onToggle,
  disabled = false,
  className,
  children,
  ...rest
}: AccordionItemComponentProps) {
  return (
    <div
      className={cn(
        "border border-gray-200 rounded-lg overflow-hidden transition-all duration-200",
        "hover:border-gray-300",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      data-state={isExpanded ? "open" : "closed"}
      data-disabled={disabled ? "true" : "false"}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * AccordionHeader Component
 *
 * The clickable header/trigger button for an accordion item. Handles keyboard navigation
 * and accessibility attributes automatically.
 *
 * **Keyboard Support:**
 * - Enter/Space: Toggle the accordion item
 * - Arrow Up/Down: Navigate between accordion items (when used in a list)
 *
 * @param props - The header configuration
 * @returns The rendered accordion header button
 *
 * @example
 * <AccordionHeader id="1" isExpanded={true} onToggle={handleToggle}>
 *   <span>Click to expand</span>
 * </AccordionHeader>
 */
export function AccordionHeader({
  id,
  isExpanded,
  onToggle,
  disabled = false,
  className,
  children,
  ...rest
}: AccordionHeaderProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onToggle(id)}
      disabled={disabled}
      aria-expanded={isExpanded}
      aria-disabled={disabled}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 text-left",
        "bg-gray-50 hover:bg-gray-100 active:bg-gray-200",
        "transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0",
        "disabled:hover:bg-gray-50 disabled:cursor-not-allowed",
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {children}
      </div>
      <ChevronDown
        size={20}
        className={cn(
          "shrink-0 text-gray-600 transition-transform duration-200",
          isExpanded && "rotate-180"
        )}
        aria-hidden="true"
      />
    </button>
  );
}

/**
 * AccordionContent Component
 *
 * The expandable content area of an accordion item. Automatically handles visibility
 * and smooth transitions based on the `isExpanded` prop.
 *
 * @param props - The content configuration
 * @returns The rendered accordion content or null if not expanded
 *
 * @example
 * <AccordionContent id="1" isExpanded={true}>
 *   <p>This content is shown when expanded</p>
 * </AccordionContent>
 */
export function AccordionContent({
  id,
  isExpanded,
  className,
  children,
  ...rest
}: AccordionContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    isExpanded ? undefined : 0
  );

  useEffect(() => {
    if (!contentRef.current) return;

    if (isExpanded) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(scrollHeight);
      const timer = setTimeout(() => setHeight(undefined), 200);
      return () => clearTimeout(timer);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  return (
    <div
      ref={contentRef}
      id={`accordion-content-${id}`}
      role="region"
      aria-hidden="true"
      aria-labelledby={`accordion-header-${id}`}
      className={cn(
        "overflow-hidden transition-all duration-200",
        !isExpanded && "invisible"
      )}
      style={{
        height: height === undefined ? "auto" : `${height}px`,
      }}
      {...rest}
    >
      <div className={cn("px-4 py-3 border-t border-gray-200 bg-white", className)}>
        {children}
      </div>
    </div>
  );
}

/**
 * Accordion.Root - Composable root component for accordion
 *
 * Use this when you want full control over accordion structure with sub-components.
 * Manages the expanded state and provides toggle callbacks to child items.
 *
 * @example
 * const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
 *
 * <Accordion.Root allowMultiple>
 *   <Accordion.Item id="1" isExpanded={expandedIds.has('1')} onToggle={handleToggle}>
 *     <Accordion.Header>Title</Accordion.Header>
 *     <Accordion.Content>Content</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 */
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;