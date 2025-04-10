
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Revenue</CardDescription>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">$24,780</CardTitle>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4 mr-1" />
              12.5%
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-xs text-secondary-500">vs. previous period</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Pending Payments</CardDescription>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">$5,230</CardTitle>
            <div className="flex items-center text-amber-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4 mr-1" />
              4.3%
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-xs text-secondary-500">8 invoices pending</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Jobs Completed</CardDescription>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">127</CardTitle>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4 mr-1" />
              8.2%
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-xs text-secondary-500">this month</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Average Job Value</CardDescription>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">$195</CardTitle>
            <div className="flex items-center text-red-600 text-sm font-medium">
              <ArrowDown className="w-4 h-4 mr-1" />
              2.1%
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-xs text-secondary-500">vs. previous period</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCards;
