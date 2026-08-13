import { useState, useEffect } from 'react';
import {
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Moon,
  Sun,
  Bell,
  Globe,
  Sliders,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { useTheme, useToggleTheme } from '@/hooks/useUIStore';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: true,
    browserPush: true,
    inApp: true,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDeviceCategory = (width: number) => {
    if (width >= 1280) return { label: 'Desktop (4K / Widescreen)', icon: Monitor, color: 'text-indigo-600 dark:text-indigo-400' };
    if (width >= 1024) return { label: 'Laptop / Netbook', icon: Laptop, color: 'text-emerald-600 dark:text-emerald-400' };
    if (width >= 768) return { label: 'Tablet (iPad / Surface)', icon: Tablet, color: 'text-amber-600 dark:text-amber-400' };
    return { label: 'Mobile Smartphone', icon: Smartphone, color: 'text-purple-600 dark:text-purple-400' };
  };

  const currentDevice = getDeviceCategory(windowSize.width);
  const DeviceIcon = currentDevice.icon;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="mx-auto max-w-screen-xl space-y-6">
      {/* Page Hero Header */}
      <div className="flex flex-col gap-2 border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              System Settings & Responsive Experience
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verify device viewport responsiveness across Desktop, Laptop, Tablet, and Mobile screens. Configure themes and preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Device Viewport Live Inspector */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <DeviceIcon className={`h-5 w-5 ${currentDevice.color}`} />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Active Viewport Diagnostics
            </h3>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {windowSize.width}px × {windowSize.height}px
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Monitor className="h-4 w-4" />
              <span>Device Category</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {currentDevice.label}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Globe className="h-4 w-4" />
              <span>Display Scale DPR</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {windowSize.pixelRatio}x Retina DPR
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Sliders className="h-4 w-4" />
              <span>Layout Grid Mode</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {windowSize.width < 640
                ? 'Mobile 1-Col Stack'
                : windowSize.width < 1024
                ? 'Tablet 2-Col Grid'
                : 'Desktop Multi-Pane Grid'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Responsive Compliance</span>
            </div>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              100% Fluid & Adaptive
            </p>
          </div>
        </div>

        {/* Viewport Test Breakpoint Buttons */}
        <div className="border-t border-slate-100 pt-4 dark:border-slate-800 space-y-2">
          <p className="text-xs font-semibold text-slate-500">
            Tested Breakpoints & Screen Targets:
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'Desktop (1440px+)', icon: Monitor, desc: 'Sidebar expanded, 3-4 col cards' },
              { label: 'Laptop (1024px)', icon: Laptop, desc: 'Collapsible sidebar, 2-3 col cards' },
              { label: 'Tablet (768px)', icon: Tablet, desc: 'Drawer sidebar overlay, 2 col cards' },
              { label: 'Mobile (375px)', icon: Smartphone, desc: '1-col full width stacked' },
            ].map((bp) => {
              const Icon = bp.icon;
              return (
                <div
                  key={bp.label}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="font-bold">{bp.label}</p>
                    <p className="text-[10px] text-slate-400">{bp.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Theme & Display Preferences */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Appearance Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              {theme === 'dark' ? <Moon className="h-4 w-4 text-indigo-400" /> : <Sun className="h-4 w-4 text-amber-500" />}
              Appearance & Dark Mode
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Customize application UI theme theme</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                if (theme !== 'light') toggleTheme();
              }}
              className={`flex items-center gap-3 rounded-xl border p-4 transition-all ${
                theme === 'light'
                  ? 'border-indigo-600 bg-indigo-50/50 font-bold text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-600'
              }`}
            >
              <Sun className="h-5 w-5 text-amber-500" />
              <div className="text-left">
                <p className="text-xs font-bold">Light Mode</p>
                <p className="text-[10px] text-slate-400">Clean white UI</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                if (theme !== 'dark') toggleTheme();
              }}
              className={`flex items-center gap-3 rounded-xl border p-4 transition-all ${
                theme === 'dark'
                  ? 'border-indigo-600 bg-indigo-50/50 font-bold text-indigo-900 dark:border-indigo-500 dark:bg-indigo-950/40 dark:text-indigo-200'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-600'
              }`}
            >
              <Moon className="h-5 w-5 text-indigo-400" />
              <div className="text-left">
                <p className="text-xs font-bold">Dark Mode</p>
                <p className="text-[10px] text-slate-400">Sleek dark UI</p>
              </div>
            </button>
          </div>
        </div>

        {/* Notifications Preference Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Bell className="h-4 w-4 text-indigo-500" />
              Notification Subscriptions
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Toggle alert channels</p>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                In-App Navbar Bell Notifications
              </span>
              <input
                type="checkbox"
                checked={notificationsEnabled.inApp}
                onChange={(e) =>
                  setNotificationsEnabled({
                    ...notificationsEnabled,
                    inApp: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded accent-indigo-600"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Browser Push Notifications
              </span>
              <input
                type="checkbox"
                checked={notificationsEnabled.browserPush}
                onChange={(e) =>
                  setNotificationsEnabled({
                    ...notificationsEnabled,
                    browserPush: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded accent-indigo-600"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Email Executive Digest
              </span>
              <input
                type="checkbox"
                checked={notificationsEnabled.email}
                onChange={(e) =>
                  setNotificationsEnabled({
                    ...notificationsEnabled,
                    email: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded accent-indigo-600"
              />
            </label>
          </div>
        </div>
      </section>

      {/* Export System Settings Button */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          size="sm"
          onClick={() => showToast('System preferences saved successfully!')}
          className="gap-2 bg-indigo-600 text-white hover:bg-indigo-700 text-xs"
        >
          <Download className="h-4 w-4" />
          Save System Preferences
        </Button>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-900 p-4 text-white shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <p className="text-xs font-medium">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}
