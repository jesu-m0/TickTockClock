import { useState } from "react";
import { Interval } from "../../types/CustomTimerInfo";
import { Colors } from "../../types";

const IntervalCard = () => {
    const [intervalDummy, setIntervalDummy] = useState<Interval>({
        duration: 30,
        color: Colors.DarkGreen,
        name: "dummyInterval"
    });

    return (
        <div className="bg-blackOlive rounded-xl p-2">
            {intervalDummy.name}
        </div>
    );
};

export default IntervalCard;
