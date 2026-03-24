import { ReactNode, ButtonHTMLAttributes, ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the Button component
 *
 * Renders as <button> by default, or <a> when href is provided.
 * Button-specific props (type, form, etc.) are filtered when rendering as anchor.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant. @default "solid" */
  variant?: "solid" | "secondary" | "outline" | "ghost";
  /** Color scheme. @default "red" */
  colorScheme?: "red" | "dark" | "gray";
  /** Button size. @default "md" */
  size?: "sm" | "md" | "lg";
  /** If true, button takes full width of container. @default false */
  fullWidth?: boolean;
  /** Button content */
  children: ReactNode;
  /** Optional href to render as anchor element instead of button */
  href?: string;
  /** Optional icon component to display */
  icon?: ElementType;
  /** Icon position relative to text. @default "left" */
  iconPosition?: "left" | "right";
  /** Link relation type. Defaults to "noopener noreferrer" for security when href is present. */
  rel?: string;
}

const variantStyles = {
  solid: {
    red: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500",
    dark: "bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700 focus:ring-gray-700",
    gray: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-400",
  },
  secondary: {
    red: "bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200 focus:ring-red-500",
    dark: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-700",
    gray: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-400",
  },
  outline: {
    red: "border-2 border-red-600 text-red-600 hover:bg-red-50 active:bg-red-100 focus:ring-red-500",
    dark: "border-2 border-gray-900 text-gray-900 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-700",
    gray: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-400",
  },
  ghost: {
    red: "text-red-600 hover:bg-red-50 active:bg-red-100 focus:ring-red-500",
    dark: "text-gray-900 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-700",
    gray: "text-gray-600 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-400",
  },
};

const sizeStyles = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2 text-base",
  lg: "px-8 py-4 text-lg",
};

const iconSizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

/**
 * Button Component
 *
 * A versatile button that renders as `<button>` or `<a>` (when href is provided).
 * Supports 4 variants, 3 color schemes, 3 sizes, optional icons, and full customization.
 *
 * When rendering as a link (href provided), button-specific props (type, form, etc.)
 * are automatically filtered out to prevent invalid HTML attributes on the anchor element.
 * The rel attribute defaults to "noopener noreferrer" for security but can be overridden.
 *
 * @param props - Button configuration
 * @returns The rendered button or link element
 *
 * @example
 * <Button>Click me</Button>
 *
 * @example
 * import { ArrowRight } from "lucide-react";
 * <Button variant="solid" colorScheme="red" icon={ArrowRight} iconPosition="right">
 *   Get Started
 * </Button>
 *
 * @example
 * <Button href="/signup" variant="solid" colorScheme="red" size="lg">
 *   Sign Up
 * </Button>
 */
export function Button({
  variant = "solid",
  colorScheme = "red",
  size = "md",
  fullWidth = false,
  children,
  href,
  icon: Icon,
  iconPosition = "left",
  className,
  rel,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const classes = cn(
    baseStyles,
    sizeStyles[size],
    fullWidth && "w-full",
    variantStyles[variant][colorScheme],
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
    const {
      type,
      form,
      formAction,
      formEncType,
      formMethod,
      formNoValidate,
      formTarget,
      ...anchorProps
    } = props;
    return (
      <a
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
    <button {...props} className={classes}>
      {content}
    </button>
  );
}