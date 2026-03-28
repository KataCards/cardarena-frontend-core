import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the Button component
 *
 * Renders as <button> by default, or <a> when href is provided.
 * Button-specific props (type, form, etc.) are filtered when rendering as anchor.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant. @default "default" */
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  /** Button size. @default "md" */
  size?: "sm" | "md" | "lg";
  /** If true, button takes full width of container. @default false */
  fullWidth?: boolean;
  /** Button content */
  children: React.ReactNode;
  /** Optional href to render as anchor element instead of button */
  href?: string;
  /** Optional icon component to display */
  icon?: React.ElementType;
  /** Icon position relative to text. @default "left" */
  iconPosition?: "left" | "right";
  /** Link relation type. Defaults to "noopener noreferrer" for security when href is present. */
  rel?: string;
}

/**
 * Semantic variant styles using theme tokens
 */
const variantStyles = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-ring",
  outline: "border-2 border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
  ghost: "text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-ring",
};

/**
 * Size styles
 */
const sizeStyles = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2 text-base",
  lg: "px-8 py-4 text-lg",
};

/**
 * Icon size mapping
 */
const iconSizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

/**
 * Button Component
 *
 * A versatile, accessible button component with semantic theming.
 * Renders as `<button>` by default, or `<a>` when href is provided.
 *
 * Features:
 * - 5 semantic variants (default, secondary, outline, ghost, destructive)
 * - 3 sizes (sm, md, lg)
 * - Optional icons with configurable position
 * - Full width option
 * - ForwardRef support
 * - Automatic link security (noopener noreferrer)
 * - Semantic color tokens (no hardcoded colors)
 * - Disabled state styling
 *
 * Design Philosophy:
 * - Uses semantic theme tokens for all colors
 * - Polymorphic (button or anchor based on href)
 * - Accessible by default (focus rings, disabled states)
 * - Icon support with proper ARIA attributes
 *
 * @param props - Button configuration
 * @param ref - Forwarded ref to the button or anchor element
 * @returns The rendered button or link element
 *
 * @example
 * // Basic button
 * <Button>Click me</Button>
 *
 * @example
 * // With icon and variant
 * import { ArrowRight } from "lucide-react";
 * <Button variant="default" icon={ArrowRight} iconPosition="right">
 *   Get Started
 * </Button>
 *
 * @example
 * // As link
 * <Button href="/signup" variant="default" size="lg">
 *   Sign Up
 * </Button>
 *
 * @example
 * // Destructive action
 * <Button variant="destructive" fullWidth>
 *   Delete Account
 * </Button>
 *
 * @example
 * // Ghost button with icon
 * import { Settings } from "lucide-react";
 * <Button variant="ghost" size="sm" icon={Settings}>
 *   Settings
 * </Button>
 */
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "default",
      size = "md",
      fullWidth = false,
      children,
      href,
      icon: Icon,
      iconPosition = "left",
      className,
      rel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const classes = cn(
      baseStyles,
      sizeStyles[size],
      fullWidth && "w-full",
      variantStyles[variant],
      className
    );

    const content = (
      <>
        {Icon && iconPosition === "left" && (
          <Icon className={iconSizeMap[size]} aria-hidden="true" />
        )}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon className={iconSizeMap[size]} aria-hidden="true" />
        )}
      </>
    );

    if (href) {
      // Filter out button-specific props that shouldn't be on anchor elements
      const {
        type: _type,
        form: _form,
        formAction: _formAction,
        formEncType: _formEncType,
        formMethod: _formMethod,
        formNoValidate: _formNoValidate,
        formTarget: _formTarget,
        ...anchorProps
      } = props;
      void _type;
      void _form;
      void _formAction;
      void _formEncType;
      void _formMethod;
      void _formNoValidate;
      void _formTarget;

      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          rel={rel ?? "noopener noreferrer"}
          {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          className={classes}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
        className={classes}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
