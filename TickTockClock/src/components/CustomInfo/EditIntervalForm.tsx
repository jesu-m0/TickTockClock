import { useState } from "react";
import { Interval } from "../../types/CustomTimerInfo";
import ColorPicker from "./shared/ColorPicker";
import IntervalNameInput from "./shared/IntervalNameInput";
import IntervalTimeDisplay from "./shared/IntervalTimeDisplay";
import DurationPicker from "./shared/DurationPicker";
import { useTranslation } from "../../i18n/useTranslation";

interface EditIntervalFormProps {
      interval: Interval;
      onSave: (updatedInterval: Interval) => void;
      onClose: () => void;
}

const EditIntervalForm: React.FC<EditIntervalFormProps> = ({ interval, onSave, onClose }) => {
      const { t } = useTranslation();
      const [name, setName] = useState(interval.name);
      const [duration, setDuration] = useState(interval.duration);
      const [selectedColor, setSelectedColor] = useState(interval.color);

      const [isClickedCancel, setIsClickedCancel] = useState(false);
      const [isClickedSave, setIsClickedSave] = useState(false);

      const handleSave = (e: React.FormEvent) => {
            e.preventDefault();
            if (!name.trim() || duration <= 0) {
                  return;
            }

            setIsClickedSave(true)
            setTimeout(() => {
                  setIsClickedSave(false)
            }, 300)

            const updatedInterval = {
                  id: interval.id,
                  name: name.trim(),
                  duration: duration,
                  color: selectedColor,
            };

            onSave(updatedInterval);
            onClose();
      };

      const handleCancel = () => {
            setIsClickedCancel(true)
            setTimeout(() => {
                  setIsClickedCancel(false)
            }, 300)
            onClose();
      }

      return (
            <>
                  <div className="h-full w-full overflow-y-auto">
                        <button onClick={onClose}>
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="text-baseClr dark:text-muted h-12 w-12 mt-4 ml-4"
                              >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                              </svg>
                        </button>

                        <div className="container mx-auto px-5 pb-5">
                              <form onSubmit={handleSave}>
                                    <div className="grid grid-cols-12 lg:gap-5 gap-3 lg:auto-rows-[100px] auto-rows-[10vh]">
                                          {/* Title */}
                                          <div className="order-1 col-span-12 row-span-1 rounded-3xl content-center bg-surface dark:bg-surfaceDark">
                                                <p className="text-4xl lg:text-5xl font-black text-baseClr dark:text-muted text-center">{t.editInterval}</p>
                                          </div>

                                          {/* Color Picker Section */}
                                          <ColorPicker
                                                selectedColor={selectedColor}
                                                onColorChange={setSelectedColor}
                                                variant="edit"
                                          />

                                          {/* Interval Name Label */}
                                          <IntervalNameInput
                                                name={name}
                                                onNameChange={setName}
                                                variant="edit"
                                          />

                                          {/* Interval show card */}
                                          <IntervalTimeDisplay
                                                duration={duration}
                                                variant="edit"
                                          />

                                          {/* Duration picker */}
                                          <DurationPicker
                                                duration={duration}
                                                onDurationChange={setDuration}
                                          />

                                          {/* Cancel and Save */}
                                          <div className={`order-8 col-span-6 lg:col-span-4 row-span-1 bg-secondary rounded-3xl flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer
                                                            ${isClickedCancel ? "scale-animation" : ""}`}
                                                onClick={handleCancel}
                                          >
                                                <p className="text-center text-baseClr dark:text-surfaceDark text-4xl lg:text-5xl font-black">{t.cancel}</p>
                                          </div>
                                          <button type="submit" className={`order-9 col-span-6 lg:col-span-4 row-span-1 bg-primary rounded-3xl flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer
                                                ${isClickedSave ? "scale-animation" : ""}`}>
                                                <p className="text-4xl lg:text-5xl text-surface font-black">
                                                      {t.save}
                                                </p>
                                          </button>

                                    </div>
                              </form>
                        </div>

                  </div>
                  <style>
                        {`
        @keyframes clickScale {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          75% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .scale-animation {
          animation: clickScale 300ms ease-out;
        }
      `}
                  </style>
            </>
      );
};

export default EditIntervalForm;