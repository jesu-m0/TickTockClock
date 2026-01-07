import React, { useState, useEffect } from "react";
import Header from "./Common/Header.tsx";
import Clock from "./Common/Clock.tsx";
import "./mainPage.css";
import SimpleInfo from "./SimpleInfo/SimpleInfo";
import CustomInfo from "./CustomInfo/CustomInfo";
import { AnimationType, ClockStatus } from "../types";
import { useClockStatus } from "../context/ClockContext";
import ExpandedContent from "./Common/ExpandedContent.tsx";
import { initializeAudioContext } from "../utils/soundNotification";

const MainPage: React.FC = () => {
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
      const handlePauseStart = () => {
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
                  }
                  setIsPaused(!isPaused);
                  setIsClickedPause(true);
                  setTimeout(() => setIsClickedPause(false), 300);
            }
      };

      const handleReset = () => {
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
      };

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
            <div>
                  <div className="container mx-auto p-5">
                        <div className="grid grid-cols-12 lg:gap-5 gap-3 lg:auto-rows-[100px] auto-rows-[10vh]">
                              <Header></Header>

                              {/*Clock */}
                              <div
                                    className={`order-4 lg:order-4 lg:col-span-4 col-span-12 row-span-4 rounded-3xl content-center flex flex-col lg:gap-5 gap-3
                                    ${simpleTimerInfo.currentAnimation ===
                                                AnimationType.ALREADY_RESET ||
                                                simpleTimerInfo.currentAnimation ===
                                                AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00
                                                ? "button-error-animation"
                                                : ""
                                          }`}
                              >
                                    <Clock></Clock>
                              </div>

                              {/*Mode selection*/}
                              <div id="modeSelection" className="order-8 lg:order-5 lg:col-span-8 col-span-12 row-span-1 content-center flex">
                                    {/*Simple btn*/}
                                    <div className="w-1/2 h-full rounded-3xl content-center dark:bg-eerieBlack bg-floralWhite cursor-pointer flex flex-col overflow-hidden"
                                          onClick={changeToSimple}>

                                          {/*Title*/}
                                          <div className="lg:pt-4 pt-2 px-4 h-4/5 flex items-center justify-center">
                                                <p className={`font-extrabold dark:text-timberwolf text-blackOlive text-2xl lg:text-4xl text-center transition-colors duration-300`}>
                                                      Simple
                                                </p>
                                          </div>

                                          {/*Bar*/}
                                          <div className="w-full flex flex-row h-1/5">
                                                <div className={`h-full flex-1 rounded-b-3xl transform duration-300
                                                      ${isSimpleMode ? "bg-jade" : "dark:bg-eerieBlack bg-floralWhite"}`}>
                                                </div>
                                          </div>
                                    </div>

                                    {/*Custom btn*/}
                                    <div
                                          className="w-1/2 h-full rounded-3xl content-center dark:bg-eerieBlack bg-floralWhite cursor-pointer flex flex-col overflow-hidden"
                                          onClick={changeToCustom}
                                    >
                                          {/*Title*/}
                                          <div className="pt-2 lg:pt-4 px-4 h-4/5 flex justify-center items-center">
                                                <p className={`font-extrabold dark:text-timberwolf text-blackOlive text-2xl lg:text-4xl text-center transition-colors duration-300`}>
                                                      Custom
                                                </p>
                                          </div>

                                          {/*Bar*/}
                                          <div className="w-full flex flex-row h-1/5">
                                                <div className={`h-full flex-1 rounded-b-3xl transform duration-300 
                                                                  ${isSimpleMode ? "dark:bg-eerieBlack bg-floralWhite" : "bg-jade"}`}>

                                                </div>
                                          </div>
                                    </div>
                              </div>

                              {isSimpleMode ? <SimpleInfo /> : <CustomInfo />}

                              {/*Reset*/}
                              <div id="resetButton"
                                    className={`order-5 lg:order-7 lg:col-span-2 col-span-6 row-span-1 bg-saffron p-4 rounded-3xl content-center hover:scale-105 transition-transform duration-200 cursor-pointer 
          ${isClickedReset ? "scale-animation" : ""}
          ${simpleTimerInfo.currentAnimation === AnimationType.ALREADY_RESET
                                                ? "button-error-animation"
                                                : ""
                                          }
          ${simpleTimerInfo.currentAnimation ===
                                                AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00
                                                ? "button-error-animation"
                                                : ""
                                          }`}
                                    onClick={handleReset}
                              >
                                    <p className="font-bold text-eerieBlack text-4xl md:text-4xl xl:text-6xl text-center">
                                          Reset
                                    </p>
                              </div>

                              {/*Start/stop*/}
                              <div
                                    className={`order-6 lg:order-8 lg:col-span-2 col-span-6 row-span-1 p-4 rounded-3xl content-center hover:scale-105 transition-transform duration-200 cursor-pointer
                                    ${isPaused
                                                ? "dark:bg-timberwolf bg-blackOlive"
                                                : "bg-burntSienna"
                                          }
                                    ${isClickedPause ? "scale-animation" : ""}
                                    ${simpleTimerInfo.currentAnimation ===
                                                AnimationType.EMPTY_LAPS_DURATION
                                                ? "button-error-animation"
                                                : ""
                                          }`}
                                    onClick={handlePauseStart}
                              >
                                    <p className="font-bold dark:text-eerieBlack text-floralWhite text-4xl md:text-4xl xl:text-6xl text-center">
                                          {isPaused ? "Start" : "Stop"}
                                    </p> 
                              </div>

                              {/*Expand button*/}
                              <div className="order-7 lg:order-9 lg:col-span-4 col-span-12 row-span-1 relative">
                                    <button
                                          id="expand-button"
                                          className="h-full w-full bg-floralWhite dark:bg-eerieBlack p-4 rounded-3xl flex justify-center items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
                                          onClick={expand}
                                    >
                                          <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                                className={`w-8 h-8 lg:w-12 lg:h-12 fill-blackOlive dark:fill-timberwolf mr-4 
                  transition-opacity duration-200
                  ${showExpandLetters ? "opacity-100" : "opacity-0"}`}
                                          >
                                                <path d="M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z" />
                                          </svg>
                                          <p
                                                className={`font-bold dark:text-timberwolf text-blackOlive text-4xl lg:text-5xl text-center transition-opacity duration-200
                ${showExpandLetters ? "opacity-100" : "opacity-0"}`}
                                          >
                                                Expand
                                          </p>
                                    </button>

                                    {/*Expanded content*/}
                                    <div
                                          className={`dark:bg-eerieBlack bg-floralWhite z-10 transition-all
                  ${isExpanded ? "rounded-none" : "rounded-3xl"}
                  ${openAnimation ?
                                                      isExpanded ? "duration-700" : "duration-100"
                                                      :
                                                      divExist ? "duration-700" : "duration-100"}
                  ${showExpandLetters ? "hidden" : ""}`}
                                          style={{
                                                position: "fixed",
                                                top: isExpanded ? 0 : buttonPosition.top,
                                                left: isExpanded ? 0 : buttonPosition.left,
                                                width: divExist ?
                                                      isExpanded ? "100vw" : `${buttonPosition.width}px`
                                                      :
                                                      0,
                                                height: divExist ?
                                                      isExpanded ? "100vh" : `${buttonPosition.height}px`
                                                      :
                                                      0,
                                                transform: divExist ? "none" : `translate(${buttonPosition.width / 2}px, ${buttonPosition.height / 2}px)`,
                                          }}
                                    >
                                          <div
                                                className={`h-full w-full transition-opacity duration-200 ${showContent ? "opacity-100" : "opacity-0"
                                                      }`}
                                          >
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
                        </div>
                  </div>

                  {/*Signature*/}
                  <footer className="container mx-auto px-5 pb-5">
                        <p className="text-blackOlive dark:text-timberwolf text-xs md:text-sm text-center pointer-events-auto">
                              Made with {"<"}3 by{" "}
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
