import { memo, useState } from 'react';
import type { VendorDocument } from '@/types';
import {
  FileText,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Clock,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentsTabProps {
  documents: VendorDocument[];
  onUpload?: (doc: Omit<VendorDocument, 'id' | 'uploadedAt' | 'status' | 'downloadUrl'>) => void;
}

export const DocumentsTab = memo(function DocumentsTab({
  documents,
  onUpload,
}: DocumentsTabProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<VendorDocument['category']>('ISO Certification');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    if (onUpload) {
      onUpload({
        title,
        category,
        fileName: `${title.replace(/\s+/g, '_')}.pdf`,
        fileSize: '1.5 MB',
      });
    }
    setTitle('');
    setIsUploading(false);
  };

  const getStatusBadge = (status: VendorDocument['status']) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="h-3 w-3" /> Verified
          </span>
        );
      case 'expiring_soon':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="h-3 w-3" /> Expiring Soon
          </span>
        );
      case 'pending_verification':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            <Clock className="h-3 w-3" /> Under Verification
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-800">
            <AlertTriangle className="h-3 w-3" /> Expired
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Compliance & Legal Documents
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tax forms, ISO certificates, insurance policies, and executed contracts.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setIsUploading(true)}
          className="gap-2 bg-indigo-600 text-white hover:bg-indigo-700 text-xs"
        >
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Upload Modal Simulation */}
      {isUploading && (
        <form onSubmit={handleUploadSubmit} className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/20 space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-900/50 pb-2">
            <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
              Upload Compliance Document
            </h4>
            <button type="button" onClick={() => setIsUploading(false)} className="text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Document Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. ISO 14001 Environmental Cert"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Document Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VendorDocument['category'])}
                className="mt-1 h-8 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="ISO Certification">ISO Certification</option>
                <option value="Tax (W-9/GST)">Tax (W-9/GST)</option>
                <option value="Insurance">Insurance</option>
                <option value="NDA">NDA</option>
                <option value="Contract">Contract</option>
                <option value="Bank Detail">Bank Detail</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button size="xs" type="button" variant="ghost" onClick={() => setIsUploading(false)}>
              Cancel
            </Button>
            <Button size="xs" type="submit" className="bg-indigo-600 text-white">
              Confirm Upload
            </Button>
          </div>
        </form>
      )}

      {/* Document Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                    {doc.title}
                  </h4>
                  <p className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {doc.category}
                  </p>
                </div>
              </div>
              <div>{getStatusBadge(doc.status)}</div>
            </div>

            <div className="space-y-1 text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3">
              <div className="flex justify-between">
                <span>File Name:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{doc.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span>Uploaded Date:</span>
                <span className="text-slate-700 dark:text-slate-300">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
              </div>
              {doc.expiresAt && (
                <div className="flex justify-between">
                  <span>Expiration Date:</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-400">{new Date(doc.expiresAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-1">
              <Button size="xs" variant="outline" className="gap-1.5 text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                <Download className="h-3.5 w-3.5" /> Download File ({doc.fileSize})
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
