
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import JobFilters from '@/components/jobs/JobFilters';
import JobTabs from '@/components/jobs/JobTabs';
import JobsList from '@/components/jobs/JobsList';
import { useJobsData } from '@/hooks/useJobsData';

const JobManagement = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { jobs } = useJobsData();

  // Set the active tab from navigation state if provided
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

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

        <JobTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          jobs={jobs} 
        />
      </div>
    </Layout>
  );
};

export default JobManagement;
