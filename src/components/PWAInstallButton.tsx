import React, { useState } from 'react';
import { Download, Check, Laptop, Smartphone, X, ExternalLink } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { ThemeConfig } from '../types';

interface PWAInstallButtonProps {
  theme: ThemeConfig;
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ theme, compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  // If already installed in standalone window mode, show a subtle active indicator
  if (isInstalled || justInstalled) {
    return (
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border select-none opacity-80"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.keyBorder,
          color: theme.keyText,
        }}
        title="অ্যাপটি সফলভাবে আপনার ল্যাপটপে ইন্সটল করা আছে"
      >
        <Check className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-[11px] font-medium hidden sm:inline">ইন্সটল করা</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted) {
        setJustInstalled(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        id="pwa-install-btn"
        onClick={handleInstallClick}
        title="ল্যাপটপে অ্যাপ হিসেবে ইন্সটল করুন (PWA)"
        className={`flex items-center gap-1.5 rounded-lg border text-xs font-medium transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
          compact ? 'px-2 py-1' : 'px-2.5 py-1 sm:px-3 sm:py-1.5'
        }`}
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.keyBorder,
          color: theme.keyText,
        }}
      >
        <Download className="w-3.5 h-3.5 text-sky-400 shrink-0" />
        <span className="text-[11px] font-medium">ইন্সটল</span>
      </button>

      {/* Manual / Guided Install Modal if direct prompt not yet triggered by browser */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className="w-full max-w-md rounded-2xl border p-5 shadow-2xl relative select-none"
            style={{
              backgroundColor: theme.windowBg,
              borderColor: theme.keyBorder,
              color: theme.keyText,
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b mb-4" style={{ borderColor: theme.keyBorder }}>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">ল্যাপটপে ইন্সটল করার নিয়ম</h3>
                  <p className="text-[11px] opacity-70">Google Chrome / Microsoft Edge / Brave</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1.5 rounded-lg opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl border bg-black/10 dark:bg-white/5" style={{ borderColor: theme.keyBorder }}>
                <p className="font-medium text-sky-400 mb-1">পদ্ধতি ১: ব্রাউজার এড্রেস বার থেকে</p>
                <p className="opacity-80">
                  আপনার ব্রাউজারের উপরে URL বারের ডান প্রান্তে একটি <strong>ইন্সটল আইকন</strong> (একটি মনিটর বা প্লাস চিহ্ন) দেখতে পাবেন। সেখানে ক্লিক করে <strong>"Install"</strong> চাপুন।
                </p>
              </div>

              <div className="p-3 rounded-xl border bg-black/10 dark:bg-white/5" style={{ borderColor: theme.keyBorder }}>
                <p className="font-medium text-sky-400 mb-1">পদ্ধতি ২: ব্রাউজার মেন্যু (⋮ / …)</p>
                <p className="opacity-80">
                  ব্রাউজারের ওপরের ডানদিকের ৩-ডট মেন্যুতে ক্লিক করুন ➔ <strong>Save and Share</strong> ➔ <strong>"Install page as app"</strong> বা <strong>"Install Bangla Keyboard"</strong> নির্বাচন করুন।
                </p>
              </div>

              {isIOS && (
                <div className="p-3 rounded-xl border bg-sky-500/10 text-sky-300 border-sky-500/20">
                  <p className="font-medium mb-1 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" /> iPhone বা iPad-এ:
                  </p>
                  <p className="text-[11px] opacity-90">
                    Safari ব্রাউজারের নিচে <strong>Share (শেয়ার)</strong> বাটনে ট্যাপ করে <strong>"Add to Home Screen"</strong> নির্বাচন করুন।
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all hover:opacity-90"
                style={{
                  backgroundColor: theme.accentColor,
                  color: theme.accentText,
                }}
              >
                বুঝতে পেরেছি
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
