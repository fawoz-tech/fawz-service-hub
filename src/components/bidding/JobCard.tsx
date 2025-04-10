
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AlertCircle, Clock, MapPin, Sparkles, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface OpenJob {
  id: string;
  title: string;
  description: string;
  location: string;
  serviceType: string;
  maxBudget: number;
  postedAt: Date;
  urgent: boolean;
  sameDay: boolean;
  bidsCount: number;
  customerRating: number;
}

interface JobCardProps {
  job: OpenJob;
}

const JobCard = ({ job }: JobCardProps) => {
  const [bidDialogOpen, setBidDialogOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState(job.maxBudget.toString());
  const [eta, setEta] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmitBid = () => {
    // In a real app, this would send the bid to the backend
    console.log('Submitting bid', { job, bidAmount, eta, comments });
    setBidDialogOpen(false);
  };

  const matchMaxBudget = () => {
    setBidAmount(job.maxBudget.toString());
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-lg font-medium">{job.title}</div>
              <div className="flex items-center gap-2 text-secondary-500 text-sm mt-1">
                <MapPin size={14} /> {job.location}
              </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <div className="font-medium text-lg">
                Up to ${job.maxBudget}
              </div>
              <div className="flex gap-1">
                {job.urgent && (
                  <Badge variant="destructive" className="text-xs">Urgent</Badge>
                )}
                {job.sameDay && (
                  <Badge variant="default" className="bg-purple-500 text-xs">Same Day</Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-secondary-700">{job.description}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-3 text-sm text-secondary-500">
              <span className="flex items-center gap-1"><Clock size={14} /> {formatDistanceToNow(job.postedAt, { addSuffix: true })}</span>
              <span className="flex items-center gap-1"><Users size={14} /> {job.bidsCount} bids</span>
            </div>
            <Badge variant="outline">{job.serviceType}</Badge>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex justify-between items-center w-full">
            <Button variant="outline" className="text-sm">View Details</Button>
            <Button onClick={() => setBidDialogOpen(true)}>Place Bid</Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={bidDialogOpen} onOpenChange={setBidDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit a Bid for "{job.title}"</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Price</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                  <Input 
                    value={bidAmount} 
                    onChange={(e) => setBidAmount(e.target.value)} 
                    className="pl-7"
                    type="number"
                  />
                </div>
                <Button variant="outline" onClick={matchMaxBudget}>
                  Match Budget
                </Button>
              </div>
              <div className="flex items-center gap-1 text-xs text-secondary-500">
                <AlertCircle size={12} />
                Customer budget is up to ${job.maxBudget}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Estimated Time of Arrival</label>
              <Input 
                value={eta} 
                onChange={(e) => setEta(e.target.value)} 
                placeholder="e.g., 2 hours, Tomorrow morning, etc."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Comments</label>
              <Textarea 
                value={comments} 
                onChange={(e) => setComments(e.target.value)}
                placeholder="Describe why you're the best fit for this job..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBidDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitBid} className="gap-1">
              <Sparkles size={16} />
              Submit Bid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobCard;
