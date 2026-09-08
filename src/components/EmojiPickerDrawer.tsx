import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, Smile, Heart, Hand, Coins } from 'lucide-react';
import { EmojiItem, ThemeConfig } from '../types';
import { EMOJI_COLLECTION } from '../data/emojis';

interface EmojiPickerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEmoji: (emoji: string) => void;
  theme: ThemeConfig;
}

export const EmojiPickerDrawer: React.FC<EmojiPickerDrawerProps> = ({
  isOpen,
  onClose,
  onSelectEmoji,
  theme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const isGlass = theme.isGlass;

  const categories = [
    { id: 'all', label: 'সব', icon: Sparkles },
    { id: 'smileys', label: 'হাসি', icon: Smile },
    { id: 'gestures', label: 'ভঙ্গিমা', icon: Hand },
    { id: 'hearts', label: 'হৃদয়', icon: Heart },
    { id: 'bangla', label: 'বাংলা ও মুদ্রা', icon: Coins },
  ];

  const filteredEmojis = useMemo(() => {
    let list = EMOJI_COLLECTION;
    if (activeCategory !== 'all') {
      list = list.filter(e => e.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        e =>
          e.name.toLowerCase().includes(q) ||
          e.bnName.toLowerCase().includes(q) ||
          e.keywords.some(k => k.toLowerCase().includes(q)) ||
          e.emoji.includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      id="emoji-picker-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="emoji-picker-dialog"
        className="w-full max-w-md max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-all"
        style={{
          backgroundColor: theme.windowBg,
          borderColor: theme.keyBorder,
          backdropFilter: theme.backdropBlur || 'blur(28px)',
          WebkitBackdropFilter: theme.backdropBlur || 'blur(28px)',
          boxShadow: isGlass
            ? '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 1.5px rgba(255,255,255,0.3)'
            : undefined,
          color: theme.keyText,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b select-none"
          style={{
            backgroundColor: theme.headerBg,
            borderColor: theme.keyBorder,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">😊</span>
            <div>
              <h3 className="font-semibold text-sm">ইমোজি ও বাংলা প্রতীক</h3>
              <p className="text-[11px] opacity-70" style={{ color: theme.keySubText }}>
                বাংলা বা ইংরেজিতে সার্চ করুন (যেমন: হাসি, love, taka, দাঁড়ি)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg transition-colors hover:opacity-75 cursor-pointer"
            style={{ color: theme.keySubText }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b" style={{ borderColor: theme.keyBorder }}>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.keyBorder,
            }}
          >
            <Search className="w-4 h-4 opacity-60" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ইমোজি খুঁজুন (যেমন: smile, tak, ful, dua)..."
              className="bg-transparent flex-1 text-xs outline-none font-bangla"
              style={{ color: theme.keyText }}
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs opacity-50 hover:opacity-100"
              >
                মুছুন
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 mt-2.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bangla transition-all shrink-0 cursor-pointer ${
                    isActive ? 'font-semibold shadow-xs' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? theme.accentColor : theme.cardBg,
                    color: isActive ? theme.accentText : theme.keyText,
                    border: `1px solid ${isActive ? theme.accentColor : theme.keyBorder}`,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Emojis Grid */}
        <div className="flex-1 p-3 overflow-y-auto max-h-[360px]">
          {filteredEmojis.length > 0 ? (
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
              {filteredEmojis.map((item, idx) => (
                <button
                  key={`${item.emoji}-${idx}`}
                  onClick={() => {
                    onSelectEmoji(item.emoji);
                    onClose();
                  }}
                  title={`${item.bnName} (${item.name})`}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all hover:scale-125 hover:shadow-lg cursor-pointer select-none"
                  style={{
                    backgroundColor: theme.cardBg,
                    border: isGlass ? '1px solid rgba(255,255,255,0.15)' : `1px solid ${theme.keyBorder}`,
                  }}
                >
                  <span>{item.emoji}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs opacity-60 font-bangla">
              কোনো ইমোজি পাওয়া যায়নি। অন্য শব্দ দিয়ে সার্চ করে দেখুন।
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
