import { useState } from "react";
import { Colors } from "../../types";
import { Interval } from "../../types/CustomTimerInfo";

interface EditIntervalFormProps {
      interval: Interval; // The interval to edit
      onSave: (updatedInterval: Interval) => void; // Callback to save changes
      onClose: () => void; // Callback to close the form
}

const EditIntervalForm: React.FC<EditIntervalFormProps> = ({ interval, onSave, onClose }) => {
      const [name, setName] = useState(interval.name); // Name of the interval
      const [duration, setDuration] = useState(interval.duration); // Duration of the interval
      const [selectedColor, setSelectedColor] = useState(interval.color); // Selected color
      const [isColorPickerOpen, setIsColorPickerOpen] = useState(false); // Track color picker visibility

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

      // Function to handle duration updates
      const handleIntervalDuration = (seconds: number, buttonId: string) => {
            // Get the button element by its ID
            const buttonElement = document.getElementById(buttonId);

            if (buttonElement) {
                  // Add the scale-animation class to the button
                  buttonElement.classList.add("scale-animation");

                  // Remove the class after 200ms
                  setTimeout(() => {
                        buttonElement.classList.remove("scale-animation");
                  }, 300);
            }

            // Update the duration, ensuring it doesn't go below 0
            const newDuration = Math.max(0, duration + seconds);
            setDuration(newDuration);
      };


      // Format time to MM:SS
      const formatTime = (seconds: number) => {
            const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
            const secs = String(seconds % 60).padStart(2, "0");
            return `${mins}:${secs}`;
      };

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
                                          <div
                                                className="order-2 col-span-3 lg:col-span-2 row-span-1 rounded-3xl bg-floralWhite dark:bg-eerieBlack flex items-center justify-evenly p-2 cursor-pointer relative"
                                                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)} // Toggle color picker visibility
                                          >
                                                {/* Selected Color Button */}
                                                <div
                                                      style={{ backgroundColor: selectedColor }}
                                                      className="w-8 h-8 lg:w-14 lg:h-14 rounded-full border-4 border-eerieBlack dark:border-floralWhite select-none"
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
                                                      className={`w-6 h-6 lg:w-10 lg:h-10 text-blackOlive dark:text-timberwolf transition-transform duration-300 ease-in-out ${isColorPickerOpen ? "-rotate-180" : "rotate-0"
                                                            }`}
                                                >
                                                      <path d="M6 9l6 6 6-6" />
                                                </svg>


                                                {/* Color Picker Panel */}
                                                <div
                                                      className={`left-0 lg:left-auto absolute top-full mt-2 w-64 p-4 bg-floralWhite dark:bg-eerieBlack rounded-2xl shadow-lg z-50 transform transition-all duration-300 ease-in-out ${isColorPickerOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                                                            }`}
                                                      style={{ width: "max-content" }}
                                                >
                                                      <h3 className="text-blackOlive dark:text-timberwolf mb-3 select-none text-center text-xl font-bold">Interval color</h3>
                                                      <div className="grid grid-cols-4 gap-2">
                                                            {Object.values(Colors).map((color) => (
                                                                  <button
                                                                        key={color}
                                                                        type="button"
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
                                          <div className="order-3 col-span-9 lg:col-span-6 row-span-1 rounded-3xl bg-floralWhite dark:bg-eerieBlack pt-4 px-8 pb-6 relative">
                                                {/* Inner Container to Respect Parent Padding */}
                                                <div className="w-full h-full flex flex-col justify-end items-center">
                                                      {/* Input Field */}
                                                      <input
                                                            type="text"
                                                            value={name} // Use the current name
                                                            onChange={(e) => setName(e.target.value.slice(0, 17))} // Enforce character limit of 20
                                                            placeholder="Interval name"
                                                            className="w-full bg-floralWhite dark:bg-eerieBlack text-blackOlive dark:text-timberwolf text-xl lg:text-3xl font-bold placeholder:text-blackOlive/70 dark:placeholder:text-timberwolf/70 focus:outline-none mb-1 leading-relaxed" // Add leading-relaxed for proper line height
                                                      />
                                                      {/* Timberwolf Line */}
                                                      <div className="w-full h-[2px] bg-blackOlive dark:bg-timberwolf"></div>
                                                </div>
                                          </div>

                                          {/* Iterval show card */}
                                          <div className="order-4 col-span-12 lg:col-span-4 row-span-3 lg:row-span-4 bg-floralWhite dark:bg-timberwolf rounded-3xl flex flex-col">
                                                <div className="p-4 h-full flex flex-col justify-center items-center">
                                                      <p className="font-black text-blackOlive text-8xl md:text-8xl xl:text-9xl text-center">
                                                            {formatTime(duration)}
                                                      </p>
                                                      <div className="flex px-8 w-full">
                                                            <p className="font-medium text-blackOlive text-lg text-center w-1/2">
                                                                  min
                                                            </p>
                                                            <p className="font-medium text-blackOlive text-lg text-center w-1/2">
                                                                  sec
                                                            </p>
                                                      </div>
                                                </div>
                                                <div className="w-full flex flex-row">
                                                      <div className="h-6 flex-1 rounded-bl-3xl bg-burntSienna"></div>
                                                      <div className="h-6 flex-1 bg-jade"></div>
                                                      <div className="h-6 flex-1 bg-burntSienna"></div>
                                                      <div className="h-6 flex-1 bg-jade"></div>
                                                      <div className="h-6 flex-1 bg-burntSienna"></div>
                                                      <div className="h-6 flex-1 rounded-br-3xl bg-jade"></div>
                                                </div>
                                          </div>

                                          {/* empty column */}
                                          <div className="order-5 lg:col-span-1 lg:row-span-2 row-span-2 rounded-3xl hidden lg:flex flex-col items-center justify-center">
                                          </div>

                                          {/* Duration picker */}
                                          <div className="order-6 col-span-12 lg:col-span-6 row-span-2 bg-eerieBlack rounded-3xl flex flex-col items-center justify-center">
                                                <div className="flex flex-row justify-center h-1/2 w-full">
                                                      <div id="intervalUp1s" onClick={() => handleIntervalDuration(1, "intervalUp1s")} className="bg-floralWhite dark:bg-eerieBlack rounded-tl-3xl h-full w-1/5 border-r border-b border-blackOlive dark:border-timberwolf flex items-center justify-center hover:scale-105 transition-transform duration-200">
                                                            <p className="text-blackOlive dark:text-timberwolf font-black text-2xl lg:text-4xl xl:text-5xl">+1''</p>
                                                      </div>
                                                      <div id="intervalUp5s" onClick={() => handleIntervalDuration(5, "intervalUp5s")} className="bg-floralWhite dark:bg-eerieBlack h-full w-1/5 border-x border-b border-blackOlive dark:border-timberwolf flex items-center justify-center hover:scale-105 transition-transform duration-200">
                                                            <p className="text-blackOlive dark:text-timberwolf font-black text-2xl lg:text-4xl xl:text-5xl">+5''</p>
                                                      </div>
                                                      <div id="intervalUp30s" onClick={() => handleIntervalDuration(30, "intervalUp30s")} className="bg-floralWhite dark:bg-eerieBlack h-full w-1/5 border-x border-b border-blackOlive dark:border-timberwolf flex items-center justify-center hover:scale-105 transition-transform duration-200">
                                                            <p className="text-blackOlive dark:text-timberwolf font-black text-2xl lg:text-4xl xl:text-5xl">+30''</p>
                                                      </div>
                                                      <div id="intervalUp5m" onClick={() => handleIntervalDuration(300, "intervalUp5m")} className="bg-floralWhite dark:bg-eerieBlack h-full w-1/5 border-x border-b border-blackOlive dark:border-timberwolf flex items-center justify-center hover:scale-105 transition-transform duration-200">
                                                            <p className="text-blackOlive dark:text-timberwolf font-black text-2xl lg:text-4xl xl:text-5xl">+5'</p>
                                                      </div>
                                                      <div id="intervalUp30m" onClick={() => handleIntervalDuration(1800, "intervalUp30m")} className="bg-floralWhite dark:bg-eerieBlack rounded-tr-3xl h-full w-1/5 border-l border-b border-blackOlive dark:border-timberwolf flex items-center justify-center hover:scale-105 transition-transform duration-200">
                                                            <p className="text-blackOlive dark:text-timberwolf font-black text-2xl lg:text-4xl xl:text-5xl">+30'</p>
                                                      </div>
                                                </div>
                                                <div className="flex flex-row justify-center h-1/2 w-full">
                                                      <div id="intervalDown1s" onClick={() => handleIntervalDuration(-1, "intervalDown1s")} className="bg-floralWhite dark:bg-eerieBlack rounded-bl-3xl h-full w-1/5 border-r border-t border-blackOlive dark:border-timberwolf flex items-center justify-center hover:scale-105 transition-transform duration-200">
                                                            <p className="text-blackOlive dark:text-timberwolf font-black text-2xl lg:text-4xl xl:text-5xl">-1''</p>
                                                      </div>
                                                      <div id="intervalDown5s" onClick={() => handleIntervalDuration(-5, "intervalDown5s")} className="bg-floralWhite dark:bg-eerieBlack h-full w-1/5 border-x border-t border-blackOlive dark:border-timberwolf flex items-center justify-center hover:scale-105 transition-transform duration-200">
                                                            <p className="text-blackOlive dark:text-timberwolf font-black text-2xl lg:text-4xl xl:text-5xl">-5''</p>
                                                      </div>
                                                      <div id="intervalDown30s" onClick={() => handleIntervalDuration(-30, "intervalDown30s")} className="bg-floralWhite dark:bg-eerieBlack h-full w-1/5 border-x border-t border-blackOlive dark:border-timberwolf flex items-center justify-center hover:scale-105 transition-transform duration-200">
                                                            <p className="text-blackOlive dark:text-timberwolf font-black text-2xl lg:text-4xl xl:text-5xl">-30''</p>
                                                      </div>
                                                      <div id="intervalDown5m" onClick={() => handleIntervalDuration(-300, "intervalDown5m")} className="bg-floralWhite dark:bg-eerieBlack h-full w-1/5 border-x border-t border-blackOlive dark:border-timberwolf flex items-center justify-center hover:scale-105 transition-transform duration-200">
                                                            <p className="text-blackOlive dark:text-timberwolf font-black text-2xl lg:text-4xl xl:text-5xl">-5'</p>
                                                      </div>
                                                      <div id="intervalDown30m" onClick={() => handleIntervalDuration(-1800, "intervalDown30m")} className="bg-floralWhite dark:bg-eerieBlack rounded-br-3xl h-full w-1/5 border-l border-t border-blackOlive dark:border-timberwolf flex items-center justify-center hover:scale-105 transition-transform duration-200">
                                                            <p className="text-blackOlive dark:text-timberwolf font-black text-2xl lg:text-4xl xl:text-5xl">-30'</p>
                                                      </div>
                                                </div>
                                          </div>

                                          {/* empty column */}
                                          <div className="order-7 lg:col-span-1 lg:row-span-2 rounded-3xl hidden lg:flex flex-col items-center justify-center">
                                          </div>

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
            </>
      );
};

export default EditIntervalForm;