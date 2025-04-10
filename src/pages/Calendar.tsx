
import React, { useState } from 'react';
import { format, addDays, subDays, addMonths, subMonths, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, User } from 'lucide-react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import Layout from '@/components/Layout';

interface Appointment {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'maintenance' | 'repair' | 'installation' | 'consultation';
}

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());

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

  const getAppointmentsForDate = (date: Date): Appointment[] => {
    const dateString = format(date, 'yyyy-MM-dd');
    return appointments.filter((appointment) => appointment.date === dateString);
  };

  const todaysAppointments = getAppointmentsForDate(date);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-secondary-900">Calendar & Scheduling</h1>
          <div className="flex items-center space-x-2">
            <Button onClick={goToToday} variant="outline" className="h-8">
              Today
            </Button>
            <div className="flex items-center border rounded-md p-1 bg-white">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium px-2">
                {format(displayMonth, 'MMMM yyyy')}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={view} onValueChange={(v) => setView(v as 'day' | 'week' | 'month')}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
            <div className="text-sm text-secondary-600">
              {view === 'day' && format(date, 'EEEE, MMMM d, yyyy')}
            </div>
          </div>

          <TabsContent value="day" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>Appointments</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => navigateDay('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => navigateDay('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysAppointments.length === 0 ? (
                    <p className="text-center text-secondary-500 py-8">No appointments scheduled for this day</p>
                  ) : (
                    todaysAppointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const day = addDays(subDays(date, date.getDay()), i);
                    return (
                      <div key={i} className="text-center">
                        <div className="text-xs text-secondary-500">{format(day, 'EEE')}</div>
                        <div
                          className={cn(
                            "rounded-full w-8 h-8 mx-auto flex items-center justify-center text-sm",
                            format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                              ? "bg-primary text-white"
                              : "text-secondary-600"
                          )}
                        >
                          {format(day, 'd')}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-4 mt-6">
                  {/* Weekly view appointments would go here */}
                  <p className="text-center text-secondary-500 py-8">Select a day to view appointments</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="month" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  month={displayMonth}
                  onMonthChange={setDisplayMonth}
                  className="rounded-md border"
                  components={{
                    // Fixed the DayProps type issue
                    Day: ({ date, ...props }) => {
                      const dayAppointments = getAppointmentsForDate(date);
                      return (
                        <div
                          // Fixed the className issue by applying it properly
                          {...props}
                          className={cn(props.className)}
                        >
                          <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'd')}</time>
                          {dayAppointments.length > 0 && (
                            <div className="absolute bottom-1 left-0 right-0 mx-auto flex justify-center">
                              <div className="h-1 w-1 rounded-full bg-primary" />
                            </div>
                          )}
                        </div>
                      );
                    },
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments
                .filter((appointment) => appointment.date === format(new Date(), 'yyyy-MM-dd'))
                .map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              {appointments.filter((appointment) => appointment.date === format(new Date(), 'yyyy-MM-dd')).length === 0 && (
                <p className="text-center text-secondary-500 py-8">No appointments scheduled for today</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };

  const typeColors = {
    maintenance: 'border-amber-200',
    repair: 'border-indigo-200',
    installation: 'border-emerald-200',
    consultation: 'border-purple-200',
  };

  return (
    <Card className={`overflow-hidden border-l-4 ${typeColors[appointment.type]}`}>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{appointment.title}</h3>
            <div className="mt-1 text-sm text-secondary-600 flex items-center gap-1">
              <User className="h-3 w-3" />
              {appointment.customerName}
            </div>
            <div className="mt-1 text-sm text-secondary-600 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {appointment.time} ({appointment.duration} min)
            </div>
            <div className="mt-1 text-sm text-secondary-600 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {appointment.location}
            </div>
          </div>
          <div className="flex flex-col items-end justify-between">
            <Badge variant="outline" className={statusColors[appointment.status]}>
              {appointment.status}
            </Badge>
            <Button variant="ghost" size="sm" className="h-8 px-2 mt-2">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Sample appointment data
const appointments: Appointment[] = [
  {
    id: '1',
    title: 'AC Repair for Ahmed',
    customerId: 'c1',
    customerName: 'Ahmed Hassan',
    date: format(new Date(), 'yyyy-MM-dd'), // Today
    time: '09:30 AM',
    duration: 60,
    location: 'Al Olaya, Riyadh',
    status: 'scheduled',
    type: 'repair'
  },
  {
    id: '2',
    title: 'Plumbing Installation',
    customerId: 'c2',
    customerName: 'Fatima Al-Saud',
    date: format(new Date(), 'yyyy-MM-dd'), // Today
    time: '02:15 PM',
    duration: 90,
    location: 'Al Hamra, Jeddah',
    status: 'scheduled',
    type: 'installation'
  },
  {
    id: '3',
    title: 'AC Maintenance',
    customerId: 'c3',
    customerName: 'Khalid Al-Otaibi',
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'), // Tomorrow
    time: '11:00 AM',
    duration: 45,
    location: 'Al Barsha, Dubai',
    status: 'scheduled',
    type: 'maintenance'
  },
  {
    id: '4',
    title: 'Electrical Consultation',
    customerId: 'c4',
    customerName: 'Nora Al-Harbi',
    date: format(addDays(new Date(), 2), 'yyyy-MM-dd'), // Day after tomorrow
    time: '10:00 AM',
    duration: 30,
    location: 'Al Nahda, Sharjah',
    status: 'scheduled',
    type: 'consultation'
  },
  {
    id: '5',
    title: 'Plumbing Emergency',
    customerId: 'c5',
    customerName: 'Mohammed Al-Qahtani',
    date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), // Yesterday
    time: '03:30 PM',
    duration: 120,
    location: 'Al Rashidiya, Dubai',
    status: 'completed',
    type: 'repair'
  }
];

export default Calendar;
