
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
import { useLanguage } from '@/contexts/language';
import { useToast } from '@/hooks/use-toast';

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
  const { t } = useLanguage();
  
  const statusColors = {
    'new': 'bg-blue-100 text-blue-800',
    'quote-sent': 'bg-purple-100 text-purple-800',
    'accepted': 'bg-indigo-100 text-indigo-800',
    'en-route': 'bg-amber-100 text-amber-800',
    'on-site': 'bg-emerald-100 text-emerald-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'new': return t('jobs.new');
      case 'quote-sent': return 'Quote Sent';
      case 'accepted': return 'Accepted';
      case 'en-route': return t('jobs.en_route');
      case 'on-site': return t('jobs.on_site');
      case 'completed': return t('jobs.completed');
      case 'cancelled': return t('jobs.cancelled');
      default: return status;
    }
  };

  return (
    <Card className={job.urgent ? "border-accent-300" : ""}>
      {job.urgent && (
        <div className="bg-accent-50 text-accent-700 px-4 py-1 text-sm font-medium flex items-center justify-between">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" /> {t('jobs.urgent')}
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
            {getStatusText(job.status)}
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
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const handleAcceptRequest = () => {
    toast({
      title: "Job Accepted",
      description: "You have accepted this job request. The customer will be notified."
    });
  };
  
  const handleSendQuote = () => {
    toast({
      title: "Quote Form",
      description: "Quote form opened. You can now prepare a quote for the customer."
    });
  };
  
  const handleMessage = () => {
    toast({
      title: "Message",
      description: "Opening message thread with the customer."
    });
  };
  
  const handleCall = () => {
    toast({
      title: "Calling Customer",
      description: "Initiating call to customer."
    });
  };
  
  const handleStartJob = () => {
    toast({
      title: "Job Started",
      description: "You're now en route to the job location."
    });
  };
  
  const handleViewDetails = () => {
    toast({
      title: "Job Details",
      description: "Viewing complete job details."
    });
  };
  
  const handleOnSite = () => {
    toast({
      title: "Arrived On Site",
      description: "You've marked that you've arrived at the job location."
    });
  };
  
  const handleViewMap = () => {
    toast({
      title: "Map View",
      description: "Opening map to job location."
    });
  };
  
  const handleCompleteJob = () => {
    toast({
      title: "Job Completed",
      description: "You've marked this job as completed. Great work!"
    });
  };
  
  const handleAddMaterials = () => {
    toast({
      title: "Materials",
      description: "Add materials used for this job."
    });
  };
  
  const handleViewInvoice = () => {
    toast({
      title: "Invoice",
      description: "Viewing invoice for this job."
    });
  };
  
  const handleJobHistory = () => {
    toast({
      title: "Job History",
      description: "Viewing history for this job."
    });
  };
  
  const handleMoreOptions = () => {
    toast({
      title: "More Options",
      description: "Additional options for this job."
    });
  };
  
  switch (status) {
    case 'new':
      return (
        <>
          <Button size="sm" onClick={handleAcceptRequest}>Accept Request</Button>
          <Button variant="outline" size="sm" onClick={handleSendQuote}>Send Quote</Button>
          <Button variant="ghost" size="sm" onClick={handleMessage}>
            <MessageSquare className="h-4 w-4 mr-1" /> Message
          </Button>
        </>
      );
    case 'quote-sent':
      return (
        <>
          <Button variant="outline" size="sm" onClick={handleSendQuote}>Edit Quote</Button>
          <Button variant="ghost" size="sm" onClick={handleMessage}>
            <MessageSquare className="h-4 w-4 mr-1" /> Message
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCall}>
            <Phone className="h-4 w-4 mr-1" /> Call
          </Button>
        </>
      );
    case 'accepted':
      return (
        <>
          <Button size="sm" onClick={handleStartJob}>Start Job</Button>
          <Button variant="outline" size="sm" onClick={handleViewDetails}>View Details</Button>
          <Button variant="ghost" size="sm" onClick={handleCall}>
            <Phone className="h-4 w-4 mr-1" /> Call
          </Button>
        </>
      );
    case 'en-route':
      return (
        <>
          <Button size="sm" onClick={handleOnSite}>Arrived on Site</Button>
          <Button variant="outline" size="sm" onClick={handleViewMap}>View Map</Button>
          <Button variant="ghost" size="sm" onClick={handleMoreOptions}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </>
      );
    case 'on-site':
      return (
        <>
          <Button size="sm" onClick={handleCompleteJob}>Complete Job</Button>
          <Button variant="outline" size="sm" onClick={handleAddMaterials}>Add Materials</Button>
          <Button variant="ghost" size="sm" onClick={handleMoreOptions}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </>
      );
    case 'completed':
      return (
        <>
          <Button variant="outline" size="sm" onClick={handleViewInvoice}>View Invoice</Button>
          <Button variant="ghost" size="sm" onClick={handleJobHistory}>Job History</Button>
        </>
      );
    default:
      return null;
  }
};
