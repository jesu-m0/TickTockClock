import React, { useState } from 'react';
import './CustomInfo.css';
import { useClockStatus } from '../../context/ClockContext';
import IntervalCard from './IntervalCard';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

const CustomInfo: React.FC = () => {

      const {
            customTimerInfo,
            setCustomTimerInfo,
      } = useClockStatus();

      //Control the animation of + or - when clicked
      const [plusClicked, setPlusClicked] = useState(false);
      const [minusClicked, setMinusClicked] = useState(false);

      const handleSetsUp = () => {
            setCustomTimerInfo({ ...customTimerInfo, sets: customTimerInfo.sets + 1 })
            setPlusClicked(true);
            setTimeout(() => setPlusClicked(false), 300);
      };

      const handleSetsDown = () => {
            if (customTimerInfo.sets > 1) {
                  setCustomTimerInfo({ ...customTimerInfo, sets: customTimerInfo.sets - 1 });
                  setMinusClicked(true);
                  setTimeout(() => setMinusClicked(false), 300);
            }
      };

      const createNewInterval = () => {
            //TODO: open "modal" to create a new interval
      }

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

      return (
            <>
                  {/* Main drag and drop wrapper that handles drag end events */}
                  <DragDropContext onDragEnd={onDragEnd}>
                        {/* Droppable area where items can be dropped */}
                        <Droppable droppableId="intervals">
                              {(provided) => (
                                    <div
                                          className="order-9 lg:order-6 lg:col-span-8 col-span-12 lg:row-span-4 row-span-6 rounded-3xl bg-eerieBlack px-4 py-6"
                                          {...provided.droppableProps}
                                          ref={provided.innerRef}
                                    >
                                          {/* Scrollable container for interval cards */}
                                          <div className="overflow-y-scroll flex flex-col gap-2 h-full pr-2">
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
                                                                        <IntervalCard interval={interval} />
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


                  {/* Sets  */}
                  <div className='order-10 lg:order-11 lg:col-span-8 col-span-12 lg:row-span-1 row-span-1 rounded-3xl flex items-center lg:gap-5 gap-3'>


                        <div className='dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center'>
                              <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-3xl font-black">Sets</p>
                        </div>


                        <div
                              className={`dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center 
                hover:scale-105 transition-transform duration-200 cursor-pointer
                ${minusClicked ? 'scale-animation' : ''}`}
                              onClick={handleSetsDown}
                        >
                              <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-4xl font-black pb-2">-</p>
                        </div>


                        <div className='dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center'>
                              <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-4xl font-black">{customTimerInfo.sets}</p>
                        </div>


                        <div
                              className={`dark:bg-eerieBlack bg-floralWhite rounded-3xl h-full w-1/5 flex items-center justify-center 
                hover:scale-105 transition-transform duration-200 cursor-pointer
                ${plusClicked ? 'scale-animation' : ''}`}
                              onClick={handleSetsUp}
                        >
                              <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-4xl font-black pb-2">+</p>
                        </div>


                        <div
                              className={`bg-jade rounded-3xl h-full w-1/5 flex items-center justify-center 
                hover:scale-105 transition-transform duration-200 cursor-pointer
                `}
                              onClick={createNewInterval}
                        >
                              <p className="dark:text-timberwolf text-blackOlive lg:text-5xl text-4xl font-black pb-2">Add</p>
                        </div>
                  </div>
            </>
      );
};

export default CustomInfo; 