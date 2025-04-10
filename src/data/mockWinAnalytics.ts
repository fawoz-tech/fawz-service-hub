
export interface WinAnalytics {
  serviceType: string;
  winPercentage: number;
  totalBids: number;
}

export const mockWinAnalytics: WinAnalytics[] = [
  {
    serviceType: "Plumbing",
    winPercentage: 68,
    totalBids: 22
  },
  {
    serviceType: "Electrical",
    winPercentage: 45,
    totalBids: 15
  },
  {
    serviceType: "HVAC",
    winPercentage: 72,
    totalBids: 18
  },
  {
    serviceType: "Cleaning",
    winPercentage: 55,
    totalBids: 12
  },
  {
    serviceType: "General Repair",
    winPercentage: 61,
    totalBids: 28
  },
  {
    serviceType: "Landscaping",
    winPercentage: 40,
    totalBids: 10
  },
  {
    serviceType: "Painting",
    winPercentage: 75,
    totalBids: 8
  },
  {
    serviceType: "Carpentry",
    winPercentage: 58,
    totalBids: 12
  }
];
