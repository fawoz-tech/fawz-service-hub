
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  MoreHorizontal,
} from 'lucide-react';

export interface Job {
  id: string;
  customerName: string;
  service: string;
  serviceType: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'new' | 'quote-sent' | 'accepted' | 'en-route' | 'on-site' | 'completed' | 'cancelled';
  urgent?: boolean;
}

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const statusColors = {
    'new': 'bg-blue-100 text-blue-800',
    'quote-sent': 'bg-purple-100 text-purple-800',
    'accepted': 'bg-indigo-100 text-indigo-800',
    'en-route': 'bg-amber-100 text-amber-800',
    'on-site': 'bg-emerald-100 text-emerald-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
  };

  const statusText = {
    'new': 'New Request',
    'quote-sent': 'Quote Sent',
    'accepted': 'Accepted',
    'en-route': 'En Route',
    'on-site': 'On Site',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
  };

  return (
    <Card className={job.urgent ? "border-accent-300" : ""}>
      {job.urgent && (
        <div className="bg-accent-50 text-accent-700 px-4 py-1 text-sm font-medium flex items-center justify-between">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" /> Urgent Request
          </span>
          <span className="text-xs">Response required ASAP</span>
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{job.customerName}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-secondary-600">
              {job.service} · {job.serviceType}
            </div>
          </div>
          <Badge variant="outline" className={`${statusColors[job.status]}`}>
            {statusText[job.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-secondary-600">
            <Calendar className="h-4 w-4" />
            <span>{job.date} at {job.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary-600">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
        </div>

        <div className="text-sm text-secondary-700 mb-4">
          {job.description}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <JobActions status={job.status} />
        </div>
      </CardContent>
    </Card>
  );
};

interface JobActionsProps {
  status: string;
}

export const JobActions = ({ status }: JobActionsProps) => {
  switch (status) {
    case 'new':
      return (
        <>
          <Button size="sm">Accept Request</Button>
          <Button variant="outline" size="sm">Send Quote</Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4 mr-1" /> Message
          </Button>
        </>
      );
    case 'quote-sent':
      return (
        <>
          <Button variant="outline" size="sm">Edit Quote</Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4 mr-1" /> Message
          </Button>
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4 mr-1" /> Call
          </Button>
        </>
      );
    case 'accepted':
      return (
        <>
          <Button size="sm">Start Job</Button>
          <Button variant="outline" size="sm">View Details</Button>
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4 mr-1" /> Call
          </Button>
        </>
      );
    case 'en-route':
      return (
        <>
          <Button size="sm">Arrived on Site</Button>
          <Button variant="outline" size="sm">View Map</Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </>
      );
    case 'on-site':
      return (
        <>
          <Button size="sm">Complete Job</Button>
          <Button variant="outline" size="sm">Add Materials</Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </>
      );
    case 'completed':
      return (
        <>
          <Button variant="outline" size="sm">View Invoice</Button>
          <Button variant="ghost" size="sm">Job History</Button>
        </>
      );
    default:
      return null;
  }
};
