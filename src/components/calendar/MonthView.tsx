
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';
import { Appointment } from "@/types/calendar";

interface MonthViewProps {
  date: Date;
  displayMonth: Date;
  onDateChange: (date: Date | undefined) => void;
  onMonthChange: (month: Date) => void;
  getAppointmentsForDate: (date: Date) => Appointment[];
}

const MonthView: React.FC<MonthViewProps> = ({ 
  date, 
  displayMonth, 
  onDateChange, 
  onMonthChange,
  getAppointmentsForDate 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={onDateChange}
          month={displayMonth}
          onMonthChange={onMonthChange}
          className="rounded-md border"
          components={{
            Day: (props) => {
              // Extract day from props
              const day = props.date;
              
              // Make sure day exists before trying to get appointments
              if (!day) return null;
              
              const dayAppointments = getAppointmentsForDate(day);
              return (
                <div
                  {...props}
                >
                  <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                  {dayAppointments.length > 0 && (
                    <div className="absolute bottom-1 left-0 right-0 mx-auto flex justify-center">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                    </div>
                  )}
                </div>
              );
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default MonthView;
