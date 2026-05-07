import React, { useState, useRef, useCallback, useEffect } from 'react';
import { previewSound } from '../../utils/soundNotification';

interface SoundOption {
  value: string;
  label: string;
  icon: string;
}

interface SoundPickerProps {
  label: string;
  value: string;
  options: SoundOption[];
  funOptions: SoundOption[];
  cheatMode: boolean;
  onChange: (value: string) => void;
}

type CheatAnimation = 'rainbow-spin' | 'glitch' | 'bounce-crazy' | 'neon-flicker' | 'rotate-3d';
const CHEAT_ANIMATIONS: CheatAnimation[] = ['rainbow-spin', 'glitch', 'bounce-crazy', 'neon-flicker', 'rotate-3d'];

const HOVER_DURATION = 1500;

const SoundPicker: React.FC<SoundPickerProps> = ({ label, value, options, funOptions, cheatMode, onChange }) => {
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
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / HOVER_DURATION, 1);
      setLoadingProgress(progress);
      if (progress >= 1 && !hasPlayedRef.current) {
        hasPlayedRef.current = true;
        previewSound(key);
      }
    }, 30);
    hoverTimerRef.current = setTimeout(() => {
      if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
    }, HOVER_DURATION + 100);
  }, [clearHoverTimers, cheatMode]);

  const handleMouseLeave = useCallback(() => {
    clearHoverTimers();
    setHoveredKey(null);
  }, [clearHoverTimers]);

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

  const LoadingOverlay: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
    <>
      {isHovered && (
        <div
          className={`absolute inset-0 pointer-events-none ${cheatMode ? 'bg-gradient-to-r from-primary/30 via-secondary/30 to-tertiary/30' : 'bg-primary/15'}`}
          style={{ clipPath: `inset(0 ${(1 - loadingProgress) * 100}% 0 0)`, transition: 'clip-path 30ms linear' }}
        />
      )}
      {isHovered && loadingProgress >= 1 && (
        <div className={`absolute inset-0 rounded-full pointer-events-none ${cheatMode ? 'ring-2 ring-inset ring-secondary animate-pulse' : 'ring-2 ring-inset ring-primary/50'}`} />
      )}
    </>
  );

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <p className="font-bold text-baseClr dark:text-muted text-sm lg:text-base">{label}</p>

      {cheatMode && (
        <div className="flex rounded-2xl overflow-hidden">
          {(['standard', 'fun'] as const).map(tab => (
            <div key={tab} onClick={() => setActiveTab(tab)}
              className="w-1/2 rounded-2xl bg-baseClr/10 dark:bg-baseClr cursor-pointer flex flex-col overflow-hidden">
              <div className="px-3 py-2 flex items-center justify-center">
                <p className="font-extrabold dark:text-muted text-baseClr text-sm lg:text-base text-center transition-colors duration-300">
                  {tab === 'standard' ? 'Standard' : '4:20'}
                </p>
              </div>
              <div className="w-full h-1.5">
                <div className={`h-full w-full rounded-b-2xl transition-colors duration-300
                  ${activeTab === tab ? 'bg-primary' : 'bg-transparent'}`} />
              </div>
            </div>
          ))}
        </div>
      )}

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
              <LoadingOverlay isHovered={isHovered} />
              <span className="text-xs z-10">{opt.icon}</span>
              <span className="text-[11px] font-semibold text-baseClr dark:text-muted z-10">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SoundPicker;
