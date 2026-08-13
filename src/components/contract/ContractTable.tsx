import { memo } from 'react';
import type { VendorContract } from '@/types';
import { ContractStatusBadge } from './ContractStatusBadge';
import { Download, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContractTableProps {
  contracts: VendorContract[];
}

export const ContractTable = memo(function ContractTable({
  contracts,
}: ContractTableProps) {
  const handleDownloadDoc = (contract: VendorContract) => {
    const text = `CONTRACT AGREEMENT SUMMARY\nContract Code: ${contract.contractCode}\nTitle: ${contract.title}\nVendor: ${contract.vendorName}\nType: ${contract.type}\nValue: $${contract.value.toLocaleString()}\nStart Date: ${contract.startDate}\nEnd Date: ${contract.endDate}\nSigner: ${contract.signerName}\n`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${contract.contractCode}_agreement.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-slate-800 dark:bg-slate-800/40">
          <tr>
            <th className="py-3.5 pl-6 pr-3">Contract Code</th>
            <th className="px-3 py-3.5">Contract Title & Type</th>
            <th className="px-3 py-3.5">Vendor Name</th>
            <th className="px-3 py-3.5">Status</th>
            <th className="px-3 py-3.5">Contract Value</th>
            <th className="px-3 py-3.5">Validity Dates</th>
            <th className="px-3 py-3.5">Auto Renew</th>
            <th className="py-3.5 pl-3 pr-6 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {contracts.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-8 text-center text-xs text-slate-400">
                No contracts found matching filter criteria.
              </td>
            </tr>
          ) : (
            contracts.map((c) => (
              <tr
                key={c.id}
                className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
              >
                {/* Code */}
                <td className="py-4 pl-6 pr-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {c.contractCode}
                </td>

                {/* Title & Type */}
                <td className="px-3 py-4">
                  <p className="font-bold text-slate-900 dark:text-slate-100 max-w-xs truncate">
                    {c.title}
                  </p>
                  <span className="text-[10px] text-slate-400">{c.type}</span>
                </td>

                {/* Vendor Name */}
                <td className="px-3 py-4">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {c.vendorName}
                  </p>
                  <span className="text-[10px] text-slate-400">{c.category}</span>
                </td>

                {/* Status */}
                <td className="px-3 py-4">
                  <ContractStatusBadge status={c.status} />
                </td>

                {/* Value */}
                <td className="px-3 py-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                  {c.value === 0 ? 'N/A' : `$${c.value.toLocaleString()}`}
                </td>

                {/* Validity Dates */}
                <td className="px-3 py-4 text-slate-500 font-mono text-[11px]">
                  <div>Start: {new Date(c.startDate).toLocaleDateString()}</div>
                  <div>End: {new Date(c.endDate).toLocaleDateString()}</div>
                </td>

                {/* Auto Renew */}
                <td className="px-3 py-4">
                  {c.autoRenewal ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-600 dark:text-purple-400">
                      <RefreshCw className="h-3 w-3" /> Yes
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">No</span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-4 pl-3 pr-6 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => handleDownloadDoc(c)}
                      title="Download Contract PDF / Text Summary"
                      className="h-7 w-7 p-0 text-slate-500 hover:text-indigo-600"
                    >
                      <Download className="h-4 w-4" />
                    </Button>

                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => handleDownloadDoc(c)}
                      title="Open Document"
                      className="h-7 w-7 p-0 text-slate-500 hover:text-indigo-600"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});
