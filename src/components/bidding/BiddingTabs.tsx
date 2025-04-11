
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import OpenMarketplace from './OpenMarketplace';
import MyBids from './MyBids';
import PostJob from './PostJob';
import WinAnalytics from './WinAnalytics';
import { useLanguage } from '@/contexts/language';

interface BiddingTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BiddingTabs = ({ activeTab, setActiveTab }: BiddingTabsProps) => {
  const { t } = useLanguage();
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 md:w-[600px]">
        <TabsTrigger value="marketplace">{t('bidding.marketplace')}</TabsTrigger>
        <TabsTrigger value="my-bids">{t('bidding.my_bids')}</TabsTrigger>
        <TabsTrigger value="post-job">{t('bidding.post_job')}</TabsTrigger>
        <TabsTrigger value="analytics">{t('bidding.analytics')}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="marketplace" className="mt-6">
        <OpenMarketplace />
      </TabsContent>
      
      <TabsContent value="my-bids" className="mt-6">
        <MyBids />
      </TabsContent>
      
      <TabsContent value="post-job" className="mt-6">
        <PostJob />
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-6">
        <WinAnalytics />
      </TabsContent>
    </Tabs>
  );
};

export default BiddingTabs;
