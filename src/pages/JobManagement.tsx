
import React, { useState, useEffect } from 'react';
import { useLocation, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import JobFilters from '@/components/jobs/JobFilters';
import JobTabs from '@/components/jobs/JobTabs';
import QuoteForm from '@/components/jobs/QuoteForm';
import { useJobsData } from '@/hooks/useJobsData';
import { useLanguage } from '@/contexts/language';
import { Job } from '@/components/jobs/JobCard';
import { useToast } from '@/hooks/use-toast';

const JobsList = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { jobs: allJobs } = useJobsData();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    // Focus on specific job if jobId is provided
    if (location.state && location.state.jobId) {
      const jobId = location.state.jobId;
      const job = allJobs.find(j => j.id === jobId);
      
      if (job) {
        // Determine the appropriate tab based on the job status
        let tabToSet = 'all';
        if (job.status === 'new' || job.status === 'quote-sent') {
          tabToSet = 'new';
        } else if (job.status === 'accepted' || job.status === 'en-route' || job.status === 'on-site') {
          tabToSet = 'in-progress';
        } else if (job.status === 'completed') {
          tabToSet = 'completed';
        }
        
        if (job.urgent) {
          tabToSet = 'urgent';
        }
        
        setActiveTab(tabToSet);
        
        // Show toast notification
        toast({
          title: t('jobs.job_details'),
          description: `${job.service} - ${job.customerName}`,
        });
      }
    }
  }, [location.state, allJobs, toast, t]);

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
  );
};

const JobManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<JobsList />} />
        <Route path="/quote/:jobId" element={<QuoteForm />} />
      </Routes>
    </Layout>
  );
};

export default JobManagement;
