import { COMMON_BANGLA_WORDS } from './banglaDictionary';
import { PredictionCandidate } from '../types';

// Standard Kar map
export const KAR_MAP: Record<string, string> = {
  'আ': 'া',
  'ই': 'ি',
  'ঈ': 'ী',
  'উ': 'ু',
  'ঊ': 'ূ',
  'ঋ': 'ৃ',
  'এ': 'ে',
  'ঐ': 'ৈ',
  'ও': 'ো',
  'ঔ': 'ৌ',
};

export const VOWEL_TO_KAR: Record<string, string> = {
  'a': 'া',
  'A': 'া',
  'i': 'ি',
  'I': 'ী',
  'ee': 'ী',
  'u': 'ু',
  'U': 'ূ',
  'oo': 'ূ',
  'r': 'ৃ',
  'ri': 'ৃ',
  'e': 'ে',
  'E': 'ে',
  'oi': 'ৈ',
  'o': 'ো',
  'O': 'ো',
  'ou': 'ৌ',
  'ow': 'ৌ',
};

// Independent vowels at beginning of word or after another vowel
export const INDEPENDENT_VOWELS: Record<string, string> = {
  'a': 'আ', // In casual Gboard typing 'ami' -> 'আমি', 'amar' -> 'আমার'
  'aa': 'আ',
  'A': 'আ',
  'i': 'ই',
  'I': 'ঈ',
  'ee': 'ঈ',
  'u': 'উ',
  'U': 'ঊ',
  'oo': 'ঊ',
  'rri': 'ঋ',
  'e': 'এ',
  'E': 'এ',
  'oi': 'ঐ',
  'o': 'ও',
  'O': 'ও',
  'ou': 'ঔ',
  'ow': 'ঔ',
};

// Multi-char phonetic replacements sorted by length desc
export const PHONETIC_PATTERNS: Array<{ pattern: string; bangla: string; breakdown: string }> = [
  // Quad / Triple Juktoborno & Conjuncts
  { pattern: 'kkh', bangla: 'ক্ষ', breakdown: 'ক + ্ + ষ' },
  { pattern: 'ksh', bangla: 'ক্ষ', breakdown: 'ক + ্ + ষ' },
  { pattern: 'jng', bangla: 'জ্ঞ', breakdown: 'জ + ্ + ঞ' },
  { pattern: 'ggy', bangla: 'জ্ঞ', breakdown: 'জ + ্ + ঞ' },
  { pattern: 'ngkh', bangla: 'ঙ্খ', breakdown: 'ঙ + ্ + খ' },
  { pattern: 'ngk', bangla: 'ঙ্ক', breakdown: 'ঙ + ্ + ক' },
  { pattern: 'ngg', bangla: 'ঙ্গ', breakdown: 'ঙ + ্ + গ' },
  { pattern: 'nggh', bangla: 'ঙ্ঘ', breakdown: 'ঙ + ্ + ঘ' },
  { pattern: 'shch', bangla: 'শ্চ', breakdown: 'শ + ্ + চ' },
  { pattern: 'cch', bangla: 'চ্ছ', breakdown: 'চ + ্ + ছ' },
  { pattern: 'ddh', bangla: 'দ্ধ', breakdown: 'দ + ্ + ধ' },
  { pattern: 'ndh', bangla: 'ন্ধ', breakdown: 'ন + ্ + ধ' },
  { pattern: 'mbh', bangla: 'ম্ভ', breakdown: 'ম + ্ + ভ' },
  { pattern: 'shTh', bangla: 'ষ্ঠ', breakdown: 'ষ + ্ + ঠ' },
  { pattern: 'shth', bangla: 'ষ্ঠ', breakdown: 'ষ + ্ + ঠ' },
  { pattern: 'shT', bangla: 'ষ্ট', breakdown: 'ষ + ্ + ট' },
  { pattern: 'sht', bangla: 'ষ্ট', breakdown: 'ষ + ্ + ট' },
  { pattern: 'shN', bangla: 'ষ্ণ', breakdown: 'ষ + ্ + ণ' },
  { pattern: 'sth', bangla: 'স্থ', breakdown: 'স + ্ + থ' },
  { pattern: 'sph', bangla: 'স্ফ', breakdown: 'স + ্ + ফ' },
  { pattern: 'bdh', bangla: 'ব্ধ', breakdown: 'ব + ্ + ধ' },
  { pattern: 'bhl', bangla: 'ভ্ল', breakdown: 'ভ + ্ + ল' },

  // Double Consonants & Standard Conjuncts
  { pattern: 'kk', bangla: 'ক্ক', breakdown: 'ক + ্ + ক' },
  { pattern: 'kt', bangla: 'ক্ত', breakdown: 'ক + ্ + ত' },
  { pattern: 'kl', bangla: 'ক্ল', breakdown: 'ক + ্ + ল' },
  { pattern: 'kr', bangla: 'ক্র', breakdown: 'ক + ্ + র' },
  { pattern: 'kh', bangla: 'খ', breakdown: 'খ' },
  { pattern: 'gh', bangla: 'ঘ', breakdown: 'ঘ' },
  { pattern: 'gr', bangla: 'গ্র', breakdown: 'গ + ্ + র' },
  { pattern: 'gl', bangla: 'গ্ল', breakdown: 'গ + ্ + ল' },
  { pattern: 'gn', bangla: 'গ্ন', breakdown: 'গ + ্ + ন' },
  { pattern: 'Ng', bangla: 'ঙ', breakdown: 'ঙ' },
  { pattern: 'ng', bangla: 'ং', breakdown: 'ং' },
  { pattern: 'ch', bangla: 'চ', breakdown: 'চ' },
  { pattern: 'Ch', bangla: 'ছ', breakdown: 'ছ' },
  { pattern: 'jj', bangla: 'জ্জ', breakdown: 'জ + ্ + জ' },
  { pattern: 'jh', bangla: 'ঝ', breakdown: 'ঝ' },
  { pattern: 'NG', bangla: 'ঞ', breakdown: 'ঞ' },
  { pattern: 'Th', bangla: 'ঠ', breakdown: 'ঠ' },
  { pattern: 'Dh', bangla: 'ঢ', breakdown: 'ঢ' },
  { pattern: 'tt', bangla: 'ত্ত', breakdown: 'ত + ্ + ত' },
  { pattern: 'th', bangla: 'থ', breakdown: 'থ' },
  { pattern: 'tr', bangla: 'ত্র', breakdown: 'ত + ্ + র' },
  { pattern: 'tm', bangla: 'ত্ম', breakdown: 'ত + ্ + ম' },
  { pattern: 'tn', bangla: 'ত্ন', breakdown: 'ত + ্ + ন' },
  { pattern: 'dd', bangla: 'দ্দ', breakdown: 'দ + ্ + দ' },
  { pattern: 'dh', bangla: 'ধ', breakdown: 'ধ' },
  { pattern: 'dr', bangla: 'দ্র', breakdown: 'দ + ্ + র' },
  { pattern: 'dw', bangla: 'দ্ব', breakdown: 'দ + ্ + ব' },
  { pattern: 'nt', bangla: 'ন্ত', breakdown: 'ন + ্ + ত' },
  { pattern: 'nd', bangla: 'ন্দ', breakdown: 'ন + ্ + দ' },
  { pattern: 'nn', bangla: 'ন্ন', breakdown: 'ন + ্ + ন' },
  { pattern: 'pt', bangla: 'প্ত', breakdown: 'প + ্ + ত' },
  { pattern: 'pr', bangla: 'প্র', breakdown: 'প + ্ + র' },
  { pattern: 'pl', bangla: 'প্ল', breakdown: 'প + ্ + ল' },
  { pattern: 'ph', bangla: 'ফ', breakdown: 'ফ' },
  { pattern: 'bd', bangla: 'ব্দ', breakdown: 'ব + ্ + দ' },
  { pattern: 'bb', bangla: 'ব্ব', breakdown: 'ব + ্ + ব' },
  { pattern: 'br', bangla: 'ব্র', breakdown: 'ব + ্ + র' },
  { pattern: 'bl', bangla: 'ব্ল', breakdown: 'ব + ্ + ল' },
  { pattern: 'bh', bangla: 'ভ', breakdown: 'ভ' },
  { pattern: 'mp', bangla: 'ম্প', breakdown: 'ম + ্ + প' },
  { pattern: 'mb', bangla: 'ম্ব', breakdown: 'ম + ্ + ব' },
  { pattern: 'mm', bangla: 'ম্ম', breakdown: 'ম + ্ + ম' },
  { pattern: 'mr', bangla: 'ম্র', breakdown: 'ম + ্ + র' },
  { pattern: 'ml', bangla: 'ম্ল', breakdown: 'ম + ্ + ল' },
  { pattern: 'sh', bangla: 'শ', breakdown: 'শ' },
  { pattern: 'Sh', bangla: 'ষ', breakdown: 'ষ' },
  { pattern: 'st', bangla: 'স্ত', breakdown: 'স + ্ + ত' },
  { pattern: 'sn', bangla: 'স্ন', breakdown: 'স + ্ + ন' },
  { pattern: 'sp', bangla: 'স্প', breakdown: 'স + ্ + প' },
  { pattern: 'sm', bangla: 'স্ম', breakdown: 'স + ্ + ম' },
  { pattern: 'sw', bangla: 'স্ব', breakdown: 'স + ্ + ব' },
  { pattern: 'sl', bangla: 'স্ল', breakdown: 'স + ্ + ল' },
  { pattern: 'hn', bangla: 'হ্ন', breakdown: 'হ + ্ + ন' },
  { pattern: 'hm', bangla: 'হ্ম', breakdown: 'হ + ্ + ম' },
  { pattern: 'hl', bangla: 'হ্ল', breakdown: 'হ + ্ + ল' },
  { pattern: 'Rh', bangla: 'ঢ়', breakdown: 'ঢ়' },
  { pattern: 'ou', bangla: 'ৌ', breakdown: 'ৌ' },
  { pattern: 'oi', bangla: 'ৈ', breakdown: 'ৈ' },
  { pattern: 'ee', bangla: 'ী', breakdown: 'ী' },
  { pattern: 'oo', bangla: 'ূ', breakdown: 'ূ' },
];

export const SINGLE_CHAR_MAP: Record<string, { bangla: string; name: string }> = {
  'k': { bangla: 'ক', name: 'ক' },
  'g': { bangla: 'গ', name: 'গ' },
  'c': { bangla: 'চ', name: 'চ' },
  'j': { bangla: 'জ', name: 'জ' },
  'z': { bangla: 'য', name: 'য' },
  'T': { bangla: 'ট', name: 'ট' },
  't': { bangla: 'ত', name: 'ত' },
  'D': { bangla: 'ড', name: 'ড' },
  'd': { bangla: 'দ', name: 'দ' },
  'N': { bangla: 'ণ', name: 'ণ' },
  'n': { bangla: 'ন', name: 'ন' },
  'p': { bangla: 'প', name: 'প' },
  'f': { bangla: 'ফ', name: 'ফ' },
  'b': { bangla: 'ব', name: 'ব' },
  'v': { bangla: 'ভ', name: 'ভ' },
  'm': { bangla: 'ম', name: 'ম' },
  'r': { bangla: 'র', name: 'র' },
  'R': { bangla: 'ড়', name: 'ড়' },
  'l': { bangla: 'ল', name: 'ল' },
  's': { bangla: 'স', name: 'স' },
  'S': { bangla: 'শ', name: 'শ' },
  'h': { bangla: 'হ', name: 'হ' },
  'y': { bangla: 'য়', name: 'য়' },
  'w': { bangla: 'ও', name: 'ও' },
  'q': { bangla: 'ক', name: 'ক' },
  'x': { bangla: 'ক্স', name: 'ক্স' },
};

/**
 * Smart Gboard Transliteration Engine
 * Transforms English typed letters to natural Bengali phonetics
 */
export function transliteratePhonetic(englishInput: string): { primary: string; alternatives: string[]; breakdowns: string[] } {
  if (!englishInput) return { primary: '', alternatives: [], breakdowns: [] };

  const input = englishInput;
  const lowerInput = englishInput.toLowerCase();

  // 1. Direct dictionary match first (high priority for common words)
  const exactMatch = COMMON_BANGLA_WORDS.find(
    w => w.phonetic.toLowerCase() === lowerInput || (w.variations && w.variations.includes(lowerInput))
  );
  if (exactMatch) {
    return {
      primary: exactMatch.word,
      alternatives: [],
      breakdowns: [`${englishInput} → ${exactMatch.word}`],
    };
  }

  // 2. Character-by-character rule engine
  let result = '';
  const breakdowns: string[] = [];
  let i = 0;
  let lastWasConsonant = false;

  while (i < input.length) {
    let matched = false;

    // A. Check multi-char patterns (sorted longest first)
    for (const p of PHONETIC_PATTERNS) {
      if (input.startsWith(p.pattern, i)) {
        result += p.bangla;
        breakdowns.push(`${p.pattern} → ${p.bangla}`);
        i += p.pattern.length;
        matched = true;

        if (['ৌ', 'ৈ', 'ী', 'ূ'].includes(p.bangla)) {
          lastWasConsonant = false;
        } else {
          lastWasConsonant = true;
        }
        break;
      }
    }
    if (matched) continue;

    const char = input[i];
    const lower = char.toLowerCase();

    // B. Check vowels
    if (['a', 'e', 'i', 'o', 'u', 'A', 'I', 'U', 'O', 'E'].includes(char)) {
      if (lastWasConsonant) {
        // If follows a consonant, convert to Kar
        const kar = VOWEL_TO_KAR[char] || VOWEL_TO_KAR[lower] || '';
        if (kar) {
          result += kar;
          breakdowns.push(`${char} → ${kar}`);
        }
      } else {
        // Independent vowel
        let vowel = INDEPENDENT_VOWELS[char] || INDEPENDENT_VOWELS[lower] || 'অ';
        // Special: If 'a' is at the start of certain words, could be 'অ' (e.g. 'onek' -> 'অনেক')
        if (i === 0 && lower === 'a') {
          if (input.startsWith('an') || input.startsWith('am') || input.startsWith('ap') || input.startsWith('al')) {
            vowel = 'আ';
          } else {
            vowel = 'অ';
          }
        }
        result += vowel;
        breakdowns.push(`${char} → ${vowel}`);
      }
      lastWasConsonant = false;
      i++;
      continue;
    }

    // C. Single consonants
    if (SINGLE_CHAR_MAP[char] || SINGLE_CHAR_MAP[lower]) {
      const entry = SINGLE_CHAR_MAP[char] || SINGLE_CHAR_MAP[lower];
      result += entry.bangla;
      breakdowns.push(`${char} → ${entry.bangla}`);
      lastWasConsonant = true;
      i++;
      continue;
    }

    // D. Punctuation
    if (char === '.') {
      result += '।';
    } else if (char === ':') {
      result += 'ঃ';
    } else if (char === '^') {
      result += 'ঁ';
    } else {
      result += char;
    }
    lastWasConsonant = false;
    i++;
  }

  // Generate sensible alternatives for common ambiguities (s vs sh, n vs N, r vs R)
  const alternatives: string[] = [];
  if (result.includes('স')) alternatives.push(result.replace(/স/g, 'শ'));
  if (result.includes('শ')) alternatives.push(result.replace(/শ/g, 'স'));
  if (result.includes('ন')) alternatives.push(result.replace(/ন/g, 'ণ'));
  if (result.includes('ি')) alternatives.push(result.replace(/ি/g, 'ী'));
  if (result.includes('র')) alternatives.push(result.replace(/র/g, 'ড়'));
  if (result.includes('ব')) alternatives.push(result.replace(/ব/g, 'ভ'));

  return {
    primary: result,
    alternatives: Array.from(new Set(alternatives)).slice(0, 3),
    breakdowns,
  };
}

/**
 * Smart Word Predictions (Gboard Style)
 * Returns ranked predictions for active English input
 */
export function getWordPredictions(input: string, maxResults = 8): PredictionCandidate[] {
  if (!input || input.trim() === '') return [];

  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();
  const candidates: PredictionCandidate[] = [];
  const isBangla = /[\u0980-\u09FF]/.test(trimmed);

  if (isBangla) {
    // Direct Bangla prefix match
    for (const item of COMMON_BANGLA_WORDS) {
      if (item.word.startsWith(trimmed)) {
        candidates.push({
          word: item.word,
          score: item.weight + (item.word === trimmed ? 250 : 0),
          source: 'prefix',
          meaningOrHint: 'বাংলা শব্দ',
        });
      }
    }
  } else {
    // 1. Exact match in dictionary for phonetic or variations
    for (const item of COMMON_BANGLA_WORDS) {
      if (item.phonetic.toLowerCase() === lower || (item.variations && item.variations.includes(lower))) {
        candidates.push({
          word: item.word,
          score: item.weight + 500, // Highest priority
          source: 'phonetic',
          phoneticBreakdown: `${item.phonetic} → ${item.word}`,
          meaningOrHint: 'সঠিক বানান',
        });
      }
    }

    // 2. Computed Phonetic Transliteration
    const transliterated = transliteratePhonetic(trimmed);
    if (transliterated.primary && !candidates.some(c => c.word === transliterated.primary)) {
      candidates.push({
        word: transliterated.primary,
        score: 1200,
        source: 'phonetic',
        phoneticBreakdown: transliterated.breakdowns.join(' • '),
        meaningOrHint: 'স্মার্ট রূপান্তর',
      });
    }

    // 3. Dictionary items that start with the English prefix or the transliterated prefix
    for (const item of COMMON_BANGLA_WORDS) {
      const matchPhonetic = item.phonetic.toLowerCase().startsWith(lower);
      const matchVariation = item.variations?.some(v => v.toLowerCase().startsWith(lower));
      const matchBanglaPrefix = transliterated.primary && item.word.startsWith(transliterated.primary);

      if (matchPhonetic || matchVariation || matchBanglaPrefix) {
        if (!candidates.some(c => c.word === item.word)) {
          candidates.push({
            word: item.word,
            score: item.weight + (matchPhonetic ? 100 : 0),
            source: 'phonetic',
            phoneticBreakdown: `(${item.phonetic})`,
          });
        }
      }
    }

    // 4. Common spelling variations from transliteration
    for (const alt of transliterated.alternatives) {
      if (!candidates.some(c => c.word === alt)) {
        candidates.push({
          word: alt,
          score: 850,
          source: 'spellcheck',
          meaningOrHint: 'বিকল্প বানান',
        });
      }
    }
  }

  // Sort by score desc
  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, maxResults);
}
