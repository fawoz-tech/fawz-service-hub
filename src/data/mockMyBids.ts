
import { Bid } from '@/components/bidding/MyBids';

// Helper function to create dates in the past
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// Helper function to create dates in the future
const daysFromNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const mockMyBids: Bid[] = [
  {
    id: "bid-1",
    jobId: "job-1",
    jobTitle: "Leaking Kitchen Faucet Repair",
    bidAmount: 120,
    eta: "Within 2 hours",
    comments: "I've fixed many similar issues. I'll bring all the necessary parts.",
    status: "active",
    submittedAt: daysAgo(0),
    expiresAt: daysFromNow(1)
  },
  {
    id: "bid-2",
    jobId: "job-3",
    jobTitle: "AC Not Cooling Properly",
    bidAmount: 300,
    eta: "Tomorrow morning",
    comments: "I'm a certified HVAC technician with 10 years of experience. I'll diagnose and fix your AC issues.",
    status: "pending",
    submittedAt: daysAgo(1),
    expiresAt: daysFromNow(2)
  },
  {
    id: "bid-3",
    jobId: "job-old-1",
    jobTitle: "Toilet Installation",
    bidAmount: 275,
    eta: "Next day service",
    comments: "Will remove old toilet and install the new one. Customer must provide the toilet.",
    status: "won",
    submittedAt: daysAgo(10),
    expiresAt: null
  },
  {
    id: "bid-4",
    jobId: "job-old-2",
    jobTitle: "Ceiling Fan Installation",
    bidAmount: 150,
    eta: "Same day",
    comments: "I'll install the ceiling fan and ensure it works properly.",
    status: "won",
    submittedAt: daysAgo(15),
    expiresAt: null
  },
  {
    id: "bid-5",
    jobId: "job-old-3",
    jobTitle: "Dishwasher Repair",
    bidAmount: 180,
    eta: "Within 2 days",
    comments: "I'll diagnose and repair your dishwasher issues.",
    status: "lost",
    submittedAt: daysAgo(7),
    expiresAt: null
  },
  {
    id: "bid-6",
    jobId: "job-old-4",
    jobTitle: "Hardwood Floor Refinishing",
    bidAmount: 1200,
    eta: "3-day project",
    comments: "Complete refinishing of hardwood floors in living room and dining room.",
    status: "lost",
    submittedAt: daysAgo(20),
    expiresAt: null
  }
];
