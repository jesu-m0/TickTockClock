import React, { useState, useRef, useCallback, useEffect } from 'react';
import { previewSound } from '../../utils/soundNotification';

interface SoundOption {
  value: string;
  label: string;
  icon: string;
}

export type SoundPickerVariant = 1 | 2 | 3;

interface SoundPickerProps {
  label: string;
  value: string;
  options: SoundOption[];
  funOptions: SoundOption[];
  cheatMode: boolean;
  variant: SoundPickerVariant;
  onChange: (value: string) => void;
}

type CheatAnimation = 'rainbow-spin' | 'glitch' | 'bounce-crazy' | 'neon-flicker' | 'rotate-3d';
const CHEAT_ANIMATIONS: CheatAnimation[] = ['rainbow-spin', 'glitch', 'bounce-crazy', 'neon-flicker', 'rotate-3d'];

const SoundPicker: React.FC<SoundPickerProps> = ({ label, value, options, funOptions, cheatMode, variant, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'standard' | 'fun'>(() => {
    return funOptions.some(o => o.value === value) ? 'fun' : 'standard';
  });
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [cheatAnim, setCheatAnim] = useState<CheatAnimation>('rainbow-spin');
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (!cheatMode) setActiveTab('standard');
  }, [cheatMode]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearHoverTimers = useCallback(() => {
    if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; }
    if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
    setLoadingProgress(0);
    hasPlayedRef.current = false;
  }, []);

  useEffect(() => { return clearHoverTimers; }, [clearHoverTimers]);

  const handleMouseEnter = useCallback((key: string) => {
    clearHoverTimers();
    setHoveredKey(key);
    hasPlayedRef.current = false;
    if (cheatMode) {
      setCheatAnim(CHEAT_ANIMATIONS[Math.floor(Math.random() * CHEAT_ANIMATIONS.length)]);
    }
    const startTime = Date.now();
    const DURATION = 3000;
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      setLoadingProgress(progress);
      if (progress >= 1 && !hasPlayedRef.current) {
        hasPlayedRef.current = true;
        previewSound(key);
      }
    }, 30);
    hoverTimerRef.current = setTimeout(() => {
      if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
    }, DURATION + 100);
  }, [clearHoverTimers, cheatMode]);

  const handleMouseLeave = useCallback(() => {
    clearHoverTimers();
    setHoveredKey(null);
  }, [clearHoverTimers]);

  const handleSelect = useCallback((key: string) => {
    clearHoverTimers();
    setHoveredKey(null);
    onChange(key);
    previewSound(key);
    setIsOpen(false);
  }, [clearHoverTimers, onChange]);

  const allOptions = [...options, ...funOptions];
  const selectedLabel = allOptions.find(o => o.value === value)?.label ?? value;
  const selectedIcon = allOptions.find(o => o.value === value)?.icon ?? '♪';
  const currentOptions = activeTab === 'standard' ? options : funOptions;

  const getCheatAnimStyle = (progress: number): React.CSSProperties => {
    switch (cheatAnim) {
      case 'rainbow-spin': {
        const hue = progress * 720;
        return { filter: `hue-rotate(${hue}deg) brightness(${1 + progress * 0.5})`, transform: `rotate(${progress * 15}deg) scale(${1 + progress * 0.1})` };
      }
      case 'glitch': {
        const offset = Math.sin(progress * 30) * 3;
        return { transform: `translate(${offset}px, ${offset * 0.5}px) scale(${1 + progress * 0.05})`, filter: `brightness(${1 + Math.sin(progress * 20) * 0.3})` };
      }
      case 'bounce-crazy':
        return { transform: `scale(${1 + Math.sin(progress * Math.PI * 4) * 0.15})`, filter: `brightness(${1 + progress * 0.4})` };
      case 'neon-flicker': {
        const flicker = Math.random() > 0.3 ? 1 : 0.6;
        return { filter: `brightness(${progress > 0.1 ? flicker + progress * 0.5 : 1})`, transform: `scale(${1 + progress * 0.05})` };
      }
      case 'rotate-3d':
        return { transform: `perspective(300px) rotateY(${progress * 25}deg) scale(${1 + progress * 0.05})`, filter: `brightness(${1 + progress * 0.3})` };
      default: return {};
    }
  };

  const LoadingOverlay: React.FC<{ isHovered: boolean; rounded?: string }> = ({ isHovered, rounded = 'rounded-lg' }) => (
    <>
      {isHovered && (
        <div
          className={`absolute inset-0 pointer-events-none ${cheatMode ? 'bg-gradient-to-r from-primary/30 via-secondary/30 to-tertiary/30' : 'bg-primary/15'}`}
          style={{ clipPath: `inset(0 ${(1 - loadingProgress) * 100}% 0 0)`, transition: 'clip-path 30ms linear' }}
        />
      )}
      {isHovered && loadingProgress >= 1 && (
        <div className={`absolute inset-0 ${rounded} pointer-events-none ${cheatMode ? 'ring-2 ring-inset ring-secondary animate-pulse' : 'ring-2 ring-inset ring-primary/50'}`} />
      )}
    </>
  );

  const Tabs = () => cheatMode ? (
    <div className="flex rounded-lg overflow-hidden bg-baseClr/10 dark:bg-surfaceDark mb-2">
      {(['standard', 'fun'] as const).map(tab => (
        <button key={tab} type="button" onClick={() => setActiveTab(tab)}
          className={`flex-1 py-1.5 text-xs font-semibold transition-colors duration-200 cursor-pointer
            ${activeTab === tab ? 'bg-primary/20 text-primary' : 'text-baseClr dark:text-muted hover:bg-baseClr/5 dark:hover:bg-surfaceDark/50'}`}
        >{tab === 'standard' ? 'Standard' : '4:20'}</button>
      ))}
    </div>
  ) : null;

  const Trigger = () => (
    <button type="button" onClick={() => setIsOpen(!isOpen)}
      className="w-full flex items-center justify-between rounded-xl px-4 py-2.5
        bg-baseClr/10 dark:bg-baseClr text-baseClr dark:text-muted
        font-semibold text-sm lg:text-base cursor-pointer transition-colors duration-200
        hover:bg-baseClr/15 dark:hover:bg-baseClr/80">
      <span className="flex items-center gap-2">
        <span className="text-base">{selectedIcon}</span>
        <span>{selectedLabel}</span>
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
        className={`w-3.5 h-3.5 fill-base/50 dark:fill-muted/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
      </svg>
    </button>
  );

  const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={`absolute z-50 mt-2 right-0 w-[260px] rounded-2xl p-3
      bg-surface dark:bg-baseClr shadow-lg border border-baseClr/10 dark:border-muted/10
      transform transition-all duration-300 ease-in-out
      ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
      <Tabs />
      {children}
    </div>
  );

  // ═══════════════════════════════════════════
  // VARIANT 1 — Compact grid (3 cols)
  // ═══════════════════════════════════════════
  const renderVariant1 = () => (
    <Panel>
      <div className="grid grid-cols-3 gap-1.5">
        {currentOptions.map((opt) => {
          const isSelected = opt.value === value;
          const isHovered = hoveredKey === opt.value;
          const isDimmed = hoveredKey !== null && !isHovered;
          return (
            <button key={opt.value} type="button"
              onMouseEnter={() => handleMouseEnter(opt.value)} onMouseLeave={handleMouseLeave}
              onClick={() => handleSelect(opt.value)}
              className={`relative aspect-square rounded-lg flex flex-col items-center justify-center
                overflow-hidden cursor-pointer select-none transition-all duration-300 ease-out
                ${isSelected ? 'ring-2 ring-primary bg-primary/20' : 'bg-baseClr/8 dark:bg-surfaceDark'}
                ${isDimmed ? 'opacity-30 scale-95' : ''} ${isHovered && !cheatMode ? 'scale-105' : ''}`}
              style={isHovered && cheatMode ? getCheatAnimStyle(loadingProgress) : undefined}>
              <LoadingOverlay isHovered={isHovered} />
              <span className="text-base z-10 leading-none">{opt.icon}</span>
              <span className="text-[9px] font-medium text-baseClr/70 dark:text-muted/70 z-10 text-center leading-tight mt-1">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </Panel>
  );

  // ═══════════════════════════════════════════
  // VARIANT 2 — Inline chips (no dropdown)
  // ═══════════════════════════════════════════
  const renderVariant2 = () => (
    <>
      {cheatMode && <Tabs />}
      <div className="flex gap-1.5 flex-wrap">
        {currentOptions.map((opt) => {
          const isSelected = opt.value === value;
          const isHovered = hoveredKey === opt.value;
          const isDimmed = hoveredKey !== null && !isHovered;
          return (
            <button key={opt.value} type="button"
              onMouseEnter={() => handleMouseEnter(opt.value)} onMouseLeave={handleMouseLeave}
              onClick={() => { clearHoverTimers(); setHoveredKey(null); onChange(opt.value); previewSound(opt.value); }}
              className={`relative flex items-center gap-1 px-2.5 py-1.5 rounded-full
                overflow-hidden cursor-pointer select-none transition-all duration-300 ease-out
                ${isSelected ? 'bg-primary/20 ring-1 ring-primary' : 'bg-baseClr/10 dark:bg-baseClr'}
                ${isDimmed ? 'opacity-30 scale-95' : ''} ${isHovered && !cheatMode ? 'scale-105' : ''}`}
              style={isHovered && cheatMode ? getCheatAnimStyle(loadingProgress) : undefined}>
              <LoadingOverlay isHovered={isHovered} rounded="rounded-full" />
              <span className="text-xs z-10">{opt.icon}</span>
              <span className="text-[11px] font-semibold text-baseClr dark:text-muted z-10">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );

  // ═══════════════════════════════════════════
  // VARIANT 3 — Compact vertical list
  // ═══════════════════════════════════════════
  const renderVariant3 = () => (
    <Panel>
      <div className="flex flex-col gap-0.5">
        {currentOptions.map((opt) => {
          const isSelected = opt.value === value;
          const isHovered = hoveredKey === opt.value;
          const isDimmed = hoveredKey !== null && !isHovered;
          return (
            <button key={opt.value} type="button"
              onMouseEnter={() => handleMouseEnter(opt.value)} onMouseLeave={handleMouseLeave}
              onClick={() => handleSelect(opt.value)}
              className={`relative flex items-center gap-2.5 px-2.5 py-2 rounded-xl
                overflow-hidden cursor-pointer select-none transition-all duration-300 ease-out
                ${isSelected ? 'bg-primary/15 ring-1 ring-primary' : 'bg-baseClr/5 dark:bg-surfaceDark hover:bg-baseClr/10 dark:hover:bg-surfaceDark/80'}
                ${isDimmed ? 'opacity-30' : ''}`}
              style={isHovered && cheatMode ? getCheatAnimStyle(loadingProgress) : undefined}>
              <LoadingOverlay isHovered={isHovered} rounded="rounded-xl" />
              <span className="w-7 h-7 rounded-md bg-baseClr/10 dark:bg-baseClr/30 flex items-center justify-center text-sm z-10 shrink-0">{opt.icon}</span>
              <span className="text-xs font-semibold text-baseClr dark:text-muted z-10 flex-1 text-left">{opt.label}</span>
              {isSelected && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-3 h-3 fill-primary z-10 shrink-0">
                  <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </Panel>
  );

  if (variant === 2) {
    return (
      <div className="flex flex-col gap-2" ref={containerRef}>
        <p className="font-bold text-baseClr dark:text-muted text-sm lg:text-base">{label}</p>
        {renderVariant2()}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-baseClr dark:text-muted text-sm lg:text-base">{label}</p>
      <div className="relative" ref={containerRef}>
        <Trigger />
        {variant === 1 && renderVariant1()}
        {variant === 3 && renderVariant3()}
      </div>
    </div>
  );
};

export default SoundPicker;
