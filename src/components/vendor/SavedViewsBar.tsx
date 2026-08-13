import { useState, useEffect } from 'react';
import { Bookmark, Plus, X, Sparkles } from 'lucide-react';
import type { SavedView, VendorFilterParams } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const PRESET_VIEWS: SavedView[] = [
  {
    id: 'all',
    name: 'All Vendors',
    isPreset: true,
    filters: {},
  },
  {
    id: 'top-rated',
    name: 'Top Rated (≥4.5 ⭐)',
    isPreset: true,
    filters: { minRating: 4.5 },
  },
  {
    id: 'pending',
    name: 'Pending Approvals',
    isPreset: true,
    filters: { statuses: ['pending'] },
  },
  {
    id: 'blacklisted',
    name: 'Blacklisted',
    isPreset: true,
    filters: { statuses: ['blacklisted'] },
  },
  {
    id: 'high-spend',
    name: 'High Spend (≥$1M)',
    isPreset: true,
    filters: { minPurchaseValue: 1000000 },
  },
];

const LOCAL_STORAGE_KEY = 'vms_saved_vendor_views';

interface SavedViewsBarProps {
  currentFilters: VendorFilterParams;
  activeViewId: string;
  onSelectView: (view: SavedView) => void;
}

export function SavedViewsBar({
  currentFilters,
  activeViewId,
  onSelectView,
}: SavedViewsBarProps) {
  const [customViews, setCustomViews] = useState<SavedView[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [newViewName, setNewViewName] = useState('');

  // Load custom saved views from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setCustomViews(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save views to localStorage
  const saveCustomViews = (views: SavedView[]) => {
    setCustomViews(views);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(views));
  };

  const handleSaveCurrent = () => {
    if (!newViewName.trim()) return;

    const newView: SavedView = {
      id: `custom-${Date.now()}`,
      name: newViewName.trim(),
      isPreset: false,
      filters: {
        search: currentFilters.search,
        categories: currentFilters.categories,
        statuses: currentFilters.statuses,
        minRating: currentFilters.minRating,
        minPurchaseValue: currentFilters.minPurchaseValue,
        cities: currentFilters.cities,
      },
    };

    const updated = [...customViews, newView];
    saveCustomViews(updated);
    onSelectView(newView);
    setNewViewName('');
    setIsSaving(false);
  };

  const handleDeleteView = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customViews.filter((v) => v.id !== id);
    saveCustomViews(updated);
    if (activeViewId === id) {
      onSelectView(PRESET_VIEWS[0]);
    }
  };

  const allViews = [...PRESET_VIEWS, ...customViews];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-950">
      {/* Scrollable pill buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
        <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 dark:text-slate-500 mr-1">
          <Bookmark className="h-3.5 w-3.5" />
          Views:
        </span>

        {allViews.map((view) => {
          const isActive = activeViewId === view.id;
          return (
            <button
              key={view.id}
              type="button"
              onClick={() => onSelectView(view)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap',
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white',
              )}
            >
              {!view.isPreset && <Sparkles className="h-3 w-3 text-amber-400" />}
              <span>{view.name}</span>

              {!view.isPreset && (
                <span
                  onClick={(e) => handleDeleteView(view.id, e)}
                  className="ml-1 rounded p-0.5 hover:bg-red-500/20 hover:text-red-300"
                >
                  <X className="h-3 w-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Save view action */}
      <div className="flex items-center gap-2">
        {isSaving ? (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              placeholder="View Name..."
              value={newViewName}
              onChange={(e) => setNewViewName(e.target.value)}
              className="h-7 w-36 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveCurrent();
                if (e.key === 'Escape') setIsSaving(false);
              }}
            />
            <Button size="xs" onClick={handleSaveCurrent} className="h-7 text-xs bg-indigo-600 text-white">
              Save
            </Button>
            <Button
              size="xs"
              variant="ghost"
              onClick={() => setIsSaving(false)}
              className="h-7 w-7 p-0"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="xs"
            onClick={() => setIsSaving(true)}
            className="h-7 gap-1 text-xs border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-600 dark:text-slate-300"
          >
            <Plus className="h-3.5 w-3.5" />
            Save Current View
          </Button>
        )}
      </div>
    </div>
  );
}
