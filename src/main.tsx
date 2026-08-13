import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from '@/context/QueryProvider';
import { useUIStore } from '@/hooks/useUIStore';
import App from './App';
import './index.css';

// ── Apply persisted theme before first paint to avoid flash ──────────────────
const { theme } = useUIStore.getState();
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
}

// ── Mount ─────────────────────────────────────────────────────────────────────
const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found in index.html');

createRoot(root).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>,
);
