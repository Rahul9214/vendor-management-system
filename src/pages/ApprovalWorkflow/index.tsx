import { useState } from 'react';
import type { ApprovalStatus, ApprovalRequest } from '@/types';
import {
  useApprovalRequests,
  useProcessApprovalAction,
} from '@/hooks/useApprovals';
import { ApprovalStatusBadge } from '@/components/approval/ApprovalStatusBadge';
import { ApprovalTimeline } from '@/components/approval/ApprovalTimeline';
import { ApprovalCommentThread } from '@/components/approval/ApprovalCommentThread';
import { ApprovalActionModal } from '@/components/approval/ApprovalActionModal';
import { ErrorState } from '@/components/shared/ErrorState';
import { LoadingScreen } from '@/components/shared/Skeleton';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  PauseCircle,
  HelpCircle,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ApprovalWorkflowPage() {
  const [statusFilter, setStatusFilter] = useState<ApprovalStatus | 'all'>('all');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>('app-001');
  const [actionModalRequest, setActionModalRequest] = useState<ApprovalRequest | null>(null);

  const { data: requests = [], isLoading, isError, refetch } = useApprovalRequests(statusFilter);
  const processActionMutation = useProcessApprovalAction();

  const selectedRequest =
    requests.find((r) => r.id === selectedRequestId) || requests[0] || null;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="p-6">
        <ErrorState
          title="Failed to load approval requests"
          message="Could not retrieve approval queue."
          onRetry={() => void refetch()}
        />
      </div>
    );
  }

  const handleActionConfirm = (
    action: 'approve' | 'reject' | 'hold' | 'request_changes',
    comment: string,
  ) => {
    if (!actionModalRequest) return;

    processActionMutation.mutate(
      {
        requestId: actionModalRequest.id,
        action,
        comment,
      },
      {
        onSuccess: () => {
          setActionModalRequest(null);
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-screen-2xl space-y-6">
      {/* Page Hero Header */}
      <div className="flex flex-col gap-2 border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              Vendor Approval Workflow & Governance
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Review multi-level legal, tax, financial, and executive approval gates for onboarding vendors.
            </p>
          </div>
        </div>
      </div>

      {/* Queue Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        {[
          { label: 'All Requests', val: 'all' },
          { label: 'Pending Queue', val: 'pending' },
          { label: 'Approved', val: 'approved' },
          { label: 'Rejected', val: 'rejected' },
          { label: 'On Hold', val: 'on_hold' },
          { label: 'Changes Requested', val: 'changes_requested' },
        ].map((opt) => {
          const isSelected = statusFilter === opt.val;
          return (
            <button
              key={opt.val}
              type="button"
              onClick={() => setStatusFilter(opt.val as ApprovalStatus | 'all')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Main Split-Screen Experience */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Pane: Requests List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Approval Requests ({requests.length})
          </h3>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {requests.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-900">
                No approval requests found for selected status filter.
              </div>
            ) : (
              requests.map((req) => {
                const isSelected = selectedRequest?.id === req.id;

                return (
                  <div
                    key={req.id}
                    onClick={() => setSelectedRequestId(req.id)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-1 ring-indigo-500 dark:border-indigo-500 dark:bg-indigo-950/30'
                        : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-slate-500">
                        {req.vendorCode}
                      </span>
                      <ApprovalStatusBadge status={req.status} />
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
                      {req.vendorName}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 border-t border-slate-100 pt-2 dark:border-slate-800">
                      <span>{req.category} · {req.city}</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">
                        L{req.currentLevel}/{req.totalLevels}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Selected Request Approval Workspace (8 Cols) */}
        <div className="lg:col-span-8">
          {!selectedRequest ? (
            <div className="flex h-96 items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-900">
              Select a vendor request from the left queue to view approval workspace.
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
              {/* Request Header Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 font-bold text-white text-xl shadow-md">
                    {selectedRequest.vendorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {selectedRequest.vendorName}
                      </h3>
                      <ApprovalStatusBadge status={selectedRequest.status} />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Code: {selectedRequest.vendorCode} · Tax ID: {selectedRequest.taxId} · Submitted {new Date(selectedRequest.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Primary Decision Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="xs"
                    onClick={() => setActionModalRequest(selectedRequest)}
                    className="gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700 text-xs shadow-sm"
                  >
                    <UserCheck className="h-4 w-4" />
                    Process Decision
                  </Button>
                </div>
              </div>

              {/* Quick Action Button Group */}
              <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-3 rounded-xl dark:bg-slate-800/50">
                <span className="text-xs font-semibold text-slate-500 mr-2">Quick Decision:</span>
                <Button
                  size="xs"
                  onClick={() => {
                    setActionModalRequest(selectedRequest);
                  }}
                  className="gap-1 bg-emerald-600 text-white hover:bg-emerald-700 text-xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                </Button>
                <Button
                  size="xs"
                  onClick={() => {
                    setActionModalRequest(selectedRequest);
                  }}
                  className="gap-1 bg-red-600 text-white hover:bg-red-700 text-xs"
                >
                  <XCircle className="h-3.5 w-3.5" /> Reject
                </Button>
                <Button
                  size="xs"
                  onClick={() => {
                    setActionModalRequest(selectedRequest);
                  }}
                  className="gap-1 bg-purple-600 text-white hover:bg-purple-700 text-xs"
                >
                  <PauseCircle className="h-3.5 w-3.5" /> Hold
                </Button>
                <Button
                  size="xs"
                  onClick={() => {
                    setActionModalRequest(selectedRequest);
                  }}
                  className="gap-1 bg-blue-600 text-white hover:bg-blue-700 text-xs"
                >
                  <HelpCircle className="h-3.5 w-3.5" /> Request Changes
                </Button>
              </div>

              {/* Multi-Level Approval Timeline */}
              <ApprovalTimeline
                timeline={selectedRequest.timeline}
                currentLevel={selectedRequest.currentLevel}
              />

              {/* Auditor Comment Thread */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <ApprovalCommentThread comments={selectedRequest.comments} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Processing Modal */}
      {actionModalRequest && (
        <ApprovalActionModal
          request={actionModalRequest}
          onClose={() => setActionModalRequest(null)}
          onConfirmAction={handleActionConfirm}
          isSubmitting={processActionMutation.isPending}
        />
      )}
    </div>
  );
}
