import React from 'react';
import { HelpCircle, Check, Sparkles } from 'lucide-react';
import { ThemeConfig } from '../types';

export interface PunctuationItem {
  id: string;
  char: string;
  label: string;
  shortcut?: string;
  hint: string;
  type: 'terminal' | 'pause' | 'quote' | 'bracket' | 'currency' | 'special';
}

export const PUNCTUATION_LIST: PunctuationItem[] = [
  { id: 'dari', char: '।', label: 'দাঁড়ি', shortcut: '.', hint: 'পূর্ণচ্ছেদ বা দাঁড়ি (ফুলস্টপ কী চাপলেই হবে)', type: 'terminal' },
  { id: 'comma', char: ',', label: 'কমা', shortcut: ',', hint: 'স্বল্প বিরতি কমা', type: 'pause' },
  { id: 'question', char: '?', label: 'প্রশ্ন', shortcut: '?', hint: 'প্রশ্নবোধক চিহ্ন', type: 'terminal' },
  { id: 'exclamation', char: '!', label: 'বিস্ময়', shortcut: '!', hint: 'বিস্ময়সূচক চিহ্ন', type: 'terminal' },
  { id: 'quotes', char: '“ ”', label: 'উদ্ধৃতি', shortcut: '"', hint: 'বাংলা উদ্ধৃতি চিহ্ন', type: 'quote' },
  { id: 'single_quote', char: '‘ ’', label: 'একক', shortcut: "'", hint: 'একক উদ্ধৃতি চিহ্ন', type: 'quote' },
  { id: 'colon', char: ':', label: 'কোলন', shortcut: ':', hint: 'কোলন চিহ্ন', type: 'pause' },
  { id: 'semicolon', char: ';', label: 'সেমিকোলন', shortcut: ';', hint: 'সেমিকোলন চিহ্ন', type: 'pause' },
  { id: 'dash', char: '—', label: 'ড্যাশ', shortcut: '--', hint: 'বড় ড্যাশ (এম-ড্যাশ)', type: 'pause' },
  { id: 'brackets', char: '( )', label: 'বন্ধনী', shortcut: '(', hint: 'প্রথম বন্ধনী', type: 'bracket' },
  { id: 'taka', char: '৳', label: 'টাকা', shortcut: '$', hint: 'বাংলাদেশী টাকা প্রতীক', type: 'currency' },
  { id: 'ellipsis', char: '…', label: 'ইলিপসিস', shortcut: '...', hint: 'বক্তব্য অসমাপ্ত বা শূন্যস্থান', type: 'special' },
  { id: 'eng_dot', char: '.', label: 'ইংরেজি ডট', hint: 'ওয়েবসাইট (.com) বা দশমিকের জন্য ইংরেজি ডট', type: 'special' },
  { id: 'double_dari', char: '॥', label: 'দ্বৈত দাঁড়ি', hint: 'কাব্যিক বা শ্লোকসমাপ্তি দ্বৈত দাঁড়ি', type: 'terminal' },
  { id: 'hyphen', char: '-', label: 'হাইফেন', hint: 'শব্দ সংযোগকারী হাইফেন', type: 'special' },
];

interface PunctuationBarProps {
  theme: ThemeConfig;
  autoSpace: boolean;
  onToggleAutoSpace: () => void;
  onInsertPunctuation: (char: string) => void;
  onOpenPunctuationGuide: () => void;
}

export const PunctuationBar: React.FC<PunctuationBarProps> = ({
  theme,
  autoSpace,
  onToggleAutoSpace,
  onInsertPunctuation,
  onOpenPunctuationGuide,
}) => {
  const isGlass = theme.isGlass;

  return (
    <div
      id="punctuation-quick-bar"
      className="px-2.5 sm:px-3 py-1.5 border-b flex items-center justify-between gap-1.5 text-xs select-none transition-all duration-150"
      style={{
        backgroundColor: theme.headerBg,
        borderColor: theme.keyBorder,
        backdropFilter: theme.backdropBlur || 'none',
        WebkitBackdropFilter: theme.backdropBlur || 'none',
      }}
    >
      {/* Left: Quick Label & Shortcuts Carousel */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1">
        <span
          className="text-[10.5px] font-semibold opacity-70 shrink-0 hidden md:flex items-center gap-1 mr-0.5"
          style={{ color: theme.keySubText }}
        >
          <Sparkles className="w-3 h-3 text-sky-400" />
          যতিচিহ্ন:
        </span>

        {PUNCTUATION_LIST.map(p => {
          const isPrimary = p.id === 'dari' || p.id === 'comma' || p.id === 'question';

          return (
            <button
              key={p.id}
              id={`punct-btn-${p.id}`}
              onClick={() => onInsertPunctuation(p.char)}
              title={`${p.label} (${p.char}) • ${p.hint}${p.shortcut ? ` • শর্টকাট: [${p.shortcut}]` : ''}`}
              className={`h-7 px-2 sm:px-2.5 rounded-lg font-bangla transition-all hover:scale-105 active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                isPrimary ? 'font-bold' : 'font-medium'
              }`}
              style={{
                backgroundColor: isPrimary ? theme.actionKeyBg : theme.cardBg,
                color: isPrimary ? (isGlass ? '#38bdf8' : theme.accentColor) : theme.keyText,
                borderColor: isPrimary ? theme.accentColor : theme.keyBorder,
                boxShadow: isGlass ? 'inset 0 1px 1px rgba(255,255,255,0.1)' : 'none',
              }}
            >
              <span className="text-sm leading-none font-bangla">{p.char}</span>
              {p.shortcut && (
                <span
                  className="text-[9px] px-1 py-0.2 rounded font-mono opacity-65 hidden sm:inline-block leading-tight"
                  style={{
                    backgroundColor: isGlass ? 'rgba(255,255,255,0.08)' : theme.keyBg,
                    color: theme.keySubText,
                  }}
                >
                  {p.shortcut}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right Controls: Auto-Space Toggle & Guide Trigger */}
      <div className="flex items-center gap-1 shrink-0 ml-1">
        {/* Auto-space after punctuation toggle */}
        <button
          id="toggle-auto-space-btn"
          onClick={onToggleAutoSpace}
          title={
            autoSpace
              ? 'অটো-স্পেস চালু: যতিচিহ্নের পর স্বয়ংক্রিয় স্পেস বসবে'
              : 'অটো-স্পেস বন্ধ: যতিচিহ্নের পর কোনো স্পেস বসবে না'
          }
          className={`h-7 px-2 rounded-lg text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer border ${
            autoSpace ? 'opacity-100' : 'opacity-60 hover:opacity-100'
          }`}
          style={{
            backgroundColor: autoSpace ? theme.actionKeyBg : theme.cardBg,
            borderColor: autoSpace ? theme.accentColor : theme.keyBorder,
            color: autoSpace ? (isGlass ? '#38bdf8' : theme.accentColor) : theme.keyText,
          }}
        >
          <div
            className={`w-3 h-3 rounded flex items-center justify-center text-[9px] ${
              autoSpace ? 'bg-sky-500 text-white' : 'border border-current'
            }`}
          >
            {autoSpace && <Check className="w-2.5 h-2.5" />}
          </div>
          <span className="hidden sm:inline">অটো-স্পেস</span>
        </button>

        {/* Punctuation Guide Trigger */}
        <button
          id="open-punct-guide-btn"
          onClick={onOpenPunctuationGuide}
          title="সহজ যতিচিহ্ন ও কীবোর্ড শর্টকাট নির্দেশিকা"
          className="h-7 w-7 rounded-lg flex items-center justify-center transition-all hover:scale-105 cursor-pointer border"
          style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.keyBorder,
            color: theme.keySubText,
          }}
        >
          <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
        </button>
      </div>
    </div>
  );
};
