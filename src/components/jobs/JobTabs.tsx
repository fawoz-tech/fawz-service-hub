
import React from 'react';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobCard, Job } from './JobCard';

interface JobTabsProps {
  jobs: Job[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const JobTabs = ({ jobs, activeTab, setActiveTab }: JobTabsProps) => {
  return (
    <>
      <TabsList className="grid grid-cols-5 md:w-[600px]">
        <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All</TabsTrigger>
        <TabsTrigger value="new" onClick={() => setActiveTab('new')}>New</TabsTrigger>
        <TabsTrigger value="in-progress" onClick={() => setActiveTab('in-progress')}>In Progress</TabsTrigger>
        <TabsTrigger value="completed" onClick={() => setActiveTab('completed')}>Completed</TabsTrigger>
        <TabsTrigger value="urgent" onClick={() => setActiveTab('urgent')}>Urgent</TabsTrigger>
      </TabsList>
      
      <div className="mt-6">
        <TabsContent value="all" className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </TabsContent>
        
        <TabsContent value="new" className="space-y-4">
          {jobs
            .filter((job) => job.status === 'new' || job.status === 'quote-sent')
            .map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-4">
          {jobs
            .filter((job) => job.status === 'accepted' || job.status === 'en-route' || job.status === 'on-site')
            .map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {jobs
            .filter((job) => job.status === 'completed')
            .map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
        </TabsContent>
        
        <TabsContent value="urgent" className="space-y-4">
          {jobs
            .filter((job) => job.urgent)
            .map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
        </TabsContent>
      </div>
    </>
  );
};

export default JobTabs;
