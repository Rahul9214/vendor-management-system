import { memo } from 'react';
import type { VendorPaymentRecord } from '@/types';
import { CreditCard, DollarSign, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PaymentsTabProps {
  payments: VendorPaymentRecord[];
}

export const PaymentsTab = memo(function PaymentsTab({ payments }: PaymentsTabProps) {
  const totalPaid = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter((p) => p.status === 'pending' || p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Financial Summary Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs font-semibold text-slate-500">Total Settled Payments</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            ${totalPaid.toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-500 font-semibold">100% verified ACH</span>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-semibold text-slate-500">Outstanding Balance</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            ${totalPending.toLocaleString()}
          </p>
          <span className="text-[10px] text-amber-500 font-semibold">Due within 30 days</span>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
            <CreditCard className="h-4 w-4" />
            <span className="text-xs font-semibold text-slate-500">Primary Payment Terms</span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">Net 30</p>
          <span className="text-[10px] text-indigo-500 font-semibold">Standard corporate terms</span>
        </div>
      </div>

      {/* Verified Banking Info Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                Verified Banking Account Details
              </h4>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                Encrypted & Verified
              </span>
            </div>
            <p className="text-xs font-mono text-slate-500 mt-0.5">
              Chase JPMorgan Chase Bank · Routing: *****0912 · Account: ********8891
            </p>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Recent Payment Transactions & Invoices
        </h3>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Issue Date</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Paid Date</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-slate-100">
                    {p.invoiceNumber}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(p.issueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(p.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {p.paidDate ? new Date(p.paidDate).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">
                    {p.paymentMethod}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">
                    ${p.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {p.status === 'paid' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" /> Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                        <Clock className="h-3 w-3" /> Pending
                      </span>
                    )}
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
