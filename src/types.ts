export type KeyboardMode = 'phonetic' | 'touch' | 'national';
export type KeyboardScale = 'compact' | 'standard' | 'spacious';
export type WindowWidth = 'compact' | 'standard' | 'wide' | 'full';

export interface ThemeConfig {
  id: string;
  name: string;
  category: 'windows' | 'gboard' | 'custom';
  bgColor: string;
  windowBg: string;
  headerBg: string;
  cardBg: string;
  keyBg: string;
  keyText: string;
  keySubText: string;
  keyActiveBg: string;
  keyBorder: string;
  actionKeyBg: string;
  actionKeyText: string;
  accentColor: string;
  accentText: string;
  suggestionBg: string;
  suggestionActiveBg: string;
  borderRadius: number; // in px: 4 (Windows) to 16 (Gboard)
  hasBorders: boolean;
  hasShadow: boolean;
  fontFamily: 'Hind Siliguri' | 'Noto Sans Bengali' | 'system';
  isGlass?: boolean;
  backdropBlur?: string;
  specularBorder?: string;
}

export interface PredictionCandidate {
  word: string;
  score: number;
  source: 'prefix' | 'phonetic' | 'ngram' | 'spellcheck' | 'custom';
  phoneticBreakdown?: string;
  meaningOrHint?: string;
}

export interface NextCharSuggestion {
  char: string;
  type: 'kar' | 'juktoborno' | 'consonant' | 'vowel' | 'sign' | 'zwnj';
  label: string;
  breakdown?: string; // e.g. "ক + ্ + ষ"
  previewResult: string; // e.g. "বা" or "ক্ষ"
}

export interface JuktobornoItem {
  glyph: string;
  components: string[]; // e.g. ["ক", "্", "ষ"]
  equation: string; // "ক + ্ + ষ = ক্ষ"
  category: string;
  phoneticCode: string; // "kkh"
  commonWords: string[]; // ["শিক্ষা", "ক্ষতি", "দক্ষ"]
  pronunciationHint?: string;
}

export interface KeyDefinition {
  primary: string; // The primary character shown
  secondary?: string; // Shift or alternative character
  phonetic?: string; // English phonetic trigger
  code: string; // KeyboardEvent code (e.g. "KeyQ", "Space")
  type?: 'char' | 'action' | 'modifier' | 'space' | 'backspace' | 'enter' | 'tab' | 'caps';
  width?: string; // Tailwind width class or flex multiplier
}

export interface CustomDictionaryEntry {
  id: string;
  shortcut: string; // e.g. "asl", "ty", "shuvo"
  expansion: string; // e.g. "আসসালামু আলাইকুম", "ধন্যবাদ"
  createdAt?: number;
}

export interface QuickSnippet {
  id: string;
  title: string;
  text: string;
  category: 'formal' | 'daily' | 'wishes' | 'signs';
}

export interface EmojiItem {
  emoji: string;
  name: string;
  bnName: string;
  category: 'smileys' | 'gestures' | 'hearts' | 'symbols' | 'bangla';
  keywords: string[];
}

export interface ClipboardHistoryItem {
  id: string;
  text: string;
  timestamp: number;
}
