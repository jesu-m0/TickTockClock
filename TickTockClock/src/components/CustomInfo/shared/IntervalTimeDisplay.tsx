interface IntervalTimeDisplayProps {
      duration: number;
      variant?: "create" | "edit"; // For different stripe colors
}

const IntervalTimeDisplay: React.FC<IntervalTimeDisplayProps> = ({
      duration,
      variant = "create"
}) => {
      // Format time to MM:SS
      const formatTime = (seconds: number) => {
            const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
            const secs = String(seconds % 60).padStart(2, "0");
            return `${mins}:${secs}`;
      };

      // Define stripe colors based on variant
      const stripeColor = variant === "create" ? "bg-saffron" : "bg-jade";

      return (
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
                        <div className={`h-6 flex-1 ${stripeColor}`}></div>
                        <div className="h-6 flex-1 bg-burntSienna"></div>
                        <div className={`h-6 flex-1 ${stripeColor}`}></div>
                        <div className="h-6 flex-1 bg-burntSienna"></div>
                        <div className={`h-6 flex-1 rounded-br-3xl ${stripeColor}`}></div>
                  </div>
            </div>
      );
};

export default IntervalTimeDisplay;
