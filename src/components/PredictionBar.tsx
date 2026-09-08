import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Sparkles,
  Clipboard,
  Smile,
} from 'lucide-react';
import { NextCharSuggestion, PredictionCandidate, ThemeConfig } from '../types';

interface PredictionBarProps {
  theme: ThemeConfig;
  candidates: PredictionCandidate[];
  nextCharSuggestions: NextCharSuggestion[];
  activeBuffer: string;
  clipboardText?: string;
  onSelectWord: (word: string) => void;
  onSelectChar: (char: string) => void;
  onInsertPunctuation: (char: string) => void;
  onPasteClipboard?: (text: string) => void;
  onOpenEmoji?: () => void;
  onVoiceInput?: (text: string) => void;
}

export const PredictionBar: React.FC<PredictionBarProps> = ({
  theme,
  candidates,
  nextCharSuggestions,
  activeBuffer,
  clipboardText,
  onSelectWord,
  onSelectChar,
  onInsertPunctuation,
  onPasteClipboard,
  onOpenEmoji,
  onVoiceInput,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const isGlass = theme.isGlass;

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setSpeechSupported(true);
    }
  }, []);

  const toggleSpeech = () => {
    if (!speechSupported) return;

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) return;

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = 'bn-BD'; // Bengali (Bangladesh)
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript && onVoiceInput) {
          onVoiceInput(transcript);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const quickPunctuation = ['।', '?', '!', ',', '৳', '—'];

  return (
    <div
      id="prediction-container"
      className="flex flex-col border-b select-none transition-all duration-150"
      style={{
        backgroundColor: theme.suggestionBg,
        borderColor: theme.keyBorder,
        backdropFilter: theme.backdropBlur || 'none',
        WebkitBackdropFilter: theme.backdropBlur || 'none',
      }}
    >
      {/* 1. Main Predictive Words Strip (Gboard + iOS 27 Glass Pills) */}
      <div className="flex items-center justify-between px-3 py-2 gap-2 overflow-x-auto no-scrollbar min-h-[48px]">
        {/* Word Candidate Chips */}
        <div className="flex items-center gap-2 flex-1 overflow-x-auto no-scrollbar py-0.5">
          {/* Gboard Signature: If typing English, offer raw English word on the far left */}
          {activeBuffer ? (
            <button
              id="raw-english-candidate"
              onClick={() => onSelectWord(activeBuffer)}
              title={`ইংরেজি "${activeBuffer}" হিসেবে রাখুন`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer opacity-80 hover:opacity-100 hover:scale-105"
              style={{
                backgroundColor: theme.cardBg,
                color: theme.keyText,
                border: `1px dashed ${theme.keyBorder}`,
                backdropFilter: isGlass ? 'blur(10px)' : 'none',
              }}
            >
              <span className="opacity-50">"</span>
              <span className="font-semibold text-sky-400">{activeBuffer}</span>
              <span className="opacity-50">"</span>
            </button>
          ) : null}

          {/* Gboard Clipboard Suggestion Chip */}
          {!activeBuffer && clipboardText && onPasteClipboard ? (
            <button
              id="gboard-clipboard-chip"
              onClick={() => onPasteClipboard(clipboardText)}
              title="ক্লিপবোর্ড থেকে পেস্ট করুন"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bangla transition-all shrink-0 cursor-pointer border hover:scale-105"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.accentColor,
                color: theme.keyText,
              }}
            >
              <Clipboard className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="opacity-60 text-[11px]">পেস্ট:</span>
              <span className="font-medium max-w-[120px] truncate">{clipboardText}</span>
            </button>
          ) : null}

          {candidates.length > 0 ? (
            candidates.map((cand, idx) => {
              const isTop = idx === 0;
              const isCustom = cand.source === 'custom';

              return (
                <button
                  key={`${cand.word}-${idx}`}
                  id={`predict-word-${idx}`}
                  onClick={() => onSelectWord(cand.word)}
                  title={cand.phoneticBreakdown || cand.meaningOrHint || 'শব্দ চয়ন করুন'}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm transition-all shrink-0 cursor-pointer ${
                    isTop
                      ? 'font-bold scale-[1.03]'
                      : 'font-normal hover:opacity-90 hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: isTop ? theme.suggestionActiveBg : theme.cardBg,
                    color: isTop ? (isGlass ? '#ffffff' : theme.accentColor) : theme.keyText,
                    border: `1px solid ${isCustom ? '#38bdf8' : isTop ? theme.accentColor : theme.keyBorder}`,
                    boxShadow:
                      isTop && isGlass
                        ? `0 0 16px ${theme.accentColor}66, inset 0 1px 1px rgba(255,255,255,0.4)`
                        : isGlass
                        ? 'inset 0 1px 0.5px rgba(255,255,255,0.2)'
                        : 'none',
                    backdropFilter: isGlass ? 'blur(12px)' : 'none',
                  }}
                >
                  <span className="font-bangla tracking-wide">{cand.word}</span>

                  {/* Show tag for custom dictionary or phonetic breakdown */}
                  {isCustom ? (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-sans">
                      শর্টকাট
                    </span>
                  ) : cand.phoneticBreakdown ? (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full opacity-80 font-mono hidden sm:inline-block"
                      style={{
                        backgroundColor: isGlass ? 'rgba(255,255,255,0.1)' : theme.suggestionBg,
                        color: theme.keySubText,
                      }}
                    >
                      {cand.phoneticBreakdown.slice(0, 14)}
                    </span>
                  ) : null}

                  {isTop && (
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded-full font-sans uppercase opacity-85 hidden md:inline-flex items-center gap-0.5"
                      style={{
                        backgroundColor: isGlass ? 'rgba(0,0,0,0.3)' : theme.cardBg,
                        color: '#ffffff',
                      }}
                    >
                      Space
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="text-xs px-2 italic flex items-center gap-1.5" style={{ color: theme.keySubText }}>
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>ইংরেজি টাইপ করুন (যেমন: ami, kemon, shundor, bhalobashi) ➔ সরাসরি বাংলা হবে</span>
            </div>
          )}
        </div>

        {/* Right Tools: Emoji, Voice Typing & Quick Dari */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onOpenEmoji && (
            <button
              onClick={onOpenEmoji}
              title="ইমোজি প্যানেল খুলুন"
              className="p-1.5 rounded-full text-base transition-all hover:scale-110 cursor-pointer"
              style={{
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.keyBorder}`,
              }}
            >
              😊
            </button>
          )}

          {speechSupported && (
            <button
              id="voice-typing-btn"
              onClick={toggleSpeech}
              title={isListening ? 'শোনা বন্ধ করুন' : 'বাংলা ভয়েস টাইপিং'}
              className={`p-2 rounded-full text-xs transition-all cursor-pointer ${
                isListening ? 'animate-pulse text-red-500 bg-red-500/20' : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: isListening ? 'rgba(239, 68, 68, 0.25)' : theme.cardBg,
                color: isListening ? '#f87171' : theme.keyText,
                border: `1px solid ${theme.keyBorder}`,
                backdropFilter: isGlass ? 'blur(12px)' : 'none',
              }}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          )}

          {/* Quick Dari '।' */}
          <button
            id="quick-dari-btn"
            onClick={() => onInsertPunctuation('।')}
            title="দাঁড়ি যোগ করুন (স্বয়ংক্রিয় স্পেস সহ)"
            className="px-3 py-1.5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-xs cursor-pointer"
            style={{
              backgroundColor: theme.cardBg,
              color: isGlass ? '#38bdf8' : theme.accentColor,
              border: `1px solid ${theme.keyBorder}`,
              backdropFilter: isGlass ? 'blur(12px)' : 'none',
              boxShadow: isGlass ? 'inset 0 1px 1px rgba(255,255,255,0.2)' : 'none',
            }}
          >
            ।
          </button>
        </div>
      </div>

      {/* 2. Character-Based Prediction & Kar Assistant Strip */}
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs border-t overflow-x-auto no-scrollbar"
        style={{
          backgroundColor: theme.headerBg,
          borderColor: theme.keyBorder,
          backdropFilter: theme.backdropBlur || 'none',
        }}
      >
        <span
          className="text-[11px] font-medium shrink-0 flex items-center gap-1"
          style={{ color: theme.keySubText }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: theme.accentColor }}
          />
          পরবর্তী সম্ভাব্য বর্ণ/কার:
        </span>

        {nextCharSuggestions.length > 0 ? (
          nextCharSuggestions.slice(0, 10).map((sug, i) => (
            <button
              key={`${sug.label}-${i}`}
              id={`predict-char-${i}`}
              onClick={() => onSelectChar(sug.char)}
              title={sug.breakdown || sug.label}
              className="px-2.5 py-1 rounded-lg font-bangla text-xs transition-all hover:scale-105 shrink-0 flex items-center gap-1 cursor-pointer"
              style={{
                backgroundColor: theme.cardBg,
                color:
                  sug.type === 'zwnj'
                    ? '#38bdf8'
                    : sug.type === 'juktoborno'
                    ? (isGlass ? '#38bdf8' : theme.accentColor)
                    : theme.keyText,
                border: `1px solid ${
                  sug.type === 'zwnj'
                    ? '#38bdf8'
                    : sug.type === 'juktoborno'
                    ? theme.accentColor
                    : theme.keyBorder
                }`,
                backdropFilter: isGlass ? 'blur(10px)' : 'none',
              }}
            >
              <span className="font-semibold">{sug.label}</span>
              {sug.type === 'juktoborno' && (
                <span className="text-[9px] px-1 rounded-full opacity-70 bg-white/10">যুক্ত</span>
              )}
              {sug.type === 'zwnj' && (
                <span className="text-[9px] px-1 rounded-full bg-sky-500/20 text-sky-300">ZWNJ</span>
              )}
            </button>
          ))
        ) : (
          <span className="text-[11px] italic opacity-70" style={{ color: theme.keySubText }}>
            কোনো বর্ণ টাইপ করলে স্বয়ংক্রিয় কার ও যুক্তবর্ণের পরামর্শ আসবে
          </span>
        )}

        <div className="ml-auto flex items-center gap-1 shrink-0">
          {quickPunctuation.map((p, idx) => (
            <button
              key={idx}
              id={`quick-punct-${idx}`}
              onClick={() => onInsertPunctuation(p)}
              className="w-6 h-6 flex items-center justify-center rounded-lg text-xs transition-transform hover:scale-110 cursor-pointer"
              style={{
                backgroundColor: theme.cardBg,
                color: theme.keySubText,
                border: `1px solid ${theme.keyBorder}`,
                backdropFilter: isGlass ? 'blur(10px)' : 'none',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
