'use client';

import { useState } from 'react';
import { Trophy, Menu, X, Github } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 leading-none">CardArena</span>
              <span className="text-xs font-medium text-red-600 uppercase tracking-wider">Core Library</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">Documentation</a>
            <a href="#showcase" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">Components</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors flex items-center gap-1">
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <Button size="md" variant="solid" colorScheme="red">
              Get Started
            </Button>
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
            <a href="#" className="block text-lg font-medium text-gray-700 hover:text-red-600" onClick={() => setIsOpen(false)}>Documentation</a>
            <a href="#showcase" className="block text-lg font-medium text-gray-700 hover:text-red-600" onClick={() => setIsOpen(false)}>Components</a>
            <a href="#" className="block text-lg font-medium text-gray-700 hover:text-red-600" onClick={() => setIsOpen(false)}>GitHub</a>
            <Button variant="solid" colorScheme="red" fullWidth onClick={() => setIsOpen(false)}>
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
