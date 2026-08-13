import { memo } from 'react';
import { Ban, CheckCircle, Download, X } from 'lucide-react';
import type { Vendor, VendorStatus } from '@/types';
import { Button } from '@/components/ui/button';

interface BulkActionBarProps {
  selectedVendors: Vendor[];
  onClearSelection: () => void;
  onBatchStatusChange: (status: VendorStatus) => void;
  onExportSelected: () => void;
  isUpdating?: boolean;
}

export const BulkActionBar = memo(function BulkActionBar({
  selectedVendors,
  onClearSelection,
  onBatchStatusChange,
  onExportSelected,
  isUpdating = false,
}: BulkActionBarProps) {
  if (selectedVendors.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white shadow-2xl animate-in slide-in-from-bottom-5">
      <div className="flex items-center gap-2 border-r border-slate-700 pr-4">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
          {selectedVendors.length}
        </span>
        <span className="text-xs font-semibold text-slate-200">
          Selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="xs"
          variant="outline"
          disabled={isUpdating}
          onClick={() => onBatchStatusChange('active')}
          className="h-8 gap-1.5 border-emerald-600/40 bg-emerald-950/40 text-xs text-emerald-400 hover:bg-emerald-900/60"
        >
          <CheckCircle className="h-3.5 w-3.5" />
          Approve Selected
        </Button>

        <Button
          size="xs"
          variant="outline"
          disabled={isUpdating}
          onClick={() => onBatchStatusChange('blacklisted')}
          className="h-8 gap-1.5 border-red-600/40 bg-red-950/40 text-xs text-red-400 hover:bg-red-900/60"
        >
          <Ban className="h-3.5 w-3.5" />
          Blacklist Selected
        </Button>

        <Button
          size="xs"
          variant="outline"
          onClick={onExportSelected}
          className="h-8 gap-1.5 border-slate-700 bg-slate-800 text-xs text-slate-200 hover:bg-slate-700"
        >
          <Download className="h-3.5 w-3.5" />
          Export Selected
        </Button>
      </div>

      <button
        type="button"
        onClick={onClearSelection}
        className="ml-2 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
        title="Deselect all"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
});
