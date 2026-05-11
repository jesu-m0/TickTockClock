import { useTranslation } from "../../../i18n/useTranslation";

interface IntervalNameInputProps {
      name: string;
      onNameChange: (name: string) => void;
      variant?: "create" | "edit";
}

const IntervalNameInput: React.FC<IntervalNameInputProps> = ({
      name,
      onNameChange,
      variant = "create"
}) => {
      const { t } = useTranslation();
      const bgClasses = variant === "create"
            ? "bg-surface dark:bg-baseClr"
            : "bg-surface dark:bg-surfaceDark";

      return (
            <div className={`order-3 col-span-9 lg:col-span-7 row-span-1 rounded-3xl ${bgClasses} pt-4 px-8 pb-6 relative`}>
                  <div className="w-full h-full flex flex-col justify-end items-center">
                        {/* Input Field */}
                        <input
                              type="text"
                              value={name}
                              onChange={(e) => onNameChange(e.target.value.slice(0, 17))}
                              placeholder={t.intervalName}
                              className={`w-full ${bgClasses} text-baseClr dark:text-muted text-xl lg:text-3xl font-bold placeholder:text-baseClr/70 dark:placeholder:text-muted/70 focus:outline-none mb-1 leading-relaxed`}
                        />
                        {/* Line */}
                        <div className="w-full h-[2px] bg-baseClr dark:bg-muted"></div>
                  </div>
            </div>
      );
};

export default IntervalNameInput;
