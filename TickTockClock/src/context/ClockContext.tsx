import React, { createContext, useContext, useState } from 'react';
import { AnimationType, ClockStatus, Colors } from '../types';
import { SimpleTimerInfo } from '../types/SimpleTimerInfo';
import { CustomTimerInfo } from '../types/CustomTimerInfo';

interface ClockContextType {
    
    clockStatus: ClockStatus;
    setClockStatus: (status: ClockStatus) => void;

    // Timer state
    time: number;
    setTime: (value: number | ((prevTime: number) => number)) => void;

    isPaused: boolean;
    setIsPaused: (isPaused: boolean) => void;

    reset: boolean;
    setReset: (reset: boolean) => void;
    
    // Mode. Depending on the mode, the clock will look on the simpleTimerInfo or the customTimerInfo to work
    isSimpleMode: boolean;
    setIsSimpleMode: (isSimpleMode: boolean) => void;
    
    // Simple mode configuration
    simpleTimerInfo: SimpleTimerInfo;
    setSimpleTimerInfo: (simpleTimerInfo: SimpleTimerInfo) => void;

    // Animation state
    isAlternate: boolean;
    setIsAlternate: (isAlternate: boolean | ((prev: boolean) => boolean)) => void;

    // Custom mode configuration
    customTimerInfo: CustomTimerInfo
    setCustomTimerInfo: (customTimerInfo: CustomTimerInfo) => void;
}

const ClockContext = createContext<ClockContextType | undefined>(undefined);

export const ClockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clockStatus, setClockStatus] = useState<ClockStatus>(ClockStatus.ZERO);
    const [time, setTime] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [reset, setReset] = useState<boolean>(false);
    const [isSimpleMode, setIsSimpleMode] = useState<boolean>(true);
    const [simpleTimerInfo, setSimpleTimerInfo] = useState<SimpleTimerInfo>({
        workLapDuration: 0,      // Duration of work intervals in seconds
        restLapDuration: 0,      // Duration of rest intervals in seconds
        sets: 1,               // Number of work/rest sets to perform
        remainingSets: 1,     // Remaining sets to perform. This will change as the timer progresses
        isWorkLap: true,         // Tracks if we're currently in a work lap (true) or rest lap (false)
        currentAnimation: AnimationType.NONE  // Current UI animation state, starts with no animation
    });
    const [isAlternate, setIsAlternate] = useState<boolean>(false);
    const [customTimerInfo, setCustomTimerInfo] = useState<CustomTimerInfo>({
        intervals: [
            {
                name: "Warm Up",
                duration: 300, // 5 minutes in seconds
                color: Colors.BurntSienna,
            },
            {
                name: "High Intensity",
                duration: 180, // 3 minutes in seconds
                color: Colors.Jade,
            }
        ],
        sets: 1,
        remainingIntervals: [],
        currentAnimation: AnimationType.NONE
    })
    return (
        <ClockContext.Provider value={{
            clockStatus,
            setClockStatus,
            time,
            setTime,
            isPaused,
            setIsPaused,
            reset,
            setReset,
            isSimpleMode,
            setIsSimpleMode,
            simpleTimerInfo,
            setSimpleTimerInfo,
            isAlternate,
            setIsAlternate,
            customTimerInfo,
            setCustomTimerInfo
        }}>
            {children}
        </ClockContext.Provider>
    );
};

export const useClockStatus = () => {
    const context = useContext(ClockContext);
    if (context === undefined) {
        throw new Error('useClockStatus must be used within a ClockProvider');
    }
    return context;
}; 