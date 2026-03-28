import { 
  TableContainer,
  Table, 
  TableCaption,
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell,
  TableEmpty
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/**
 * Example 1: Simple Data Table
 * 
 * Basic usage showing a clean, semantic table structure.
 */
export function SimpleTableExample() {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
    { id: 3, name: "Carol White", email: "carol@example.com", role: "User" },
  ];

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/**
 * Example 2: Interactive Table with Click Handlers
 * 
 * Demonstrates keyboard-accessible interactive rows.
 */
export function InteractiveTableExample() {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", status: "inactive" },
    { id: 3, name: "Carol White", email: "carol@example.com", status: "active" },
  ];

  const handleRowClick = (user: typeof users[0]) => {
    console.log("Clicked user:", user);
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              interactive
              onClick={() => handleRowClick(user)}
            >
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.status === "active" ? "success" : "outline"}>
                  {user.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * Example 3: Table with Custom Actions
 * 
 * Shows how to add action buttons and custom cell content.
 */
export function TableWithActionsExample() {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
    { id: 3, name: "Carol White", email: "carol@example.com", role: "User" },
  ];

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.role === "Admin" ? "info" : "outline"}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * Example 4: Striped Table with Hover
 * 
 * Custom styling using className overrides.
 */
export function StripedTableExample() {
  const products = [
    { id: 1, name: "Laptop", price: "$999", stock: 12 },
    { id: 2, name: "Mouse", price: "$29", stock: 45 },
    { id: 3, name: "Keyboard", price: "$79", stock: 23 },
    { id: 4, name: "Monitor", price: "$299", stock: 8 },
  ];

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow
              key={product.id}
              className={index % 2 === 1 ? "bg-muted/50" : ""}
            >
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="text-right">{product.price}</TableCell>
              <TableCell className="text-right">{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * Example 5: Empty State with TableEmpty Component
 * 
 * Handling empty data gracefully using the TableEmpty component.
 */
export function EmptyTableExample() {
  const users: Array<{ id: number; name: string; email: string; status: string }> = [];

  return (
    <TableContainer>
      <Table>
        <TableCaption>User Management</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableEmpty colSpan={3}>No users found. Add a user to get started.</TableEmpty>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/**
 * Example 6: Responsive Table with Scroll
 * 
 * Horizontal scroll for mobile devices.
 */
export function ResponsiveTableExample() {
  const transactions = [
    { id: 1, date: "2024-01-15", description: "Payment received", amount: "$1,200", status: "completed" },
    { id: 2, date: "2024-01-14", description: "Refund processed", amount: "-$50", status: "completed" },
    { id: 3, date: "2024-01-13", description: "Subscription renewal", amount: "$99", status: "pending" },
  ];

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-25">Date</TableHead>
              <TableHead className="min-w-50">Description</TableHead>
              <TableHead className="min-w-25 text-right">Amount</TableHead>
              <TableHead className="min-w-25">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className="text-right font-medium">{transaction.amount}</TableCell>
                <TableCell>
                  <Badge variant={transaction.status === "completed" ? "success" : "warning"}>
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
