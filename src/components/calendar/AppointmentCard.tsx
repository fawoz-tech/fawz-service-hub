
import React from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types/calendar";
import { useLanguage } from '@/contexts/LanguageContext';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const { isRTL } = useLanguage();
  
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };

  const typeColors = {
    maintenance: 'border-amber-200',
    repair: 'border-indigo-200',
    installation: 'border-emerald-200',
    consultation: 'border-purple-200',
  };

  return (
    <Card className={`overflow-hidden ${isRTL ? 'border-r-4 border-l-0' : 'border-l-4 border-r-0'} ${typeColors[appointment.type]}`}>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{appointment.title}</h3>
            <div className={`mt-1 text-sm text-secondary-600 flex items-center ${isRTL ? 'flex-row-reverse' : ''} gap-1`}>
              <User className="h-3 w-3" />
              {appointment.customerName}
            </div>
            <div className={`mt-1 text-sm text-secondary-600 flex items-center ${isRTL ? 'flex-row-reverse' : ''} gap-1`}>
              <Clock className="h-3 w-3" />
              {appointment.time} ({appointment.duration} min)
            </div>
            <div className={`mt-1 text-sm text-secondary-600 flex items-center ${isRTL ? 'flex-row-reverse' : ''} gap-1`}>
              <MapPin className="h-3 w-3" />
              {appointment.location}
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <Badge variant="outline" className={statusColors[appointment.status]}>
              {appointment.status}
            </Badge>
            <Button variant="ghost" size="sm" className="h-8 px-2 mt-2">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
