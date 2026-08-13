import {
  LayoutDashboard,
  Building2,
  UserPlus,
  ShoppingCart,
  FileText,
  BarChart3,
  Shield,
  Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  /** Module number for ordering and future feature-flag gating */
  module: number;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard',       label: 'Dashboard',       icon: LayoutDashboard, path: '/dashboard',       module: 1 },
  { id: 'vendors',         label: 'Vendors',          icon: Building2,       path: '/vendors',         module: 2 },
  { id: 'onboarding',      label: 'Onboarding',       icon: UserPlus,        path: '/onboarding',      module: 3 },
  { id: 'purchase-orders', label: 'Purchase Orders',  icon: ShoppingCart,    path: '/purchase-orders', module: 4 },
  { id: 'contracts',       label: 'Contracts',        icon: FileText,        path: '/contracts',       module: 5 },
  { id: 'performance',     label: 'Performance',      icon: BarChart3,       path: '/performance',     module: 6 },
  { id: 'compliance',      label: 'Compliance',       icon: Shield,          path: '/compliance',      module: 7 },
  { id: 'settings',        label: 'Settings',         icon: Settings,        path: '/settings',        module: 8 },
];

/** Modules that are fully implemented (unlocked) */
export const IMPLEMENTED_MODULES = new Set([1]);
