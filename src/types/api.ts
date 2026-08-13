// ─── Generic API Response Envelope ───────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  /** ISO timestamp from server */
  timestamp: string;
}

// ─── Error Types ──────────────────────────────────────────────────────────────

export interface ApiError {
  message: string;
  /** Application-level error code, e.g. "VENDOR_NOT_FOUND" */
  code: string;
  statusCode: number;
  details?: string;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Query Utilities ──────────────────────────────────────────────────────────

export type SortOrder = 'asc' | 'desc';

export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
}
