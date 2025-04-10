
import { Job } from '@/components/jobs/JobCard';

export const mockJobs: Job[] = [
  {
    id: '1',
    customerName: 'Ahmed Hassan',
    service: 'AC Repair',
    serviceType: 'Split Unit',
    date: 'Today',
    time: '09:30 AM',
    location: 'Al Olaya, Riyadh',
    description: 'AC not cooling properly, making unusual noise when turned on. Customer mentioned the issue started yesterday.',
    status: 'new',
    urgent: true
  },
  {
    id: '2',
    customerName: 'Fatima Al-Saud',
    service: 'Plumbing',
    serviceType: 'Leak Repair',
    date: 'Today',
    time: '11:45 AM',
    location: 'Al Hamra, Jeddah',
    description: 'Water leaking from bathroom sink. Customer has temporarily shut off water to that fixture.',
    status: 'en-route'
  },
  {
    id: '3',
    customerName: 'Mohammed Al-Qahtani',
    service: 'Electrical',
    serviceType: 'Wiring',
    date: 'Today',
    time: '02:15 PM',
    location: 'Al Rashidiya, Dubai',
    description: 'Need to install new outlets in home office and check existing wiring.',
    status: 'on-site'
  },
  {
    id: '4',
    customerName: 'Sara Abdullah',
    service: 'Plumbing',
    serviceType: 'Installation',
    date: 'Tomorrow',
    time: '10:00 AM',
    location: 'Al Muruj, Riyadh',
    description: 'New kitchen sink installation in recently renovated kitchen.',
    status: 'quote-sent'
  },
  {
    id: '5',
    customerName: 'Khalid Al-Otaibi',
    service: 'AC Maintenance',
    serviceType: 'Cleaning',
    date: 'Yesterday',
    time: '03:30 PM',
    location: 'Al Barsha, Dubai',
    description: 'Regular AC maintenance and filter cleaning for 3 units.',
    status: 'completed'
  },
  {
    id: '6',
    customerName: 'Nora Al-Harbi',
    service: 'Electrical',
    serviceType: 'Emergency',
    date: 'Today',
    time: '04:45 PM',
    location: 'Al Nahda, Sharjah',
    description: 'Power outage in half of the apartment, breaker keeps tripping when reset.',
    status: 'accepted',
    urgent: true
  }
];
