
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Filter,
  Search,
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  MoreHorizontal,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const JobManagement = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-secondary-900">Job Management</h1>
          <div className="flex items-center gap-2 self-stretch md:self-auto w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-secondary-500" />
              <Input
                placeholder="Search jobs..."
                className="pl-9 w-full md:w-[250px]"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 md:w-[600px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="urgent">Urgent</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="all" className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </TabsContent>
            
            <TabsContent value="new" className="space-y-4">
              {jobs
                .filter((job) => job.status === 'new' || job.status === 'quote-sent')
                .map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
            </TabsContent>
            
            <TabsContent value="in-progress" className="space-y-4">
              {jobs
                .filter((job) => job.status === 'accepted' || job.status === 'en-route' || job.status === 'on-site')
                .map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {jobs
                .filter((job) => job.status === 'completed')
                .map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
            </TabsContent>
            
            <TabsContent value="urgent" className="space-y-4">
              {jobs
                .filter((job) => job.urgent)
                .map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

interface Job {
  id: string;
  customerName: string;
  service: string;
  serviceType: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'new' | 'quote-sent' | 'accepted' | 'en-route' | 'on-site' | 'completed' | 'cancelled';
  urgent?: boolean;
}

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const statusColors = {
    'new': 'bg-blue-100 text-blue-800',
    'quote-sent': 'bg-purple-100 text-purple-800',
    'accepted': 'bg-indigo-100 text-indigo-800',
    'en-route': 'bg-amber-100 text-amber-800',
    'on-site': 'bg-emerald-100 text-emerald-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
  };

  const statusText = {
    'new': 'New Request',
    'quote-sent': 'Quote Sent',
    'accepted': 'Accepted',
    'en-route': 'En Route',
    'on-site': 'On Site',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
  };

  return (
    <Card className={job.urgent ? "border-accent-300" : ""}>
      {job.urgent && (
        <div className="bg-accent-50 text-accent-700 px-4 py-1 text-sm font-medium flex items-center justify-between">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" /> Urgent Request
          </span>
          <span className="text-xs">Response required ASAP</span>
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{job.customerName}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-secondary-600">
              {job.service} · {job.serviceType}
            </div>
          </div>
          <Badge variant="outline" className={`${statusColors[job.status]}`}>
            {statusText[job.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-secondary-600">
            <Calendar className="h-4 w-4" />
            <span>{job.date} at {job.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary-600">
            <MapPin className="h-4 w-4" />
            <span>{job.location}</span>
          </div>
        </div>

        <div className="text-sm text-secondary-700 mb-4">
          {job.description}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {renderJobActions(job.status)}
        </div>
      </CardContent>
    </Card>
  );
};

const renderJobActions = (status: string) => {
  switch (status) {
    case 'new':
      return (
        <>
          <Button size="sm">Accept Request</Button>
          <Button variant="outline" size="sm">Send Quote</Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4 mr-1" /> Message
          </Button>
        </>
      );
    case 'quote-sent':
      return (
        <>
          <Button variant="outline" size="sm">Edit Quote</Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-4 w-4 mr-1" /> Message
          </Button>
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4 mr-1" /> Call
          </Button>
        </>
      );
    case 'accepted':
      return (
        <>
          <Button size="sm">Start Job</Button>
          <Button variant="outline" size="sm">View Details</Button>
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4 mr-1" /> Call
          </Button>
        </>
      );
    case 'en-route':
      return (
        <>
          <Button size="sm">Arrived on Site</Button>
          <Button variant="outline" size="sm">View Map</Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </>
      );
    case 'on-site':
      return (
        <>
          <Button size="sm">Complete Job</Button>
          <Button variant="outline" size="sm">Add Materials</Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </>
      );
    case 'completed':
      return (
        <>
          <Button variant="outline" size="sm">View Invoice</Button>
          <Button variant="ghost" size="sm">Job History</Button>
        </>
      );
    default:
      return null;
  }
};

const jobs: Job[] = [
  {
    id: '1',
    customerName: 'Ahmed Hassan',
    service: 'AC Repair',
    serviceType: 'Split Unit',
    date: 'Today',
    time: '09:30 AM',
    location: 'Al Olaya, Riyadh',
    description: 'AC not cooling properly, making unusual noise when turned on. Customer mentioned the issue started yesterday.',
    status: 'new',
    urgent: true
  },
  {
    id: '2',
    customerName: 'Fatima Al-Saud',
    service: 'Plumbing',
    serviceType: 'Leak Repair',
    date: 'Today',
    time: '11:45 AM',
    location: 'Al Hamra, Jeddah',
    description: 'Water leaking from bathroom sink. Customer has temporarily shut off water to that fixture.',
    status: 'en-route'
  },
  {
    id: '3',
    customerName: 'Mohammed Al-Qahtani',
    service: 'Electrical',
    serviceType: 'Wiring',
    date: 'Today',
    time: '02:15 PM',
    location: 'Al Rashidiya, Dubai',
    description: 'Need to install new outlets in home office and check existing wiring.',
    status: 'on-site'
  },
  {
    id: '4',
    customerName: 'Sara Abdullah',
    service: 'Plumbing',
    serviceType: 'Installation',
    date: 'Tomorrow',
    time: '10:00 AM',
    location: 'Al Muruj, Riyadh',
    description: 'New kitchen sink installation in recently renovated kitchen.',
    status: 'quote-sent'
  },
  {
    id: '5',
    customerName: 'Khalid Al-Otaibi',
    service: 'AC Maintenance',
    serviceType: 'Cleaning',
    date: 'Yesterday',
    time: '03:30 PM',
    location: 'Al Barsha, Dubai',
    description: 'Regular AC maintenance and filter cleaning for 3 units.',
    status: 'completed'
  },
  {
    id: '6',
    customerName: 'Nora Al-Harbi',
    service: 'Electrical',
    serviceType: 'Emergency',
    date: 'Today',
    time: '04:45 PM',
    location: 'Al Nahda, Sharjah',
    description: 'Power outage in half of the apartment, breaker keeps tripping when reset.',
    status: 'accepted',
    urgent: true
  }
];

export default JobManagement;
