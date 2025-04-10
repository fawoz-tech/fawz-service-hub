
import React from 'react';
import { DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EarningsCard = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Earnings</CardTitle>
        <CardDescription>This month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-secondary-900 mb-2">$2,456</div>
        <div className="text-sm text-emerald-600 font-medium flex items-center mb-6">
          +12.5% from last month
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/payments">
            <DollarSign size={16} className="mr-2" />
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default EarningsCard;
