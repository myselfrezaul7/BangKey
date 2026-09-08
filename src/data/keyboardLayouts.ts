import { KeyDefinition } from '../types';

/**
 * Modern Gboard Touch Layout for Bengali
 * Layer 0: Default (Consonants & Common Kars)
 * Layer 1: Shift (Upper / Rare Consonants & Independent Vowels)
 * Layer 2: Numbers & Symbols
 */
export const GBOARD_TOUCH_ROWS_DEFAULT: KeyDefinition[][] = [
  // Number / Kar Top Quick Row
  [
    { primary: 'া', phonetic: 'a', code: 'Digit1' },
    { primary: 'ি', phonetic: 'i', code: 'Digit2' },
    { primary: 'ী', phonetic: 'ee', code: 'Digit3' },
    { primary: 'ু', phonetic: 'u', code: 'Digit4' },
    { primary: 'ূ', phonetic: 'oo', code: 'Digit5' },
    { primary: 'ৃ', phonetic: 'ri', code: 'Digit6' },
    { primary: 'ে', phonetic: 'e', code: 'Digit7' },
    { primary: 'ৈ', phonetic: 'oi', code: 'Digit8' },
    { primary: 'ো', phonetic: 'o', code: 'Digit9' },
    { primary: 'ৌ', phonetic: 'ou', code: 'Digit0' },
    { primary: '্', phonetic: 'hasant', code: 'Minus', type: 'char' },
    { primary: '⌫', code: 'Backspace', type: 'backspace', width: 'w-14' },
  ],
  // Row 1: Common Consonants & Vowels
  [
    { primary: 'ক', secondary: 'খ', phonetic: 'k', code: 'KeyQ' },
    { primary: 'গ', secondary: 'ঘ', phonetic: 'g', code: 'KeyW' },
    { primary: 'চ', secondary: 'ছ', phonetic: 'c', code: 'KeyE' },
    { primary: 'জ', secondary: 'ঝ', phonetic: 'j', code: 'KeyR' },
    { primary: 'ট', secondary: 'ঠ', phonetic: 'T', code: 'KeyT' },
    { primary: 'ড', secondary: 'ঢ', phonetic: 'D', code: 'KeyY' },
    { primary: 'ত', secondary: 'থ', phonetic: 't', code: 'KeyU' },
    { primary: 'দ', secondary: 'ধ', phonetic: 'd', code: 'KeyI' },
    { primary: 'ন', secondary: 'ণ', phonetic: 'n', code: 'KeyO' },
    { primary: 'প', secondary: 'ফ', phonetic: 'p', code: 'KeyP' },
  ],
  // Row 2
  [
    { primary: 'ব', secondary: 'ভ', phonetic: 'b', code: 'KeyA' },
    { primary: 'ম', secondary: 'য', phonetic: 'm', code: 'KeyS' },
    { primary: 'র', secondary: 'ড়', phonetic: 'r', code: 'KeyD' },
    { primary: 'ল', secondary: 'ল্ল', phonetic: 'l', code: 'KeyF' },
    { primary: 'শ', secondary: 'ষ', phonetic: 'sh', code: 'KeyG' },
    { primary: 'স', secondary: 'স্ম', phonetic: 's', code: 'KeyH' },
    { primary: 'হ', secondary: 'হ্ম', phonetic: 'h', code: 'KeyJ' },
    { primary: 'য়', secondary: 'ৎ', phonetic: 'y', code: 'KeyK' },
    { primary: 'ং', secondary: 'ঃ', phonetic: 'ng', code: 'KeyL' },
    { primary: 'ঁ', secondary: '্', phonetic: '^', code: 'Semicolon' },
  ],
  // Row 3
  [
    { primary: '⇧', code: 'ShiftLeft', type: 'modifier', width: 'w-14' },
    { primary: 'অ', secondary: 'আ', phonetic: 'a', code: 'KeyZ' },
    { primary: 'ই', secondary: 'ঈ', phonetic: 'i', code: 'KeyX' },
    { primary: 'উ', secondary: 'ঊ', phonetic: 'u', code: 'KeyC' },
    { primary: 'এ', secondary: 'ঐ', phonetic: 'e', code: 'KeyV' },
    { primary: 'ও', secondary: 'ঔ', phonetic: 'o', code: 'KeyB' },
    { primary: 'ক্ষ', secondary: 'জ্ঞ', phonetic: 'kkh', code: 'KeyN' },
    { primary: 'ত্র', secondary: 'শ্র', phonetic: 'tr', code: 'KeyM' },
    { primary: '?', secondary: '!', phonetic: '?', code: 'Slash' },
    { primary: '↵', code: 'Enter', type: 'enter', width: 'w-16' },
  ],
  // Row 4: Space & Controls with Flanking Punctuation (, and ।)
  [
    { primary: '?123', code: 'Symbols', type: 'action', width: 'w-14' },
    { primary: ',', secondary: '!', phonetic: ',', code: 'Comma', type: 'char', width: 'w-11' },
    { primary: 'স্পেস (Space)', code: 'Space', type: 'space', width: 'flex-1' },
    { primary: '।', secondary: '?', phonetic: '.', code: 'Period', type: 'char', width: 'w-11' },
    { primary: 'যুক্তবর্ণ', code: 'JuktoAssist', type: 'action', width: 'w-20' },
    { primary: '৳', secondary: '৳', phonetic: 'taka', code: 'TakaSign', type: 'char', width: 'w-10' },
    { primary: '⚙️', code: 'Settings', type: 'action', width: 'w-10' },
  ],
];

export const GBOARD_TOUCH_ROWS_SHIFT: KeyDefinition[][] = [
  // Top Kar Shift Row
  [
    { primary: '১', secondary: '!', phonetic: '1', code: 'Digit1' },
    { primary: '২', secondary: '@', phonetic: '2', code: 'Digit2' },
    { primary: '৩', secondary: '#', phonetic: '3', code: 'Digit3' },
    { primary: '৪', secondary: '$', phonetic: '4', code: 'Digit4' },
    { primary: '৫', secondary: '%', phonetic: '5', code: 'Digit5' },
    { primary: '৬', secondary: '^', phonetic: '6', code: 'Digit6' },
    { primary: '৭', secondary: '&', phonetic: '7', code: 'Digit7' },
    { primary: '৮', secondary: '*', phonetic: '8', code: 'Digit8' },
    { primary: '৯', secondary: '(', phonetic: '9', code: 'Digit9' },
    { primary: '০', secondary: ')', phonetic: '0', code: 'Digit0' },
    { primary: '্', phonetic: 'hasant', code: 'Minus', type: 'char' },
    { primary: '⌫', code: 'Backspace', type: 'backspace', width: 'w-14' },
  ],
  // Row 1: Mahaprana consonants & vowels
  [
    { primary: 'খ', secondary: 'ক', phonetic: 'kh', code: 'KeyQ' },
    { primary: 'ঘ', secondary: 'ঙ', phonetic: 'gh', code: 'KeyW' },
    { primary: 'ছ', secondary: 'চ', phonetic: 'ch', code: 'KeyE' },
    { primary: 'ঝ', secondary: 'ঞ', phonetic: 'jh', code: 'KeyR' },
    { primary: 'ঠ', secondary: 'ট', phonetic: 'Th', code: 'KeyT' },
    { primary: 'ঢ', secondary: 'ড', phonetic: 'Dh', code: 'KeyY' },
    { primary: 'থ', secondary: 'ত', phonetic: 'th', code: 'KeyU' },
    { primary: 'ধ', secondary: 'দ', phonetic: 'dh', code: 'KeyI' },
    { primary: 'ণ', secondary: 'ন', phonetic: 'N', code: 'KeyO' },
    { primary: 'ফ', secondary: 'প', phonetic: 'f', code: 'KeyP' },
  ],
  // Row 2
  [
    { primary: 'ভ', secondary: 'ব', phonetic: 'bh', code: 'KeyA' },
    { primary: 'য', secondary: 'ম', phonetic: 'z', code: 'KeyS' },
    { primary: 'ড়', secondary: 'ঢ়', phonetic: 'R', code: 'KeyD' },
    { primary: 'ঢ়', secondary: 'র', phonetic: 'Rh', code: 'KeyF' },
    { primary: 'ষ', secondary: 'শ', phonetic: 'Sh', code: 'KeyG' },
    { primary: 'স্ম', secondary: 'স', phonetic: 'sm', code: 'KeyH' },
    { primary: 'ঋ', secondary: 'হ', phonetic: 'rri', code: 'KeyJ' },
    { primary: 'ৎ', secondary: 'য়', phonetic: 'khanda-ta', code: 'KeyK' },
    { primary: 'ঃ', secondary: 'ং', phonetic: 'bisarga', code: 'KeyL' },
    { primary: 'ঁ', secondary: '্', phonetic: 'chondrobindu', code: 'Semicolon' },
  ],
  // Row 3
  [
    { primary: '▲', code: 'ShiftLeft', type: 'modifier', width: 'w-14' },
    { primary: 'আ', secondary: 'অ', phonetic: 'aa', code: 'KeyZ' },
    { primary: 'ঈ', secondary: 'ই', phonetic: 'ee', code: 'KeyX' },
    { primary: 'ঊ', secondary: 'উ', phonetic: 'oo', code: 'KeyC' },
    { primary: 'ঐ', secondary: 'এ', phonetic: 'oi', code: 'KeyV' },
    { primary: 'ঔ', secondary: 'ও', phonetic: 'ou', code: 'KeyB' },
    { primary: 'জ্ঞ', secondary: 'ক্ষ', phonetic: 'jng', code: 'KeyN' },
    { primary: 'শ্র', secondary: 'ত্র', phonetic: 'shr', code: 'KeyM' },
    { primary: '!', secondary: '।', phonetic: '!', code: 'Period' },
    { primary: '↵', code: 'Enter', type: 'enter', width: 'w-16' },
  ],
  // Row 4: Shift controls with flanking punctuation (; and !)
  [
    { primary: 'কখগ', code: 'Symbols', type: 'action', width: 'w-14' },
    { primary: ';', secondary: ':', phonetic: ';', code: 'Semicolon', type: 'char', width: 'w-11' },
    { primary: 'স্পেস (Space)', code: 'Space', type: 'space', width: 'flex-1' },
    { primary: '!', secondary: '?', phonetic: '!', code: 'Period', type: 'char', width: 'w-11' },
    { primary: 'যুক্তবর্ণ', code: 'JuktoAssist', type: 'action', width: 'w-20' },
    { primary: '৳', code: 'Slash', type: 'char', width: 'w-10' },
    { primary: '⚙️', code: 'Settings', type: 'action', width: 'w-10' },
  ],
];

/**
 * Phonetic Physical/Virtual Hybrid Windows Layout (Avro Bridge)
 * Displays English key with its corresponding Bangla character and phonetic output
 */
export const PHONETIC_QWERTY_ROWS: KeyDefinition[][] = [
  // Numbers
  [
    { primary: '1', secondary: '১', code: 'Digit1' },
    { primary: '2', secondary: '২', code: 'Digit2' },
    { primary: '3', secondary: '৩', code: 'Digit3' },
    { primary: '4', secondary: '৪', code: 'Digit4' },
    { primary: '5', secondary: '৫', code: 'Digit5' },
    { primary: '6', secondary: '৬', code: 'Digit6' },
    { primary: '7', secondary: '৭', code: 'Digit7' },
    { primary: '8', secondary: '৮', code: 'Digit8' },
    { primary: '9', secondary: '৯', code: 'Digit9' },
    { primary: '0', secondary: '০', code: 'Digit0' },
    { primary: '-', secondary: '্', code: 'Minus' },
    { primary: '=', secondary: '+', code: 'Equal' },
    { primary: '⌫', code: 'Backspace', type: 'backspace', width: 'w-14' },
  ],
  // QWERTY Row 1
  [
    { primary: 'q', secondary: 'ক', phonetic: 'ক', code: 'KeyQ' },
    { primary: 'w', secondary: 'ও', phonetic: 'ও', code: 'KeyW' },
    { primary: 'e', secondary: 'ে', phonetic: 'এ/ে', code: 'KeyE' },
    { primary: 'r', secondary: 'র', phonetic: 'র (ড়)', code: 'KeyR' },
    { primary: 't', secondary: 'ত', phonetic: 'ত (ট)', code: 'KeyT' },
    { primary: 'y', secondary: 'য়', phonetic: 'য়', code: 'KeyY' },
    { primary: 'u', secondary: 'ু', phonetic: 'উ/ু', code: 'KeyU' },
    { primary: 'i', secondary: 'ি', phonetic: 'ই/ি', code: 'KeyI' },
    { primary: 'o', secondary: 'ো', phonetic: 'ও/ো', code: 'KeyO' },
    { primary: 'p', secondary: 'প', phonetic: 'প', code: 'KeyP' },
    { primary: '[', secondary: '{', code: 'BracketLeft' },
    { primary: ']', secondary: '}', code: 'BracketRight' },
  ],
  // QWERTY Row 2
  [
    { primary: 'a', secondary: 'া', phonetic: 'অ/া', code: 'KeyA' },
    { primary: 's', secondary: 'স', phonetic: 'স (শ)', code: 'KeyS' },
    { primary: 'd', secondary: 'দ', phonetic: 'দ (ড)', code: 'KeyD' },
    { primary: 'f', secondary: 'ফ', phonetic: 'ফ', code: 'KeyF' },
    { primary: 'g', secondary: 'গ', phonetic: 'গ (ঘ)', code: 'KeyG' },
    { primary: 'h', secondary: 'হ', phonetic: 'হ', code: 'KeyH' },
    { primary: 'j', secondary: 'জ', phonetic: 'জ (য)', code: 'KeyJ' },
    { primary: 'k', secondary: 'ক', phonetic: 'ক (খ)', code: 'KeyK' },
    { primary: 'l', secondary: 'ল', phonetic: 'ল', code: 'KeyL' },
    { primary: ';', secondary: 'ঃ', phonetic: 'ঃ', code: 'Semicolon' },
    { primary: "'", secondary: '"', code: 'Quote' },
    { primary: '↵ Enter', code: 'Enter', type: 'enter', width: 'w-20' },
  ],
  // QWERTY Row 3
  [
    { primary: '⇧ Shift', code: 'ShiftLeft', type: 'modifier', width: 'w-20' },
    { primary: 'z', secondary: 'য', phonetic: 'য', code: 'KeyZ' },
    { primary: 'x', secondary: 'ক্স', phonetic: 'ক্স', code: 'KeyX' },
    { primary: 'c', secondary: 'চ', phonetic: 'চ (ছ)', code: 'KeyC' },
    { primary: 'v', secondary: 'ভ', phonetic: 'ভ', code: 'KeyV' },
    { primary: 'b', secondary: 'ব', phonetic: 'ব (ভ)', code: 'KeyB' },
    { primary: 'n', secondary: 'ন', phonetic: 'ন (ণ)', code: 'KeyN' },
    { primary: 'm', secondary: 'ম', phonetic: 'ম', code: 'KeyM' },
    { primary: ',', secondary: '<', code: 'Comma' },
    { primary: '.', secondary: '।', phonetic: '।', code: 'Period' },
    { primary: '/', secondary: '৳', phonetic: '৳', code: 'Slash' },
    { primary: '⇧ Shift', code: 'ShiftRight', type: 'modifier', width: 'w-16' },
  ],
  // Bottom Row
  [
    { primary: 'যুক্তবর্ণ সহায়ক', code: 'JuktoAssist', type: 'action', width: 'w-36' },
    { primary: 'Space (স্পেসবার)', code: 'Space', type: 'space', width: 'flex-1' },
    { primary: '💧 স্বচ্ছ কিবোর্ড', code: 'TransparentToggle', type: 'action', width: 'w-32' },
    { primary: '⚙️ সেটিংস', code: 'Settings', type: 'action', width: 'w-24' },
  ],
];
