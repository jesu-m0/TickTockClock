import React, { useState, useEffect, useCallback } from "react";
import Header from "./Common/Header.tsx";
import Clock from "./Common/Clock.tsx";
import "./mainPage.css";
import SimpleInfo from "./SimpleInfo/SimpleInfo";
import CustomInfo from "./CustomInfo/CustomInfo";
import { AnimationType, ClockStatus } from "../types";
import { useClockStatus } from "../context/ClockContext";
import ExpandedContent from "./Common/ExpandedContent.tsx";
import { initializeAudioContext } from "../utils/soundNotification";
import { useTranslation } from "../i18n/useTranslation";

const MainPage: React.FC = () => {
      const { t } = useTranslation();

      //Expanded content
      const [showExpandLetters, setShowExpandLetters] = useState(true);
      const [isExpanded, setIsExpanded] = useState(false);
      const [showContent, setShowContent] = useState(false);
      const [divExist, setDivExist] = useState(false);
      const [openAnimation, setOpenAnimation] = useState(true);

      const [buttonPosition, setButtonPosition] = useState({
            top: 0,
            left: 0,
            width: 0,
            height: 0,
      });

      //Change mode

      //Start or stop
      const [isClickedPause, setIsClickedPause] = useState(false);
      const [isClickedReset, setIsClickedReset] = useState(false);

      //Status of the clock in the context
      const {
            // Clock status
            clockStatus,

            // Pause state
            isPaused,
            setIsPaused,

            // Reset state
            setReset,

            // Simple mode
            isSimpleMode,
            setIsSimpleMode,

            // Simple mode configuration
            simpleTimerInfo,
            setSimpleTimerInfo,
      } = useClockStatus();

      //Change mode
      const changeToSimple = () => {
            if (clockStatus !== ClockStatus.PAUSED && clockStatus !== ClockStatus.RUNNING) {
                  setIsSimpleMode(true);
            } else {
                  const resetButton = document.getElementById("resetButton");
                  if (resetButton) {
                        resetButton.classList.add("button-error-animation");
                        setTimeout(() => {
                              resetButton.classList.remove("button-error-animation");
                        }, 300); // Remove the class after 300ms
                  }
                  const modeSelection = document.getElementById("modeSelection");
                  if (modeSelection) {
                        modeSelection.classList.add("button-error-animation");
                        setTimeout(() => {
                              modeSelection.classList.remove("button-error-animation");
                        }, 300)
                  }
            }
      };

      const changeToCustom = () => {
            if (clockStatus !== ClockStatus.PAUSED && clockStatus !== ClockStatus.RUNNING) {
                  setIsSimpleMode(false);
            } else {
                  const resetButton = document.getElementById("resetButton");
                  if (resetButton) {
                        resetButton.classList.add("button-error-animation");
                        setTimeout(() => {
                              resetButton.classList.remove("button-error-animation");
                        }, 300); // Remove the class after 300ms
                  }
                  const modeSelection = document.getElementById("modeSelection");
                  if (modeSelection) {
                        modeSelection.classList.add("button-error-animation");
                        setTimeout(() => {
                              modeSelection.classList.remove("button-error-animation");
                        }, 300)
                  }
            }
      };

      //Start or stop
      const handlePauseStart = useCallback(() => {
            if (
                  isSimpleMode &&
                  (simpleTimerInfo.workLapDuration === 0 ||
                        simpleTimerInfo.restLapDuration === 0)
            ) {
                  setSimpleTimerInfo({
                        ...simpleTimerInfo,
                        currentAnimation: AnimationType.EMPTY_LAPS_DURATION,
                  });
                  return;
            } else {
                  // Initialize audio context when starting (required for iOS)
                  if (isPaused) {
                        initializeAudioContext().catch(console.error);
                        // Auto-expand when starting
                        if (!isExpanded) {
                              expand();
                        }
                  }
                  setIsPaused(!isPaused);
                  setIsClickedPause(true);
                  setTimeout(() => setIsClickedPause(false), 300);
            }
      }, [isSimpleMode, simpleTimerInfo, isPaused, isExpanded]);

      const handleReset = useCallback(() => {
            if (clockStatus === ClockStatus.ZERO) {
                  setSimpleTimerInfo({
                        ...simpleTimerInfo,
                        currentAnimation: AnimationType.ALREADY_RESET,
                  });
            }

            setIsPaused(true);
            setReset(true);
            setTimeout(() => setReset(false), 100);
            setIsClickedReset(true);
            setTimeout(() => setIsClickedReset(false), 300);
      }, [clockStatus, simpleTimerInfo]);

      const expand = () => {
            setTimeout(() => {
                  setShowExpandLetters(false); // 200ms "Expand" disappear animation
                  setOpenAnimation(true);
                  const button = document.getElementById("expand-button");

                  if (button) {
                        const rect = button.getBoundingClientRect();
                        setButtonPosition({
                              top: rect.top,
                              left: rect.left,
                              width: rect.width,
                              height: rect.height,
                        });
                        setTimeout(() => setDivExist(true), 200); // 100ms div get same size as button animation
                        setTimeout(() => setIsExpanded(true), 300); // 700ms div expand to full screen animation
                  }
            }, 0); //0 Timeout to let react render the button before getting the position.
            setTimeout(() => setShowContent(true), 1000); // 200ms content appear animation
      };

      useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
                  if (e.code === 'Space') {
                        e.preventDefault();
                        handlePauseStart();
                  } else if (e.code === 'KeyR') {
                        handleReset();
                  }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
      }, [handlePauseStart, handleReset]);

      useEffect(() => {
            if (simpleTimerInfo.currentAnimation !== AnimationType.NONE) {
                  const timer = setTimeout(() => {
                        setSimpleTimerInfo({
                              ...simpleTimerInfo,
                              currentAnimation: AnimationType.NONE,
                        });
                  }, 300);
                  return () => clearTimeout(timer);
            }
      }, [simpleTimerInfo.currentAnimation]);

      return (
            <div className="pb-4 lg:pb-16">
                  <div className="container mx-auto p-5">
                        <div className="grid grid-cols-4 lg:grid-cols-12 gap-3 lg:gap-5 [grid-auto-rows:60px] lg:[grid-auto-rows:80px]">
                              {/* ===== HEADER ROW 1 ===== */}
                              <Header />

                              {/* ===== CLOCK SECTION (rows 2-8, cols 1-4) ===== */}
                              <Clock />

                              {/* Reset button - 2x1 */}
                              <div id="resetButton"
                                    className={`col-span-2 lg:col-start-1 lg:row-start-7 h-full bg-saffron p-4 rounded-3xl content-center hover:scale-105 transition-transform duration-200 cursor-pointer flex items-center justify-center
                                    ${isClickedReset ? "scale-animation" : ""}
                                    ${simpleTimerInfo.currentAnimation === AnimationType.ALREADY_RESET ? "button-error-animation" : ""}
                                    ${simpleTimerInfo.currentAnimation === AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00 ? "button-error-animation" : ""}`}
                                    onClick={handleReset}
                              >
                                    <p className="font-bold text-eerieBlack text-3xl lg:text-5xl text-center">
                                          {t.reset}
                                    </p>
                              </div>

                              {/* Start/Stop button - 2x1 */}
                              <div
                                    className={`col-span-2 lg:col-start-3 lg:row-start-7 h-full p-4 rounded-3xl content-center hover:scale-105 transition-transform duration-200 cursor-pointer flex items-center justify-center
                                    ${isPaused ? "dark:bg-timberwolf bg-blackOlive" : "bg-burntSienna"}
                                    ${isClickedPause ? "scale-animation" : ""}
                                    ${simpleTimerInfo.currentAnimation === AnimationType.EMPTY_LAPS_DURATION ? "button-error-animation" : ""}`}
                                    onClick={handlePauseStart}
                              >
                                    <p className="font-bold dark:text-eerieBlack text-floralWhite text-3xl lg:text-5xl text-center">
                                          {isPaused ? t.start : t.stop}
                                    </p>
                              </div>

                              {/* Expand button - 4x1 */}
                              <div className="col-span-4 lg:col-start-1 lg:row-start-8 h-full relative">
                                    <button
                                          id="expand-button"
                                          className="h-full w-full bg-floralWhite dark:bg-eerieBlack p-4 rounded-3xl flex justify-center items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                                          onClick={expand}
                                    >
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                                className={`w-8 h-8 lg:w-12 lg:h-12 fill-blackOlive dark:fill-timberwolf mr-4 transition-opacity duration-200
                                                ${showExpandLetters ? "opacity-100" : "opacity-0"}`}
                                          >
                                                <path d="M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z" />
                                          </svg>
                                          <p className={`font-bold dark:text-timberwolf text-blackOlive text-3xl lg:text-5xl text-center transition-opacity duration-200
                                                ${showExpandLetters ? "opacity-100" : "opacity-0"}`}
                                          >
                                                {t.expand}
                                          </p>
                                    </button>

                                    {/* Expanded content overlay */}
                                    <div
                                          className={`dark:bg-eerieBlack bg-floralWhite z-10 transition-all
                                          ${isExpanded ? "rounded-none" : "rounded-3xl"}
                                          ${openAnimation ? (isExpanded ? "duration-700" : "duration-100") : (divExist ? "duration-700" : "duration-100")}
                                          ${showExpandLetters ? "hidden" : ""}`}
                                          style={{
                                                position: "fixed",
                                                top: isExpanded ? 0 : buttonPosition.top,
                                                left: isExpanded ? 0 : buttonPosition.left,
                                                width: divExist ? (isExpanded ? "100vw" : `${buttonPosition.width}px`) : 0,
                                                height: divExist ? (isExpanded ? "100vh" : `${buttonPosition.height}px`) : 0,
                                                transform: divExist ? "none" : `translate(${buttonPosition.width / 2}px, ${buttonPosition.height / 2}px)`,
                                          }}
                                    >
                                          <div className={`h-full w-full transition-opacity duration-200 ${showContent ? "opacity-100" : "opacity-0"}`}>
                                                <ExpandedContent
                                                      setIsExpanded={setIsExpanded}
                                                      setShowContent={setShowContent}
                                                      setShowExpandLetters={setShowExpandLetters}
                                                      divExist={setDivExist}
                                                      openAnimation={setOpenAnimation}
                                                />
                                          </div>
                                    </div>
                              </div>

                              {/* ===== SETTINGS SECTION (rows 2-8, cols 5-12) ===== */}

                              {/* Mode selection - 8x1 */}
                              <div id="modeSelection" className="col-span-4 lg:col-span-8 lg:col-start-5 lg:row-start-2 h-full flex">
                                    {/*Simple btn*/}
                                    <div className="w-1/2 h-full rounded-3xl dark:bg-eerieBlack bg-floralWhite cursor-pointer flex flex-col overflow-hidden"
                                          onClick={changeToSimple}>

                                          {/*Title*/}
                                          <div className="px-4 flex-1 flex items-center justify-center">
                                                <p className={`font-extrabold dark:text-timberwolf text-blackOlive text-3xl lg:text-4xl text-center transition-colors duration-300`}>
                                                      {t.simple}
                                                </p>
                                          </div>

                                          {/*Bar*/}
                                          <div className="w-full h-2.5">
                                                <div className={`h-full w-full rounded-b-3xl transform duration-300
                                                      ${isSimpleMode ? "bg-jade" : "dark:bg-eerieBlack bg-floralWhite"}`}>
                                                </div>
                                          </div>
                                    </div>

                                    {/*Custom btn*/}
                                    <div
                                          className="w-1/2 h-full rounded-3xl dark:bg-eerieBlack bg-floralWhite cursor-pointer flex flex-col overflow-hidden"
                                          onClick={changeToCustom}
                                    >
                                          {/*Title*/}
                                          <div className="px-4 flex-1 flex justify-center items-center">
                                                <p className={`font-extrabold dark:text-timberwolf text-blackOlive text-3xl lg:text-4xl text-center transition-colors duration-300`}>
                                                      {t.custom}
                                                </p>
                                          </div>

                                          {/*Bar*/}
                                          <div className="w-full h-2.5">
                                                <div className={`h-full w-full rounded-b-3xl transform duration-300
                                                                  ${isSimpleMode ? "dark:bg-eerieBlack bg-floralWhite" : "bg-jade"}`}>

                                                </div>
                                          </div>
                                    </div>
                              </div>

                              {/* Work/Rest or Interval pool + Sets setter */}
                              {isSimpleMode ? <SimpleInfo /> : <CustomInfo />}
                        </div>
                  </div>

                  {/*Signature*/}
                  <footer className="container mx-auto px-5 pb-5">
                        <p className="text-blackOlive dark:text-timberwolf text-xs md:text-sm text-center pointer-events-auto">
                              {t.madeWith}{" "}
                              <a
                                    href="https://jmoreno.dev"
                                    className="underline hover:cursor-pointer hover:text-jade dark:hover:text-jade transition-colors duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                              >
                                    jmoreno.dev
                              </a>
                        </p>
                  </footer>
            </div>
      );
};

export default MainPage;
