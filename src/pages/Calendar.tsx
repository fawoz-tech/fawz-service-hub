
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from "date-fns";

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  
  const handlePrevious = () => {
    const newDate = new Date(date);
    if (view === 'day') {
      newDate.setDate(date.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(date.getDate() - 7);
    } else {
      newDate.setMonth(date.getMonth() - 1);
    }
    setDate(newDate);
  };
  
  const handleNext = () => {
    const newDate = new Date(date);
    if (view === 'day') {
      newDate.setDate(date.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(date.getDate() + 7);
    } else {
      newDate.setMonth(date.getMonth() + 1);
    }
    setDate(newDate);
  };

  const handleToday = () => {
    setDate(new Date());
  };

  // Sample appointments data (in a real app, this would come from an API)
  const appointments = [
    {
      id: 1,
      title: "AC Repair - Abdullah",
      time: "09:00 AM - 11:00 AM",
      type: "Maintenance",
      location: "Riyadh Central",
      date: new Date(2025, 3, 10), // April 10th, 2025
      status: "confirmed"
    },
    {
      id: 2,
      title: "Plumbing Service - Sara",
      time: "01:00 PM - 02:30 PM",
      type: "Repair",
      location: "Northern District",
      date: new Date(2025, 3, 10), // April 10th, 2025
      status: "confirmed"
    },
    {
      id: 3,
      title: "Electrical Issue - Mohammed",
      time: "03:30 PM - 05:00 PM",
      type: "Emergency",
      location: "Western Suburb",
      date: new Date(2025, 3, 11), // April 11th, 2025
      status: "pending"
    }
  ];

  // Filter appointments for the selected date
  const getDayAppointments = (day: Date) => {
    return appointments.filter(appointment => 
      appointment.date.getDate() === day.getDate() &&
      appointment.date.getMonth() === day.getMonth() &&
      appointment.date.getFullYear() === day.getFullYear()
    );
  };

  const todaysAppointments = getDayAppointments(new Date());
  
  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleToday}>Today</Button>
            <Button variant="outline" size="icon" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="month" className="w-full" onValueChange={(value) => setView(value as 'day' | 'week' | 'month')}>
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>

          <TabsContent value="day" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{format(date, 'PPPP')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getDayAppointments(date).length > 0 ? (
                    getDayAppointments(date).map(appointment => (
                      <Card key={appointment.id} className={`p-4 ${appointment.status === 'confirmed' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-amber-500'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{appointment.title}</h3>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <CalendarClock className="h-3 w-3" />
                              {appointment.time}
                            </div>
                            <div className="text-sm text-muted-foreground">{appointment.location}</div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            appointment.type === 'Emergency' 
                              ? 'bg-red-100 text-red-800' 
                              : appointment.type === 'Maintenance'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {appointment.type}
                          </span>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No appointments scheduled for this day
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Week View - {format(date, 'MMMM yyyy')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-medium text-sm">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="text-center py-8 text-muted-foreground">
                  Week view will display appointments for the current week
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="month" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{format(date, 'MMMM yyyy')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  className="pointer-events-auto"
                  components={{
                    Day: ({ date: dayDate, ...props }) => {
                      const dayAppointments = getDayAppointments(dayDate);
                      const hasAppointments = dayAppointments.length > 0;
                      const isCurrentMonth = isSameMonth(dayDate, date);
                      
                      return (
                        <div
                          {...props}
                          className={`relative ${props.className} ${!isCurrentMonth ? 'opacity-50' : ''}`}
                        >
                          <time dateTime={format(dayDate, 'yyyy-MM-dd')}>
                            {format(dayDate, 'd')}
                          </time>
                          {isCurrentMonth && hasAppointments && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                          )}
                        </div>
                      );
                    }
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysAppointments.length > 0 ? (
                todaysAppointments.map(appointment => (
                  <Card key={appointment.id} className={`p-4 ${appointment.status === 'confirmed' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-amber-500'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{appointment.title}</h3>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <CalendarClock className="h-3 w-3" />
                          {appointment.time}
                        </div>
                        <div className="text-sm text-muted-foreground">{appointment.location}</div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        appointment.type === 'Emergency' 
                          ? 'bg-red-100 text-red-800' 
                          : appointment.type === 'Maintenance'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {appointment.type}
                      </span>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No appointments scheduled for today
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CalendarPage;
