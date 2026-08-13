import { memo, useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Moon,
  Sun,
  Search,
  Menu,
  Settings,
  Shield,
  BarChart3,
  LogOut,
  X,
  Building2,
  FileText,
  ShoppingCart,
  ChevronRight,
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/constants/navigation';
import { dashboardKeys } from '@/hooks/useDashboard';
import { useTheme, useToggleTheme, useToggleSidebar } from '@/hooks/useUIStore';
import { HeaderNotificationDropdown } from '@/components/notification/HeaderNotificationDropdown';
import { MOCK_VENDORS } from '@/constants/mockVendors';
import { MOCK_CONTRACTS } from '@/constants/mockContracts';
import { MOCK_ORDERS } from '@/constants/mockOrders';

// ─── Page title resolver ──────────────────────────────────────────────────────

function usePageTitle(pathname: string): string {
  const match = NAV_ITEMS.find((item) => pathname.startsWith(item.path));
  return match?.label ?? 'Dashboard';
}

// ─── Header Component ─────────────────────────────────────────────────────────

export const Header = memo(function Header() {
  const { pathname }   = useLocation();
  const navigate       = useNavigate();
  const title          = usePageTitle(pathname);
  const theme          = useTheme();
  const toggleTheme    = useToggleTheme();
  const toggleSidebar  = useToggleSidebar();
  const queryClient    = useQueryClient();

  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen]   = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef  = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRefreshAll = () => {
    void queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    showToast('Dashboard data refreshed successfully');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Live matching search results
  const matchedVendors = searchQuery.trim()
    ? MOCK_VENDORS.filter(
        (v) =>
          v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.category.toLowerCase().includes(searchQuery.toLowerCase()),
      ).slice(0, 4)
    : [];

  const matchedContracts = searchQuery.trim()
    ? MOCK_CONTRACTS.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.vendorName.toLowerCase().includes(searchQuery.toLowerCase()),
      ).slice(0, 3)
    : [];

  const matchedOrders = searchQuery.trim()
    ? MOCK_ORDERS.filter(
        (o) =>
          o.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.vendorName.toLowerCase().includes(searchQuery.toLowerCase()),
      ).slice(0, 3)
    : [];

  const totalMatches =
    matchedVendors.length + matchedContracts.length + matchedOrders.length;

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6 dark:border-slate-800 dark:bg-slate-950 relative z-30">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl border border-slate-700 animate-in fade-in-50 slide-in-from-top-2">
          ✨ {toastMessage}
        </div>
      )}

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
          <h1 className="text-base font-bold text-slate-900 dark:text-white">
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
        {/* Interactive Global Search Input */}
        <div ref={searchRef} className="relative hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search vendors, POs, MSAs..."
              value={searchQuery}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              className={cn(
                'h-8.5 w-56 rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-7',
                'text-xs text-slate-900 placeholder:text-slate-400 focus:w-72 transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500',
                'dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500',
              )}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSearchOpen(false);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Instant Live Search Results Popover Drawer */}
          {searchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute right-0 top-11 z-50 w-96 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-800 dark:bg-slate-950 animate-in fade-in-50 slide-in-from-top-2 max-h-[480px] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Search Results ({totalMatches})
                </span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                  Press ESC to close
                </span>
              </div>

              {totalMatches === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No matching vendors, POs, or contracts found for "{searchQuery}".
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Matching Vendors */}
                  {matchedVendors.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Building2 className="h-3 w-3 text-indigo-500" /> Vendors
                      </div>
                      <div className="space-y-1">
                        {matchedVendors.map((v) => (
                          <div
                            key={v.id}
                            onClick={() => {
                              navigate(`/vendors/${v.id}`);
                              setSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer group transition-colors"
                          >
                            <div>
                              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                {v.name}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {v.code} · {v.category}
                              </p>
                            </div>
                            <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-indigo-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Contracts */}
                  {matchedContracts.length > 0 && (
                    <div className="border-t border-slate-100 dark:border-slate-900 pt-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <FileText className="h-3 w-3 text-emerald-500" /> Contracts
                      </div>
                      <div className="space-y-1">
                        {matchedContracts.map((c) => (
                          <div
                            key={c.id}
                            onClick={() => {
                              navigate('/contracts');
                              setSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer group transition-colors"
                          >
                            <div>
                              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                {c.title}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {c.vendorName} · ${c.value.toLocaleString()}
                              </p>
                            </div>
                            <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-emerald-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Orders */}
                  {matchedOrders.length > 0 && (
                    <div className="border-t border-slate-100 dark:border-slate-900 pt-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <ShoppingCart className="h-3 w-3 text-amber-500" /> Purchase Orders
                      </div>
                      <div className="space-y-1">
                        {matchedOrders.map((o) => (
                          <div
                            key={o.id}
                            onClick={() => {
                              navigate('/orders');
                              setSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer group transition-colors"
                          >
                            <div>
                              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                                {o.poNumber} — {o.vendorName}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                Amount: ${o.totalAmount.toLocaleString()} · Status: {o.status}
                              </p>
                            </div>
                            <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-amber-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Refresh button */}
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

        {/* Interactive User Profile Avatar ("AD") */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            title="User profile menu"
            className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-md transition-all hover:scale-105 ring-2 ring-indigo-500/20 active:scale-95"
          >
            AD
          </button>

          {/* Profile Dropdown Modal */}
          {profileOpen && (
            <div className="absolute right-0 top-11 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-950 animate-in fade-in-50 slide-in-from-top-2 space-y-4">
              {/* User Header */}
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 font-bold text-white text-sm shadow-sm">
                    AD
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Admin User
                    </h4>
                    <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[9px] font-bold text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400">
                      Super Admin
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">admin@vendorms.com</p>
                </div>
              </div>

              {/* Quick Action Links */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/settings');
                    setProfileOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900 transition-colors"
                >
                  <Settings className="h-4 w-4 text-slate-400" />
                  <span>System Settings & Preferences</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate('/approvals');
                    setProfileOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900 transition-colors"
                >
                  <Shield className="h-4 w-4 text-slate-400" />
                  <span>Governance & Approvals</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate('/performance');
                    setProfileOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900 transition-colors"
                >
                  <BarChart3 className="h-4 w-4 text-slate-400" />
                  <span>Performance Scorecards</span>
                </button>
              </div>

              {/* Sign Out Action */}
              <div className="border-t border-slate-100 pt-2 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    showToast('Admin session signed out successfully');
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});
