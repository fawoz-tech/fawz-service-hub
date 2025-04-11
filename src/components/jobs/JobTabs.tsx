
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JobsList from './JobsList';
import { Job } from './JobCard';
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
        <TabsContent value="all">
          <JobsList jobs={jobs} filter="all" />
        </TabsContent>
        
        <TabsContent value="new">
          <JobsList jobs={jobs} filter="new" />
        </TabsContent>
        
        <TabsContent value="in-progress">
          <JobsList jobs={jobs} filter="in-progress" />
        </TabsContent>
        
        <TabsContent value="completed">
          <JobsList jobs={jobs} filter="completed" />
        </TabsContent>
        
        <TabsContent value="urgent">
          <JobsList jobs={jobs} filter="urgent" />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default JobTabs;
