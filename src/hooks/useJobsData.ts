
import { useState } from 'react';
import { mockJobs } from '@/data/mockJobs';
import { Job } from '@/components/jobs/JobCard';

export const useJobsData = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  
  const updateJobStatus = (jobId: string, newStatus: Job['status']) => {
    setJobs(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };
  
  return { 
    jobs,
    updateJobStatus
  };
};
