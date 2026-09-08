import { CustomDictionaryEntry, NextCharSuggestion, PredictionCandidate } from '../types';
import { CONSONANT_JUKTOBORNO_MAP, JUKTOBORNO_LIST } from '../data/juktobornoData';
import { NGRAM_NEXT_WORDS } from '../data/banglaDictionary';
import { getWordPredictions } from '../data/banglaPhonetic';

export const ALL_KARS: Array<{ kar: string; name: string }> = [
  { kar: 'া', name: 'আ-কার' },
  { kar: 'ি', name: 'হ্রস্ব-ই-কার' },
  { kar: 'ী', name: 'দীর্ঘ-ঈ-কার' },
  { kar: 'ু', name: 'হ্রস্ব-উ-কার' },
  { kar: 'ূ', name: 'দীর্ঘ-ঊ-কার' },
  { kar: 'ৃ', name: 'ঋ-কার' },
  { kar: 'ে', name: 'এ-কার' },
  { kar: 'ৈ', name: 'ঐ-কার' },
  { kar: 'ো', name: 'ও-কার' },
  { kar: 'ৌ', name: 'ঔ-কার' },
];

export const SPECIAL_SIGNS = [
  { sign: '্', name: 'হসন্ত (যুক্তবর্ণ বানান)' },
  { sign: '\u200C', name: 'ZWNJ (যুক্ত না করার চিহ্ন)' },
  { sign: '\u200D', name: 'ZWJ (বিশেষ যুক্ত রূপ)' },
  { sign: 'ঁ', name: 'চন্দ্রবিন্দু' },
  { sign: 'ঃ', name: 'বিসর্গ' },
  { sign: 'ং', name: 'অনুস্বার' },
  { sign: 'ৎ', name: 'খণ্ড ত' },
  { sign: '৳', name: 'টাকা প্রতীক' },
];

/**
 * Given the last entered character or cursor position in text,
 * compute intelligent next-character recommendations.
 */
export function getNextCharacterPredictions(currentText: string): NextCharSuggestion[] {
  if (!currentText || currentText.trim().length === 0) {
    // Start of sentence suggestions: Common start consonants & vowels
    return [
      { char: 'আ', type: 'vowel', label: 'আ', previewResult: 'আ' },
      { char: 'ব', type: 'consonant', label: 'ব', previewResult: 'ব' },
      { char: 'ক', type: 'consonant', label: 'ক', previewResult: 'ক' },
      { char: 'এ', type: 'vowel', label: 'এ', previewResult: 'এ' },
      { char: 'স', type: 'consonant', label: 'স', previewResult: 'স' },
      { char: 'ম', type: 'consonant', label: 'ম', previewResult: 'ম' },
      { char: 'ত', type: 'consonant', label: 'ত', previewResult: 'ত' },
    ];
  }

  const lastChar = currentText.slice(-1);
  const suggestions: NextCharSuggestion[] = [];

  // Check if last character is a Bengali Consonant (ক - হ)
  const isConsonant = /[\u0995-\u09B9]/.test(lastChar);
  const isKar = /[\u09BE-\u09CC]/.test(lastChar);
  const isHasant = lastChar === '্';

  if (isHasant) {
    // User typed hasant, suggest valid consonants to form conjuncts OR ZWNJ to keep halant explicit!
    suggestions.push({
      char: '\u200C',
      type: 'zwnj',
      label: 'ZWNJ (হসন্ত বহাল)',
      breakdown: 'যুক্ত না করে হসন্ত বহাল রাখতে',
      previewResult: `${lastChar}\u200C`,
    });

    const prevChar = currentText.length >= 2 ? currentText.slice(-2, -1) : '';
    if (prevChar && CONSONANT_JUKTOBORNO_MAP[prevChar]) {
      const conjuncts = CONSONANT_JUKTOBORNO_MAP[prevChar];
      for (const conj of conjuncts.slice(0, 5)) {
        const found = JUKTOBORNO_LIST.find(j => j.glyph === conj);
        suggestions.push({
          char: found?.components[2] || 'র',
          type: 'juktoborno',
          label: conj,
          breakdown: found?.equation || `${prevChar} + ্`,
          previewResult: conj,
        });
      }
    } else {
      suggestions.push(
        { char: 'র', type: 'consonant', label: '্র (র-ফলা)', previewResult: '্র' },
        { char: 'য', type: 'consonant', label: '্য (য-ফলা)', previewResult: '্য' },
        { char: 'ব', type: 'consonant', label: '্ব (ব-ফলা)', previewResult: '্ব' },
        { char: 'ম', type: 'consonant', label: '্ম (ম-ফলা)', previewResult: '্ম' },
      );
    }
    return suggestions;
  }

  if (isConsonant) {
    // 1. Most frequent Kars for this consonant
    const priorityKars = ['া', 'ি', 'ে', 'ো', 'ু', 'ী'];
    for (const kar of priorityKars) {
      const kObj = ALL_KARS.find(k => k.kar === kar);
      suggestions.push({
        char: kar,
        type: 'kar',
        label: `${lastChar}${kar}`,
        breakdown: `${lastChar} + ${kObj?.name || 'কার'}`,
        previewResult: `${lastChar}${kar}`,
      });
    }

    // 2. Juktoborno conjuncts that can form from this consonant
    const possibleConjuncts = CONSONANT_JUKTOBORNO_MAP[lastChar];
    if (possibleConjuncts && possibleConjuncts.length > 0) {
      for (const conj of possibleConjuncts.slice(0, 3)) {
        const found = JUKTOBORNO_LIST.find(j => j.glyph === conj);
        suggestions.push({
          char: conj,
          type: 'juktoborno',
          label: conj,
          breakdown: found ? found.equation : `${lastChar} যুক্তবর্ণ`,
          previewResult: conj,
        });
      }
    }

    // 3. Special signs (্ hasant, ং anusvara, ঁ chondrobindu)
    suggestions.push({
      char: '্',
      type: 'sign',
      label: '্ (হসন্ত)',
      breakdown: 'যুক্তবর্ণ তৈরির জন্য',
      previewResult: `${lastChar}্`,
    });
    suggestions.push({
      char: 'ঁ',
      type: 'sign',
      label: 'ঁ (চন্দ্রবিন্দু)',
      breakdown: 'অনুনাসিক চিহ্ন',
      previewResult: `${lastChar}ঁ`,
    });
    suggestions.push({
      char: 'ং',
      type: 'sign',
      label: 'ং (অনুস্বার)',
      breakdown: 'নাসিক্য বর্ণ',
      previewResult: `${lastChar}ং`,
    });
  } else if (isKar) {
    // After Kar, user usually types another consonant or Dari
    suggestions.push(
      { char: 'র', type: 'consonant', label: 'র', previewResult: `${lastChar}র` },
      { char: 'ন', type: 'consonant', label: 'ন', previewResult: `${lastChar}ন` },
      { char: 'ল', type: 'consonant', label: 'ল', previewResult: `${lastChar}ল` },
      { char: 'ক', type: 'consonant', label: 'ক', previewResult: `${lastChar}ক` },
      { char: 'ত', type: 'consonant', label: 'ত', previewResult: `${lastChar}ত` },
      { char: 'স', type: 'consonant', label: 'স', previewResult: `${lastChar}স` },
      { char: '।', type: 'sign', label: '। (দাঁড়ি)', previewResult: '।' },
    );
  } else if (lastChar === ' ') {
    // If just typed space, look at previous word for n-gram predictions
    const words = currentText.trim().split(/\s+/);
    const lastWord = words[words.length - 1];
    if (lastWord && NGRAM_NEXT_WORDS[lastWord]) {
      const nextWords = NGRAM_NEXT_WORDS[lastWord];
      for (const nw of nextWords.slice(0, 5)) {
        suggestions.push({
          char: nw,
          type: 'vowel',
          label: nw,
          breakdown: `পরবর্তী সম্ভাব্য শব্দ (${lastWord}-এর পর)`,
          previewResult: nw,
        });
      }
    }
  }

  return suggestions;
}

/**
 * Smart contextual prediction uniting word predictions, n-grams, character prediction,
 * and user custom personal dictionary expansions.
 */
export function getContextualSuggestions(
  fullText: string,
  activeBuffer: string,
  customDictionary: CustomDictionaryEntry[] = []
): {
  wordCandidates: PredictionCandidate[];
  nextCharSuggestions: NextCharSuggestion[];
} {
  // If active buffer exists (e.g. currently typing phonetic or word fragment)
  if (activeBuffer && activeBuffer.length > 0) {
    const rawWordCandidates = getWordPredictions(activeBuffer, 8);
    const wordCandidates: PredictionCandidate[] = [];

    // Check custom personal dictionary shortcuts first
    const lowerBuffer = activeBuffer.toLowerCase();
    const matchedCustom = customDictionary.filter(
      item => item.shortcut.toLowerCase() === lowerBuffer || item.shortcut.toLowerCase().startsWith(lowerBuffer)
    );

    for (const match of matchedCustom) {
      wordCandidates.push({
        word: match.expansion,
        score: 2500,
        source: 'custom',
        meaningOrHint: `কাস্টম শর্টকাট (${match.shortcut})`,
      });
    }

    // Add phonetic transliteration candidates (avoiding duplicates)
    for (const cand of rawWordCandidates) {
      if (!wordCandidates.some(w => w.word === cand.word)) {
        wordCandidates.push(cand);
      }
    }

    const nextCharSuggestions = getNextCharacterPredictions(activeBuffer);
    return { wordCandidates, nextCharSuggestions };
  }

  // If no active buffer, check the last word in fullText for n-gram predictions
  const tokens = fullText.trim().split(/\s+/);
  const lastWord = tokens.length > 0 ? tokens[tokens.length - 1] : '';
  const wordCandidates: PredictionCandidate[] = [];

  if (lastWord && NGRAM_NEXT_WORDS[lastWord]) {
    const nextList = NGRAM_NEXT_WORDS[lastWord];
    for (const w of nextList) {
      wordCandidates.push({
        word: w,
        score: 900,
        source: 'ngram',
        meaningOrHint: `${lastWord} এর পরের সম্ভাব্য শব্দ`,
      });
    }
  }

  // Fallback frequent starters if none
  if (wordCandidates.length === 0) {
    const defaults = ['আমি', 'তুমি', 'বাংলাদেশ', 'ধন্যবাদ', 'কেমন', 'ভালো', 'আজ'];
    for (const d of defaults) {
      wordCandidates.push({
        word: d,
        score: 800,
        source: 'ngram',
        meaningOrHint: 'জনপ্রিয় প্রারম্ভিক শব্দ',
      });
    }
  }

  const nextCharSuggestions = getNextCharacterPredictions(fullText);
  return { wordCandidates, nextCharSuggestions };
}
