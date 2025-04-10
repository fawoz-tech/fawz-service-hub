
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';

const PayoutSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium mb-2">Payout Method</h3>
            <Select defaultValue="bank">
              <SelectTrigger>
                <SelectValue placeholder="Select payout method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="stcpay">STC Pay</SelectItem>
                <SelectItem value="wallet">Mobile Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">Payout Frequency</h3>
            <Select defaultValue="weekly">
              <SelectTrigger>
                <SelectValue placeholder="Select payout frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-md font-medium mb-4">Automatic Payouts</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-payout">Enable automatic payouts</Label>
              <p className="text-sm text-secondary-500">Receive payments on a regular schedule</p>
            </div>
            <Switch id="auto-payout" defaultChecked />
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-md font-medium mb-4">Minimum Payout Amount</h3>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-500 h-4 w-4" />
            <input
              type="number"
              className="pl-9 w-full rounded-md border border-input bg-background px-3 py-2"
              placeholder="100"
              defaultValue="100"
            />
          </div>
          <p className="text-sm text-secondary-500 mt-2">
            Payouts will only be processed when your balance exceeds this amount
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Settings</Button>
      </CardFooter>
    </Card>
  );
};

export default PayoutSettings;
