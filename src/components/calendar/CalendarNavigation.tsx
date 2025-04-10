
import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CalendarNavigationProps {
  displayMonth: Date;
  onNavigateMonth: (direction: 'next' | 'prev') => void;
  onGoToToday: () => void;
  view: 'day' | 'week' | 'month';
  date: Date;
  onNavigateDay?: (direction: 'next' | 'prev') => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({ 
  displayMonth, 
  onNavigateMonth, 
  onGoToToday,
  view,
  date,
  onNavigateDay
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <h1 className="text-2xl font-bold text-secondary-900">Calendar & Scheduling</h1>
      <div className="flex items-center space-x-2">
        <Button onClick={onGoToToday} variant="outline" className="h-8">
          Today
        </Button>
        <div className="flex items-center border rounded-md p-1 bg-white">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onNavigateMonth('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium px-2">
            {format(displayMonth, 'MMMM yyyy')}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onNavigateMonth('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === 'day' && onNavigateDay && (
        <div className="text-sm text-secondary-600">
          {format(date, 'EEEE, MMMM d, yyyy')}
        </div>
      )}
    </div>
  );
};

export default CalendarNavigation;
