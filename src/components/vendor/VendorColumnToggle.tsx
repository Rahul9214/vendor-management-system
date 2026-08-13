import { useState, useRef, useEffect } from 'react';
import { Columns3, Check } from 'lucide-react';
import type { Table, Column } from '@tanstack/react-table';
import type { Vendor } from '@/types';
import { Button } from '@/components/ui/button';

interface VendorColumnToggleProps {
  table: Table<Vendor>;
}

const COLUMN_LABELS: Record<string, string> = {
  name: 'Vendor Name',
  code: 'Vendor Code',
  category: 'Category',
  contactPerson: 'Contact Person',
  city: 'City',
  rating: 'Rating',
  status: 'Status',
  lastTransactionDate: 'Last Transaction',
  totalValue: 'Total Purchase Value',
};

export function VendorColumnToggle({ table }: VendorColumnToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleableColumns = table
    .getAllColumns()
    .filter(
      (col: Column<Vendor, unknown>) =>
        col.getCanHide() && col.id in COLUMN_LABELS,
    );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-9 gap-2 border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Columns3 className="h-4 w-4 text-slate-500" />
        <span>Columns</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-30 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in-50 zoom-in-95">
          <div className="mb-2 border-b border-slate-100 px-2 py-1 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              Toggle Columns
            </p>
            <p className="text-[10px] text-slate-400">
              Show or hide table fields
            </p>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-0.5">
            {toggleableColumns.map((column: Column<Vendor, unknown>) => {
              const isVisible = column.getIsVisible();
              const label = COLUMN_LABELS[column.id] || column.id;

              return (
                <button
                  key={column.id}
                  type="button"
                  onClick={() => column.toggleVisibility(!isVisible)}
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <span className="font-medium">{label}</span>
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                      isVisible
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {isVisible && <Check className="h-3 w-3" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-2 border-t border-slate-100 pt-2 px-1 dark:border-slate-800 flex justify-between">
            <button
              type="button"
              onClick={() => table.setColumnVisibility({})}
              className="text-[11px] font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Reset to default
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
