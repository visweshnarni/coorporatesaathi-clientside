import React, { useState, useMemo } from 'react';
import { CalendarEvent } from '../../../types';
import { mockCalendarEvents } from './data';
import { ChevronDownIcon } from '../../icons/Icons';

const eventStyles: Record<CalendarEvent['type'], { bg: string; text: string }> = {
    deadline: { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-300' },
    consultation: { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-800 dark:text-blue-300' },
    reminder: { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-800 dark:text-yellow-300' },
};

const CalendarView: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const { year, month, monthName, daysInMonth, startingDay } = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startingDay = new Date(year, month, 1).getDay();
        return { year, month, monthName, daysInMonth, startingDay };
    }, [currentDate]);

    const eventsByDate = useMemo(() => {
        const map = new Map<number, CalendarEvent[]>();
        mockCalendarEvents.forEach(event => {
            const eventDate = new Date(event.date);
            if (eventDate.getFullYear() === year && eventDate.getMonth() === month) {
                const day = eventDate.getDate();
                if (!map.has(day)) {
                    map.set(day, []);
                }
                map.get(day)?.push(event);
            }
        });
        return map;
    }, [year, month]);
    
    const changeMonth = (offset: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + offset);
            return newDate;
        });
    };

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="space-y-6 animate-fade-in">
             <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-gray-200">Calendar</h2>
                <p className="text-text-secondary dark:text-gray-400 mt-1">Keep track of important deadlines and appointments.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">&lt;</button>
                    <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200">{monthName}</h3>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">&gt;</button>
                </div>
                <div className="grid grid-cols-7">
                    {weekDays.map(day => (
                        <div key={day} className="text-center font-semibold text-xs text-text-secondary dark:text-gray-400 py-3 border-b border-r dark:border-gray-700">{day}</div>
                    ))}
                    {Array.from({ length: startingDay }).map((_, i) => (
                         <div key={`empty-${i}`} className="border-r border-b dark:border-gray-700 min-h-[120px]"></div>
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                        const day = dayIndex + 1;
                        const events = eventsByDate.get(day) || [];
                        const isToday = new Date().getFullYear() === year && new Date().getMonth() === month && new Date().getDate() === day;
                        return (
                            <div key={day} className="border-r border-b dark:border-gray-700 min-h-[120px] p-2 flex flex-col">
                                <span className={`font-semibold text-sm ${isToday ? 'bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center' : 'text-text-primary dark:text-gray-300'}`}>{day}</span>
                                <div className="mt-1 space-y-1 overflow-y-auto">
                                    {events.map(event => (
                                        <div key={event.id} title={event.title} className={`p-1 rounded text-xs ${eventStyles[event.type].bg} ${eventStyles[event.type].text} truncate`}>
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
