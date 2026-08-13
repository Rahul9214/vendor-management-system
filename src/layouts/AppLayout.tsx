import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

/**
 * Root application layout.
 * Provides the two-panel structure: collapsible sidebar + scrollable main area.
 * All authenticated pages render inside the <Outlet />.
 */
export function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* ── Sidebar ── */}
      <Sidebar />

      {/* ── Main content ── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />

        <main
          id="main-content"
          className="flex-1 overflow-y-auto p-6"
          role="main"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
