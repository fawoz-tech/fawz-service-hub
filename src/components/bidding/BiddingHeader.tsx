
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const BiddingHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Open Bidding Marketplace</h1>
        <p className="text-secondary-500 mt-1">Find and bid on available jobs in your area</p>
      </div>
      <Button className="whitespace-nowrap">
        <PlusCircle size={16} className="mr-2" />
        Post a New Job
      </Button>
    </div>
  );
};

export default BiddingHeader;
