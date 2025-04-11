import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobCard, Job } from './JobCard';
import { useLanguage } from '@/contexts/language';

interface JobTabsProps {
  jobs: Job[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const JobTabs = ({ jobs, activeTab, setActiveTab }: JobTabsProps) => {
  const { t } = useLanguage();
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-5 md:w-[600px]">
        <TabsTrigger value="all">{t('jobs.all')}</TabsTrigger>
        <TabsTrigger value="new">{t('jobs.new')}</TabsTrigger>
        <TabsTrigger value="in-progress">{t('jobs.in_progress')}</TabsTrigger>
        <TabsTrigger value="completed">{t('jobs.completed')}</TabsTrigger>
        <TabsTrigger value="urgent">{t('jobs.urgent')}</TabsTrigger>
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
    </Tabs>
  );
};

export default JobTabs;
