interface IntervalNameInputProps {
      name: string;
      onNameChange: (name: string) => void;
      variant?: "create" | "edit"; // For different background colors
}

const IntervalNameInput: React.FC<IntervalNameInputProps> = ({
      name,
      onNameChange,
      variant = "create"
}) => {
      // Define background classes based on variant
      const bgClasses = variant === "create"
            ? "bg-floralWhite dark:bg-blackOlive"
            : "bg-floralWhite dark:bg-eerieBlack";

      return (
            <div className={`order-3 col-span-9 lg:col-span-6 row-span-1 rounded-3xl ${bgClasses} pt-4 px-8 pb-6 relative`}>
                  <div className="w-full h-full flex flex-col justify-end items-center">
                        {/* Input Field */}
                        <input
                              type="text"
                              value={name}
                              onChange={(e) => onNameChange(e.target.value.slice(0, 17))}
                              placeholder="Interval name"
                              className={`w-full ${bgClasses} text-blackOlive dark:text-timberwolf text-xl lg:text-3xl font-bold placeholder:text-blackOlive/70 dark:placeholder:text-timberwolf/70 focus:outline-none mb-1 leading-relaxed`}
                        />
                        {/* Timberwolf Line */}
                        <div className="w-full h-[2px] bg-blackOlive dark:bg-timberwolf"></div>
                  </div>
            </div>
      );
};

export default IntervalNameInput;
