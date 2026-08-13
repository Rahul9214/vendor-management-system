import { useState } from 'react';
import type { ApprovalRequest } from '@/types';
import {
  CheckCircle2,
  XCircle,
  PauseCircle,
  HelpCircle,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApprovalActionModalProps {
  request: ApprovalRequest;
  onClose: () => void;
  onConfirmAction: (action: 'approve' | 'reject' | 'hold' | 'request_changes', comment: string) => void;
  isSubmitting?: boolean;
}

export function ApprovalActionModal({
  request,
  onClose,
  onConfirmAction,
  isSubmitting = false,
}: ApprovalActionModalProps) {
  const [selectedAction, setSelectedAction] = useState<
    'approve' | 'reject' | 'hold' | 'request_changes'
  >('approve');
  const [comment, setComment] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setErrorText('Please enter auditor rationale / comments for this action.');
      return;
    }
    setErrorText(null);
    onConfirmAction(selectedAction, comment.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-xs p-4 animate-in fade-in-50">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            <span className="rounded bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              Level {request.currentLevel} of {request.totalLevels} Review
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">
              Process Approval: {request.vendorName}
            </h3>
            <p className="text-xs text-slate-500">Code: {request.vendorCode} · Tax ID: {request.taxId}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* Action Selector Buttons */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Select Decision Action *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedAction('approve')}
                className={`flex items-center gap-2 rounded-xl border p-3 text-xs transition-all ${
                  selectedAction === 'approve'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold dark:border-emerald-500 dark:bg-emerald-950/50 dark:text-emerald-200'
                    : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 text-slate-600'
                }`}
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Approve Vendor</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAction('reject')}
                className={`flex items-center gap-2 rounded-xl border p-3 text-xs transition-all ${
                  selectedAction === 'reject'
                    ? 'border-red-600 bg-red-50 text-red-900 font-bold dark:border-red-500 dark:bg-red-950/50 dark:text-red-200'
                    : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 text-slate-600'
                }`}
              >
                <XCircle className="h-4 w-4 text-red-500" />
                <span>Reject Registration</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAction('hold')}
                className={`flex items-center gap-2 rounded-xl border p-3 text-xs transition-all ${
                  selectedAction === 'hold'
                    ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold dark:border-purple-500 dark:bg-purple-950/50 dark:text-purple-200'
                    : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 text-slate-600'
                }`}
              >
                <PauseCircle className="h-4 w-4 text-purple-500" />
                <span>Place On Hold</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAction('request_changes')}
                className={`flex items-center gap-2 rounded-xl border p-3 text-xs transition-all ${
                  selectedAction === 'request_changes'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold dark:border-blue-500 dark:bg-blue-950/50 dark:text-blue-200'
                    : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 text-slate-600'
                }`}
              >
                <HelpCircle className="h-4 w-4 text-blue-500" />
                <span>Request Changes</span>
              </button>
            </div>
          </div>

          {/* Comment Textarea */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Auditor Comments & Rationale *
            </label>
            <textarea
              required
              rows={3}
              placeholder={`Specify audit rationale for '${selectedAction.toUpperCase()}' action...`}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                if (errorText) setErrorText(null);
              }}
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
            {errorText && (
              <p className="mt-1 text-xs font-medium text-red-500">{errorText}</p>
            )}
          </div>

          {/* Dialog Actions */}
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className={`text-xs text-white ${
                selectedAction === 'approve'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : selectedAction === 'reject'
                  ? 'bg-red-600 hover:bg-red-700'
                  : selectedAction === 'hold'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Processing...' : `Confirm ${selectedAction.toUpperCase()}`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
