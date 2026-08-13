import type {
  ApiResponse,
  FullVendorDetail,
  VendorDocument,
  VendorContactPerson,
  VendorIssue,
} from '@/types';
import {
  MOCK_VENDOR_CONTACTS,
  MOCK_VENDOR_POS,
  MOCK_VENDOR_DOCUMENTS,
  MOCK_VENDOR_PAYMENTS,
  MOCK_VENDOR_PROJECTS,
  MOCK_VENDOR_ISSUES,
  MOCK_VENDOR_AUDIT_LOGS,
} from '@/constants/mockVendorDetails';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const vendorDetailService = {
  /**
   * Fetches full tabbed details for a given vendor ID.
   */
  async getFullVendorDetail(): Promise<ApiResponse<FullVendorDetail>> {
    await delay(300);
    return {
      data: {
        contacts: MOCK_VENDOR_CONTACTS,
        purchaseOrders: MOCK_VENDOR_POS,
        documents: MOCK_VENDOR_DOCUMENTS,
        payments: MOCK_VENDOR_PAYMENTS,
        projects: MOCK_VENDOR_PROJECTS,
        issues: MOCK_VENDOR_ISSUES,
        auditLogs: MOCK_VENDOR_AUDIT_LOGS,
      },
      message: 'OK',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Simulates uploading a new compliance document.
   */
  async uploadDocument(
    _vendorId: string,
    doc: Omit<VendorDocument, 'id' | 'uploadedAt' | 'status' | 'downloadUrl'>,
  ): Promise<ApiResponse<VendorDocument>> {
    await delay(500);
    const newDoc: VendorDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString(),
      status: 'pending_verification',
      downloadUrl: '#',
    };
    return {
      data: newDoc,
      message: 'Document uploaded successfully',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Simulates adding a new contact person.
   */
  async addContact(
    _vendorId: string,
    contact: Omit<VendorContactPerson, 'id'>,
  ): Promise<ApiResponse<VendorContactPerson>> {
    await delay(400);
    const newContact: VendorContactPerson = {
      ...contact,
      id: `cnt-${Date.now()}`,
    };
    return {
      data: newContact,
      message: 'Contact added successfully',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Simulates reporting a vendor issue / dispute ticket.
   */
  async raiseIssue(
    _vendorId: string,
    issue: Omit<VendorIssue, 'id' | 'ticketNumber' | 'createdAt' | 'status'>,
  ): Promise<ApiResponse<VendorIssue>> {
    await delay(450);
    const newIssue: VendorIssue = {
      ...issue,
      id: `iss-${Date.now()}`,
      ticketNumber: `TCK-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'open',
    };
    return {
      data: newIssue,
      message: 'Issue ticket logged successfully',
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
