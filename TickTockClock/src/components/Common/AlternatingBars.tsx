import React from "react";

interface AlternatingBarsProps {
      count: number;
      isAlternate?: boolean;
      colorA?: string;
      colorB?: string;
}

const AlternatingBars: React.FC<AlternatingBarsProps> = ({ count, isAlternate = false, colorA = "bg-primary", colorB = "bg-secondary" }) => {
      return (
            <div className="w-full flex flex-row">
                  {Array.from({ length: count }, (_, i) => {
                        const isEven = i % 2 === 0;
                        const color = (isEven ? !isAlternate : isAlternate)
                              ? colorA
                              : colorB;
                        const isFirst = i === 0;
                        const isLast = i === count - 1;
                        const rounded = isFirst
                              ? "rounded-bl-3xl"
                              : isLast
                                    ? "rounded-br-3xl"
                                    : "";

                        return (
                              <div
                                    key={i}
                                    className={`h-6 flex-1 ${color} ${rounded}`}
                              />
                        );
                  })}
            </div>
      );
};

export default AlternatingBars;
