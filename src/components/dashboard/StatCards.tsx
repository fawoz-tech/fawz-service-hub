import React from 'react';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { useLanguage } from '@/contexts/language';

const StatCards = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DashboardCard 
        title={t('dashboard.new_requests')}
        value="5" 
        description={t('dashboard.pending_review')}
        icon={<Clock className="h-5 w-5 text-primary-600" />}
        linkText={t('dashboard.view_requests')}
        linkHref="/jobs"
        color="bg-primary-50"
      />
      <DashboardCard 
        title={t('dashboard.in_progress')}
        value="3" 
        description={t('dashboard.jobs_active')}
        icon={<CheckCircle className="h-5 w-5 text-emerald-600" />}
        linkText={t('dashboard.view_jobs')}
        linkHref="/jobs"
        color="bg-emerald-50"
      />
      <DashboardCard 
        title={t('dashboard.urgent_jobs')}
        value="2" 
        description={t('dashboard.emergency_requests')}
        icon={<AlertTriangle className="h-5 w-5 text-accent-600" />}
        linkText={t('dashboard.view_urgent')}
        linkHref="/jobs"
        color="bg-accent-50"
      />
    </div>
  );
};

export default StatCards;
