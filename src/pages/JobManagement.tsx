
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs } from '@/components/ui/tabs';
import JobFilters from '@/components/jobs/JobFilters';
import JobTabs from '@/components/jobs/JobTabs';
import { mockJobs } from '@/data/mockJobs';

const JobManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs] = useState(mockJobs);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you would use this query to filter jobs
    console.log(`Search query: ${query}`);
  };

  const handleFilter = () => {
    // In a real app, this would open a filter modal or dropdown
    console.log('Filter button clicked');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-secondary-900">Job Management</h1>
          <JobFilters onSearch={handleSearch} onFilter={handleFilter} />
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <JobTabs jobs={jobs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </Tabs>
      </div>
    </Layout>
  );
};

export default JobManagement;
