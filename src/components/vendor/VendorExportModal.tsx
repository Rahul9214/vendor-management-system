import { useState } from 'react';
import { Download, FileSpreadsheet, FileJson, CheckCircle2 } from 'lucide-react';
import type { Vendor } from '@/types';
import { Button } from '@/components/ui/button';

interface VendorExportModalProps {
  vendors: Vendor[];
  selectedVendors?: Vendor[];
}

export function VendorExportModal({
  vendors,
  selectedVendors = [],
}: VendorExportModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [exportScope, setExportScope] = useState<'all' | 'selected'>(
    selectedVendors.length > 0 ? 'selected' : 'all',
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const targetData =
    exportScope === 'selected' && selectedVendors.length > 0
      ? selectedVendors
      : vendors;

  const handleExport = () => {
    if (targetData.length === 0) return;

    if (format === 'csv') {
      const headers = [
        'ID',
        'Vendor Code',
        'Vendor Name',
        'Category',
        'Status',
        'Rating',
        'Contact Person',
        'Contact Email',
        'Contact Phone',
        'Country',
        'City',
        'Last Transaction Date',
        'Last Transaction Amount ($)',
        'Total Purchase Value ($)',
        'Compliance Score',
      ];

      const rows = targetData.map((v) => [
        `"${v.id}"`,
        `"${v.code}"`,
        `"${v.name.replace(/"/g, '""')}"`,
        `"${v.category}"`,
        `"${v.status}"`,
        v.rating,
        `"${v.contactPerson.replace(/"/g, '""')}"`,
        `"${v.contactEmail}"`,
        `"${v.contactPhone}"`,
        `"${v.country}"`,
        `"${v.city}"`,
        `"${v.lastTransactionDate}"`,
        v.lastTransactionAmount,
        v.totalValue,
        v.complianceScore,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join(
        '\n',
      );

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `vendor_directory_${new Date().toISOString().slice(0, 10)}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const jsonContent = JSON.stringify(targetData, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `vendor_directory_${new Date().toISOString().slice(0, 10)}.json`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setToastMessage(
      `Exported ${targetData.length} vendors as ${format.toUpperCase()}!`,
    );
    setIsOpen(false);

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="h-9 gap-2 border-slate-200 bg-white text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Download className="h-4 w-4 text-slate-500" />
        <span>Export</span>
      </Button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <Download className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Export Vendor Directory
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Download dataset in your preferred format
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {/* Scope Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Export Scope
                </label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setExportScope('all')}
                    className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                      exportScope === 'all'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="text-xs font-semibold">
                      All Filtered ({vendors.length})
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Entire current view
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={selectedVendors.length === 0}
                    onClick={() => setExportScope('selected')}
                    className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                      selectedVendors.length === 0
                        ? 'opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800'
                        : exportScope === 'selected'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="text-xs font-semibold">
                      Selected Rows ({selectedVendors.length})
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Checkbox selection
                    </span>
                  </button>
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  File Format
                </label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormat('csv')}
                    className={`flex items-center gap-2 rounded-xl border p-3 transition-all ${
                      format === 'csv'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
                    <div className="text-left">
                      <p className="text-xs font-semibold">CSV Excel</p>
                      <p className="text-[10px] text-slate-400">.csv table</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormat('json')}
                    className={`flex items-center gap-2 rounded-xl border p-3 transition-all ${
                      format === 'json'
                        ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <FileJson className="h-4 w-4 text-amber-500" />
                    <div className="text-left">
                      <p className="text-xs font-semibold">JSON Raw</p>
                      <p className="text-[10px] text-slate-400">.json data</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleExport}
                className="gap-2 bg-indigo-600 text-white hover:bg-indigo-700 text-xs"
              >
                <Download className="h-3.5 w-3.5" />
                Download {targetData.length} Records
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-900 p-4 text-white shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <p className="text-xs font-medium">{toastMessage}</p>
        </div>
      )}
    </>
  );
}
