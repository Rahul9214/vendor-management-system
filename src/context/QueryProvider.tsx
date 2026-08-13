import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

// ─── QueryClient Configuration ────────────────────────────────────────────────
// Singleton instance – lives for the full app lifetime.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:          5 * 60 * 1000,   // 5 min  – cache treated as fresh
      gcTime:            10 * 60 * 1000,   // 10 min – unused cache purged
      retry:              2,
      // Exponential back-off: 1s → 2s → 4s … capped at 10s
      retryDelay: (attempt) => Math.min(1_000 * 2 ** attempt, 10_000),
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// ─── Provider ─────────────────────────────────────────────────────────────────

interface QueryProviderProps {
  readonly children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
