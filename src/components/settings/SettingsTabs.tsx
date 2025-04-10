
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountSettings from './AccountSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';

const SettingsTabs = () => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="space-y-4">
        <AccountSettings />
      </TabsContent>

      <TabsContent value="security" className="space-y-4">
        <SecuritySettings />
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <NotificationSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
