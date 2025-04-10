
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockWinAnalytics } from '@/data/mockWinAnalytics';

const WinAnalytics = () => {
  return (
    <div className="space-y-6">
      <p className="text-secondary-600">Track your bid performance across different service categories.</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Win Percentage by Service Category</CardTitle>
          <CardDescription>
            Based on your bidding history over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockWinAnalytics}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="serviceType" angle={-45} textAnchor="end" height={80} />
                <YAxis unit="%" />
                <Tooltip formatter={(value) => [`${value}%`, 'Win Rate']} />
                <Legend />
                <Bar dataKey="winPercentage" name="Win Rate %" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Overall Win Rate" 
          value={`${calculateAverageWinRate()}%`}
          description="Average across all categories"
        />
        <StatCard 
          title="Total Bids Placed" 
          value={calculateTotalBids()}
          description="Across all categories"
        />
        <StatCard 
          title="Total Jobs Won" 
          value={calculateTotalWon()}
          description="Successfully secured jobs"
        />
        <StatCard 
          title="Best Performing Category" 
          value={findBestCategory().serviceType}
          description={`${findBestCategory().winPercentage}% win rate`}
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}

const StatCard = ({ title, value, description }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-secondary-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-secondary-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

// Helper functions for analytics calculations
const calculateAverageWinRate = () => {
  const total = mockWinAnalytics.reduce((sum, item) => sum + item.winPercentage, 0);
  return Math.round(total / mockWinAnalytics.length);
};

const calculateTotalBids = () => {
  return mockWinAnalytics.reduce((sum, item) => sum + item.totalBids, 0);
};

const calculateTotalWon = () => {
  return mockWinAnalytics.reduce((sum, item) => Math.round(sum + (item.totalBids * item.winPercentage / 100)), 0);
};

const findBestCategory = () => {
  return mockWinAnalytics.reduce((best, current) => 
    current.winPercentage > best.winPercentage ? current : best, 
    mockWinAnalytics[0]
  );
};

export default WinAnalytics;
