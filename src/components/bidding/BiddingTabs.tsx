
import React from 'react';
import { TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import OpenMarketplace from './OpenMarketplace';
import MyBids from './MyBids';
import PostJob from './PostJob';
import WinAnalytics from './WinAnalytics';

interface BiddingTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BiddingTabs = ({ activeTab, setActiveTab }: BiddingTabsProps) => {
  return (
    <>
      <TabsList className="grid grid-cols-4 md:w-[600px]">
        <TabsTrigger value="marketplace" onClick={() => setActiveTab('marketplace')}>Marketplace</TabsTrigger>
        <TabsTrigger value="my-bids" onClick={() => setActiveTab('my-bids')}>My Bids</TabsTrigger>
        <TabsTrigger value="post-job" onClick={() => setActiveTab('post-job')}>Post Job</TabsTrigger>
        <TabsTrigger value="analytics" onClick={() => setActiveTab('analytics')}>Win %</TabsTrigger>
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
    </>
  );
};

export default BiddingTabs;
