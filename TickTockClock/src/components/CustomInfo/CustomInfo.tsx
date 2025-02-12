import React, { useState } from 'react';
import './CustomInfo.css';
import { useClockStatus } from '../../context/ClockContext';
import IntervalCard from './IntervalCard';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import CreateIntervalForm from './CreateIntervalForm';
import { UUIDTypes } from 'uuid';
import { Interval } from '../../types/CustomTimerInfo';
import { ClockStatus } from '../../types';

const CustomInfo: React.FC = () => {

      const {
            clockStatus,
            customTimerInfo,
            setCustomTimerInfo,
      } = useClockStatus();

      //Control the animation of + or - when clicked
      const [plusClicked, setPlusClicked] = useState(false);
      const [minusClicked, setMinusClicked] = useState(false);

      const handleSetsUp = () => {
            if (clockStatus == ClockStatus.RUNNING || clockStatus == ClockStatus.PAUSED) {
                  const setsUpCustom = document.getElementById("setsUpCustom");
                  if (setsUpCustom) {
                        setsUpCustom.classList.add("button-error-animation");
                        setTimeout(() => {
                              setsUpCustom.classList.remove("button-error-animation");
                        }, 300); // Remove the class after 300ms
                  }
                  const resetButton = document.getElementById("resetButton");
                  if (resetButton) {
                        resetButton.classList.add("button-error-animation");
                        setTimeout(() => {
                              resetButton.classList.remove("button-error-animation");
                        }, 300); // Remove the class after 300ms
                  }
            } else {
                  setCustomTimerInfo({ ...customTimerInfo, sets: customTimerInfo.sets + 1 })
                  setPlusClicked(true);
                  setTimeout(() => setPlusClicked(false), 300);
            }
      };

      const handleSetsDown = () => {


            if (clockStatus == ClockStatus.RUNNING || clockStatus == ClockStatus.PAUSED) {
                  const setsDownCustom = document.getElementById("setsDownCustom");
                  if (setsDownCustom) {
                        setsDownCustom.classList.add("button-error-animation");
                        setTimeout(() => {
                              setsDownCustom.classList.remove("button-error-animation");
                        }, 300); // Remove the class after 300ms
                  }
                  const resetButton = document.getElementById("resetButton");
                  if (resetButton) {
                        resetButton.classList.add("button-error-animation");
                        setTimeout(() => {
                              resetButton.classList.remove("button-error-animation");
                        }, 300); // Remove the class after 300ms
                  }
            } else {
                  if (customTimerInfo.sets > 1) {
                        setCustomTimerInfo({ ...customTimerInfo, sets: customTimerInfo.sets - 1 });
                        setMinusClicked(true);
                        setTimeout(() => setMinusClicked(false), 300);
                  }
            }
      };

      const onDragEnd = (result: DropResult) => {
            // If there's no destination (dropped outside the area), do nothing
            if (!result.destination) return;

            // Clone the intervals array
            const items = Array.from(customTimerInfo.intervals);

            // Remove the item from the source index
            const [reorderedItem] = items.splice(result.source.index, 1);

            // Insert the item at the destination index
            items.splice(result.destination.index, 0, reorderedItem);

            // Update the state with the new order
            setCustomTimerInfo({
                  ...customTimerInfo,
                  intervals: items
            });
      };

      // State variables for the animation logic
      const [isFormExpanded, setIsFormExpanded] = useState(false);
      const [showFormContent, setShowFormContent] = useState(false);
      const [showAddLetters, setShowAddLetters] = useState(true);
      const [divFormExist, setDivFormExist] = useState(false);
      const [openFormAnimation, setOpenFormAnimation] = useState(false);
      const [formButtonPosition, setFormButtonPosition] = useState({
            top: 0,
            left: 0,
            width: 0,
            height: 0,
      });

      // Function to trigger the animation and show the form
      const showForm = () => {
            if (clockStatus == ClockStatus.RUNNING || clockStatus == ClockStatus.PAUSED) {
                  //Error animation
                  const addButton = document.getElementById("add-button");
                  if (addButton) {
                        addButton.classList.add("button-error-animation");
                        setTimeout(() => {
                              addButton.classList.remove("button-error-animation");
                        }, 300); // Remove the class after 300ms
                  }
                  const resetButton = document.getElementById("resetButton");
                  if (resetButton) {
                        resetButton.classList.add("button-error-animation");
                        setTimeout(() => {
                              resetButton.classList.remove("button-error-animation");
                        }, 300); // Remove the class after 300ms
                  }
            } else {
                  // Use a zero-timeout so React renders the button before measuring its position.
                  setTimeout(() => {
                        // Start by hiding the "Add" text
                        setShowAddLetters(false);
                        setOpenFormAnimation(true);

                        // Get the button position and dimensions
                        const button = document.getElementById("add-button");
                        if (button) {
                              const rect = button.getBoundingClientRect();
                              setFormButtonPosition({
                                    top: rect.top,
                                    left: rect.left,
                                    width: rect.width,
                                    height: rect.height,
                              });

                              // After a short delay, indicate that the container div should exist (matching the button's size)
                              setTimeout(() => setDivFormExist(true), 200);
                              // Then trigger the expansion to full screen (or your target size)
                              setTimeout(() => setIsFormExpanded(true), 300);
                        }
                  }, 0);
                  // Finally, once the container is expanded, reveal the form content
                  setTimeout(() => setShowFormContent(true), 1000);
            }
      };

      const handleDeleteInterval = (id: UUIDTypes) => {
            setCustomTimerInfo({
                  ...customTimerInfo,
                  intervals: customTimerInfo.intervals.filter((interval) => interval.id !== id),
            });
      };

      const updateInterval = (updatedInterval: Interval) => {
            setCustomTimerInfo({
                  ...customTimerInfo,
                  intervals: customTimerInfo.intervals.map((interval) =>
                        interval.id === updatedInterval.id ? updatedInterval : interval
                  ),
            });
      };

      const errorDragDrop = () => {
            const intervalsContainer = document.getElementById("intervalsContainer");
            if (intervalsContainer) {
                  intervalsContainer.classList.add("button-error-animation");
                  setTimeout(() => {
                        intervalsContainer.classList.remove("button-error-animation");
                  }, 300); // Remove the class after 300ms
            }
            const resetButton = document.getElementById("resetButton");
            if (resetButton) {
                  resetButton.classList.add("button-error-animation");
                  setTimeout(() => {
                        resetButton.classList.remove("button-error-animation");
                  }, 300); // Remove the class after 300ms
            }
      }

      return (
            <>
                  {/* Main drag and drop wrapper that handles drag end events */}
                  {clockStatus === ClockStatus.RUNNING || clockStatus === ClockStatus.PAUSED ? (
                        <div id="intervalsContainer" onClick={errorDragDrop} className="order-9 lg:order-6 lg:col-span-8 col-span-12 lg:row-span-4 row-span-6 rounded-3xl bg-floralWhite dark:bg-eerieBlack px-4 py-6">
                              {/* Scrollable container for interval cards */}
                              <div className="overflow-y-scroll flex flex-col gap-2 h-full pr-2">
                                    {customTimerInfo.intervals.map((interval, index) => (
                                          <div key={index}>
                                                <IntervalCard interval={interval} onDelete={handleDeleteInterval} onUpdate={updateInterval} />
                                          </div>
                                    ))}
                              </div>
                        </div>
                  ) : (
                        <DragDropContext onDragEnd={onDragEnd}>
                              {/* Droppable area where items can be dropped */}
                              <Droppable droppableId="intervals">
                                    {(provided) => (
                                          <div
                                                className="order-9 lg:order-6 lg:col-span-8 col-span-12 lg:row-span-4 row-span-6 rounded-3xl bg-floralWhite dark:bg-eerieBlack px-4 py-6"
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                          >
                                                {/* Scrollable container for interval cards */}
                                                <div className="overflow-y-scroll flex flex-col gap-2 h-full pr-2"
                                                      ref={(el) => {
                                                            // Attach the scroll container to the Droppable
                                                            if (el) {
                                                                  provided.innerRef(el);
                                                            }
                                                      }}>
                                                      {/* Map through intervals to create draggable items */}
                                                      {customTimerInfo.intervals.map((interval, index) => (
                                                            <Draggable
                                                                  key={index}
                                                                  draggableId={`interval-${index}`}
                                                                  index={index}
                                                            >
                                                                  {(provided) => (
                                                                        <div
                                                                              ref={provided.innerRef}
                                                                              {...provided.draggableProps}
                                                                              {...provided.dragHandleProps}
                                                                        >
                                                                              <IntervalCard interval={interval} onDelete={handleDeleteInterval} onUpdate={updateInterval} />
                                                                        </div>
                                                                  )}
                                                            </Draggable>
                                                      ))}
                                                      {/* Placeholder maintains space during dragging */}
                                                      {provided.placeholder}
                                                </div>
                                          </div>
                                    )}
                              </Droppable>
                        </DragDropContext>
                  )}


                  {/* Sets  */}
                  <div className='order-10 lg:order-11 lg:col-span-8 col-span-12 lg:row-span-1 row-span-2 rounded-3xl flex flex-col lg:flex-row items-center lg:gap-5 gap-3'>

                        <div className='h-1/2 lg:h-full w-full lg:w-4/5 flex lg:gap-5 gap-3'>

                              {/* Sets */}
                              <div className='dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/4 flex items-center justify-center'>
                                    <p className="dark:text-timberwolf text-blackOlive xl:text-5xl lg:text-4 text-3xl font-black">Sets</p>
                              </div>

                              {/* Sets down */}
                              <div id="setsDownCustom"
                                    className={`dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/4 flex items-center justify-center 
                hover:scale-105 transition-transform duration-200 cursor-pointer
                ${minusClicked ? 'scale-animation' : ''}`}
                                    onClick={handleSetsDown}
                              >
                                    <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-4xl font-black pb-2">-</p>
                              </div>

                              {/* Number of sets */}
                              <div className='dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/4 flex items-center justify-center'>
                                    <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-4xl font-black">{customTimerInfo.sets}</p>
                              </div>

                              {/* Sets up */}
                              <div id='setsUpCustom' className={`dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/4 flex items-center justify-center 
                hover:scale-105 transition-transform duration-200 cursor-pointer
                ${plusClicked ? 'scale-animation' : ''}`}
                                    onClick={handleSetsUp}
                              >
                                    <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-4xl font-black pb-2">+</p>
                              </div>
                        </div>

                        <div className='w-full lg:w-1/5 h-1/2 lg:h-full'>
                              {/* Add an interval */}
                              <button id="add-button" className="bg-jade rounded-3xl h-full w-full flex items-center justify-center 
                              hover:scale-105 transition-transform duration-200 cursor-pointer"
                                    onClick={showForm}>

                                    <p className="dark:text-eerieBlack text-blackOlive lg:text-5xl text-4xl font-black pb-2">
                                          Add
                                    </p>

                              </button>
                        </div>





                        {/* The animated container that will display the CreateIntervalForm */}
                        <div className={`bg-jade z-10 transition-all
                                          ${isFormExpanded ? "rounded-none" : "rounded-3xl"}
                                          ${openFormAnimation ?
                                    (isFormExpanded ? "duration-700" : "duration-100")
                                    :
                                    (divFormExist ? "duration-700" : "duration-100")}
                                          ${showAddLetters ? "hidden" : ""}`}
                              style={{
                                    position: "fixed",
                                    top: isFormExpanded ? 0 : formButtonPosition.top,
                                    left: isFormExpanded ? 0 : formButtonPosition.left,
                                    width: divFormExist ?
                                          isFormExpanded ? "100vw" : `${formButtonPosition.width}px`
                                          :
                                          0,
                                    height: divFormExist ?
                                          isFormExpanded ? "100vh" : `${formButtonPosition.height}px`
                                          :
                                          0,
                                    transform: divFormExist ? "none" : `translate(${formButtonPosition.width / 2}px, ${formButtonPosition.height / 2}px)`,
                              }}>
                              <div className={`h-full w-full transition-opacity duration-200 
                                    ${showFormContent ? "opacity-100" : "opacity-0"}`} >

                                    <CreateIntervalForm
                                          setIsFormExpanded={setIsFormExpanded}
                                          setShowFormContent={setShowFormContent}
                                          setShowAddLetters={setShowAddLetters}
                                          setDivFormExist={setDivFormExist}
                                          openFormAnimation={setOpenFormAnimation}
                                    />

                              </div>
                        </div>
                  </div>
            </>
      );
};

export default CustomInfo; 