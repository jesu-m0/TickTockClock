import React, { createContext, useContext, useState } from 'react';
import { AnimationType, ClockStatus } from '../types';
import { SimpleTimerInfo } from '../types/SimpleTimerInfo';

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
    setIsSimpleMode: (isSimple: boolean) => void;
    
    // Simple mode configuration
    simpleTimerInfo: SimpleTimerInfo;
    setSimpleTimerInfo: (info: SimpleTimerInfo) => void;

    // Custom mode configuration
    //TODO: Add custom mode configuration
}

const ClockContext = createContext<ClockContextType | undefined>(undefined);

export const ClockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clockStatus, setClockStatus] = useState<ClockStatus>(ClockStatus.ZERO);
    const [time, setTime] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);
    const [isSimpleMode, setIsSimpleMode] = useState<boolean>(false);
    const [simpleTimerInfo, setSimpleTimerInfo] = useState<SimpleTimerInfo>({
        workLapDuration: 0,      // Duration of work intervals in seconds
        restLapDuration: 0,      // Duration of rest intervals in seconds
        cycles: 1,               // Number of work/rest cycles to perform
        remainingCycles: 1,     // Remaining cycles to perform. This will change as the timer progresses
        isWorkLap: true,         // Tracks if we're currently in a work lap (true) or rest lap (false)
        currentAnimation: AnimationType.NONE  // Current UI animation state, starts with no animation
    });
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
            setSimpleTimerInfo
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