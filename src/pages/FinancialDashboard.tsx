
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import FinancialHeader from '@/components/financials/FinancialHeader';
import OverviewCards from '@/components/financials/OverviewCards';
import RevenueChart from '@/components/financials/RevenueChart';
import ServiceBreakdown from '@/components/financials/ServiceBreakdown';
import RecentTransactions from '@/components/financials/RecentTransactions';
import PayoutSettings from '@/components/financials/PayoutSettings';

const FinancialDashboard = () => {
  const [timeframe, setTimeframe] = useState('weekly');

  return (
    <Layout>
      <div className="space-y-6">
        <FinancialHeader />
        <OverviewCards />
        <RevenueChart timeframe={timeframe} setTimeframe={setTimeframe} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceBreakdown />
          <RecentTransactions />
        </div>
        <PayoutSettings />
      </div>
    </Layout>
  );
};

export default FinancialDashboard;
