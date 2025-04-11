
import React, { useState } from 'react';
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
  FileText,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/language';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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
  onStatusChange?: (jobId: string, newStatus: Job['status']) => void;
}

export const JobCard = ({ job, onStatusChange }: JobCardProps) => {
  const { t, isRTL } = useLanguage();
  
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
      case 'quote-sent': return t('jobs.quote_sent');
      case 'accepted': return t('jobs.accepted');
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
          <span className="text-xs">{t('jobs.urgent_response')}</span>
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
          <JobActions 
            status={job.status} 
            jobId={job.id} 
            onStatusChange={onStatusChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface JobActionsProps {
  status: string;
  jobId: string;
  onStatusChange?: (jobId: string, newStatus: Job['status']) => void;
}

export const JobActions = ({ status, jobId, onStatusChange }: JobActionsProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleAcceptRequest = () => {
    // Update job status
    if (onStatusChange) {
      onStatusChange(jobId, 'accepted');
    }
    
    toast({
      title: t('jobs.action.accepted'),
      description: t('jobs.toast.accepted_description')
    });
  };
  
  const handleSendQuote = () => {
    // Navigate to quote form
    navigate(`/jobs/quote/${jobId}`);
    
    toast({
      title: t('jobs.action.quote'),
      description: t('jobs.toast.quote_description')
    });
  };
  
  const handleMessage = () => {
    // Navigate to message thread
    navigate(`/messages?jobId=${jobId}`);
    
    toast({
      title: t('jobs.action.message'),
      description: t('jobs.toast.message_description')
    });
  };
  
  const handleCall = () => {
    toast({
      title: t('jobs.action.call'),
      description: t('jobs.toast.call_description')
    });
  };
  
  const handleStartJob = () => {
    // Update job status
    if (onStatusChange) {
      onStatusChange(jobId, 'en-route');
    }
    
    toast({
      title: t('jobs.action.started'),
      description: t('jobs.toast.started_description')
    });
  };
  
  const handleViewDetails = () => {
    // Navigate to job details
    navigate(`/jobs/details/${jobId}`);
    
    toast({
      title: t('jobs.job_details'),
      description: t('jobs.toast.details_description')
    });
  };
  
  const handleOnSite = () => {
    // Update job status
    if (onStatusChange) {
      onStatusChange(jobId, 'on-site');
    }
    
    toast({
      title: t('jobs.action.on_site'),
      description: t('jobs.toast.on_site_description')
    });
  };
  
  const handleViewMap = () => {
    toast({
      title: t('jobs.action.map'),
      description: t('jobs.toast.map_description')
    });
  };
  
  const handleCompleteJob = () => {
    // Update job status
    if (onStatusChange) {
      onStatusChange(jobId, 'completed');
    }
    
    toast({
      title: t('jobs.action.completed'),
      description: t('jobs.toast.completed_description')
    });
  };
  
  const handleAddMaterials = () => {
    toast({
      title: t('jobs.action.materials'),
      description: t('jobs.toast.materials_description')
    });
  };
  
  const handleViewInvoice = () => {
    toast({
      title: t('jobs.action.invoice'),
      description: t('jobs.toast.invoice_description')
    });
  };
  
  const handleJobHistory = () => {
    toast({
      title: t('jobs.action.history'),
      description: t('jobs.toast.history_description')
    });
  };
  
  const handleMoreOptions = () => {
    toast({
      title: t('jobs.action.more'),
      description: t('jobs.toast.more_description')
    });
  };
  
  switch (status) {
    case 'new':
      return (
        <>
          <Button size="sm" onClick={handleAcceptRequest}>
            <CheckCircle className="h-4 w-4 mr-1" />
            {t('jobs.button.accept')}
          </Button>
          <Button variant="outline" size="sm" onClick={handleSendQuote}>
            <FileText className="h-4 w-4 mr-1" />
            {t('jobs.button.quote')}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleMessage}>
            <MessageSquare className="h-4 w-4 mr-1" /> 
            {t('jobs.button.message')}
          </Button>
        </>
      );
    case 'quote-sent':
      return (
        <>
          <Button variant="outline" size="sm" onClick={handleSendQuote}>
            <FileText className="h-4 w-4 mr-1" />
            {t('jobs.button.edit_quote')}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleMessage}>
            <MessageSquare className="h-4 w-4 mr-1" />
            {t('jobs.button.message')}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCall}>
            <Phone className="h-4 w-4 mr-1" />
            {t('jobs.button.call')}
          </Button>
        </>
      );
    case 'accepted':
      return (
        <>
          <Button size="sm" onClick={handleStartJob}>
            {t('jobs.button.start_job')}
          </Button>
          <Button variant="outline" size="sm" onClick={handleViewDetails}>
            {t('jobs.button.view_details')}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCall}>
            <Phone className="h-4 w-4 mr-1" /> {t('jobs.button.call')}
          </Button>
        </>
      );
    case 'en-route':
      return (
        <>
          <Button size="sm" onClick={handleOnSite}>
            {t('jobs.button.arrived')}
          </Button>
          <Button variant="outline" size="sm" onClick={handleViewMap}>
            {t('jobs.button.view_map')}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleMoreOptions}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </>
      );
    case 'on-site':
      return (
        <>
          <Button size="sm" onClick={handleCompleteJob}>
            {t('jobs.button.complete')}
          </Button>
          <Button variant="outline" size="sm" onClick={handleAddMaterials}>
            {t('jobs.button.materials')}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleMoreOptions}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </>
      );
    case 'completed':
      return (
        <>
          <Button variant="outline" size="sm" onClick={handleViewInvoice}>
            {t('jobs.button.invoice')}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleJobHistory}>
            {t('jobs.button.history')}
          </Button>
        </>
      );
    default:
      return null;
  }
};
