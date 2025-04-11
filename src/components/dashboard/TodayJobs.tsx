import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import JobItem, { Job } from './JobItem';
import { useLanguage } from '@/contexts/language';

// Mock data for today's jobs
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

const TodayJobs = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t('dashboard.todays_jobs')}</CardTitle>
          <Button variant="link" className="text-primary-600">
            {t('dashboard.view_calendar')}
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
              {t('dashboard.no_jobs')}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayJobs;
