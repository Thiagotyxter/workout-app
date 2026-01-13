import React from 'react';
import { DAYS } from '../data/workouts';

const DaySelector = ({ selectedDay, onDayChange }) => {
    return (
        <div className="w-full bg-dark-900/80 backdrop-blur-lg border-b border-dark-700/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {DAYS.map((day) => (
                        <button
                            key={day.id}
                            onClick={() => onDayChange(day.id)}
                            className={`
                day-tab flex-shrink-0 min-w-[100px] sm:min-w-[120px]
                ${selectedDay === day.id ? 'day-tab-active' : 'day-tab-inactive'}
              `}
                        >
                            <div className="text-center">
                                <div className="text-xs sm:text-sm font-bold mb-1">
                                    {day.short}
                                </div>
                                <div className="text-[10px] sm:text-xs opacity-90 font-normal">
                                    {day.workout}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DaySelector;
