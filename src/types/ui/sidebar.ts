/**
 * Represents a single link in the sidebar.
 */
export interface SidebarLinkItem {
  /** Display label for the link */
  label: string;
  /** Target navigation URL */
  href: string;
  /** Serializable icon name */
  iconName: 'home' | 'trophy' | 'users' | 'settings' | 'gamepad';
  /** Whether this link is currently active */
  isActive?: boolean;
}

/**
 * Props for the Sidebar component.
 */
export interface SidebarProps {
  /** The name of the platform displayed at the top */
  brandName: string;
  /** List of navigation links */
  links: SidebarLinkItem[];
  /** Optional user data for the profile section */
  user?: {
    username: string;
    avatarUrl?: string;
  };
  /** Callback for the logout action */
  onLogout?: () => Promise<void> | void;
  /** Loading state for the logout action */
  isLoggingOut?: boolean;
}
