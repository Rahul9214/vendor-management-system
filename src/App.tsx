import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { LoadingScreen } from '@/components/shared/Skeleton';

// ─── Lazy-loaded pages (code splitting per route) ─────────────────────────────
const DashboardPage  = lazy(() => import('@/pages/Dashboard'));
const VendorsPage    = lazy(() => import('@/pages/Vendors'));
const ComingSoonPage = lazy(() => import('@/pages/ComingSoon'));

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Default redirect */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Module 1 – Vendor Dashboard */}
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <DashboardPage />
              </Suspense>
            }
          />

          {/* Module 2 – Vendor Directory */}
          <Route
            path="/vendors"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <VendorsPage />
              </Suspense>
            }
          />

          {/* Modules 3–8 – Coming soon placeholder */}
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <ComingSoonPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
