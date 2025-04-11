
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/language';

interface TeamFiltersProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TeamFilters = ({ activeTab, onTabChange }: TeamFiltersProps) => {
  const { t } = useLanguage();

  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid grid-cols-3 w-[300px]">
        <TabsTrigger value="all">{t('team.all')}</TabsTrigger>
        <TabsTrigger value="available">{t('team.available')}</TabsTrigger>
        <TabsTrigger value="busy">{t('team.busy')}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TeamFilters;
