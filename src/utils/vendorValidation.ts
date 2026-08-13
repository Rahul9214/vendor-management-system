import { z } from 'zod';

// ─── Regex Patterns ───────────────────────────────────────────────────────────

/** Standard Indian GSTIN regex pattern (15 characters) */
export const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

/** Standard Indian Permanent Account Number (PAN) regex pattern (10 characters) */
export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

/** Standard IFSC Code regex pattern (11 characters) */
export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

// ─── Vendor Onboarding Form Zod Schema ────────────────────────────────────────

export const vendorOnboardingSchema = z.object({
  // Basic Info
  name: z
    .string()
    .min(2, { message: 'Vendor legal name must be at least 2 characters' }),
  category: z.enum([
    'Technology',
    'Manufacturing',
    'Logistics',
    'Raw Materials',
    'Services',
    'Healthcare',
    'Finance',
    'Others',
  ]),
  gst: z
    .string()
    .min(1, { message: 'GSTIN number is required' })
    .transform((val) => val.toUpperCase().trim())
    .refine((val) => GSTIN_REGEX.test(val), {
      message: 'Invalid GSTIN format (e.g. 22AAAAA0000A1Z5)',
    }),
  pan: z
    .string()
    .min(1, { message: 'PAN number is required' })
    .transform((val) => val.toUpperCase().trim())
    .refine((val) => PAN_REGEX.test(val), {
      message: 'Invalid PAN format (e.g. ABCDE1234F)',
    }),
  website: z.string().optional(),

  // Address Details
  addressStreet: z
    .string()
    .min(5, { message: 'Street address must be at least 5 characters' }),
  city: z.string().min(2, { message: 'City is required' }),
  state: z.string().min(2, { message: 'State / Province is required' }),
  country: z.string().min(2, { message: 'Country is required' }),
  pincode: z
    .string()
    .min(5, { message: 'Postal / ZIP code must be at least 5 characters' }),

  // Contact Details
  contactName: z
    .string()
    .min(2, { message: 'Primary contact name is required' }),
  contactEmail: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  contactPhone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' }),
  secondaryContactName: z.string().optional(),
  secondaryContactEmail: z.string().optional(),

  // Banking Details
  bankName: z.string().min(2, { message: 'Bank name is required' }),
  accountHolder: z
    .string()
    .min(2, { message: 'Account holder name is required' }),
  accountNumber: z
    .string()
    .min(8, { message: 'Account number must be at least 8 digits' }),
  ifscCode: z
    .string()
    .min(1, { message: 'IFSC / Swift code is required' })
    .transform((val) => val.toUpperCase().trim())
    .refine((val) => IFSC_REGEX.test(val), {
      message: 'Invalid IFSC code format (e.g. SBIN0001234)',
    }),

  // Payment Terms & Certifications
  paymentTerms: z.enum([
    'Net 15',
    'Net 30',
    'Net 45',
    'Net 60',
    'Due on Receipt',
    'Advance',
  ]),
  certifications: z.array(z.string()),

  // Document Upload Metadata
  uploadedDocuments: z
    .array(
      z.object({
        name: z.string(),
        size: z.string(),
        type: z.string(),
        category: z.string(),
      }),
    )
    .min(1, { message: 'Please upload at least 1 compliance document (GST/Tax or ISO Cert)' }),
});

export type VendorOnboardingFormData = z.infer<typeof vendorOnboardingSchema>;
