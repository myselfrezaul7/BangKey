import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      id="pwa-offline-indicator"
      className="fixed bottom-3 left-4 z-50 flex items-center gap-2 rounded-lg bg-amber-600/90 text-white text-xs px-3 py-1.5 shadow-lg backdrop-blur-sm animate-in fade-in"
    >
      <WifiOff className="w-3.5 h-3.5" />
      <span>অফলাইন মোড — ক্যাশ থেকে নির্বিঘ্নে চলবে</span>
    </div>
  );
};
