import React from 'react';
import {
  Keyboard,
  Settings,
  Volume2,
  VolumeX,
  BookOpen,
  Palette,
  Minus,
  Maximize2,
  Minimize2,
  BookMarked,
  Image as ImageIcon,
  SlidersHorizontal,
  ChevronDown,
  Monitor,
  Smartphone,
} from 'lucide-react';
import { KeyboardMode, KeyboardScale, ThemeConfig, WindowWidth } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface TitleBarProps {
  theme: ThemeConfig;
  mode: KeyboardMode;
  onModeChange: (mode: KeyboardMode) => void;
  isSoundEnabled: boolean;
  onSoundToggle: () => void;
  onOpenSettings: () => void;
  onOpenJuktoborno: () => void;
  isDocked: boolean;
  onDockToggle: () => void;
  isMinimized: boolean;
  onMinimizeToggle: () => void;
  isMiniWidget?: boolean;
  onToggleMiniWidget?: () => void;
  onOpenDictionary?: () => void;
  onOpenCardExport?: () => void;
  keyboardScale: KeyboardScale;
  onKeyboardScaleChange: (scale: KeyboardScale) => void;
  windowWidth: WindowWidth;
  onWindowWidthChange: (width: WindowWidth) => void;
  isEditorCollapsed?: boolean;
  onToggleEditorCollapse?: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  theme,
  mode,
  onModeChange,
  isSoundEnabled,
  onSoundToggle,
  onOpenSettings,
  onOpenJuktoborno,
  isDocked,
  onDockToggle,
  isMinimized,
  onMinimizeToggle,
  isMiniWidget,
  onToggleMiniWidget,
  onOpenDictionary,
  onOpenCardExport,
  keyboardScale,
  onKeyboardScaleChange,
  windowWidth,
  onWindowWidthChange,
  isEditorCollapsed,
  onToggleEditorCollapse,
}) => {
  const isGlass = theme.isGlass;

  return (
    <header
      id="windows-titlebar"
      className="flex items-center justify-between px-3 sm:px-4 py-2 border-b select-none transition-all duration-150"
      style={{
        backgroundColor: theme.headerBg,
        borderColor: theme.keyBorder,
        color: theme.keyText,
        backdropFilter: theme.backdropBlur || 'none',
        WebkitBackdropFilter: theme.backdropBlur || 'none',
      }}
    >
      {/* Left: App Monogram & Title */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base transition-transform hover:scale-105 shrink-0"
          style={{
            backgroundColor: theme.accentColor,
            color: theme.accentText,
            boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
          }}
        >
          অ
        </div>

        <div className="hidden min-[480px]:block">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-xs sm:text-sm tracking-tight">Bangla Keyboard</span>
            <span
              className="text-[9px] px-1.5 py-0.5 rounded font-medium opacity-70 border"
              style={{
                borderColor: theme.keyBorder,
                backgroundColor: theme.actionKeyBg,
              }}
            >
              Pro
            </span>
          </div>
          <p className="text-[10px] leading-none opacity-60 hidden md:block" style={{ color: theme.keySubText }}>
            স্মার্ট ফনেটিক ট্রান্সলিটারেশন • ডেক্সটপ অ্যাপ
          </p>
        </div>
      </div>

      {/* Center: Mode Switcher (Clean Minimal Segmented Control) */}
      <div
        className="flex items-center p-0.5 rounded-lg border text-xs gap-0.5"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.keyBorder,
        }}
      >
        <button
          id="mode-phonetic-btn"
          onClick={() => onModeChange('phonetic')}
          className={`px-2 sm:px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
            mode === 'phonetic' ? 'shadow-xs font-semibold' : 'opacity-70 hover:opacity-100'
          }`}
          style={{
            backgroundColor: mode === 'phonetic' ? theme.accentColor : 'transparent',
            color: mode === 'phonetic' ? theme.accentText : theme.keyText,
          }}
          title="Gboard ফনেটিক: ইংরেজি অক্ষরে টাইপ করলে সরাসরি বাংলায় রূপান্তর হবে"
        >
          ফনেটিক (ABC ➔ বাংলা)
        </button>

        <button
          id="mode-touch-btn"
          onClick={() => onModeChange('touch')}
          className={`px-2 sm:px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
            mode === 'touch' ? 'shadow-xs font-semibold' : 'opacity-70 hover:opacity-100'
          }`}
          style={{
            backgroundColor: mode === 'touch' ? theme.accentColor : 'transparent',
            color: mode === 'touch' ? theme.accentText : theme.keyText,
          }}
          title="বাংলা বর্ণমালার সরাসরি টাচ কীবোর্ড"
        >
          টাচ (বর্ণমালা)
        </button>

        <button
          id="mode-national-btn"
          onClick={() => onModeChange('national')}
          className={`px-2 py-1 rounded text-xs font-medium transition-all hidden lg:block cursor-pointer ${
            mode === 'national' ? 'shadow-xs font-semibold' : 'opacity-70 hover:opacity-100'
          }`}
          style={{
            backgroundColor: mode === 'national' ? theme.accentColor : 'transparent',
            color: mode === 'national' ? theme.accentText : theme.keyText,
          }}
          title="জাতীয় / বিজয় লেআউট"
        >
          জাতীয়
        </button>
      </div>

      {/* Right: Flexibility Controls & PWA Install */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* In-App PWA Install Button */}
        <PWAInstallButton theme={theme} />

        {/* Flexibility: Keyboard Scale Selector */}
        <div
          className="hidden md:flex items-center rounded-lg border text-[11px] p-0.5"
          style={{ borderColor: theme.keyBorder, backgroundColor: theme.cardBg }}
          title="কীবোর্ডের আকার ও উচ্চতা সামঞ্জস্য করুন"
        >
          <button
            onClick={() => onKeyboardScaleChange('compact')}
            className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
              keyboardScale === 'compact' ? 'font-semibold' : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              backgroundColor: keyboardScale === 'compact' ? theme.accentColor : 'transparent',
              color: keyboardScale === 'compact' ? theme.accentText : theme.keyText,
            }}
          >
            ছোট
          </button>
          <button
            onClick={() => onKeyboardScaleChange('standard')}
            className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
              keyboardScale === 'standard' ? 'font-semibold' : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              backgroundColor: keyboardScale === 'standard' ? theme.accentColor : 'transparent',
              color: keyboardScale === 'standard' ? theme.accentText : theme.keyText,
            }}
          >
            সাধারণ
          </button>
          <button
            onClick={() => onKeyboardScaleChange('spacious')}
            className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
              keyboardScale === 'spacious' ? 'font-semibold' : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              backgroundColor: keyboardScale === 'spacious' ? theme.accentColor : 'transparent',
              color: keyboardScale === 'spacious' ? theme.accentText : theme.keyText,
            }}
          >
            বড়
          </button>
        </div>

        {/* Flexibility: Window Width Toggle */}
        <div
          className="hidden lg:flex items-center rounded-lg border text-[11px] p-0.5"
          style={{ borderColor: theme.keyBorder, backgroundColor: theme.cardBg }}
          title="উইন্ডোর প্রস্থ নির্ধারণ করুন"
        >
          <button
            onClick={() => onWindowWidthChange(windowWidth === 'full' ? 'standard' : 'full')}
            className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
              windowWidth === 'full' ? 'font-semibold' : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              backgroundColor: windowWidth === 'full' ? theme.accentColor : 'transparent',
              color: windowWidth === 'full' ? theme.accentText : theme.keyText,
            }}
          >
            {windowWidth === 'full' ? 'স্ট্যান্ডার্ড প্রস্থ' : 'ফুল স্ক্রিন'}
          </button>
        </div>

        {/* Dictionary Button */}
        {onOpenDictionary && (
          <button
            id="titlebar-dictionary-btn"
            onClick={onOpenDictionary}
            title="ব্যক্তিগত অভিধান ও দ্রুত শর্টকাট"
            className="p-1.5 rounded-lg transition-all hover:opacity-80 cursor-pointer hidden sm:flex items-center"
            style={{
              backgroundColor: theme.actionKeyBg,
              color: theme.keyText,
              border: `1px solid ${theme.keyBorder}`,
            }}
          >
            <BookMarked className="w-3.5 h-3.5 text-sky-400" />
          </button>
        )}

        {/* Card Export Button */}
        {onOpenCardExport && (
          <button
            id="titlebar-card-export-btn"
            onClick={onOpenCardExport}
            title="টাইপোগ্রাফি পোস্টার বা কার্ড এক্সপোর্ট"
            className="p-1.5 rounded-lg transition-all hover:opacity-80 cursor-pointer hidden sm:flex items-center"
            style={{
              backgroundColor: theme.actionKeyBg,
              color: theme.keyText,
              border: `1px solid ${theme.keyBorder}`,
            }}
          >
            <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
          </button>
        )}

        {/* Juktoborno Assistant */}
        <button
          id="juktoborno-assistant-btn"
          onClick={onOpenJuktoborno}
          title="যুক্তবর্ণ তালিকা ও সহায়ক"
          className="px-2 py-1.5 rounded-lg text-xs font-bangla font-medium flex items-center gap-1 transition-all hover:opacity-85 cursor-pointer"
          style={{
            backgroundColor: theme.actionKeyBg,
            color: theme.keyText,
            border: `1px solid ${theme.keyBorder}`,
          }}
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">যুক্তবর্ণ</span>
        </button>

        {/* Sound Toggle */}
        <button
          id="sound-toggle-btn"
          onClick={onSoundToggle}
          title={isSoundEnabled ? 'শব্দ বন্ধ করুন' : 'কীপ্রেস শব্দ চালু করুন'}
          className="p-1.5 rounded-lg transition-opacity hover:opacity-80 cursor-pointer"
          style={{
            backgroundColor: isSoundEnabled ? theme.actionKeyBg : 'transparent',
            color: theme.keyText,
            border: isSoundEnabled ? `1px solid ${theme.keyBorder}` : 'none',
          }}
        >
          {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-40" />}
        </button>

        {/* Theme Settings Button */}
        <button
          id="theme-settings-btn"
          onClick={onOpenSettings}
          title="থিম, কীবোর্ড আকার ও কাস্টমাইজেশন"
          className="p-1.5 rounded-lg transition-all hover:opacity-80 cursor-pointer"
          style={{
            backgroundColor: theme.actionKeyBg,
            color: theme.keyText,
            border: `1px solid ${theme.keyBorder}`,
          }}
        >
          <Palette className="w-3.5 h-3.5 text-sky-400" />
        </button>

        {/* Dock to Bottom Toggle */}
        <button
          id="dock-toggle-btn"
          onClick={onDockToggle}
          title={isDocked ? 'ভাসমান উইন্ডো মোড' : 'স্ক্রিনের নিচে ডক করুন'}
          className="p-1.5 rounded-lg transition-opacity hover:opacity-80 hidden sm:block cursor-pointer"
          style={{ color: theme.keySubText }}
        >
          {isDocked ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>

        {/* Minimize / Maximize */}
        <button
          id="minimize-toggle-btn"
          onClick={onMinimizeToggle}
          title={isMinimized ? 'কীবোর্ড খুলুন' : 'সংকুচিত করুন'}
          className="p-1.5 rounded-lg transition-opacity hover:opacity-80 cursor-pointer"
          style={{ color: theme.keySubText }}
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
