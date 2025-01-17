import React, { createContext, useContext, useState } from 'react';
import { ClockStatus } from '../types';

interface ClockContextType {
    clockStatus: ClockStatus;
    setClockStatus: (status: ClockStatus) => void;
}

const ClockContext = createContext<ClockContextType | undefined>(undefined);

export const ClockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clockStatus, setClockStatus] = useState<ClockStatus>(ClockStatus.ZERO);

    return (
        <ClockContext.Provider value={{ clockStatus, setClockStatus }}>
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