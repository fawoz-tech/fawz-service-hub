
import { useState } from 'react';
import { mockJobs } from '@/data/mockJobs';
import { Job } from '@/components/jobs/JobCard';

export const useJobsData = () => {
  const [jobs] = useState<Job[]>(mockJobs);
  
  // In a real app, you might add more functionality here:
  // - Fetching jobs from an API
  // - Filtering, sorting, pagination
  // - Loading state management
  // - Error handling

  return { jobs };
};
