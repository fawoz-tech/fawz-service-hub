
import { OpenJob } from '@/components/bidding/JobCard';

// Helper function to create a date in the past
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const mockOpenJobs: OpenJob[] = [
  {
    id: "job-1",
    title: "Leaking Kitchen Faucet Repair",
    description: "The kitchen faucet has been leaking for a few days now. Need someone to fix it as soon as possible.",
    location: "San Francisco, CA",
    serviceType: "Plumbing",
    maxBudget: 150,
    postedAt: daysAgo(0),
    urgent: true,
    sameDay: true,
    bidsCount: 2,
    customerRating: 4.8
  },
  {
    id: "job-2",
    title: "Bathroom Fan Installation",
    description: "Need to have a new bathroom exhaust fan installed to replace the old one that stopped working.",
    location: "Palo Alto, CA",
    serviceType: "Electrical",
    maxBudget: 200,
    postedAt: daysAgo(1),
    urgent: false,
    sameDay: false,
    bidsCount: 3,
    customerRating: 4.5
  },
  {
    id: "job-3",
    title: "AC Not Cooling Properly",
    description: "Our central air conditioner isn't cooling the house adequately. It runs but doesn't cool below 78°F.",
    location: "Oakland, CA",
    serviceType: "HVAC",
    maxBudget: 350,
    postedAt: daysAgo(2),
    urgent: true,
    sameDay: false,
    bidsCount: 5,
    customerRating: 4.2
  },
  {
    id: "job-4",
    title: "Weekly House Cleaning",
    description: "Looking for recurring weekly house cleaning service for a 3-bedroom, 2-bathroom home.",
    location: "Berkeley, CA",
    serviceType: "Cleaning",
    maxBudget: 120,
    postedAt: daysAgo(3),
    urgent: false,
    sameDay: false,
    bidsCount: 7,
    customerRating: 4.9
  },
  {
    id: "job-5",
    title: "Clogged Basement Drain",
    description: "The floor drain in our basement is backed up. Need someone to snake it and clear the clog.",
    location: "San Jose, CA",
    serviceType: "Plumbing",
    maxBudget: 180,
    postedAt: daysAgo(3),
    urgent: false,
    sameDay: true,
    bidsCount: 1,
    customerRating: 4.0
  },
  {
    id: "job-6",
    title: "Garage Door Won't Close",
    description: "Our garage door goes down halfway then goes back up. Need someone to diagnose and fix the issue.",
    location: "Fremont, CA",
    serviceType: "General Repair",
    maxBudget: 220,
    postedAt: daysAgo(4),
    urgent: false,
    sameDay: false,
    bidsCount: 4,
    customerRating: 4.6
  }
];
