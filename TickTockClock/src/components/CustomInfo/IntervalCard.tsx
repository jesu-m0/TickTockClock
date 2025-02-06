import { useState } from "react";
import { Interval } from "../../types/CustomTimerInfo";
import { UUIDTypes } from "uuid";

interface IntervalCardProps {
      interval: Interval;
      onDelete: (id: UUIDTypes) => void; // Callback to delete the interval
}

const IntervalCard = ({ interval, onDelete }: IntervalCardProps) => {
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

      // Function to handle opening the modal
      const handleDeleteClick = () => {
            setIsDeleteModalOpen(true);
      };

      // Function to handle closing the modal
      const handleCloseModal = () => {
            setIsDeleteModalOpen(false);
      };

      // Function to handle confirming the deletion
      const handleConfirmDelete = () => {
            onDelete(interval.id); // Call the parent's delete function
            setIsDeleteModalOpen(false); // Close the modal
      };

      return (
            <>
                  {/* Interval Card */}
                  <div className="bg-blackOlive rounded-xl p-2 flex gap-2">
                        {/* Drag Handle */}
                        <div className="flex items-center cursor-grab">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="9" cy="6" r="2" fill="#CCC5B9" />
                                    <circle cx="9" cy="12" r="2" fill="#CCC5B9" />
                                    <circle cx="9" cy="18" r="2" fill="#CCC5B9" />
                                    <circle cx="15" cy="6" r="2" fill="#CCC5B9" />
                                    <circle cx="15" cy="12" r="2" fill="#CCC5B9" />
                                    <circle cx="15" cy="18" r="2" fill="#CCC5B9" />
                              </svg>
                        </div>

                        {/* Color Indicator */}
                        <div className="flex items-center select-none">
                              <div className="rounded-full w-10 h-10 border-2" style={{ backgroundColor: interval.color }} />
                        </div>

                        {/* Interval Name */}
                        <div className="flex items-center">
                              <p className="font-bold text-timberwolf text-2xl">{interval.name}</p>
                        </div>

                        {/* Time */}
                        <div className="flex items-center ml-auto bg-timberwolf rounded-2xl px-4 py-2">
                              <p className="text-eerieBlack text-2xl font-extrabold">
                                    {Math.floor(interval.duration / 60).toString().padStart(2, "0")}:
                                    {(interval.duration % 60).toString().padStart(2, "0")}
                              </p>
                        </div>

                        {/* Manage Buttons */}
                        <div className="flex items-center gap-2">
                              {/* Edit Button */}
                              <button className="p-2 hover:bg-charcoal rounded-lg transition-colors group">
                                    <svg className="w-8 h-8" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path
                                                d="M11.4001 18.1612L11.4001 18.1612L18.796 10.7653C17.7894 10.3464 16.5972 9.6582 15.4697 8.53068C14.342 7.40298 13.6537 6.21058 13.2348 5.2039L5.83882 12.5999L5.83879 12.5999C5.26166 13.1771 4.97307 13.4657 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L7.47918 20.5844C8.25351 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5343 19.0269 10.823 18.7383 11.4001 18.1612Z"
                                                className="fill-timberwolf group-hover:fill-floralWhite transition-colors"
                                          />
                                          <path
                                                d="M20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178L14.3999 4.03882C14.4121 4.0755 14.4246 4.11268 14.4377 4.15035C14.7628 5.0875 15.3763 6.31601 16.5303 7.47002C17.6843 8.62403 18.9128 9.23749 19.85 9.56262C19.8875 9.57563 19.9245 9.58817 19.961 9.60026L20.8482 8.71306Z"
                                                className="fill-timberwolf group-hover:fill-floralWhite transition-colors"
                                          />
                                    </svg>
                              </button>

                              {/* Delete Button */}
                              <button onClick={handleDeleteClick} className="p-2 hover:bg-charcoal rounded-lg transition-colors group">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path
                                                d="M8 1.5V2.5H3C2.44772 2.5 2 2.94772 2 3.5V4.5C2 5.05228 2.44772 5.5 3 5.5H21C21.5523 5.5 22 5.05228 22 4.5V3.5C22 2.94772 21.5523 2.5 21 2.5H16V1.5C16 0.947715 15.5523 0.5 15 0.5H9C8.44772 0.5 8 0.947715 8 1.5Z"
                                                className="fill-timberwolf group-hover:fill-burntSienna transition-colors"
                                          />
                                          <path
                                                d="M3.9231 7.5H20.0767L19.1344 20.2216C19.0183 21.7882 17.7135 23 16.1426 23H7.85724C6.28636 23 4.98148 21.7882 4.86544 20.2216L3.9231 7.5Z"
                                                className="fill-timberwolf group-hover:fill-burntSienna transition-colors"
                                          />
                                    </svg>
                              </button>
                        </div>
                  </div>

                  {/* Delete Confirmation Modal */}
                  {isDeleteModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg">
                              <div className="bg-blackOlive p-10 rounded-2xl shadow-lg max-w-md w-full">
                                    <h2 className="text-timberwolf text-5xl font-black mb-4">Are you sure?</h2>
                                    <p className="text-timberwolf/70 mb-6 text-xl font-semibold">
                                          This action will permanently delete the interval "{interval.name}".
                                    </p>
                                    <div className="flex justify-evenly gap-4">
                                          <button
                                                onClick={handleCloseModal}
                                                className="px-8 py-4 bg-timberwolf text-blackOlive rounded-2xl hover:bg-floralWhite transition-colors text-2xl font-bold"
                                          >
                                                Cancel
                                          </button>
                                          <button
                                                onClick={handleConfirmDelete}
                                                className="px-8 py-4 bg-burntSienna text-white rounded-2xl hover:bg-red-700 transition-colors text-2xl font-bold"
                                          >
                                                Delete
                                          </button>
                                    </div>
                              </div>
                        </div>
                  )}
            </>
      );
};

export default IntervalCard;