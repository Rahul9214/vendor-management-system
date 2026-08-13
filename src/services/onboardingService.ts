import type { ApiResponse, Vendor } from '@/types';
import type { VendorOnboardingFormData } from '@/utils/vendorValidation';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const onboardingService = {
  /**
   * Submits a newly created vendor from the onboarding form.
   */
  async submitOnboarding(
    formData: VendorOnboardingFormData,
  ): Promise<ApiResponse<Vendor>> {
    await delay(600); // Simulate API latency

    const generatedCode = `VND-${new Date().getFullYear()}-${Math.floor(
      100 + Math.random() * 900,
    )}`;

    const newVendor: Vendor = {
      id: `vnd-${Date.now()}`,
      code: generatedCode,
      name: formData.name,
      category: formData.category,
      status: 'pending',
      rating: 4.5,
      contactPerson: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      country: formData.country,
      city: formData.city,
      address: `${formData.addressStreet}, ${formData.state} - ${formData.pincode}`,
      taxId: `GST: ${formData.gst} | PAN: ${formData.pan}`,
      website: formData.website || undefined,
      paymentTerms: formData.paymentTerms,
      joinedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      lastTransactionDate: new Date().toISOString(),
      lastTransactionAmount: 0,
      totalOrders: 0,
      totalValue: 0,
      complianceScore: 85,
      notes: `Certifications: ${formData.certifications?.join(', ') || 'None'}. Onboarded via Module 4 Form.`,
    };

    return {
      data: newVendor,
      message: `Vendor ${formData.name} successfully registered with Code ${generatedCode}`,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
