
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Download } from 'lucide-react';

const FinancialHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-secondary-900">Financial Dashboard</h1>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Date Range
        </Button>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default FinancialHeader;
