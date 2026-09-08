import React, { useState } from 'react';
import { X, Check, Keyboard, Sparkles, BookOpen } from 'lucide-react';
import { ThemeConfig } from '../types';

interface PunctuationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeConfig;
  onInsertSample?: (text: string) => void;
}

interface ShortcutRule {
  name: string;
  char: string;
  keyPress: string;
  description: string;
  exampleInput: string;
  exampleOutput: string;
}

const RULES: ShortcutRule[] = [
  {
    name: 'দাঁড়ি (Dari / Full Stop)',
    char: '।',
    keyPress: '.',
    description: 'ফুলস্টপ কী চাপলেই স্বয়ংক্রিয়ভাবে বাংলা দাঁড়ি ও পরবর্তী স্পেস যুক্ত হয়।',
    exampleInput: 'ami bhalo achi.',
    exampleOutput: 'আমি ভালো আছি। ',
  },
  {
    name: 'ইংরেজি ডট (English Dot)',
    char: '.',
    keyPress: '.. (পরপর দুবার)',
    description: 'ওয়েবসাইট (.com) বা দশমিক সংখ্যার জন্য পরপর দুবার ডট চাপলেই ইংরেজি ডট হবে।',
    exampleInput: 'prothomalo..com',
    exampleOutput: 'prothomalo.com',
  },
  {
    name: 'টাকা প্রতীক (Taka Sign)',
    char: '৳',
    keyPress: '$ (Shift + 4)',
    description: 'ডলার সাইন চাপলেই সরাসরি বাংলাদেশী টাকা প্রতীক (৳) তৈরি হবে।',
    exampleInput: '$500',
    exampleOutput: '৳৫০০',
  },
  {
    name: 'কমা (Comma)',
    char: ',',
    keyPress: ',',
    description: 'শব্দের শেষে কমা দিলে স্বয়ংক্রিয় স্পেস যুক্ত হবে।',
    exampleInput: 'shuno,',
    exampleOutput: 'শুনো, ',
  },
  {
    name: 'প্রশ্নবোধক (Question Mark)',
    char: '?',
    keyPress: '?',
    description: 'সরাসরি প্রশ্নবোধক চিহ্ন এবং বাক্যের ইতিবাচক স্পেস।',
    exampleInput: 'kemon acho?',
    exampleOutput: 'কেমন আছো? ',
  },
  {
    name: 'বিস্ময়সূচক (Exclamation)',
    char: '!',
    keyPress: '!',
    description: 'আবেগ বা উচ্ছ্বাসের জন্য বিস্ময়সূচক চিহ্ন।',
    exampleInput: 'shabash!',
    exampleOutput: 'সাবাশ! ',
  },
  {
    name: 'বড় ড্যাশ (Em-Dash)',
    char: '—',
    keyPress: '-- (পরপর দুবার -)',
    description: 'দুবার হাইফেন চাপলে মানসম্মত বড় ড্যাশ (—) তৈরি হয়।',
    exampleInput: 'kotha--',
    exampleOutput: 'কথা— ',
  },
  {
    name: 'উদ্ধৃতি চিহ্ন (Smart Quotes)',
    char: '“ ”',
    keyPress: '"',
    description: 'শব্দের আগে হলে প্রারম্ভিক “ এবং পরে হলে সমাপ্তি ” উদ্ধৃতি।',
    exampleInput: '"bhalobasha"',
    exampleOutput: '“ভালোবাসা”',
  },
  {
    name: 'ইলিপসিস / তিন ডট (Ellipsis)',
    char: '…',
    keyPress: '...',
    description: 'তিনটি ডট একসাথে রূপান্তর হয়ে প্রকৃত টাইপোগ্রাফিক ইলিপসিস (…)।',
    exampleInput: 'cholche...',
    exampleOutput: 'চলছে…',
  },
  {
    name: 'দ্বৈত দাঁড়ি (Double Dari)',
    char: '॥',
    keyPress: 'ক্লিক বা বার থেকে',
    description: 'কবিতা বা শ্লোক সমাপ্তির জন্য ব্যবহৃত সনাতন দ্বৈত দাঁড়ি।',
    exampleInput: '—',
    exampleOutput: 'বন্দে মাতরম॥',
  },
];

export const PunctuationGuideModal: React.FC<PunctuationGuideModalProps> = ({
  isOpen,
  onClose,
  theme,
  onInsertSample,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="punctuation-guide-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
    >
      <div
        id="punctuation-guide-dialog"
        className="w-full max-w-xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-all"
        style={{
          backgroundColor: theme.windowBg,
          borderColor: theme.keyBorder,
          color: theme.keyText,
          backdropFilter: theme.backdropBlur || 'none',
          WebkitBackdropFilter: theme.backdropBlur || 'none',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3.5 border-b"
          style={{
            backgroundColor: theme.headerBg,
            borderColor: theme.keyBorder,
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="p-1.5 rounded-lg"
              style={{
                backgroundColor: theme.accentColor,
                color: theme.accentText,
              }}
            >
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">সহজ যতিচিহ্ন নির্দেশিকা (Punctuation)</h2>
              <p className="text-[11px] opacity-70" style={{ color: theme.keySubText }}>
                টাইপিংকে দ্বিগুণ দ্রুত ও নির্ভুল করার স্মার্ট যতিচিহ্ন নিয়ম
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {/* Key Rule Highlight Banner */}
          <div
            className="p-3.5 rounded-xl border flex items-start gap-3"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.accentColor,
            }}
          >
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-xs text-sky-400">খুব সহজে যতিচিহ্ন কীভাবে কাজ করে?</p>
              <p className="text-[11px] leading-relaxed opacity-80">
                বাংলা লেখার সময় ফুলস্টপ কী <kbd className="px-1 py-0.5 rounded bg-black/20 font-mono text-sky-300">.</kbd> চাপলেই সরাসরি দাঁড়ি (<span className="font-bold text-white font-bangla">।</span>) এবং স্পেস তৈরি হয়। যদি আপনি ইংরেজি ডট দিতে চান, তাহলে পরপর দুবার <kbd className="px-1 py-0.5 rounded bg-black/20 font-mono text-sky-300">..</kbd> চাপুন। একইভাবে ডলার <kbd className="px-1 py-0.5 rounded bg-black/20 font-mono text-sky-300">$</kbd> চাপলেই টাকা প্রতীক (<span className="font-bold text-white font-bangla">৳</span>) হবে!
              </p>
            </div>
          </div>

          {/* Rules Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold px-1" style={{ color: theme.keySubText }}>
              যতিচিহ্ন ও কীবোর্ড শর্টকাট তালিকা:
            </h3>

            <div className="space-y-1.5">
              {RULES.map(rule => (
                <div
                  key={rule.name}
                  className="p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all"
                  style={{
                    backgroundColor: theme.cardBg,
                    borderColor: theme.keyBorder,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-base font-bold font-bangla shrink-0 shadow-xs"
                      style={{
                        backgroundColor: theme.actionKeyBg,
                        color: theme.accentColor,
                        border: `1px solid ${theme.keyBorder}`,
                      }}
                    >
                      {rule.char}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs">{rule.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-sky-500/15 text-sky-300 border border-sky-500/30">
                          {rule.keyPress}
                        </span>
                      </div>
                      <p className="text-[11px] opacity-75 mt-0.5 leading-snug">
                        {rule.description}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0 flex items-center sm:flex-col gap-2 sm:gap-1 text-[11px] pl-12 sm:pl-0">
                    <span className="opacity-50">ফলাফল:</span>
                    <span className="font-bangla font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {rule.exampleOutput}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-5 py-3 border-t flex items-center justify-between"
          style={{
            backgroundColor: theme.headerBg,
            borderColor: theme.keyBorder,
          }}
        >
          <p className="text-[11px] opacity-60">
            যতিচিহ্নের পর স্বয়ংক্রিয় স্পেস কীবোর্ড বারে চালু রাখা আছে।
          </p>
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={{
              backgroundColor: theme.accentColor,
              color: theme.accentText,
            }}
          >
            বুঝেছি (Got it)
          </button>
        </div>
      </div>
    </div>
  );
};
