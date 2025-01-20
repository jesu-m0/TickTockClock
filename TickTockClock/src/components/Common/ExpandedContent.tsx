import React from "react";

interface ExpandedContentProps {
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setShowContent: React.Dispatch<React.SetStateAction<boolean>>;
  setShowExpandLetters: React.Dispatch<React.SetStateAction<boolean>>;
  divExist: React.Dispatch<React.SetStateAction<boolean>>;
  openAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

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
      <div className="h-[75vh] w-[100vw] bg-timberwolf">
        <button onClick={unexpand}>Close</button>
        <p>CLOCK</p>
      </div>
      <div className="h-[25vh] w-[100vw] bg-eerieBlack">
        <p>1</p>
      </div>
    </>
  );
};

export default ExpandedContent;
