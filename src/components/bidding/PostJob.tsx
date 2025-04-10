
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const PostJob = () => {
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isSameDay, setIsSameDay] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the job to the backend
    console.log('Submitting job', {
      title,
      description,
      location,
      serviceType,
      maxBudget: parseFloat(maxBudget),
      isUrgent,
      isSameDay
    });
    
    toast({
      title: "Job Posted Successfully",
      description: "Your job has been posted to the marketplace.",
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setLocation('');
    setServiceType('');
    setMaxBudget('');
    setIsUrgent(false);
    setIsSameDay(false);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
          <CardDescription>
            Your job will be listed on the open marketplace for service providers to bid on.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Bathroom Sink Repair"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the job in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="service-type">Service Type</Label>
                  <Select value={serviceType} onValueChange={setServiceType} required>
                    <SelectTrigger id="service-type">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="landscaping">Landscaping</SelectItem>
                      <SelectItem value="general-repair">General Repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="max-budget">Maximum Budget ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                  <Input
                    id="max-budget"
                    type="number"
                    min="0"
                    step="0.01"
                    className="pl-7"
                    placeholder="e.g., 250"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="urgent" className="font-medium">Mark as Urgent</Label>
                    <p className="text-sm text-secondary-500">Providers will see this as a high-priority job</p>
                  </div>
                  <Switch id="urgent" checked={isUrgent} onCheckedChange={setIsUrgent} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="same-day" className="font-medium">Same-Day Service Needed</Label>
                    <p className="text-sm text-secondary-500">You need this job completed today</p>
                  </div>
                  <Switch id="same-day" checked={isSameDay} onCheckedChange={setIsSameDay} />
                </div>
              </div>
            </div>
            
            <Button type="submit" className="w-full">Post Job to Marketplace</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostJob;
