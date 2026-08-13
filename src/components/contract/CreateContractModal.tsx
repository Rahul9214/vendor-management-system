import { useState } from 'react';
import type { ContractType, ContractStatus, VendorContract } from '@/types';
import { X, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreateContractModalProps {
  onClose: () => void;
  onSubmit: (contract: Omit<VendorContract, 'id' | 'contractCode'>) => void;
  isSubmitting?: boolean;
}

export function CreateContractModal({
  onClose,
  onSubmit,
  isSubmitting = false,
}: CreateContractModalProps) {
  const [title, setTitle] = useState('');
  const [vendorName, setVendorName] = useState('Acme Global Logistics');
  const [category, setCategory] = useState('Logistics');
  const [type, setType] = useState<ContractType>('Master Services Agreement (MSA)');
  const [value, setValue] = useState(250000);
  const [startDate, setStartDate] = useState('2026-08-15');
  const [endDate, setEndDate] = useState('2027-08-15');
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [status, setStatus] = useState<ContractStatus>('active');
  const [signerName, setSignerName] = useState('Executive Approver');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      vendorId: 'vnd-001',
      vendorName,
      category,
      type,
      value: Number(value),
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      autoRenewal,
      status,
      signerName,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 animate-in fade-in-50">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Generate Vendor Contract
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Contract Title *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Master Services & SLA Agreement 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Vendor Name *
              </label>
              <input
                required
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Category *
              </label>
              <input
                required
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Contract Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ContractType)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="Master Services Agreement (MSA)">Master Services Agreement (MSA)</option>
                <option value="Service Level Agreement (SLA)">Service Level Agreement (SLA)</option>
                <option value="Non-Disclosure Agreement (NDA)">Non-Disclosure Agreement (NDA)</option>
                <option value="Software License & SaaS">Software License & SaaS</option>
                <option value="Supply & Procurement">Supply & Procurement</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Contract Value ($)
              </label>
              <input
                required
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Effective Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Expiration Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Contract Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ContractStatus)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="expiring_soon">Expiring Soon</option>
                <option value="draft">Draft / In Review</option>
                <option value="expired">Expired</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Signer Executive Name
              </label>
              <input
                required
                type="text"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Enable Auto-Renewal Clause
            </span>
            <input
              type="checkbox"
              checked={autoRenewal}
              onChange={(e) => setAutoRenewal(e.target.checked)}
              className="h-4 w-4 rounded accent-indigo-600"
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            <Button type="button" variant="ghost" size="sm" onClick={onClose} className="text-xs">
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700 text-xs"
            >
              <Plus className="h-4 w-4" />
              {isSubmitting ? 'Generating...' : 'Save Contract'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
