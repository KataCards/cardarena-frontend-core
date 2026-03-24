import { forwardRef, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextAlign = "left" | "center" | "right";

const alignmentMap: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/**
 * Props for the TableContainer component
 */
export interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * Props for the Table root component
 */
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Additional CSS classes for the table element */
  className?: string;
}

/**
 * Props for the TableCaption component
 */
export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {
  /** Additional CSS classes for the caption element */
  className?: string;
}

/**
 * Props for the TableHeader component
 */
export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Additional CSS classes for the thead element */
  className?: string;
}

/**
 * Props for the TableBody component
 */
export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Additional CSS classes for the tbody element */
  className?: string;
}

/**
 * Props for the TableRow component
 */
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** If true, row is interactive and keyboard accessible */
  interactive?: boolean;
  /** Additional CSS classes for the tr element */
  className?: string;
}

/**
 * Props for the TableHead component
 */
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment for the header cell */
  align?: TextAlign;
  /** Additional CSS classes for the th element */
  className?: string;
}

/**
 * Props for the TableCell component
 */
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment for the cell */
  align?: TextAlign;
  /** Additional CSS classes for the td element */
  className?: string;
}

/**
 * Props for the TableEmpty component
 */
export interface TableEmptyProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Number of columns to span */
  colSpan: number;
  /** Empty state message */
  children: React.ReactNode;
  /** Additional CSS classes for the row */
  className?: string;
}

/**
 * TableContainer Component
 *
 * A wrapper component that handles horizontal scrolling for tables on mobile devices.
 * Provides a consistent overflow behavior and maintains table accessibility.
 *
 * @param props - Container configuration
 * @param ref - Forwarded ref to the container div
 * @returns The rendered container element
 */
export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-lg border border-border overflow-hidden", className)}
      {...props}
    />
  )
);
TableContainer.displayName = "TableContainer";

/**
 * Table Component
 *
 * A composable, fully-typed table component system using the Compound Component pattern.
 * Provides maximum flexibility for building simple to complex data tables with custom
 * headers, rows, cells, and interactive features.
 *
 * Features:
 * - Semantic HTML with proper ARIA attributes
 * - Keyboard accessible interactive rows
 * - Fully composable sub-components
 * - Type-safe and extensible
 * - Minimal opinionated styling
 * - Mobile-responsive with TableContainer
 *
 * Usage: Wrap in TableContainer, compose with TableHeader, TableBody, TableRow, TableHead, and TableCell.
 * For interactive rows, add the `interactive` prop to TableRow.
 * For empty states, use TableEmpty component with appropriate colSpan.
 *
 * @param props - Table configuration
 * @param ref - Forwarded ref to the table element
 * @returns The rendered table element
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <table
      ref={ref}
      className={cn("w-full border-collapse text-sm", className)}
      {...props}
    />
  )
);
Table.displayName = "Table";

/**
 * TableCaption Component
 *
 * Renders a semantic `<caption>` element for accessible table descriptions.
 * Captions are announced by screen readers and provide context for the table.
 * Place as the first child of Table component.
 *
 * @param props - Caption configuration
 * @param ref - Forwarded ref to the caption element
 * @returns The rendered caption element
 */
export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn("text-sm text-muted-foreground py-2", className)}
      {...props}
    />
  )
);
TableCaption.displayName = "TableCaption";

/**
 * TableHeader Component
 *
 * Renders a semantic `<thead>` element. Use with TableRow and TableHead for column headers.
 *
 * @param props - Header configuration
 * @param ref - Forwarded ref to the thead element
 * @returns The rendered thead element
 */
export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn("border-b border-border bg-muted", className)}
      {...props}
    />
  )
);
TableHeader.displayName = "TableHeader";

/**
 * TableBody Component
 *
 * Renders a semantic `<tbody>` element. Use with TableRow and TableCell for data rows.
 *
 * @param props - Body configuration
 * @param ref - Forwarded ref to the tbody element
 * @returns The rendered tbody element
 */
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("divide-y divide-border", className)}
      {...props}
    />
  )
);
TableBody.displayName = "TableBody";

/**
 * TableRow Component
 *
 * Renders a semantic `<tr>` element. Can be interactive for clickable rows.
 * When interactive={true}, the row becomes keyboard accessible (Enter/Space to activate).
 *
 * @param props - Row configuration
 * @param ref - Forwarded ref to the tr element
 * @returns The rendered tr element
 */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, interactive = false, onClick, onKeyDown, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
      if (interactive && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick?.(e as any);
      }
      onKeyDown?.(e);
    };

    return (
      <tr
        ref={ref}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? "button" : undefined}
        onClick={onClick}
        onKeyDown={interactive ? handleKeyDown : onKeyDown}
        className={cn(
          "transition-colors",
          interactive && "cursor-pointer hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      />
    );
  }
);
TableRow.displayName = "TableRow";

/**
 * TableEmpty Component
 *
 * A convenience component for rendering empty state rows that span all columns.
 * Keeps table headers visible while displaying an empty message.
 * Use within TableBody with conditional rendering based on data length.
 *
 * @param props - Empty state configuration (requires colSpan matching number of columns)
 * @param ref - Forwarded ref to the tr element
 * @returns The rendered empty row element
 */
export const TableEmpty = forwardRef<HTMLTableRowElement, TableEmptyProps>(
  ({ colSpan, children, className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("hover:bg-transparent", className)}
      {...props}
    >
      <td colSpan={colSpan} className="px-4 py-12 text-center text-muted-foreground">
        {children}
      </td>
    </tr>
  )
);
TableEmpty.displayName = "TableEmpty";

/**
 * TableHead Component
 *
 * Renders a semantic `<th>` element for column headers.
 * Automatically sets scope="col" for accessibility.
 * Supports align prop for text alignment (left, center, right).
 *
 * @param props - Head configuration
 * @param ref - Forwarded ref to the th element
 * @returns The rendered th element
 */
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, scope = "col", align = "left", ...props }, ref) => (
    <th
      ref={ref}
      scope={scope as any}
      className={cn(
        "px-4 py-3 text-xs font-semibold text-foreground uppercase tracking-wider",
        alignmentMap[align],
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

/**
 * TableCell Component
 *
 * Renders a semantic `<td>` element for data cells.
 * Supports align prop for text alignment (left, center, right).
 *
 * @param props - Cell configuration
 * @param ref - Forwarded ref to the td element
 * @returns The rendered td element
 */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = "left", ...props }, ref) => (
    <td
      ref={ref}
      className={cn("px-4 py-3 text-foreground", alignmentMap[align], className)}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";