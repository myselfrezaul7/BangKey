import React, { useState, useRef } from 'react';
import { Download, Copy, Check, Printer, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ThemeConfig } from '../types';

interface CardExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  theme: ThemeConfig;
}

const CARD_STYLES = [
  { id: 'glass-cyan', name: 'Liquid Cyan Glass', bg: 'linear-gradient(135deg, #0f172a, #0369a1, #0f172a)', border: 'rgba(56, 189, 248, 0.4)' },
  { id: 'aurora-violet', name: 'Aurora Velvet', bg: 'linear-gradient(135deg, #1e112a, #6b21a8, #3b0764)', border: 'rgba(192, 132, 252, 0.4)' },
  { id: 'emerald-herit', name: 'Emerald Heritage', bg: 'linear-gradient(135deg, #052e16, #047857, #064e3b)', border: 'rgba(52, 211, 153, 0.4)' },
  { id: 'obsidian-gold', name: 'Obsidian & Gold', bg: 'linear-gradient(135deg, #0a0a0a, #27272a, #18181b)', border: 'rgba(234, 179, 8, 0.4)' },
];

export const CardExportModal: React.FC<CardExportModalProps> = ({
  isOpen,
  onClose,
  text,
  theme,
}) => {
  const [authorName, setAuthorName] = useState('বাঙালী লেখক');
  const [activeCardStyle, setActiveCardStyle] = useState(CARD_STYLES[0]);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = () => {
    // Render card to canvas
    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    if (activeCardStyle.id === 'glass-cyan') {
      grad.addColorStop(0, '#0a101d');
      grad.addColorStop(0.5, '#075985');
      grad.addColorStop(1, '#032030');
    } else if (activeCardStyle.id === 'aurora-violet') {
      grad.addColorStop(0, '#190d28');
      grad.addColorStop(0.5, '#581c87');
      grad.addColorStop(1, '#2e1065');
    } else if (activeCardStyle.id === 'emerald-herit') {
      grad.addColorStop(0, '#032412');
      grad.addColorStop(0.5, '#065f46');
      grad.addColorStop(1, '#022c1b');
    } else {
      grad.addColorStop(0, '#09090b');
      grad.addColorStop(0.5, '#18181b');
      grad.addColorStop(1, '#27272a');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Draw inner frosted glass card
    const margin = 80;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeStyle = activeCardStyle.border;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(margin, margin, width - margin * 2, height - margin * 2, 40);
    ctx.fill();
    ctx.stroke();

    // Top watermark / app badge
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('অ বাংলা কীবোর্ড • Bangla Keyboard Pro', margin + 60, margin + 80);

    // Text content
    ctx.font = '500 44px "Hind Siliguri", "Noto Sans Bengali", sans-serif';
    ctx.fillStyle = '#ffffff';
    
    // Simple multi-line text wrapping
    const maxWidth = width - margin * 2 - 120;
    const words = (text || 'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।').split(' ');
    let line = '';
    let y = margin + 200;
    const lineHeight = 65;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, margin + 60, y);
        line = words[n] + ' ';
        y += lineHeight;
        if (y > height - margin - 150) break; // Limit height
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, margin + 60, y);

    // Author footer
    ctx.font = 'italic 32px "Hind Siliguri", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(`— ${authorName}`, margin + 60, height - margin - 60);

    // Trigger download
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `Bangla_Card_${Date.now()}.png`;
    a.click();
  };

  return (
    <div
      id="card-export-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-md transition-opacity animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="card-export-dialog"
        className="w-full max-w-xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-all"
        style={{
          backgroundColor: theme.windowBg,
          borderColor: theme.keyBorder,
          backdropFilter: theme.backdropBlur || 'blur(28px)',
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
            <ImageIcon className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="font-semibold text-sm">বাংলা টাইপোগ্রাফি কার্ড এক্সপোর্টার</h3>
              <p className="text-[11px] opacity-70" style={{ color: theme.keySubText }}>
                আপনার লেখা বাংলা টেক্সট দিয়ে সুন্দর সোশ্যাল মিডিয়া কার্ড ও ছবি তৈরি করুন
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

        {/* Customization Options Bar */}
        <div className="p-3 border-b flex flex-wrap items-center justify-between gap-3 text-xs" style={{ borderColor: theme.keyBorder }}>
          <div className="flex items-center gap-2">
            <span className="opacity-75">স্টাইল:</span>
            <div className="flex items-center gap-1.5">
              {CARD_STYLES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveCardStyle(s)}
                  className={`w-6 h-6 rounded-full border transition-transform ${
                    activeCardStyle.id === s.id ? 'scale-115 ring-2 ring-sky-400 ring-offset-1' : 'opacity-70'
                  }`}
                  style={{ background: s.bg, borderColor: s.border }}
                  title={s.name}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="opacity-75">লেখক / স্বাক্ষর:</span>
            <input
              type="text"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              placeholder="আপনার নাম..."
              className="px-2.5 py-1 rounded-lg border text-xs outline-none font-bangla"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.keyBorder,
                color: theme.keyText,
              }}
            />
          </div>
        </div>

        {/* Live Card Preview Surface */}
        <div className="flex-1 p-5 overflow-y-auto flex items-center justify-center bg-black/40">
          <div
            ref={cardRef}
            className="w-full max-w-md aspect-square rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative border overflow-hidden transition-all duration-300"
            style={{
              background: activeCardStyle.bg,
              borderColor: activeCardStyle.border,
            }}
          >
            {/* Specular highlights */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between text-xs select-none z-10">
              <span className="flex items-center gap-1 font-semibold text-sky-300">
                <Sparkles className="w-3.5 h-3.5" />
                বাংলা কীবোর্ড • iOS 27 Glass
              </span>
              <span className="opacity-60 text-[10px] text-white">
                {new Date().toLocaleDateString('bn-BD')}
              </span>
            </div>

            {/* Card Body (Bengali Text) */}
            <div className="my-auto z-10 py-4">
              <p className="font-bangla text-xl sm:text-2xl text-white font-medium leading-relaxed drop-shadow-md selection:bg-sky-500/30">
                {text || 'আমার সোনার বাংলা, আমি তোমায় ভালোবাসি। চিরদিন তোমার আকাশ, তোমার বাতাস, আমার প্রাণে বাজায় বাঁশি।'}
              </p>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between border-t border-white/15 pt-3 text-xs text-white/80 select-none z-10">
              <span className="font-bangla italic text-sm text-sky-200">
                — {authorName || 'নামহীন'}
              </span>
              <span className="text-[10px] opacity-60">
                {text.length} বর্ণ
              </span>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div
          className="p-3 border-t flex items-center justify-between select-none"
          style={{
            backgroundColor: theme.headerBg,
            borderColor: theme.keyBorder,
          }}
        >
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 transition-colors hover:opacity-80 cursor-pointer"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.keyBorder,
              color: theme.keyText,
            }}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>প্রিন্ট / PDF</span>
          </button>

          <button
            onClick={handleDownloadImage}
            className="px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer shadow-md"
            style={{
              backgroundColor: theme.accentColor,
              color: theme.accentText,
            }}
          >
            <Download className="w-4 h-4" />
            <span>ছবি হিসেবে সংরক্ষণ (PNG)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
