import { memo, useState } from 'react';
import type { VendorContactPerson } from '@/types';
import { Mail, Phone, UserCheck, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactsTabProps {
  contacts: VendorContactPerson[];
  onAddContact?: (contact: Omit<VendorContactPerson, 'id'>) => void;
}

export const ContactsTab = memo(function ContactsTab({ contacts, onAddContact }: ContactsTabProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    if (onAddContact) {
      onAddContact({ name, role: role || 'Team Member', email, phone, isPrimary: false });
    }
    setName('');
    setRole('');
    setEmail('');
    setPhone('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Vendor Contact Personnel
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Designated team representatives, account leads, and escalation managers.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setIsAdding(true)}
          className="gap-2 bg-indigo-600 text-white hover:bg-indigo-700 text-xs"
        >
          <Plus className="h-4 w-4" />
          Add Contact Person
        </Button>
      </div>

      {/* Add Contact Form Modal */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/20 space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-900/50 pb-2">
            <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
              New Vendor Contact Person
            </h4>
            <button type="button" onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Designation / Role</label>
              <input
                type="text"
                placeholder="e.g. Account Lead"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Email Address *</label>
              <input
                type="email"
                required
                placeholder="email@vendor.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 h-8 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button size="xs" type="button" variant="ghost" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button size="xs" type="submit" className="bg-indigo-600 text-white">
              Save Contact
            </Button>
          </div>
        </form>
      )}

      {/* Contact Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white shadow-xs">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {c.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {c.role}
                  </p>
                </div>
              </div>

              {c.isPrimary && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <UserCheck className="h-3 w-3" />
                  Primary
                </span>
              )}
            </div>

            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <a href={`mailto:${c.email}`} className="text-indigo-600 hover:underline dark:text-indigo-400">
                  {c.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span>{c.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
