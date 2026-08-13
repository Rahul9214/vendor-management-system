import { useState, useCallback } from 'react';
import type { VendorFilterParams } from '@/types';
import { useVendors } from '@/hooks/useVendors';
import { VendorTable } from '@/components/vendor/VendorTable';
import { ErrorState } from '@/components/shared/ErrorState';
import { Building2, CheckCircle2, Clock, Ban } from 'lucide-react';

export default function VendorsPage() {
  const [filters, setFilters] = useState<VendorFilterParams>({
    page: 1,
    pageSize: 10,
  });

  const { data, isLoading, isError, refetch } = useVendors(filters);

  const handleFilterChange = useCallback((newFilters: VendorFilterParams) => {
    setFilters(newFilters);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters({
      page: 1,
      pageSize: 10,
    });
  }, []);

  const vendors = data?.data ?? [];
  const totalCount = data?.total ?? 0;
  const page = data?.page ?? 1;
  const pageSize = data?.limit ?? 10;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="mx-auto max-w-screen-2xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
            Vendor Directory
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Manage, filter, and audit all enterprise supplier profiles and purchase histories.
          </p>
        </div>

        {/* Quick summary stats pills */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <Building2 className="h-4 w-4 text-indigo-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {totalCount}
            </span>
            <span className="text-[11px] text-slate-400">Total</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Active
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <Clock className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Pending
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <Ban className="h-4 w-4 text-red-500" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Blacklisted
            </span>
          </div>
        </div>
      </div>

      {/* Main Vendor Data Table or Error State */}
      {isError ? (
        <ErrorState
          title="Failed to load vendor directory"
          message="Could not retrieve vendor records. Check network connectivity."
          onRetry={() => void refetch()}
        />
      ) : (
        <VendorTable
          vendors={vendors}
          totalCount={totalCount}
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          isLoading={isLoading}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
}
