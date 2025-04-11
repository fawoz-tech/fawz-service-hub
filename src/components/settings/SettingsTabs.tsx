import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountSettings from './AccountSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';
import LanguageSettings from './LanguageSettings';
import { useLanguage } from '@/contexts/language';

const SettingsTabs = () => {
  const { t } = useLanguage();
  
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="account">{t('settings.account')}</TabsTrigger>
        <TabsTrigger value="security">{t('settings.security')}</TabsTrigger>
        <TabsTrigger value="notifications">{t('settings.notifications')}</TabsTrigger>
        <TabsTrigger value="language">{t('settings.language')}</TabsTrigger>
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

      <TabsContent value="language" className="space-y-4">
        <LanguageSettings />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
