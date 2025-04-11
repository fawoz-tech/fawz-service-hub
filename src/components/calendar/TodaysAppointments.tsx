import React from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import AppointmentCard from './AppointmentCard';
import { Appointment } from "@/types/calendar";
import { useLanguage } from '@/contexts/language';

interface TodaysAppointmentsProps {
  appointments: Appointment[];
}

const TodaysAppointments: React.FC<TodaysAppointmentsProps> = ({ appointments }) => {
  const { t } = useLanguage();
  
  const todaysAppointments = appointments.filter(
    (appointment) => appointment.date === format(new Date(), 'yyyy-MM-dd')
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('calendar.appointments')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {todaysAppointments.length === 0 ? (
            <p className="text-center text-secondary-500 py-8">{t('calendar.no_appointments')}</p>
          ) : (
            todaysAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysAppointments;
