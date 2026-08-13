import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { LoadingScreen } from '@/components/shared/Skeleton';

// ─── Lazy-loaded pages (code splitting per route) ─────────────────────────────
const DashboardPage        = lazy(() => import('@/pages/Dashboard'));
const VendorsPage          = lazy(() => import('@/pages/Vendors'));
const VendorDetailPage     = lazy(() => import('@/pages/VendorDetail'));
const OnboardingPage       = lazy(() => import('@/pages/Onboarding'));
const PerformancePage      = lazy(() => import('@/pages/Performance'));
const ApprovalWorkflowPage = lazy(() => import('@/pages/ApprovalWorkflow'));
const NotificationsPage    = lazy(() => import('@/pages/Notifications'));
const SettingsPage         = lazy(() => import('@/pages/Settings'));
const ComingSoonPage       = lazy(() => import('@/pages/ComingSoon'));

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

          {/* Module 3 – Vendor Details (9 Tabs) */}
          <Route
            path="/vendors/:id"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <VendorDetailPage />
              </Suspense>
            }
          />

          {/* Module 4 – Vendor Onboarding Form */}
          <Route
            path="/onboarding"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <OnboardingPage />
              </Suspense>
            }
          />

          {/* Module 5 – Vendor Performance Dashboard */}
          <Route
            path="/performance"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <PerformancePage />
              </Suspense>
            }
          />

          {/* Module 6 – Approval Workflow & Governance */}
          <Route
            path="/approvals"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <ApprovalWorkflowPage />
              </Suspense>
            }
          />

          {/* Module 7 – Notifications & Alert Center */}
          <Route
            path="/notifications"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <NotificationsPage />
              </Suspense>
            }
          />

          {/* Module 8 – Responsive Experience & Settings */}
          <Route
            path="/settings"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <SettingsPage />
              </Suspense>
            }
          />

          {/* Catch-all route */}
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
