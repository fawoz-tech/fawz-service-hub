
import React from 'react';
import { JobCard, Job } from './JobCard';

interface JobsListProps {
  jobs: Job[];
  filter?: string;
}

const JobsList = ({ jobs, filter }: JobsListProps) => {
  const filteredJobs = filter 
    ? jobs.filter(job => {
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
    : jobs;

  return (
    <div className="space-y-4">
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      {filteredJobs.length === 0 && (
        <div className="text-center py-8 bg-secondary-50 rounded-lg border border-dashed border-secondary-200">
          <p className="text-secondary-500">No jobs found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default JobsList;
