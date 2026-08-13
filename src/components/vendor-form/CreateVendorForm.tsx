import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  X,
  Save,
  RotateCcw,
  Sparkles,
  AlertCircle,
  FileText,
} from 'lucide-react';
import {
  vendorOnboardingSchema,
  type VendorOnboardingFormData,
} from '@/utils/vendorValidation';
import { Button } from '@/components/ui/button';
import { onboardingService } from '@/services/onboardingService';
import { useNavigate } from 'react-router-dom';

const DRAFT_STORAGE_KEY = 'vms_create_vendor_form_draft';

const CERTIFICATION_OPTIONS = [
  'ISO 9001:2015 (Quality)',
  'ISO 27001 (Information Security)',
  'SOC 2 Type II',
  'FSC Certified (Sustainability)',
  'GMP (Good Manufacturing Practices)',
  'CMMI Level 5',
  'FDA Approved',
  'OHSAS 18001 / ISO 45001 (Safety)',
];

const STEPS = [
  { id: 1, label: 'General & Tax' },
  { id: 2, label: 'Address Location' },
  { id: 3, label: 'Contact & Banking' },
  { id: 4, label: 'Terms & Uploads' },
  { id: 5, label: 'Review & Submit' },
];

export function CreateVendorForm() {
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<VendorOnboardingFormData>({
    resolver: zodResolver(vendorOnboardingSchema),
    mode: 'onBlur',
    defaultValues: {
      category: 'Technology',
      paymentTerms: 'Net 30',
      country: 'India',
      certifications: [],
      uploadedDocuments: [
        {
          name: 'GSTIN_Registration_Certificate.pdf',
          size: '1.4 MB',
          type: 'application/pdf',
          category: 'Tax (W-9/GST)',
        },
      ],
    },
  });

  const selectedCertifications = watch('certifications') || [];
  const uploadedDocs = watch('uploadedDocuments') || [];

  // Restore draft from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        reset(parsed);
        setDraftSavedAt(new Date().toLocaleTimeString());
      }
    } catch {
      // Ignore
    }
  }, [reset]);

  // Save current form state as draft
  const handleSaveDraft = () => {
    const currentValues = watch();
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(currentValues));
    const now = new Date().toLocaleTimeString();
    setDraftSavedAt(now);
  };

  const handleClearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    reset({
      category: 'Technology',
      paymentTerms: 'Net 30',
      country: 'India',
      certifications: [],
      uploadedDocuments: [],
    });
    setDraftSavedAt(null);
  };

  // Validate current step before advancing
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof VendorOnboardingFormData)[] = [];

    if (activeStep === 1) {
      fieldsToValidate = ['name', 'category', 'gst', 'pan'];
    } else if (activeStep === 2) {
      fieldsToValidate = ['addressStreet', 'city', 'state', 'country', 'pincode'];
    } else if (activeStep === 3) {
      fieldsToValidate = [
        'contactName',
        'contactEmail',
        'contactPhone',
        'bankName',
        'accountHolder',
        'accountNumber',
        'ifscCode',
      ];
    } else if (activeStep === 4) {
      fieldsToValidate = ['paymentTerms', 'uploadedDocuments'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setActiveStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  // Toggle certification checkbox
  const handleCertToggle = (cert: string) => {
    const current = selectedCertifications;
    const updated = current.includes(cert)
      ? current.filter((c) => c !== cert)
      : [...current, cert];
    setValue('certifications', updated, { shouldValidate: true });
  };

  // Simulate Drag & Drop File Upload
  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs = Array.from(files).map((f) => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      type: f.type || 'application/pdf',
      category: 'Compliance Document',
    }));

    setValue('uploadedDocuments', [...uploadedDocs, ...newDocs], {
      shouldValidate: true,
    });
  };

  const handleRemoveDoc = (index: number) => {
    const updated = uploadedDocs.filter((_, i) => i !== index);
    setValue('uploadedDocuments', updated, { shouldValidate: true });
  };

  // Final Form Submission
  const onFormSubmit = async (data: VendorOnboardingFormData) => {
    setIsSubmitting(true);
    try {
      const res = await onboardingService.submitOnboarding(data);
      if (res.success) {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
        setSuccessMessage(res.message);
        setTimeout(() => {
          navigate('/vendors');
        }, 2000);
      }
    } catch {
      // Error handled
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Draft Notification Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-indigo-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          <span>
            {draftSavedAt
              ? `Auto-draft restored from ${draftSavedAt}`
              : 'Form auto-validates inputs real-time.'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleSaveDraft}
            className="h-7 gap-1 text-xs text-indigo-600 border-indigo-200"
          >
            <Save className="h-3.5 w-3.5" />
            Save Draft
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={handleClearDraft}
            className="h-7 gap-1 text-xs text-slate-400 hover:text-red-500"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear Form
          </Button>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px]">
          {STEPS.map((st, idx) => {
            const isDone = activeStep > st.id;
            const isCurrent = activeStep === st.id;

            return (
              <div key={st.id} className="flex items-center gap-2 flex-1">
                <button
                  type="button"
                  onClick={() => st.id < activeStep && setActiveStep(st.id)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs transition-all ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-indigo-600 text-white shadow-md ring-4 ring-indigo-100 dark:ring-indigo-950'
                      : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="h-5 w-5" /> : st.id}
                </button>
                <div className="min-w-0">
                  <p
                    className={`text-xs font-bold truncate ${
                      isCurrent
                        ? 'text-slate-900 dark:text-slate-100'
                        : 'text-slate-400'
                    }`}
                  >
                    {st.label}
                  </p>
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 rounded-full ${
                      activeStep > st.id ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 shadow-md dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold">{successMessage}</p>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              Redirecting to Vendor Directory...
            </p>
          </div>
        </div>
      )}

      {/* Main Form Container */}
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6"
      >
        {/* STEP 1: General & Tax Info */}
        {activeStep === 1 && (
          <div className="space-y-4 animate-in fade-in-50">
            <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Step 1: General & Tax Information
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Vendor legal business name, category, and government tax identifiers.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Vendor Legal Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Global Logistics Pvt Ltd"
                  {...register('name')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-[11px] font-medium text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Vendor Category *
                </label>
                <select
                  {...register('category')}
                  className="mt-1.5 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  <option value="Technology">Technology</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Raw Materials">Raw Materials</option>
                  <option value="Services">Services</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Website URL
                </label>
                <input
                  type="text"
                  placeholder="https://acmeglobal.com"
                  {...register('website')}
                  className="mt-1.5 h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  GSTIN Number *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 22AAAAA0000A1Z5"
                  maxLength={15}
                  {...register('gst')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 font-mono text-xs uppercase text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.gst
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20'
                  }`}
                />
                {errors.gst && (
                  <p className="mt-1 text-[11px] font-medium text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.gst.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  PAN Number *
                </label>
                <input
                  type="text"
                  placeholder="e.g. ABCDE1234F"
                  maxLength={10}
                  {...register('pan')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 font-mono text-xs uppercase text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.pan
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20'
                  }`}
                />
                {errors.pan && (
                  <p className="mt-1 text-[11px] font-medium text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.pan.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Address Location */}
        {activeStep === 2 && (
          <div className="space-y-4 animate-in fade-in-50">
            <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Step 2: Location & Address Details
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Registered office and operational headquarters address.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Street Address *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 100 W Madison St, Suite 1400"
                  {...register('addressStreet')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.addressStreet
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20'
                  }`}
                />
                {errors.addressStreet && (
                  <p className="mt-1 text-[11px] font-medium text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.addressStreet.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  City *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chicago"
                  {...register('city')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.city ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.city && (
                  <p className="mt-1 text-[11px] font-medium text-red-500">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  State / Province *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Illinois"
                  {...register('state')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.state ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Country *
                </label>
                <input
                  type="text"
                  placeholder="e.g. India"
                  {...register('country')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.country ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Postal / ZIP Code *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 60602"
                  {...register('pincode')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.pincode ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Contact & Banking Details */}
        {activeStep === 3 && (
          <div className="space-y-4 animate-in fade-in-50">
            <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Step 3: Contact Personnel & Bank Details
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Primary point of contact and verified banking account info for settlements.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 pt-1">
                Primary Contact Information
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Primary Contact Person *
                </label>
                <input
                  type="text"
                  placeholder="Sarah Jenkins"
                  {...register('contactName')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.contactName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.contactName && (
                  <p className="mt-1 text-[11px] font-medium text-red-500">
                    {errors.contactName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Contact Email *
                </label>
                <input
                  type="email"
                  placeholder="sarah.j@acmeglobal.com"
                  {...register('contactEmail')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.contactEmail ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.contactEmail && (
                  <p className="mt-1 text-[11px] font-medium text-red-500">
                    {errors.contactEmail.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Contact Phone Number *
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  {...register('contactPhone')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.contactPhone ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>

              <div className="sm:col-span-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                Verified Banking Settlement Info
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Bank Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. State Bank of India / HDFC"
                  {...register('bankName')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.bankName ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  placeholder="Acme Global Logistics Pvt Ltd"
                  {...register('accountHolder')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.accountHolder ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Account Number / IBAN *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5010023490123"
                  {...register('accountNumber')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.accountNumber ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  IFSC Code / Routing Code *
                </label>
                <input
                  type="text"
                  placeholder="e.g. SBIN0001234"
                  maxLength={11}
                  {...register('ifscCode')}
                  className={`mt-1.5 h-9 w-full rounded-xl border bg-white px-3 font-mono text-xs uppercase text-slate-900 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                    errors.ifscCode ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
                {errors.ifscCode && (
                  <p className="mt-1 text-[11px] font-medium text-red-500">
                    {errors.ifscCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Payment Terms, Certifications & Uploads */}
        {activeStep === 4 && (
          <div className="space-y-6 animate-in fade-in-50">
            <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Step 4: Payment Terms, Certifications & File Uploads
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Contract payment terms, quality certifications, and compliance file uploader.
              </p>
            </div>

            {/* Payment Terms Select */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Preferred Payment Terms *
              </label>
              <select
                {...register('paymentTerms')}
                className="mt-1.5 h-9 w-full sm:w-72 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="Net 15">Net 15 Days</option>
                <option value="Net 30">Net 30 Days (Default)</option>
                <option value="Net 45">Net 45 Days</option>
                <option value="Net 60">Net 60 Days</option>
                <option value="Due on Receipt">Due on Receipt</option>
                <option value="Advance">Advance Payment</option>
              </select>
            </div>

            {/* Certifications Checkbox Options */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                ISO & Industry Quality Certifications
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {CERTIFICATION_OPTIONS.map((cert) => {
                  const isChecked = selectedCertifications.includes(cert);
                  return (
                    <button
                      key={cert}
                      type="button"
                      onClick={() => handleCertToggle(cert)}
                      className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs transition-all ${
                        isChecked
                          ? 'border-indigo-600 bg-indigo-50/60 font-semibold text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200'
                          : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div
                        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border ${
                          isChecked
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                      <span className="truncate">{cert}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drag & Drop File Uploader Area */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Upload Compliance Documents (GST/PAN Copy, ISO Cert, W-9, Bank Proof) *
              </label>

              <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center hover:border-indigo-500 dark:border-slate-700 dark:bg-slate-900/40">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.jpg,.png"
                  onChange={handleSimulatedFileUpload}
                  className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 mb-2">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Drop compliance files here or click to browse
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Supports PDF, DOCX, PNG, JPG (Max 10MB per file)
                </p>
              </div>

              {errors.uploadedDocuments && (
                <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" /> {errors.uploadedDocuments.message}
                </p>
              )}

              {/* Uploaded File List */}
              {uploadedDocs.length > 0 && (
                <div className="mt-4 space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Uploaded Files ({uploadedDocs.length})
                  </span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {uploadedDocs.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-xs dark:border-slate-800 dark:bg-slate-900"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                              {doc.name}
                            </p>
                            <p className="text-[10px] text-slate-400">{doc.size}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveDoc(idx)}
                          className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 5: Review & Confirm Submission */}
        {activeStep === 5 && (
          <div className="space-y-6 animate-in fade-in-50">
            <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Step 5: Review & Confirm Registration
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Please double-check all information before submitting vendor profile.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Box 1: General Info Summary */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">General & Tax</h4>
                  <button type="button" onClick={() => setActiveStep(1)} className="text-[11px] text-indigo-600 font-medium hover:underline">Edit</button>
                </div>
                <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                  <p><strong>Name:</strong> {watch('name')}</p>
                  <p><strong>Category:</strong> {watch('category')}</p>
                  <p><strong>GSTIN:</strong> {watch('gst')}</p>
                  <p><strong>PAN:</strong> {watch('pan')}</p>
                </div>
              </div>

              {/* Box 2: Address Summary */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Address Location</h4>
                  <button type="button" onClick={() => setActiveStep(2)} className="text-[11px] text-indigo-600 font-medium hover:underline">Edit</button>
                </div>
                <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                  <p>{watch('addressStreet')}</p>
                  <p>{watch('city')}, {watch('state')} - {watch('pincode')}</p>
                  <p>{watch('country')}</p>
                </div>
              </div>

              {/* Box 3: Contact & Banking Summary */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Contact & Banking</h4>
                  <button type="button" onClick={() => setActiveStep(3)} className="text-[11px] text-indigo-600 font-medium hover:underline">Edit</button>
                </div>
                <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                  <p><strong>Lead:</strong> {watch('contactName')} ({watch('contactEmail')})</p>
                  <p><strong>Phone:</strong> {watch('contactPhone')}</p>
                  <p><strong>Bank:</strong> {watch('bankName')} ({watch('ifscCode')})</p>
                </div>
              </div>

              {/* Box 4: Terms & Uploads Summary */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Terms & Documents</h4>
                  <button type="button" onClick={() => setActiveStep(4)} className="text-[11px] text-indigo-600 font-medium hover:underline">Edit</button>
                </div>
                <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                  <p><strong>Payment Terms:</strong> {watch('paymentTerms')}</p>
                  <p><strong>Uploaded Files:</strong> {uploadedDocs.length} file(s)</p>
                  <p><strong>Certifications:</strong> {selectedCertifications.join(', ') || 'None'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stepper Footer Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <Button
            type="button"
            variant="outline"
            disabled={activeStep === 1 || isSubmitting}
            onClick={handlePrevStep}
            className="gap-2 text-xs"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {activeStep < 5 ? (
            <Button
              type="button"
              onClick={handleNextStep}
              className="gap-2 bg-indigo-600 text-white hover:bg-indigo-700 text-xs"
            >
              Continue Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700 text-xs shadow-md"
            >
              {isSubmitting ? 'Submitting Vendor...' : 'Confirm & Register Vendor'}
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
