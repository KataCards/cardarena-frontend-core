import * as React from "react";
import { Search } from "lucide-react";
import { Input, InputProps } from "./Input";

interface SearchInputProps extends Omit<InputProps, "type" | "leftSlot"> {
  /** Size of the search icon. @default 16 */
  iconSize?: number;
}

/**
 * SearchInput Component
 *
 * A search input field with integrated search icon built on the slot-based Input primitive.
 * Demonstrates how specialized inputs can be built using the Input's slot architecture.
 *
 * Features:
 * - Built-in search icon positioned on the left
 * - Semantic color tokens (no hardcoded brand colors)
 * - Full input HTML attributes support
 * - ForwardRef support for form libraries
 * - Accessible with proper ARIA attributes
 *
 * Design Philosophy:
 * - Built on Input primitive using leftSlot
 * - No label or error logic (use Label and FieldError components)
 * - Type is locked to "search" for semantic HTML
 * - Icon size is customizable for different contexts
 *
 * @param props - SearchInput configuration
 * @param ref - Forwarded ref to the input element
 * @returns The rendered search input element
 *
 * @example
 * // Basic usage
 * <SearchInput placeholder="Search..." />
 *
 * @example
 * // With custom icon size
 * <SearchInput iconSize={20} placeholder="Search tournaments..." />
 *
 * @example
 * // Complete form field
 * <div>
 *   <Label htmlFor="search">Search</Label>
 *   <SearchInput id="search" placeholder="Type to search..." />
 * </div>
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ iconSize = 16, placeholder = "Search...", ...props }, ref) => (
    <Input
      ref={ref}
      type="search"
      placeholder={placeholder}
      leftSlot={
        <Search
          className="text-muted-foreground"
          size={iconSize}
          aria-hidden="true"
        />
      }
      {...props}
    />
  )
);

SearchInput.displayName = "SearchInput";