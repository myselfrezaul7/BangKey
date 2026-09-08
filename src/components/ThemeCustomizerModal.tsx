import React from 'react';
import { X, Check, Sliders, Palette, Volume2, Type, Laptop, Layout, Maximize } from 'lucide-react';
import { KeyboardScale, ThemeConfig, WindowWidth } from '../types';
import { THEME_PRESETS } from '../data/themes';
import { PWAInstallButton } from './PWAInstallButton';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemeConfig;
  onSelectTheme: (theme: ThemeConfig) => void;
  onUpdateThemeProperty: <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => void;
  showSubLabels: boolean;
  onToggleSubLabels: () => void;
  soundStyle: 'mechanical' | 'soft' | 'bubble';
  onChangeSoundStyle: (style: 'mechanical' | 'soft' | 'bubble') => void;
  keyboardScale?: KeyboardScale;
  onChangeKeyboardScale?: (scale: KeyboardScale) => void;
  windowWidth?: WindowWidth;
  onChangeWindowWidth?: (width: WindowWidth) => void;
}

const ACCENT_COLORS = [
  { name: 'Sky Blue', color: '#0284c7' },
  { name: 'Electric Cyan', color: '#38bdf8' },
  { name: 'Indigo Sleek', color: '#6366f1' },
  { name: 'Emerald Soft', color: '#10b981' },
  { name: 'Slate Graphite', color: '#64748b' },
  { name: 'Crimson Rose', color: '#f43f5e' },
  { name: 'Warm Amber', color: '#f59e0b' },
];

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({
  isOpen,
  onClose,
  activeTheme,
  onSelectTheme,
  onUpdateThemeProperty,
  showSubLabels,
  onToggleSubLabels,
  soundStyle,
  onChangeSoundStyle,
  keyboardScale = 'standard',
  onChangeKeyboardScale,
  windowWidth = 'standard',
  onChangeWindowWidth,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="theme-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
    >
      <div
        id="theme-customizer-dialog"
        className="w-full max-w-lg max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-all"
        style={{
          backgroundColor: activeTheme.windowBg,
          borderColor: activeTheme.keyBorder,
          color: activeTheme.keyText,
          backdropFilter: activeTheme.backdropBlur || 'none',
          WebkitBackdropFilter: activeTheme.backdropBlur || 'none',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3.5 border-b"
          style={{
            backgroundColor: activeTheme.headerBg,
            borderColor: activeTheme.keyBorder,
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="p-1.5 rounded-lg"
              style={{
                backgroundColor: activeTheme.accentColor,
                color: activeTheme.accentText,
              }}
            >
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">কীবোর্ড সেটিংস ও ফ্লেক্সিবিলিটি</h2>
              <p className="text-[11px] opacity-70" style={{ color: activeTheme.keySubText }}>
                আকার, আধুনিক থিম, অডিও এবং ল্যাপটপ ইনস্টলেশন
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

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Laptop PWA Installation Card */}
          <div
            className="p-3.5 rounded-xl border flex items-center justify-between gap-3"
            style={{ backgroundColor: activeTheme.cardBg, borderColor: activeTheme.keyBorder }}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-xs">ল্যাপটপে অ্যাপ হিসেবে ব্যবহার করুন</p>
                <p className="text-[11px] opacity-70">এক ক্লিকে আপনার উইন্ডোজ বা ম্যাকবুকে ইন্সটল করুন</p>
              </div>
            </div>
            <PWAInstallButton theme={activeTheme} />
          </div>

          {/* Keyboard Scale / Flexibility */}
          {onChangeKeyboardScale && (
            <div
              className="p-3.5 rounded-xl border space-y-2"
              style={{ backgroundColor: activeTheme.cardBg, borderColor: activeTheme.keyBorder }}
            >
              <h3 className="text-xs font-semibold flex items-center gap-1.5" style={{ color: activeTheme.keySubText }}>
                <Layout className="w-3.5 h-3.5" />
                কীবোর্ডের সাইজ ও উচ্চতা (Keyboard Size)
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'compact', label: 'ছোট (Compact)', desc: 'ল্যাপটপ স্ক্রিন বা ফ্লোটিং' },
                  { id: 'standard', label: 'সাধারণ (Standard)', desc: 'ভারসাম্যপূর্ণ উচ্চতা' },
                  { id: 'spacious', label: 'বড় (Spacious)', desc: 'সহজ ও আরামদায়ক টাচ' },
                ].map(scale => (
                  <button
                    key={scale.id}
                    onClick={() => onChangeKeyboardScale(scale.id as KeyboardScale)}
                    className="p-2.5 rounded-lg border text-left transition-all cursor-pointer"
                    style={{
                      backgroundColor: keyboardScale === scale.id ? activeTheme.accentColor : activeTheme.keyBg,
                      color: keyboardScale === scale.id ? activeTheme.accentText : activeTheme.keyText,
                      borderColor: activeTheme.keyBorder,
                    }}
                  >
                    <p className="font-medium text-xs">{scale.label}</p>
                    <p className="text-[10px] opacity-70 mt-0.5 leading-tight">{scale.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Window Width / Fluidity */}
          {onChangeWindowWidth && (
            <div
              className="p-3.5 rounded-xl border space-y-2"
              style={{ backgroundColor: activeTheme.cardBg, borderColor: activeTheme.keyBorder }}
            >
              <h3 className="text-xs font-semibold flex items-center gap-1.5" style={{ color: activeTheme.keySubText }}>
                <Maximize className="w-3.5 h-3.5" />
                উইন্ডোর প্রস্থ (Window Width)
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'compact', label: 'কমপ্যাক্ট (Compact)' },
                  { id: 'standard', label: 'স্ট্যান্ডার্ড (Centered)' },
                  { id: 'full', label: 'ফুল-স্ক্রিন (Full Width)' },
                ].map(w => (
                  <button
                    key={w.id}
                    onClick={() => onChangeWindowWidth(w.id as WindowWidth)}
                    className="p-2 rounded-lg border text-center font-medium transition-all cursor-pointer"
                    style={{
                      backgroundColor: windowWidth === w.id ? activeTheme.accentColor : activeTheme.keyBg,
                      color: windowWidth === w.id ? activeTheme.accentText : activeTheme.keyText,
                      borderColor: activeTheme.keyBorder,
                    }}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Theme Presets */}
          <div
            className="p-3.5 rounded-xl border space-y-2.5"
            style={{ backgroundColor: activeTheme.cardBg, borderColor: activeTheme.keyBorder }}
          >
            <h3 className="text-xs font-semibold flex items-center gap-1.5" style={{ color: activeTheme.keySubText }}>
              <Palette className="w-3.5 h-3.5" />
              আধুনিক ও মার্জিত থিম নির্বাচন
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {THEME_PRESETS.map(preset => {
                const isSelected = activeTheme.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onSelectTheme(preset)}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg border transition-all text-left cursor-pointer hover:opacity-90"
                    style={{
                      backgroundColor: preset.keyBg,
                      color: preset.keyText,
                      borderColor: isSelected ? preset.accentColor : activeTheme.keyBorder,
                      outline: isSelected ? `2px solid ${preset.accentColor}` : 'none',
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: preset.accentColor }}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <div className="truncate">
                      <p className="font-semibold text-xs truncate">{preset.name}</p>
                      <p className="text-[10px] opacity-60">
                        {preset.isGlass ? 'গ্লাস ফ্রস্ট' : 'মিনিমালিস্ট সলিড'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Color Picker */}
          <div
            className="p-3.5 rounded-xl border space-y-2"
            style={{ backgroundColor: activeTheme.cardBg, borderColor: activeTheme.keyBorder }}
          >
            <h3 className="text-xs font-semibold" style={{ color: activeTheme.keySubText }}>
              অ্যাকসেন্ট রং (Accent Color)
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {ACCENT_COLORS.map(c => (
                <button
                  key={c.color}
                  onClick={() => onUpdateThemeProperty('accentColor', c.color)}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                  style={{
                    backgroundColor: c.color,
                    border: activeTheme.accentColor === c.color ? '2px solid white' : 'none',
                    outline: activeTheme.accentColor === c.color ? `2px solid ${c.color}` : 'none',
                  }}
                  title={c.name}
                >
                  {activeTheme.accentColor === c.color && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Bengali Typography Selector */}
          <div
            className="p-3.5 rounded-xl border space-y-2"
            style={{ backgroundColor: activeTheme.cardBg, borderColor: activeTheme.keyBorder }}
          >
            <h3 className="text-xs font-semibold flex items-center gap-1.5" style={{ color: activeTheme.keySubText }}>
              <Type className="w-3.5 h-3.5" />
              বাংলা ফন্ট (Bengali Typography)
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onUpdateThemeProperty('fontFamily', 'Hind Siliguri')}
                className="p-2 rounded-lg border font-bangla text-center transition-all cursor-pointer"
                style={{
                  backgroundColor: activeTheme.fontFamily === 'Hind Siliguri' ? activeTheme.accentColor : activeTheme.keyBg,
                  color: activeTheme.fontFamily === 'Hind Siliguri' ? activeTheme.accentText : activeTheme.keyText,
                  borderColor: activeTheme.keyBorder,
                }}
              >
                হিন্দ শিলিগুড়ি (Hind Siliguri)
              </button>

              <button
                onClick={() => onUpdateThemeProperty('fontFamily', 'Noto Sans Bengali')}
                className="p-2 rounded-lg border font-bangla text-center transition-all cursor-pointer"
                style={{
                  backgroundColor: activeTheme.fontFamily === 'Noto Sans Bengali' ? activeTheme.accentColor : activeTheme.keyBg,
                  color: activeTheme.fontFamily === 'Noto Sans Bengali' ? activeTheme.accentText : activeTheme.keyText,
                  borderColor: activeTheme.keyBorder,
                }}
              >
                নোটো সান্স (Noto Sans Bengali)
              </button>
            </div>
          </div>

          {/* Sound Style */}
          <div
            className="p-3.5 rounded-xl border space-y-2"
            style={{ backgroundColor: activeTheme.cardBg, borderColor: activeTheme.keyBorder }}
          >
            <h3 className="text-xs font-semibold flex items-center gap-1.5" style={{ color: activeTheme.keySubText }}>
              <Volume2 className="w-3.5 h-3.5" />
              কীপ্রেস অডিও ফিডব্যাক
            </h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {(['mechanical', 'soft', 'bubble'] as const).map(style => (
                <button
                  key={style}
                  onClick={() => onChangeSoundStyle(style)}
                  className="p-2 rounded-lg border capitalize text-center transition-all cursor-pointer"
                  style={{
                    backgroundColor: soundStyle === style ? activeTheme.accentColor : activeTheme.keyBg,
                    color: soundStyle === style ? activeTheme.accentText : activeTheme.keyText,
                    borderColor: activeTheme.keyBorder,
                  }}
                >
                  {style === 'mechanical' ? 'মেকানিক্যাল' : style === 'soft' ? 'সফট মেমব্রেন' : 'বাবল সাউন্ড'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-5 py-3 border-t flex justify-end"
          style={{
            backgroundColor: activeTheme.headerBg,
            borderColor: activeTheme.keyBorder,
          }}
        >
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            style={{
              backgroundColor: activeTheme.accentColor,
              color: activeTheme.accentText,
            }}
          >
            সম্পন্ন (Done)
          </button>
        </div>
      </div>
    </div>
  );
};
