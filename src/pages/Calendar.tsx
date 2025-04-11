import React, { useState } from 'react';
import { format, addDays, subDays, addMonths, subMonths } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/language';

// Import our new components
import CalendarNavigation from '@/components/calendar/CalendarNavigation';
import DayView from '@/components/calendar/DayView';
import WeekView from '@/components/calendar/WeekView';
import MonthView from '@/components/calendar/MonthView';
import TodaysAppointments from '@/components/calendar/TodaysAppointments';

// Import services
import { appointments, getAppointmentsForDate } from '@/services/appointmentService';

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());
  const { t, isRTL } = useLanguage();

  // Function to navigate between days
  const navigateDay = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setDate(addDays(date, 1));
    } else {
      setDate(subDays(date, 1));
    }
  };

  // Function to navigate between months
  const navigateMonth = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setDisplayMonth(addMonths(displayMonth, 1));
    } else {
      setDisplayMonth(subMonths(displayMonth, 1));
    }
  };

  const goToToday = () => {
    setDate(new Date());
    setDisplayMonth(new Date());
  };

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const todaysAppointments = getAppointmentsForDate(date);

  return (
    <Layout>
      <div className="space-y-6">
        <CalendarNavigation
          displayMonth={displayMonth}
          onNavigateMonth={navigateMonth}
          onGoToToday={goToToday}
          view={view}
          date={date}
          onNavigateDay={view === 'day' ? navigateDay : undefined}
        />

        <Tabs value={view} onValueChange={(v) => setView(v as 'day' | 'week' | 'month')}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="day">{t('calendar.day') || 'Day'}</TabsTrigger>
              <TabsTrigger value="week">{t('calendar.weekly')?.split(' ')[0] || 'Week'}</TabsTrigger>
              <TabsTrigger value="month">{t('calendar.month') || 'Month'}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="day" className="mt-4 space-y-4">
            <DayView
              date={date}
              appointments={todaysAppointments}
              onNavigateDay={navigateDay}
            />
          </TabsContent>

          <TabsContent value="week" className="mt-4">
            <WeekView 
              date={date} 
              onSelectDay={(selectedDate) => {
                setDate(selectedDate);
                setView('day');
              }}
            />
          </TabsContent>

          <TabsContent value="month" className="mt-4">
            <MonthView
              date={date}
              displayMonth={displayMonth}
              onDateChange={handleDateChange}
              onMonthChange={setDisplayMonth}
              getAppointmentsForDate={getAppointmentsForDate}
            />
          </TabsContent>
        </Tabs>

        <TodaysAppointments appointments={appointments} />
      </div>
    </Layout>
  );
};

export default Calendar;
