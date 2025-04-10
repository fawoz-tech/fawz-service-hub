
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const PayoutSettingsForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Settings</CardTitle>
        <CardDescription>
          Configure how and when you receive your funds
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">Payout Schedule</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <input type="radio" id="weekly" name="payout-schedule" className="h-4 w-4 text-primary" checked />
                <label htmlFor="weekly">Weekly (Every Monday)</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="biweekly" name="payout-schedule" className="h-4 w-4 text-primary" />
                <label htmlFor="biweekly">Bi-Weekly</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="monthly" name="payout-schedule" className="h-4 w-4 text-primary" />
                <label htmlFor="monthly">Monthly</label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Minimum Payout Amount</h3>
            <Input type="number" placeholder="500" defaultValue="500" />
            <p className="text-sm text-secondary-500 mt-2">
              Funds will be held until this threshold is reached
            </p>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-md font-medium mb-2">Tax Information</h3>
          <p className="text-sm text-secondary-500 mb-4">
            Make sure your tax information is up to date for proper reporting
          </p>
          <Button variant="outline">Update Tax Information</Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save Settings</Button>
      </CardFooter>
    </Card>
  );
};

export default PayoutSettingsForm;
