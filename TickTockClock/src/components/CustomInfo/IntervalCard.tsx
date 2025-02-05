import { Interval } from "../../types/CustomTimerInfo";

interface IntervalCardProps {
    interval: Interval;
}

const IntervalCard = ({ interval }: IntervalCardProps) => {
    return (
        <div className="bg-blackOlive rounded-xl p-2 flex gap-2">
            <div className="flex items-center cursor-grab">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="6" r="2" fill="#CCC5B9"/>
                    <circle cx="9" cy="12" r="2" fill="#CCC5B9"/>
                    <circle cx="9" cy="18" r="2" fill="#CCC5B9"/>
                    <circle cx="15" cy="6" r="2" fill="#CCC5B9"/>
                    <circle cx="15" cy="12" r="2" fill="#CCC5B9"/>
                    <circle cx="15" cy="18" r="2" fill="#CCC5B9"/>
                </svg>
            </div>
            {/* Color round */}
            <div className="rounded-full w-10 h-10 border-2" style={{ backgroundColor: interval.color }}>
            </div>
            {/* Interval name */}
            <div className="flex items-center">
                  <p className="font-bold text-floralWhite text-2xl">{interval.name}</p>
            </div>
            {/* Manage buttons */}
            <div>

            </div>
        </div>
    );
};

export default IntervalCard;
