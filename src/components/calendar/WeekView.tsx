
import React from 'react';
import { format, addDays, subDays } from 'date-fns';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface WeekViewProps {
  date: Date;
  onSelectDay: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ date, onSelectDay }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {Array.from({ length: 7 }).map((_, i) => {
            const day = addDays(subDays(date, date.getDay()), i);
            return (
              <div key={i} className="text-center cursor-pointer" onClick={() => onSelectDay(day)}>
                <div className="text-xs text-secondary-500">{format(day, 'EEE')}</div>
                <div
                  className={cn(
                    "rounded-full w-8 h-8 mx-auto flex items-center justify-center text-sm",
                    format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                      ? "bg-primary text-white"
                      : "text-secondary-600"
                  )}
                >
                  {format(day, 'd')}
                </div>
              </div>
            );
          })}
        </div>
        <div className="space-y-4 mt-6">
          <p className="text-center text-secondary-500 py-8">Select a day to view appointments</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeekView;
