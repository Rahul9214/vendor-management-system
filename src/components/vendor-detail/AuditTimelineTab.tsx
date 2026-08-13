import { memo } from 'react';
import type { VendorAuditLog } from '@/types';
import {
  History,
  ShieldCheck,
  FileCheck,
  CreditCard,
  UserCheck,
  Activity,
} from 'lucide-react';

interface AuditTimelineTabProps {
  auditLogs: VendorAuditLog[];
}

export const AuditTimelineTab = memo(function AuditTimelineTab({
  auditLogs,
}: AuditTimelineTabProps) {
  const getLogIcon = (type: VendorAuditLog['type']) => {
    switch (type) {
      case 'audit_passed':
        return <ShieldCheck className="h-4 w-4 text-emerald-500" />;
      case 'document_upload':
        return <FileCheck className="h-4 w-4 text-indigo-500" />;
      case 'contract_renewed':
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case 'status_change':
        return <UserCheck className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <History className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Audit Trail & Activity Timeline
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Immutable event stream of compliance reviews, status shifts, document uploads, and payment settlements.
        </p>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {auditLogs.map((log) => (
          <div key={log.id} className="relative flex items-start gap-4">
            {/* Timeline Node Badge */}
            <div className="absolute -left-6 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
              {getLogIcon(log.type)}
            </div>

            <div className="flex-1 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {log.action}
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {log.details}
              </p>
              <div className="pt-2 text-[10px] text-slate-400">
                Logged by: <strong className="text-slate-600 dark:text-slate-300">{log.performedBy}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
