import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional container className for the wrapper div
   */
  containerClassName?: string;
  /**
   * Size variant for the search icon
   */
  iconSize?: number;
}

/**
 * SearchInput - A search input field with an integrated search icon
 * 
 * Features:
 * - Built-in search icon positioned on the left
 * - Full input HTML attributes support
 * - Customizable styling via className props
 * - Accessible with proper focus states
 */
export function SearchInput({
  containerClassName,
  className,
  iconSize = 20,
  placeholder = "Suchen...",
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={iconSize}
      />
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg",
          "focus:ring-2 focus:ring-red-500 focus:border-red-500",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
          "transition-colors",
          className
        )}
        {...props}
      />
    </div>
  );
}