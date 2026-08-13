import { memo } from 'react';
import type { VendorContract } from '@/types';
import { DollarSign, FileText, Clock, RefreshCw } from 'lucide-react';

interface ContractKpiCardsProps {
  contracts: VendorContract[];
}

export const ContractKpiCards = memo(function ContractKpiCards({
  contracts,
}: ContractKpiCardsProps) {
  const totalValue = contracts.reduce((acc, c) => acc + c.value, 0);
  const activeCount = contracts.filter((c) => c.status === 'active').length;
  const expiringSoonCount = contracts.filter((c) => c.status === 'expiring_soon').length;
  const autoRenewCount = contracts.filter((c) => c.autoRenewal).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Total Contract Value */}
      <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
            Portfolio Value
          </span>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            ${totalValue.toLocaleString()}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Total Active Contract Commitments
          </p>
        </div>
      </div>

      {/* 2. Active Contracts */}
      <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <FileText className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            Active MSAs
          </span>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            {activeCount}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Fully Executed Legal Contracts
          </p>
        </div>
      </div>

      {/* 3. Expiring Soon */}
      <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
            Next 60 Days
          </span>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400 sm:text-3xl">
            {expiringSoonCount}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Contracts Requiring Renewal
          </p>
        </div>
      </div>

      {/* 4. Auto-Renewal Clauses */}
      <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
            <RefreshCw className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
            Auto-Renew
          </span>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            {autoRenewCount}
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-500">
            Evergreen Auto-Renewal Agreements
          </p>
        </div>
      </div>
    </div>
  );
});
