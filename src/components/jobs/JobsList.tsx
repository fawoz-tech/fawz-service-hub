
import React, { useState } from 'react';
import { JobCard, Job } from './JobCard';
import { useLanguage } from '@/contexts/language';

interface JobsListProps {
  jobs: Job[];
  filter?: string;
}

const JobsList = ({ jobs, filter }: JobsListProps) => {
  const { t } = useLanguage();
  const [jobsState, setJobsState] = useState<Job[]>(jobs);
  
  // Effect to update jobs state when props change
  React.useEffect(() => {
    setJobsState(jobs);
  }, [jobs]);
  
  const handleStatusChange = (jobId: string, newStatus: Job['status']) => {
    setJobsState(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };
  
  const filteredJobs = filter 
    ? jobsState.filter(job => {
        switch(filter) {
          case 'new':
            return job.status === 'new' || job.status === 'quote-sent';
          case 'in-progress':
            return job.status === 'accepted' || job.status === 'en-route' || job.status === 'on-site';
          case 'completed':
            return job.status === 'completed';
          case 'urgent':
            return job.urgent;
          case 'all':
          default:
            return true;
        }
      })
    : jobsState;

  return (
    <div className="space-y-4" dir={useLanguage().isRTL ? 'rtl' : 'ltr'}>
      {filteredJobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} 
          onStatusChange={handleStatusChange} 
        />
      ))}
      {filteredJobs.length === 0 && (
        <div className="text-center py-8 bg-secondary-50 rounded-lg border border-dashed border-secondary-200">
          <p className="text-secondary-500">{t('jobs.no_jobs')}</p>
        </div>
      )}
    </div>
  );
};

export default JobsList;
