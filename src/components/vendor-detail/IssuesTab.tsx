import { memo, useState } from 'react';
import type { VendorIssue } from '@/types';
import { AlertTriangle, CheckCircle2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IssuesTabProps {
  issues: VendorIssue[];
  onRaiseIssue?: (issue: Omit<VendorIssue, 'id' | 'ticketNumber' | 'createdAt' | 'status'>) => void;
}

export const IssuesTab = memo(function IssuesTab({ issues, onRaiseIssue }: IssuesTabProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<VendorIssue['category']>('Late Delivery');
  const [severity, setSeverity] = useState<VendorIssue['severity']>('medium');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    if (onRaiseIssue) {
      onRaiseIssue({
        title,
        category,
        severity,
        description,
        reportedBy: 'Quality Audit Team',
      });
    }
    setTitle('');
    setDescription('');
    setIsAdding(false);
  };

  const getSeverityBadge = (sev: VendorIssue['severity']) => {
    switch (sev) {
      case 'high':
        return <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950/60 dark:text-red-400">High Severity</span>;
      case 'medium':
        return <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">Medium Severity</span>;
      case 'low':
        return <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">Low Severity</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Issues & Dispute Tickets
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Quality audit non-conformances, delivery delays, and billing disputes.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setIsAdding(true)}
          className="gap-2 bg-red-600 text-white hover:bg-red-700 text-xs"
        >
          <Plus className="h-4 w-4" />
          Raise Dispute Ticket
        </Button>
      </div>

      {/* Raise Issue Modal */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-red-200 bg-red-50/50 p-5 shadow-sm dark:border-red-900/50 dark:bg-red-950/20 space-y-4">
          <div className="flex items-center justify-between border-b border-red-100 dark:border-red-900/50 pb-2">
            <h4 className="text-xs font-bold text-red-900 dark:text-red-200">
              Raise New Vendor Dispute Ticket
            </h4>
            <button type="button" onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Ticket Subject / Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Shipment #401 missing certificates"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as VendorIssue['severity'])}
                className="mt-1 h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Issue Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as VendorIssue['category'])}
              className="mt-1 h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              <option value="Late Delivery">Late Delivery</option>
              <option value="Quality Audit">Quality Audit</option>
              <option value="Billing Dispute">Billing Dispute</option>
              <option value="Compliance">Compliance</option>
              <option value="Communication">Communication</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Detailed Description *</label>
            <textarea
              required
              rows={2}
              placeholder="Describe the non-conformance or dispute..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button size="xs" type="button" variant="ghost" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button size="xs" type="submit" className="bg-red-600 text-white hover:bg-red-700">
              Submit Ticket
            </Button>
          </div>
        </form>
      )}

      {/* Ticket List */}
      <div className="space-y-3">
        {issues.map((iss) => (
          <div
            key={iss.id}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-red-600 dark:text-red-400">
                  {iss.ticketNumber}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {iss.category}
                </span>
                {getSeverityBadge(iss.severity)}
              </div>

              <div>
                {iss.status === 'resolved' ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Resolved
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
                    <AlertTriangle className="h-3.5 w-3.5" /> Open Ticket
                  </span>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {iss.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {iss.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Reported by: <strong className="text-slate-600 dark:text-slate-300">{iss.reportedBy}</strong></span>
              <span>Logged: {new Date(iss.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
