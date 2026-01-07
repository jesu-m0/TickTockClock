import { useEffect, useState } from "react";
import { useClockStatus } from "../../context/ClockContext";
import { Colors } from "../../types";
import { v4 as uuidv4 } from "uuid";
import ColorPicker from "./shared/ColorPicker";
import IntervalNameInput from "./shared/IntervalNameInput";
import IntervalTimeDisplay from "./shared/IntervalTimeDisplay";
import DurationPicker from "./shared/DurationPicker";


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
      const { customTimerInfo, setCustomTimerInfo } = useClockStatus();
      const [id, setId] = useState(uuidv4());
      const [name, setName] = useState(""); // Custom name for the interval
      const [duration, setDuration] = useState(0);
      const [selectedColor, setSelectedColor] = useState(
            Object.values(Colors)[Math.floor(Math.random() * Object.values(Colors).length)]
      ); // Random color by default

      // Function to get the default name based on the selected color
      const getDefaultName = (color?: string) => {
            // Use the provided color or fall back to the selectedColor state
            const targetColor = color || selectedColor;
            const colorKey = Object.keys(Colors).find((key) => Colors[key as keyof typeof Colors] === targetColor);

            const addSpacesBeforeCapitals = (str: string): string => {
                  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
            };

            return colorKey ? addSpacesBeforeCapitals(colorKey) : "Interval name";
      };

      // Set the default name based on the randomly selected color on mount
      useEffect(() => {
            setName(getDefaultName());
      }, []); // Run only once on mount

      // Function to close the form with animations
      const closeForm = () => {
            openFormAnimation(false); // Trigger animation to close the form
            setShowFormContent(false); // Hide content 200ms
            setTimeout(() => setIsFormExpanded(false), 200); // Unexpand the form 700ms
            setTimeout(() => setDivFormExist(false), 900); // Remove the div entirely 100ms
            setTimeout(() => setShowAddLetters(true), 1000); // Show "Add" letters 200ms
      };

      const [isClickedCancel, setIsClickedCancel] = useState(false);

      // Function to handle cancel logic
      const handleCancel = () => {
            // Trigger the bounce animation
            setIsClickedCancel(true);

            //updateId
            setId(uuidv4());

            // Reset form fields to their default states
            setDuration(0); // Clear the duration
            const randomColor = Object.values(Colors)[Math.floor(Math.random() * Object.values(Colors).length)];
            setSelectedColor(randomColor);
            setName(getDefaultName(randomColor));

            // Close the modal using the same logic as the cross button
            closeForm();

            // Reset the animation state after the animation completes
            setTimeout(() => setIsClickedCancel(false), 200); // Match the animation duration
      };

      const [isClickedAdd, setIsClickedAdd] = useState(false);

      // Function to handle the "Add" button click
      const handleAdd = (e: React.FormEvent) => {
            e.preventDefault(); //prevent reload
            // Validate that both the name and duration are provided
            if (!name.trim() || duration <= 0) {
                  return; // TODO: add error control animation
            }

            setIsClickedAdd(true);
            setTimeout(() => {
                  setIsClickedAdd(false)
            }, 300)

            // Create the new interval object
            const newInterval = {
                  id: id,
                  name: name.trim(), // Use the current name
                  duration: duration,
                  color: selectedColor, // Use the currently selected color
            };

            // Update the customTimerInfo state with the new interval
            setCustomTimerInfo({
                  ...customTimerInfo,
                  intervals: [...customTimerInfo.intervals, newInterval],
            });

            // Reset form fields to their default states
            setId(uuidv4()); // new Id
            setDuration(0); // Clear the duration
            const randomColor = Object.values(Colors)[Math.floor(Math.random() * Object.values(Colors).length)];
            setSelectedColor(randomColor);
            setName(getDefaultName(randomColor));

            // Close the modal using the same logic as the cancel or cross button
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
                                    className="text-floralWhite dark:text-blackOlive h-12 w-12 mt-4 ml-4"
                              >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                              </svg>
                        </button>
                        <div className="container mx-auto pb-5 px-5">
                              <form onSubmit={handleAdd}>
                                    <div className="grid grid-cols-12 lg:gap-5 gap-3 lg:auto-rows-[100px] auto-rows-[10vh]">
                                          {/* Title */}
                                          <div className="order-1 col-span-12 row-span-1 rounded-3xl content-center bg-floralWhite dark:bg-blackOlive">
                                                <p className="text-3xl lg:text-5xl font-black text-blackOlive dark:text-timberwolf text-center">Create interval</p>
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

                                          {/* Iterval show card */}
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
                                                className={`order-8 col-span-6 lg:col-span-4 row-span-1 bg-burntSienna rounded-3xl flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer 
                                                            ${isClickedCancel ? "scale-animation" : ""}`}
                                                onClick={handleCancel}
                                          >
                                                <p className="text-center text-floralWhite dark:text-timberwolf text-4xl lg:text-5xl font-black">Cancel</p>
                                          </div>
                                          <button type="submit" className={`order-9 col-span-6 lg:col-span-4 row-span-1 bg-floralWhite dark:bg-timberwolf rounded-3xl flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer
                                                ${isClickedAdd ? "scale-animation" : ""}`}>
                                                <p className=" text-4xl lg:text-5xl text-blackOlive font-black">
                                                      Add
                                                </p>
                                          </button>
                                    </div>
                              </form>
                        </div>
                  </div>
                  {/* CSS for the bounce animation */}
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

export default CreateIntervalForm;


