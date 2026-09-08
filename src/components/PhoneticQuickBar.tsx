import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronRight,
  Smile,
  BookMarked,
  Image as ImageIcon,
  FileText,
  Asterisk,
  Sparkles,
} from 'lucide-react';
import { ThemeConfig } from '../types';
import { DEFAULT_SNIPPETS } from '../data/snippets';

interface PhoneticQuickBarProps {
  theme: ThemeConfig;
  onOpenJuktoborno: () => void;
  onInsertSampleText: (text: string) => void;
  onOpenEmojiPicker: () => void;
  onOpenDictionary: () => void;
  onOpenCardExport: () => void;
}

const COMMON_SHORTCUTS = [
  { trigger: 'ami', output: 'আমি' },
  { trigger: 'kemon', output: 'কেমন' },
  { trigger: 'bangla', output: 'বাংলা' },
  { trigger: 'shikkha', output: 'শিক্ষা' },
  { trigger: 'dhonnobad', output: 'ধন্যবাদ' },
  { trigger: 'bhalobashi', output: 'ভালোবাসি' },
];

const SPECIAL_SIGNS_LIST = [
  { char: '\u200C', label: 'ZWNJ', hint: 'যুক্ত না করার চিহ্ন (Zero-Width Non-Joiner)' },
  { char: '\u200D', label: 'ZWJ', hint: 'বিশেষ যুক্ত রূপ চিহ্ন' },
  { char: '্', label: '্ (হসন্ত)', hint: 'হসন্ত' },
  { char: 'ঁ', label: 'ঁ (চন্দ্রবিন্দু)', hint: 'চন্দ্রবিন্দু' },
  { char: 'ঃ', label: 'ঃ (বিসর্গ)', hint: 'বিসর্গ' },
  { char: 'ং', label: 'ং (অনুস্বার)', hint: 'অনুস্বার' },
  { char: 'ৎ', label: 'ৎ (খণ্ড-ত)', hint: 'খণ্ড ত' },
  { char: '৳', label: '৳ (টাকা)', hint: 'বাংলাদেশী টাকা প্রতীক' },
  { char: 'ঽ', label: 'ঽ (অবগ্রহ)', hint: 'অবগ্রহ' },
];

export const PhoneticQuickBar: React.FC<PhoneticQuickBarProps> = ({
  theme,
  onOpenJuktoborno,
  onInsertSampleText,
  onOpenEmojiPicker,
  onOpenDictionary,
  onOpenCardExport,
}) => {
  const [activeTab, setActiveTab] = useState<'shortcuts' | 'snippets' | 'signs'>('shortcuts');
  const isGlass = theme.isGlass;

  return (
    <div
      id="phonetic-quick-bar"
      className="px-3 py-1.5 flex flex-col gap-1.5 text-xs border-b select-none transition-all duration-150"
      style={{
        backgroundColor: theme.headerBg,
        borderColor: theme.keyBorder,
        color: theme.keySubText,
        backdropFilter: theme.backdropBlur || 'none',
        WebkitBackdropFilter: theme.backdropBlur || 'none',
      }}
    >
      {/* Top Controls Strip: Tabs & Quick Dialog Triggers */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        {/* Category Selector Tabs */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('shortcuts')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              activeTab === 'shortcuts' ? 'font-semibold shadow-xs' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeTab === 'shortcuts' ? theme.accentColor : 'transparent',
              color: activeTab === 'shortcuts' ? theme.accentText : theme.keyText,
            }}
          >
            শর্টকাট
          </button>

          <button
            onClick={() => setActiveTab('snippets')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              activeTab === 'snippets' ? 'font-semibold shadow-xs' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeTab === 'snippets' ? theme.accentColor : 'transparent',
              color: activeTab === 'snippets' ? theme.accentText : theme.keyText,
            }}
          >
            শুভেচ্ছা ও বাক্য
          </button>

          <button
            onClick={() => setActiveTab('signs')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              activeTab === 'signs' ? 'font-semibold shadow-xs' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeTab === 'signs' ? theme.accentColor : 'transparent',
              color: activeTab === 'signs' ? theme.accentText : theme.keyText,
            }}
          >
            চিহ্ন ও ZWNJ
          </button>
        </div>

        {/* Right Quick Tools: Emoji, Dictionary, Card Export, Juktoborno */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          {/* Emoji Trigger */}
          <button
            onClick={onOpenEmojiPicker}
            title="ইমোজি ও বাংলা প্রতীক প্যানেল"
            className="px-2 py-1 rounded-lg border text-[11px] flex items-center gap-1 transition-all hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.keyBorder,
              color: theme.keyText,
            }}
          >
            <span>😊</span>
            <span className="hidden sm:inline">ইমোজি</span>
          </button>

          {/* Dictionary Trigger */}
          <button
            onClick={onOpenDictionary}
            title="ব্যক্তিগত অভিধান ও টেক্সট সংক্ষেপণ"
            className="px-2 py-1 rounded-lg border text-[11px] flex items-center gap-1 transition-all hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.keyBorder,
              color: theme.keyText,
            }}
          >
            <BookMarked className="w-3 h-3 text-sky-400" />
            <span className="hidden sm:inline">অভিধান</span>
          </button>

          {/* Card Export Trigger */}
          <button
            onClick={onOpenCardExport}
            title="টাইপোগ্রাফি সোশ্যাল কার্ড হিসেবে এক্সপোর্ট করুন"
            className="px-2 py-1 rounded-lg border text-[11px] flex items-center gap-1 transition-all hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.keyBorder,
              color: theme.keyText,
            }}
          >
            <ImageIcon className="w-3 h-3 text-purple-400" />
            <span className="hidden sm:inline">কার্ড</span>
          </button>

          {/* Juktoborno Guide */}
          <button
            onClick={onOpenJuktoborno}
            title="যুক্তবর্ণ নিয়মাবলী"
            className="text-[11px] font-medium flex items-center gap-0.5 hover:underline shrink-0 cursor-pointer ml-1"
            style={{ color: theme.accentColor }}
          >
            <span>যুক্তবর্ণ</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Dynamic Content Strip according to active tab */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {activeTab === 'shortcuts' && (
          <>
            <span className="text-[10px] opacity-70 shrink-0">ক্লিক করে লিখুন:</span>
            {COMMON_SHORTCUTS.map(s => (
              <button
                key={s.trigger}
                onClick={() => onInsertSampleText(s.output + ' ')}
                className="px-2.5 py-0.5 rounded-full font-mono text-[11px] border transition-all hover:scale-105 shrink-0 cursor-pointer"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.keyBorder,
                  color: theme.keyText,
                  backdropFilter: isGlass ? 'blur(10px)' : 'none',
                }}
                title={`ক্লিক করে লিখুন: ${s.output}`}
              >
                <span className="opacity-70">{s.trigger}</span>
                <span className="mx-1 opacity-40">➔</span>
                <span className="font-bangla font-semibold" style={{ color: isGlass ? '#38bdf8' : theme.accentColor }}>
                  {s.output}
                </span>
              </button>
            ))}
          </>
        )}

        {activeTab === 'snippets' && (
          <>
            <span className="text-[10px] opacity-70 shrink-0">প্রস্তুত বাক্য:</span>
            {DEFAULT_SNIPPETS.map(sn => (
              <button
                key={sn.id}
                onClick={() => onInsertSampleText(sn.text + ' ')}
                className="px-2.5 py-0.5 rounded-full font-bangla text-[11px] border transition-all hover:scale-105 shrink-0 cursor-pointer"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.keyBorder,
                  color: theme.keyText,
                }}
                title={sn.text}
              >
                <span>{sn.title}</span>
              </button>
            ))}
          </>
        )}

        {activeTab === 'signs' && (
          <>
            <span className="text-[10px] opacity-70 shrink-0">বিশেষ চিহ্ন:</span>
            {SPECIAL_SIGNS_LIST.map(sign => (
              <button
                key={sign.label}
                onClick={() => onInsertSampleText(sign.char)}
                className="px-2.5 py-0.5 rounded-full font-mono text-[11px] border transition-all hover:scale-105 shrink-0 cursor-pointer flex items-center gap-1"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.keyBorder,
                  color: sign.char === '\u200C' ? '#38bdf8' : theme.keyText,
                }}
                title={sign.hint}
              >
                <span className="font-semibold">{sign.label}</span>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
