import { useState } from 'react';
import type { POStatus, POFilterParams } from '@/types';
import { useOrders } from '@/hooks/useOrders';
import { ErrorState } from '@/components/shared/ErrorState';
import { LoadingScreen } from '@/components/shared/Skeleton';
import { ShoppingCart, Search, Filter, Truck, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function OrdersPage() {
  const [filters, setFilters] = useState<POFilterParams>({
    search: '',
    status: 'all',
  });

  const { data: orders = [], isLoading, isError, refetch } = useOrders(filters);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <ErrorState
          title="Failed to load purchase orders"
          message="Could not retrieve order details."
          onRetry={() => void refetch()}
        />
      </div>
    );
  }

  const getStatusBadge = (status: POStatus) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="h-3 w-3" /> Delivered
          </span>
        );
      case 'in_transit':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            <Truck className="h-3 w-3" /> In Transit
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <Clock className="h-3 w-3" /> Pending Dispatch
          </span>
        );
      case 'delayed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-bold text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-800">
            <AlertTriangle className="h-3 w-3" /> Delayed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl space-y-6">
      {/* Page Hero Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <ShoppingCart className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Purchase Orders & Order Fulfillment
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Track active purchase orders, delivery SLAs, shipment status, and billing invoice payments.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search PO number or vendor..."
            value={filters.search || ''}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={filters.status || 'all'}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as POStatus | 'all' })}
            className="h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="all">All Order Statuses</option>
            <option value="delivered">Delivered</option>
            <option value="in_transit">In Transit</option>
            <option value="pending">Pending</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/40">
            <tr>
              <th className="py-3.5 pl-6 pr-3">PO Number</th>
              <th className="px-3 py-3.5">Vendor Name</th>
              <th className="px-3 py-3.5">Items & Description</th>
              <th className="px-3 py-3.5">Status</th>
              <th className="px-3 py-3.5">Total Amount</th>
              <th className="px-3 py-3.5">Order Date</th>
              <th className="px-3 py-3.5">Expected Delivery</th>
              <th className="py-3.5 pl-3 pr-6 text-right">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-xs text-slate-400">
                  No purchase orders found.
                </td>
              </tr>
            ) : (
              orders.map((po) => (
                <tr key={po.id} className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50">
                  <td className="py-4 pl-6 pr-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {po.poNumber}
                  </td>
                  <td className="px-3 py-4 font-semibold text-slate-900 dark:text-slate-100">
                    {po.vendorName}
                  </td>
                  <td className="px-3 py-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                    {po.itemsDescription} (Qty: {po.quantity})
                  </td>
                  <td className="px-3 py-4">{getStatusBadge(po.status)}</td>
                  <td className="px-3 py-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                    ${po.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-3 py-4 text-slate-500 font-mono text-[11px]">
                    {new Date(po.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-4 text-slate-500 font-mono text-[11px]">
                    {new Date(po.expectedDeliveryDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 pl-3 pr-6 text-right">
                    <span className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                      po.paymentStatus === 'paid'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : po.paymentStatus === 'partial'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {po.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
