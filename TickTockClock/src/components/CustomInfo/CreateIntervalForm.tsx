import { useState } from "react";
import { useClockStatus } from "../../context/ClockContext";
import { Colors } from "../../types";

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
      const [name, setName] = useState(""); // Custom name for the interval
      const [duration, setDuration] = useState("");
      const [selectedColor, setSelectedColor] = useState<string>(Colors.BurntSienna); // Default color
      const [isColorPickerOpen, setIsColorPickerOpen] = useState(false); // Track color picker visibility

      // Function to get the default name based on the selected color
      const getDefaultName = () => {
            const colorKey = Object.keys(Colors).find((key) => Colors[key] === selectedColor);

            // Helper function to add spaces before capital letters
            const addSpacesBeforeCapitals = (str: string): string => {
                  return str.replace(/([a-z])([A-Z])/g, "$1 $2"); // Insert a space between lowercase and uppercase letters
            };

            return colorKey ? addSpacesBeforeCapitals(colorKey) : "Interval name"; // Fallback to "Interval name" if no match
      };

      const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!name.trim() || !duration.trim()) return;

            const newInterval = {
                  name: name.trim() || getDefaultName(), // Use custom name or fallback to default
                  duration: parseInt(duration, 10),
                  color: selectedColor,
            };

            setCustomTimerInfo({
                  ...customTimerInfo,
                  intervals: [...customTimerInfo.intervals, newInterval],
            });

            // Reset form fields
            setName("");
            setDuration("");
      };

      // Function to close the form with animations
      const closeForm = () => {
            openFormAnimation(false); // Trigger animation to close the form
            setShowFormContent(false); // Hide content after 200ms
            setTimeout(() => setIsFormExpanded(false), 200); // Unexpand the form after 700ms
            setTimeout(() => setDivFormExist(false), 900); // Remove the div entirely after 900ms
            setTimeout(() => setShowAddLetters(true), 1000); // Show "Add" letters after 1000ms
      };

      return (
            <>
                  <div className="h-full w-full">
                        <button onClick={closeForm}>
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="text-blackOlive h-12 w-12 mt-4 ml-4"
                              >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                              </svg>
                        </button>
                        <div className="container mx-auto p-5">
                              <form onSubmit={handleSubmit} className="p-4">
                                    <div className="grid grid-cols-12 lg:gap-5 gap-3 lg:auto-rows-[11vh] auto-rows-[10vh]">
                                          {/* Title */}
                                          <div className="order-1 col-span-12 row-span-1 rounded-3xl content-center bg-blackOlive">
                                                <p className="text-5xl font-black text-timberwolf text-center">Create interval</p>
                                          </div>

                                          {/* Color Picker Section */}
                                          <div
                                                className="order-2 col-span-2 row-span-1 rounded-3xl bg-blackOlive flex items-center justify-evenly p-2 cursor-pointer relative"
                                                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)} // Toggle color picker visibility
                                          >
                                                {/* Selected Color Button */}
                                                <div
                                                      style={{ backgroundColor: selectedColor }}
                                                      className="w-14 h-14 rounded-full border-2 border-timberwolf select-none"
                                                ></div>
                                                {/* Triangle SVG Indicator */}
                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      strokeWidth="2"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      className={`w-10 h-10 text-timberwolf transition-transform duration-300 ease-in-out ${isColorPickerOpen ? "-rotate-180" : "rotate-0"
                                                            }`}
                                                >
                                                      <path d="M6 9l6 6 6-6" />
                                                </svg>
                                                {/* Color Picker Panel */}
                                                <div
                                                      className={`absolute top-full mt-2 w-64 p-4 bg-blackOlive rounded-2xl shadow-lg z-50 transform transition-all duration-300 ease-in-out ${isColorPickerOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                                                            }`}
                                                      style={{ width: "max-content" }}
                                                >
                                                      <h3 className="text-timberwolf mb-3 select-none text-center text-xl font-bold">Interval color</h3>
                                                      <div className="grid grid-cols-4 gap-2">
                                                            {Object.values(Colors).map((color) => (
                                                                  <button
                                                                        key={color}
                                                                        onClick={(e) => {
                                                                              e.stopPropagation(); // Prevent closing the panel when selecting a color
                                                                              setSelectedColor(color);
                                                                              setIsColorPickerOpen(false); // Close the panel after selection
                                                                        }}
                                                                        style={{ backgroundColor: color }}
                                                                        className={`w-12 h-12 rounded-full select-none border-2 ${selectedColor === color ? "border-floralWhite" : "border-transparent"
                                                                              }`}
                                                                  ></button>
                                                            ))}
                                                      </div>
                                                </div>
                                          </div>

                                          {/* Interval Name Label */}
                                          <div className="order-3 col-span-6 row-span-1 rounded-3xl bg-blackOlive pt-4 px-8 pb-6 relative">
                                                {/* Inner Container to Respect Parent Padding */}
                                                <div className="w-full h-full flex flex-col justify-end items-center">
                                                      {/* Input Field */}
                                                      <input
                                                            type="text"
                                                            value={name || getDefaultName()} // Show default name if no custom name is provided
                                                            onChange={(e) => setName(e.target.value.slice(0, 20))} // Enforce character limit of 20
                                                            placeholder="Interval name"
                                                            className="w-full bg-blackOlive text-timberwolf text-3xl font-bold placeholder:text-timberwolf/70 focus:outline-none mb-2 leading-relaxed" // Add leading-relaxed for proper line height
                                                      />
                                                      {/* Timberwolf Line */}
                                                      <div className="w-full h-[2px] bg-timberwolf"></div>
                                                </div>
                                          </div>

                                          {/* Iterval show */}
                                          <div className="order-4 col-span-4 row-span-4 bg-timberwolf rounded-3xl">

                                          </div>

                                          {/* Duration picker */}
                                          <div className="order-5 col-span-8 row-span-4 bg-blackOlive rounded-3xl">

                                          </div>

                                          {/* Progress bar of the color of the interval */}
                                          <div className="order-6 col-span-4 row-span-1 bg-blackOlive rounded-3xl">

                                          </div>
                                    </div>
                              </form>
                        </div>
                  </div>
            </>
      );
};

export default CreateIntervalForm;