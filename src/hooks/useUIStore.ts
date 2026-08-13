import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ─── Types ────────────────────────────────────────────────────────────────────

type Theme = 'light' | 'dark';

interface UIState {
  sidebarCollapsed: boolean;
  theme: Theme;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// ─── DOM Helpers ──────────────────────────────────────────────────────────────

const applyThemeToDom = (theme: Theme): void => {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      theme: 'light' as Theme,

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (collapsed: boolean) =>
        set({ sidebarCollapsed: collapsed }),

      setTheme: (theme: Theme) => {
        applyThemeToDom(theme);
        set({ theme });
      },

      toggleTheme: () =>
        set((state) => {
          const next: Theme = state.theme === 'light' ? 'dark' : 'light';
          applyThemeToDom(next);
          return { theme: next };
        }),
    }),
    {
      name: 'vms-ui-preferences',
      storage: createJSONStorage(() => localStorage),
      // Only persist stable preferences, not transient UI state
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        // Re-apply persisted theme immediately after hydration
        if (state?.theme) {
          applyThemeToDom(state.theme);
        }
      },
    },
  ),
);

// ─── Memoised Selectors ───────────────────────────────────────────────────────
// Using granular selectors prevents components from re-rendering
// when unrelated parts of the store change.

export const useSidebarCollapsed  = () => useUIStore((s) => s.sidebarCollapsed);
export const useTheme              = () => useUIStore((s) => s.theme);
export const useToggleSidebar      = () => useUIStore((s) => s.toggleSidebar);
export const useToggleTheme        = () => useUIStore((s) => s.toggleTheme);
export const useSetSidebarCollapsed = () => useUIStore((s) => s.setSidebarCollapsed);
