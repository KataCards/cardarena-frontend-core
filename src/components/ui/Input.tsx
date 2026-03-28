import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional left slot for icons or prefix text */
  leftSlot?: React.ReactNode;
  /** Optional right slot for icons, buttons, or suffix text */
  rightSlot?: React.ReactNode;
}

/**
 * Input Component
 *
 * A flexible, slot-based input primitive for building form fields.
 * Supports left and right slots for icons, buttons, or decorative elements.
 *
 * Features:
 * - Left/Right slot architecture for maximum flexibility
 * - Semantic color tokens (no hardcoded brand colors)
 * - Proper padding adjustments when slots are present
 * - Full input HTML attributes support
 * - ForwardRef support for form libraries
 * - Focus ring with semantic tokens
 *
 * Design Philosophy:
 * - This is a "primitive" - it does NOT include labels or error messages
 * - Use with Label and FieldError components for complete form fields
 * - Slots enable building specialized inputs (password, search, etc.) without duplication
 *
 * @param props - Input configuration
 * @param ref - Forwarded ref to the input element
 * @returns The rendered input element
 *
 * @example
 * // Basic input
 * <Input type="email" placeholder="you@example.com" />
 *
 * @example
 * // With left icon
 * <Input
 *   leftSlot={<Search className="w-4 h-4 text-muted-foreground" />}
 *   placeholder="Search..."
 * />
 *
 * @example
 * // With right button
 * <Input
 *   type="password"
 *   rightSlot={
 *     <button type="button" className="text-muted-foreground hover:text-foreground">
 *       <Eye className="w-4 h-4" />
 *     </button>
 *   }
 * />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ leftSlot, rightSlot, className, ...props }, ref) => {
    const hasLeftSlot = Boolean(leftSlot);
    const hasRightSlot = Boolean(rightSlot);

    return (
      <div className="relative w-full">
        {leftSlot && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            {leftSlot}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-3 py-2 border rounded-lg",
            "bg-background text-foreground",
            "border-input",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-input",
            "placeholder:text-muted-foreground",
            "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
            "transition-colors",
            hasLeftSlot && "pl-10",
            hasRightSlot && "pr-10",
            className
          )}
          {...props}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            {rightSlot}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";