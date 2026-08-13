import { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, IMPLEMENTED_MODULES } from '@/constants/navigation';
import { useSidebarCollapsed, useToggleSidebar } from '@/hooks/useUIStore';

// ─── Module Badge ─────────────────────────────────────────────────────────────

function ComingSoonBadge() {
  return (
    <span className="ml-auto rounded-full bg-slate-700 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
      Soon
    </span>
  );
}

// ─── Sidebar Component ────────────────────────────────────────────────────────

export const Sidebar = memo(function Sidebar() {
  const collapsed     = useSidebarCollapsed();
  const toggleSidebar = useToggleSidebar();
  const { pathname }  = useLocation();

  return (
    <aside
      className={cn(
        'relative flex h-screen flex-shrink-0 flex-col border-r border-slate-800 bg-slate-950 transition-all duration-300 ease-in-out',
        collapsed ? 'w-[68px]' : 'w-64',
      )}
    >
      {/* ── Logo ── */}
      <div className={cn(
        'flex h-16 items-center border-b border-slate-800 px-4 transition-all duration-300',
        collapsed ? 'justify-center' : 'gap-3',
      )}>
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-600">
          <Layers className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0 overflow-hidden">
            <p className="truncate text-sm font-bold text-white">VendorMS</p>
            <p className="truncate text-[10px] text-slate-400">Management System</p>
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        <ul className="space-y-0.5 px-2">
          {NAV_ITEMS.map((item) => {
            const isImplemented = IMPLEMENTED_MODULES.has(item.module);
            const isActive      = pathname.startsWith(item.path);
            const Icon          = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : isImplemented
                      ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      : 'cursor-default text-slate-600 hover:bg-slate-900 hover:text-slate-500',
                    collapsed && 'justify-center px-0',
                  )}
                  onClick={!isImplemented ? (e) => e.preventDefault() : undefined}
                >
                  <Icon
                    className={cn(
                      'h-4.5 w-4.5 flex-shrink-0 transition-transform duration-150 group-hover:scale-110',
                      isActive ? 'text-white' : '',
                    )}
                    size={18}
                  />

                  {!collapsed && (
                    <>
                      <span className="truncate">{item.label}</span>
                      {!isImplemented && <ComingSoonBadge />}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Module counter ── */}
      {!collapsed && (
        <div className="mx-3 mb-3 rounded-lg bg-slate-900 px-3 py-2">
          <p className="text-[10px] font-medium text-slate-500">
            1 of 8 modules active
          </p>
          <div className="mt-1.5 flex gap-0.5">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'h-1 flex-1 rounded-full',
                  IMPLEMENTED_MODULES.has(item.module)
                    ? 'bg-indigo-500'
                    : 'bg-slate-700',
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Toggle Button ── */}
      <button
        type="button"
        onClick={toggleSidebar}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 shadow-md transition-colors hover:bg-slate-800 hover:text-white"
      >
        {collapsed
          ? <ChevronRight className="h-3 w-3" />
          : <ChevronLeft  className="h-3 w-3" />}
      </button>
    </aside>
  );
});
