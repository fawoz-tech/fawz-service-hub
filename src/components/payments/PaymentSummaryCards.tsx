
import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PaymentSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Available Balance</CardDescription>
          <CardTitle className="text-2xl">SAR 4,780.00</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <Button className="w-full">Withdraw Funds</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Pending Payments</CardDescription>
          <CardTitle className="text-2xl">SAR 1,620.00</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-xs text-secondary-500">4 payments waiting to clear</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Last Payout</CardDescription>
          <CardTitle className="text-2xl">SAR 3,250.00</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-xs text-secondary-500">June 1, 2023 • Bank transfer</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSummaryCards;
