
import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleNewRequestsClick = () => {
    navigate('/jobs', { state: { activeTab: 'new' } });
  };

  const handleTodayClick = () => {
    navigate('/calendar', { state: { view: 'day' } });
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="hidden md:flex" onClick={handleTodayClick}>
          <Calendar size={16} className="mr-2" />
          Today
        </Button>
        <Button onClick={handleNewRequestsClick}>
          <Clock size={16} className="mr-2" />
          New Requests
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
