import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Lightbulb, Check, Sparkles } from 'lucide-react';
import { JuktobornoItem, ThemeConfig } from '../types';
import { JUKTOBORNO_LIST } from '../data/juktobornoData';

interface JuktobornoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertGlyph: (glyph: string) => void;
  theme: ThemeConfig;
}

export const JuktobornoDrawer: React.FC<JuktobornoDrawerProps> = ({
  isOpen,
  onClose,
  onInsertGlyph,
  theme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedEquation, setCopiedEquation] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    JUKTOBORNO_LIST.forEach(item => set.add(item.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredList = useMemo(() => {
    return JUKTOBORNO_LIST.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        item.glyph.includes(q) ||
        item.equation.includes(q) ||
        item.phoneticCode.toLowerCase().includes(q) ||
        item.commonWords.some(w => w.includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleSelect = (item: JuktobornoItem) => {
    onInsertGlyph(item.glyph);
    setCopiedEquation(item.equation);
    setTimeout(() => setCopiedEquation(null), 1800);
  };

  if (!isOpen) return null;

  return (
    <div
      id="juktoborno-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs transition-opacity"
    >
      <div
        id="juktoborno-modal"
        className="w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-all"
        style={{
          backgroundColor: theme.windowBg,
          borderColor: theme.keyBorder,
          color: theme.keyText,
          backdropFilter: theme.backdropBlur || 'none',
          WebkitBackdropFilter: theme.backdropBlur || 'none',
          boxShadow: theme.isGlass
            ? '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 1.5px rgba(255,255,255,0.3)'
            : undefined,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3.5 border-b"
          style={{
            backgroundColor: theme.headerBg,
            borderColor: theme.keyBorder,
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="p-1.5 rounded-md"
              style={{ backgroundColor: theme.accentColor, color: theme.accentText }}
            >
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm font-bangla">যুক্তবর্ণ সহায়িকা ও গঠন নির্দেশিকা</h2>
              <p className="text-xs" style={{ color: theme.keySubText }}>
                সহজে যুক্তবর্ণ লিখুন ও কীবোর্ড সূত্র জানুন
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md transition-colors hover:opacity-75"
            style={{ color: theme.keySubText }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Beginner Tip Banner */}
        <div
          className="px-5 py-2.5 flex items-start gap-2.5 text-xs border-b"
          style={{
            backgroundColor: theme.suggestionActiveBg,
            borderColor: theme.keyBorder,
            color: theme.keyText,
          }}
        >
          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accentColor }} />
          <div>
            <span className="font-semibold">যুক্তবর্ণ লেখার মূল সূত্র:</span> প্রথম বর্ণ +{' '}
            <span className="font-bold px-1 rounded bg-black/10 dark:bg-white/10 font-mono">্ (হসন্ত)</span> + দ্বিতীয় বর্ণ। যেমন: ক + ্ + ষ = <span className="font-bold">ক্ষ</span>। নিচের যেকোনো যুক্তবর্ণে ক্লিক করলে তা সরাসরি টাইপ হবে!
          </div>
        </div>

        {/* Search & Categories */}
        <div className="px-5 pt-3 pb-2 flex flex-col gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 opacity-50" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="যুক্তবর্ণ বা ফোনেটিক খুঁজুন (যেমন: kkh, জ্ঞ, শ্চ, যুদ্ধ)..."
              className="w-full pl-9 pr-4 py-2 rounded-lg text-sm border outline-none font-bangla transition-all"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.keyBorder,
                color: theme.keyText,
              }}
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-3 py-1 rounded-full text-xs font-bangla font-medium transition-all shrink-0 cursor-pointer"
                style={{
                  backgroundColor: selectedCategory === cat ? theme.accentColor : theme.cardBg,
                  color: selectedCategory === cat ? theme.accentText : theme.keySubText,
                  border: `1px solid ${theme.keyBorder}`,
                }}
              >
                {cat === 'all' ? 'সবগুলো' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Juktoborno Grid List */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredList.map(item => (
            <button
              key={item.glyph}
              onClick={() => handleSelect(item)}
              className="flex items-start gap-3 p-3 rounded-xl border text-left transition-all hover:scale-[1.01] hover:shadow-sm cursor-pointer group"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.keyBorder,
              }}
            >
              {/* Glyph Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold font-bangla shrink-0 shadow-xs transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: theme.suggestionActiveBg,
                  color: theme.accentColor,
                  border: `1px solid ${theme.accentColor}`,
                }}
              >
                {item.glyph}
              </div>

              {/* Equation & Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold" style={{ color: theme.accentColor }}>
                    {item.equation}
                  </span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium"
                    style={{ backgroundColor: theme.actionKeyBg, color: theme.keySubText }}
                  >
                    {item.phoneticCode}
                  </span>
                </div>

                {/* Common words preview */}
                <div className="mt-1 flex flex-wrap items-center gap-1">
                  {item.commonWords.slice(0, 3).map((w, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-bangla px-1.5 py-0.2 rounded"
                      style={{ backgroundColor: theme.headerBg, color: theme.keySubText }}
                    >
                      {w}
                    </span>
                  ))}
                </div>

                {item.pronunciationHint && (
                  <p className="text-[10px] mt-1 italic" style={{ color: theme.keySubText }}>
                    💡 {item.pronunciationHint}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Footer feedback */}
        <div
          className="px-5 py-2.5 border-t flex items-center justify-between text-xs"
          style={{
            backgroundColor: theme.headerBg,
            borderColor: theme.keyBorder,
          }}
        >
          <span style={{ color: theme.keySubText }}>
            মোট {filteredList.length}টি যুক্তবর্ণের বিশদ বিবরণ
          </span>
          {copiedEquation && (
            <span className="font-semibold flex items-center gap-1" style={{ color: theme.accentColor }}>
              <Check className="w-3.5 h-3.5" /> {copiedEquation} সন্নিবেশিত হয়েছে!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
