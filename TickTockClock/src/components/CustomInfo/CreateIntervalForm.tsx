import { useState } from "react";
import { useClockStatus } from "../../context/ClockContext";
import { Colors } from "../../types";

interface CreateIntervalFormProps {
    setIsFormExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    setShowFormContent: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAddLetters: React.Dispatch<React.SetStateAction<boolean>>;
    setDivFormExist: React.Dispatch<React.SetStateAction<boolean>>;
    openFormAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateIntervalForm: React.FC<CreateIntervalFormProps> = ({}) => {
    const { customTimerInfo, setCustomTimerInfo } = useClockStatus();

    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !duration.trim()) return;

        const newInterval = {
            name,
            duration: parseInt(duration, 10),
            color: Colors.BurntSienna,
        };

        setCustomTimerInfo({
            ...customTimerInfo,
            intervals: [...customTimerInfo.intervals, newInterval],
        });

        // Reset form fields
        setName("");
        setDuration("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-800 p-4 rounded-lg">
            <label className="text-white">
                Interval Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mt-1 rounded-md bg-gray-700 text-white"
                    required
                />
            </label>

            <label className="text-white">
                Duration (seconds):
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2 mt-1 rounded-md bg-gray-700 text-white"
                    min="1"
                    required
                />
            </label>

            <label className="text-white">
                Color:
                <input
                    type="color"
                    value={Colors.BurntSienna}
                    className="w-full h-10 p-1 mt-1 rounded-md"
                />
            </label>

            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
                Add Interval
            </button>
        </form>
    );
};

export default CreateIntervalForm;
