
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CircleDollarSign, Clock, Timer } from 'lucide-react';
import { mockMyBids } from '@/data/mockMyBids';
import { formatDistanceToNow } from 'date-fns';

const MyBids = () => {
  const [bidFilter, setBidFilter] = useState('active');
  
  const activeBids = mockMyBids.filter(bid => bid.status === 'pending' || bid.status === 'active');
  const wonBids = mockMyBids.filter(bid => bid.status === 'won');
  const lostBids = mockMyBids.filter(bid => bid.status === 'lost');
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" value={bidFilter} onValueChange={setBidFilter}>
        <TabsList>
          <TabsTrigger value="active">Active ({activeBids.length})</TabsTrigger>
          <TabsTrigger value="won">Won ({wonBids.length})</TabsTrigger>
          <TabsTrigger value="lost">Lost ({lostBids.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-6 space-y-4">
          {activeBids.map((bid) => (
            <BidCard key={bid.id} bid={bid} />
          ))}
          {activeBids.length === 0 && (
            <EmptyState message="You don't have any active bids" />
          )}
        </TabsContent>
        
        <TabsContent value="won" className="mt-6 space-y-4">
          {wonBids.map((bid) => (
            <BidCard key={bid.id} bid={bid} />
          ))}
          {wonBids.length === 0 && (
            <EmptyState message="You haven't won any bids yet" />
          )}
        </TabsContent>
        
        <TabsContent value="lost" className="mt-6 space-y-4">
          {lostBids.map((bid) => (
            <BidCard key={bid.id} bid={bid} />
          ))}
          {lostBids.length === 0 && (
            <EmptyState message="You don't have any lost bids" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export interface Bid {
  id: string;
  jobId: string;
  jobTitle: string;
  bidAmount: number;
  eta: string;
  comments: string;
  status: 'pending' | 'active' | 'won' | 'lost';
  submittedAt: Date;
  expiresAt: Date | null;
}

interface BidCardProps {
  bid: Bid;
}

const BidCard = ({ bid }: BidCardProps) => {
  const getStatusBadge = () => {
    switch (bid.status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending Review</Badge>;
      case 'active':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Active</Badge>;
      case 'won':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Won</Badge>;
      case 'lost':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Lost</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-lg font-medium">{bid.jobTitle}</div>
            <div className="flex items-center gap-2 text-secondary-500 text-sm mt-1">
              <Clock size={14} /> {formatDistanceToNow(bid.submittedAt, { addSuffix: true })}
            </div>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <div className="font-medium text-lg">
              ${bid.bidAmount}
            </div>
            {getStatusBadge()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-secondary-600">Your Estimate</span>
            <span className="font-medium flex items-center gap-1">
              <Timer size={14} /> {bid.eta}
            </span>
          </div>
          
          {bid.comments && (
            <div className="text-sm text-secondary-600">
              <div className="font-medium mb-1">Your comments:</div>
              <div className="text-secondary-700">{bid.comments}</div>
            </div>
          )}
          
          {bid.expiresAt && (
            <div className="flex items-center gap-1 text-sm text-secondary-500 mt-2">
              <CircleDollarSign size={14} />
              Expires {formatDistanceToNow(bid.expiresAt, { addSuffix: true })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-lg text-secondary-500">
      <p>{message}</p>
    </div>
  );
};

export default MyBids;
