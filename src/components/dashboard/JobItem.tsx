import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language';

export interface Job {
  id: string;
  time: string;
  customerName: string;
  service: string;
  location: string;
  status: 'new' | 'en-route' | 'on-site' | 'completed' | 'cancelled';
}

interface JobItemProps {
  job: Job;
}

const JobItem = ({ job }: JobItemProps) => {
  const { t } = useLanguage();
  
  const statusColors = {
    'new': 'bg-blue-100 text-blue-800',
    'en-route': 'bg-amber-100 text-amber-800',
    'on-site': 'bg-emerald-100 text-emerald-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
  };

  const statusText = {
    'new': t('jobs.new'),
    'en-route': t('jobs.en_route'),
    'on-site': t('jobs.on_site'),
    'completed': t('jobs.completed'),
    'cancelled': t('jobs.cancelled'),
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium text-secondary-600 min-w-[60px]">{job.time}</div>
        <div>
          <div className="font-medium text-secondary-900">{job.customerName}</div>
          <div className="text-sm text-secondary-600">{job.service} · {job.location}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={`${statusColors[job.status]}`}>
          {statusText[job.status]}
        </Badge>
        <Button variant="ghost" size="icon">
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default JobItem;
