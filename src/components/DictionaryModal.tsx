import React, { useState } from 'react';
import { BookMarked, Plus, Trash2, X, Sparkles } from 'lucide-react';
import { CustomDictionaryEntry, ThemeConfig } from '../types';

interface DictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: CustomDictionaryEntry[];
  onAddEntry: (shortcut: string, expansion: string) => void;
  onDeleteEntry: (id: string) => void;
  theme: ThemeConfig;
}

export const DictionaryModal: React.FC<DictionaryModalProps> = ({
  isOpen,
  onClose,
  entries,
  onAddEntry,
  onDeleteEntry,
  theme,
}) => {
  const [shortcut, setShortcut] = useState('');
  const [expansion, setExpansion] = useState('');
  const isGlass = theme.isGlass;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shortcut.trim() || !expansion.trim()) return;
    onAddEntry(shortcut.trim(), expansion.trim());
    setShortcut('');
    setExpansion('');
  };

  return (
    <div
      id="dictionary-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="dictionary-dialog"
        className="w-full max-w-lg max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-all"
        style={{
          backgroundColor: theme.windowBg,
          borderColor: theme.keyBorder,
          backdropFilter: theme.backdropBlur || 'blur(28px)',
          WebkitBackdropFilter: theme.backdropBlur || 'blur(28px)',
          boxShadow: isGlass
            ? '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 1.5px rgba(255,255,255,0.3)'
            : undefined,
          color: theme.keyText,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b select-none"
          style={{
            backgroundColor: theme.headerBg,
            borderColor: theme.keyBorder,
          }}
        >
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5" style={{ color: theme.accentColor }} />
            <div>
              <h3 className="font-semibold text-sm">ব্যক্তিগত অভিধান ও শর্টকাট (Custom Expansions)</h3>
              <p className="text-[11px] opacity-70" style={{ color: theme.keySubText }}>
                ইংরেজি সংক্ষেপ লিখলে স্বয়ংক্রিয়ভাবে পূর্ণ বাংলা শব্দ বা বাক্য প্রসারিত হবে
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg transition-colors hover:opacity-75 cursor-pointer"
            style={{ color: theme.keySubText }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Shortcut Form */}
        <form onSubmit={handleSubmit} className="p-4 border-b flex flex-col gap-3" style={{ borderColor: theme.keyBorder }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-medium opacity-80 block mb-1">
                ইংরেজি শর্টকাট (যেমন: asl, ty, shuvo)
              </label>
              <input
                type="text"
                value={shortcut}
                onChange={e => setShortcut(e.target.value)}
                placeholder="যেমন: asl"
                className="w-full px-3 py-1.5 rounded-xl border text-xs outline-none font-mono"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.keyBorder,
                  color: theme.keyText,
                }}
              />
            </div>

            <div>
              <label className="text-[11px] font-medium opacity-80 block mb-1">
                পূর্ণ বাংলা লেখা (Expansion)
              </label>
              <input
                type="text"
                value={expansion}
                onChange={e => setExpansion(e.target.value)}
                placeholder="যেমন: আসসালামু আলাইকুম"
                className="w-full px-3 py-1.5 rounded-xl border text-xs outline-none font-bangla"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.keyBorder,
                  color: theme.keyText,
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!shortcut.trim() || !expansion.trim()}
            className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shadow-sm self-end"
            style={{
              backgroundColor: theme.accentColor,
              color: theme.accentText,
            }}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>শর্টকাট যুক্ত করুন</span>
          </button>
        </form>

        {/* List of Entries */}
        <div className="flex-1 p-4 overflow-y-auto max-h-[320px] flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-medium opacity-75 mb-1">
            <span>সংরক্ষিত শর্টকাট তালিকা ({entries.length})</span>
            <span className="flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3 h-3 text-sky-400" />
              কীবোর্ডে টাইপ করলেই সাজেশনে আসবে
            </span>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-8 text-xs opacity-60 font-bangla">
              এখনও কোনো নিজস্ব শর্টকাট যোগ করেননি। উপরের ফর্ম থেকে যেমন "asl" ➔ "আসসালামু আলাইকুম" যোগ করে দেখুন!
            </div>
          ) : (
            entries.map(entry => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-2.5 rounded-xl border transition-all"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.keyBorder,
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-md font-mono text-xs font-bold text-sky-400 bg-black/20 dark:bg-white/10">
                    {entry.shortcut}
                  </span>
                  <span className="opacity-40">➔</span>
                  <span className="font-bangla text-sm font-semibold">{entry.expansion}</span>
                </div>

                <button
                  onClick={() => onDeleteEntry(entry.id)}
                  title="মুছে ফেলুন"
                  className="p-1 rounded-lg hover:text-red-400 opacity-60 hover:opacity-100 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
