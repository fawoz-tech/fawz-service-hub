
import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppointmentCard from './AppointmentCard';
import { Appointment } from "@/types/calendar";

interface DayViewProps {
  date: Date;
  appointments: Appointment[];
  onNavigateDay: (direction: 'next' | 'prev') => void;
}

const DayView: React.FC<DayViewProps> = ({ date, appointments, onNavigateDay }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle>Appointments</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onNavigateDay('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onNavigateDay('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-center text-secondary-500 py-8">No appointments scheduled for this day</p>
          ) : (
            appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DayView;
