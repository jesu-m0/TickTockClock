interface DurationPickerProps {
      duration: number;
      onDurationChange: (seconds: number) => void;
}

const DurationPicker: React.FC<DurationPickerProps> = ({
      duration,
      onDurationChange
}) => {
      // Function to handle duration updates with animation
      const handleIntervalDuration = (seconds: number, buttonId: string) => {
            // Get the button element by its ID
            const buttonElement = document.getElementById(buttonId);

            if (buttonElement) {
                  // Add the scale-animation class to the button
                  buttonElement.classList.add("scale-animation");

                  // Remove the class after 300ms
                  setTimeout(() => {
                        buttonElement.classList.remove("scale-animation");
                  }, 300);
            }

            // Update the duration, ensuring it doesn't go below 0
            const newDuration = Math.max(0, duration + seconds);
            onDurationChange(newDuration);
      };

      return (
            <div className="order-5 col-span-12 lg:col-span-8 row-span-2 bg-jade rounded-3xl flex flex-col items-center justify-center overflow-hidden p-3">
                  <div className="flex flex-row gap-1 w-full flex-1">
                        <div
                              id="intervalUp1s"
                              onClick={() => handleIntervalDuration(1, "intervalUp1s")}
                              className="bg-floralWhite dark:bg-blackOlive rounded-tl-3xl rounded-md h-full flex-[0.8] flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                              <p className="text-blackOlive dark:text-timberwolf font-black text-lg lg:text-2xl xl:text-3xl">+1''</p>
                        </div>
                        <div
                              id="intervalUp5s"
                              onClick={() => handleIntervalDuration(5, "intervalUp5s")}
                              className="bg-floralWhite dark:bg-blackOlive rounded-md h-full flex-1 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                              <p className="text-blackOlive dark:text-timberwolf font-black text-lg lg:text-2xl xl:text-3xl">+5''</p>
                        </div>
                        <div
                              id="intervalUp30s"
                              onClick={() => handleIntervalDuration(30, "intervalUp30s")}
                              className="bg-floralWhite dark:bg-blackOlive rounded-md h-full flex-[1.3] flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                              <p className="text-blackOlive dark:text-timberwolf font-black text-lg lg:text-2xl xl:text-3xl">+30''</p>
                        </div>
                        <div
                              id="intervalUp5m"
                              onClick={() => handleIntervalDuration(300, "intervalUp5m")}
                              className="bg-floralWhite dark:bg-blackOlive rounded-md h-full flex-[1.5] flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                              <p className="text-blackOlive dark:text-timberwolf font-black text-lg lg:text-2xl xl:text-3xl">+5'</p>
                        </div>
                        <div
                              id="intervalUp30m"
                              onClick={() => handleIntervalDuration(1800, "intervalUp30m")}
                              className="bg-floralWhite dark:bg-blackOlive rounded-tr-3xl rounded-md h-full flex-[1.8] flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                              <p className="text-blackOlive dark:text-timberwolf font-black text-lg lg:text-2xl xl:text-3xl">+30'</p>
                        </div>
                  </div>
                  {/* Horizontal divider line */}
                  <div className="w-full h-1 bg-jade"></div>
                  <div className="flex flex-row gap-1 w-full flex-1">
                        <div
                              id="intervalDown1s"
                              onClick={() => handleIntervalDuration(-1, "intervalDown1s")}
                              className="bg-floralWhite dark:bg-blackOlive rounded-bl-3xl rounded-md h-full flex-[0.8] flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                              <p className="text-blackOlive dark:text-timberwolf font-black text-lg lg:text-2xl xl:text-3xl">-1''</p>
                        </div>
                        <div
                              id="intervalDown5s"
                              onClick={() => handleIntervalDuration(-5, "intervalDown5s")}
                              className="bg-floralWhite dark:bg-blackOlive rounded-md h-full flex-1 flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                              <p className="text-blackOlive dark:text-timberwolf font-black text-lg lg:text-2xl xl:text-3xl">-5''</p>
                        </div>
                        <div
                              id="intervalDown30s"
                              onClick={() => handleIntervalDuration(-30, "intervalDown30s")}
                              className="bg-floralWhite dark:bg-blackOlive rounded-md h-full flex-[1.3] flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                              <p className="text-blackOlive dark:text-timberwolf font-black text-lg lg:text-2xl xl:text-3xl">-30''</p>
                        </div>
                        <div
                              id="intervalDown5m"
                              onClick={() => handleIntervalDuration(-300, "intervalDown5m")}
                              className="bg-floralWhite dark:bg-blackOlive rounded-md h-full flex-[1.5] flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                              <p className="text-blackOlive dark:text-timberwolf font-black text-lg lg:text-2xl xl:text-3xl">-5'</p>
                        </div>
                        <div
                              id="intervalDown30m"
                              onClick={() => handleIntervalDuration(-1800, "intervalDown30m")}
                              className="bg-floralWhite dark:bg-blackOlive rounded-br-3xl rounded-md h-full flex-[1.8] flex items-center justify-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                              <p className="text-blackOlive dark:text-timberwolf font-black text-lg lg:text-2xl xl:text-3xl">-30'</p>
                        </div>
                  </div>
            </div>
      );
};

export default DurationPicker;
