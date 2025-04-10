
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

// Payment methods data
const paymentMethods = [
  { id: '1', name: 'Visa **** 4231', type: 'credit-card', isDefault: true },
  { id: '2', name: 'STC Pay', type: 'mobile-wallet', isDefault: false },
  { id: '3', name: 'Bank Transfer (SABB)', type: 'bank', isDefault: false },
];

const PaymentMethods = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Payment Methods</CardTitle>
        <CardDescription>
          Manage how you receive payments from customers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center justify-between p-4 border rounded-md">
            <div className="flex items-center gap-3">
              <div className="bg-primary-50 p-2 rounded-full">
                <CreditCard className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-gray-500">{method.type === 'credit-card' ? 'Credit Card' : method.type === 'mobile-wallet' ? 'Mobile Wallet' : 'Bank Account'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {method.isDefault && (
                <span className="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full">
                  Default
                </span>
              )}
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add Payment Method</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentMethods;
