import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TableColumn<T = any> {
  /** Unique key for the column */
  key: string;
  /** Column header label */
  label: string;
  /** Optional render function for custom cell content */
  render?: (item: T) => ReactNode;
  /** Optional className for the column */
  className?: string;
  /** Column alignment */
  align?: "left" | "center" | "right";
}

export interface TableProps<T = any> {
  /** Array of column definitions */
  columns: TableColumn<T>[];
  /** Array of data items to display */
  data: T[];
  /** Optional function to extract unique key from each row */
  getRowKey?: (item: T, index: number) => string | number;
  /** Optional empty state message */
  emptyMessage?: string;
  /** Optional empty state icon */
  emptyIcon?: React.ComponentType<{ className?: string; size?: number }>;
  /** Optional row click handler */
  onRowClick?: (item: T) => void;
  /** Additional CSS classes for the table container */
  className?: string;
  /** Show striped rows */
  striped?: boolean;
  /** Show hover effect on rows */
  hoverable?: boolean;
}

/**
 * Table Component
 * 
 * A generic, fully-typed data table component with customizable columns,
 * empty states, and row interactions.
 * 
 * @example
 * // Basic usage
 * const columns = [
 *   { key: 'name', label: 'Name' },
 *   { key: 'email', label: 'Email' },
 *   { key: 'status', label: 'Status', render: (item) => <Badge>{item.status}</Badge> }
 * ];
 * 
 * <Table columns={columns} data={users} />
 * 
 * @example
 * // With row click handler
 * <Table 
 *   columns={columns} 
 *   data={users}
 *   onRowClick={(user) => console.log(user)}
 *   hoverable
 * />
 */
export function Table<T = any>({
  columns,
  data,
  getRowKey = (_, index) => index,
  emptyMessage = "No data available",
  emptyIcon: EmptyIcon,
  onRowClick,
  className,
  striped = false,
  hoverable = true,
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        {EmptyIcon && <EmptyIcon className="mx-auto mb-4 text-gray-400" size={48} />}
        <p className="text-gray-600 font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-lg shadow-md overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    !column.align && "text-left",
                    column.className
                  )}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr
                key={getRowKey(item, index)}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  striped && index % 2 === 1 && "bg-gray-50",
                  hoverable && "hover:bg-gray-100 transition-colors",
                  onRowClick && "cursor-pointer"
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "px-6 py-4 whitespace-nowrap text-sm",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      !column.align && "text-left"
                    )}
                  >
                    {column.render
                      ? column.render(item)
                      : (item as any)[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}