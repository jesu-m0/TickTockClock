import React, { useState } from "react";
import { useTranslation } from "../../i18n/useTranslation";

const ShortcutsPanel: React.FC = () => {
      const { t } = useTranslation();
      const [showShortcuts, setShowShortcuts] = useState(false);

      return (
            <>
                  {/* Keyboard shortcuts button */}
                  <button
                        onClick={() => setShowShortcuts(!showShortcuts)}
                        className="absolute top-4 left-4 z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl hover:scale-110 hover:bg-baseClr/10 dark:hover:bg-surfaceDark/20 transition-all duration-200 cursor-pointer"
                  >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 lg:w-6 lg:h-6 text-baseClr/30 dark:text-surfaceDark/40">
                              <rect x="2" y="4" width="20" height="16" rx="2" />
                              <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M8 16h8" />
                        </svg>
                  </button>

                  {/* Shortcuts card */}
                  {showShortcuts && (
                        <div className="absolute top-14 left-4 lg:top-16 z-20 bg-baseClr dark:bg-surfaceDark text-surface dark:text-muted rounded-2xl p-4 shadow-lg min-w-[180px]">
                              <div className="flex justify-between items-center mb-3">
                                    <p className="font-bold text-sm lg:text-base">{t.shortcuts}</p>
                                    <button
                                          onClick={() => setShowShortcuts(false)}
                                          className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-surface/20 transition-colors duration-200 cursor-pointer"
                                    >
                                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 6 6 18" />
                                                <path d="m6 6 12 12" />
                                          </svg>
                                    </button>
                              </div>
                              <div className="flex flex-col gap-2 text-sm">
                                    <div className="flex justify-between items-center gap-4">
                                          <p className="pointer-events-auto">{t.playPause}</p>
                                          <kbd className="bg-surface/20 px-2 pt-0 pb-1 rounded-md flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-3">
                                                      <path d="M4 8V12H20V8" />
                                                </svg>
                                          </kbd>
                                    </div>
                                    <div className="flex justify-between items-center gap-4">
                                          <p className="pointer-events-auto">{t.reset}</p>
                                          <kbd className="bg-surface/20 px-2 py-0.5 rounded-md font-mono text-xs font-bold">R</kbd>
                                    </div>
                              </div>
                        </div>
                  )}
            </>
      );
};

export default ShortcutsPanel;
