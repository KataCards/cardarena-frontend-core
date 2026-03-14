'use client';

import { useState } from 'react';
import { Menu, X, Trophy, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SiGithub } from '@icons-pack/react-simple-icons';

/**
 * Mapping of icon names to Lucide icon components.
 * This allows us to pass serializable strings from Server to Client.
 */
const iconMap: Record<string, LucideIcon> = {
  trophy: Trophy,
  github: SiGithub,
};

/**
 * Represents a single link in the navigation.
 */
export interface NavLink {
  label: string;
  href: string;
  /** Name of the icon to display (must exist in iconMap) */
  iconName?: keyof typeof iconMap;
}

/**
 * Props for the Navbar component.
 */
export interface NavbarProps {
  /** Brand identity information */
  brand: {
    name: string;
    subtext?: string;
    logo?: keyof typeof iconMap;
  };
  /** List of navigation links to display */
  links: NavLink[];
  /** Optional primary action button */
  action?: {
    label: string;
    href: string;
  };
}

/**
 * Navbar component (Presenter)
 * A responsive navigation bar with a mobile menu toggle.
 */
export function Navbar({ brand, links, action }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const BrandIcon = brand.logo ? iconMap[brand.logo] : null;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              {BrandIcon && <BrandIcon className="w-6 h-6 text-white" />}
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-none">{brand.name}</span>
              {brand.subtext && (
                <span className="text-xs font-medium text-red-600 uppercase tracking-wider">
                  {brand.subtext}
                </span>
              )}
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const Icon = link.iconName ? iconMap[link.iconName] : null;
              return (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors flex items-center gap-1"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </a>
              );
            })}
            {action && (
              <Button size="md" variant="solid" colorScheme="red" href={action.href}>
                {action.label}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-in slide-in-from-top duration-200">
          <div className="px-4 py-6 space-y-4">
            {links.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="block text-lg font-medium text-gray-700 hover:text-red-600" 
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {action && (
              <Button variant="solid" colorScheme="red" fullWidth href={action.href} onClick={() => setIsOpen(false)}>
                {action.label}
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
