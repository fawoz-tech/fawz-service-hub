
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import BiddingTabs from '@/components/bidding/BiddingTabs';
import BiddingHeader from '@/components/bidding/BiddingHeader';
import { Tabs } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

const OpenBidding = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="space-y-6">
        <BiddingHeader />
        <Tabs defaultValue="marketplace" value={activeTab} onValueChange={setActiveTab}>
          <BiddingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </Tabs>
      </div>
    </Layout>
  );
};

export default OpenBidding;
