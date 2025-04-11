
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import JobFilters from '@/components/jobs/JobFilters';
import JobTabs from '@/components/jobs/JobTabs';
import { useJobsData } from '@/hooks/useJobsData';
import { useLanguage } from '@/contexts/language';
import { Job } from '@/components/jobs/JobCard';

const JobManagement = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { jobs: allJobs } = useJobsData();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredJobs(allJobs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = allJobs.filter(
        job => 
          job.customerName.toLowerCase().includes(query) ||
          job.service.toLowerCase().includes(query) ||
          job.serviceType.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, allJobs]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = () => {
    console.log('Filter button clicked');
    // Advanced filtering functionality would be implemented here
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-secondary-900">{t('jobs.title')}</h1>
          <JobFilters onSearch={handleSearch} onFilter={handleFilter} />
        </div>

        <JobTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          jobs={filteredJobs} 
        />
      </div>
    </Layout>
  );
};

export default JobManagement;
