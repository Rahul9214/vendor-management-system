import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Moon, Sun, Search, Menu } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/constants/navigation';
import { dashboardKeys } from '@/hooks/useDashboard';
import { useTheme, useToggleTheme, useToggleSidebar } from '@/hooks/useUIStore';
import { HeaderNotificationDropdown } from '@/components/notification/HeaderNotificationDropdown';

// ─── Page title resolver ──────────────────────────────────────────────────────

function usePageTitle(pathname: string): string {
  const match = NAV_ITEMS.find((item) => pathname.startsWith(item.path));
  return match?.label ?? 'Dashboard';
}

// ─── Header Component ─────────────────────────────────────────────────────────

export const Header = memo(function Header() {
  const { pathname }   = useLocation();
  const title          = usePageTitle(pathname);
  const theme          = useTheme();
  const toggleTheme    = useToggleTheme();
  const toggleSidebar  = useToggleSidebar();
  const queryClient    = useQueryClient();

  const handleRefreshAll = () => {
    void queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
  };

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6 dark:border-slate-800 dark:bg-slate-950">
      {/* Left: mobile menu + title */}
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100 lg:hidden"
          title="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h1>
          <p className="hidden text-xs text-slate-400 sm:block">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Right: search + actions */}
      <div className="flex items-center gap-2">
        {/* Search (decorative for Module 1) */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search vendors…"
            readOnly
            className={cn(
              'h-8 w-48 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3',
              'text-xs text-slate-500 placeholder:text-slate-400',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500/30',
              'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300',
              'cursor-not-allowed',
            )}
          />
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={handleRefreshAll}
          title="Refresh dashboard data"
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        {/* Interactive Header Notification Dropdown */}
        <HeaderNotificationDropdown />

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          {theme === 'dark'
            ? <Sun  className="h-4 w-4" />
            : <Moon className="h-4 w-4" />}
        </button>

        {/* User avatar */}
        <button
          type="button"
          title="User profile"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-sm transition-transform hover:scale-105"
        >
          AD
        </button>
      </div>
    </header>
  );
});
