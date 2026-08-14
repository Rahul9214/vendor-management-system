import { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Layers, X, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, IMPLEMENTED_MODULES } from '@/constants/navigation';
import { useSidebarCollapsed, useToggleSidebar } from '@/hooks/useUIStore';

// ─── Module Badge ─────────────────────────────────────────────────────────────

function ComingSoonBadge() {
  return (
    <span className="ml-auto rounded-full bg-slate-200 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-400">
      Soon
    </span>
  );
}

// ─── Sidebar Component ────────────────────────────────────────────────────────

export const Sidebar = memo(function Sidebar() {
  const collapsed     = useSidebarCollapsed();
  const toggleSidebar = useToggleSidebar();
  const { pathname }  = useLocation();

  const totalModules = NAV_ITEMS.length;
  const activeCount  = NAV_ITEMS.filter((i) => IMPLEMENTED_MODULES.has(i.module)).length;

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop (Visible when open on mobile) */}
      {!collapsed && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden animate-in fade-in-50"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out lg:static lg:z-auto',
          'border-r border-slate-200/80 bg-white/95 text-slate-800 shadow-sm backdrop-blur-md',
          'dark:border-slate-800/80 dark:bg-slate-950 dark:text-slate-100',
          collapsed ? '-translate-x-full lg:translate-x-0 lg:w-[60px]' : 'translate-x-0 w-56',
        )}
      >
        {/* ── Logo Header ── */}
        <div
          className={cn(
            'flex h-16 items-center border-b border-slate-100 px-3.5 transition-all duration-300 justify-between dark:border-slate-800/80',
            collapsed ? 'lg:justify-center' : '',
          )}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-500/20">
              <Layers className="h-4 w-4 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0 overflow-hidden">
                <p className="truncate text-xs font-extrabold tracking-tight text-slate-900 dark:text-white">
                  VendorMS
                </p>
                <p className="truncate text-[10px] font-medium text-slate-400">
                  Enterprise System
                </p>
              </div>
            )}
          </div>

          {/* Close button for mobile drawer */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* ── Navigation Stream ── */}
        <nav className="flex-1 overflow-y-auto no-scrollbar py-3">
          <ul className="space-y-1 px-2">
            {NAV_ITEMS.map((item) => {
              const isImplemented = IMPLEMENTED_MODULES.has(item.module);
              const isActive      = pathname.startsWith(item.path);
              const Icon          = item.icon;

              return (
                <li key={item.id} className="relative group">
                  <NavLink
                    to={item.path}
                    className={cn(
                      'flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition-all duration-150',
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                        : isImplemented
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/90 dark:hover:text-white'
                        : 'cursor-default text-slate-400 hover:bg-slate-50 dark:text-slate-600 dark:hover:bg-slate-950',
                      collapsed && 'lg:justify-center lg:px-0',
                    )}
                    onClick={!isImplemented ? (e) => e.preventDefault() : undefined}
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4 flex-shrink-0 transition-transform duration-150 group-hover:scale-110',
                        isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400',
                      )}
                    />

                    {!collapsed && (
                      <>
                        <span className="truncate">{item.label}</span>
                        {!isImplemented && <ComingSoonBadge />}
                      </>
                    )}
                  </NavLink>

                  {/* Floating tooltip popover for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-14 top-1/2 -translate-y-1/2 z-50 hidden group-hover:flex items-center gap-2 rounded-xl bg-slate-900/95 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl border border-slate-700/80 whitespace-nowrap backdrop-blur-md pointer-events-none animate-in fade-in-50 slide-in-from-left-2">
                      <span>{item.label}</span>
                      <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-bold text-indigo-300">
                        Mod {item.module}
                      </span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Visual Appealing Module Counter Footer ── */}
        {!collapsed && (
          <div className="mx-2.5 mb-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-3 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-200">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> System Active
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-extrabold text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400">
                {activeCount}/{totalModules} Unlocked
              </span>
            </div>

            {/* Gradient progress bar */}
            <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${(activeCount / totalModules) * 100}%` }}
              />
            </div>

            <p className="text-[9px] text-slate-400 text-center font-medium">
              Enterprise VMS Operational 🟢
            </p>
          </div>
        )}

        {/* ── Desktop Collapse Toggle Button ── */}
        <button
          type="button"
          onClick={toggleSidebar}
          title={collapsed ? 'Expand sidebar navigation' : 'Collapse sidebar navigation'}
          aria-label={collapsed ? 'Expand sidebar navigation' : 'Collapse sidebar navigation'}
          className="hidden lg:flex absolute -right-3 top-20 h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-all hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {collapsed
            ? <ChevronRight className="h-3 w-3" />
            : <ChevronLeft  className="h-3 w-3" />}
        </button>
      </aside>
    </>
  );
});
