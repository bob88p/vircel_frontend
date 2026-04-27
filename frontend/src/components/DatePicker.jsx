import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // value is string 'YYYY-MM-DD'
  // Handle timezone offsets safely by parsing parts or using local time
  const [year, month, day] = value ? value.split('-').map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
  const currentDate = new Date(year, month - 1, day);
  
  const [viewDate, setViewDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDateClick = (d) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const dd = String(newDate.getDate()).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Format display date: e.g., "Oct 24, 2024"
  const displayDate = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="relative" ref={containerRef}>
      <div 
        className="flex items-center gap-4 bg-white border-4 border-bauhaus-black p-2 shadow-bauhaus-sm cursor-pointer hover:bg-bauhaus-yellow transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIcon size={24} strokeWidth={2.5} className="text-bauhaus-black" />
        <span className="font-bold uppercase tracking-widest text-sm text-bauhaus-black">Date:</span>
        <span className="font-black text-lg text-bauhaus-black min-w-[120px] select-none">{displayDate}</span>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-white border-4 border-bauhaus-black shadow-bauhaus-lg w-[320px]">
          <div className="flex justify-between items-center p-4 border-b-4 border-bauhaus-black bg-bauhaus-blue text-white">
            <button 
              onClick={handlePrevMonth}
              className="p-1 hover:bg-white hover:text-bauhaus-black border-2 border-transparent hover:border-bauhaus-black transition-colors rounded-sm focus:outline-none"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <div className="font-black tracking-widest uppercase text-lg">
              {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
            </div>
            <button 
              onClick={handleNextMonth}
              className="p-1 hover:bg-white hover:text-bauhaus-black border-2 border-transparent hover:border-bauhaus-black transition-colors rounded-sm focus:outline-none"
            >
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          </div>
          
          <div className="p-4 bg-canvas">
            <div className="grid grid-cols-7 gap-1 mb-3">
              {dayNames.map(day => (
                <div key={day} className="text-center font-black text-xs uppercase tracking-tighter text-bauhaus-black opacity-60">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = 
                  currentDate.getDate() === day && 
                  currentDate.getMonth() === viewDate.getMonth() && 
                  currentDate.getFullYear() === viewDate.getFullYear();
                  
                const today = new Date();
                const isToday = 
                  today.getDate() === day && 
                  today.getMonth() === viewDate.getMonth() && 
                  today.getFullYear() === viewDate.getFullYear();

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`
                      h-10 w-full flex items-center justify-center font-bold text-sm border-2 transition-all focus:outline-none
                      ${isSelected 
                        ? 'bg-bauhaus-red border-bauhaus-black text-white shadow-bauhaus-sm z-10 scale-110' 
                        : isToday
                          ? 'bg-bauhaus-yellow border-bauhaus-black text-bauhaus-black shadow-sm'
                          : 'bg-white border-transparent text-bauhaus-black hover:border-bauhaus-black hover:shadow-bauhaus-sm'
                      }
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
