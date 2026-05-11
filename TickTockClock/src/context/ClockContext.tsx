import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import { AnimationType, ClockStatus, Colors } from '../types';
import { SimpleTimerConfig, SimpleTimerState } from '../types/SimpleTimerInfo';
import { CustomTimerConfig, CustomTimerState } from '../types/CustomTimerInfo';
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

      // Mode. Depending on the mode, the clock will look on the simpleTimer or the customTimer to work
      isSimpleMode: boolean;
      setIsSimpleMode: (isSimpleMode: boolean) => void;

      // Simple mode — config (user-set) and state (runtime)
      simpleTimerConfig: SimpleTimerConfig;
      setSimpleTimerConfig: React.Dispatch<React.SetStateAction<SimpleTimerConfig>>;
      simpleTimerState: SimpleTimerState;
      setSimpleTimerState: React.Dispatch<React.SetStateAction<SimpleTimerState>>;

      // Animation state
      isAlternate: boolean;
      setIsAlternate: (isAlternate: boolean | ((prev: boolean) => boolean)) => void;

      // Custom mode — config (user-set) and state (runtime)
      customTimerConfig: CustomTimerConfig;
      setCustomTimerConfig: React.Dispatch<React.SetStateAction<CustomTimerConfig>>;
      customTimerState: CustomTimerState;
      setCustomTimerState: React.Dispatch<React.SetStateAction<CustomTimerState>>;

      resetClock: () => void;
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
                  soundKey: 'beep',
            },
            {
                  id: uuidv4(),
                  name: "High Intensity",
                  duration: 180, // 3 minutes in seconds
                  color: Colors.Jade,
                  soundKey: 'beep',
            }
      ], []);


      // Use ref to track if this is the initial mount
      const isInitialMount = useRef(true);

      const [clockStatus, setClockStatus] = useState<ClockStatus>(ClockStatus.ZERO);
      const [time, setTime] = useState<number>(0);
      const [isPaused, setIsPaused] = useState<boolean>(true);
      const [reset, setReset] = useState<boolean>(false);
      const [isSimpleMode, setIsSimpleMode] = useState<boolean>(true);

      // Simple mode — separated into config and runtime state
      const [simpleTimerConfig, setSimpleTimerConfig] = useState<SimpleTimerConfig>({
            workLapDuration: 0,
            restLapDuration: 0,
            sets: 1,
      });
      const [simpleTimerState, setSimpleTimerState] = useState<SimpleTimerState>({
            remainingSets: 1,
            isWorkLap: true,
            currentAnimation: AnimationType.NONE,
      });

      const [isAlternate, setIsAlternate] = useState<boolean>(false);

      // Custom mode — separated into config and runtime state
      const [customTimerConfig, setCustomTimerConfig] = useState<CustomTimerConfig>(() => {
            const loadedIntervals = loadIntervalsFromLocalStorage();
            const loadedSets = loadSetsFromLocalStorage();
            return {
                  intervals: loadedIntervals || defaultIntervals,
                  sets: loadedSets || 1,
            };
      });
      const [customTimerState, setCustomTimerState] = useState<CustomTimerState>(() => {
            const loadedSets = loadSetsFromLocalStorage();
            return {
                  currentAnimation: AnimationType.NONE,
                  remainingIntervals: [],
                  remainingSets: loadedSets || 1,
            };
      });

      // Save intervals and sets to local storage whenever they change
      // We use a ref to track the previous values to avoid saving when only runtime values change
      const prevIntervalsRef = useRef<string>('');
      const prevSetsRef = useRef<number>(0);

      useEffect(() => {
            // Serialize intervals to compare by value, not by reference
            const currentIntervalsStr = JSON.stringify(customTimerConfig.intervals);
            const currentSets = customTimerConfig.sets;

            // Check if this is initial mount
            if (isInitialMount.current) {
                  isInitialMount.current = false;
                  prevIntervalsRef.current = currentIntervalsStr;
                  prevSetsRef.current = currentSets;
                  return;
            }

            // Only save if intervals or sets actually changed
            const intervalsChanged = prevIntervalsRef.current !== currentIntervalsStr;
            const setsChanged = prevSetsRef.current !== currentSets;

            if (intervalsChanged || setsChanged) {
                  saveIntervalsToLocalStorage(customTimerConfig.intervals);
                  saveSetsToLocalStorage(currentSets);

                  prevIntervalsRef.current = currentIntervalsStr;
                  prevSetsRef.current = currentSets;
            }
      }, [customTimerConfig.intervals, customTimerConfig.sets]);

      const resetClock = () => {
            setClockStatus(ClockStatus.ZERO);
            setTime(0);
            setIsPaused(true);
            setReset(false);
            setIsSimpleMode(true);
            setSimpleTimerConfig({
                  workLapDuration: 0,
                  restLapDuration: 0,
                  sets: 1,
            });
            setSimpleTimerState({
                  remainingSets: 1,
                  isWorkLap: true,
                  currentAnimation: AnimationType.NONE,
            });
            setIsAlternate(false);
            setCustomTimerConfig({
                  intervals: defaultIntervals,
                  sets: 1,
            });
            setCustomTimerState({
                  currentAnimation: AnimationType.NONE,
                  remainingIntervals: [],
                  remainingSets: 1,
            });
      };

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
                  simpleTimerConfig,
                  setSimpleTimerConfig,
                  simpleTimerState,
                  setSimpleTimerState,
                  isAlternate,
                  setIsAlternate,
                  customTimerConfig,
                  setCustomTimerConfig,
                  customTimerState,
                  setCustomTimerState,
                  resetClock
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
