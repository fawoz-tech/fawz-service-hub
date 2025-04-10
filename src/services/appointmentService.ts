
import { format, addDays, subDays } from 'date-fns';
import { Appointment } from '@/types/calendar';

// Sample appointment data
export const appointments: Appointment[] = [
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

export const getAppointmentsForDate = (date: Date): Appointment[] => {
  const dateString = format(date, 'yyyy-MM-dd');
  return appointments.filter((appointment) => appointment.date === dateString);
};
