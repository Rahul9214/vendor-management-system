import { memo } from 'react';
import type { ApprovalComment } from '@/types';
import { MessageSquare, CheckCircle2, XCircle, PauseCircle, HelpCircle } from 'lucide-react';

interface ApprovalCommentThreadProps {
  comments: ApprovalComment[];
}

export const ApprovalCommentThread = memo(function ApprovalCommentThread({
  comments,
}: ApprovalCommentThreadProps) {
  const getActionBadge = (action: ApprovalComment['action']) => {
    switch (action) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
            <CheckCircle2 className="h-3 w-3" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950/60 dark:text-red-400">
            <XCircle className="h-3 w-3" /> Rejected
          </span>
        );
      case 'on_hold':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-950/60 dark:text-purple-400">
            <PauseCircle className="h-3 w-3" /> Placed On Hold
          </span>
        );
      case 'requested_changes':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-400">
            <HelpCircle className="h-3 w-3" /> Requested Revisions
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <MessageSquare className="h-3 w-3" /> Note Added
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
        <MessageSquare className="h-3.5 w-3.5" />
        Auditor Decision Notes & Comments ({comments.length})
      </h4>

      {comments.length === 0 ? (
        <p className="text-xs italic text-slate-400 py-3">No auditor comments recorded yet.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 font-bold text-white text-xs">
                    {c.authorName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {c.authorName}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {c.authorRole} {c.stepTitle && `· ${c.stepTitle}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getActionBadge(c.action)}
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(c.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300">
                "{c.text}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
