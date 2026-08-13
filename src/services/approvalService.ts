import type {
  ApiResponse,
  ApprovalRequest,
  ApprovalStatus,
  ApprovalActionPayload,
} from '@/types';
import { MOCK_APPROVAL_REQUESTS } from '@/constants/mockApprovals';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let approvalStore: ApprovalRequest[] = [...MOCK_APPROVAL_REQUESTS];

export const approvalService = {
  /**
   * Fetches list of approval requests, optionally filtered by status.
   */
  async getApprovalRequests(
    statusFilter?: ApprovalStatus | 'all',
  ): Promise<ApiResponse<ApprovalRequest[]>> {
    await delay(300);
    let result = [...approvalStore];

    if (statusFilter && statusFilter !== 'all') {
      result = result.filter((req) => req.status === statusFilter);
    }

    return {
      data: result,
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Fetches single approval request details by ID.
   */
  async getApprovalRequestById(id: string): Promise<ApiResponse<ApprovalRequest>> {
    await delay(200);
    const req = approvalStore.find((r) => r.id === id);
    if (!req) {
      throw new Error(`Approval request with ID ${id} not found.`);
    }
    return {
      data: req,
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Processes approval action: Approve, Reject, Hold, or Request Changes.
   */
  async processAction(
    payload: ApprovalActionPayload,
  ): Promise<ApiResponse<ApprovalRequest>> {
    await delay(500);

    const { requestId, action, comment } = payload;
    let targetIndex = approvalStore.findIndex((r) => r.id === requestId);

    if (targetIndex === -1) {
      throw new Error(`Request ${requestId} not found.`);
    }

    const currentReq = { ...approvalStore[targetIndex] };
    const now = new Date().toISOString();

    // Map action to status
    let newStatus: ApprovalStatus = currentReq.status;
    let actionType: 'approved' | 'rejected' | 'on_hold' | 'requested_changes' = 'approved';

    if (action === 'approve') {
      actionType = 'approved';
      if (currentReq.currentLevel < currentReq.totalLevels) {
        currentReq.currentLevel += 1;
      } else {
        newStatus = 'approved';
      }
    } else if (action === 'reject') {
      actionType = 'rejected';
      newStatus = 'rejected';
    } else if (action === 'hold') {
      actionType = 'on_hold';
      newStatus = 'on_hold';
    } else if (action === 'request_changes') {
      actionType = 'requested_changes';
      newStatus = 'changes_requested';
    }

    // Update timeline step
    const stepIdx = currentReq.currentLevel - 1;
    if (currentReq.timeline[stepIdx]) {
      currentReq.timeline[stepIdx] = {
        ...currentReq.timeline[stepIdx],
        status: newStatus === 'approved' ? 'approved' : newStatus,
        updatedAt: now,
        comments: comment,
      };
    }

    // Append decision comment
    const newComment = {
      id: `c-${Date.now()}`,
      authorName: 'Current Reviewer (You)',
      authorRole: 'Enterprise Auditor',
      timestamp: now,
      action: actionType,
      stepTitle: currentReq.timeline[stepIdx]?.title || 'Review Step',
      text: comment,
    };

    currentReq.status = newStatus;
    currentReq.comments = [newComment, ...currentReq.comments];

    approvalStore[targetIndex] = currentReq;

    return {
      data: currentReq,
      message: `Successfully processed action '${action}' for vendor ${currentReq.vendorName}`,
      success: true,
      timestamp: now,
    };
  },
};
