import { useState } from "react";
import { Interval } from "../../types/CustomTimerInfo";
import ColorPicker from "./shared/ColorPicker";
import IntervalNameInput from "./shared/IntervalNameInput";
import IntervalTimeDisplay from "./shared/IntervalTimeDisplay";
import DurationPicker from "./shared/DurationPicker";

interface EditIntervalFormProps {
      interval: Interval; // The interval to edit
      onSave: (updatedInterval: Interval) => void; // Callback to save changes
      onClose: () => void; // Callback to close the form
}

const EditIntervalForm: React.FC<EditIntervalFormProps> = ({ interval, onSave, onClose }) => {
      const [name, setName] = useState(interval.name); // Name of the interval
      const [duration, setDuration] = useState(interval.duration); // Duration of the interval
      const [selectedColor, setSelectedColor] = useState(interval.color); // Selected color

      const [isClickedCancel, setIsClickedCancel] = useState(false);
      const [isClickedSave, setIsClickedSave] = useState(false);

      // Function to handle saving the updated interval
      const handleSave = (e: React.FormEvent) => {
            e.preventDefault(); //prevent reload

            // Validate that both the name and duration are provided
            if (!name.trim() || duration <= 0) {
                  return; // TODO: add error control animation
            }

            setIsClickedSave(true)
            setTimeout(() => {
                  setIsClickedSave(false)
            }, 300)


            // Create the new updated interval
            const updatedInterval = {
                  id: interval.id,
                  name: name.trim(), // Use the current name
                  duration: duration,
                  color: selectedColor, // Use the currently selected color
            };

            onSave(updatedInterval); // Pass the updated interval to the parent
            onClose(); // Close the form
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
                                    className="text-blackOlive dark:text-timberwolf h-12 w-12 mt-4 ml-4"
                              >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                              </svg>
                        </button>

                        <div className="container mx-auto px-5 pb-5">
                              <form onSubmit={handleSave}>
                                    <div className="grid grid-cols-12 lg:gap-5 gap-3 lg:auto-rows-[100px] auto-rows-[10vh]">
                                          {/* Title */}
                                          <div className="order-1 col-span-12 row-span-1 rounded-3xl content-center bg-floralWhite dark:bg-eerieBlack">
                                                <p className="text-4xl lg:text-5xl font-black text-blackOlive dark:text-timberwolf text-center">Edit interval</p>
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

                                          {/* Iterval show card */}
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
                                          <div className={`order-8 col-span-6 lg:col-span-4 row-span-1 bg-burntSienna rounded-3xl flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer 
                                                            ${isClickedCancel ? "scale-animation" : ""}`}
                                                onClick={handleCancel}
                                          >
                                                <p className="text-center text-blackOlive dark:text-eerieBlack text-4xl lg:text-5xl font-black">Cancel</p>
                                          </div>
                                          <button type="submit" className={`order-9 col-span-6 lg:col-span-4 row-span-1 bg-jade rounded-3xl flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer
                                                ${isClickedSave ? "scale-animation" : ""}`}>
                                                <p className="text-4xl lg:text-5xl text-floralWhite font-black">
                                                      Save
                                                </p>
                                          </button>

                                    </div>
                              </form>
                        </div>

                  </div>
                  {/* CSS for the scale animation */}
                  <style>
                        {`
        @keyframes clickScale {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.95);
          }
          75% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
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