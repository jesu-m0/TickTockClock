import { useState, useRef, useEffect } from "react";
import {
      STANDARD_SOUND_OPTIONS,
      FUN_SOUND_OPTIONS,
      SoundOption,
} from "../../../utils/soundNotification";
import { useTranslation } from "../../../i18n/useTranslation";
import { useClockStatus } from "../../../context/ClockContext";
import { useCheatMode } from "../../../hooks/useCheatMode";
import SoundOptionsGrid from "../../Settings/SoundOptionsGrid";

interface IntervalSoundPickerProps {
      selectedSound: string;
      onSoundChange: (soundKey: string) => void;
      variant?: "create" | "edit";
}

const ALL_SOUNDS: SoundOption[] = [...STANDARD_SOUND_OPTIONS, ...FUN_SOUND_OPTIONS];

const SpeakerIcon: React.FC<{ className?: string }> = ({ className }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={className}>
            <path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C478.5 334.5 496 297.1 496 256s-17.5-78.5-53.2-112.2c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C559.6 398.5 592 332.1 592 256s-32.4-142.5-88.7-186.2c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z" />
      </svg>
);

const Chevron: React.FC<{ className: string }> = ({ className }) => (
      <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
      >
            <path d="M6 9l6 6 6-6" />
      </svg>
);

const IntervalSoundPicker: React.FC<IntervalSoundPickerProps> = ({
      selectedSound,
      onSoundChange,
      variant = "create",
}) => {
      const { t } = useTranslation();
      const { simpleTimerConfig } = useClockStatus();
      const cheatMode = useCheatMode(simpleTimerConfig.restLapDuration);

      const [isOpen, setIsOpen] = useState(false);
      const containerRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
            if (!isOpen) return;
            const handleClickOutside = (e: MouseEvent) => {
                  if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                        setIsOpen(false);
                  }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
      }, [isOpen]);

      const containerBg = variant === "create"
            ? "bg-surface dark:bg-baseClr"
            : "bg-surface dark:bg-surfaceDark";
      const chipBgClass = variant === "create"
            ? "bg-baseClr/10 dark:bg-surfaceDark"
            : "bg-baseClr/10 dark:bg-baseClr";

      const currentSound =
            ALL_SOUNDS.find((s) => s.value === selectedSound) || STANDARD_SOUND_OPTIONS[0];
      const currentLabel = currentSound.translationKey
            ? (t[currentSound.translationKey as keyof typeof t] as string) || currentSound.label
            : currentSound.label;

      return (
            <div
                  ref={containerRef}
                  className={`order-6 col-span-12 row-span-1 lg:col-span-1 lg:row-span-2 lg:col-start-1 lg:row-start-3 rounded-3xl ${containerBg} relative`}
            >
                  <div
                        className="h-full w-full cursor-pointer select-none"
                        onClick={() => setIsOpen(!isOpen)}
                  >
                        {/* Mobile: horizontal pill — icon + label + chevron in one row. */}
                        <div className="lg:hidden h-full flex items-center justify-between px-4 gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                          <span className="text-2xl text-baseClr dark:text-muted">
                                                {currentSound.icon}
                                          </span>
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                          <p className="text-baseClr/60 dark:text-muted/60 text-xs font-bold uppercase tracking-wider truncate">
                                                {t.intervalSound}
                                          </p>
                                          <p className="text-baseClr dark:text-muted text-lg font-extrabold truncate">
                                                {currentLabel}
                                          </p>
                                    </div>
                              </div>
                              <Chevron
                                    className={`w-6 h-6 text-baseClr dark:text-muted flex-shrink-0 transition-transform duration-300 ease-in-out ${
                                          isOpen ? "-rotate-180" : "rotate-0"
                                    }`}
                              />
                        </div>

                        {/*
                         * Desktop: vertical 1×2 pill split into two clearly-distinct halves.
                         *   Top    — header (speaker icon on a tinted surface, signals "this card is about sound")
                         *   Bottom — selection (large icon of the currently chosen sound + chevron)
                         * The bg shift + divider + size hierarchy make the role of each half unambiguous.
                         */}
                        <div className="hidden lg:flex flex-col h-full overflow-hidden rounded-3xl">
                              <div className="flex-1 flex items-center justify-center bg-primary/10 border-b border-primary/20">
                                    <SpeakerIcon className="w-6 h-6 xl:w-7 xl:h-7 fill-primary" />
                              </div>
                              <div className="flex-1 flex flex-col items-center justify-center gap-1.5">
                                    <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                          <span className="text-2xl xl:text-3xl text-baseClr dark:text-muted">
                                                {currentSound.icon}
                                          </span>
                                    </div>
                                    <Chevron
                                          className={`w-4 h-4 text-baseClr/60 dark:text-muted/60 transition-transform duration-300 ease-in-out ${
                                                isOpen ? "-rotate-180" : "rotate-0"
                                          }`}
                                    />
                              </div>
                        </div>
                  </div>

                  {/*
                   * Sound options panel.
                   * Mobile: full-width below the picker.
                   * Desktop: fixed-width panel anchored to the LEFT edge of the picker
                   * so it extends rightward over the duration buttons (the picker is
                   * one column wide and can't host the chip grid on its own).
                   */}
                  <div
                        className={`absolute top-full mt-2 z-50 ${containerBg} rounded-2xl shadow-lg p-3 lg:p-4 transform transition-all duration-300 ease-in-out
                              left-0 right-0
                              lg:right-auto lg:w-80
                              ${isOpen
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-2 pointer-events-none"
                              }`}
                  >
                        <SoundOptionsGrid
                              value={selectedSound}
                              options={STANDARD_SOUND_OPTIONS}
                              funOptions={FUN_SOUND_OPTIONS}
                              cheatMode={cheatMode}
                              onChange={onSoundChange}
                              chipBgClass={chipBgClass}
                        />
                  </div>
            </div>
      );
};

export default IntervalSoundPicker;
