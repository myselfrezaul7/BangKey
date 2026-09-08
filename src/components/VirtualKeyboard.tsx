import React, { useState } from 'react';
import { motion } from 'motion/react';
import { KeyboardMode, KeyboardScale, KeyDefinition, ThemeConfig } from '../types';
import {
  GBOARD_TOUCH_ROWS_DEFAULT,
  GBOARD_TOUCH_ROWS_SHIFT,
  PHONETIC_QWERTY_ROWS,
} from '../data/keyboardLayouts';

interface VirtualKeyboardProps {
  theme: ThemeConfig;
  mode: KeyboardMode;
  onKeyPress: (key: KeyDefinition) => void;
  onOpenJuktoborno: () => void;
  onOpenSettings: () => void;
  onToggleTransparency?: () => void;
  showSubLabels: boolean;
  scale?: KeyboardScale;
}

interface RippleEffect {
  id: number;
  x: number;
  y: number;
  code: string;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  theme,
  mode,
  onKeyPress,
  onOpenJuktoborno,
  onOpenSettings,
  onToggleTransparency,
  showSubLabels,
  scale = 'standard',
}) => {
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [pressedKeyCode, setPressedKeyCode] = useState<string | null>(null);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  // Determine keyboard rows based on mode and shift
  let rows: KeyDefinition[][] = [];
  if (mode === 'touch') {
    rows = isShiftActive ? GBOARD_TOUCH_ROWS_SHIFT : GBOARD_TOUCH_ROWS_DEFAULT;
  } else {
    // phonetic (Gboard ABC -> বাংলা) / national
    rows = PHONETIC_QWERTY_ROWS;
  }

  const handleKeyClick = (key: KeyDefinition, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rippleX = e.clientX - rect.left;
    const rippleY = e.clientY - rect.top;
    const rippleId = Date.now() + Math.random();

    setRipples(prev => [...prev.slice(-6), { id: rippleId, x: rippleX, y: rippleY, code: key.code }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== rippleId));
    }, 400);

    setPressedKeyCode(key.code);
    setTimeout(() => setPressedKeyCode(null), 120);

    if (key.code === 'ShiftLeft' || key.code === 'ShiftRight') {
      setIsShiftActive(prev => !prev);
      return;
    }

    if (key.code === 'JuktoAssist') {
      onOpenJuktoborno();
      return;
    }

    if (key.code === 'Settings') {
      onOpenSettings();
      return;
    }

    if (key.code === 'Symbols') {
      setIsShiftActive(prev => !prev);
      return;
    }

    if (key.code === 'TransparentToggle') {
      onToggleTransparency?.();
      return;
    }

    // Safety guard: action or modifier keys must NEVER be emitted to onKeyPress
    if (key.type === 'action' || key.type === 'modifier') {
      return;
    }

    // Send the appropriate shifted/unshifted primary
    const isLetter = key.code.startsWith('Key');
    const effectiveKey: KeyDefinition = {
      ...key,
      primary: isLetter && isShiftActive ? key.primary.toUpperCase() : key.primary,
    };

    onKeyPress(effectiveKey);

    // If shift was active for a single letter, release it
    if (isShiftActive) {
      setIsShiftActive(false);
    }
  };

  const isGlass = theme.isGlass;

  // Scale height and padding classes
  const keyHeightClass =
    scale === 'compact'
      ? 'h-9 sm:h-10'
      : scale === 'spacious'
      ? 'h-13 sm:h-14'
      : 'h-11 sm:h-12';

  const rowGapClass = scale === 'compact' ? 'gap-1' : 'gap-1.5';
  const containerPaddingClass = scale === 'compact' ? 'p-1.5 sm:p-2' : 'p-2 sm:p-3';

  return (
    <div
      id="virtual-keyboard"
      className={`w-full select-none flex flex-col transition-all duration-200 ${containerPaddingClass} ${rowGapClass}`}
      style={{
        backgroundColor: theme.windowBg,
        backdropFilter: theme.backdropBlur || 'none',
        WebkitBackdropFilter: theme.backdropBlur || 'none',
      }}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`flex items-center justify-center ${rowGapClass} w-full`}>
          {row.map((key, keyIndex) => {
            const isPressed = pressedKeyCode === key.code;
            const isSpace = key.type === 'space';
            const isShiftKey = key.code === 'ShiftLeft' || key.code === 'ShiftRight';
            const isShiftToggled = isShiftKey && isShiftActive;
            const isLetter = key.code.startsWith('Key');

            // Width handling
            const widthClass = key.width ? key.width : 'flex-1 min-w-[26px] max-w-[54px]';

            // Background & text color
            let bgColor =
              key.type === 'action' || key.type === 'modifier' || key.type === 'backspace' || key.type === 'enter'
                ? theme.actionKeyBg
                : theme.keyBg;
            let textColor =
              key.type === 'action' || key.type === 'modifier' || key.type === 'backspace' || key.type === 'enter'
                ? theme.actionKeyText
                : theme.keyText;

            if (isShiftToggled) {
              bgColor = theme.accentColor;
              textColor = theme.accentText;
            } else if (isPressed) {
              bgColor = theme.keyActiveBg;
            }

            const isTransparentToggle = key.code === 'TransparentToggle';
            if (isTransparentToggle && isGlass) {
              bgColor = `${theme.accentColor}22`;
              textColor = theme.accentColor;
            }

            // Subtle modern key shadow & specular rim
            let keyBoxShadow = 'none';
            if (isGlass) {
              if (isPressed) {
                keyBoxShadow = `inset 0 1px 3px rgba(0, 0, 0, 0.45), 0 0 12px ${theme.accentColor}44`;
              } else if (isShiftToggled) {
                keyBoxShadow = `0 0 16px ${theme.accentColor}66, inset 0 1px 1px rgba(255, 255, 255, 0.5)`;
              } else {
                keyBoxShadow =
                  'inset 0 1px 0.5px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0.5px 0 rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.2)';
              }
            } else if (theme.hasShadow) {
              keyBoxShadow = isPressed ? 'none' : '0 1px 2px rgba(0,0,0,0.06)';
            }

            // Display char: shifted if letter
            const displayChar = isTransparentToggle
              ? (isGlass ? '💧 স্বচ্ছ (চালু)' : '💧 স্বচ্ছ কিবোর্ড')
              : isLetter
              ? isShiftActive
                ? key.primary.toUpperCase()
                : key.primary.toLowerCase()
              : key.primary;

            const activeKeyRipples = ripples.filter(r => r.code === key.code);

            return (
              <motion.button
                key={`${key.code}-${keyIndex}`}
                id={`key-${key.code}-${keyIndex}`}
                whileTap={{ scale: 0.95 }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleKeyClick(key, e)}
                className={`${keyHeightClass} relative flex flex-col items-center justify-center transition-colors duration-100 cursor-pointer overflow-hidden ${widthClass} hover:brightness-105 active:brightness-95`}
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  borderRadius: `${theme.borderRadius}px`,
                  border: theme.hasBorders ? `1px solid ${theme.keyBorder}` : 'none',
                  boxShadow: keyBoxShadow,
                  backdropFilter: isGlass ? 'blur(16px)' : 'none',
                  WebkitBackdropFilter: isGlass ? 'blur(16px)' : 'none',
                }}
              >
                {/* Subtle glass tactile ripple */}
                {activeKeyRipples.map(rip => (
                  <span
                    key={rip.id}
                    className="absolute pointer-events-none rounded-full bg-white/20 animate-ping"
                    style={{
                      left: rip.x - 14,
                      top: rip.y - 14,
                      width: 28,
                      height: 28,
                    }}
                  />
                ))}

                {/* Secondary or Shift character in top corner */}
                {key.secondary && (
                  <span
                    className="absolute top-0.5 right-1 text-[8.5px] font-bangla opacity-50 select-none leading-none"
                    style={{ color: theme.keySubText }}
                  >
                    {key.secondary}
                  </span>
                )}

                {/* Primary Display Character */}
                <span
                  className={`font-bangla leading-tight select-none z-10 ${
                    isSpace
                      ? 'text-xs font-medium tracking-wide'
                      : isLetter
                      ? scale === 'compact'
                        ? 'text-sm font-semibold uppercase font-mono'
                        : 'text-base font-semibold uppercase font-mono'
                      : scale === 'compact'
                      ? 'text-sm font-semibold'
                      : 'text-base font-semibold'
                  }`}
                >
                  {displayChar}
                </span>

                {/* Sub-label for phonetic correspondence */}
                {showSubLabels && key.phonetic && !isSpace && mode === 'phonetic' && scale !== 'compact' && (
                  <span
                    className="text-[8.5px] font-bangla leading-none tracking-tighter opacity-65 mt-0.5 select-none z-10"
                    style={{ color: theme.keySubText }}
                  >
                    {key.phonetic}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
