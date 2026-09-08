import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TitleBar } from './components/TitleBar';
import { PredictionBar } from './components/PredictionBar';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { EditorArea } from './components/EditorArea';
import { JuktobornoDrawer } from './components/JuktobornoDrawer';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { PhoneticQuickBar } from './components/PhoneticQuickBar';
import { EmojiPickerDrawer } from './components/EmojiPickerDrawer';
import { DictionaryModal } from './components/DictionaryModal';
import { CardExportModal } from './components/CardExportModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PunctuationBar } from './components/PunctuationBar';
import { PunctuationGuideModal } from './components/PunctuationGuideModal';
import {
  CustomDictionaryEntry,
  KeyboardMode,
  KeyboardScale,
  KeyDefinition,
  ThemeConfig,
  WindowWidth,
} from './types';
import { THEME_PRESETS } from './data/themes';
import { getContextualSuggestions } from './utils/predictionEngine';
import { transliteratePhonetic } from './data/banglaPhonetic';
import { playKeyClick } from './utils/audio';

const DEFAULT_CUSTOM_DICTIONARY: CustomDictionaryEntry[] = [
  { id: '1', shortcut: 'asl', expansion: 'আসসালামু আলাইকুম', createdAt: Date.now() },
  { id: '2', shortcut: 'ty', expansion: 'অনেক অনেক ধন্যবাদ', createdAt: Date.now() },
  { id: '3', shortcut: 'shuvo', expansion: 'শুভ সকাল', createdAt: Date.now() },
  { id: '4', shortcut: 'bhalo', expansion: 'ভালো আছি', createdAt: Date.now() },
];

export default function App() {
  // Theme state
  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bangla_kb_theme');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return THEME_PRESETS[0]; // Modern Subtle Obsidian default
  });

  // Flexibility states
  const [keyboardScale, setKeyboardScale] = useState<KeyboardScale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bangla_kb_scale');
      if (saved === 'compact' || saved === 'standard' || saved === 'spacious') {
        return saved;
      }
    }
    return 'standard';
  });

  const [windowWidth, setWindowWidth] = useState<WindowWidth>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bangla_kb_width');
      if (saved === 'compact' || saved === 'standard' || saved === 'wide' || saved === 'full') {
        return saved;
      }
    }
    return 'standard';
  });

  const [isEditorCollapsed, setIsEditorCollapsed] = useState<boolean>(false);

  // Keyboard configuration state
  const [mode, setMode] = useState<KeyboardMode>('phonetic'); // Defaults to Gboard ABC -> বাংলা
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [soundStyle, setSoundStyle] = useState<'mechanical' | 'soft' | 'bubble'>('soft');
  const [showSubLabels, setShowSubLabels] = useState<boolean>(true);
  const [isDocked, setIsDocked] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isMiniWidget, setIsMiniWidget] = useState<boolean>(false);

  // Modals and Drawers state
  const [isJuktobornoOpen, setIsJuktobornoOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState<boolean>(false);
  const [isCardExportOpen, setIsCardExportOpen] = useState<boolean>(false);
  const [isPunctuationGuideOpen, setIsPunctuationGuideOpen] = useState<boolean>(false);

  // Smart Punctuation state: Auto-space after punctuation
  const [autoSpacePunctuation, setAutoSpacePunctuation] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bangla_autospace_punct');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  // Custom Personal Dictionary state
  const [customDictionary, setCustomDictionary] = useState<CustomDictionaryEntry[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bangla_keyboard_dictionary');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return DEFAULT_CUSTOM_DICTIONARY;
  });

  // Clipboard suggestion chip state
  const [recentClipboard, setRecentClipboard] = useState<string | null>(null);

  // Editor and typing state
  const [text, setText] = useState<string>('আমার সোনার বাংলা, আমি তোমায় ভালোবাসি। ');
  const [activeBuffer, setActiveBuffer] = useState<string>(''); // Currently typing English phonetic letters
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  // Calculate prediction candidates & next-character recommendations
  const { wordCandidates, nextCharSuggestions } = getContextualSuggestions(
    text,
    activeBuffer,
    customDictionary
  );

  // Real-time Bengali transliteration of the current English active buffer
  const composingBangla = activeBuffer
    ? wordCandidates[0]?.word || transliteratePhonetic(activeBuffer).primary
    : '';

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('bangla_kb_theme', JSON.stringify(activeTheme));
  }, [activeTheme]);

  useEffect(() => {
    localStorage.setItem('bangla_kb_scale', keyboardScale);
  }, [keyboardScale]);

  useEffect(() => {
    localStorage.setItem('bangla_kb_width', windowWidth);
  }, [windowWidth]);

  useEffect(() => {
    localStorage.setItem('bangla_keyboard_dictionary', JSON.stringify(customDictionary));
  }, [customDictionary]);

  useEffect(() => {
    localStorage.setItem('bangla_autospace_punct', String(autoSpacePunctuation));
  }, [autoSpacePunctuation]);

  // Audio trigger helper
  const triggerAudio = useCallback(
    (isSpecial = false) => {
      if (isSoundEnabled) {
        playKeyClick(isSpecial, soundStyle);
      }
    },
    [isSoundEnabled, soundStyle]
  );

  // Commit chosen word to editor text
  const handleSelectWord = useCallback(
    (chosenWord: string) => {
      triggerAudio(true);
      setText(prev => {
        const needsSpace = prev.length > 0 && !prev.endsWith(' ') && !prev.endsWith('\n');
        return prev + (needsSpace ? ' ' : '') + chosenWord + ' ';
      });
      setActiveBuffer('');
      if (editorRef.current) {
        editorRef.current.focus();
      }
    },
    [triggerAudio]
  );

  // Append a next-character recommendation directly
  const handleSelectChar = useCallback(
    (char: string) => {
      triggerAudio(false);
      setText(prev => prev + char);
      if (editorRef.current) {
        editorRef.current.focus();
      }
    },
    [triggerAudio]
  );

  // Insert Bengali & Universal punctuation with smart spacing and quote pairing
  const handleInsertPunctuation = useCallback(
    (punc: string, options?: { raw?: boolean; noSpace?: boolean }) => {
      triggerAudio(true);

      // 1. If user is currently typing a phonetic word (activeBuffer), commit it first
      let committedWord = '';
      if (activeBuffer) {
        committedWord = wordCandidates[0]?.word || composingBangla;
        setActiveBuffer('');
      }

      setText(prev => {
        let base = prev;
        if (committedWord) {
          base = base + committedWord;
        }

        let symbol = punc;
        let addTrailingSpace = autoSpacePunctuation && !options?.noSpace;

        if (punc === '“ ”') {
          // Smart quote: open quote if starting or following whitespace; close quote otherwise
          if (!base || /\s$/.test(base)) {
            symbol = '“';
            addTrailingSpace = false;
          } else {
            symbol = '”';
          }
        } else if (punc === '‘ ’') {
          if (!base || /\s$/.test(base)) {
            symbol = '‘';
            addTrailingSpace = false;
          } else {
            symbol = '’';
          }
        } else if (punc === '( )') {
          if (!base || /\s$/.test(base)) {
            symbol = '(';
            addTrailingSpace = false;
          } else {
            symbol = ')';
          }
        } else if (punc === '.') {
          // English dot: never add trailing space (for domains or decimals)
          addTrailingSpace = false;
        } else if (punc === '-') {
          addTrailingSpace = false;
        } else if (punc === '৳') {
          // Currency symbol: ensure clean spacing before if preceded by word
          const needsPrecedingSpace = base.length > 0 && !/\s$/.test(base) && !/[0-9]/.test(base.slice(-1));
          return base + (needsPrecedingSpace ? ' ৳' : '৳');
        }

        // For terminal/pause marks (। , ? ! : ; — ॥ …): trim accidental trailing spaces before attaching
        if (/^[।,\?!:;—॥…]$/.test(symbol) || symbol === '”' || symbol === '’' || symbol === ')') {
          base = base.trimEnd();
        }

        return base + symbol + (addTrailingSpace ? ' ' : '');
      });

      if (editorRef.current) {
        editorRef.current.focus();
      }
    },
    [activeBuffer, wordCandidates, composingBangla, autoSpacePunctuation, triggerAudio]
  );

  // Handle Text Area Change (safely resetting buffer on clear)
  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
    if (!newText) {
      setActiveBuffer('');
    }
  }, []);

  // Toggle keyboard glass / transparent mode
  const handleToggleTransparency = useCallback(() => {
    triggerAudio(true);
    setActiveTheme(prev => {
      const nextIsGlass = !prev.isGlass;
      return {
        ...prev,
        isGlass: nextIsGlass,
        backdropBlur: nextIsGlass ? 'blur(24px) saturate(160%)' : 'none',
        windowBg: nextIsGlass
          ? 'rgba(15, 23, 42, 0.72)'
          : prev.id === 'modern-subtle-light'
          ? '#ffffff'
          : '#0f172a',
      };
    });
  }, [triggerAudio]);

  // Virtual Key Press Handler
  const handleVirtualKeyPress = useCallback(
    (key: KeyDefinition) => {
      triggerAudio(key.type === 'action' || key.type === 'space' || key.type === 'enter');

      // 0. Action or modifier keys (JuktoAssist, Settings, TransparentToggle, etc.) must NEVER be typed into editor
      if (key.type === 'action' || key.type === 'modifier') {
        if (key.code === 'TransparentToggle') {
          handleToggleTransparency();
        } else if (key.code === 'JuktoAssist') {
          setIsJuktobornoOpen(true);
        } else if (key.code === 'Settings') {
          setIsSettingsOpen(true);
        }
        return;
      }

      // 1. Backspace Key
      if (key.type === 'backspace' || key.code === 'Backspace') {
        if (activeBuffer.length > 0) {
          setActiveBuffer(prev => prev.slice(0, -1));
        } else {
          setText(prev => prev.slice(0, -1));
        }
        return;
      }

      // 2. Enter / Return Key
      if (key.type === 'enter' || key.code === 'Enter') {
        if (activeBuffer) {
          const topCandidate = wordCandidates[0]?.word || composingBangla;
          setText(prev => prev + topCandidate + '\n');
          setActiveBuffer('');
        } else {
          setText(prev => prev + '\n');
        }
        return;
      }

      // 3. Spacebar: commits the top candidate in Gboard mode
      if (key.type === 'space' || key.code === 'Space') {
        if (activeBuffer) {
          const topCandidate = wordCandidates[0]?.word || composingBangla;
          setText(prev => prev + topCandidate + ' ');
          setActiveBuffer('');
        } else {
          setText(prev => prev + ' ');
        }
        return;
      }

      // 4. Dedicated Punctuation keys handling (Direct & Touch)
      if (
        key.code === 'Period' ||
        key.code === 'Comma' ||
        key.code === 'TakaSign' ||
        key.primary === '।' ||
        key.primary === ',' ||
        key.primary === '?' ||
        key.primary === '!' ||
        key.primary === '৳' ||
        key.primary === ';' ||
        key.primary === ':'
      ) {
        const puncToInsert =
          key.primary === '.' || key.code === 'Period'
            ? '।'
            : key.primary;
        handleInsertPunctuation(puncToInsert);
        return;
      }

      // 5. In Touch Mode (Direct Bangla characters)
      if (mode === 'touch') {
        setText(prev => prev + key.primary);
        return;
      }

      // 6. In Phonetic Mode (English letter inputs)
      if (mode === 'phonetic') {
        if (/^[a-zA-Z]$/.test(key.primary)) {
          setActiveBuffer(prev => prev + key.primary.toLowerCase());
        } else {
          if (activeBuffer) {
            const topCandidate = wordCandidates[0]?.word || composingBangla;
            setText(prev => prev + topCandidate + key.primary);
            setActiveBuffer('');
          } else {
            setText(prev => prev + key.primary);
          }
        }
      }
    },
    [activeBuffer, wordCandidates, composingBangla, mode, handleInsertPunctuation, triggerAudio]
  );

  // Physical Keyboard Interception inside Editor Area
  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (mode !== 'phonetic') return;

    // 1. Space: commit candidate
    if (e.key === ' ' || e.code === 'Space') {
      if (activeBuffer) {
        e.preventDefault();
        triggerAudio(true);
        const topCandidate = wordCandidates[0]?.word || composingBangla;
        setText(prev => prev + topCandidate + ' ');
        setActiveBuffer('');
        return;
      }
    }

    // 2. Enter: commit candidate + newline
    if (e.key === 'Enter') {
      if (activeBuffer) {
        e.preventDefault();
        triggerAudio(true);
        const topCandidate = wordCandidates[0]?.word || composingBangla;
        setText(prev => prev + topCandidate + '\n');
        setActiveBuffer('');
        return;
      }
    }

    // 3. Backspace: peel active phonetic buffer first
    if (e.key === 'Backspace') {
      if (activeBuffer.length > 0) {
        e.preventDefault();
        triggerAudio(false);
        setActiveBuffer(prev => prev.slice(0, -1));
        return;
      }
    }

    // 4. Number keys 1-9 to pick candidate directly
    if (/^[1-9]$/.test(e.key) && activeBuffer && wordCandidates.length > 0) {
      const idx = parseInt(e.key, 10) - 1;
      if (wordCandidates[idx]) {
        e.preventDefault();
        handleSelectWord(wordCandidates[idx].word);
        return;
      }
    }

    // 5. English letters (A-Z, a-z) typed on physical keyboard
    if (/^[a-zA-Z]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      triggerAudio(false);
      setActiveBuffer(prev => prev + e.key);
      return;
    }

    // 6. Ultra-Simple Physical Keyboard Punctuation Handling
    // 6.1 Period ('.'): single dot = Dari ('।'), consecutive dot ('..') = English dot ('.'), triple = ('…'), quadruple = ('॥')
    if (e.key === '.') {
      e.preventDefault();
      triggerAudio(true);

      // Check consecutive dot replacements
      if (!activeBuffer && (text.endsWith('। ') || text.endsWith('।'))) {
        setText(prev => prev.replace(/[। ]+$/, '.'));
        return;
      }
      if (!activeBuffer && text.endsWith('.')) {
        setText(prev => prev.slice(0, -1) + '…');
        return;
      }
      if (!activeBuffer && text.endsWith('…')) {
        setText(prev => prev.slice(0, -1) + '॥ ');
        return;
      }

      handleInsertPunctuation('।');
      return;
    }

    // 6.2 Comma (',')
    if (e.key === ',') {
      e.preventDefault();
      handleInsertPunctuation(',');
      return;
    }

    // 6.3 Question mark ('?')
    if (e.key === '?') {
      e.preventDefault();
      handleInsertPunctuation('?');
      return;
    }

    // 6.4 Exclamation mark ('!')
    if (e.key === '!') {
      e.preventDefault();
      handleInsertPunctuation('!');
      return;
    }

    // 6.5 Dollar sign ('$') -> Bangla Taka ('৳')
    if (e.key === '$') {
      e.preventDefault();
      handleInsertPunctuation('৳');
      return;
    }

    // 6.6 Colon (':')
    if (e.key === ':') {
      e.preventDefault();
      handleInsertPunctuation(':');
      return;
    }

    // 6.7 Semicolon (';')
    if (e.key === ';') {
      e.preventDefault();
      handleInsertPunctuation(';');
      return;
    }

    // 6.8 Smart double quotes ('"')
    if (e.key === '"') {
      e.preventDefault();
      handleInsertPunctuation('“ ”');
      return;
    }

    // 6.9 Smart single quotes ("'")
    if (e.key === "'") {
      e.preventDefault();
      handleInsertPunctuation('‘ ’');
      return;
    }

    // 6.10 Parentheses ('(' and ')')
    if (e.key === '(') {
      e.preventDefault();
      handleInsertPunctuation('(');
      return;
    }
    if (e.key === ')') {
      e.preventDefault();
      handleInsertPunctuation(')');
      return;
    }

    // 6.11 Hyphen / Dash ('-')
    if (e.key === '-') {
      // Double dash '--' converts to em-dash '—'
      if (!activeBuffer && text.endsWith('-')) {
        e.preventDefault();
        triggerAudio(true);
        setText(prev => prev.slice(0, -1) + '— ');
        return;
      }
      if (activeBuffer) {
        e.preventDefault();
        const topCandidate = wordCandidates[0]?.word || composingBangla;
        setText(prev => prev + topCandidate + '-');
        setActiveBuffer('');
        return;
      }
    }

    triggerAudio(false);
  };

  const handleUpdateThemeProperty = <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => {
    setActiveTheme(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddDictionaryEntry = (shortcut: string, expansion: string) => {
    const newEntry: CustomDictionaryEntry = {
      id: Date.now().toString(),
      shortcut: shortcut.toLowerCase().trim(),
      expansion: expansion.trim(),
      createdAt: Date.now(),
    };
    setCustomDictionary(prev => [newEntry, ...prev]);
  };

  const handleDeleteDictionaryEntry = (id: string) => {
    setCustomDictionary(prev => prev.filter(entry => entry.id !== id));
  };

  // Determine window max width according to flexibility selection
  let widthClass = 'max-w-4xl';
  if (isMiniWidget) {
    widthClass = 'max-w-xl';
  } else if (windowWidth === 'compact') {
    widthClass = 'max-w-2xl';
  } else if (windowWidth === 'wide') {
    widthClass = 'max-w-6xl';
  } else if (windowWidth === 'full') {
    widthClass = 'max-w-full';
  }

  return (
    <div
      id="bangla-keyboard-app"
      className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 transition-colors duration-200 relative font-sans overflow-x-hidden"
      style={{
        backgroundColor: activeTheme.bgColor,
        color: activeTheme.keyText,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Subtle modern neutral ambient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      {/* Liquid Glass Ambient Lighting Orbs for authentic frosted optical refraction */}
      {activeTheme.isGlass && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700">
          <div className="absolute -top-28 -left-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="absolute top-1/4 -right-24 w-[480px] h-[480px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 left-1/4 w-[520px] h-[360px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        </div>
      )}

      {/* Main Keyboard Container */}
      <main
        id="windows-main-window"
        className={`w-full rounded-2xl shadow-xl overflow-hidden border flex flex-col z-10 transition-all duration-200 ${widthClass} ${
          isDocked ? 'fixed bottom-0 left-0 right-0 max-w-none rounded-none border-x-0 border-b-0' : ''
        }`}
        style={{
          backgroundColor: activeTheme.windowBg,
          borderColor: activeTheme.keyBorder,
          backdropFilter: activeTheme.backdropBlur || 'none',
          WebkitBackdropFilter: activeTheme.backdropBlur || 'none',
          boxShadow: activeTheme.isGlass
            ? '0 24px 70px -12px rgba(0, 0, 0, 0.55), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.12)'
            : activeTheme.hasShadow
            ? '0 10px 30px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)'
            : 'none',
        }}
      >
        {/* 1. TitleBar (Header with PWA Install & Flexibility controls) */}
        <TitleBar
          theme={activeTheme}
          mode={mode}
          onModeChange={setMode}
          isSoundEnabled={isSoundEnabled}
          onSoundToggle={() => setIsSoundEnabled(prev => !prev)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenJuktoborno={() => setIsJuktobornoOpen(true)}
          isDocked={isDocked}
          onDockToggle={() => setIsDocked(prev => !prev)}
          isMinimized={isMinimized}
          onMinimizeToggle={() => setIsMinimized(prev => !prev)}
          isMiniWidget={isMiniWidget}
          onToggleMiniWidget={() => setIsMiniWidget(prev => !prev)}
          onOpenDictionary={() => setIsDictionaryOpen(true)}
          onOpenCardExport={() => setIsCardExportOpen(true)}
          keyboardScale={keyboardScale}
          onKeyboardScaleChange={setKeyboardScale}
          windowWidth={windowWidth}
          onWindowWidthChange={setWindowWidth}
          isEditorCollapsed={isEditorCollapsed}
          onToggleEditorCollapse={() => setIsEditorCollapsed(prev => !prev)}
        />

        {/* 2. Phonetic Beginner Quick Guide Bar */}
        {mode === 'phonetic' && !isMinimized && !isEditorCollapsed && (
          <PhoneticQuickBar
            theme={activeTheme}
            onOpenJuktoborno={() => setIsJuktobornoOpen(true)}
            onInsertSampleText={sample => {
              triggerAudio(false);
              setText(prev => prev + sample);
              if (editorRef.current) editorRef.current.focus();
            }}
            onOpenEmojiPicker={() => setIsEmojiOpen(true)}
            onOpenDictionary={() => setIsDictionaryOpen(true)}
            onOpenCardExport={() => setIsCardExportOpen(true)}
          />
        )}

        {/* 3. Text Editor / Writing Surface */}
        {!isMinimized && (
          <EditorArea
            theme={activeTheme}
            text={text}
            onTextChange={handleTextChange}
            activeBuffer={activeBuffer}
            composingBangla={composingBangla}
            onKeyDown={handleEditorKeyDown}
            editorRef={editorRef}
            onSelectWord={handleSelectWord}
            onOpenCardExport={() => setIsCardExportOpen(true)}
            onCopyNotification={copiedText => setRecentClipboard(copiedText)}
            isCollapsed={isEditorCollapsed}
            onToggleCollapse={() => setIsEditorCollapsed(prev => !prev)}
          />
        )}

        {/* 4. Predictive Text Strip */}
        <PredictionBar
          theme={activeTheme}
          candidates={wordCandidates}
          nextCharSuggestions={nextCharSuggestions}
          activeBuffer={activeBuffer}
          clipboardText={recentClipboard || undefined}
          onSelectWord={handleSelectWord}
          onSelectChar={handleSelectChar}
          onInsertPunctuation={handleInsertPunctuation}
          onPasteClipboard={pasted => {
            triggerAudio(false);
            setText(prev => prev + pasted + ' ');
            if (editorRef.current) editorRef.current.focus();
          }}
          onOpenEmoji={() => setIsEmojiOpen(true)}
          onVoiceInput={transcript => setText(prev => prev + transcript + ' ')}
        />

        {/* 5. Ultra-Simple Quick Punctuation Bar */}
        {!isMinimized && (
          <PunctuationBar
            theme={activeTheme}
            autoSpace={autoSpacePunctuation}
            onToggleAutoSpace={() => setAutoSpacePunctuation(prev => !prev)}
            onInsertPunctuation={handleInsertPunctuation}
            onOpenPunctuationGuide={() => setIsPunctuationGuideOpen(true)}
          />
        )}

        {/* 6. Virtual Keyboard */}
        {!isMinimized && (
          <VirtualKeyboard
            theme={activeTheme}
            mode={mode}
            onKeyPress={handleVirtualKeyPress}
            onOpenJuktoborno={() => setIsJuktobornoOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onToggleTransparency={handleToggleTransparency}
            showSubLabels={showSubLabels}
            scale={keyboardScale}
          />
        )}

        {/* Status / Instructions Footer */}
        <footer
          id="keyboard-status-bar"
          className="px-3.5 py-1.5 flex items-center justify-between text-[11px] border-t select-none"
          style={{
            backgroundColor: activeTheme.headerBg,
            borderColor: activeTheme.keyBorder,
            color: activeTheme.keySubText,
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: activeTheme.accentColor }}
            />
            <span className="font-medium truncate max-w-[280px] sm:max-w-none">
              {mode === 'phonetic'
                ? 'স্মার্ট ফনেটিক সক্রিয়: ইংরেজিতে টাইপ করলেই বাংলায় রূপান্তর হবে (Space = নির্বাচন)'
                : 'টাচ মোড: বাংলা বর্ণমালা স্পর্শ করে লিখুন'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span className="hidden sm:inline opacity-70">স্কেল: {keyboardScale === 'compact' ? 'ছোট' : keyboardScale === 'spacious' ? 'বড়' : 'সাধারণ'}</span>
            <span className="opacity-80">{activeTheme.name}</span>
          </div>
        </footer>
      </main>

      {/* Juktoborno Assistant Modal */}
      <JuktobornoDrawer
        isOpen={isJuktobornoOpen}
        onClose={() => setIsJuktobornoOpen(false)}
        onInsertGlyph={glyph => {
          triggerAudio(false);
          setText(prev => prev + glyph);
          if (editorRef.current) editorRef.current.focus();
        }}
        theme={activeTheme}
      />

      {/* Theme & Customizer Modal */}
      <ThemeCustomizerModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        activeTheme={activeTheme}
        onSelectTheme={setActiveTheme}
        onUpdateThemeProperty={handleUpdateThemeProperty}
        showSubLabels={showSubLabels}
        onToggleSubLabels={() => setShowSubLabels(prev => !prev)}
        soundStyle={soundStyle}
        onChangeSoundStyle={setSoundStyle}
        keyboardScale={keyboardScale}
        onChangeKeyboardScale={setKeyboardScale}
        windowWidth={windowWidth}
        onChangeWindowWidth={setWindowWidth}
      />

      {/* Emoji & Bengali Symbol Drawer */}
      <EmojiPickerDrawer
        isOpen={isEmojiOpen}
        onClose={() => setIsEmojiOpen(false)}
        onSelectEmoji={em => {
          triggerAudio(false);
          setText(prev => prev + em);
          if (editorRef.current) editorRef.current.focus();
        }}
        theme={activeTheme}
      />

      {/* Custom Personal Dictionary Modal */}
      <DictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
        entries={customDictionary}
        onAddEntry={handleAddDictionaryEntry}
        onDeleteEntry={handleDeleteDictionaryEntry}
        theme={activeTheme}
      />

      {/* Typography Card Export Modal */}
      <CardExportModal
        isOpen={isCardExportOpen}
        onClose={() => setIsCardExportOpen(false)}
        text={text}
        theme={activeTheme}
      />

      {/* Ultra-Simple Punctuation Guide Modal */}
      <PunctuationGuideModal
        isOpen={isPunctuationGuideOpen}
        onClose={() => setIsPunctuationGuideOpen(false)}
        theme={activeTheme}
      />

      {/* PWA Offline Notification Indicator */}
      <OfflineIndicator />
    </div>
  );
}
