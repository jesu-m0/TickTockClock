import { useEffect, useState } from "react";
import { useClockStatus } from "../../context/ClockContext";
import { Colors } from "../../types";
import { v4 as uuidv4 } from "uuid";
import ColorPicker from "./shared/ColorPicker";
import IntervalNameInput from "./shared/IntervalNameInput";
import IntervalTimeDisplay from "./shared/IntervalTimeDisplay";
import DurationPicker from "./shared/DurationPicker";
import { useTranslation } from "../../i18n/useTranslation";


interface CreateIntervalFormProps {
      setIsFormExpanded: React.Dispatch<React.SetStateAction<boolean>>;
      setShowFormContent: React.Dispatch<React.SetStateAction<boolean>>;
      setShowAddLetters: React.Dispatch<React.SetStateAction<boolean>>;
      setDivFormExist: React.Dispatch<React.SetStateAction<boolean>>;
      openFormAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateIntervalForm: React.FC<CreateIntervalFormProps> = ({
      setIsFormExpanded,
      setShowFormContent,
      setShowAddLetters,
      setDivFormExist,
      openFormAnimation,
}) => {
      const { setCustomTimerConfig } = useClockStatus();
      const { t } = useTranslation();
      const [id, setId] = useState(uuidv4());
      const [name, setName] = useState("");
      const [duration, setDuration] = useState(0);
      const [selectedColor, setSelectedColor] = useState(
            Object.values(Colors)[Math.floor(Math.random() * Object.values(Colors).length)]
      );

      const getDefaultName = (color?: string) => {
            const targetColor = color || selectedColor;
            const colorKey = Object.keys(Colors).find((key) => Colors[key as keyof typeof Colors] === targetColor);

            const addSpacesBeforeCapitals = (str: string): string => {
                  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
            };

            return colorKey ? addSpacesBeforeCapitals(colorKey) : t.intervalName;
      };

      useEffect(() => {
            setName(getDefaultName());
      }, []);

      const closeForm = () => {
            openFormAnimation(false);
            setShowFormContent(false);
            setTimeout(() => setIsFormExpanded(false), 200);
            setTimeout(() => setDivFormExist(false), 900);
            setTimeout(() => setShowAddLetters(true), 1000);
      };

      const [isClickedCancel, setIsClickedCancel] = useState(false);

      const handleCancel = () => {
            setIsClickedCancel(true);
            setId(uuidv4());
            setDuration(0);
            const randomColor = Object.values(Colors)[Math.floor(Math.random() * Object.values(Colors).length)];
            setSelectedColor(randomColor);
            setName(getDefaultName(randomColor));
            closeForm();
            setTimeout(() => setIsClickedCancel(false), 200);
      };

      const [isClickedAdd, setIsClickedAdd] = useState(false);

      const handleAdd = (e: React.FormEvent) => {
            e.preventDefault();
            if (!name.trim() || duration <= 0) {
                  return;
            }

            setIsClickedAdd(true);
            setTimeout(() => {
                  setIsClickedAdd(false)
            }, 300)

            const newInterval = {
                  id: id,
                  name: name.trim(),
                  duration: duration,
                  color: selectedColor,
            };

            setCustomTimerConfig(prev => ({
                  ...prev,
                  intervals: [...prev.intervals, newInterval],
            }));

            setId(uuidv4());
            setDuration(0);
            const randomColor = Object.values(Colors)[Math.floor(Math.random() * Object.values(Colors).length)];
            setSelectedColor(randomColor);
            setName(getDefaultName(randomColor));
            closeForm();
      };

      return (
            <>
                  <div className="h-full w-full overflow-y-auto">
                        <button onClick={closeForm}>
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="text-surface dark:text-baseClr h-12 w-12 mt-4 ml-4"
                              >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                              </svg>
                        </button>
                        <div className="container mx-auto pb-5 px-5">
                              <form onSubmit={handleAdd}>
                                    <div className="grid grid-cols-12 lg:gap-5 gap-3 lg:auto-rows-[100px] auto-rows-[10vh]">
                                          {/* Title */}
                                          <div className="order-1 col-span-12 row-span-1 rounded-3xl content-center bg-surface dark:bg-baseClr">
                                                <p className="text-3xl lg:text-5xl font-black text-baseClr dark:text-muted text-center">{t.createInterval}</p>
                                          </div>

                                          {/* Color Picker Section */}
                                          <ColorPicker
                                                selectedColor={selectedColor}
                                                onColorChange={setSelectedColor}
                                                variant="create"
                                          />

                                          {/* Interval Name Label */}
                                          <IntervalNameInput
                                                name={name}
                                                onNameChange={setName}
                                                variant="create"
                                          />

                                          {/* Interval show card */}
                                          <IntervalTimeDisplay
                                                duration={duration}
                                                variant="create"
                                          />

                                          {/* Duration picker */}
                                          <DurationPicker
                                                duration={duration}
                                                onDurationChange={setDuration}
                                          />

                                          {/* Cancel and add */}
                                          <div
                                                className={`order-8 col-span-6 lg:col-span-4 row-span-1 bg-secondary rounded-3xl flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer
                                                            ${isClickedCancel ? "scale-animation" : ""}`}
                                                onClick={handleCancel}
                                          >
                                                <p className="text-center text-surface dark:text-muted text-4xl lg:text-5xl font-black">{t.cancel}</p>
                                          </div>
                                          <button type="submit" className={`order-9 col-span-6 lg:col-span-4 row-span-1 bg-surface dark:bg-muted rounded-3xl flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer
                                                ${isClickedAdd ? "scale-animation" : ""}`}>
                                                <p className=" text-4xl lg:text-5xl text-baseClr font-black">
                                                      {t.add}
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

export default CreateIntervalForm;
