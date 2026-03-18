import { useState, useCallback, useRef } from "react";

interface DurationPickerProps {
      duration: number;
      onDurationChange: (seconds: number) => void;
}

const DurationPicker: React.FC<DurationPickerProps> = ({
      duration,
      onDurationChange
}) => {
      const [animatingId, setAnimatingId] = useState<string | null>(null);
      const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

      const handleIntervalDuration = useCallback((seconds: number, buttonId: string) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setAnimatingId(buttonId);
            timeoutRef.current = setTimeout(() => setAnimatingId(null), 300);

            const newDuration = Math.max(0, duration + seconds);
            onDurationChange(newDuration);
      }, [duration, onDurationChange]);

      const btnBase = "bg-surface dark:bg-baseClr rounded-md h-full flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer";
      const textBase = "text-baseClr dark:text-muted font-black text-lg lg:text-2xl xl:text-3xl";

      const buttons = [
            { id: "intervalUp5s", seconds: 5, label: "+5''", flex: "flex-1", corner: "rounded-tl-3xl" },
            { id: "intervalUp30s", seconds: 30, label: "+30''", flex: "flex-[1.3]", corner: "" },
            { id: "intervalUp5m", seconds: 300, label: "+5'", flex: "flex-[1.5]", corner: "" },
            { id: "intervalUp30m", seconds: 1800, label: "+30'", flex: "flex-[1.8]", corner: "rounded-tr-3xl" },
      ];

      const downButtons = [
            { id: "intervalDown5s", seconds: -5, label: "-5''", flex: "flex-1", corner: "rounded-bl-3xl" },
            { id: "intervalDown30s", seconds: -30, label: "-30''", flex: "flex-[1.3]", corner: "" },
            { id: "intervalDown5m", seconds: -300, label: "-5'", flex: "flex-[1.5]", corner: "" },
            { id: "intervalDown30m", seconds: -1800, label: "-30'", flex: "flex-[1.8]", corner: "rounded-br-3xl" },
      ];

      return (
            <div className="order-5 col-span-12 lg:col-span-8 row-span-2 bg-primary rounded-3xl flex flex-col items-center justify-center overflow-hidden p-3">
                  <div className="flex flex-row gap-1 w-full flex-1">
                        {buttons.map(btn => (
                              <div
                                    key={btn.id}
                                    onClick={() => handleIntervalDuration(btn.seconds, btn.id)}
                                    className={`${btnBase} ${btn.flex} ${btn.corner} ${animatingId === btn.id ? "scale-animation" : ""}`}
                              >
                                    <p className={textBase}>{btn.label}</p>
                              </div>
                        ))}
                  </div>
                  <div className="w-full h-1 bg-primary"></div>
                  <div className="flex flex-row gap-1 w-full flex-1">
                        {downButtons.map(btn => (
                              <div
                                    key={btn.id}
                                    onClick={() => handleIntervalDuration(btn.seconds, btn.id)}
                                    className={`${btnBase} ${btn.flex} ${btn.corner} ${animatingId === btn.id ? "scale-animation" : ""}`}
                              >
                                    <p className={textBase}>{btn.label}</p>
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default DurationPicker;
