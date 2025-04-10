
import React from 'react';
import Layout from '@/components/Layout';
import SettingsTabs from '@/components/settings/SettingsTabs';
import SettingsHeader from '@/components/settings/SettingsHeader';

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <SettingsHeader />
        <SettingsTabs />
      </div>
    </Layout>
  );
};

export default Settings;
