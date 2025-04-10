
import React from 'react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import TodayJobs from '@/components/dashboard/TodayJobs';
import EarningsCard from '@/components/dashboard/EarningsCard';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <DashboardHeader />
        <StatCards />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TodayJobs />
          <EarningsCard />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
