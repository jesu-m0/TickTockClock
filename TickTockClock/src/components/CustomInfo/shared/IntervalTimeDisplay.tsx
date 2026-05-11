import { formatTime } from "../../../utils/formatTime";
import ClockCard from "../../Common/ClockCard";

interface IntervalTimeDisplayProps {
      duration: number;
      variant?: "create" | "edit";
}

const IntervalTimeDisplay: React.FC<IntervalTimeDisplayProps> = ({
      duration,
      variant = "create"
}) => {
      const stripeColor = variant === "create" ? "bg-tertiary" : "bg-primary";

      return (
            <ClockCard
                  value={formatTime(duration)}
                  barCount={6}
                  barColorA="bg-secondary"
                  barColorB={stripeColor}
                  className="order-4 col-span-12 lg:col-span-3 row-span-3"
            />
      );
};

export default IntervalTimeDisplay;
