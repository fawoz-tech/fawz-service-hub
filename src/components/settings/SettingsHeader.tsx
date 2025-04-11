import React from 'react';
import { useLanguage } from '@/contexts/language';

const SettingsHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-secondary-900">{t('settings.title')}</h1>
      <div className="text-sm text-secondary-500">
        {t('settings.last_updated')} April 10, 2025
      </div>
    </div>
  );
};

export default SettingsHeader;
