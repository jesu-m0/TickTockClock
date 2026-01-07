import { useState } from "react";
import { Colors } from "../../../types";

interface ColorPickerProps {
      selectedColor: Colors;
      onColorChange: (color: Colors) => void;
      variant?: "create" | "edit"; // For different background colors
}

const ColorPicker: React.FC<ColorPickerProps> = ({
      selectedColor,
      onColorChange,
      variant = "create"
}) => {
      const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

      // Define background classes based on variant
      const bgClasses = variant === "create"
            ? "bg-floralWhite dark:bg-blackOlive"
            : "bg-floralWhite dark:bg-eerieBlack";

      return (
            <div
                  className={`order-2 col-span-3 lg:col-span-2 row-span-1 rounded-3xl ${bgClasses} flex items-center justify-evenly p-2 cursor-pointer relative`}
                  onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
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
                        className={`w-6 h-6 lg:w-10 lg:h-10 text-blackOlive dark:text-timberwolf transition-transform duration-300 ease-in-out ${
                              isColorPickerOpen ? "-rotate-180" : "rotate-0"
                        }`}
                  >
                        <path d="M6 9l6 6 6-6" />
                  </svg>

                  {/* Color Picker Panel */}
                  <div
                        className={`left-0 lg:left-auto absolute top-full mt-2 w-64 p-4 ${bgClasses} rounded-2xl shadow-lg z-50 transform transition-all duration-300 ease-in-out ${
                              isColorPickerOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                        style={{ width: "max-content" }}
                  >
                        <h3 className="text-blackOlive dark:text-timberwolf mb-3 select-none text-center text-xl font-bold">
                              Interval color
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                              {Object.values(Colors).map((color) => (
                                    <button
                                          key={color}
                                          type="button"
                                          onClick={(e) => {
                                                e.stopPropagation();
                                                onColorChange(color);
                                                setIsColorPickerOpen(false);
                                          }}
                                          style={{ backgroundColor: color }}
                                          className={`w-12 h-12 rounded-full select-none border-2 ${
                                                selectedColor === color ? "border-floralWhite" : "border-transparent"
                                          }`}
                                    ></button>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default ColorPicker;
