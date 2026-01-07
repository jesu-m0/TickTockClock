import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import { AnimationType, ClockStatus, Colors } from '../types';
import { SimpleTimerInfo } from '../types/SimpleTimerInfo';
import { CustomTimerInfo } from '../types/CustomTimerInfo';
import { v4 as uuidv4 } from "uuid";
import { loadIntervalsFromLocalStorage, saveIntervalsToLocalStorage, loadSetsFromLocalStorage, saveSetsToLocalStorage } from '../utils/localStorage';


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
      // Default intervals to use when no local storage data exists
      // Memoized to prevent creating new objects on every render
      const defaultIntervals = useMemo(() => [
            {
                  id: uuidv4(),
                  name: "Warm Up",
                  duration: 300, // 5 minutes in seconds
                  color: Colors.BurntSienna,
            },
            {
                  id: uuidv4(),
                  name: "High Intensity",
                  duration: 180, // 3 minutes in seconds
                  color: Colors.Jade,
            }
      ], []);

      // Load intervals and sets from local storage, or use defaults
      const loadedIntervals = loadIntervalsFromLocalStorage();
      const loadedSets = loadSetsFromLocalStorage();

      // Use ref to track if this is the initial mount
      const isInitialMount = useRef(true);

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
            intervals: loadedIntervals || defaultIntervals,
            sets: loadedSets || 1,
            currentAnimation: AnimationType.NONE,
            remainingIntervals: [],
            remainingSets: loadedSets || 1,
      })

      // Save intervals and sets to local storage whenever they change
      // We use a ref to track the previous values to avoid saving when only runtime values change
      const prevIntervalsRef = useRef<string>('');
      const prevSetsRef = useRef<number>(0);

      useEffect(() => {
            // Serialize intervals to compare by value, not by reference
            const currentIntervalsStr = JSON.stringify(customTimerInfo.intervals);
            const currentSets = customTimerInfo.sets;

            // Check if this is initial mount
            if (isInitialMount.current) {
                  isInitialMount.current = false;
                  prevIntervalsRef.current = currentIntervalsStr;
                  prevSetsRef.current = currentSets;
                  console.log("[localStorage] Initial mount - skipping save");
                  return;
            }

            // Only save if intervals or sets actually changed (not remainingIntervals/remainingSets)
            const intervalsChanged = prevIntervalsRef.current !== currentIntervalsStr;
            const setsChanged = prevSetsRef.current !== currentSets;

            if (intervalsChanged || setsChanged) {
                  console.log("[localStorage] Saving to localStorage", {
                        intervalsChanged,
                        setsChanged,
                        intervalsCount: customTimerInfo.intervals.length,
                        sets: currentSets
                  });
                  saveIntervalsToLocalStorage(customTimerInfo.intervals);
                  saveSetsToLocalStorage(currentSets);

                  prevIntervalsRef.current = currentIntervalsStr;
                  prevSetsRef.current = currentSets;
            }
      }, [customTimerInfo.intervals, customTimerInfo.sets]);

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
