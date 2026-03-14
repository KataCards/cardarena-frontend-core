'use client';

import { Home, Trophy, Users, Settings, Gamepad2, LogOut, type LucideIcon } from "lucide-react";
import Link from 'next/link';
import type { SidebarProps } from "@/types/ui/sidebar";

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  trophy: Trophy,
  users: Users,
  settings: Settings,
  gamepad: Gamepad2,
};

/**
 * Sidebar component (Presenter)
 * A clean, stateless navigation sidebar for the application shell.
 */
export function Sidebar({ 
  brandName, 
  links, 
  user, 
  onLogout, 
  isLoggingOut 
}: SidebarProps) {
  return (
    <aside className="hidden md:flex md:flex-col w-72 bg-white border-r border-gray-100 shadow-sm h-screen sticky top-0 transition-all duration-300">
      {/* Brand Header */}
      <div className="p-8">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-200 group-hover:rotate-6 transition-transform">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-black tracking-tighter uppercase">
            {brandName}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const Icon = iconMap[link.iconName] || Home;
          const isActive = link.isActive;
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200 group
                ${isActive 
                  ? 'bg-red-50 text-red-600 shadow-sm' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <Icon size={20} className={`${isActive ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-900'} transition-colors`} />
              <span className="text-sm tracking-tight">{link.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]" />}
            </Link>
          );
        })}
      </nav>
      
      {/* User / Logout Section */}
      <div className="p-6 border-t border-gray-50">
        {user && (
          <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-gray-50/50 border border-gray-100/50">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-gray-200 to-gray-300 border-2 border-white shadow-sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Angemeldet als</p>
              <p className="text-sm font-bold text-gray-900 truncate">{user.username}</p>
            </div>
          </div>
        )}
        
        {onLogout && (
          <button
            onClick={onLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-xl py-3.5 text-sm font-black uppercase tracking-widest hover:bg-red-600 hover:shadow-lg hover:shadow-red-200 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 active:scale-[0.98]"
          >
            <LogOut size={18} className={isLoggingOut ? 'animate-pulse' : ''} />
            <span>{isLoggingOut ? 'Abmelden...' : 'Abmelden'}</span>
          </button>
        )}
      </div>
    </aside>
  );
}
