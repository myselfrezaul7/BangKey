import React, { useState } from 'react';
import {
  Copy,
  Check,
  Volume2,
  Trash2,
  Download,
  ArrowLeftRight,
  Sparkles,
  CornerDownLeft,
  Image as ImageIcon,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { ThemeConfig } from '../types';

interface EditorAreaProps {
  theme: ThemeConfig;
  text: string;
  onTextChange: (newText: string) => void;
  activeBuffer: string;
  composingBangla: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  editorRef: React.RefObject<HTMLTextAreaElement | null>;
  onSelectWord: (word: string) => void;
  onOpenCardExport?: () => void;
  onCopyNotification?: (text: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

function toggleBanglaNumbers(str: string): string {
  const enToBn: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
  };
  const bnToEn: Record<string, string> = {
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
    '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
  };

  const hasBn = /[০-৯]/.test(str);
  if (hasBn) {
    return str.replace(/[০-৯]/g, m => bnToEn[m] || m);
  } else {
    return str.replace(/[0-9]/g, m => enToBn[m] || m);
  }
}

export const EditorArea: React.FC<EditorAreaProps> = ({
  theme,
  text,
  onTextChange,
  activeBuffer,
  composingBangla,
  onKeyDown,
  editorRef,
  onSelectWord,
  onOpenCardExport,
  onCopyNotification,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isGlass = theme.isGlass;

  // Full displayed text: committed text + active Gboard transliterated Bangla word
  const displayText = activeBuffer ? text + composingBangla : text;

  // Statistics
  const charCount = displayText.length;
  const wordCount = displayText.trim() ? displayText.trim().split(/\s+/).length : 0;

  const handleCopy = async () => {
    if (!displayText) return;
    try {
      await navigator.clipboard.writeText(displayText);
      setCopied(true);
      if (onCopyNotification) {
        onCopyNotification(displayText);
      }
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    if (!displayText) return;
    const blob = new Blob([displayText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bangla_Doc_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSpeak = () => {
    if (!displayText || typeof window === 'undefined') return;
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(displayText);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.95;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleConvertNumbers = () => {
    onTextChange(toggleBanglaNumbers(displayText));
  };

  // If collapsed: render sleek single-line floating input strip
  if (isCollapsed) {
    return (
      <div
        id="editor-container-collapsed"
        className="px-3 py-2 border-b flex items-center justify-between gap-2 select-none"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.keyBorder,
        }}
      >
        <div className="flex-1 flex items-center gap-2 overflow-hidden">
          <button
            onClick={onToggleCollapse}
            title="এডিটর বড় করুন"
            className="p-1 rounded opacity-70 hover:opacity-100 transition-opacity cursor-pointer shrink-0"
            style={{ color: theme.keyText }}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="truncate font-bangla text-sm" style={{ color: theme.keyText }}>
            {displayText || <span className="opacity-40 italic">টাইপ করুন...</span>}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleCopy}
            title="কপি করুন"
            className="px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer transition-all"
            style={{
              backgroundColor: theme.accentColor,
              color: theme.accentText,
            }}
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'কপি হয়েছে' : 'কপি'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="editor-container"
      className="flex flex-col flex-1 min-h-[140px] max-h-[300px] border-b relative transition-all duration-150"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.keyBorder,
        backdropFilter: theme.backdropBlur || 'none',
        WebkitBackdropFilter: theme.backdropBlur || 'none',
      }}
    >
      {/* Editor Main Textarea */}
      <div className="relative flex-1 p-3.5 sm:p-4 overflow-hidden flex flex-col">
        <textarea
          ref={editorRef}
          id="bangla-editor-input"
          value={displayText}
          onChange={e => {
            if (!activeBuffer) {
              onTextChange(e.target.value);
            }
          }}
          onKeyDown={onKeyDown}
          placeholder="এখানে লিখুন (ইংরেজি কী টাইপ করলেই তা সরাসরি বাংলায় রূপান্তরিত হবে — যেমন: ami, kemon, bhalobashi)..."
          className="w-full flex-1 bg-transparent resize-none outline-none font-bangla text-base sm:text-lg leading-relaxed transition-colors selection:bg-sky-500/20"
          style={{
            color: theme.keyText,
            fontFamily:
              theme.fontFamily === 'Noto Sans Bengali'
                ? "'Noto Sans Bengali', sans-serif"
                : "'Hind Siliguri', sans-serif",
          }}
          autoFocus
        />

        {/* Live Gboard Transliteration Pill */}
        {activeBuffer ? (
          <div
            className="absolute bottom-2.5 left-4 px-3 py-1 rounded-full text-xs shadow-md flex items-center gap-2 border transition-all animate-fadeIn"
            style={{
              backgroundColor: isGlass ? 'rgba(15, 23, 42, 0.82)' : theme.windowBg,
              borderColor: theme.keyBorder,
              color: '#ffffff',
              backdropFilter: isGlass ? 'blur(16px)' : 'none',
              WebkitBackdropFilter: isGlass ? 'blur(16px)' : 'none',
              boxShadow: isGlass ? '0 4px 14px rgba(0,0,0,0.35), inset 0 1px 0.5px rgba(255,255,255,0.2)' : undefined,
            }}
          >
            <div className="flex items-center gap-1.5 font-mono text-[10.5px] opacity-75">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: theme.accentColor }}
              />
              <span>ইংরেজি:</span>
              <span className="font-bold underline text-sky-300">{activeBuffer}</span>
            </div>

            <span className="opacity-40">➔</span>

            <div className="flex items-center gap-1.5">
              <span className="text-[10.5px] opacity-75">বাংলা:</span>
              <span className="font-bangla font-semibold text-xs text-emerald-300">{composingBangla}</span>
            </div>
          </div>
        ) : null}
      </div>

      {/* Editor Bottom Utility Bar */}
      <div
        className="px-3 sm:px-4 py-1.5 flex items-center justify-between border-t text-xs select-none"
        style={{
          borderColor: theme.keyBorder,
          backgroundColor: theme.headerBg,
          color: theme.keySubText,
        }}
      >
        {/* Left: Word & Character Counter + Collapse Button */}
        <div className="flex items-center gap-2.5">
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title="এডিটর ছোট করুন (কমপ্যাক্ট বার মোড)"
              className="p-1 rounded opacity-60 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1 text-[11px]"
              style={{ color: theme.keyText }}
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span className="hidden min-[480px]:inline">ছোট করুন</span>
            </button>
          )}

          <div className="flex items-center gap-2 text-[11px] opacity-75">
            <span>
              শব্দ: <strong style={{ color: theme.keyText }}>{wordCount}</strong>
            </span>
            <span>•</span>
            <span>
              অক্ষর: <strong style={{ color: theme.keyText }}>{charCount}</strong>
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Number Toggle */}
          <button
            id="toggle-numbers-btn"
            onClick={handleConvertNumbers}
            title="সংখ্যা রূপান্তর (১ ⇄ 1)"
            className="px-2 py-1 rounded-lg flex items-center gap-1 transition-all hover:opacity-80 cursor-pointer"
            style={{
              backgroundColor: theme.cardBg,
              color: theme.keyText,
              border: `1px solid ${theme.keyBorder}`,
            }}
          >
            <ArrowLeftRight className="w-3 h-3" />
            <span className="hidden sm:inline text-[11px]">১ ⇄ 1</span>
          </button>

          {/* Text to Speech */}
          <button
            id="tts-read-btn"
            onClick={handleSpeak}
            title={isSpeaking ? 'পড়া বন্ধ করুন' : 'পড়ে শুনুন (Listen Aloud)'}
            className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
              isSpeaking ? 'animate-pulse' : 'hover:opacity-80'
            }`}
            style={{
              backgroundColor: isSpeaking ? theme.accentColor : theme.cardBg,
              color: isSpeaking ? theme.accentText : theme.keyText,
              border: `1px solid ${theme.keyBorder}`,
            }}
          >
            <Volume2 className="w-3 h-3" />
            <span className="hidden md:inline text-[11px]">শুনুন</span>
          </button>

          {/* Download Text */}
          <button
            id="download-txt-btn"
            onClick={handleDownload}
            title="টেক্সট ফাইল হিসেবে সংরক্ষণ করুন (.txt)"
            className="px-2 py-1 rounded-lg flex items-center gap-1 transition-all hover:opacity-80 cursor-pointer"
            style={{
              backgroundColor: theme.cardBg,
              color: theme.keyText,
              border: `1px solid ${theme.keyBorder}`,
            }}
          >
            <Download className="w-3 h-3" />
            <span className="hidden md:inline text-[11px]">সংরক্ষণ</span>
          </button>

          {/* Typography Card Export */}
          {onOpenCardExport && (
            <button
              id="export-card-btn"
              onClick={onOpenCardExport}
              title="বাংলা টাইপোগ্রাফি কার্ড তৈরি করুন"
              className="px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer border"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.keyBorder,
                color: theme.keyText,
              }}
            >
              <ImageIcon className="w-3 h-3 text-indigo-400" />
              <span className="hidden md:inline text-[11px]">কার্ড</span>
            </button>
          )}

          {/* Copy Button */}
          <button
            id="copy-text-btn"
            onClick={handleCopy}
            title="ক্লিপবোর্ডে কপি করুন"
            className="px-2.5 sm:px-3 py-1 rounded-lg flex items-center gap-1 font-medium transition-all shadow-xs cursor-pointer hover:scale-[1.02]"
            style={{
              backgroundColor: theme.accentColor,
              color: theme.accentText,
            }}
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span className="text-[11px]">{copied ? 'কপি হয়েছে' : 'কপি'}</span>
          </button>

          {/* Clear */}
          {displayText.length > 0 && (
            <button
              id="clear-text-btn"
              onClick={() => onTextChange('')}
              title="সব মুছে ফেলুন"
              className="p-1 rounded-lg transition-colors hover:text-red-400 cursor-pointer"
              style={{ color: theme.keySubText }}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
