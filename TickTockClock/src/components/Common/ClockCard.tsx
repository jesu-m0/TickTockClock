import React from "react";
import { useTranslation } from "../../i18n/useTranslation";
import TimeDigits from "./TimeDigits";
import AlternatingBars from "./AlternatingBars";

interface ClockCardProps {
      value: string;
      digitsClassName?: string;
      labelsClassName?: string;
      barCount?: number;
      isAlternate?: boolean;
      barColorA?: string;
      barColorB?: string;
      className?: string;
      children?: React.ReactNode;
}

const ClockCard: React.FC<ClockCardProps> = ({
      value,
      digitsClassName = "font-black text-6xl md:text-8xl xl:text-9xl",
      labelsClassName = "text-lg",
      barCount = 6,
      isAlternate = false,
      barColorA,
      barColorB,
      className = "",
      children,
}) => {
      const { t } = useTranslation();

      return (
            <div className={`bg-surface dark:bg-muted rounded-3xl flex flex-col ${className}`}>
                  {children}
                  <div className="p-4 h-full flex flex-col justify-center items-center">
                        <TimeDigits
                              value={value}
                              className={`text-baseClr text-center ${digitsClassName}`}
                        />
                        <div className="flex px-8 w-full">
                              <p className={`font-medium text-baseClr text-center w-1/2 ${labelsClassName}`}>
                                    {t.min}
                              </p>
                              <p className={`font-medium text-baseClr text-center w-1/2 ${labelsClassName}`}>
                                    {t.sec}
                              </p>
                        </div>
                  </div>
                  <AlternatingBars
                        count={barCount}
                        isAlternate={isAlternate}
                        {...(barColorA ? { colorA: barColorA } : {})}
                        {...(barColorB ? { colorB: barColorB } : {})}
                  />
            </div>
      );
};

export default ClockCard;
