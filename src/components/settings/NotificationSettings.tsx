
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Manage your email preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-job">New Job Notifications</Label>
              <p className="text-sm text-secondary-500">Receive emails when new jobs are available</p>
            </div>
            <Switch id="new-job" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="job-updates">Job Status Updates</Label>
              <p className="text-sm text-secondary-500">Receive emails when job statuses change</p>
            </div>
            <Switch id="job-updates" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="payment-alerts">Payment Alerts</Label>
              <p className="text-sm text-secondary-500">Receive emails about payment status</p>
            </div>
            <Switch id="payment-alerts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing">Marketing Communications</Label>
              <p className="text-sm text-secondary-500">Receive promotional emails and updates</p>
            </div>
            <Switch id="marketing" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mobile Notifications</CardTitle>
          <CardDescription>Manage your mobile app notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="app-notifications">Push Notifications</Label>
              <p className="text-sm text-secondary-500">Enable push notifications on your mobile device</p>
            </div>
            <Switch id="app-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-alerts">SMS Alerts</Label>
              <p className="text-sm text-secondary-500">Receive SMS notifications for important updates</p>
            </div>
            <Switch id="sms-alerts" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotificationSettings;
