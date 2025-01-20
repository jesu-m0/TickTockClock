import React from "react";

interface ExpandedContentProps {
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setShowContent: React.Dispatch<React.SetStateAction<boolean>>;
  setShowExpandLetters: React.Dispatch<React.SetStateAction<boolean>>;
  divExist: React.Dispatch<React.SetStateAction<boolean>>;
  openAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const isAlternate: boolean = true; //DUMMY

const ExpandedContent: React.FC<ExpandedContentProps> = ({
  setIsExpanded,
  setShowContent,
  setShowExpandLetters,
  divExist,
  openAnimation,
}) => {
  const unexpand = () => {
    openAnimation(false);
    setShowContent(false); //200ms content disappear animation
    setTimeout(() => setIsExpanded(false), 200); //700ms div "unexpand" to button animation
    setTimeout(() => divExist(false), 900); //100ms div disappear animation
    setTimeout(() => setShowExpandLetters(true), 1000); //200ms "Expand" appear animation
  };

  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-eerieBlack">
        <button onClick={unexpand}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-timberwolf h-12 w-12 mt-4 ml-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="flex justify-center">
          {/*Clock*/}
          <div className="bg-timberwolf h-[50vh] w-[60vw] rounded-3xl mt-[10vh] flex flex-col items-center justify-center">
            <div className="h-full flex flex-col justify-center items-center">
              <p className="text-blackOlive text-[18rem] font-black">00:00</p>
            </div>
            <div className="w-full flex flex-row">
              <div
                className={`h-6 flex-1 rounded-bl-3xl ${
                  isAlternate ? "bg-burntSienna" : "bg-jade"
                }`}
              ></div>
              <div
                className={`h-6 flex-1 ${
                  isAlternate ? "bg-jade" : "bg-burntSienna"
                }`}
              ></div>
              <div
                className={`h-6 flex-1 ${
                  isAlternate ? "bg-burntSienna" : "bg-jade"
                }`}
              ></div>
              <div
                className={`h-6 flex-1 ${
                  isAlternate ? "bg-jade" : "bg-burntSienna"
                }`}
              ></div>
              <div
                className={`h-6 flex-1 ${
                  isAlternate ? "bg-burntSienna" : "bg-jade"
                }`}
              ></div>
              <div
                className={`h-6 flex-1 ${
                  isAlternate ? "bg-jade" : "bg-burntSienna"
                }`}
              ></div>
              <div
                className={`h-6 flex-1 ${
                  isAlternate ? "bg-burntSienna" : "bg-jade"
                }`}
              ></div>
              <div
                className={`h-6 flex-1 ${
                  isAlternate ? "bg-jade" : "bg-burntSienna"
                }`}
              ></div>
              <div
                className={`h-6 flex-1 ${
                  isAlternate ? "bg-burntSienna" : "bg-jade"
                }`}
              ></div>
              <div
                className={`h-6 flex-1 rounded-br-3xl ${
                  isAlternate ? "bg-jade" : "bg-burntSienna"
                }`}
              ></div>
            </div>
          </div>

          {/*Start/stop*/}
          
          {/*Reset*/}

          {/*Laps*/}
        </div>
      </div>
    </>
  );
};

export default ExpandedContent;
