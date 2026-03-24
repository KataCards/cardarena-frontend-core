import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { SearchInput } from "@/components/ui/SearchInput";
import { Label } from "@/components/ui/Label";
import { FieldError } from "@/components/ui/FieldError";
import { Mail, DollarSign, Calendar } from "lucide-react";

/**
 * Example 1: Basic Input
 * 
 * Simple input without any slots.
 */
export function BasicInputExample() {
  return (
    <Input type="email" placeholder="you@example.com" />
  );
}

/**
 * Example 2: Input with Label
 * 
 * Using the standalone Label component.
 */
export function InputWithLabelExample() {
  return (
    <div>
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  );
}

/**
 * Example 3: Input with Required Label
 * 
 * Label with required indicator.
 */
export function InputWithRequiredLabelExample() {
  return (
    <div>
      <Label htmlFor="username" required>Username</Label>
      <Input id="username" type="text" placeholder="johndoe" />
    </div>
  );
}

/**
 * Example 4: Input with Error
 * 
 * Complete form field with label and error.
 */
export function InputWithErrorExample() {
  return (
    <div>
      <Label htmlFor="email-error">Email Address</Label>
      <Input
        id="email-error"
        type="email"
        placeholder="you@example.com"
        aria-invalid="true"
        aria-describedby="email-error-message"
        className="border-destructive"
      />
      <FieldError id="email-error-message">
        Please enter a valid email address
      </FieldError>
    </div>
  );
}

/**
 * Example 5: Input with Left Icon
 * 
 * Using leftSlot for an icon.
 */
export function InputWithLeftIconExample() {
  return (
    <div>
      <Label htmlFor="email-icon">Email Address</Label>
      <Input
        id="email-icon"
        type="email"
        placeholder="you@example.com"
        leftSlot={<Mail className="w-4 h-4 text-muted-foreground" />}
      />
    </div>
  );
}

/**
 * Example 6: Input with Right Icon
 * 
 * Using rightSlot for currency symbol.
 */
export function InputWithRightIconExample() {
  return (
    <div>
      <Label htmlFor="price">Price</Label>
      <Input
        id="price"
        type="number"
        placeholder="0.00"
        rightSlot={<DollarSign className="w-4 h-4 text-muted-foreground" />}
      />
    </div>
  );
}

/**
 * Example 7: Input with Both Slots
 * 
 * Using both left and right slots.
 */
export function InputWithBothSlotsExample() {
  return (
    <div>
      <Label htmlFor="date-range">Date Range</Label>
      <Input
        id="date-range"
        type="text"
        placeholder="Select date range"
        leftSlot={<Calendar className="w-4 h-4 text-muted-foreground" />}
        rightSlot={
          <button
            type="button"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        }
      />
    </div>
  );
}

/**
 * Example 8: PasswordInput Basic
 * 
 * Simple password input with toggle.
 */
export function PasswordInputBasicExample() {
  return (
    <div>
      <Label htmlFor="password">Password</Label>
      <PasswordInput id="password" placeholder="Enter your password" />
    </div>
  );
}

/**
 * Example 9: PasswordInput with Localization
 * 
 * Custom ARIA labels for internationalization.
 */
export function PasswordInputLocalizedExample() {
  return (
    <div>
      <Label htmlFor="password-es">Contraseña</Label>
      <PasswordInput
        id="password-es"
        placeholder="Ingrese su contraseña"
        showPasswordLabel="Mostrar contraseña"
        hidePasswordLabel="Ocultar contraseña"
      />
    </div>
  );
}

/**
 * Example 10: PasswordInput with Error
 * 
 * Complete password field with validation.
 */
export function PasswordInputWithErrorExample() {
  return (
    <div>
      <Label htmlFor="password-error" required>Password</Label>
      <PasswordInput
        id="password-error"
        placeholder="At least 8 characters"
        aria-invalid="true"
        aria-describedby="password-error-message"
        className="border-destructive"
      />
      <FieldError id="password-error-message">
        Password must be at least 8 characters long
      </FieldError>
    </div>
  );
}

/**
 * Example 11: SearchInput Basic
 * 
 * Simple search input with icon.
 */
export function SearchInputBasicExample() {
  return (
    <SearchInput placeholder="Search tournaments..." />
  );
}

/**
 * Example 12: SearchInput with Label
 * 
 * Search input in a form field.
 */
export function SearchInputWithLabelExample() {
  return (
    <div>
      <Label htmlFor="search">Search</Label>
      <SearchInput id="search" placeholder="Type to search..." />
    </div>
  );
}

/**
 * Example 13: SearchInput with Custom Icon Size
 * 
 * Larger icon for prominent search bars.
 */
export function SearchInputCustomSizeExample() {
  return (
    <SearchInput
      iconSize={20}
      placeholder="Search players, teams, tournaments..."
      className="text-lg py-3"
    />
  );
}

/**
 * Example 14: Complete Login Form
 * 
 * Real-world form using all primitives together.
 */
export function CompleteLoginFormExample() {
  return (
    <form className="space-y-4 max-w-sm">
      <div>
        <Label htmlFor="login-email" required>Email</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="you@example.com"
          leftSlot={<Mail className="w-4 h-4 text-muted-foreground" />}
        />
      </div>
      
      <div>
        <Label htmlFor="login-password" required>Password</Label>
        <PasswordInput
          id="login-password"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      >
        Sign In
      </button>
    </form>
  );
}

/**
 * Example 15: Disabled States
 * 
 * All input types in disabled state.
 */
export function DisabledInputsExample() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="disabled-input">Disabled Input</Label>
        <Input
          id="disabled-input"
          type="text"
          placeholder="Cannot edit"
          disabled
        />
      </div>

      <div>
        <Label htmlFor="disabled-password">Disabled Password</Label>
        <PasswordInput
          id="disabled-password"
          placeholder="Cannot edit"
          disabled
        />
      </div>

      <div>
        <Label htmlFor="disabled-search">Disabled Search</Label>
        <SearchInput
          id="disabled-search"
          placeholder="Cannot search"
          disabled
        />
      </div>
    </div>
  );
}