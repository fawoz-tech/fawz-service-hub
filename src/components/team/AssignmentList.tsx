
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/language';

export interface Assignment {
  id: string;
  technician: string;
  technicianImage?: string;
  service: string;
  time: string;
  location: string;
  status: 'assigned' | 'en-route' | 'on-site';
}

interface AssignmentListProps {
  assignments: Assignment[];
  title: string;
}

const AssignmentList = ({ assignments, title }: AssignmentListProps) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="p-3 border rounded-md flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={assignment.technicianImage} alt={assignment.technician} />
                  <AvatarFallback>{assignment.technician.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-secondary-900">{assignment.technician}</div>
                  <div className="text-sm text-secondary-600">{assignment.service}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <div className="text-secondary-900">{assignment.time}</div>
                  <div className="text-secondary-600 text-xs flex items-center">
                    <MapPin className="h-3 w-3 mr-1" /> {assignment.location}
                  </div>
                </div>
                
                <Badge variant="outline" className={
                  assignment.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                  assignment.status === 'en-route' ? 'bg-amber-100 text-amber-800' :
                  assignment.status === 'on-site' ? 'bg-emerald-100 text-emerald-800' : ''
                }>
                  {t(`team.${assignment.status}_status`)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentList;
