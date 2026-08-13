import { useState, useRef, useEffect } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import type { VendorCategory, VendorStatus, VendorFilterParams } from '@/types';
import { Button } from '@/components/ui/button';
import { useAvailableCities } from '@/hooks/useVendors';

interface VendorFilterDrawerProps {
  filters: VendorFilterParams;
  onFilterChange: (newFilters: VendorFilterParams) => void;
  onResetFilters: () => void;
}

const CATEGORIES: VendorCategory[] = [
  'Technology',
  'Manufacturing',
  'Logistics',
  'Raw Materials',
  'Services',
  'Healthcare',
  'Finance',
  'Others',
];

const STATUSES: { label: string; value: VendorStatus }[] = [
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Blacklisted', value: 'blacklisted' },
  { label: 'Inactive', value: 'inactive' },
];

export function VendorFilterDrawer({
  filters,
  onFilterChange,
  onResetFilters,
}: VendorFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: availableCities = [] } = useAvailableCities();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeCount =
    (filters.categories?.length || 0) +
    (filters.statuses?.length || 0) +
    (filters.cities?.length || 0) +
    (filters.minRating ? 1 : 0) +
    (filters.minPurchaseValue ? 1 : 0);

  const handleCategoryToggle = (category: VendorCategory) => {
    const current = filters.categories || [];
    const updated = current.includes(category)
      ? current.filter((c: VendorCategory) => c !== category)
      : [...current, category];
    onFilterChange({ ...filters, categories: updated, page: 1 });
  };

  const handleStatusToggle = (status: VendorStatus) => {
    const current = filters.statuses || [];
    const updated = current.includes(status)
      ? current.filter((s: VendorStatus) => s !== status)
      : [...current, status];
    onFilterChange({ ...filters, statuses: updated, page: 1 });
  };

  const handleCityToggle = (city: string) => {
    const current = filters.cities || [];
    const updated = current.includes(city)
      ? current.filter((c: string) => c !== city)
      : [...current, city];
    onFilterChange({ ...filters, cities: updated, page: 1 });
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-9 gap-2 border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Filter className="h-4 w-4 text-slate-500" />
        <span>Filter</span>
        {activeCount > 0 && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
            {activeCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-30 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in-50 zoom-in-95">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                Filter Vendors
              </h4>
            </div>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={onResetFilters}
                className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-red-500"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            )}
          </div>

          <div className="mt-3 max-h-96 overflow-y-auto space-y-4 pr-1">
            {/* Status Filter */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Status
              </label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {STATUSES.map((st) => {
                  const isSelected = filters.statuses?.includes(st.value);
                  return (
                    <button
                      key={st.value}
                      type="button"
                      onClick={() => handleStatusToggle(st.value)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Category
              </label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => {
                  const isSelected = filters.categories?.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryToggle(cat)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Min. Rating
              </label>
              <div className="mt-1.5 flex items-center gap-1.5">
                {[0, 3.5, 4.0, 4.5].map((val) => {
                  const isSelected = (filters.minRating ?? 0) === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() =>
                        onFilterChange({
                          ...filters,
                          minRating: val === 0 ? undefined : val,
                          page: 1,
                        })
                      }
                      className={`flex-1 rounded-lg py-1 text-xs font-medium transition-all text-center ${
                        isSelected
                          ? 'bg-amber-500 text-white font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {val === 0 ? 'Any' : `${val}+ ⭐`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Min Purchase Value Filter */}
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Min. Total Spend
              </label>
              <div className="mt-1.5 flex items-center gap-1.5">
                {[
                  { label: 'Any', val: undefined },
                  { label: '$100K+', val: 100000 },
                  { label: '$1M+', val: 1000000 },
                ].map((opt) => {
                  const isSelected = filters.minPurchaseValue === opt.val;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() =>
                        onFilterChange({
                          ...filters,
                          minPurchaseValue: opt.val,
                          page: 1,
                        })
                      }
                      className={`flex-1 rounded-lg py-1 text-xs font-medium transition-all text-center ${
                        isSelected
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* City Filter */}
            {availableCities.length > 0 && (
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Location / City
                </label>
                <div className="mt-1.5 flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                  {availableCities.map((city) => {
                    const isSelected = filters.cities?.includes(city);
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => handleCityToggle(city)}
                        className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {city}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800 flex justify-end gap-2">
            <Button
              size="xs"
              onClick={() => setIsOpen(false)}
              className="bg-indigo-600 text-white text-xs"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
