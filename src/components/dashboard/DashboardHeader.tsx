
import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  const handleNewRequestsClick = () => {
    navigate('/jobs', { state: { activeTab: 'new' } });
  };

  const handleTodayClick = () => {
    navigate('/calendar', { state: { view: 'day' } });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <h1 className="text-2xl font-bold text-secondary-900">{t('dashboard.title')}</h1>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button variant="outline" className="hidden md:flex" onClick={handleTodayClick}>
          <Calendar size={16} className={isRTL ? "ml-2" : "mr-2"} />
          {t('dashboard.today')}
        </Button>
        <Button onClick={handleNewRequestsClick} className="w-full sm:w-auto">
          <Clock size={16} className={isRTL ? "ml-2" : "mr-2"} />
          {t('dashboard.new_requests')}
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
