
import React from 'react';
import Layout from '@/components/Layout';
import PaymentHeader from '@/components/payments/PaymentHeader';
import PaymentSummaryCards from '@/components/payments/PaymentSummaryCards';
import PaymentTabs from '@/components/payments/PaymentTabs';

const Payments = () => {
  const [activeTab, setActiveTab] = React.useState('transactions');

  return (
    <Layout>
      <div className="space-y-6">
        <PaymentHeader />
        <PaymentSummaryCards />
        <PaymentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Layout>
  );
};

export default Payments;
