import { memo } from 'react';
import { Building2, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PerformanceFilterParams } from '@/types';

interface VendorSelectorBarProps {
  filters: PerformanceFilterParams;
  onFilterChange: (newFilters: PerformanceFilterParams) => void;
  onExportReport?: () => void;
}

export const VendorSelectorBar = memo(function VendorSelectorBar({
  filters,
  onFilterChange,
  onExportReport,
}: VendorSelectorBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Vendor Selector Dropdown */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Vendor Scorecard:
          </span>
        </div>

        <select
          value={filters.vendorId || 'all'}
          onChange={(e) =>
            onFilterChange({ ...filters, vendorId: e.target.value })
          }
          className="h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-900 shadow-xs focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="all">All Enterprise Vendors (Fleet Average)</option>
          <option value="vnd-001">Acme Global Logistics (VND-2024-001)</option>
          <option value="vnd-002">Apex Semiconductor Systems (VND-2024-002)</option>
          <option value="vnd-003">Vortex Industrial Materials (VND-2024-003)</option>
        </select>
      </div>

      {/* Time Range Pills + Export Button */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <span className="text-slate-400 px-2 text-xs flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
          </span>
          {[
            { label: '30D', val: '30_days' },
            { label: '90D', val: '90_days' },
            { label: '12M', val: '12_months' },
            { label: 'YTD', val: 'ytd' },
          ].map((opt) => {
            const isSelected = (filters.timeRange || '12_months') === opt.val;
            return (
              <button
                key={opt.val}
                type="button"
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    timeRange: opt.val as PerformanceFilterParams['timeRange'],
                  })
                }
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onExportReport}
          className="h-9 gap-1.5 text-xs font-semibold text-slate-700 border-slate-200 dark:border-slate-800 dark:text-slate-300"
        >
          <Download className="h-4 w-4 text-slate-500" />
          Export Report
        </Button>
      </div>
    </div>
  );
});
