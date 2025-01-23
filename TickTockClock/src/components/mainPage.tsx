import React, { useState, useEffect } from "react";
import Header from "./Common/Header.tsx";
import Clock from "./Common/Clock.tsx";
import "./mainPage.css";
import SimpleInfo from "./SimpleInfo/SimpleInfo";
import CustomInfo from "./CustomInfo/CustomInfo";
import { AnimationType, ClockStatus } from "../types";
import { useClockStatus } from "../context/ClockContext";
import ExpandedContent from "./Common/ExpandedContent.tsx";

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
    setIsSimpleMode(true);
  };

  const changeToCustom = () => {
    setIsSimpleMode(false);
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
    }, 0);
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
        <div className="grid grid-cols-12 gap-5 auto-rows-[11vh]">
          <Header></Header>

          {/*Clock */}
          <div
            className={`order-4 md:order-4 col-span-4 row-span-4 rounded-3xl content-center flex flex-col gap-5
                                    ${
                                      simpleTimerInfo.currentAnimation ===
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
          <div className="order-5 md:order-5 col-span-8 row-span-1 content-center flex">
            {/*Simple btn*/}
            <div
              className="w-1/2 h-full rounded-3xl content-center dark:bg-eerieBlack bg-floralWhite cursor-pointer flex flex-col"
              onClick={changeToSimple}
            >
              <div className="pt-4 px-4 h-full">
                <p
                  className={`font-extrabold dark:text-timberwolf text-blackOlive text-4xl text-center pt-2 transition-colors duration-300`}
                >
                  Simple
                </p>
              </div>
              <div className="w-full flex flex-row">
                <div
                  className={`
                                                      ${
                                                        isSimpleMode
                                                          ? "bg-jade"
                                                          : "dark:bg-eerieBlack bg-floralWhite"
                                                      }
                                                      h-6 flex-1 rounded-b-3xl transform duration-300`}
                ></div>
              </div>
            </div>

            {/*Custom btn*/}
            <div
              className="w-1/2 h-full rounded-3xl content-center dark:bg-eerieBlack bg-floralWhite cursor-pointer flex flex-col"
              onClick={changeToCustom}
            >
              <div className="pt-4 px-4 h-full">
                <p
                  className={`font-extrabold dark:text-timberwolf text-blackOlive text-4xl text-center pt-2 transition-colors duration-300`}
                >
                  Custom
                </p>
              </div>
              <div className="w-full flex flex-row">
                <div
                  className={`
                ${
                  isSimpleMode ? "dark:bg-eerieBlack bg-floralWhite" : "bg-jade"
                }
                h-6 flex-1 rounded-b-3xl transform duration-300`}
                ></div>
              </div>
            </div>
          </div>

          {isSimpleMode ? (
            <SimpleInfo/>
          ) : (
            <CustomInfo />
          )}

          {/*Reset*/}
          <div
            className={`order-7 md:order-7 col-span-2 row-span-1 bg-saffron p-4 rounded-3xl content-center hover:scale-105 transition-transform duration-200 cursor-pointer 
          ${isClickedReset ? "scale-animation" : ""}
          ${
            simpleTimerInfo.currentAnimation === AnimationType.ALREADY_RESET
              ? "button-error-animation"
              : ""
          }
          ${
            simpleTimerInfo.currentAnimation ===
            AnimationType.CANT_CHANGE_LAPS_DURATION_CLOCK_NOT_00
              ? "button-error-animation"
              : ""
          }`}
            onClick={handleReset}
          >
            <p className="font-bold text-eerieBlack text-6xl text-center">
              Reset
            </p>
          </div>

          {/*Start/stop*/}
          <div
            className={`order-8 md:order-8 col-span-2 row-span-1 p-4 rounded-3xl content-center hover:scale-105 transition-transform duration-200 cursor-pointer
                                    ${
                                      isPaused
                                        ? "dark:bg-timberwolf bg-blackOlive"
                                        : "bg-burntSienna"
                                    }
                                    ${isClickedPause ? "scale-animation" : ""}
                                    ${
                                      simpleTimerInfo.currentAnimation ===
                                      AnimationType.EMPTY_LAPS_DURATION
                                        ? "button-error-animation"
                                        : ""
                                    }`}
            onClick={handlePauseStart}
          >
            <p className="font-bold dark:text-eerieBlack text-floralWhite text-6xl text-center">
              {isPaused ? "Start" : "Stop"}
            </p>
          </div>

          {/*Expand clock*/}
          <div className="order-9 md:order-9 col-span-4 row-span-1 relative">
            <button
              id="expand-button"
              className="h-full w-full bg-floralWhite dark:bg-eerieBlack p-4 rounded-3xl flex justify-center items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              onClick={expand}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className={`w-12 h-12 fill-blackOlive dark:fill-timberwolf mr-4 
                  transition-opacity duration-200
                  ${showExpandLetters ? "opacity-100" : "opacity-0"}`}
              >
                <path d="M32 32C14.3 32 0 46.3 0 64l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96z" />
              </svg>
              <p
                className={`font-bold dark:text-timberwolf text-blackOlive text-5xl text-center transition-opacity duration-200
                ${showExpandLetters ? "opacity-100" : "opacity-0"}`}
              >
                Expand
              </p>
            </button>

            {/*Expanded content*/}
            <div
              className={`dark:bg-eerieBlack bg-floralWhite z-10 transition-all
                  ${isExpanded ? "rounded-none" : "rounded-3xl"}
                  ${
                    openAnimation
                      ? isExpanded
                        ? "duration-700"
                        : "duration-100"
                      : divExist
                      ? "duration-700"
                      : "duration-100"
                  }`}
              style={{
                position: "fixed",
                top: isExpanded ? 0 : buttonPosition.top,
                left: isExpanded ? 0 : buttonPosition.left,
                width: divExist
                  ? isExpanded
                    ? "100vw"
                    : `${buttonPosition.width}px`
                  : 0,
                height: divExist
                  ? isExpanded
                    ? "100vh"
                    : `${buttonPosition.height}px`
                  : 0,
                transform: divExist
                  ? "none"
                  : `translate(${buttonPosition.width / 2}px, ${
                      buttonPosition.height / 2
                    }px)`,
              }}
            >
              <div
                className={`h-full w-full transition-opacity duration-200 ${
                  showContent ? "opacity-100" : "opacity-0"
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

        {/*Signature*/}
        <footer className="mt-5">
            <p className="text-blackOlive dark:text-timberwolf text-sm pointer-events-auto">
              Made with {'<'}3 by <a href="https://jmoreno.dev" className="underline hover:cursor-pointer hover:text-jade dark:hover:text-jade transition-colors duration-300" target="_blank" rel="noopener noreferrer">jmoreno.dev</a>
            </p>
        </footer>
      </div>
    </div>
  );
};

export default MainPage;
