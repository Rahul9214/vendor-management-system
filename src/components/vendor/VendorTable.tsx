import { memo, useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type VisibilityState,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Building2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import type { Vendor, VendorFilterParams, VendorStatus } from '@/types';
import { VendorStatusBadge } from './VendorStatusBadge';
import { VendorRatingStars } from './VendorRatingStars';
import { VendorColumnToggle } from './VendorColumnToggle';
import { VendorExportModal } from './VendorExportModal';
import { VendorFilterDrawer } from './VendorFilterDrawer';
import { SavedViewsBar } from './SavedViewsBar';
import { VendorDetailSheet } from './VendorDetailSheet';
import { BulkActionBar } from './BulkActionBar';
import { useBatchUpdateStatus } from '@/hooks/useVendors';

interface VendorTableProps {
  vendors: Vendor[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  filters: VendorFilterParams;
  onFilterChange: (newFilters: VendorFilterParams) => void;
  onResetFilters: () => void;
}

const columnHelper = createColumnHelper<Vendor>();

export const VendorTable = memo(function VendorTable({
  vendors,
  totalCount,
  page,
  pageSize,
  totalPages,
  isLoading,
  filters,
  onFilterChange,
  onResetFilters,
}: VendorTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [selectedVendorDetail, setSelectedVendorDetail] = useState<Vendor | null>(null);
  const [activeViewId, setActiveViewId] = useState<string>('all');

  const batchUpdateMutation = useBatchUpdateStatus();

  // Handle column sort toggle
  const handleSortToggle = (field: keyof Vendor) => {
    const isCurrentField = filters.sortBy === field;
    let nextOrder: 'asc' | 'desc' | undefined = 'asc';

    if (isCurrentField) {
      if (filters.sortOrder === 'asc') nextOrder = 'desc';
      else if (filters.sortOrder === 'desc') nextOrder = undefined;
    }

    onFilterChange({
      ...filters,
      sortBy: nextOrder ? field : undefined,
      sortOrder: nextOrder,
    });
  };

  // Define Columns
  const columns = useMemo(
    () => [
      // Select Checkbox
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            aria-label="Select all vendors on current page"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            aria-label={`Select vendor ${row.original.name}`}
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            onClick={(e) => e.stopPropagation()}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900"
          />
        ),
        enableHiding: false,
      }),

      // Vendor Name
      columnHelper.accessor('name', {
        id: 'name',
        header: () => 'Vendor Name',
        cell: (info) => {
          const v = info.row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                {v.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {v.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] text-slate-400">{v.category}</span>
                  {v.website && (
                    <a
                      href={v.website}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${v.name} official website`}
                      title={`Visit ${v.name} official website`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-400 hover:text-indigo-500"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        },
      }),

      // Vendor Code
      columnHelper.accessor('code', {
        id: 'code',
        header: () => 'Vendor Code',
        cell: (info) => (
          <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            {info.getValue()}
          </span>
        ),
      }),

      // Category
      columnHelper.accessor('category', {
        id: 'category',
        header: () => 'Category',
        cell: (info) => (
          <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {info.getValue()}
          </span>
        ),
      }),

      // Contact Person
      columnHelper.accessor('contactPerson', {
        id: 'contactPerson',
        header: () => 'Contact Person',
        cell: (info) => {
          const v = info.row.original;
          return (
            <div>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                {v.contactPerson}
              </p>
              <p className="text-[11px] text-slate-400 truncate max-w-[150px]">
                {v.contactEmail}
              </p>
            </div>
          );
        },
      }),

      // City / Location
      columnHelper.accessor('city', {
        id: 'city',
        header: () => 'City',
        cell: (info) => {
          const v = info.row.original;
          return (
            <span className="text-xs text-slate-700 dark:text-slate-300">
              {v.city}, {v.country}
            </span>
          );
        },
      }),

      // Rating
      columnHelper.accessor('rating', {
        id: 'rating',
        header: () => 'Rating',
        cell: (info) => <VendorRatingStars rating={info.getValue()} />,
      }),

      // Status
      columnHelper.accessor('status', {
        id: 'status',
        header: () => 'Status',
        cell: (info) => <VendorStatusBadge status={info.getValue()} />,
      }),

      // Last Transaction
      columnHelper.accessor('lastTransactionDate', {
        id: 'lastTransactionDate',
        header: () => 'Last Transaction',
        cell: (info) => {
          const v = info.row.original;
          return (
            <div>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                ${v.lastTransactionAmount.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-400">
                {new Date(v.lastTransactionDate).toLocaleDateString()}
              </p>
            </div>
          );
        },
      }),

      // Total Purchase Value
      columnHelper.accessor('totalValue', {
        id: 'totalValue',
        header: () => 'Total Spend',
        cell: (info) => (
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
            ${info.getValue().toLocaleString()}
          </span>
        ),
      }),
    ],
    [],
  );

  // TanStack Table Instance
  const table = useReactTable({
    data: vendors,
    columns,
    state: {
      columnVisibility,
      rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  // Selected Vendors Array
  const selectedVendors = useMemo(
    () =>
      Object.keys(rowSelection)
        .filter((id) => rowSelection[id])
        .map((id) => vendors.find((v) => v.id === id)!)
        .filter(Boolean),
    [rowSelection, vendors],
  );

  const handleBatchStatusChange = (status: VendorStatus) => {
    const ids = selectedVendors.map((v) => v.id);
    batchUpdateMutation.mutate(
      { ids, status },
      {
        onSuccess: () => setRowSelection({}),
      },
    );
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
      {/* ── Saved Views Bar ── */}
      <SavedViewsBar
        currentFilters={filters}
        activeViewId={activeViewId}
        onSelectView={(view) => {
          setActiveViewId(view.id);
          onFilterChange({
            ...filters,
            ...view.filters,
            page: 1,
          });
        }}
      />

      {/* ── Table Toolbar (Search, Filter Drawer, Column Selector, Export) ── */}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            id="vendor-search-input"
            aria-label="Search vendors by name, code, contact person, or city"
            placeholder="Search vendor name, code, contact, city..."
            value={filters.search || ''}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value, page: 1 })
            }
            className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3.5 pl-9 text-xs text-slate-900 placeholder-slate-400 shadow-xs focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
          <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          {filters.search && (
            <button
              type="button"
              aria-label="Clear vendor search text"
              onClick={() => onFilterChange({ ...filters, search: '', page: 1 })}
              className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <VendorFilterDrawer
            filters={filters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
          />
          <VendorColumnToggle table={table} />
          <VendorExportModal
            vendors={vendors}
            selectedVendors={selectedVendors}
          />
        </div>
      </div>

      {/* ── Main Data Table (Sticky Header & Horizontal Scroll) ── */}
      <div className="relative min-h-[400px] overflow-x-auto overflow-y-auto max-h-[600px]">
        <table className="w-full text-left text-xs border-collapse">
          {/* Sticky Header */}
          <thead className="sticky top-0 z-10 bg-slate-100 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const fieldKey = header.id as keyof Vendor;
                  const isSortable = [
                    'name',
                    'code',
                    'rating',
                    'status',
                    'lastTransactionDate',
                    'totalValue',
                  ].includes(header.id);

                  const isSorted = filters.sortBy === fieldKey;
                  const sortOrder = filters.sortOrder;

                  return (
                    <th
                      key={header.id}
                      className="px-4 py-3.5 font-semibold tracking-wide select-none"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center gap-1.5 ${
                            isSortable ? 'cursor-pointer hover:text-indigo-600' : ''
                          }`}
                          onClick={() => isSortable && handleSortToggle(fieldKey)}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {isSortable && (
                            <span className="text-slate-400">
                              {isSorted ? (
                                sortOrder === 'asc' ? (
                                  <ArrowUp className="h-3.5 w-3.5 text-indigo-600" />
                                ) : (
                                  <ArrowDown className="h-3.5 w-3.5 text-indigo-600" />
                                )
                              ) : (
                                <ArrowUpDown className="h-3 w-3 opacity-40 hover:opacity-100" />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td colSpan={columns.length} className="px-4 py-3.5">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                  </td>
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-16 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Building2 className="h-8 w-8 text-slate-300" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      No vendors match your search criteria.
                    </p>
                    <p className="text-xs text-slate-400">
                      Try adjusting filters or clear your search input.
                    </p>
                    <button
                      type="button"
                      onClick={onResetFilters}
                      className="mt-2 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedVendorDetail(row.original)}
                  className={`group cursor-pointer transition-colors ${
                    row.getIsSelected()
                      ? 'bg-indigo-50/60 dark:bg-indigo-950/30'
                      : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 align-middle">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination Footer ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            aria-label="Rows per page"
            onChange={(e) =>
              onFilterChange({
                ...filters,
                pageSize: Number(e.target.value),
                page: 1,
              })
            }
            className="h-8 rounded-lg border border-slate-200 bg-slate-50 px-2 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 focus:outline-none"
          >
            {[10, 25, 50].map((sz) => (
              <option key={sz} value={sz}>
                {sz}
              </option>
            ))}
          </select>
          <span className="hidden sm:inline text-slate-400">
            Showing {totalCount > 0 ? (page - 1) * pageSize + 1 : 0} to{' '}
            {Math.min(page * pageSize, totalCount)} of {totalCount} vendors
          </span>
        </div>

        {/* Page navigation buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onFilterChange({ ...filters, page: 1 })}
            aria-label="Go to first page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="First Page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onFilterChange({ ...filters, page: page - 1 })}
            aria-label="Go to previous page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Previous Page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="px-3 font-semibold text-slate-700 dark:text-slate-300">
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onFilterChange({ ...filters, page: page + 1 })}
            aria-label="Go to next page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Next Page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onFilterChange({ ...filters, page: totalPages })}
            aria-label="Go to last page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Last Page"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      <BulkActionBar
        selectedVendors={selectedVendors}
        onClearSelection={() => setRowSelection({})}
        onBatchStatusChange={handleBatchStatusChange}
        onExportSelected={() => {
          // Open export modal scoped to selected
        }}
        isUpdating={batchUpdateMutation.isPending}
      />

      {/* Slide-over Detail Sheet */}
      <VendorDetailSheet
        vendor={selectedVendorDetail}
        onClose={() => setSelectedVendorDetail(null)}
      />
    </div>
  );
});
