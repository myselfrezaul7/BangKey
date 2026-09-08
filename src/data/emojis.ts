import { EmojiItem } from '../types';

export const EMOJI_COLLECTION: EmojiItem[] = [
  // Smileys & Emotions
  { emoji: '😊', name: 'smiling face', bnName: 'হাসিমুখ', category: 'smileys', keywords: ['smile', 'hasi', 'happy', 'khushi', 'আনন্দ'] },
  { emoji: '😂', name: 'face with tears of joy', bnName: 'আনন্দের হাসি', category: 'smileys', keywords: ['laugh', 'lol', 'hasi', 'kanna', 'আনন্দ'] },
  { emoji: '🥰', name: 'smiling face with hearts', bnName: 'ভালোবাসা ভরা মুখ', category: 'smileys', keywords: ['love', 'adoring', 'bhalobasha', 'ador'] },
  { emoji: '😍', name: 'heart eyes', bnName: 'মুগ্ধ নয়ন', category: 'smileys', keywords: ['love', 'crush', 'sundor', 'pochondo'] },
  { emoji: '🤩', name: 'star struck', bnName: 'উচ্ছ্বসিত', category: 'smileys', keywords: ['wow', 'star', 'chomok', 'osadharon'] },
  { emoji: '😎', name: 'smiling face with sunglasses', bnName: 'স্মার্ট', category: 'smileys', keywords: ['cool', 'choshma', 'smart', 'style'] },
  { emoji: '😇', name: 'smiling face with halo', bnName: 'নিষ্পাপ দেবদূত', category: 'smileys', keywords: ['angel', 'shanto', 'bhalo', 'punno'] },
  { emoji: '🥺', name: 'pleading face', bnName: 'অনুরোধের মুখ', category: 'smileys', keywords: ['plead', 'please', 'onurodh', 'maya'] },
  { emoji: '😭', name: 'loudly crying face', bnName: 'কান্নারত মুখ', category: 'smileys', keywords: ['cry', 'sad', 'kanna', 'kosto', 'dukkho'] },
  { emoji: '🤔', name: 'thinking face', bnName: 'ভাবুক মুখ', category: 'smileys', keywords: ['think', 'bhabna', 'chinta', 'idea'] },
  { emoji: '🤗', name: 'hugging face', bnName: 'কোলাকুলি', category: 'smileys', keywords: ['hug', 'kolakuli', 'ador', 'shantona'] },
  { emoji: '🥳', name: 'partying face', bnName: 'উৎসবের মুখ', category: 'smileys', keywords: ['party', 'celebrate', 'utshob', 'anondo'] },

  // Gestures & People
  { emoji: '🙏', name: 'folded hands', bnName: 'নমস্কার / দোয়া', category: 'gestures', keywords: ['pray', 'please', 'dhonnobad', 'salam', 'nomoshkar', 'dua', 'মাফ'] },
  { emoji: '👍', name: 'thumbs up', bnName: 'লাইক / চমৎকার', category: 'gestures', keywords: ['like', 'ok', 'bhalo', 'thik', 'shobash'] },
  { emoji: '👏', name: 'clapping hands', bnName: 'তালি', category: 'gestures', keywords: ['clap', 'tali', 'shabash', 'shuvo'] },
  { emoji: '🤝', name: 'handshake', bnName: 'হ্যান্ডশেক / চুক্তি', category: 'gestures', keywords: ['deal', 'friend', 'bondhutto', 'shomjhota'] },
  { emoji: '✌️', name: 'victory hand', bnName: 'বিজয়ের চিহ্ন', category: 'gestures', keywords: ['victory', 'peace', 'joy', 'bijoy'] },
  { emoji: '👌', name: 'ok hand', bnName: 'একদম ঠিক', category: 'gestures', keywords: ['perfect', 'thik', 'shothik', 'khub bhalo'] },
  { emoji: '❤️', name: 'red heart', bnName: 'লাল হৃদয়', category: 'hearts', keywords: ['heart', 'love', 'hridoy', 'bhalobasha', 'prem'] },
  { emoji: '💖', name: 'sparkling heart', bnName: 'চকচকে হৃদয়', category: 'hearts', keywords: ['sparkle', 'love', 'ador', 'bhalobasha'] },
  { emoji: '💐', name: 'bouquet', bnName: 'ফুলের তোড়া', category: 'symbols', keywords: ['flower', 'ful', 'tora', 'shuveccha', 'upohar'] },
  { emoji: '🎉', name: 'party popper', bnName: 'কনফেটি', category: 'symbols', keywords: ['party', 'congrats', 'shuva', 'obhinondon'] },
  { emoji: '✨', name: 'sparkles', bnName: 'আলোর ঝলক', category: 'symbols', keywords: ['magic', 'alor', 'shundor', 'notun'] },
  { emoji: '🔥', name: 'fire', bnName: 'আগুন / ট্রেন্ডিং', category: 'symbols', keywords: ['fire', 'hot', 'agun', 'seraa'] },

  // Traditional Bangla & Cultural Symbols
  { emoji: '৳', name: 'Bangla Taka', bnName: 'বাংলাদেশী টাকা প্রতীক', category: 'bangla', keywords: ['taka', 'taka sign', 'currency', 'টাকা', 'পয়সা', 'অর্থ'] },
  { emoji: '৲', name: 'Bengali Rupee Mark', bnName: 'ঐতিহ্যবাহী মুদ্রা দাগ', category: 'bangla', keywords: ['rupee', 'taka', 'mark', 'টাকা'] },
  { emoji: '৴', name: 'Bengali Currency Numerator One', bnName: 'ঐতিহ্যবাহী সিকি ১/১৬', category: 'bangla', keywords: ['currency', 'shiki', 'ana', 'আনা'] },
  { emoji: '৵', name: 'Bengali Currency Numerator Two', bnName: 'ঐতিহ্যবাহী আধুলি ২/১৬', category: 'bangla', keywords: ['currency', 'adhuli', 'ana', 'আনা'] },
  { emoji: '৶', name: 'Bengali Currency Numerator Three', bnName: 'ঐতিহ্যবাহী পৌনে ৩/১৬', category: 'bangla', keywords: ['currency', 'poune', 'ana', 'আনা'] },
  { emoji: '।', name: 'Bengali Dari (Danda)', bnName: 'দাঁড়ি (পূর্ণচ্ছেদ)', category: 'bangla', keywords: ['dari', 'danda', 'period', 'stop', 'দাঁড়ি'] },
  { emoji: '॥', name: 'Bengali Double Danda', bnName: 'দ্বৈত দাঁড়ি', category: 'bangla', keywords: ['double dari', 'sloka', 'দাঁড়ি'] },
  { emoji: 'ঽ', name: 'Bengali Avagraha', bnName: 'অবগ্রহ', category: 'bangla', keywords: ['avagraha', 'sanskrit', 'অবগ্রহ'] },
  { emoji: 'ঁ', name: 'Bengali Chandrabindu', bnName: 'চন্দ্রবিন্দু', category: 'bangla', keywords: ['chandrabindu', 'nasal', 'চন্দ্রবিন্দু'] },
  { emoji: '্', name: 'Bengali Hasanta / Halant', bnName: 'হসন্ত (Halant)', category: 'bangla', keywords: ['hasanta', 'halant', 'virama', 'হসন্ত'] },
];
