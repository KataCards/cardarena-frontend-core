import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, ElementType } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'solid' | 'secondary' | 'outline' | 'ghost';
  /** Color scheme for the button */
  colorScheme?: 'red' | 'dark' | 'gray';
  /** Button size */
  size?: 'md' | 'lg';
  /** Whether button should take full width of container */
  fullWidth?: boolean;
  /** Button content */
  children: ReactNode;
  /** Optional href to render as link instead of button */
  href?: string;
  /** Optional icon component to display */
  icon?: ElementType;
  /** Position of the icon relative to text */
  iconPosition?: 'left' | 'right';
}

const variantStyles = {
  solid: {
    red:  'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    dark: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-700',
    gray: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  },
  secondary: {
    red:  'bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500',
    dark: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-700',
    gray: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400',
  },
  outline: {
    red:  'border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
    dark: 'border-2 border-gray-900 text-gray-900 hover:bg-gray-50 focus:ring-gray-700',
    gray: 'border-2 border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600 focus:ring-gray-400',
  },
  ghost: {
    red:  'text-red-600 hover:bg-red-50 focus:ring-red-500',
    dark: 'text-gray-900 hover:bg-gray-50 focus:ring-gray-700',
    gray: 'text-gray-600 hover:bg-gray-50 focus:ring-gray-400',
  },
};

/**
 * Button
 * 
 * A versatile button component that supports multiple variants, color schemes, sizes,
 * and can render as either a button or link element. Includes icon support and
 * full accessibility features.
 * 
 * @example
 * // Basic solid button
 * import { Button } from "@/components/ui/Button";
 * 
 * <Button>Click me</Button>
 * 
 * @example
 * // Button with icon and variants
 * import { ArrowRight, Download, Trash } from "lucide-react";
 * 
 * <Button variant="solid" colorScheme="red" icon={ArrowRight} iconPosition="right">
 *   Get Started
 * </Button>
 * 
 * <Button variant="outline" colorScheme="dark" icon={Download}>
 *   Download
 * </Button>
 * 
 * <Button variant="ghost" colorScheme="gray" icon={Trash} size="md">
 *   Delete
 * </Button>
 * 
 * @example
 * // Button as link
 * <Button href="/signup" variant="solid" colorScheme="red" size="lg">
 *   Sign Up Now
 * </Button>
 * 
 * @example
 * // Full width button with loading state
 * <Button 
 *   fullWidth 
 *   disabled={isLoading}
 *   onClick={handleSubmit}
 * >
 *   {isLoading ? "Saving..." : "Save Changes"}
 * </Button>
 * 
 * @example
 * // All variants showcase
 * <div className="space-y-4">
 *   <Button variant="solid" colorScheme="red">Solid Red</Button>
 *   <Button variant="secondary" colorScheme="red">Secondary Red</Button>
 *   <Button variant="outline" colorScheme="dark">Outline Dark</Button>
 *   <Button variant="ghost" colorScheme="gray">Ghost Gray</Button>
 * </div>
 */
export function Button({
  variant = 'solid',
  colorScheme = 'red',
  size = 'md',
  fullWidth = false,
  children,
  href,
  icon: Icon,
  iconPosition = 'left',
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${size === 'lg' ? 'px-8 py-4 text-lg' : 'px-6 py-2 text-base'}
    ${fullWidth ? 'w-full' : ''}
    ${variantStyles[variant][colorScheme]}
    ${props.className ?? ''}`;

  const content = (
    <>
      {Icon && iconPosition === 'left'  && <Icon className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} aria-hidden="true" />}
    </>
  );

  if (href) {
    const { type, form, formAction, formEncType, formMethod, formNoValidate, formTarget, ...anchorProps } = props;
    return <a href={href} {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>{content}</a>;
  }

  return <button {...props} className={classes}>{content}</button>;
}