import { cn } from '@/lib/utils';

// ─── Primitive Skeleton ───────────────────────────────────────────────────────

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-slate-200 dark:bg-slate-700',
        className,
      )}
    />
  );
}

// ─── KPI Card Skeleton ────────────────────────────────────────────────────────

export function KPICardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <Skeleton className="h-11 w-11 rounded-xl" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="mt-5 space-y-2">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-4 w-36" />
      </div>
    </div>
  );
}

// ─── Chart Card Skeleton ──────────────────────────────────────────────────────

export function ChartCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}

// ─── Full Dashboard Skeleton ──────────────────────────────────────────────────

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <KPICardSkeleton key={i} />
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3"><ChartCardSkeleton /></div>
        <div className="xl:col-span-2"><ChartCardSkeleton /></div>
      </div>

      {/* Charts row 2 */}
      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-2"><ChartCardSkeleton /></div>
        <div className="xl:col-span-3"><ChartCardSkeleton /></div>
      </div>
    </div>
  );
}

// ─── Full-screen Loading ──────────────────────────────────────────────────────

export function LoadingScreen() {
  return (
    <div className="flex h-full items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600 dark:border-indigo-900 dark:border-t-indigo-400" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Loading…
        </p>
      </div>
    </div>
  );
}
