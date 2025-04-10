
import React from 'react';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import DashboardCard from './DashboardCard';

const StatCards = () => {
  return (
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
  );
};

export default StatCards;
