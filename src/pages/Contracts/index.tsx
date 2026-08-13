import { useState } from 'react';
import type { ContractStatus, ContractType, ContractFilterParams, VendorContract } from '@/types';
import { useContracts, useCreateContract } from '@/hooks/useContracts';
import { ContractKpiCards } from '@/components/contract/ContractKpiCards';
import { ContractTable } from '@/components/contract/ContractTable';
import { CreateContractModal } from '@/components/contract/CreateContractModal';
import { ErrorState } from '@/components/shared/ErrorState';
import { LoadingScreen } from '@/components/shared/Skeleton';
import { FileText, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContractsPage() {
  const [filters, setFilters] = useState<ContractFilterParams>({
    search: '',
    status: 'all',
    type: 'all',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: contracts = [], isLoading, isError, refetch } = useContracts(filters);
  const createContractMutation = useCreateContract();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <ErrorState
          title="Failed to load contracts"
          message="Could not retrieve vendor contract agreements."
          onRetry={() => void refetch()}
        />
      </div>
    );
  }

  const handleCreateSubmit = (data: Omit<VendorContract, 'id' | 'contractCode'>) => {
    createContractMutation.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  return (
    <div className="mx-auto max-w-screen-2xl space-y-6">
      {/* Page Hero Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Vendor Contracts & MSA Lifecycle Management
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage Master Services Agreements, SLAs, NDAs, renewal schedules, and legal compliance.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700 text-xs shadow-sm font-semibold"
        >
          <Plus className="h-4 w-4" />
          Generate New Contract
        </Button>
      </div>

      {/* 4 Summary KPI Cards */}
      <ContractKpiCards contracts={contracts} />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search contracts or vendors..."
            value={filters.search || ''}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Status & Type Selectors */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={filters.status || 'all'}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as ContractStatus | 'all' })}
              className="h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="all">All Contract Statuses</option>
              <option value="active">Active</option>
              <option value="expiring_soon">Expiring Soon</option>
              <option value="draft">Draft / In Review</option>
              <option value="expired">Expired</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>

          <select
            value={filters.type || 'all'}
            onChange={(e) => setFilters({ ...filters, type: e.target.value as ContractType | 'all' })}
            className="h-9 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="all">All Agreement Types</option>
            <option value="Master Services Agreement (MSA)">Master Services Agreement (MSA)</option>
            <option value="Service Level Agreement (SLA)">Service Level Agreement (SLA)</option>
            <option value="Non-Disclosure Agreement (NDA)">Non-Disclosure Agreement (NDA)</option>
            <option value="Software License & SaaS">Software License & SaaS</option>
            <option value="Supply & Procurement">Supply & Procurement</option>
          </select>
        </div>
      </div>

      {/* Contracts Table */}
      <ContractTable contracts={contracts} />

      {/* Create Contract Modal */}
      {isModalOpen && (
        <CreateContractModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateSubmit}
          isSubmitting={createContractMutation.isPending}
        />
      )}
    </div>
  );
}
