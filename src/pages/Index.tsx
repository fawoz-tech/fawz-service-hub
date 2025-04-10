
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, CheckCircle, AlertTriangle, Calendar, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden md:flex">
              <Calendar size={16} className="mr-2" />
              Today
            </Button>
            <Button>
              <Clock size={16} className="mr-2" />
              New Requests
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard 
            title="New Requests" 
            value="5" 
            description="Pending review"
            icon={<Clock className="h-5 w-5 text-primary-600" />}
            linkText="View all requests"
            linkHref="/jobs"
            color="bg-primary-50"
          />
          <DashboardCard 
            title="In Progress" 
            value="3" 
            description="Jobs currently active"
            icon={<CheckCircle className="h-5 w-5 text-emerald-600" />}
            linkText="View active jobs"
            linkHref="/jobs"
            color="bg-emerald-50"
          />
          <DashboardCard 
            title="Urgent Jobs" 
            value="2" 
            description="Emergency requests"
            icon={<AlertTriangle className="h-5 w-5 text-accent-600" />}
            linkText="View urgent jobs"
            linkHref="/jobs"
            color="bg-accent-50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="col-span-1 md:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Today's Jobs</CardTitle>
                <Button variant="link" className="text-primary-600">
                  View Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayJobs.map((job) => (
                  <JobItem key={job.id} job={job} />
                ))}
                {todayJobs.length === 0 && (
                  <div className="text-center py-6 text-secondary-500">
                    No jobs scheduled for today
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Earnings</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary-900 mb-2">$2,456</div>
              <div className="text-sm text-emerald-600 font-medium flex items-center mb-6">
                +12.5% from last month
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/payments">
                  <DollarSign size={16} className="mr-2" />
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  linkText: string;
  linkHref: string;
  color: string;
}

const DashboardCard = ({
  title,
  value,
  description,
  icon,
  linkText,
  linkHref,
  color
}: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-md ${color}`}>{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-secondary-900">{value}</div>
        <div className="text-sm text-secondary-600 mb-4">{description}</div>
        <Button variant="link" className="text-primary-600 p-0 h-auto" asChild>
          <Link to={linkHref}>
            {linkText} <ArrowRight size={16} className="ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

interface Job {
  id: string;
  time: string;
  customerName: string;
  service: string;
  location: string;
  status: 'new' | 'en-route' | 'on-site' | 'completed' | 'cancelled';
}

interface JobItemProps {
  job: Job;
}

const JobItem = ({ job }: JobItemProps) => {
  const statusColors = {
    'new': 'bg-blue-100 text-blue-800',
    'en-route': 'bg-amber-100 text-amber-800',
    'on-site': 'bg-emerald-100 text-emerald-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
  };

  const statusText = {
    'new': 'New',
    'en-route': 'En Route',
    'on-site': 'On Site',
    'completed': 'Completed',
    'cancelled': 'Cancelled',
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium text-secondary-600 min-w-[60px]">{job.time}</div>
        <div>
          <div className="font-medium text-secondary-900">{job.customerName}</div>
          <div className="text-sm text-secondary-600">{job.service} · {job.location}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={`${statusColors[job.status]}`}>
          {statusText[job.status]}
        </Badge>
        <Button variant="ghost" size="icon">
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

const todayJobs: Job[] = [
  {
    id: '1',
    time: '09:30 AM',
    customerName: 'Ahmed Hassan',
    service: 'AC Repair',
    location: 'Al Olaya, Riyadh',
    status: 'new',
  },
  {
    id: '2',
    time: '11:45 AM',
    customerName: 'Fatima Al-Saud',
    service: 'Plumbing',
    location: 'Al Hamra, Jeddah',
    status: 'en-route',
  },
  {
    id: '3',
    time: '02:15 PM',
    customerName: 'Mohammed Al-Qahtani',
    service: 'Electrical Wiring',
    location: 'Al Rashidiya, Dubai',
    status: 'on-site',
  },
];

export default Index;
