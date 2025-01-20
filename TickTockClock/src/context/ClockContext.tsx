import React, { createContext, useContext, useState } from 'react';
import { ClockStatus } from '../types';

interface ClockContextType {
    
    clockStatus: ClockStatus;
    setClockStatus: (status: ClockStatus) => void;

    // Timer state
    time: number;
    setTime: (time: number) => void;

    isPaused: boolean;
    setIsPaused: (isPaused: boolean) => void;

    reset: boolean;
    setReset: (reset: boolean) => void;
    
    // Mode. Depending on the mode, the clock will look on the simpleTimerInfo or the customTimerInfo to work
    isSimpleMode: boolean;
    setIsSimpleMode: (isSimple: boolean) => void;
    
    // Simple mode configuration
    simpleTimerInfo: {
        workLapDuration: number;
        restLapDuration: number;
    };
    setSimpleTimerInfo: (info: { workLapDuration: number; restLapDuration: number; }) => void;
    
    // Lap counting
    simpleLapCounts: {
        workLaps: number;
        restLaps: number;
    };
    setSimpleLapCounts: (counts: { workLaps: number; restLaps: number; }) => void;

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
    const [simpleTimerInfo, setSimpleTimerInfo] = useState<{ workLapDuration: number; restLapDuration: number; }>({ workLapDuration: 0, restLapDuration: 0 });
    const [simpleLapCounts, setSimpleLapCounts] = useState<{ workLaps: number; restLaps: number; }>({ workLaps: 0, restLaps: 0 });

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
            simpleLapCounts,
            setSimpleLapCounts
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