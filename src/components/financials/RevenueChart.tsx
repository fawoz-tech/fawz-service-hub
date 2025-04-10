
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Sample data for components
const revenueData = [
  { name: 'Jan', revenue: 3500 },
  { name: 'Feb', revenue: 4200 },
  { name: 'Mar', revenue: 3800 },
  { name: 'Apr', revenue: 5000 },
  { name: 'May', revenue: 4700 },
  { name: 'Jun', revenue: 6000 },
  { name: 'Jul', revenue: 5800 },
];

interface RevenueChartProps {
  timeframe: string;
  setTimeframe: (value: string) => void;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ timeframe, setTimeframe }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <Tabs defaultValue="weekly" value={timeframe} onValueChange={setTimeframe} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              labelStyle={{ fontWeight: 'bold' }}
              formatter={(value) => [`$${value}`, 'Revenue']}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#0D9488" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
