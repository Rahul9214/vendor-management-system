import { memo, useState } from 'react';
import type { VendorPurchaseOrder } from '@/types';
import { Download, CheckCircle2, Clock, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PurchaseHistoryTabProps {
  purchaseOrders: VendorPurchaseOrder[];
}

export const PurchaseHistoryTab = memo(function PurchaseHistoryTab({
  purchaseOrders,
}: PurchaseHistoryTabProps) {
  const [search, setSearch] = useState('');

  const filtered = purchaseOrders.filter(
    (po) =>
      po.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      po.description.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusBadge = (status: VendorPurchaseOrder['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" /> Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">
            <Clock className="h-3 w-3" /> In Progress
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
            <Clock className="h-3 w-3" /> Pending Approval
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950/60 dark:text-red-400">
            <Ban className="h-3 w-3" /> Cancelled
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Purchase Orders History
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            All executed and active purchase order contracts for this vendor.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search PO # or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3">PO Number</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Issue Date</th>
                <th className="px-4 py-3">Delivery Date</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {po.poNumber}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200 max-w-xs truncate">
                    {po.description}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(po.issueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(po.deliveryDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                    {po.itemsCount} items
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">
                    ${po.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{getStatusBadge(po.status)}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="xs" className="h-7 w-7 p-0" title="Download PO PDF">
                      <Download className="h-3.5 w-3.5 text-slate-500 hover:text-indigo-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
